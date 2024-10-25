import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const BeanDetailScreen = ({ route }) => {
  const { product } = route.params; // Lấy dữ liệu sản phẩm từ params
  const [selectedSize, setSelectedSize] = useState('250gm');

  return (
    <View style={styles.container}>
      {/* Ảnh sản phẩm */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Tên sản phẩm và mô tả */}
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.origin}>From {product.origin || 'Unknown'}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {product.rating || 'N/A'}</Text>
          <Text style={styles.ratingCount}>({product.ratingCount || 'N/A'})</Text>
        </View>
        <Text style={styles.roastType}>{product.roastType || 'Medium Roasted'}</Text>
      </View>

      {/* Mô tả chi tiết sản phẩm */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>
          {product.description || 'No description available for this product.'}
        </Text>
      </View>

      {/* Lựa chọn kích thước */}
      <Text style={styles.sizeTitle}>Size</Text>
      <View style={styles.sizeOptions}>
        {['250gm', '500gm', '1000gm'].map((size) => (
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
  origin: {
    color: '#ff7f50',
    fontSize: 16,
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    color: '#ffdd00',
    fontSize: 16,
  },
  ratingCount: {
    color: 'gray',
    marginLeft: 8,
  },
  roastType: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 8,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  descriptionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
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

export default BeanDetailScreen;
