import React, { Component } from 'react';
import { StyleSheet, Text, View , SafeAreaView , TextInput , Button ,Alert , Image , TouchableOpacity} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import DatePicker from '../Components/DatePicker'
import {connect} from 'react-redux'
import {launchImageLibrary} from 'react-native-image-picker'

class AddMovies extends Component {

    constructor() {
        super();
    
        this.state = {
            title : '',
            description : '',
            date : new Date(),
            imageUri : '',
        }
    
    
      }

      postMovie = async()=>{
        if(this.state.title==''){
            Alert.alert(
                "",
                "Please add your Movie Title",
            );    
        } else if (this.state.description==''){
            Alert.alert(
                "",
                "Please add your Movie Description",
            );    
        } else {

        this.props.postMovie(this.state)

        this.setState({
            title : '',
            description : '',
            date : new Date(),
            imageUri : '',
        })
        
        setTimeout(() => {
            Alert.alert(
                "Great!",
                "Your Movie has been added successfully",
              );    
        }, 500);


        }

      }


      openGallery= async()=>{
        const options = {
            storageOptions : {
                path : 'images',
                mediaType : 'photo',
            },
            includeBase64 : true
        };

         await launchImageLibrary(options, (response) =>{
            if(response.didCancel){
                console.log('error')
            } else if (response.errorMessage){
                console.log('error')
            } else {
                // console.log(response.assets[0].base64)
                const source = {uri : 'data:image/jpeg;base64,' +  response.assets[0].base64  }

                this.setState({imageUri : source}) 

            }

        })
      }

    

    render() {
        return (
            <SafeAreaView >

                <Text style={{fontWeight : 'bold' , fontSize : 24 ,color : 'black' , opacity : 0.8 , fontStyle : 'italic' , alignSelf : 'center' , marginTop : 15}}>Add a new Movie</Text>


                <Text style={styles.header}>Movie Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(title)=>{this.setState({title})}}
                    placeholder="useless placeholder"
                    keyboardType='default'
                    value={this.state.title}
                />

                <Text style={styles.header}>Movie Description</Text>
                <TextInput
                    style={{        height: 70,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius : 5}}
                    onChangeText={(description)=>{this.setState({description})}}
                    multiline={true}
                    value={this.state.description}
                />

                <Text style={styles.header}>Movie Date : </Text>

                <DatePicker date = {this.state.date}
                 onChange = {(event,date)=>{
                     this.state.date = date
                    this.state.date.toUTCString().slice(4,16)
                    }}
                 />

                <Text style={styles.header}>Movie Poster : </Text>
                <TouchableOpacity style = {{                             height : 100,
                        width : 200,
                        borderWidth : 2,
                        borderRadius: 10,
                        borderColor :'gray',
                        alignSelf : 'center',
                        marginTop : 15}} onPress={()=>{this.openGallery()}}>
                {(this.state.imageUri != '')?
                <Image 
                    source={this.state.imageUri}
                    style={{
                        height : '100%',
                        width : '100%',
                        borderRadius: 10,

                    }}
                    
                />: 
                <Image 
                    source={require('../images/add-image-icon-png-1.png')}
                    style={{
                        height : 90,
                        width : 90,
                        justifyContent : 'center',
                        alignSelf : 'center'
                        
                    }}
                    
                />
                }   

                </TouchableOpacity>

                <View style = {{marginTop : 50 , backgroundColor : 'purple' , opacity : 0.8 , alignSelf : 'center', padding : 5 , borderRadius : 10 }}>
                <Button
                    onPress={()=>{ 
                        this.postMovie()


                     } }
                    title="Post Movie"
                    color="white"
                />
                </View>



                

            </SafeAreaView>
        );
    }  
}


function mapDispatchToProps(dispatch){

    return{
        addObj : (movieObj) => dispatch ({type : 'ADD_OBJ' , payload: movieObj }),
        postMovie : (data) => dispatch({ type : 'POST_MOVIE' , payload: data}),
    }
}

function mapStateToProps(state){
    return {
       movieObj : state.movieObj,
       myMovies : state.myMovies,
    }
  }


export default connect (mapStateToProps, mapDispatchToProps)(AddMovies)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 5
      },
    header :{
        fontSize : 18 ,
        color : 'grey', 
        marginLeft : 10 , 
        marginTop : 10
    }
});