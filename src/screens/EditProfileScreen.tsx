import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  
  // Default avatar image
  const [avatar, setAvatar] = useState('https://uploads.commoninja.com/searchengine/wordpress/user-avatar-reloaded.png');
  const [fullName, setFullName] = useState('Ebenezer Omosuli');
  const [email, setEmail] = useState('ebenux123@gmail.com');
  const [tagName, setTagName] = useState('@eben');

  // Function to pick an image
  const pickImage = async () => {
    // Ask for permission to access the photo library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Crop to a square aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);  // Set the selected image as avatar
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      {/* Avatar */}
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: avatar }} // Use the state for avatar
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
          <Icon name="camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full name"
        />
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
        />
        <TextInput 
          style={styles.input}
          value={tagName}
          onChangeText={setTagName}
          placeholder="Tag name"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 50,
  },
  form: {
    marginTop: 20,
  },
  input: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfileScreen;
