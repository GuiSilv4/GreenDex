import React from 'react';
import { useAuth } from '../contexts/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { View, ActivityIndicator } from 'react-native';

const Routes = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      //ver react-native-splash-screen
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
