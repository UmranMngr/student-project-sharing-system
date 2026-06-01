import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-backend-url/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token'ı eklemek için interceptors kullanabilirsiniz
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Token'ı localStorage'dan alın
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;
