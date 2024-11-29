// src/navigation/MainStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import BeanDetailScreen from '../screens/BeanDetail';
import CoffeeDetailScreen from '../screens/CoffeeDetailScreen';
import CartScreen from '../screens/CartScreen';
import PaymentScreen from '../screens/PaymentScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="Bean" component={BeanDetailScreen} />
      <Stack.Screen name="CoffeeDetail" component={CoffeeDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;