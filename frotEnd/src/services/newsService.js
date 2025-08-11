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





