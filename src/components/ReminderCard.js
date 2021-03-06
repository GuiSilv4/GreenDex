import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Switch, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getHours, getMinutes, getDay } from 'date-fns';
import { usePlantLists } from '../contexts/PlantLists';
import TimePicker from '../components/TimePicker';
import WeekDayPicker from '../components/WeekDayPicker';

Icon.loadFont();

const { height, width } = Dimensions.get('window');

const ReminderCard = (props) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { deleteEvent, setEventHour, setEventWeekDay } = usePlantLists();
  const { reminder } = props;
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const reminderWeekDay = getDay(new Date(reminder.startDate));
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const updateEventHour = async (date) => {

    setIsLoading(true);

    await setEventHour(reminder, date);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const changeReminderWeekDay = async (reminder, reminderWeekDay) => {

    setIsLoading(true);

    await setEventWeekDay(reminder, reminderWeekDay);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  return (
    <View style={styles.container}>
      {showTimePicker &&
        <TimePicker
          setEventHour={updateEventHour}
          showTimePicker={showTimePicker}
          setShowTimePicker={() => { setShowTimePicker(!showTimePicker) }} />}
      <View style={styles.header}>
        <Text style={styles.headerText}>{props.children}</Text>
        <TouchableOpacity onPress={() => { deleteEvent(reminder) }}>
          <Icon name="trash-can-outline" size={height / 40} color="#FFF" />
        </TouchableOpacity>
      </View>
      {isLoading ? <ActivityIndicator size='large' color='#09252a' style={{ flex: 1 }} /> :
        <>
          <View style={styles.body}>
            <Icon name="watering-can" size={height / 22} color='#2d2d2d' />
            <TouchableOpacity onPress={() => { setShowTimePicker(!showTimePicker) }}>
              <Text style={styles.hourText}>
                {
                  getHours(new Date(reminder.startDate))}:
              {(getMinutes(new Date(reminder.startDate)) < 10 ? '0' : '')
                  + getMinutes(new Date(reminder.startDate))
                }
              </Text>
            </TouchableOpacity>
            <Switch
              trackColor={{ false: "#767577", true: "#536e74" }}
              thumbColor={isEnabled ? "#123139" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.weekdays}>
            <WeekDayPicker
              value={reminderWeekDay}
              onChange={(newWeekDay) => { changeReminderWeekDay(reminder, newWeekDay); }}
              textStyle={styles.weekdaysText}
              separator={true}
              activeColor='green' />
          </View>
        </>}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    width: width - 30,
    alignSelf: 'center',
    height: height / 7,
    backgroundColor: "#c8c9c9",
    borderRadius: 15,
    marginTop: 15,
    justifyContent: 'center',
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
    backgroundColor: "#09252a",
    height: '30%',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
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