import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from '../contexts/AuthContext'; // Import AuthContext

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { currentUser, logout } = useAuth(); // Get user data from context
  
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    logout();
    alert('Logged out successfully');
  };

  const adminNavItems = [
    { id: 1, text: 'Home', path: '/' },
    { id: 2, text: 'Stages', path: '/stages' },
    { id: 3, text: 'About', path: '/about' },
  ];

  const candidateNavItems = [
    { id: 1, text: 'Home', path: '/' },
    { id: 2, text: 'Jobs', path: '/jobs' },
    { id: 3, text: 'Status', path: '/status' },
  ];

  // Ensure correct navbar is displayed based on user role
  const navItems = currentUser?.role === 'Admin' ? adminNavItems : candidateNavItems;

  return (
    <div className='bg-black flex justify-between items-center h-24 max-w-screen mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>YLOGX</h1>

      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li key={item.id} className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>
            <Link to={item.path}>{item.text}</Link>
          </li>
        ))}

        <li className='p-4 m-2 cursor-pointer duration-300'>
          {currentUser ? (
            <button onClick={handleLogout}>
              <FaSignOutAlt size={22} className="text-[#00df9a]" />
            </button>
          ) : (
            <Link to="/login">
              <FaUser size={22} className="text-[#00df9a]" />
            </Link>
          )}
        </li>
      </ul>

      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile menu */}
      <ul className={`${nav ? 'fixed' : 'hidden'} md:hidden left-0 top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] ease-in-out duration-500`}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>

        {navItems.map(item => (
          <li key={item.id} className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'>
            <Link to={item.path}>{item.text}</Link>
          </li>
        ))}

        <li className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'>
          {currentUser ? (
            <button onClick={handleLogout}>
              <FaSignOutAlt size={22} className="text-[#00df9a]" />
            </button>
          ) : (
            <Link to="/login">
              <FaUser size={22} className="text-[#00df9a]" />
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
