import React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import MyLists from '../screens/MyLists';
import Reminders from '../screens/Reminders';
import Teste from '../screens/Teste';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../contexts/auth';

const { width, height } = Dimensions.get('window');

const TabStack = createBottomTabNavigator();
const activeBackgroundColor = '#ffffff';
const inactiveBackgroundCOlor = '#0f3f3c';

const DashboardRoutes = () => {
  const { signOut } = useAuth();
  const handleLogout = () => {
    signOut();
    return (<View />);
  }

  const screenOptions = (iconName) => {
    return {
      tabBarLabel: '', tabBarIcon: ({ color, focused }) => (
        <View style={[styles.button, {
          backgroundColor: focused ? activeBackgroundColor : inactiveBackgroundCOlor
        }]} >
          <Icon name={iconName} size={(height / width) * 11} color={color} />
        </View>
      ),
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
          paddingLeft: 25,
          height: height / 8,
        },
      }}
    >
      <TabStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={screenOptions('search')}
      />
      <TabStack.Screen
        name="MyLists"
        component={MyLists}
        options={screenOptions('list')}
      />
      <TabStack.Screen
        name="Reminders"
        component={Reminders}
        options={screenOptions('clock-o')}
      />
      <TabStack.Screen
        name="Teste3"
        component={handleLogout}
        options={screenOptions('sign-out')}
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