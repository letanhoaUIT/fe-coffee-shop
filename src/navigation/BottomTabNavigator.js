import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderHistory from '../screens/OrderHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HelpScreen from '../screens/HelpScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [isMainTab, setIsMainTab] = useState(true);

  const renderMainTabs = () => (
    <>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="History" component={OrderHistory} />
    </>
  );

  const renderSecondaryTabs = () => (
    <>
      <Tab.Screen name="Profile" component={UserProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Help" component={HelpScreen} />
    </>
  );

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Cart':
                iconName = 'shopping-cart';
                break;
              case 'Favorites':
                iconName = 'heart';
                break;
              case 'History':
                iconName = 'history';
                break;
              case 'Profile':
                iconName = 'user';
                break;
              case 'Settings':
                iconName = 'cogs';
                break;
              case 'Notifications':
                iconName = 'bell';
                break;
              case 'Help':
                iconName = 'question-circle';
                break;
            }

            return iconName ? <Icon name={iconName} size={size} color={color} /> : null;
          },
          tabBarActiveTintColor: '#8d6e52',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#0f4359',
            borderRadius: 30,
            paddingVertical: 10,
            marginHorizontal: 10,
            position: 'absolute',
            bottom: 20,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
          },
          headerShown: false,
        })}
      >
        {isMainTab ? renderMainTabs() : renderSecondaryTabs()}
      </Tab.Navigator>
      <TouchableOpacity
        style={styles.expandButton}
        onPress={() => setIsMainTab(!isMainTab)}
      >
        <Icon name={isMainTab ? 'angle-double-up' : 'angle-double-down'} size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  expandButton: {
    position: 'absolute',
    bottom: 90, // Vị trí trên bottom tab
    alignSelf: 'center',
    backgroundColor: '#0f4359',
    padding: 10,
    borderRadius: 30,
    elevation: 10,
  },
});

export default BottomTabNavigator;
