import DarkModeToggle from './DarkMode';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);

    window.location.href = '/';
  };


  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Brand</div>
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
            Home
          </a>
          {user ? (
            <>
              <a href="/account" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
                Account
              </a>
              <img className="h-10 w-10 rounded-full" src={user.profile_picture || 'https://placehold.co/600x400'} alt="avatar" />
              <button onClick={logout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
                Logout
              </button>
              {
                user.role === 'owner' ? (
                  <a href="/restaurants/me" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
                    Restaurants
                  </a>
                ) : null}
            </>

          ) : (
            <a href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
              Login
            </a>
          )}
          <DarkModeToggle />
        </div>
        <button onClick={toggleMenu} className="md:hidden text-gray-300 focus:outline-none">
          {isOpen ? '✖' : '☰'}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <a href="/" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
            Home
          </a>
          {user ? (
            <a href="/account" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
              Account
            </a>
          ) : (
            <a href="/login" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
              Login
            </a>
          )}
          <div className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded" >
            <DarkModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  user: PropTypes.shape({
    profile_picture: PropTypes.string,
    role: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
};

export default Navbar;
