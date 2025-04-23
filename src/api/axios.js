import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://project-munnas-delax-backend.onrender.com/api', // 🌐 Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
