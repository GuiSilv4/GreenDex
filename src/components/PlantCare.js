import React from 'react';
import { View, Text } from 'react-native';
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();
const PlantCare = (props) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <Icon
        name={props.icon}
        color='#4f836e'
        size={25}
      />
      <Text style={{
        color: "#FFF",
        fontSize: 16,
        marginLeft: 10
      }}>
        {props.title}
      </Text>
    </View>
  )
}

export default PlantCare;