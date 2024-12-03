import React, { createContext, useContext, useState } from 'react';

// Định nghĩa kiểu dữ liệu giỏ hàng
type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  selectedSize: string;  // Kích thước được chọn
  quantity: number;
  size: string; 
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, selectedSize: string) => void; // Thêm selectedSize
  updateCartItem: (id: number, selectedSize: string, quantity: number) => void; // Thêm selectedSize
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Thêm sản phẩm vào giỏ hàng
const addToCart = (item: CartItem) => {
  setCartItems(prevItems => {
    const existingItem = prevItems.find(i => i.id === item.id && i.selectedSize === item.selectedSize);

    if (existingItem) {
      // Nếu sản phẩm đã có trong giỏ, chỉ cần cập nhật số lượng
      return prevItems.map(i =>
        i.id === item.id && i.selectedSize === item.selectedSize
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    }

    // Nếu chưa có sản phẩm với id và selectedSize đó, thêm sản phẩm mới vào giỏ
    return [...prevItems, item];
  });
};


  // Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = (id: number, selectedSize: string) => {
  setCartItems(prevItems => 
    prevItems.filter(item => !(item.id === id && item.selectedSize === selectedSize))
  );
};


  // Cập nhật số lượng sản phẩm trong giỏ hàng
const updateCartItem = (id: number, selectedSize: string, quantity: number) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.id === id && item.selectedSize === selectedSize
        ? { ...item, quantity }
        : item
    )
  );
};


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
