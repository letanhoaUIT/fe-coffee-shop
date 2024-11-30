import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const backgroundColor = '#f4f4f4'; // Màu nền sáng
const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất

const initialCartItems = [
  {
    id: 1,
    name: 'Cappuccino',
    description: 'With Steamed Milk',
    price: 4.20,
    image: 'https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg',
    sizes: ['S', 'M', 'L'],
    selectedSize: 'M',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Robusta Beans',
    description: 'From Africa',
    price: 6.20,
    image: 'https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg',
    sizes: ['250gm', '500gm', '1kg'],
    selectedSize: '500gm',
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
    {
    id: 4,
    name: 'Liberica Coffee Beans',
    description: 'Medium Roasted',
    price: 4.20,
    image: 'https://example.com/beans2.jpg',
    sizes: ['250gm', '500gm', '1kg'],
    selectedSize: '250gm',
    quantity: 1,
  },
    {
    id: 5,
    name: 'Liberica Coffee Beans',
    description: 'Medium Roasted',
    price: 4.20,
    image: 'https://example.com/beans2.jpg',
    sizes: ['250gm', '500gm', '1kg'],
    selectedSize: '250gm',
    quantity: 1,
  },
    {
    id: 6,
    name: 'Liberica Coffee Beans',
    description: 'Medium Roasted',
    price: 4.20,
    image: 'https://example.com/beans2.jpg',
    sizes: ['250gm', '500gm', '1kg'],
    selectedSize: '250gm',
    quantity: 1,
  },
    {
    id: 7,
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

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handlePay = () => {
    navigation.navigate('Payment', { totalPrice: parseFloat(totalPrice) });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
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
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, -1)}
                  >
                    <Icon name="minus" size={16} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, 1)}
                  >
                    <Icon name="plus" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
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
    backgroundColor: 'white' ,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
  title: {
    color: primaryColor,
    fontSize: 28,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor,
    borderRadius: 10,
    // padding: 16,
    marginBottom: 16,
  },
  image: {
    width: '30%',
    // height: '',
    // borderRadius: 10,
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#FF5733',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
    backButton: {
    position: 'absolute',
    zIndex: 1,
    padding: 20,
    top: 30,
    left: 10,
    fontSize: 10,
  },
});

export default CartScreen;
