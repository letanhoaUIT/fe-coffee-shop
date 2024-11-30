import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions, Animated, Text } from 'react-native';

const { width } = Dimensions.get('window'); // Chiều rộng màn hình

const Banner = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Lưu chỉ số của ảnh hiện tại
  const flatListRef = useRef<FlatList>(null); // Tham chiếu đến FlatList

  useEffect(() => {
    // Tự động chuyển sang ảnh tiếp theo sau mỗi 3 giây
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [images.length]);

  useEffect(() => {
    // Khi currentIndex thay đổi, cuộn đến ảnh mới
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex]);

  return (
    <View style={styles.bannerContainer}>
      {/* Banner */}
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />

      {/* Dots Indicator */}
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { opacity: currentIndex === index ? 1 : 0.5 }, // Đổi độ mờ dựa trên trạng thái
              currentIndex === index && styles.activeDot, // Hiện dot đậm màu hơn nếu được chọn
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width,
    height: 230,
    marginVertical: 12,
  },
  imageContainer: {
    width,
    justifyContent: 'center',
  },
  image: {
    width: width - 30,
    height: 210,
    borderRadius: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    position: 'absolute',
    bottom: 15, // Đặt vị trí dưới cùng
    left: 0,
    right: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#888', // Màu xám nhạt
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: 'white', // Màu chủ đạo cho dot đang chọn
  },
});

export default Banner;
