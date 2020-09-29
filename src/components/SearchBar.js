import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const SearchBar = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder='Search Here'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    height: height / 18,
    position: 'absolute',
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: Platform.OS === 'ios' ? 15 : 8,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.09,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default SearchBar;