import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add a request interceptor to include the auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getBaseUrl = () => {
  if (API_BASE_URL.startsWith('http')) {
    return API_BASE_URL.replace('/api', '');
  }
  // Fallback to your production backend URL if environment variable is missing
  return 'https://gymstore3.onrender.com';
};

export default api;
