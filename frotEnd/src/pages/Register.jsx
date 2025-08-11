import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      alert('Register failed');
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-600">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange}
          className="w-full p-2 border rounded" placeholder="Name" required />
        <input type="email" name="email" value={form.email} onChange={handleChange}
          className="w-full p-2 border rounded" placeholder="Email" required />
        <input type="password" name="password" value={form.password} onChange={handleChange}
          className="w-full p-2 border rounded" placeholder="Password" required />
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
