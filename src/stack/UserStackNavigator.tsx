// src/navigation/UserStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = createStackNavigator();

const UserStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="UserProfile" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
};

export default UserStackNavigator;
