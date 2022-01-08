import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { BorderlessButton } from 'react-native-gesture-handler';



export default function MoviesCard (props) {

    return(
        <View >
        <Card >
        <Card.Title>{props.title}</Card.Title>
        <Card.Divider />

        {(props.imageCase=='api')? 
        <Card.Image
        style={{ padding: 0 , borderRadius : 10}}
        
        source=  {{   
          uri:
            'https://www.themoviedb.org/t/p/w1280/' + props.poster,
        }}
        /> :
        <Card.Image
        style={{ padding: 0 , borderRadius : 10}}
        
        source=  { (props.poster)? props.poster : require('../images/6892502_preview.png')}
      />
}

        <Text style={{ marginBottom: 10 , marginTop : 15 , }}>
          {props.overview}
        </Text>
        <Text style={{ marginBottom: 10, fontWeight : 'bold' , fontSize : 14 , color : 'grey' , alignSelf : 'flex-end'}}>
        released in {props.date}
        </Text> 


      </Card>
      </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

