import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const BeanDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'your_image_url_here' }} // Thay thế bằng URL hình ảnh của bạn
        style={styles.image}
      />
      <Text style={styles.productName}>Robusta Beans</Text>
      <Text style={styles.origin}>From Africa</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>⭐ 4.5</Text>
        <Text style={styles.ratingCount}>(6,879)</Text>
      </View>
      <Text style={styles.roastType}>Medium Roasted</Text>
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.description}>
        Arabica beans are by far the most popular type of coffee beans, making up about 60% of the world's coffee. These tasty beans originated many centuries ago in the highlands of Ethiopia, and may even be the first coffee beans ever consumed!
      </Text>
      <Text style={styles.sizeTitle}>Size</Text>
      <View style={styles.sizeOptions}>
        <TouchableOpacity style={styles.sizeButton}>
          <Text style={styles.sizeText}>250gm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sizeButton}>
          <Text style={styles.sizeText}>500gm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sizeButton}>
          <Text style={styles.sizeText}>1000gm</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.priceTitle}>Price</Text>
      <Text style={styles.price}>$10.50</Text>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 192,
    borderRadius: 8,
  },
  productName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  origin: {
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    color: 'yellow',
    fontSize: 14,
  },
  ratingCount: {
    color: 'gray',
    marginLeft: 8,
  },
  roastType: {
    color: 'white',
    marginTop: 8,
  },
  descriptionTitle: {
    color: 'gray',
    marginTop: 16,
  },
  description: {
    color: 'lightgray',
    marginTop: 4,
  },
  sizeTitle: {
    color: 'gray',
    marginTop: 16,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sizeButton: {
    backgroundColor: '#4B5563', // Màu xám tương đương
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sizeText: {
    color: 'white',
  },
  priceTitle: {
    color: 'white',
    marginTop: 16,
  },
  price: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#3B82F6', // Màu xanh
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 16,
  },
  addToCartText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
});

export default BeanDetailScreen;
