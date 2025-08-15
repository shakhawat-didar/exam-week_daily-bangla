// services/authService.js
import api from './api';

// User registration
export const registerUser = (userData) => api.post('/auth/register', userData);

// User login
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// Get current user profile
export const getCurrentUser = () => api.get('/auth/me');

// Logout (clear token on frontend)
export const logoutUser = () => {
  localStorage.removeItem('token');
  // You might want to call a backend logout endpoint if needed
  // return api.post('/auth/logout');
};
