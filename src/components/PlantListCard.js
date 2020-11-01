import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');

const PlantListCard = ({ onPress, image, name }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={[StyleSheet.absoluteFill, styles.plantImage]} >
          <Image source={image}
            resizeMode='contain'
            style={styles.imageStyle} />
        </View>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
          locations={[0.1, 0.5, 1]}
          colors={['#0e4e3b', '#337864', '#10906a']}
          style={styles.insideContainer}>
          <View style={styles.name} >
            <Text style={styles.nameText}>{name}</Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    marginRight: 15,
    paddingTop: 40,
    alignItems: 'center'
  },
  plantImage: {
    zIndex: 3,

  },
  imageStyle: {
    height: height / 4,
    alignSelf: 'center'
  },
  insideContainer: {
    width: width / 3,
    height: height / 4,
    backgroundColor: '#50837b',
    borderRadius: 25,
    justifyContent: 'flex-end',
    padding: 20,
    alignItems: 'center'
  },
  nameText: {
    color: "#FFF",
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
    fontSize: 15,

  }
});

export default PlantListCard;