import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

const Header = ({ children, style }) => {

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#09252a' />
      <View style={[styles.header, style]} >
        {children}
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#09252a',
    height: height / 5,
    width: '100%',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 25,
    position: 'absolute',
    top: 0,
  },

});
