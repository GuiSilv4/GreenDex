import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Dimensions } from "react-native";
import Modal from 'react-native-modal';
import { usePlantLists } from '../contexts/PlantLists';
import Input from '../components/Input';
import WeekDayPicker from '../components/WeekDayPicker';

const { height, width } = Dimensions.get('window');

const RemindersSettings = (props) => {
  const {
    bestWeekDay,
    bestDayHour,
    setBestDayHourFunction,
    setBestWeekDayFunction } = usePlantLists();

  const [bestDayHourValue, setBestDayHourValue] = useState(bestDayHour.toString());

  const [bestWeekDayValue, setBestWeekDayValue] = useState(bestWeekDay.toString());

  const saveSettings = () => {
    setBestDayHourFunction(parseInt(bestDayHourValue));
    setBestWeekDayFunction(parseInt(bestWeekDayValue));
    props.toggleModal();
  };

  return (
    <Modal
      isVisible={props.visible}
      useNativeDriver={true}
      avoidKeyboard={true}
      onBackdropPress={props.toggleModal}
      onBackButtonPress={props.toggleModal}
      deviceWidth={width}
      deviceHeight={height}
    >
      <View style={styles.modalView}>
        <Text>Reminders Default Settings</Text>
        <Text>Best Watering Hour</Text>
        <Input
          placeholder="Best Watering Hour"
          value={bestDayHourValue}
          onChangeText={setBestDayHourValue}
          keyboardType='numeric'
        />
        <Text>Best Watering Week Day</Text>
        <WeekDayPicker />
        <Input
          placeholder="Best Watering Week Day"
          value={bestWeekDayValue}
          onChangeText={setBestWeekDayValue}
          keyboardType='numeric'
        />
        <Button title="Save" onPress={saveSettings}></Button>
      </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(50,50,50,0.8)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default RemindersSettings;
