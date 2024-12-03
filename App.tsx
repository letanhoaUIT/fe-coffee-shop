// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import AuthStackNavigator from './src/stack/AuthStackNavigator';
import MainStackNavigator from './src/stack/MainStackNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './src/screens/context/CartContext';
import { FavoritesProvider } from './src/screens/context/FavoritesContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider> {/* Bọc FavoritesProvider quanh NavigationContainer */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthStackNavigator} />
            <Stack.Screen name="Main" component={MainStackNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </CartProvider>
  );
}
