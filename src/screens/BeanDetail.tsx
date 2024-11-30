import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const backgroundColor = '#f4f4f4'; // Màu nền sáng
const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất

const BeanDetailScreen = ({ route, navigation }) => {
  const { product } = route.params; // Lấy dữ liệu sản phẩm từ params
  const [selectedSize, setSelectedSize] = useState('250gm');
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };
  const addToCart = () => {
    // Xử lý logic thêm vào giỏ hàng 
    console.log(`Added ${product.name} (${selectedSize}) to cart.`);
  };

  const handlePressCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Nút quay lại */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Nút giỏ hàng */}
        <TouchableOpacity onPress={handlePressCart} style={styles.cartButton}>
          <Icon name="shopping-cart" size={24} color="#fff" />
        </TouchableOpacity>
      </View>


      {/* Ảnh sản phẩm */}
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.bottom}>
        {/* Biểu tượng trái tim yêu thích */}
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Icon name={isFavorited ? 'heart' : 'heart-o'} size={30} color={primaryColor} />
        </TouchableOpacity>

        {/* Thông tin sản phẩm */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.origin}>From {product.origin || 'Unknown'}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {product.rating || 'N/A'}</Text>
            <Text style={styles.ratingCount}>({product.ratingCount || 'N/A'})</Text>
          </View>
          <Text style={styles.roastType}>{product.roastType || 'Medium Roasted'}</Text>
        </View>

        {/* Mô tả chi tiết */}
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
              style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Giá cả và thêm vào giỏ hàng */}
        <View style={styles.priceAndCartContainer}>
          <View>
            <Text style={styles.priceTitle}>Price</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    // padding: 16,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  cartButton: {
    padding: 8,
  },
  bottom: {
    marginHorizontal: 20,
  },
  backButton: {
    padding: 8,
  },
  image: {
    width: '100%',
    height: '45%',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  infoContainer: {
    marginTop: 16,
  },
  productName: {
    color: primaryColor,
    fontSize: 24,
    fontWeight: 'bold',
  },
  origin: {
    color: primaryColor,
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
    color: primaryColor,
    fontSize: 14,
    marginTop: 8,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  descriptionTitle: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: primaryColor,
    fontSize: 14,
    lineHeight: 20,
  },
  sizeTitle: {
    color: primaryColor,
    fontSize: 18,
    marginTop: 20,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sizeButton: {
    backgroundColor: primaryColor,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  selectedSizeButton: {
    backgroundColor: secondaryColor,
  },
  sizeText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedSizeText: {
    fontWeight: 'bold',
  },
  price: {
    color: primaryColor,
    fontSize: 22,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartButton: {
    backgroundColor: primaryColor,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 65,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceAndCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default BeanDetailScreen;
