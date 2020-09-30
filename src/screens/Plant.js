import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  Platform,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Tag from '../components/Tag';
import PlantCare from '../components/PlantCare';
import Icon from 'react-native-vector-icons/Ionicons';
import ListSquareIcon from '../components/ListSquareIcon';
import { usePlantLists } from '../contexts/PlantLists';

Icon.loadFont();

const { width, height } = Dimensions.get('window');
const borderWidth = 0;
const defaultMargin = height / 40;

const Plant = (props) => {

  const { navigation, route } = props;

  const plantData = route.params.plant;
  const action = route.params.action;

  const [selectedLists, setSelectedLists] = useState([0]);
  const [actionText, setActionText] = useState('Add');
  const { addPlantToLists, removePlantFromList, plantLists } = usePlantLists();
  const [thisPlantLists, setThisPlantLists] = useState(plantLists);


  useEffect(() => {
    if (action === 'remove') {
      setActionText('Remove');
      const newArray = [...thisPlantLists];
      setThisPlantLists(newArray.filter((item, index) => index === route.params.listIndex));
    }
  }, []);


  const handleAddOrRemovePlant = async () => {
    if (action === 'remove') {
      await removePlantFromList(plantData, route.params.listIndex);
      navigation.goBack();
    } else {
      await addPlantToLists(plantData, selectedLists);
      navigation.goBack();
    }
  };

  const selectList = (item) => {
    if (!selectedLists.includes(item)) {
      setSelectedLists([...selectedLists, item]);
    }
    else {
      const newArray = [...selectedLists];
      const index = newArray.indexOf(item);
      if (index > -1) {
        newArray.splice(index, 1);
      }
      setSelectedLists(newArray);
    }
  }
  return (
    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFill, styles.background]} />
      <StatusBar backgroundColor='#09252a' barStyle='light-content' />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={[{ ...StyleSheet.absoluteFill }, styles.plantImage]}>
          <Image source={plantData.image}
            resizeMode='contain'
            style={{ flex: 1, height: null, width: null }} />
        </View>

        <TouchableOpacity style={styles.backArrow} delayPressIn={0} onPress={navigation.goBack}>
          <Icon name='arrow-back' color='#aaa' size={(height / 40) + 15} />
        </TouchableOpacity>

        <Text style={styles.plantName}>{plantData.name}</Text>
        <Text style={styles.plantDescription}>{plantData.description}</Text>
        <View style={styles.tagsContainer}>
          {plantData.tags.map((tag) => <Tag key={tag.id} title={tag.description} color={tag.color} />)}
        </View>
        <View style={styles.plantInfoContainer}>
          <View style={styles.plantInfo}>
            <PlantCare title={plantData.care.water} icon='water-outline' />
            <PlantCare title={plantData.care.sun} icon='ios-sunny-outline' />
            <PlantCare title={plantData.care.temperature} icon='thermometer-outline' />
          </View>
        </View>

        <Text style={styles.chooseText}>Choose the list</Text>
        <View style={styles.listContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={thisPlantLists}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => <ListSquareIcon text={item.name} selected={selectedLists.includes(index)}
              onPress={() => { selectList(index) }} />
            }
          >
          </FlatList>
        </View>
      </SafeAreaView>
      <TouchableOpacity style={{ flex: 1 }} delayPressIn={0}
        onPress={handleAddOrRemovePlant}>
        <View style={styles.bottomView}><Text style={styles.bottomText}>{actionText} to List + </Text></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f0f2f7',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: width / 8,
  },

  listContainer: {
    marginTop: defaultMargin,
    flexDirection: 'row'
  },

  plantImage: {
    height: Platform.OS === 'ios' ? height / 2 : height / 1.8,
    left: (width / 2) + 10,
    width: width / 2,
    marginTop: Platform.OS === 'ios' ? height / 9 : height / 14,
    borderWidth
  },

  bottomView: {
    borderWidth,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.85,
  },

  plantInfo: {
    borderWidth,
    flex: 1,
    marginLeft: width * 0.17,
    justifyContent: 'space-around',
    paddingVertical: 10,
  },

  plantInfoContainer: {
    backgroundColor: '#0f3f3c',
    width: (width / 2) + 70,
    left: -70,
    height: height / 6.5,
    borderRadius: 30,
    marginTop: defaultMargin + 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.28,
    shadowRadius: 16.00,

    elevation: 24,
  },

  background: {
    top: -50,
    height: height * 0.95,
    borderRadius: width / 8,
    alignItems: 'center',
    backgroundColor: '#09252a'
  },

  tagsContainer: {
    marginTop: defaultMargin - 5,
    width: width / 2,
    borderWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  safeAreaView: {
    alignItems: 'flex-start',
    height: height * 0.95 - 50,
    width: width * 0.85,
    borderWidth
  },

  backArrow: {
    borderWidth,
  },

  plantName: {
    color: '#FFF',
    fontSize: height / 23,
    fontFamily: 'Merriweather-Regular',
    marginTop: defaultMargin - 5,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: Platform.OS === 'ios' ? 10 : 15
  },

  plantDescription: {
    color: '#FFF',
    fontSize: (height / 23) / 2,
    width: width / 2,
    borderWidth,
    fontFamily: 'Merriweather-Bold',
    lineHeight: 25,
    marginTop: defaultMargin - 10,
  },

  bottomText: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 25,
    color: '#09252a',
  },

  chooseText: {
    fontFamily: 'Merriweather-Bold',
    fontSize: height / 30,
    color: '#FFF',
    marginTop: defaultMargin + 15,
  }
});

export default Plant;