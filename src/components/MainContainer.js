import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const MainContainer = (props) => {
  return (
    <View style={[styles.mainContainer, props.style]}>
      {props.children}
    </View>
  );
}

export default MainContainer;

const styles = StyleSheet.create({
  mainContainer: {
    height: ((height / 40) * 27) + 30,
    top: (height / 5) - 15,
    zIndex: -1,
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});
