import React, { useState, useEffect } from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
const { width, height } = Dimensions.get('window');

export default function Button(props) {

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDisabled(props.disabled);
  }, [props.disabled]);

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  return (
    <TouchableOpacity style={[styles.container]} onPress={props.onPress}
      disabled={disabled} delayPressIn={0}>
      <Animated.View
        style={[styles.button, (props.height && { height: props.height }), props.style]}
      >

        {loading ?
          <ActivityIndicator color="#FFF" size="large" /> :
          (
            <Text style={[styles.buttonText, { color: props.textColor ? props.textColor : "#FFF", }]}>
              {props.title ? props.title.toUpperCase() : "BOTÃO"}
            </Text>
          )}
      </Animated.View>
    </TouchableOpacity>
  )
}

let marginDevice = 0;

if (Dimensions.get('window').height <= 760) {
  marginDevice = 40;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  button: {
    width: '100%',
    height: height / 14,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    fontFamily: 'Merriweather-Regular',
    fontSize: 18,
    fontWeight: 'bold',
  },
})