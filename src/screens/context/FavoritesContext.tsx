import React, { createContext, useContext, useState } from 'react';

// Định nghĩa kiểu dữ liệu của sản phẩm yêu thích
type FavoriteItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  ratingCount: number;
  image: string;
  roastType: string;
};

// Định nghĩa kiểu context
type FavoritesContextType = {
  favoriteItems: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Context provider
export const FavoritesProvider: React.FC = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavoriteItems(prevFavorites => {
      if (!prevFavorites.some(fav => fav.id === item.id)) {
        return [...prevFavorites, item];
      }
      return prevFavorites; // Không thêm nếu đã có trong danh sách yêu thích
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavoriteItems(prevFavorites => prevFavorites.filter(item => item.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favoriteItems, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
