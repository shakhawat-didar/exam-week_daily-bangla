import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditNews = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '', image: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const res = await api.get(`/news/${id}`);
      setForm({ title: res.data.title, content: res.data.content, image: res.data.image });
    };
    fetchNews();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/news/${id}`, form);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Edit News</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange}
          className="w-full p-2 border rounded" placeholder="Title" required />
        <input name="image" value={form.image} onChange={handleChange}
          className="w-full p-2 border rounded" placeholder="Image URL" />
        <textarea name="content" value={form.content} onChange={handleChange}
          className="w-full p-2 border rounded h-40" placeholder="Content" required />
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditNews;
