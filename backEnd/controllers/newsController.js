// controllers/newsController.js
import News from '../models/News.js';

// Create news (protected)
export const createNews = async (req, res) => {
  try {
    const { title, content, image, category, gallery, videoUrl } = req.body;
    const news = new News({
      title, content, image, category, gallery, videoUrl, author: req.user._id
    });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error creating news', error: error.message });
  }
};

// Get all news (latest first) with pagination support
export const getAllNews = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await News.countDocuments();
    const news = await News.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name');

    res.json({ data: news, page, pages: Math.ceil(total / limit), total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};

// Top news (top 6) — you said already exists; keep it
export const getTopNews = async (req, res) => {
  try {
    // Example: top by createdAt (or could be editorial chosen)
    const news = await News.find().sort({ createdAt: -1 }).limit(6);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top news' });
  }
};

// Trending news (most viewed)
export const getTrendingNews = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const news = await News.find().sort({ views: -1, createdAt: -1 }).limit(limit);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending news' });
  }
};

// News by category
export const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const limit = Number(req.query.limit) || 6;
    const news = await News.find({ category }).sort({ createdAt: -1 }).limit(limit);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category news' });
  }
};

// Gallery news (where gallery array not empty)
export const getGalleryNews = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 8;
    const news = await News.find({ gallery: { $exists: true, $ne: [] } })
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery news' });
  }
};

// Single news — increment views
export const getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'name');
    if (!news) return res.status(404).json({ message: 'News not found' });

    // increment views safely (atomic)
    news.views = (news.views || 0) + 1;
    await news.save();

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};

// Update news (protected - only author)
export const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, content, image, category, gallery, videoUrl } = req.body;
    news.title = title ?? news.title;
    news.content = content ?? news.content;
    news.image = image ?? news.image;
    news.category = category ?? news.category;
    news.gallery = gallery ?? news.gallery;
    news.videoUrl = videoUrl ?? news.videoUrl;

    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error updating news', error: error.message });
  }
};

// Delete news (protected - only author)
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await news.remove();
    res.json({ message: 'News removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting news', error: error.message });
  }
};
