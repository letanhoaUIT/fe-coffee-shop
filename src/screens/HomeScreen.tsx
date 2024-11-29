import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity, PanResponder, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types'; // Nhớ import kiểu RootStackParamList
import Banner from '../components/Home/Banner';
import CoffeeItem from '../components/Home/CoffeeItem';


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScn'>;

const { width, height } = Dimensions.get('window'); // Lấy chiều rộng và chiều cao màn hình

// Màu sắc chủ đạo theo hình ảnh mẫu
const backgroundColor = '#white'; // Màu nền sáng
const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất

const categories = ['All', 'Cappuccino', 'Espresso', 'Americano', 'Macchiato'];


const HomeScreen = () => {
  const [avatarUrl, setAvatarUrl] = useState('https://uploads.commoninja.com/searchengine/wordpress/user-avatar-reloaded.png');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation<HomeScreenNavigationProp>(); 
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerImages = [
  'https://img.buzzfeed.com/buzzfeed-static/static/2024-08/30/22/asset/673a78601a5a/sub-buzz-1848-1725055325-1.jpg',
  'https://img.lovepik.com/photo/20211119/small/lovepik-delicious-coffee-and-coffee-beans-picture_500217119.jpg',
  'https://img.lovepik.com/photo/48017/7352.jpg_wh300.jpg',
];

const coffeeProducts = [
  { id: 1, name: 'Cappuccino', description: 'With Steamed Milk', price: 4.20, rating: 4.5, image: 'https://example.com/cappuccino1.jpg' },
  { id: 2, name: 'Cappuccino', description: 'With Foam', price: 4.20, rating: 4.2, image: 'https://example.com/cappuccino2.jpg' },
  { id: 3, name: 'Robusta Beans', description: 'Medium Roasted', price: 5.00, rating: 4.0, image: 'https://example.com/beans1.jpg' },
  { id: 4, name: 'Arabica Beans', description: 'With Steamed Milk', price: 6.00, rating: 4.1, image: 'https://example.com/beans2.jpg' },
  { id: 5, name: 'Arabica Beans', description: 'With Steamed Milk', price: 6.00, rating: 4.1, image: 'https://example.com/beans2.jpg' },
];
  const handlePressProduct = (product: any) => {
    navigation.navigate('Bean', { product }); // Điều hướng với tham số product
  };

  const handlePressCoffee = (product: any) => {
    navigation.navigate('CoffeeDetail', { product }); // Điều hướng với tham số product
  };

  const handlePressUser = () => {
    navigation.navigate('UserProfile'); // Điều hướng đến màn hình UserProfile
  };


  // Sử dụng Animated.Value để theo dõi vị trí của biểu tượng
  const pan = useRef(new Animated.ValueXY()).current;

  // Tạo PanResponder để xử lý các sự kiện kéo thả
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true, 
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset(); 
      },
    })
  ).current;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>☕ FIND THE BEST COFFEE</Text>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://uploads.commoninja.com/searchengine/wordpress/user-avatar-reloaded.png',
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        {/* <Text>Xin ch</Text> */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#0f4359" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Find Your Coffee..."
          placeholderTextColor='#0f4359'
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton} onPress={() => setSelectedCategory(category)}>
            <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextSelected]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Banner component */}
      <Banner images={bannerImages} />

      {/* Best Seller */}
      <Text style={styles.sectionTitle}>BEST SELLER</Text>
      <FlatList
        horizontal
        data={coffeeProducts.filter(product => product.name.toLowerCase().includes('cappuccino'))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressCoffee(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="plus" size={12} color="#0f4359" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

{/* Đường kẻ ngang */}
<View style={styles.separator} />

      {/* Coffee List */}
      <Text style={styles.sectionTitle}>COFFEE DRINKS</Text>
      <FlatList
        horizontal
        data={coffeeProducts.filter(product => product.name.toLowerCase().includes('cappuccino'))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressCoffee(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="plus" size={12} color="#0f4359" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

{/* Đường kẻ ngang */}
<View style={styles.separator} />

      {/* Coffee Beans Section */}
      <Text style={styles.sectionTitle}>COFFEE BEANS</Text>
      <FlatList
        horizontal
        data={coffeeProducts.filter(product => product.name.toLowerCase().includes('beans'))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressProduct(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="plus" size={12} color="#0f4359" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Màu nền tông nâu nhạt
    paddingHorizontal: 15,
    // paddingBottom: 1000,
    marginBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color:  primaryColor, 
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#333',
    height: 40,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  categoryButton: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: 'white',
    fontSize: 16,
    // marginHorizontal: 10,
    // fontWeight: '100'
  },
  categoryTextSelected: {
    color: secondaryColor,

  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 15,
    // marginTop: 15,
  },
  card: {
 backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
    width: 150,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productInfo: {
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
  },
  productDescription: {
    fontSize: 12,
    color: primaryColor,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: primaryColor,
  },
  addButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: 'white',
    borderRadius: 180,
    padding: 8,
    borderWidth: 1, // Độ dày của viền
    borderColor: primaryColor,
  },
  separator: {
    borderBottomWidth: 1,  // Độ dày của đường kẻ
    borderBottomColor: '#ddd',  // Màu của đường kẻ
    marginVertical: 25,  // Khoảng cách trên và dưới đường kẻ
    marginRight:10,
    marginLeft:10,
  },
});

export default HomeScreen;
