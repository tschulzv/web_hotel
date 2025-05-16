import axios from 'axios';

// Crear una instancia de Axios sin autenticación
const axiosInstance = axios.create({
  baseURL: 'https://localhost:7298/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;