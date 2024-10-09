import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import api from '../api/axiosConfig'; // sử dụng API để đăng nhập
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { RootStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async () => {
    console.log('Login button pressed');
    try {
      const response = await api.post('/login', { email, password });
      console.log('Login successful:', response.data);
      // Thực hiện điều gì đó với dữ liệu người dùng
    } catch (error) {
      
    }
  };

    const handleGoogleLogin = () => {
      //Xu li logic here
      console.log('Google login button pressed');
    };

    const handleFacebookLogin = () => {
      //xu li
      console.log('Fb login button pressed');
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/*Nut login*/}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.socialText}>Or, login with...</Text>

      {/*Nút google và facbook */}
      <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Icon name="google" size={24} color="red"></Icon>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
            <Icon name="facebook" size={24} color="blue" />
          </TouchableOpacity>
      </View>
      
      {/*Lien ket toi register*/}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>New to the app? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
   socialButtonsContainer: {
    flexDirection: 'row', // Căn các nút theo hàng ngang
    justifyContent: 'center',
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: 'white', // Nền trắng
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10, // Khoảng cách giữa các nút
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerLink: {
    color: '#007BFF',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  socialText: {
    textAlign: 'center',
    padding: 20,
  }
});

export default LoginScreen;
