//BottomTabNavigator.tsx
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderHistory from '../screens/OrderHistoryScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [favoriteCount, setFavoriteCount] = useState(3);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'History') {
            iconName = 'bell';
          }

         return iconName ? <Icon name={iconName} size={size} color={color} /> : null;
        },
        tabBarActiveTintColor: '#FF6C00',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#0E0F11',
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarBadge: favoriteCount > 0 ? favoriteCount : undefined, // Hiển thị huy hiệu nếu có mục yêu thích
          tabBarBadgeStyle: {
            backgroundColor: '#FF6C00',
            color: '#fff',
          },
        }}
      />
      <Tab.Screen name="History" component={OrderHistory} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
