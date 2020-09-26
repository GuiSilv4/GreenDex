import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import { useAuth } from '../contexts/auth';

const { width, height } = Dimensions.get('window');

const Header = () => {
  const { user } = useAuth();
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#09252a' />
      <View style={styles.header} >
        <Text style={styles.headerText}>Hi, {user.name}!</Text>
        <Text style={styles.headerSubtitle}>What about discover a new plant for your collection?</Text>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#09252a',
    height: height / 4,
    width: '100%',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: 'center',
    paddingHorizontal: 25,
    position: 'absolute',
    top: 0,
  },
  headerText: {
    fontFamily: 'Merriweather-Bold',
    color: '#FFF',
    fontSize: height * 0.030,
    marginTop: Platform.OS === 'ios' ? height * 0.011 : - height * 0.011
  },
  headerSubtitle: {
    marginTop: height * 0.011,
    color: '#fff',
    fontFamily: 'Merriweather-Regular',
    width: width / 3 * 1.8,
    fontSize: height * 0.017,

  }

});
