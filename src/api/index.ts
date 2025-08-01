// src/lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: interceptor cho request/response
instance.interceptors.request.use(
  (config) => {
    // Gắn token nếu có
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('Lỗi API:', err.response);
    return Promise.reject(err);
  }
);

export default instance;
