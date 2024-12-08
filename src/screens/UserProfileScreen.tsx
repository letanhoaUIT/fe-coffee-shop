import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert, Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('Ebenezer Omosuli');
  const [phoneNumber, setPhoneNumber] = useState('0123456789');
  const [avatar, setAvatar] = useState(
    'https://uploads.commoninja.com/searchengine/wordpress/user-avatar-reloaded.png'
  );
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `🌟 Khám phá ngay ứng dụng Coffee Shop tuyệt vời này! \n\nTận hưởng những món cà phê ngon nhất, tìm kiếm các loại hạt cà phê chất lượng và dễ dàng đặt hàng ngay trên điện thoại của bạn! 🚀\n\n📲 Tải ngay ứng dụng Coffee Shop để trải nghiệm:\n\n- Khám phá menu cà phê đa dạng ☕\n- Tìm hiểu về các loại hạt cà phê độc đáo 🌱\n- Thêm món yêu thích vào danh sách yêu thích ❤️\n- Đặt hàng và thanh toán nhanh chóng 💳\n\nTải ứng dụng ngay và khám phá thế giới cà phê tuyệt vời!`,
        // url: 'https://coffeeshopapp.com',  // URL hoặc đường link tải APK nếu có
        title: 'Coffee Shop App',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Đã chia sẻ với một ứng dụng cụ thể
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          // Đã chia sẻ nhưng không có ứng dụng cụ thể
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Đã hủy chia sẻ
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share content.');
      console.error(error);
    }
  };

  const handleEditProfile = () => {
    Alert.alert('Profile updated!', 'Your changes have been saved.');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword'); // Điều hướng sang màn hình ChangePassword
  };

const handleAvatarPress = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert('Permission to access the gallery is required!');
    return;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!pickerResult.canceled) {
    setAvatar(pickerResult.assets[0].uri);
  }
};

  const handleLogout = async () => {
    try {
      // Xóa token hoặc bất kỳ thông tin đăng nhập nào bạn đã lưu
      await AsyncStorage.removeItem('userToken');

      // Chuyển hướng đến màn hình Login
      navigation.reset({
        index: 0,  // Chỉ định màn hình đầu tiên trong stack
        routes: [{ name: 'Login' }],  // Điều hướng tới màn hình 'Login'
      });
    } catch (error) {
      console.error('Error during logout:', error);  // Xử lý lỗi nếu có
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={handleShare}>
          <Icon name="share-alt" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* User Information */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleAvatarPress}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleEditProfile}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout} // Đây là hàm sẽ xử lý đăng xuất
        >
          <Text style={styles.logoutText}>Logout</Text>
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
    color: '0f4359',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
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
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  saveButton: {
    backgroundColor: '#0f4359',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  changePasswordButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  changePasswordText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#F44336', // Màu đỏ cho nút logout
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserProfileScreen;
