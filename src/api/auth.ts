// src/api/auth.js
import axios from 'axios';
import { config } from '../config';

const apiClient = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    // Get token (implementation depends on your auth provider)
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call your refresh token function
        const refreshed = await refreshAuthToken();
        if (refreshed) {
          // Retry the original request
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh error (usually by logging out)
        handleAuthError();
      }
    }
    return Promise.reject(error);
  }
);

const authAPI = {
  login: async (credentials: any) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData: any) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
  
  logout: async (token: any) => {
    return await apiClient.post('/auth/logout');
  },
  
  refreshToken: async (refreshToken: any) => {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return response.data;
  },
  
  getUserProfile: async (token: any) => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },
  
  // Other auth-related API calls
};

export default authAPI;