// src/navigation/UserStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';


type UserStackParamList = {
  UserProfile: undefined; 
  EditProfile: undefined;
  ChangePassword: undefined;
};

const UserStack = createStackNavigator<UserStackParamList>();

const UserStackNavigator = () => (
  <UserStack.Navigator screenOptions={{ headerShown: false }}>
    <UserStack.Screen name="UserProfile" component={UserProfileScreen} />
    <UserStack.Screen name="EditProfile" component={EditProfileScreen} />
    <UserStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
  </UserStack.Navigator>
);

export default UserStackNavigator;
