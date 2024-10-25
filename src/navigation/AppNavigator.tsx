// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgetPassword/ForgotPassword';
import NewCredentials from '../screens/ForgetPassword/NewCredentials';
import BeanDetailScreen from '../screens/BeanDetail';
import CoffeeDetailScreen from '../screens/CoffeeDetailScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { RootStackParamList } from './types';
import BottomTabNavigator from './BottomTabNavigator';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChatBotScreen from '../screens/ChatBotScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="HomeScn" component={BottomTabNavigator} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewCredentials" component={NewCredentials} />
      <Stack.Screen name="Bean" component={BeanDetailScreen} />
      <Stack.Screen name="CoffeeDetail" component={CoffeeDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} /> 
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="ChatBotScreen" component={ChatBotScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
