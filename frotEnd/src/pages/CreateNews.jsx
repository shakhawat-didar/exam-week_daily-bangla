import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateNews = () => {
  const [form, setForm] = useState({ title: '', content: '', image: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/news', form);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Create News</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange}
          className="w-full p-2 border rounded" placeholder="Title" required />
        <input name="image" value={form.image} onChange={handleChange}
          className="w-full p-2 border rounded" placeholder="Image URL" />
        <textarea name="content" value={form.content} onChange={handleChange}
          className="w-full p-2 border rounded h-40" placeholder="Content" required />
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
