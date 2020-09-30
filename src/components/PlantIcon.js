import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { height, width } = Dimensions.get('window');
const imageWidth = ((width) / 2) - 30;

const PlantIcon = (props) => {

  const backgroundImage = props.image;

  const imageHeight =
    Image.resolveAssetSource(backgroundImage).height /
    Image.resolveAssetSource(backgroundImage).width * imageWidth;

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[styles.container, { height: imageHeight }, props.style]}>
        <Image source={backgroundImage}
          style={styles.imageStyle} />
        <Text style={styles.text}>
          {props.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
};

export default PlantIcon;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: imageWidth,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  imageStyle: {
    flex: 1,
    width: null,
    borderRadius: 15,
  },
  text: {
    color: '#FFF',
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    bottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});
