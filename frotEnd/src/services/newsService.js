// services/newsService.js
import api from './api';

// get top 6
export const fetchTopNews = () => api.get('/news/top');

// get latest (with page & limit)
export const fetchLatestNews = (page = 1, limit = 8) => api.get(`/news?page=${page}&limit=${limit}`);

// get by category
export const fetchCategoryNews = (category, limit = 6) =>
  api.get(`/news/category/${encodeURIComponent(category)}?limit=${limit}`);

// get trending
export const fetchTrendingNews = (limit = 6) => api.get(`/news/trending?limit=${limit}`);

// get gallery
export const fetchGalleryNews = (limit = 8) => api.get(`/news/gallery?limit=${limit}`);

// get single
export const fetchSingleNews = (id) => api.get(`/news/${id}`);

// Get all news with filters
export const fetchAllNews = (page = 1, limit = 12, category = '') => {
  const params = new URLSearchParams();
  if (page) params.append('page', page);
  if (limit) params.append('limit', limit);
  if (category) params.append('category', category);
  
  return api.get(`/news?${params.toString()}`);
};

// Get current user's news
export const getUserNews = (page = 1, limit = 10) => 
  api.get(`/news/user/me?page=${page}&limit=${limit}`);

// Create new news (authenticated)
export const createNews = (newsData) => api.post('/news', newsData);

// Update news (authenticated)
export const updateNews = (id, newsData) => api.put(`/news/${id}`, newsData);

// Delete news (authenticated)
export const deleteNews = (id) => api.delete(`/news/${id}`);

// Increment view count
export const incrementViews = (id) => api.patch(`/news/${id}/views`);





