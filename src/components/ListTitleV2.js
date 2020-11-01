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
    backgroundColor: '#f0f2f7',
    height: height / 12,
    paddingHorizontal: 20,
    justifyContent: 'center',

  },
  text: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: height / 20,
    color: '#09252a',
  },
})

export default ListTitle;