import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiMenu,
  FiX
} from 'react-icons/fi';
import { GiChefToque } from 'react-icons/gi';
import {
    FiPlusCircle,
    FiList,
    FiPackage,FiTruck, FiCheckCircle, FiClock,
} from 'react-icons/fi';


const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { name: 'Add Items', href: '/', icon: <FiPlusCircle /> },
    { name: 'List Items', href: '/list', icon: <FiList /> },
    { name: 'Orders', href: '/orders', icon: <FiPackage /> },
];

  
  return (
    <nav className='bg-[#2D1B0E] border-b-8 border-amber-900/40 shadow-lg sticky top-0 z-50 font-vibes'>
      <div className='max-w-7xl mx-auto px-4 flex justify-between items-center h-20'>
        <div className='flex items-center space-x-3'>
          <GiChefToque className='text-4xl text-rose-500' />
          <span className='text-2xl font-bold text-amber-100 tracking-wide'>Admin Panel</span>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='text-amber-200 text-2xl lg:hidden'
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className='hidden lg:flex items-center space-x-4'>
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all bg-amber-900/30 border-amber-500 text-amber-300
                `
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className='lg:hidden flex flex-col space-y-3 mt-4 pb-4'>
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all bg-amber-900/30 border-amber-500 text-amber-300
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
