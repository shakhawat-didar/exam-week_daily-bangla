import { useEffect, useState } from 'react';
import api from '../services/api';
import { useUserStore } from '../store/userStore';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useUserStore();
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const res = await api.get('/news');
      const filtered = res.data.filter(n => n.author?._id === user?._id);
      setNewsList(filtered);
    };
    fetchNews();
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await api.delete(`/news/${id}`);
    setNewsList(newsList.filter(n => n._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Your Profile</h1>
      <p className="mb-4">Name: {user?.name}</p>
      <p className="mb-8">Email: {user?.email}</p>

      <h2 className="text-xl font-semibold mb-4">Your News</h2>
      <Link to="/create-news" className="mb-4 inline-block bg-green-600 text-white px-4 py-1 rounded">
        + Create New
      </Link>

      <div className="space-y-4">
        {newsList.map(news => (
          <div key={news._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{news.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{news.content.slice(0, 100)}...</p>
            <Link to={`/edit-news/${news._id}`} className="text-blue-500 mr-4">Edit</Link>
            <button onClick={() => handleDelete(news._id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
