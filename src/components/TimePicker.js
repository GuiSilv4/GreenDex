import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { usePlantLists } from '../contexts/PlantLists';

const TimePicker = (props) => {

  const { event } = props;

  const { setEventHour } = usePlantLists();

  const hideDatePicker = () => {
    props.setShowTimePicker();
  };

  const handleConfirm = (date) => {
    setEventHour(event, date);
    hideDatePicker();
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={props.showTimePicker}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>);

}

export default TimePicker; 