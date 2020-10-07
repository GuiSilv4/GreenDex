import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import PlantIcon from '../components/PlantIcon';
import { useNavigation } from '@react-navigation/native';
import { usePlantLists } from '../contexts/PlantLists';

const { width } = Dimensions.get('window');

const PlantList = (props) => {

  const { plantLists } = usePlantLists();

  const navigation = useNavigation();
  const { navigate } = navigation;

  return (

    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={styles.horizontalScrollView}
        showsHorizontalScrollIndicator={false}>
        {plantLists[props.listIndex].data.map((plant, index) => (
          <PlantIcon key={index} name={plant.name} image={plant.backgroundImage}
            onPress={() => {
              navigate('Plant', {
                plant, listIndex: props.listIndex,
                action: 'remove'
              })
            }} style={{ marginRight: 15, marginBottom: 0 }} />
        ))}
        <View style={{ height: 10, width: 25 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f2f7',
    width: width,
  },

  horizontalScrollView: {
    paddingHorizontal: 15,
    marginHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 25,
  }
});
export default PlantList;