import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Sử dụng react-native-vector-icons
import api from '../api/axiosConfig'; // Giả sử bạn vẫn muốn sử dụng API để đăng ký

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    console.log('Register button pressed');
    try {
      const response = await api.post('/register', { email, password });
      console.log('Registration successful:', response.data);
      // Thực hiện điều gì đó với dữ liệu người dùng
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
    // Thực hiện logic đăng nhập bằng Google
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login');
    // Thực hiện logic đăng nhập bằng Facebook
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.socialText}>Or, register with...</Text>

      {/* Nút đăng ký bằng Google và Facebook */}
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <Icon name="google" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
          <Icon name="facebook" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
  socialText: {
    marginVertical: 20,
    textAlign: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row', // Đặt các nút nằm ngang
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    backgroundColor: '#fff', // Màu nền trắng
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10, // Khoảng cách giữa các nút
  },
});

export default RegisterScreen;
