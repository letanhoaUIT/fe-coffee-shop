// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Thêm import cho NavigationContainer
import AppNavigator from './src/navigation/AppNavigator'; // Import AppNavigator

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
