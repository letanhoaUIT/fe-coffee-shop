import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import api from '../api/axiosConfig'; // sử dụng API để đăng nhập
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { RootStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
// import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox';
import { Alert } from 'react-native';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async () => {
    console.log('Login button pressed');
    if (!email || !password){
      Alert.alert('Error', 'Email and Password are required');
      return;
    }

    try {
      const response = await api.post('auth/login', { email, password });
      console.log('Login successful:', response.data);
      Alert.alert('Success', 'Login Successful!');
      navigation.navigate('HomeScn');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Invalid email or password!');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login button pressed');
  };

  const handleFacebookLogin = () => {
    console.log('Fb login button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
     <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      </View>
      
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputPW}
        placeholder="Password"
        secureTextEntry={!showPassword} 
        value={password}
        onChangeText={setPassword}
      />
      {/* Nút chuyển đổi hiển thị mật khẩu */}
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Icon
          name={showPassword ? 'eye' : 'eye-slash'}
          size={20}
          color="gray"
        />
      </TouchableOpacity>
    </View>

      <View style={styles.rememberMeContainer}>
        <Checkbox
          value={rememberMe}
          onValueChange={setRememberMe}
        />
        <Text style={styles.rememberMeText}>Remember Me</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.socialText}>Or, login with...</Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <Icon name="google" size={24} color="red"></Icon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
          <Icon name="facebook" size={24} color="blue" />
        </TouchableOpacity>
      </View>

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
  // input: {
  //   height: 40,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   marginBottom: 12,
  //   paddingHorizontal: 10,
  // },
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
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
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Căn đều khoảng trống giữa các thành phần
    // marginBottom: 20,
    marginVertical: 20, //can deu theo chieu doc (tren duoi)
  },
  rememberMeText: {
    fontSize: 16,
    paddingRight: 80,
  },
  forgotPassword: {
    color: '#007BFF',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row', // Căn icon và TextInput theo chiều ngang
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,

  },
  input: {
    // flex: 1, // Để TextInput chiếm hết khoảng trống
    height: 40,
  },
    inputPW: {
    flex: 1, // Để TextInput chiếm hết khoảng trống
    height: 40,
  },
  icon: {
    paddingHorizontal: 10, // Khoảng cách giữa biểu tượng và TextInput
  },
});

export default LoginScreen;
