// pages/News.jsx
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
// import { fetchAllNews } from '../services/newsService';
import api from '../services/api';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        // const res = await fetchAllNews(page, 12, category);
        const res = await api.get('/news');
setNews(res.data);
        setNews(res.data.data || res.data); // handle pagination or old shape
        setPages(res.data.pages || 1);
      } catch (err) {
        setError(err.message || 'Error fetching news');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, category]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {category ? `${category} News` : 'All News'}
      </h1>

      {/* News grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {news.length > 0 ? news.map(n => (
          <Link key={n._id} to={`/news/${n._id}`} className="border rounded p-3">
            {n.image && (
              <img src={n.image} alt={n.title} className="w-full h-40 object-cover rounded mb-2" />
            )}
            <h2 className="font-semibold">{n.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(n.createdAt).toLocaleDateString()}
            </p>
          </Link>
        )) : (
          <div>No news found</div>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-500 text-white' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
