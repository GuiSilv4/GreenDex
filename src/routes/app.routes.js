import Dashboard from '../screens/Dashboard';
import DashboardRoutes from './dashboard.routes';
import Plant from '../screens/Plant';
import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Animated } from 'react-native';

const AppStack = createStackNavigator();

const AppRoutes = () => {
  return (
    <AppStack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'vertical-inverted',
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      cardOverlayEnabled: true,
      cardStyle: {
        backgroundColor: 'transparent'
      }

    }}>
      <AppStack.Screen name="Dashboard" component={DashboardRoutes} />
      <AppStack.Screen name="Plant" component={Plant} />
    </AppStack.Navigator>
  )
};

export default AppRoutes;
