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
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <p className="text-sm text-gray-500 mb-4">By {news.author?.name || 'Unknown'} • {new Date(news.createdAt).toLocaleString()}</p>
      {news.image && <img src={news.image} alt={news.title} className="w-full h-80 object-cover rounded mb-4" />}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />
      <div className="mt-6 text-sm text-gray-500">Views: {news.views}</div>
    </article>
  );
};

export default NewsDetails;
