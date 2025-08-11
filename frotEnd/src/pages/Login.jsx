import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useUserStore } from '../store/userStore';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser, setToken } = useUserStore();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      setToken(res.data.token);
      setUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-600">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" value={form.email} onChange={handleChange}
          className="w-full p-2 border rounded" placeholder="Email" required />
        <input type="password" name="password" value={form.password} onChange={handleChange}
          className="w-full p-2 border rounded" placeholder="Password" required />
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
