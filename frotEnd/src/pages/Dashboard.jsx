// pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { deleteNews } from '../services/newsService';
import { getUserNews, updateUserProfile } from '../services/userService';

const Dashboard = () => {
  const { user, token, setUser } = useUserStore();
  const [userNews, setUserNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Profile management states
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (token) {
      loadUserNews();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const loadUserNews = async () => {
    try {
      setLoading(true);
      const response = await getUserNews();
      setUserNews(response.data.data || response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load your news');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        await deleteNews(id);
        await loadUserNews(); // Reload the list
          } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete news');
    }
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    
    try {
      const response = await updateUserProfile(profileForm);
      setUser(response.data);
      setShowProfileForm(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="p-8 text-center">
        <p>Please login to access your dashboard</p>
        <Link to="/login" className="text-red-600 hover:underline">Login here</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* User Profile Section */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-red-600">User Profile</h2>
            <button
              onClick={() => setShowProfileForm(!showProfileForm)}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              {showProfileForm ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {showProfileForm ? (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {profileLoading ? 'Updating...' : 'Update Profile'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowProfileForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>
          )}
        </div>
      </div>

      {/* News Management Section */}
      <div className="mb-8">
        <Link 
          to="/create-news" 
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Create New News
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-red-600">Your News</h2>
        </div>
        
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : userNews.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {userNews.map(news => (
              <div key={news._id} className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{news.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(news.createdAt).toLocaleDateString()} • {news.views || 0} views
                  </p>
                  {news.category && (
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mt-2">
                      {news.category}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Link 
                    to={`/edit-news/${news._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteNews(news._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            You haven't created any news yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
