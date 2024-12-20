// src/navigation/types.ts
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  HomeScn: undefined;
  ForgotPassword: undefined;
  NewCredentials: { email: string };
  Bean: { product: { name: string; description: string; price: number; image: string } }; // Kiểu của product
  CoffeeDetail: { product: any };
  Cart: { newItem?: { id: number; name: string; size: string; price: number; quantity: number } };
  Payment: { totalPrice: number };
  Favorites: undefined;
  OrderHistory: undefined;
  UserProfile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  Splash: undefined;
};

export type BeanDetailScreenRouteProp = RouteProp<RootStackParamList, 'Bean'>;
export type BeanDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Bean'>;
