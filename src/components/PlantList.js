import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import PlantIcon from '../components/PlantIcon';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PlantList = (props) => {

  const navigation = useNavigation();
  const { navigate } = navigation;

  return (

    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={styles.horizontalScrollView}
        showsHorizontalScrollIndicator={false}>
        {props.data.map((plant, index) => (
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
    flex: 1,
    backgroundColor: '#bfc9c7',
    width: width,
    borderBottomRightRadius: 35,
    borderTopLeftRadius: 35,

  },

  horizontalScrollView: {
    paddingHorizontal: 15,
    marginHorizontal: 10,
    paddingVertical: 30,
  }
});
export default PlantList;