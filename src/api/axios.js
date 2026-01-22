import axios from 'axios';

const axiosInstance = axios.create({
  // Remplace cette URL par celle de ton backend plus tard
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  }
});

// Ce code intercepte chaque requête pour y ajouter le Token de connexion
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;