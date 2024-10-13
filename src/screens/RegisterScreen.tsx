import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Sử dụng react-native-vector-icons
import api from '../api/axiosConfig'; // API để đăng ký
import { useNavigation } from '@react-navigation/native'; 

const RegisterScreen = () => {
  const navigation = useNavigation(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Hàm validate email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

  // Kiểm tra tính hợp lệ của các trường nhập
  const validateForm = () => {
    if (!username) return 'Username is required';
    if (!fullName) return 'Full name is required';
    if (!email) return 'Email is required';
    if (!validateEmail(email)) return 'Invalid email format';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleRegister = async () => {
  console.log('Register button pressed'); // Kiểm tra xem sự kiện được gọi không

  const errorMessage = validateForm();
  if (errorMessage) {
    Alert.alert('Validation Error', errorMessage);
    return;
  }

  try {
    const response = await api.post('auth/register', { 
      username, 
      email, 
      full_name: fullName, 
      password 
    });
    console.log('Registration successful:', response.data);
    Alert.alert('Success', 'Registration successful!');
    navigation.navigate('Home'); 
  } catch (error: any) {
    console.error('Registration error response:', error);

    // Kiểm tra nếu có lỗi từ server
    if (error.response) {
      console.log('Error details:', error.response.data); // Debug thông tin lỗi
      const message = error.response.data.message || 'Username or Email already exists.';
      Alert.alert('Error', message); // Hiển thị thông báo lỗi từ server
    } else {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
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
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.socialText}>Or, register with...</Text>

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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
});

export default RegisterScreen;
