import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const categories = ['All', 'Cappuccino', 'Espresso', 'Americano', 'Macchiato'];
const coffeeProducts = [
  { id: 1, name: 'Cappuccino', description: 'With Steamed Milk', price: 4.20, rating: 4.5, image: 'https://example.com/cappuccino1.jpg' },
  { id: 2, name: 'Cappuccino', description: 'With Foam', price: 4.20, rating: 4.2, image: 'https://example.com/cappuccino2.jpg' },
  { id: 3, name: 'Robusta Beans', description: 'Medium Roasted', price: 5.00, rating: 4.0, image: 'https://example.com/beans1.jpg' },
  { id: 4, name: 'Arabica Beans', description: 'With Steamed Milk', price: 6.00, rating: 4.1, image: 'https://example.com/beans2.jpg' },
  { id: 5, name: 'Arabica Beans', description: 'With Steamed Milk', price: 6.00, rating: 4.1, image: 'https://example.com/beans2.jpg' },
];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find the best coffee for you</Text>
        <Icon name="user" size={30} color="#fff" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Find Your Coffee..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedCategory(category)}>
            <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextSelected]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Coffee List */}
      <Text style={styles.sectionTitle}>Coffee Drinks</Text>
      <FlatList
        horizontal
        data={coffeeProducts.filter(product => product.name.toLowerCase().includes('cappuccino'))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Icon name="plus" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Coffee Beans Section */}
      <Text style={styles.sectionTitle}>Coffee Beans</Text>
      <FlatList
        horizontal
        data={coffeeProducts.filter(product => product.name.toLowerCase().includes('beans'))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Icon name="plus" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 20,
    flex: 1,
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
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    height: 40,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  categoryText: {
    color: '#999',
    fontSize: 16,
    marginHorizontal: 10,
  },
  categoryTextSelected: {
    color: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ff7f50',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginRight: 20,
    width: 150,
    padding: 10,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  productInfo: {
    marginTop: 10,
  },
  productName: {
    color: '#fff',
    fontSize: 16,
  },
  productDescription: {
    color: '#999',
    fontSize: 12,
  },
  productPrice: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#ff7f50',
    borderRadius: 20,
    padding: 8,
  },
});

export default HomeScreen;
