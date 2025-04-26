import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import { FaUserCircle } from 'react-icons/fa';
import logo from '../../public/logo.jpg'

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-[#C0399F] text-white p-4 shadow-lg font-['Roboto',_sans-serif]">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <img src={logo} alt="NutriDietMitra Logo" className="h-8 mr-2" />
          {/* NutriDietMitra */}
        </Link>
        <nav className="flex space-x-4 items-center">
          <Link to="/" className="hover:text-[#27AE60] transition">Home</Link>
          <Link to="/booking" className="hover:text-[#27AE60] transition">Booking</Link>
          <Link to="/ecommerce" className="hover:text-[#27AE60] transition">Plans</Link>
          <Link to="/about" className="hover:text-[#27AE60] transition">About</Link>
          <Link to="/contact" className="hover:text-[#27AE60] transition">Contact</Link>
          <Link to="/blog" className="hover:text-[#27AE60] transition">Blog</Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2 hover:text-[#27AE60] transition">
                <FaUserCircle className="text-xl" />
                <span>{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="hover:text-[#27AE60] transition">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#27AE60] transition">Login</Link>
              <Link to="/signup" className="hover:text-[#27AE60] transition">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;