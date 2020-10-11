import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import BottomPage from '../components/BottomPage';
import MainContainer from '../components/MainContainer';
import Header from '../components/Header';
import ReminderCard from '../components/ReminderCard';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { usePlantLists } from '../contexts/PlantLists';
import { ScrollView } from 'react-native-gesture-handler';


const { height } = Dimensions.get('window');

const Reminders = () => {
  const { remindersList } = usePlantLists();

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f2f7' }}>
      <Header style={styles.header}>
        <Text style={styles.headerText}> Reminders </Text>
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
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Merriweather-Bold',
    color: '#FFF',
    fontSize: height * 0.035,
    marginTop: Platform.OS === 'ios' ? height * 0.011 : - height * 0.011
  },
});


export default Reminders;