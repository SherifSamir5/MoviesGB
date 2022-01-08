import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from '../Navigation/TabNavigator'
import {Provider} from 'react-redux'
import {createStore} from 'redux'


const initialState = {
  con : 'conio',
  movieObj:[],
  myMovies: [],
}

const reducer=(state = initialState , action)=>{
  switch(action.type)
  {
    case 'POST_MOVIE':
      return{ myMovies :[...state.myMovies, action.payload]  }
    case 'ADD_OBJ' : 
      return { movieObj : action.payload }
  }
  return state 
}

const store = createStore(reducer)

export default class App extends Component {
  render(){  
    return (
      <Provider store={store}>
        <TabNavigator /> 
      </Provider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});