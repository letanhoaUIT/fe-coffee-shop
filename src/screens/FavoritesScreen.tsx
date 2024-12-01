import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const favoriteItems = [
  {
    id: 1,
    name: 'Cappuccino',
    description: 'With Steamed Milk',
    price: 4.20,
    rating: 4.5,
    ratingCount: 6879,
    image: 'https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg',
    tags: ['Coffee', 'Milk'],
    roastType: 'Medium Roasted',
  },
    {
    id: 2,
    name: 'Cappuccino',
    description: 'With Steamed Milk',
    price: 4.20,
    rating: 4.5,
    ratingCount: 6879,
    image: 'https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg',
    tags: ['Coffee', 'Milk'],
    roastType: 'Medium Roasted',
  },
    {
    id: 3,
    name: 'Cappuccino',
    description: 'With Steamed Milk',
    price: 4.20,
    rating: 4.5,
    ratingCount: 6879,
    image: 'https://angelinos.com/cdn/shop/articles/How_Much_Milk_Coffee_in_a_Cappuccino.jpg',
    tags: ['Coffee', 'Milk'],
    roastType: 'Medium Roasted',
  },
  // Thêm nhiều sản phẩm yêu thích khác nếu cần
];

const backgroundColor = 'white'; // Màu nền sáng
const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState(favoriteItems);
  const handlePressFavorite = (item: any) => {
    // Điều hướng đến trang chi tiết của sản phẩm
    navigation.navigate('CoffeeDetail', { product: item });
  };

  const removeFavorite = (id: number, name: string) => {
    // Xóa sản phẩm khỏi danh sách
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id));

    // Hiển thị thông báo
    alert(`Đã bỏ chọn ${name} ra khỏi danh sách yêu thích`);
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        {/* <Icon name="user" size={30} color="#0f4359" /> */}
      </View>

      {/* Favorite Items */}
      <FlatList
        data={favorites} // Sử dụng state để hiển thị danh sách
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
                    color="red"
                    padding={10}
                    onPress={() => removeFavorite(item.id, item.name)}
                  />
                </View>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.tagsContainer}>
                  {item.tags.map(tag => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                  <Text style={styles.roastType}>{item.roastType}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                  <Text style={styles.ratingCount}>({item.ratingCount})</Text>
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
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  tag: {
    backgroundColor: '#444',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
  roastType: {
    color: primaryColor,
    fontSize: 12,
    fontWeight: 'bold',
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
