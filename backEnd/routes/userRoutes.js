import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/me', protect, getUserProfile);
router.put('/update', protect, updateUserProfile);

export default router;
