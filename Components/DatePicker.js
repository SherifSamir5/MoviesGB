import React, {useState} from 'react';
import {View, Button, Platform , TextInput , StyleSheet , TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


export default  DatePicker = (props) => {
  // const [date, setDate] = useState(new Date(1598051730000));

  const [show, setShow] = useState(false);

  //for component to re-render
  const [update, forceUpdate] = useState(0)


  return (
    <View style={{width : '100%', }}>

      <TouchableOpacity onPress={()=>{setShow(true)} } 

       >
        <TextInput
          style={styles.input}
          // onChangeText={(date)=>{props.onChange(null,date)}}
          placeholder="tap to select date"
          keyboardType='default'
          value={ (props.date)? props.date.toUTCString().slice(4,16) : new Date().toUTCString().slice(4,16)}
          editable = {false}
          //for IOS to able make the input box clickable
          pointerEvents='none'
        />
      </TouchableOpacity>
      {(show)? 
        <DateTimePicker
          testID="dateTimePicker"
          value={(props.date) ? props.date : new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={(event , date)=>{ props.onChange(event,date) , setShow(false) } }
          style = {{alignSelf : 'center' , width : 200}}
          
          
        />
      : null
      }
    </View>
  );
};

const styles = StyleSheet.create({

  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10, 
      borderRadius : 5,
    },
});