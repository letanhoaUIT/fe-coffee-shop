import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const initialCartItems = [
  {
    id: 1,
    name: 'Cappuccino',
    description: 'With Steamed Milk',
    price: 4.20,
    image: 'https://example.com/cappuccino1.jpg',
    sizes: ['S', 'M', 'L'],
    selectedSize: 'S',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Robusta Beans',
    description: 'From Africa',
    price: 6.20,
    image: 'https://example.com/beans1.jpg',
    sizes: ['250gm', '500gm', '1kg'],
    selectedSize: '250gm',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Liberica Coffee Beans',
    description: 'Medium Roasted',
    price: 4.20,
    image: 'https://example.com/beans2.jpg',
    sizes: ['250gm', '500gm', '1kg'],
    selectedSize: '250gm',
    quantity: 1,
  },
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigation = useNavigation();

  const handleQuantityChange = (id: number, change: number) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + change) };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleSizeChange = (id: number, selectedSize: string) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, selectedSize };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handlePay = () => {
    navigation.navigate('Payment', { totalPrice: parseFloat(totalPrice) }); // Điều hướng đến PaymentScreen
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
        <Icon name="user" size={30} color="#fff" />
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>

              {/* Sizes */}
              <View style={styles.sizeContainer}>
                {item.sizes.map(size => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeButton,
                      item.selectedSize === size && styles.selectedSizeButton,
                    ]}
                    onPress={() => handleSizeChange(item.id, size)}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        item.selectedSize === size && styles.selectedSizeText,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Price and Quantity */}
              <View style={styles.priceQuantityContainer}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
                    <Icon name="minus" size={16} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
                    <Icon name="plus" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />

      {/* Total Price and Pay Button */}
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
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 20,
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
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#aaa',
    marginVertical: 4,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  sizeButton: {
    backgroundColor: '#444',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  selectedSizeButton: {
    backgroundColor: '#ff7f50',
  },
  sizeText: {
    color: '#fff',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  quantityText: {
    color: '#fff',
    marginHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  totalPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#ff7f50',
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
