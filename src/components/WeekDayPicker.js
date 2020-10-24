
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const WeekDayPicker = (props) => {

  const separator = props.separator ? props.separator : false;

  const initalState = [
    { name: "Sun", active: false },
    { name: "Mon", active: false },
    { name: "Tue", active: false },
    { name: "Wed", active: false },
    { name: "Thu", active: false },
    { name: "Fri", active: false },
    { name: "Sat", active: false }];

  const [weekDays, setWeekDays] = useState(initalState);

  useEffect(() => {
    setActive(props.value);
  }, []);

  const setActive = (index) => {
    const newArray = [...weekDays];
    newArray.map(item => item.active = false);
    newArray[index].active = true;
    setWeekDays(newArray);
  };


  return (
    <View style={styles.weekdays}>
      {weekDays.map((item, index) => (
        <TouchableOpacity delayPressIn={0}
          onPress={() => { setActive(index); props.onChange(index); }} key={index}>
          <View style={[styles.weekdayContainer, props.style]}>
            <Text style={[styles.weekdaysText, props.textStyle,
            {
              color: item.active ? (props.activeColor ? props.activeColor : 'red')
                : (props.inactiveColor ? props.inactiveColor : 'black')
            }]}>
              {item.name}
            </Text>
            {separator && index !== weekDays.length - 1 && <Text>, </Text>}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default WeekDayPicker;

const styles = StyleSheet.create({
  weekdays: {
    flexDirection: 'row',
  },

  weekdayContainer: {
    flexDirection: 'row'
  },

  weekdaysText: {
  }


});
