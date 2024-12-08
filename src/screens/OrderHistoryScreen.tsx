import { useState } from 'react';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const backgroundColor = 'white'; // Màu nền sáng
const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất

// Định nghĩa kiểu cho đơn hàng và các thuộc tính
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
  const [modalVisible, setModalVisible] = useState(false);  // State để kiểm soát modal
  const [selectedFilter, setSelectedFilter] = useState('');  // State để lưu bộ lọc đã chọn
  const [selectedSort, setSelectedSort] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  // Hàm mở Modal
  const openFilterModal = () => {
    setModalVisible(true);
  };

  // Hàm đóng Modal
  const closeFilterModal = () => {
    setModalVisible(false);
  };

  const handleApplyFilter = () => {
    console.log('Selected sort:', selectedSort);
    closeFilterModal();
  };

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

  // Áp dụng tất cả các bộ lọc
  const filteredOrders = sortOrders(orders, selectedSort);

  const renderOrderItem = ({ item }: { item: Order }) => {
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
        {/* <Icon name="user" size={30} color="#0f4359" /> */}

        <TouchableOpacity onPress={openFilterModal}>
          <Text style={styles.textFilter}>Lọc  <Icon name="filter" size={25} color="#0f4359" /> </Text>
        </TouchableOpacity>

      </View>

      {/* If there are no orders, display the "No Orders" message */}
      {filteredOrders.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <Image source={require('../../assets/no-order-history.png')} style={styles.noOrdersImage} />
          <Text style={styles.noOrdersText}>You have no orders yet.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}  // Sử dụng filteredOrders thay vì orders
          keyExtractor={item => item.id.toString()}
          renderItem={renderOrderItem}
        />
      )}

      {/* Modal Bộ lọc */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeFilterModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Orders</Text>

            {/* Bộ lọc theo giá trị đơn hàng */}
            <TouchableOpacity
              style={[styles.filterOption, activeFilter === 'lowToHigh' && { backgroundColor: secondaryColor }]}
              onPress={() => { setSelectedSort('lowToHigh'); setActiveFilter('lowToHigh'); }}
            >
              <Text style={[styles.filterText, activeFilter === 'lowToHigh' && { color: 'white' }]}>Price: Low to High</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterOption, activeFilter === 'highToLow' && { backgroundColor: secondaryColor }]}
              onPress={() => { setSelectedSort('highToLow'); setActiveFilter('highToLow'); }}
            >
              <Text style={[styles.filterText, activeFilter === 'highToLow' && { color: 'white' }]}>Price: High to Low</Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeFilterModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleApplyFilter} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Apply Filter</Text>
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

});

export default OrderHistoryScreen;