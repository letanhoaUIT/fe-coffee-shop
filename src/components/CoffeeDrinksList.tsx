// CoffeeDrinksList.tsx
import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
const backgroundColor = 'white'; // Màu nền sáng
const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất
interface CoffeeProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const CoffeeDrinksList = ({onPressCoffee }: { onPressCoffee: (item: CoffeeProduct) => void }) => {
  // Giả lập dữ liệu cho Coffee Drinks
  const coffeeDrinks: CoffeeProduct[] = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Rich and bold coffee',
      price: 3.5,
      image: 'https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg',
    },
    {
      id: 2,
      name: 'Latte',
      description: 'Smooth coffee with steamed milk',
      price: 4.0,
      image: 'https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg',
    },
    {
      id: 3,
      name: 'Cappuccino',
      description: 'Espresso topped with foamed milk',
      price: 4.2,
      image: 'https://example.com/cappuccino.jpg',
    },
    // Thêm các sản phẩm khác ở đây
  ];


  return (
    <View>
      <Text style={styles.sectionTitle}>COFFEE DRINKS</Text>
      <FlatList
        horizontal
        data={coffeeDrinks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressCoffee(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    width: 175,
    height: 260,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  productInfo: {
    marginTop: 10,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
  },
  productDescription: {
    fontSize: 12,
    color: primaryColor,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: primaryColor,
  },
});

export default CoffeeDrinksList;
