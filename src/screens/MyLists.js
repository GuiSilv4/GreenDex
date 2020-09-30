import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomPage from '../components/BottomPage';
import Header from '../components/Header';
import MainContainer from '../components/MainContainer';
import { usePlantLists } from '../contexts/PlantLists';
import PlantIcon from '../components/PlantIcon';

const { height } = Dimensions.get('window');

const MyLists = (props) => {

  const { navigate } = props.navigation;

  const { plantLists, cleanAllLists } = usePlantLists();

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Text style={styles.headerText}> My Lists</Text>
      </Header>
      <MainContainer style={{ alignItems: 'flex-start' }}>
        <ScrollView style={{ marginTop: 30 }} showsVerticalScrollIndicator={false}>
          {plantLists
            .filter(list => list.name != 'Reminders' && list.data.length)
            .map((list, listIndex) => (
              <View style={{ flex: 1 }} key={listIndex}>
                <View style={[styles.listLabelContainer, { marginTop: listIndex > 0 ? height / 30 : 0 }]}>
                  <Text style={styles.listLabel}>{list.name}</Text>
                </View>
                <ScrollView
                  horizontal={true}
                  style={styles.horizontalScrollView}
                  showsHorizontalScrollIndicator={false}>
                  {list.data.map((plant, index) => (
                    <PlantIcon key={index} name={plant.name} image={plant.backgroundImage}
                      onPress={() => { navigate('Plant', { plant, listIndex, action: 'remove' }) }} style={{ marginRight: 5 }} />
                  ))}
                  <Text style={styles.text}> </Text>
                </ScrollView>
              </View>
            ))}
          <View>
            <TouchableOpacity onPress={cleanAllLists}>
              <Text style={{ color: 'red', marginTop: 10, fontWeight: 'bold' }}>Limpar Lista</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </MainContainer>
      <BottomPage />
    </View>
  );
}

const styles = StyleSheet.create({
  listLabelContainer: {
    marginVertical: 5,
  },
  listLabel: {
    fontFamily: 'Merriweather-Bold',
    fontSize: height / 35,
    color: '#0a2129'
  },
  headerText: {
    fontFamily: 'Merriweather-Bold',
    color: '#FFF',
    fontSize: height * 0.035,
    marginTop: Platform.OS === 'ios' ? height * 0.011 : - height * 0.011
  },
  horizontalScrollView: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10
  }
})
export default MyLists;