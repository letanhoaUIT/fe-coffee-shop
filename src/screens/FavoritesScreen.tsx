import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from './context/FavoritesContext';
// const favoriteItems = [
//   {
//     id: 1,
//     name: 'Cappuccino',
//     description: 'With Steamed Milk',
//     price: 4.20,
//     rating: 4.5,
//     ratingCount: 6879,
//     image: 'https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg',
//     tags: ['Coffee', 'Milk'],
//     roastType: 'Medium Roasted',
//   },
//     {
//     id: 2,
//     name: 'Cappuccino',
//     description: 'With Steamed Milk',
//     price: 4.20,
//     rating: 4.5,
//     ratingCount: 6879,
//     image: 'https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg',
//     tags: ['Coffee', 'Milk'],
//     roastType: 'Medium Roasted',
//   },
//     {
//     id: 3,
//     name: 'Cappuccino',
//     description: 'With Steamed Milk',
//     price: 4.20,
//     rating: 4.5,
//     ratingCount: 6879,
//     image: 'https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg',
//     tags: ['Coffee', 'Milk'],
//     roastType: 'Medium Roasted',
//   },
//   // Thêm nhiều sản phẩm yêu thích khác nếu cần
// ];

const backgroundColor = 'white'; // Màu nền sáng
const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const { favoriteItems, addToFavorites, removeFromFavorites } = useFavorites(); 

  const handlePressFavorite = (item: any) => {
    // Điều hướng đến trang chi tiết của sản phẩm
    navigation.navigate('CoffeeDetail', { product: item });
  };

  const handleFavoriteToggle = (item: any) => {
    // Nếu sản phẩm đã có trong danh sách yêu thích, xóa nó; ngược lại, thêm vào danh sách
    if (favoriteItems.some(fav => fav.id === item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
      </View>

      {/* Favorite Items */}
      <FlatList
        data={favoriteItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressFavorite(item)}>
            <View style={styles.favoriteCard}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.infoContainer}>
                <View style={styles.topSection}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Icon
                    name="heart"
                    size={24}
                    color={favoriteItems.some(fav => fav.id === item.id) ? 'red' : 'gray'}
                    onPress={() => handleFavoriteToggle(item)} // Chuyển đổi yêu thích khi nhấn vào biểu tượng tim
                  />
                </View>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                  {/* <Text style={styles.ratingCount}>({item.ratingCount})</Text> */}
                </View>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'center', // Căn giữa theo chiều ngang
    marginTop: 40,
  },
  title: {
    color: primaryColor,
    fontSize: 28,
    fontWeight: 'bold',
  },
  favoriteCard: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    marginVertical: 10,
    // padding: 16,
    flexDirection: 'row',
  },
  image: {
    width: '35%',
    // height: 'auto',
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    color: primaryColor,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  rating: {
    color: '#ffdd00',
    fontSize: 16,
  },
  ratingCount: {
    color: primaryColor,
    marginLeft: 8,
  },
  price: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default FavoritesScreen;
