import { useState, useEffect } from 'react';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; // Thêm Axios để gọi API

const backgroundColor = 'white';
const primaryColor = '#0f4359';
const secondaryColor = '#8d6e52';

interface OrderItem {
  id: number;
  name: string;
  sizes: {
    size: string;
    price: number;
    quantity: number;
  }[];
  image: string;
}

interface Order {
  id: number;
  date: string; // Định dạng ngày theo kiểu chuỗi
  totalAmount: number;
  items: OrderItem[];
}

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true); // State loading
  const [error, setError] = useState<string | null>(null); // State lỗi
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  // Gọi API từ backend
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://your-backend-api.com/orders'); // Thay URL bằng API thực tế
      setOrders(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Gọi API khi component render lần đầu
  useEffect(() => {
    fetchOrders();
  }, []);

  // Hàm lọc đơn hàng theo giá trị
  const sortOrders = (orders: Order[], sortType: string): Order[] => {
    if (sortType === 'lowToHigh') {
      return orders.sort((a, b) => a.totalAmount - b.totalAmount);
    }
    if (sortType === 'highToLow') {
      return orders.sort((a, b) => b.totalAmount - a.totalAmount);
    }
    return orders;
  };

  const filteredOrders = sortOrders(orders, selectedSort);

  const renderOrderItem = ({ item }: { item: Order }) => (
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchOrders} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.textFilter}>
            Filter <Icon name="filter" size={25} color={primaryColor} />
          </Text>
        </TouchableOpacity>
      </View>

      {filteredOrders.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <Image source={require('../../assets/no-order-history.png')} style={styles.noOrdersImage} />
          <Text style={styles.noOrdersText}>You have no orders yet.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={item => item.id.toString()}
          renderItem={renderOrderItem}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Orders</Text>
            <TouchableOpacity
              style={[styles.filterOption, activeFilter === 'lowToHigh' && { backgroundColor: secondaryColor }]}
              onPress={() => { setSelectedSort('lowToHigh'); setActiveFilter('lowToHigh'); }}
            >
              <Text style={[styles.filterText, activeFilter === 'lowToHigh' && { color: 'white' }]}>
                Price: Low to High
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterOption, activeFilter === 'highToLow' && { backgroundColor: secondaryColor }]}
              onPress={() => { setSelectedSort('highToLow'); setActiveFilter('highToLow'); }}
            >
              <Text style={[styles.filterText, activeFilter === 'highToLow' && { color: 'white' }]}>
                Price: High to Low
              </Text>
            </TouchableOpacity>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginTop: 50,
    marginBottom: 10,
  },
  title: {
    color: primaryColor,
    fontSize: 28,
    fontWeight: 'bold',
  },
  textFilter: { color: primaryColor, fontSize: 18, fontWeight: 'bold', },
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
  // New styles for "No Orders" section
  noOrdersContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 100,
  },
  noOrdersImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  noOrdersText: {
    fontSize: 18,
    color: primaryColor,
    textAlign: 'center',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay màu mờ
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,  // Bo tròn các góc modal
    width: '80%',  // Cân chỉnh chiều rộng modal
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 15,
  },
  filterInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: primaryColor,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  filterText: {
 fontSize: 16,
    color: primaryColor,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: backgroundColor,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderHistoryScreen;