import React, { Component } from 'react';
import { StyleSheet, Text, View , SafeAreaView , FlatList , StatusBar, Button , Image} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import MoviesCard from '../Components/MoviesCard'
import {  Divider } from 'react-native-elements';
import SwitchSelector from "react-native-switch-selector";
import {connect} from 'react-redux'




class Movies extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      allMovies : [],
      myMovies:[],
      page : 1,
      switch : 'api',
      con:''
    }

    this.getData()

  }

  //my api key : 0922592a5f96df173c0e2fa1f7d36603
  getData = async (url = `https://api.themoviedb.org/3/discover/movie?api_key=0922592a5f96df173c0e2fa1f7d36603&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}&with_watch_monetization_types=flatrate`) => {

    const response = await fetch(url,{
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          
      }
  })
  .then(response => response.json())
  .then( async data => {
      //console.log(data);
      let movieArr = []
      data.results.forEach((movie)=>{
        this.state.allMovies.push(movie)
      })
      // setTimeout(() => {
        
      this.setState({firstLoader : false , })
      // }, 500);
  })
  .catch(err => console.error(err));

  }

  async handleEnd(){
    await this.setState({page:this.state.page+1,loading:true}) 
    this.getData()
  }

  check(){
    console.log('111',this.props.myMovies)
    console.log('222',this.props.movieObj)
  }

  render() {

    // if(this.state.switch == 'api')

      return (

        <SafeAreaView >


        <SwitchSelector
          initial={0}
          onPress={value => this.setState({ switch: value })}
          // textColor={colors.purple} //'#7a44cf'
          // selectedColor={colors.white}
          // buttonColor={colors.purple}
          // borderColor={colors.purple}
          style={{width : '80%' , alignSelf : 'center'}}
          hasPadding
          options={[
            { label: "All Movies", value: "api", }, 
            { label: "My movies", value: "added",  } 
          ]}

        />

        {(this.state.switch == 'api')?
        <FlatList
          data={this.state.allMovies}
          renderItem={({item}) => { return (<MoviesCard 
            title  = {item.title}
            overview = {item.overview}
            poster = {item.poster_path}
            date = {item.release_date}
            imageCase = {this.state.switch}
          />) }}
          keyExtractor={item => item.id}
          extraData={this.state}
          onEndReached= {()=>{ this.handleEnd() }}
          onEndReachedThreshold={0}
          ListFooterComponent={()=>{
            return (
              (this.state.loading)?
              <View>
              <UIActivityIndicator color='purple' />
              </View>
              : null
            )
          }}
        /> : 

        <FlatList
        data={this.props.myMovies}
        renderItem={({item}) => { return (<MoviesCard 
          title  = {item.title}
          overview = {item.description}
          poster = {item.imageUri}
          date = {item.date.toUTCString().slice(4,16)}
          imageCase = {this.state.switch}
        />) }}
        keyExtractor={(item,index) => index}
        extraData={this.props.myMovies} 
        style={{}}
        ListEmptyComponent={()=>{ return (
          <View style ={{}}>
            <Image 
              source={require('../images/nomovie.png')}
              style={{
              height : 200,
              width : 200,
              justifyContent : 'center',
              alignSelf : 'center',
              marginTop : 150
              }}  
              />
            <Text style={{marginTop : 10 , alignSelf : 'center' ,}}> No movies have been added yet</Text>
          </View>
        )}}
      />
      }


      </SafeAreaView>

      );
    }
}


function mapStateToProps(state){
  return {
    myMovies : state.myMovies,
    movieObj : state.movieObj,
  }
}




export default connect(mapStateToProps)(Movies)

const styles = StyleSheet.create({
  container: {
    flex : 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  horizontal: {
    marginBottom: 10,
    flexDirection : 'row'
  },
  horizontalText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
});