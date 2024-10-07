import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com/api', // Thay thế bằng URL API 
  timeout: 10000,
});

export default api;
