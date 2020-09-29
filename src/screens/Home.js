import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomPage from '../components/BottomPage';
import Header from '../components/Header';
import MainContainer from '../components/MainContainer';
import { usePlantLists } from '../contexts/PlantLists';

const Home = () => {
  const { plantLists, cleanAllLists } = usePlantLists();
  return (
    <View style={{ flex: 1 }}>
      <Header></Header>
      <MainContainer style={{ alignItems: 'flex-start' }}>
        <View style={{ marginTop: 30 }}>
          {plantLists.map((list, index) => (
            <View key={index}>
              <Text style={styles.text}> - {list.name}</Text>
              {list.data.map((item, index) => (
                <Text key={index} style={styles.text}> |- {item.name}</Text>
              ))}
              <Text style={styles.text}> </Text>
            </View>
          ))}
        </View>
        <View>
          <TouchableOpacity onPress={cleanAllLists}>
            <Text style={{ color: 'red', marginTop: 10, fontWeight: 'bold' }}>Limpar Lista</Text>
          </TouchableOpacity>
        </View>
      </MainContainer>
      <BottomPage />
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 20 }
})
export default Home;