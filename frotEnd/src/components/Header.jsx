import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import logo from '../assets/dailyBangla_logo.png'; // Adjust the path as necessary

const Header = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="" >
          <img src={logo} alt="logo" className="h-10" />
        </Link>

        <nav className="flex gap-4 items-center">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <Link to="/news" className="hover:text-red-400">News</Link>
          <Link to="/contact" className="hover:text-red-400">Contact</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-red-400">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-400">Login</Link>
              <Link to="/register" className="hover:text-red-400">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
