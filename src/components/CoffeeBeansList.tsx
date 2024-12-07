// CoffeeBeansList.tsx
import React from 'react';
import { FlatList, Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';

const primaryColor = '#0f4359'; // Màu chủ xanh dương

interface CoffeeProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const CoffeeBeansList = ({ onPressProduct }: { onPressProduct: (item: CoffeeProduct) => void }) => {
  // Giả lập dữ liệu cho Coffee Beans
  const coffeeBeans: CoffeeProduct[] = [
    {
      id: 1,
      name: 'Arabica Beans',
      description: 'High-quality coffee beans from Ethiopia',
      price: 15.0,
      image: 'https://example.com/arabica.jpg',
    },
    {
      id: 2,
      name: 'Robusta Beans',
      description: 'Strong and bold beans from Vietnam',
      price: 12.5,
      image: 'https://example.com/robusta.jpg',
    },
    {
      id: 3,
      name: 'Liberica Beans',
      description: 'Fruity and floral coffee beans from the Philippines',
      price: 18.0,
      image: 'https://example.com/liberica.jpg',
    },
    // Thêm các sản phẩm khác ở đây
  ];

  return (
    <View>
      <Text style={styles.sectionTitle}>COFFEE BEANS</Text>
      <FlatList
        horizontal
        data={coffeeBeans} // Sử dụng trực tiếp dữ liệu từ mảng coffeeBeans
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressProduct(item)}>
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

export default CoffeeBeansList;
