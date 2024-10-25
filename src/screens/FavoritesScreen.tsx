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
    image: 'https://example.com/cappuccino1.jpg',
    tags: ['Coffee', 'Milk'],
    roastType: 'Medium Roasted',
  },
  // Thêm nhiều sản phẩm yêu thích khác nếu cần
];

const FavoritesScreen = () => {
  const navigation = useNavigation();

  const handlePressFavorite = (item: any) => {
    // Điều hướng đến trang chi tiết của sản phẩm
    navigation.navigate('CoffeeDetail', { product: item });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Icon name="user" size={30} color="#fff" />
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
                  <Icon name="heart" size={24} color="red" />
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
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  favoriteCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginVertical: 10,
    padding: 16,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#aaa',
    marginVertical: 8,
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
    color: '#fff',
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
    color: '#aaa',
    marginLeft: 8,
  },
  price: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
