import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const orders = [
  {
    id: 1,
    date: '20th March 2023',
    totalAmount: 74.40,
    items: [
      {
        id: 1,
        name: 'Cappuccino',
        sizes: [
          { size: 'S', price: 4.20, quantity: 2 },
          { size: 'M', price: 6.20, quantity: 2 },
        ],
        image: 'https://example.com/cappuccino1.jpg',
      },
      {
        id: 2,
        name: 'Cappuccino',
        sizes: [
          { size: 'S', price: 4.20, quantity: 2 },
          { size: 'M', price: 6.20, quantity: 2 },
        ],
        image: 'https://example.com/cappuccino2.jpg',
      },
    ],
  },
  {
    id: 2,
    date: '18th March 2023',
    totalAmount: 37.20,
    items: [
      {
        id: 3,
        name: 'Liberica Beans',
        sizes: [
          { size: '250gm', price: 4.20, quantity: 2 },
          { size: '500gm', price: 6.20, quantity: 2 },
        ],
        image: 'https://example.com/beans.jpg',
      },
    ],
  },
];

const OrderHistoryScreen = () => {
  const renderOrderItem = ({ item }) => {
    return (
      <View style={styles.orderCard}>
        <Text style={styles.orderDate}>Order Date: {item.date}</Text>
        <Text style={styles.totalAmount}>Total Amount: ${item.totalAmount.toFixed(2)}</Text>

        {item.items.map(orderItem => (
          <View key={orderItem.id} style={styles.orderItem}>
            <Text style={styles.productName}>{orderItem.name}</Text>
            {orderItem.sizes.map(size => (
              <View key={size.size} style={styles.sizeRow}>
                <Text style={styles.sizeText}>{size.size}</Text>
                <Text style={styles.priceText}>${size.price.toFixed(2)} x {size.quantity}</Text>
                <Text style={styles.totalPriceText}>${(size.price * size.quantity).toFixed(2)}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
        <Icon name="user" size={30} color="#fff" />
      </View>

      {/* Order History List */}
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderOrderItem}
      />

      {/* Download Button */}
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  orderCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginVertical: 10,
    padding: 16,
  },
  orderDate: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#ff7f50',
    fontSize: 16,
    marginTop: 4,
  },
  orderItem: {
    marginVertical: 10,
  },
  productName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  sizeText: {
    color: '#aaa',
  },
  priceText: {
    color: '#fff',
  },
  totalPriceText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: '#ff7f50',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderHistoryScreen;
