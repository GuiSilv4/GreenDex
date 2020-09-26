import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import Button from '../components/Button';
import CloseButton from '../components/CloseButton';
import Input from '../components/Input';
import { useAuth } from '../contexts/auth';

const { width, height } = Dimensions.get('window');

const Login = () => {

  const [backgroundY] = useState(new Animated.Value(0));
  const [buttonsOpacity] = useState(new Animated.Value(1));
  const [CloseButtomOpacity] = useState(new Animated.Value(0));
  const [inputsZIndex] = useState(new Animated.Value(-1));
  const [showRegister, setShowRegister] = useState(false);

  const { signIn } = useAuth();
  const showInputs = (formType) => {
    if (formType === 'register') {
      setShowRegister(true);
    }
    Animated.parallel([
      Animated.timing(backgroundY, {
        toValue: - height / 3,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(buttonsOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(CloseButtomOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(inputsZIndex, {
        toValue: 1,
        duration: 10,
        useNativeDriver: true
      })
    ]).start();
  };

  const hideInputs = () => {
    setTimeout(() => {
      setShowRegister(false);
    }, 1000);


    Animated.parallel([
      Animated.timing(backgroundY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(buttonsOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(CloseButtomOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(inputsZIndex, {
        toValue: -1,
        duration: 10,
        useNativeDriver: true
      })
    ]).start();
  };

  const handleLogin = async () => {
    console.log('Loggin');
    const response = {
      token: 'Bearer ufgdhdgkjhsdkfgjhgsdgdfg',
      user: {
        name: 'Guilherme',
        email: 'guilherme.alano@gmail.com'
      }

    };
    await signIn(response);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}    >
      <StatusBar barStyle='light-content' backgroundColor='rgba(17,57,60,1)' />
      <Animated.View style={{
        ...StyleSheet.absoluteFill,
        transform: [{ translateY: backgroundY }]
      }}>
        <Image source={require('../assets/fundo3.jpeg')}
          style={{
            flex: 1,
            height: null,
            width: null
          }} />
      </Animated.View>
      <SafeAreaView style={styles.mainContentContainer}>
        <View style={styles.topPageContainer}>

          <View style={styles.logoContainer}>
            <View style={styles.logoSquare} >
              <Image source={require('../assets/logo.png')}
                style={{ height: '70%', width: '70%' }} />
            </View>
            <Text style={styles.logoText}> GreenDex </Text>
          </View>

          <View style={styles.phraseTextContainer}>
            <Text style={styles.phraseText}>
              Everyone should live with a little more green
            </Text>
          </View>

        </View>
        <View style={styles.bottomPageContainer}>
          <Button title="Register"
            style={{
              backgroundColor: 'rgba(17, 57, 60, 0.7)',
              opacity: buttonsOpacity
            }}
            onPress={() => { showInputs('register') }}
          />
          <Button title="Login" style={{ backgroundColor: '#FFF', opacity: buttonsOpacity }}
            textColor='rgba(17, 57, 60, 1)'
            onPress={() => { showInputs('login') }} />
          <TouchableOpacity>
            <Animated.Text style={[styles.bottonText, { opacity: buttonsOpacity }]}>Forgot Password?</Animated.Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
      <Animated.View style={[styles.inputsContainer, {
        zIndex: inputsZIndex,
        opacity: CloseButtomOpacity
      }]} >
        <CloseButton onPress={hideInputs} style={{ opacity: CloseButtomOpacity }} />
        <Input iconName='mail' placeholder='Email' style={{ marginTop: Platform.OS === 'android' ? 15 : 0 }}></Input>
        <Input iconName='lock' placeholder='Password' secure></Input>
        {showRegister && <Input iconName='lock' placeholder='Confirm Password' secure />}
        <Button title={showRegister ? 'REGISTER' : 'LOGIN'}
          style={{
            backgroundColor: 'rgba(17, 57, 60, 1)',
            width: '80%',
          }}
          onPress={() => { showRegister ? null : handleLogin() }}
        />
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'flex-end'
  },

  inputsContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: (height / 3) + 20,
  },

  mainContentContainer: {
    flex: 1,
    width: width,
    alignItems: 'center'
  },

  topPageContainer: {
    flex: 1,
    width: '85%',
  },

  phraseTextContainer: {
    flex: 1,
    width: '100%',
    marginTop: 70,
  },

  phraseText: {
    color: "#FFF",
    fontFamily: 'Merriweather-Regular',
    fontSize: (height / 24),
  },

  bottomPageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '85%',

  },

  bottonText: {
    color: "#FFF",
    fontFamily: 'Merriweather-Regular',
    fontSize: 18,
    textDecorationLine: 'underline',
    marginTop: 35,
    marginBottom: 10,
  },

  logoContainer: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center'
  },

  logoSquare: {
    width: 70,
    height: 70,
    backgroundColor: '#FFF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',

  },
  logoText: {
    color: "#FFF",
    fontFamily: 'Merriweather-Bold',
    fontSize: 30,
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.83,
    shadowRadius: 2.62,

    elevation: 4,
  }
});

export default Login;