import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { PlantListsProvider } from './contexts/PlantLists';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <PlantListsProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </PlantListsProvider>
      </AuthProvider>
    );
  }
}

export default App;
