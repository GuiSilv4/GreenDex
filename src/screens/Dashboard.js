import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView, Platform
} from 'react-native';
import { useAuth } from '../contexts/auth';
import PlantIcon from '../components/PlantIcon';
import { plantData } from '../services/database';
import SearchBar from '../components/SearchBar';
import BottomPage from '../components/BottomPage';
import Header from '../components/Header';

const { width, height } = Dimensions.get('window');

const Dashboard = (props) => {

  const { navigate } = props.navigation;
  const { user, signOut } = useAuth();

  function handleSignOut() {
    signOut();
  };

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar style={{ top: (height / 4) - ((height / 18) * 0.7), zIndex: 2 }} />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', marginTop: 45, marginBottom: 25 }}>
            <View style={{ marginRight: 20 }}>
              {plantData
                .filter((_, i) => i % 2 === 0)
                .map((plant, index) =>
                  <PlantIcon key={index} name={plant.name} image={plant.backgroundImage}
                    onPress={() => { navigate('Plant', plant) }} />
                )}
            </View>
            <View>
              {plantData
                .filter((_, i) => i % 2 !== 0)
                .map((plant, index) =>
                  <PlantIcon key={index} name={plant.name} image={plant.backgroundImage}
                    onPress={() => { navigate('Plant', plant) }} />
                )}
            </View>
          </View>
        </ScrollView>
      </View>
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

  mainContainer: {
    height: ((height / 8) * 5) + 30,
    top: (height / 4) - 15,
    zIndex: -1,
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
  },

});

export default Dashboard;
