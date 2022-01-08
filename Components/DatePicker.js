import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default  DatePicker = (props) => {
  // const [date, setDate] = useState(new Date(1598051730000));

  // const [show, setShow] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);

  //   console.log('the new date' , selectedDate)

  // };


  // const showDatepicker = () => {
  //   setShow(true);
  // };

  return (
    <View style={{width : '80%', }}>


        <DateTimePicker
          testID="dateTimePicker"
          value={props.date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={(event , date)=>{ props.onChange(event,date)} }
          style = {{alignSelf : 'center' , width : 200}}
          
        />

    </View>
  );
};