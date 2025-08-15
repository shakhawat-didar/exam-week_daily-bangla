// services/userService.js
import api from './api';

// Get user profile
export const getUserProfile = () => api.get('/user/me');

// Update user profile
export const updateUserProfile = (userData) => api.put('/user/update', userData);

// Change password
export const changePassword = (passwordData) => api.put('/user/password', passwordData);

// Get user's news
export const getUserNews = (page = 1, limit = 10) => 
  api.get(`/user/news?page=${page}&limit=${limit}`);
