import React from 'react';
import { Text, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Tag = (props) => {
  return (
    <View style={{
      width: ((width / 2) / 2) - 6,
      height: 24,
      borderRadius: 12,
      backgroundColor: props.color ? props.color : '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    }}>
      <Text style={{
        fontSize: (((width / 2) / 2) - 8) / 7.5,
        color: props.color ? '#FFF' : '#000'
      }}>{props.title}</Text>
    </View>);
}

export default Tag;