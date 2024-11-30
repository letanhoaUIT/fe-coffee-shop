import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/types';

// Khai báo kiểu cho props của màn hình
type CoffeeDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CoffeeDetail'>;
type CoffeeDetailScreenRouteProp = RouteProp<RootStackParamList, 'CoffeeDetail'>;

type Props = {
  navigation: CoffeeDetailScreenNavigationProp;
  route: CoffeeDetailScreenRouteProp;
};

const backgroundColor = '#f4f4f4'; // Màu nền sáng
const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất

const CoffeeDetailScreen = ({ route, navigation }: Props) => {
  const { product } = route.params; // Lấy dữ liệu sản phẩm từ params
  const [selectedSize, setSelectedSize] = useState('S'); 
  const [isFavorited, setIsFavorited] = useState(false); 

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); 
  };

  const goBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Mũi tên quay lại */}
      <TouchableOpacity onPress={goBackToHome} style={styles.backButton}>
        <Icon name="arrow-left" size={30} color='white' />
      </TouchableOpacity>

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
  },
  image: {
    width: '100%',
    height: '45%',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  bottom: {
    marginHorizontal: 20,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  infoContainer: {
    marginTop: 16,
  },
  productName: {
    color: primaryColor,
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    color: primaryColor,
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
    paddingHorizontal: 50,
  },
  selectedSizeButton: {
    backgroundColor: secondaryColor,
  },
  sizeText: {
    color: 'white',
    fontSize: 16,
  },
  selectedSizeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  priceTitle: {
    color: primaryColor,
    fontSize: 18,
    marginTop: 20,
  },
  price: {
    color: primaryColor,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
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
  backButton: {
    position: 'absolute',
    zIndex: 1,
    padding: 20,
    top: 30,
    left: 10,
    fontSize: 10,
  },
});

export default CoffeeDetailScreen;
