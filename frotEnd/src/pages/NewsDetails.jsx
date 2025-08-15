// pages/NewsDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleNews } from '../services/newsService';

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchSingleNews(id);
        setNews(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching news');
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!news) return <div className="p-8">News not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-red-600">{news.title}</h1>
        
        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{new Date(news.createdAt).toLocaleDateString()}</span>
          <span>{news.views || 0} views</span>
          {news.category && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
              {news.category}
            </span>
          )}
        </div>

        {/* Main image */}
        {news.image && (
          <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-96 object-cover rounded"
          />
        )}

        {/* Content */}
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{news.content}</p>
        </div>

        {/* Gallery */}
        {news.gallery && news.gallery.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-600">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {news.gallery.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`${news.title} - Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded"
                />
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {news.videoUrl && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-600">Video</h3>
            <div className="aspect-video">
              <iframe
                src={news.videoUrl}
                title={news.title}
                className="w-full h-full rounded"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default NewsDetails;
