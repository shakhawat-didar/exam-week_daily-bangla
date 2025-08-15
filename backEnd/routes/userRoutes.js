import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { getUserNews } from '../controllers/newsController.js';

const router = express.Router();

router.get('/me', protect, getUserProfile);
router.put('/update', protect, updateUserProfile);
router.get('/news', protect, getUserNews); // GET /api/user/news - get current user's news

export default router;
