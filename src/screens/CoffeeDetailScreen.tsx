import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCart } from './context/CartContext';
import { useFavorites } from './context/FavoritesContext';

const backgroundColor = '#f4f4f4'; // Màu nền sáng
const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất

const CoffeeDetailScreen = ({ route, navigation }) => {
  const { product } = route.params; // Lấy dữ liệu sản phẩm từ params
  const [selectedSize, setSelectedSize] = useState('S');

  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, favoriteItems } = useFavorites(); // Lấy từ context Favorites

  const [isFavorited, setIsFavorited] = useState(
    favoriteItems.some(fav => fav.id === product.id)
  );
  // Hàm toggle yêu thích
  const toggleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
    setIsFavorited(!isFavorited);
  };

  const goBackToHome = () => {
    navigation.navigate('Home');
  };

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize, quantity: 1 });
    Alert.alert('Success', 'Product added to cart!', [{ text: 'OK' }]);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBackToHome} style={styles.backButton}>
          <Icon name="arrow-left" size={30} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Icon name={isFavorited ? 'heart' : 'heart-o'} size={30} color="#0f4359" />
        </TouchableOpacity>
      </View>
      {/* Ảnh sản phẩm */}
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.bottom}>
        {/* Thông tin sản phẩm */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.description}>
            {product.description} Cappuccino là một thức uống cổ điển của Ý, nổi bật với sự kết hợp hoàn hảo giữa espresso, sữa nóng và lớp bọt sữa mịn màng...
          </Text>
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
              style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Giá cả và nút thêm vào giỏ hàng */}
        <View style={styles.priceAndCartContainer}>
          <View>
            <Text style={styles.priceTitle}>Price</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
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
    height: '50%',
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
  priceTitle:{
        fontSize: 14,
    fontWeight: '500',
    color: primaryColor,
    marginTop: 5,
  }
});

export default CoffeeDetailScreen;
