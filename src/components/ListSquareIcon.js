import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

export default function ListSquareIcon(props) {
  const [selected, setSelected] = useState(props.selected ? props.selected : false);

  return (
    <TouchableWithoutFeedback onPress={() => { setSelected(!selected) }}>
      <View style={[styles.container, selected ? styles.selected : styles.normal]}>
        <Text style={[styles.text, selected ? styles.textSelected : styles.normal]}>
          {props.text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  normal: {},
  container: {
    height: height / 9,
    width: height / 9,
    borderRadius: 20,
    backgroundColor: '#0f3f3c',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.40,
    shadowRadius: 12.35,

    elevation: 19,
  },
  selected: {
    backgroundColor: '#FFF'
  },
  text: {
    fontSize: height / 40,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textSelected: {
    color: '#0f3f3c'
  }
});
