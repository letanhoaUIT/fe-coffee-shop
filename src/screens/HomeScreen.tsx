import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity, PanResponder, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import Banner from '../components/Home/Banner';
import CoffeeBeansList from '../components/CoffeeBeansList';
import CoffeeDrinksList from '../components/CoffeeDrinksList';
import api from '../api/axiosConfig';
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScn'>;

const { width } = Dimensions.get('window'); 

const primaryColor = '#0f4359'; // Màu chủ xanh dương
const secondaryColor = '#8d6e52'; // Màu phụ đất

const categories = ['All', 'Cappuccino', 'Espresso', 'Americano', 'Macchiato', 'Arabica', 'Robusta'];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState('');
  const [beans, setBeans] = useState<any[]>([]);
  const [drinks, setDrinks] = useState<any[]>([]);
  const [selectedBean, setSelectedBean] = useState<string | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [coffeeProducts, setCoffeeProducts] = useState<any[]>([]); // Dữ liệu tổng hợp sản phẩm
    const [selectedCategory, setSelectedCategory] = useState('All');

  const bannerImages = [
    'https://img.buzzfeed.com/buzzfeed-static/static/2024-08/30/22/asset/673a78601a5a/sub-buzz-1848-1725055325-1.jpg',
    'https://img.lovepik.com/photo/20211119/small/lovepik-delicious-coffee-and-coffee-beans-picture_500217119.jpg',
    'https://img.lovepik.com/photo/48017/7352.jpg_wh300.jpg',
  ];

useEffect(() => {
  const fetchData = async () => {
    try {
      const [categoriesRes, beansRes, drinksRes] = await Promise.all([
        api.get('categories'), 
        api.get('coffeeBeans'), 
        api.get('coffeeDrinks'), 
      ]);

      setBeans(beansRes.data); // Lưu dữ liệu coffee beans
      setDrinks(drinksRes.data); // Lưu dữ liệu coffee drinks

      // Kết hợp sản phẩm từ beans và drinks
      const combinedProducts = [...beansRes.data, ...drinksRes.data];
      setFilteredProducts(combinedProducts); 
      setCoffeeProducts(combinedProducts); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData(); 
}, []); 


  const handlePressProduct = (product: any) => {
    navigation.navigate('Bean', { product });
  };

  const handlePressCoffee = (product: any) => {
    navigation.navigate('CoffeeDetail', { product });
  };

  const handlePressUser = () => {
    navigation.navigate('UserProfile');
  };

const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProducts(query, selectedCategory);
  };

  const filterProducts = (query: string, category: string) => {
    let filtered = coffeeProducts;

    if (category !== 'All') {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(category.toLowerCase()));
    }

    if (query) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    }

    setFilteredProducts(filtered);
  };



  // Render item trong FlatList
  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const inputRange = [
      (index - 1) * (width / 3),
      index * (width / 3),
      (index + 1) * (width / 3)
    ];

    // Thay đổi scale dựa trên vị trí cuộn
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1.1, 0.9],
      extrapolate: 'clamp'
    });


    return (
      <TouchableOpacity onPress={() => handlePressCoffee(item)}>
        <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
          <Image source={{ uri: item.image_url}} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="plus" size={12} color="#0f4359" />
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    );
  };



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>☕ FIND THE BEST COFFEE</Text>
        <TouchableOpacity onPress={() => navigation.navigate('UserStack', { screen: 'UserProfile' })}>
          <Image
            source={{
              uri: 'https://uploads.commoninja.com/searchengine/wordpress/user-avatar-reloaded.png',
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        {/* <Text>Xin ch</Text> */}
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#0f4359" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Find Your Coffee..."
          placeholderTextColor="#0f4359"
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((category, index) => (
           <TouchableOpacity key={index} style={styles.categoryButton} onPress={() => { setSelectedCategory(category); filterProducts(searchQuery, category); }}>
            <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextSelected]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      {/* Banner component */}
      <Banner images={bannerImages} />

      {/* Danh sách sản phẩm - render be coffee vs beans */}
      <Text style={styles.sectionTitle}>DANH SÁCH SẢN PHẨM</Text>
      <Animated.FlatList
        horizontal
        data={filteredProducts}
        keyExtractor={item => item.id ? item.id.toString() : item.name} // Kiểm tra item.id, nếu không có thì dùng item.name
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16} // Cải thiện hiệu suất
      />



      {/* Đường kẻ ngang */}
      <View style={styles.separator} />

      {/* Coffee List */}
      <CoffeeDrinksList onPressCoffee={handlePressCoffee} />
      {/* Đường kẻ ngang */}
      <View style={styles.separator} />

      {/* Coffee Beans Section */}
      <CoffeeBeansList onPressProduct={handlePressProduct} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Màu nền tông nâu nhạt
    paddingHorizontal: 15,
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
    color: primaryColor,
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
    borderWidth: 0.25,
    borderColor: primaryColor,
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
    marginRight: 15,
    width: 175,
    height: 260,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  productInfo: {
    marginTop: 10,
    marginLeft: 10,
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
    bottom: 15,
    backgroundColor: 'white',
    borderRadius: 180,
    padding: 6,
    borderWidth: 1, // Độ dày của viền
    borderColor: primaryColor,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 25,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default HomeScreen;
