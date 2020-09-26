import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');
const bottomHeight = height / 8;

const TopCurve = () => {
  const size = Math.hypot(50);
  return (
    <Svg
      style={styles.topCurveStyle}
      width={size}
      height={size}
      viewBox="0 0 1 1"
    >

      <Path d="M 0 1 A 0 0, 0, 0, 0, 1 0 L 1 1" fill="#09252a" />
    </Svg>
  );
}

const BottomPage = () => {
  return (
    <View style={styles.container}>
      <TopCurve />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: bottomHeight,
    width: '100%',
    backgroundColor: '#09252a',
    borderTopLeftRadius: 50,
  },

  topCurveStyle: {
    position: 'absolute',
    bottom: bottomHeight,
    right: 0
  },
})

export default BottomPage;