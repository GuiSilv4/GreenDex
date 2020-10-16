import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

Icon.loadFont();

const colorTheme = '#999';

const { width, height } = Dimensions.get('window');

export default function Input(props) {

  const [showPassword, setShowPassword] = useState(false);

  const initialSizeState = {
    fontSize: 16,
    iconSize: 25,
    eyeIconSize: 20,
  }
  const [size, setSize] = useState(initialSizeState)

  const loadSize = () => {
    if (props.size === 'big') {
      setSize({
        fontSize: 18,
        iconSize: 30,
        eyeIconSize: 22,
      })
    } else { setSize(initialSizeState) }
  }

  useEffect(() => {
    loadSize();
  }, [props.size]);

  const eyeIcon = () => {
    return (
      <TouchableWithoutFeedback onPress={() => { setShowPassword(!showPassword) }}>
        <Icon
          name={showPassword ? 'eye' : 'eye-off'}
          size={size.eyeIconSize}
          color={colorTheme}
          style={[styles.icon, props.styleIcon]}
        />
      </TouchableWithoutFeedback>
    )
  }
  return (

    <View style={[styles.container, props.style]}>
      <Icon
        name={props.iconName}
        size={size.iconSize}
        color={colorTheme}
        style={[styles.icon, props.styleIcon]}
      />
      <TextInput
        style={[styles.textInput, { fontSize: size.fontSize, }, props.styleInput]}
        placeholder={props.placeholder}
        autoCapitalize='none'
        autoCorrect={false}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secure ? !showPassword : false}
        selectTextOnFocus={false}
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
      />
      {props.secure && eyeIcon()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    marginTop: 8,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colorTheme,
    width: "80%",
    alignSelf: 'center',
    alignItems: 'center',
    height: height / 19,


  },
  icon: {
    marginLeft: 10,
  },

  textInput: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    flex: 1,
    paddingTop: 0,
    color: colorTheme,
    marginTop: Platform.OS === 'ios' ? 0 : 15,
  }

});