import React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { height } = Dimensions.get('window');

const TopCurve = () => {
  const size = Math.hypot(40);
  return (
    <Svg
      style={styles.topCurveStyle}
      width={size}
      height={size}
      viewBox="0 0 1 1"
    >
      <Path d="M 0 1 A 0 0, 0, 0, 0, 1 0 L 1 1" fill="#032021" />
    </Svg>
  );
}

const BottomCurve = () => {
  const size = Math.hypot(40);
  return (
    <Svg
      style={styles.bottomCurveStyle}
      width={size}
      height={size}
      viewBox="0 0 1 1"
    >
      <Path d="M 0 1 
               A 0 0, 0, 0, 1, 1 0 
               L 0 0" fill="#032021" />
    </Svg>
  );
}

const ListTitle = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <TopCurve />
      <BottomCurve />
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#032021',
    height: 50,
    padding: 10,

  },
  text: {
    fontFamily: 'Merriweather-Bold',
    fontSize: height / 35,
    color: '#d0d6d5',
  },
  topCurveStyle: {
    position: 'absolute',
    bottom: 50,
    right: 0,
    zIndex: 2,
  },
  bottomCurveStyle: {
    position: 'absolute',
    bottom: -39,
    zIndex: 2,
  },
})

export default ListTitle;