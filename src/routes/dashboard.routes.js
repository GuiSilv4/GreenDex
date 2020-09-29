import React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Home from '../screens/Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../contexts/auth';

Icon.loadFont();

const { width, height } = Dimensions.get('window');

const TabStack = createBottomTabNavigator();
const activeBackgroundColor = '#ffffff';
const inactiveBackgroundCOlor = '#0f3f3c';
const iconSize = (height / width) * 11;

const DashboardRoutes = () => {

  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    return null;
  }

  const screenOptions = (iconName) => {
    return {
      tabBarLabel: 'Home', tabBarIcon: ({ color, size, focused }) => (
        <View style={[styles.button, { backgroundColor: focused ? activeBackgroundColor : inactiveBackgroundCOlor }]} >
          <Icon name={iconName} size={iconSize} color={color} />
        </View>
      )
    }
  };

  return (
    <TabStack.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: '#09252a',
        inactiveTintColor: 'rgba(150, 150, 150, 0.4)',
        labelStyle: {
          fontSize: 20,
        },
        showLabel: false,
        adaptive: true,
        style: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: height / 8,
          paddingRight: 25,
        },
        tabStyle: {
          backgroundColor: 'transparent',
          paddingLeft: 25
        }
      }}
    >
      <TabStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={screenOptions('search')}
      />
      <TabStack.Screen
        name="Home"
        component={Home}
        options={screenOptions('home')}
      />
      <TabStack.Screen
        name="Home2"
        component={Home}
        options={screenOptions('heart')}
      />
      <TabStack.Screen
        name="Teste3"
        component={handleLogout}
        options={screenOptions('gear')}
      ></TabStack.Screen>
    </TabStack.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '60%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default DashboardRoutes;