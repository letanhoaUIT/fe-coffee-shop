import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderHistory from '../screens/OrderHistoryScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'HomeMain':
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
        <Tab.Screen name="HomeMain" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="History" component={OrderHistory} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BottomTabNavigator;
