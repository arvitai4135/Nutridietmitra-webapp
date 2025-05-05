import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend.nutridietmitra.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`, {
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for 401 handling with token refresh
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.method.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.error(`API Error: ${originalRequest?.method.toUpperCase()} ${originalRequest?.url}`, {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    if (originalRequest.url.startsWith('/blogs/slug/')) {
      if (!error.response) {
        error.message = `Network Error: Unable to connect to ${API_URL}. Please ensure the backend server is running and accessible.`;
      }
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/users/refresh`, {
            refresh_token: refreshToken,
          });
          const newToken = response.data.access_token;
          sessionStorage.setItem('token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          sessionStorage.clear();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        sessionStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;