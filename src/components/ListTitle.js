import React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { height } = Dimensions.get('window');

const ListTitle = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#09252a',
    height: height / 12,
    padding: 20,
    marginHorizontal: 15,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center'

  },
  text: {
    fontFamily: 'Merriweather-Bold',
    fontSize: height / 35,
    color: '#f0f2f7',
  },
})

export default ListTitle;