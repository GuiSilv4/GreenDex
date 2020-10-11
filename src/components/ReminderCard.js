import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getHours, getMinutes, getDay } from 'date-fns';
import { usePlantLists } from '../contexts/PlantLists';

Icon.loadFont();

const { height, width } = Dimensions.get('window');

const ReminderCard = (props) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { deleteEvent } = usePlantLists();

  const { reminder } = props;

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const reminderWeekDay = getDay(new Date(reminder.startDate));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{props.children}</Text>
        <TouchableOpacity onPress={() => { deleteEvent(reminder.id) }}>
          <Icon name="trash-can-outline" size={height / 40} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Icon name="watering-can" size={height / 22} color='#2d2d2d' />
        <Text style={styles.hourText}>
          {getHours(new Date(reminder.startDate))}:
          {(getMinutes(new Date(reminder.startDate)) < 10 ? '0' : '')
            + getMinutes(new Date(reminder.startDate))}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#536e74" }}
          thumbColor={isEnabled ? "#123139" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.weekdays}>
        {weekDays.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Text style={[styles.weekdaysText, { color: index === reminderWeekDay ? 'green' : 'black' }]}>
                {item}
              </Text>
            </TouchableOpacity>
            <Text style={styles.weekdaysText}>{index !== weekDays.length - 1 ? ', ' : ""}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    alignSelf: 'center',
    height: height / 7,
    backgroundColor: "#09252a",
    borderRadius: 15,
    marginTop: 15,
  },
  weekdays: {
    backgroundColor: "#b3b5b5",
    flex: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  weekdaysText: {
    fontWeight: 'bold',
    fontSize: height / 55,

  },
  header: {
    height: '30%',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: 'Merriweather-Regular',
    color: "#FFF",
    fontSize: height / 55,
  },
  body: {
    backgroundColor: "#c8c9c9",
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  hourText: {
    fontSize: height / 25,
    fontWeight: 'bold',
    color: '#2d2d2d'
  }
});


export default ReminderCard;