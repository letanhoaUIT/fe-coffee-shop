import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCart } from './context/CartContext';

const backgroundColor = '#f4f4f4'; // Màu nền sáng
const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất

const CartScreen = ({ navigation }) => {
  const { cartItems, updateCartItem, removeFromCart } = useCart();

    const handlePressCoffee = (product: any) => {
    navigation.navigate('CoffeeDetail', { product }); // Điều hướng với tham số product
  };

  const handleQuantityChange = (id: number, selectedSize: string, change: number) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id && item.selectedSize === selectedSize) {
        const newQuantity = item.quantity + change;

        if (newQuantity < 1) {
          Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn bỏ sản phẩm này?',
            [
              { text: 'Hủy bỏ', style: 'cancel' },
              {
                text: 'Đồng ý',
                onPress: () => {
                  removeFromCart(id, selectedSize); // Xóa sản phẩm theo id và size
                },
              },
            ],
            { cancelable: true }
          );
          return item;
        }

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    updatedItems.forEach(updatedItem => {
      if (updatedItem.quantity !== cartItems.find(item => item.id === updatedItem.id && item.selectedSize === updatedItem.selectedSize)?.quantity) {
        updateCartItem(updatedItem.id, updatedItem.selectedSize, updatedItem.quantity);  // Cập nhật số lượng
      }
    });
  };



  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handlePay = () => {
    navigation.navigate('Payment', { totalPrice: parseFloat(totalPrice), cartItems });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => `${item.id}-${item.selectedSize}`}
        renderItem={({ item }) => (
<TouchableOpacity onPress={() => handlePressCoffee(item)}>
          <View style={styles.cartItem}>
            {/* Ảnh sản phẩm */}
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.infoContainer}>
              {/* Tên sản phẩm */}
              <Text style={styles.productName}>{item.name}</Text>

              {/* Mô tả sản phẩm */}
              <Text style={styles.description}>{item.description}</Text>

              {/* Kích thước sản phẩm */}
              <View style={styles.sizeContainer}>
                {/* Nếu item.size là một giá trị duy nhất (không phải mảng), bạn có thể trực tiếp hiển thị */}
                <TouchableOpacity
                  key={item.size} // Lấy kích thước đã chọn
                  style={[
                    styles.sizeButton,
                    item.size === item.selectedSize && styles.selectedSizeButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      item.size === item.selectedSize && styles.selectedSizeText,
                    ]}
                  >
                    {item.selectedSize}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Giá và Số lượng */}
              <View style={styles.priceQuantityContainer}>
                {/* Giá */}
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>

                {/* Số lượng và các nút tăng/giảm */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, item.selectedSize, -1)}
                  >
                    <Icon name="minus" size={16} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, item.selectedSize, 1)}
                  >
                    <Icon name="plus" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          </TouchableOpacity>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
  title: {
    color: primaryColor,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor,
    borderRadius: 10,
    marginBottom: 16,
  },
  image: {
    width: '30%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    color: primaryColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  description: {
    color: primaryColor,
    fontSize: 12,
    marginVertical: 4,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  sizeButton: {
    backgroundColor: primaryColor,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  selectedSizeButton: {
    backgroundColor: secondaryColor,
  },
  sizeText: {
    color: '#fff',
    fontSize: 12,
  },
  selectedSizeText: {
    fontWeight: 'bold',
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    color: primaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: primaryColor,
    borderRadius: 4,
  },
  quantityButton: {
    padding: 6,
  },
  quantityText: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingVertical: 16,
    marginBottom: 80,
  },
  totalPrice: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: secondaryColor,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
