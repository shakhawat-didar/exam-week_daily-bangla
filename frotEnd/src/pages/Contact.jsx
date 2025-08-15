// pages/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add API call to send contact form
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded" 
          placeholder="Your Name" 
          required
        />
        <input 
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded" 
          placeholder="Your Email" 
          required
        />
        <textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded h-32" 
          placeholder="Message" 
          required
        />
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
