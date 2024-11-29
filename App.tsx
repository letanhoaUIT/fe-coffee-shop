// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
// import AppNavigator from './src/navigation/AppNavigator'; 
import AuthStackNavigator from './src/stack/AuthStackNavigator';
import MainStackNavigator from './src/stack/MainStackNavigator';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
        <Stack.Screen name="Main" component={MainStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
