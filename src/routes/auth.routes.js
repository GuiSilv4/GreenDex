import Login from '../screens/Login';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <>
    <AuthStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  </>
);

export default AuthRoutes;
