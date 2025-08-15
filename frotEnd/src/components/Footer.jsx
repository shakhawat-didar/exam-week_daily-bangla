// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white text-center py-4 mt-8">
      <p className="text-sm">&copy; {new Date().getFullYear()} Daily Bangla. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
