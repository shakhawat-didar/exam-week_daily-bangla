// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchTopNews, fetchLatestNews,
  fetchCategoryNews, fetchTrendingNews, fetchGalleryNews
} from '../services/newsService';

const categories = ['রাজনীতি','খেলাধুলা','বিনোদন','আন্তর্জাতিক','প্রযুক্তি'];

const Home = () => {
  const [top, setTop] = useState([]);
  const [latest, setLatest] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [trending, setTrending] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [
          topRes,
          latestRes,
          trendingRes,
          galleryRes
        ] = await Promise.all([
          fetchTopNews(),
          fetchLatestNews(1, 8),
          fetchTrendingNews(6),
          fetchGalleryNews(8)
        ]);

        setTop(topRes.data);
        setLatest(latestRes.data.data || latestRes.data); // depending on response shape
        setTrending(trendingRes.data);
        setGallery(galleryRes.data);

        // fetch per-category (in parallel)
        const catPromises = categories.map(cat => fetchCategoryNews(cat, 4));
        const catResults = await Promise.all(catPromises);
        const catObj = {};
        categories.forEach((cat, idx) => {
          catObj[cat] = catResults[idx].data;
        });
        setCategoryData(catObj);
      } catch (err) {
        setError(err.message || 'Error loading data');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-8">
      {/* Hero / Top 6 */}
      <section>
        <h2 className="text-2xl font-bold text-red-500 mb-4">Top News</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {top.map(n => (
            <Link to={`/news/${n._id}`} key={n._id} className="card p-3 border rounded">
              {n.image && <img src={n.image} alt={n.title} className="w-full h-40 object-cover rounded mb-2" />}
              <h3 className="font-semibold">{n.title}</h3>
              <p className="text-sm text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section>
        <h2 className="text-2xl font-bold text-red-500 mb-4">Latest News</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {latest.map(n => (
            <Link to={`/news/${n._id}`} key={n._id} className="p-3 border rounded">
              {n.image && <img src={n.image} alt={n.title} className="w-full h-28 object-cover rounded mb-2" />}
              <h3 className="font-medium text-sm">{n.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Highlights */}
      <section>
        <h2 className="text-2xl font-bold text-red-500 mb-4">Category Highlights</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map(cat => (
            <div key={cat} className="p-4 border rounded">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">{cat}</h3>
                <Link to={`/news?category=${encodeURIComponent(cat)}`} className="text-sm text-blue-600">View All</Link>
              </div>
              <ul className="space-y-2">
                {(categoryData[cat] || []).map(n => (
                  <li key={n._id}>
                    <Link to={`/news/${n._id}`} className="hover:underline">{n.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section>
        <h2 className="text-2xl font-bold text-red-500 mb-4">Trending</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {trending.map(n => (
            <Link to={`/news/${n._id}`} key={n._id} className="p-3 border rounded">
              {n.image && <img src={n.image} alt={n.title} className="w-full h-36 object-cover rounded mb-2" />}
              <h3 className="font-medium">{n.title}</h3>
              <p className="text-xs text-gray-500">{n.views || 0} views</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section>
        <h2 className="text-2xl font-bold text-red-500 mb-4">Photo Gallery</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {gallery.map(n => (
            <Link to={`/news/${n._id}`} key={n._id} className="block border rounded overflow-hidden">
              {n.gallery && n.gallery.length > 0 ? (
                <img src={n.gallery[0]} alt={n.title} className="w-full h-36 object-cover" />
              ) : n.image ? (
                <img src={n.image} alt={n.title} className="w-full h-36 object-cover" />
              ) : (
                <div className="h-36 flex items-center justify-center text-gray-500">No Image</div>
              )}
              <div className="p-2">
                <h3 className="text-sm font-medium">{n.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
