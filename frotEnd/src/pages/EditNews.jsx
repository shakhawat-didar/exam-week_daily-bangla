// pages/EditNews.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { fetchSingleNews, updateNews } from '../services/newsService';

const EditNews = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'অন্যান্য',
    image: '',
    videoUrl: '',
    gallery: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);
  
  const { token } = useUserStore();
  const navigate = useNavigate();

  const categories = ['রাজনীতি', 'খেলাধুলা', 'বিনোদন', 'আন্তর্জাতিক', 'প্রযুক্তি', 'মতামত', 'গ্যালারি', 'অন্যান্য'];

  useEffect(() => {
    const loadNews = async () => {
      if (id) {
        try {
          setInitialLoading(true);
          const response = await fetchSingleNews(id);
          const news = response.data;
          
          setFormData({
            title: news.title || '',
            content: news.content || '',
            category: news.category || 'অন্যান্য',
            image: news.image || '',
            videoUrl: news.videoUrl || '',
            gallery: news.gallery || []
          });
        } catch (error) {
          setError(error.response?.data?.message || 'Failed to load news');
        } finally {
          setInitialLoading(false);
        }
      }
    };

    loadNews();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateNews(id, formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update news');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="p-8 text-center">
        <p>Please login to edit news</p>
      </div>
    );
  }

  if (initialLoading) {
    return (
      <div className="p-8 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-red-600">Edit News</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            name="content"
            required
            rows="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Image URL
          </label>
          <input
            type="url"
            name="image"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video URL
          </label>
          <input
            type="url"
            name="videoUrl"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update News'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNews;
