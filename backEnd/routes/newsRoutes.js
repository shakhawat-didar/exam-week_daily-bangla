// routes/newsRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createNews, getAllNews, getTopNews,
  getSingleNews, updateNews, deleteNews,
  getNewsByCategory, getTrendingNews, getGalleryNews
} from '../controllers/newsController.js';

const router = express.Router();

router.get('/', getAllNews); // GET /api/news?page=1&limit=20
router.get('/top', getTopNews); // GET /api/news/top
router.get('/trending', getTrendingNews); // GET /api/news/trending?limit=10
router.get('/category/:category', getNewsByCategory); // GET /api/news/category/রাজনীতি
router.get('/gallery', getGalleryNews); // GET /api/news/gallery

router.get('/:id', getSingleNews); // single news (increments views)
router.post('/', protect, createNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);

export default router;
