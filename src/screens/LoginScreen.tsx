import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../api/axiosConfig'; 
import AsyncStorage from '@react-native-async-storage/async-storage';  

const defaultUser = {
  email: 'test',
  password: '12345',
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 
  const navigation = useNavigation();

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Email and Password are required');
    return;
  }

  try {
    const response = await api.post('auth/login', { email, password }); // Gửi yêu cầu đến API
    if (response.data.token) {
      await AsyncStorage.setItem('authToken', response.data.token); // Lưu token vào AsyncStorage
      Alert.alert('Success', 'Login successful!');
      login(); // Đánh dấu người dùng đã đăng nhập
      // navigation.navigate('HomeScn'); // Chuyển hướng đến màn hình chính
    } else {
      Alert.alert('Error', 'No token received from the server');
    }
  } catch (error) {
  if (error instanceof Error) {
    Alert.alert('Error', error.message);
  } else {
    Alert.alert('Error', 'An unknown error occurred');
  }
}
};

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'This is where Google login would be implemented.');
  };

  return (
    <View style={styles.container}>
      {/* Hình ảnh logo */}
      <Image
        source={require('../../assets/logo.png')}
        style={styles.image}
      />
      
      {/* Tiêu đề */}
      <Text style={styles.title}>Welcome</Text>

      {/* Trường email */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Trường mật khẩu */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Nút đăng nhập */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or login with...</Text>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Icon name="google" size={24} color="white" />
      </TouchableOpacity>

      {/* Liên kết đến màn hình đăng ký */}
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
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0f4359',
  },
  inputContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#0f4359',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  googleButton: {
    backgroundColor: '#db4437', // Màu của Google login
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: 'white',
    fontSize: 18,
  },
  registerLink: {
    color: '#0f4359',
    textAlign: 'center',
    fontSize: 16,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  orText: {
    textAlign: 'center',  // Căn giữa
    fontSize: 16,
    color: '#0f4359',
    marginVertical: 15,  // Khoảng cách giữa chữ và nút Google
  },
});

export default LoginScreen;
