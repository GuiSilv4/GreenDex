
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const WeekDayPicker = () => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const reminderWeekDay = 2;

  return (
    <View style={styles.weekdays}>
      {weekDays.map((item, index) => (
        <View key={index} style={styles.weekdayContainer}>
          <TouchableOpacity delayPressIn={0}>
            <Text style={[styles.weekdaysText, { color: index === reminderWeekDay ? 'red' : 'white' }]}>
              {item}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default WeekDayPicker;

const styles = StyleSheet.create({
  weekdays: {
    flexDirection: 'row'
  },
  weekdayContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3
  },
  weekdaysText: {
    color: "#FFF"
  }


});
