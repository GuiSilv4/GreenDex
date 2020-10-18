import React from 'react';
import { View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePicker = (props) => {

  const hideDatePicker = () => {
    props.setShowTimePicker();
  };

  const handleConfirm = (date) => {
    props.setEventHour(date);
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