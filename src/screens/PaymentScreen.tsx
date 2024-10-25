import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PaymentScreen = ({ route }) => {
  const { totalPrice } = route.params; // Lấy tổng giá từ CartScreen
  const [selectedMethod, setSelectedMethod] = useState('Credit Card');

  const handlePayment = () => {
    console.log(`Paying with ${selectedMethod}`);
    // Xử lý thanh toán
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-left" size={24} color="#fff" />
        <Text style={styles.title}>Payment</Text>
      </View>

      {/* Thẻ tín dụng */}
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Credit Card</Text>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>3897 8923 6745 4638</Text>
          <View style={styles.cardDetails}>
            <Text style={styles.cardHolder}>Robert Evans</Text>
            <Text style={styles.cardExpiry}>02/30</Text>
          </View>
        </View>
      </View>

      {/* Các phương thức thanh toán */}
      <TouchableOpacity
        style={[
          styles.paymentMethod,
          selectedMethod === 'Wallet' && styles.selectedPaymentMethod,
        ]}
        onPress={() => setSelectedMethod('Wallet')}
      >
        <Icon name="wallet" size={24} color="#fff" />
        <Text style={styles.paymentMethodText}>Wallet</Text>
        <Text style={styles.paymentAmount}>$100.50</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paymentMethod,
          selectedMethod === 'Google Pay' && styles.selectedPaymentMethod,
        ]}
        onPress={() => setSelectedMethod('Google Pay')}
      >
        <Icon name="google" size={24} color="#fff" />
        <Text style={styles.paymentMethodText}>Google Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paymentMethod,
          selectedMethod === 'Apple Pay' && styles.selectedPaymentMethod,
        ]}
        onPress={() => setSelectedMethod('Apple Pay')}
      >
        <Icon name="apple" size={24} color="#fff" />
        <Text style={styles.paymentMethodText}>Apple Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paymentMethod,
          selectedMethod === 'Amazon Pay' && styles.selectedPaymentMethod,
        ]}
        onPress={() => setSelectedMethod('Amazon Pay')}
      >
        <Icon name="amazon" size={24} color="#fff" />
        <Text style={styles.paymentMethodText}>Amazon Pay</Text>
      </TouchableOpacity>

      {/* Nút Pay */}
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
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  cardContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#444',
    padding: 20,
    borderRadius: 10,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHolder: {
    color: '#aaa',
    fontSize: 16,
  },
  cardExpiry: {
    color: '#aaa',
    fontSize: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  selectedPaymentMethod: {
    backgroundColor: '#ff7f50',
  },
  paymentMethodText: {
    color: '#fff',
    fontSize: 18,
  },
  paymentAmount: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    marginTop: 20,
  },
  price: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: '#ff7f50',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
