import React from 'react';
import { useAuth } from '../contexts/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const MainStack = createStackNavigator();

const Routes = () => {
  const { signed, loading } = useAuth();
  console.log(signed);
  if (loading) {
    return (
      //ver react-native-splash-screen
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      {signed ? (<MainStack.Screen name="App" component={AppRoutes} />)
        : (<MainStack.Screen name="Login" component={AuthRoutes}
          options={{ animationTypeForReplace: !signed ? 'pop' : 'push', }} />)}
    </MainStack.Navigator>
  );

  //return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
