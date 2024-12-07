import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const backgroundColor = 'white'; // Màu nền sáng
const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất

const PaymentScreen = ({ route, navigation }) => {
  const { totalPrice } = route.params; // Lấy tổng giá từ CartScreen
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState(''); // Địa chỉ nhận hàng
  const [recipient, setRecipient] = useState(''); // Người nhận hàng
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

    const paymentMethods = [
    { id: 'ZaloPay', name: 'ZaloPay', icon: 'https://your-icon-link/zalo.png' },
    { id: 'MoMo', name: 'MoMo Wallet', icon: 'https://your-icon-link/momo.png' },
    { id: 'ATM', name: 'ATM Card', icon: 'https://your-icon-link/atm.png' },
    { id: 'Visa', name: 'Visa, Master, JCB', icon: 'https://your-icon-link/visa.png' },
  ];
  const handlePayment = () => {
    if (!address) {
      Alert.alert('Lỗi', 'Bạn cần nhập địa chỉ nhận hàng trước khi thanh toán.');
      return;
    }

    Alert.alert(
      'Thanh toán',
      `Bạn đang thanh toán bằng ${selectedMethod}.`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đồng ý', onPress: () => console.log(`Paying with ${selectedMethod}`) },
      ],
      { cancelable: true }
    );
  };

  // Hàm lấy địa chỉ từ định vị
  const handleGetLocation = async () => {
    setIsLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Lỗi', 'Không có quyền truy cập vị trí!');
        setIsLoadingLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = location.coords;

      // Dùng reverse geocoding để chuyển tọa độ thành địa chỉ
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(reverseGeocode);
      if (reverseGeocode.length > 0) {
        let { name, district, city, country } = reverseGeocode[0];
        let fullAddress = `${name}, ${district}, ${city}, ${country}`;
        setAddress(fullAddress); // Lưu địa chỉ vào trạng thái
      } else {
        Alert.alert('Lỗi', 'Không thể lấy được địa chỉ từ tọa độ!');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Xảy ra lỗi khi lấy vị trí!');
      console.error(error);
    } finally {
      setIsLoadingLocation(false);
      setShowAddressModal(false); // Đóng modal
    }
  };

  const handleSelectLocation = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    // Sử dụng reverse geocoding để lấy địa chỉ từ tọa độ người dùng chọn
    Location.reverseGeocodeAsync({ latitude, longitude }).then((result) => {
      if (result.length > 0) {
        const { street, city, region, country } = result[0];
        const selectedAddress = `${street}, ${city}, ${region}, ${country}`;
        setAddress(selectedAddress); // Lưu địa chỉ vào trạng thái
        setSelectedLocation({ latitude, longitude });
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={primaryColor} />
        </TouchableOpacity>
        <Text style={styles.title}>Payment</Text>
      </View>

      {/* Giao nhận hàng */}
      {/* Delivery Info */}
      <View style={styles.deliveryInfo}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Giao hàng</Text>
          <TouchableOpacity onPress={() => setShowAddressModal(true)}>
            <Text style={styles.changeButton}>Thay đổi</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.address, !address && { color: 'red' }]}>
          {address || 'Vui lòng nhập địa chỉ nhận hàng'}
        </Text>
        <TextInput
          style={styles.instructionsInput}
          placeholder="Thêm hướng dẫn giao hàng"
          placeholderTextColor="#aaa"
        />
      </View>


      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={styles.paymentMethod}
          onPress={() => setSelectedMethod(method.id)}
        >
          {/* Biểu tượng của phương thức thanh toán */}
          <Image source={{ uri: method.icon }} style={styles.methodIcon} />
          <Text style={styles.methodText}>{method.name}</Text>

          {/* Hiển thị nút tick nếu được chọn */}
          <View style={styles.radioButton}>
            {selectedMethod === method.id && (
              <Icon name="check" size={14} color="#fff" />
            )}
          </View>
        </TouchableOpacity>
      ))}

      {/* Modal thay đổi địa chỉ */}
      <Modal
        visible={showAddressModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddressModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowAddressModal(false)}>
                <Icon name="arrow-left" size={24} color="#0f4359" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Nhập địa chỉ</Text>
            </View>

            {/* Lựa chọn địa chỉ */}
            <TouchableOpacity style={styles.optionButton} onPress={handleGetLocation}>
              <Icon name="map-marker" size={20} color="#555" />
              <Text style={styles.optionText}>
                {isLoadingLocation ? 'Đang lấy địa chỉ...' : 'Địa chỉ của bạn'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => setShowAddressModal(false)}>
              <Icon name="map" size={20} color="#555" />
              <Text style={styles.optionText}>Chọn trên bản đồ</Text>
            </TouchableOpacity>

            {/* Bản đồ */}
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: selectedLocation ? selectedLocation.latitude : 21.0285,
                longitude: selectedLocation ? selectedLocation.longitude : 105.8542,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={handleSelectLocation}
            >
              {selectedLocation && (
                <Marker coordinate={selectedLocation} />
              )}
            </MapView>
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>Price: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay from {selectedMethod}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    padding: 16,
    marginTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 25,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    color: primaryColor,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 110,
  },
  selectedPaymentMethod: {
    backgroundColor: secondaryColor,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    flexDirection: 'row', // Căn ngang
    justifyContent: 'space-between',
    paddingHorizontal: 20, // Khoảng cách bên trong cho hai bên
    paddingVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 0,
  },
  payButton: {
    backgroundColor: primaryColor,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '60%',
    marginBottom: 15,
    marginLeft: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  //address style
  deliveryInfo: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
  },
  changeButton: {
    fontSize: 14,
    color: secondaryColor,
  },
  address: {
    fontSize: 14,
    marginTop: 5,
    color: '#333',
  },
  recipient: {
    fontSize: 14,
    marginTop: 2,
    color: '#555',
  },
  instructionsInput: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 14,
  },
  //modal
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f4359', marginLeft: 10 },
  searchInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  optionText: { marginLeft: 10, fontSize: 14, color: '#555' },

  map: {
    width: '100%',
    height: 400,
    marginTop: 20,
    borderRadius: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  methodText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentMethodText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  paymentMethodIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007bff',
  },
});

export default PaymentScreen;
