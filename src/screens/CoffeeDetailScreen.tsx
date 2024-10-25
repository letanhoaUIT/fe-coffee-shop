// src/screens/CoffeeDetailScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CoffeeDetailScreen = ({ route }) => {
  const { product } = route.params; // Lấy dữ liệu sản phẩm từ params
  const [selectedSize, setSelectedSize] = useState('S'); // Mặc định size là 'S'

  return (
    <View style={styles.container}>
      {/* Ảnh sản phẩm */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Thông tin sản phẩm */}
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {product.rating || 'N/A'}</Text>
          <Text style={styles.ratingCount}>({product.ratingCount || 'N/A'})</Text>
        </View>
      </View>

      {/* Lựa chọn size */}
      <Text style={styles.sizeTitle}>Size</Text>
      <View style={styles.sizeOptions}>
        {['S', 'M', 'L'].map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSizeButton,
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === size && styles.selectedSizeText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Giá cả và nút thêm vào giỏ hàng */}
      <Text style={styles.priceTitle}>Price</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 16,
  },
  productName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    color: '#ffdd00',
    fontSize: 16,
  },
  ratingCount: {
    color: 'gray',
    marginLeft: 8,
  },
  sizeTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sizeButton: {
    backgroundColor: '#333',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  selectedSizeButton: {
    backgroundColor: '#ff7f50',
  },
  sizeText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedSizeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  priceTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
  },
  price: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  addToCartButton: {
    backgroundColor: '#ff7f50',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CoffeeDetailScreen;
