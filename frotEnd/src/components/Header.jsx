
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import logo from '../assets/dailyBangla_logo.png';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getLinkClass = (to) => {
    const isActive = location.pathname === to;
    return (
      'block px-3 py-2 rounded transition-colors duration-200 ' +
      (isActive
        ? 'text-red-500'
        : 'hover:text-red-500 text-gray-200')
    );
  };

  return (
    <header className="bg-gray-800 text-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="logo" className="h-10" />
        </Link>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-2 p-2 rounded hover:bg-[#78C841] focus:outline-none"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-2 items-center">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/news" className={getLinkClass('/news')}>News</Link>
          <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>
          {user ? (
            <>
              <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={getLinkClass('/login')}>Login</Link>
              <Link to="/register" className={getLinkClass('/register')}>Register</Link>
            </>
          )}
        </nav>
      </div>
      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-gray-800 px-4 pb-4 flex flex-col gap-1 animate-fade-in">
          <Link to="/" className={getLinkClass('/')} onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/news" className={getLinkClass('/news')} onClick={() => setMobileOpen(false)}>News</Link>
          <Link to="/contact" className={getLinkClass('/contact')} onClick={() => setMobileOpen(false)}>Contact</Link>
          {user ? (
            <>
              <Link to="/dashboard" className={getLinkClass('/dashboard')} onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="mt-1 px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={getLinkClass('/login')} onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" className={getLinkClass('/register')} onClick={() => setMobileOpen(false)}>Register</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
