import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.3:3000/api', // Thay thế bằng URL API 
  timeout: 10000,
});

export default api;
