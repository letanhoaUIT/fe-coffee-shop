// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import user slice

export const store = configureStore({
  reducer: {
    user: userReducer, // Thêm user reducer vào store
  },
});
