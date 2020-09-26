import React, { useState } from 'react';
import { TouchableWithoutFeedback, Animated, View, Text, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const CloseButton = (props) => {

  const [rotateCross, setRotateCross] = useState(new Animated.Value(1));

  const spin = rotateCross.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '180deg']
  });

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <Animated.View style={[styles.closeButton, props.style]}>
        <Animated.Text style={{
          fontSize: 15,
          transform: [{ rotate: spin }]
        }}>X</Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default CloseButton;

const styles = StyleSheet.create({
  closeButton: {
    zIndex: 3,
    position: 'absolute',
    height: 40,
    width: 40,
    top: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  }
})