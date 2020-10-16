import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import BottomPage from '../components/BottomPage';
import MainContainer from '../components/MainContainer';
import Header from '../components/Header';
import ReminderCard from '../components/ReminderCard';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { usePlantLists } from '../contexts/PlantLists';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RemindersSettings from './RemindersSettings';



Icon.loadFont();

const { height } = Dimensions.get('window');

const Reminders = () => {
  const { remindersList } = usePlantLists();
  const [settingsVisible, setSettingsVisible] = useState(false);

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f2f7' }}>
      {settingsVisible &&
        <RemindersSettings
          visible={settingsVisible}
          toggleModal={toggleSettings}
        />}
      <Header style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}> Reminders </Text>
          <TouchableOpacity style={{ position: 'absolute', right: 0, }}
            delayPressIn={0} onPress={toggleSettings}>
            <Icon name="settings" size={height / 30} color="#FFF" />
          </TouchableOpacity>
        </View>
      </Header>
      <MainContainer style={styles.mainContainer}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {remindersList.map(item => (
            <ReminderCard
              key={item.id}
              reminder={item}>
              {item.title}
            </ReminderCard>
          ))}
        </ScrollView>
      </MainContainer>
      <BottomPage />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'flex-start', paddingHorizontal: 0,
    height: ((height / 8) * 6) + 70,
    top: (height / 8),
  },
  scrollView: {
    alignSelf: 'center',
  },
  header: {
    height: height / 8,
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Merriweather-Bold',
    color: '#FFF',
    fontSize: height * 0.035,

  },
  headerContent: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? height * 0.011 : - height * 0.011,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  }
});


export default Reminders;