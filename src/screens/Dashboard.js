import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView, Platform
} from 'react-native';
import PlantIcon from '../components/PlantIcon';
import { plantData } from '../services/database';
import SearchBar from '../components/SearchBar';
import BottomPage from '../components/BottomPage';
import Header from '../components/Header';
import { useAuth } from '../contexts/auth';
import MainContainer from '../components/MainContainer';
import { usePlantLists } from '../contexts/PlantLists';

const { width, height } = Dimensions.get('window');

const Dashboard = (props) => {
  const { user } = useAuth();
  const { navigate } = props.navigation;
  const { requestCalendarPermission } = usePlantLists();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(plantData);
    setMasterDataSource(plantData);
    requestCalendarPermission();
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter((item) => {
        const itemData = item.name
          ? item.name.toUpperCase() :
          ''.toUpperCase;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <Header >
        <Text style={styles.headerText}>Hi, {user.name}!</Text>
        <Text style={styles.headerSubtitle}>What about discover a new plant for your collection?</Text>
      </Header>
      <SearchBar
        style={{ top: (height / 5) - ((height / 18) * 0.7), zIndex: 2 }}
        value={search}
        onChangeText={(text) => searchFilterFunction(text)}
      />
      <MainContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', marginTop: 50, marginBottom: 25 }}>
            <View style={{ marginRight: 20, width: width / 2 - 25 }}>
              {filteredDataSource
                .filter((_, i) => i % 2 === 0)
                .map((plant, index) =>
                  <PlantIcon key={index} name={plant.name} image={plant.backgroundImage}
                    onPress={() => { navigate('Plant', { plant, action: 'add' }) }} />
                )}
            </View>
            <View style={{ width: width / 2 - 25 }}>
              {filteredDataSource
                .filter((_, i) => i % 2 !== 0)
                .map((plant, index) =>
                  <PlantIcon key={index} name={plant.name} image={plant.backgroundImage}
                    onPress={() => { navigate('Plant', { plant, action: 'add' }) }} />
                )}
            </View>
          </View>
        </ScrollView>
      </MainContainer>
      <BottomPage />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#f0f2f7',
    flex: 1,
    alignItems: 'center',
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

export default Dashboard;
