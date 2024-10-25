// src/screens/UserProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Icon name="share-alt" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* User Information */}
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://uploads.commoninja.com/searchengine/wordpress/user-avatar-reloaded.png' }} // Thay bằng avatar của người dùng
          style={styles.avatar}
        />
        <Text style={styles.userName}>Ebenezer Omosuli</Text>
        <Text style={styles.userHandle}>@eben10</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userHandle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
