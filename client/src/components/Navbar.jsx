// import React from 'react'
// import { Link } from 'react-router-dom'
// function Navbar() {
//   return (
//   <>
//   <div className='w-full bg-black '>
//     <div className=' max-container flex items-center justify-between py-2.5'>
//     <Link to='/' className='text-2xl font-semibold  text-white'>
//     <span className='text-2xl font-Poppins  text-purple-600'>Eco</span>
//     <span className='text-white font-Poppins'>mart</span>

//     </Link> 
    

//     </div>
//   </div>
  
  
//   </>
//   )
// }

// export default Navbar

import React, { useEffect, useState } from 'react';
import { toggleSearchModel } from '../features/toggleSlice';
import { 
  Menu, X, Search, ShoppingBag, Heart, 
  LayoutList, Youtube, Github, Linkedin, Facebook 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const {items} = useSelector(state=>state.cart);
// console.log(items?.length)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'Offers', path: '/offers' },
  ];

  return (
    <nav className="w-full bg-white/70 border-b border-slate-200 sticky left-0 top-0 z-40 backdrop-blur-md ">
      <div className="max-container mx-auto px-4  flex items-center justify-between gap-4 py-3">
        
        {/* LEFT: Mobile Menu Toggle & Logo */}
        <div className="flex items-center gap-4 md:w-1/3">
          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
          
          <a href="/" className="group">
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
              Eco<span className="text-orange-600 group-hover:text-slate-900 transition-colors">MART</span>
            </h1>
          </a>
        </div>

        {/* CENTER: Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-4 md:w-1/3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors group"
            >
              {link.name}
              <span className={  `${location.pathname === link.path ? "absolute -bottom-1 left-0 w-full h-0.5 bg-orange-600" : "absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"}`}></span>
            </Link>
          ))}
        </div>

        {/* RIGHT: Actions (Search, Cart, User) */}
        <div className="flex items-center justify-end gap-1 md:gap-2 md:w-1/3">
          <button 
          onClick={()=>dispatch(toggleSearchModel())}
          className="p-2 text-slate-600 hover:text-orange-600 transition-colors">
            <Search size={20} />
          </button>
          
          <ActionIcon icon={<Heart size={20} />} count={2} href="/wishlist" />
          <ActionIcon icon={<ShoppingBag size={20} />} count={items?.length} href="/cart" />
          
          {/* User Profile Placeholder */}
          <Link to={"/profile"} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </Link>
        </div>
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Sidebar Content */}
          <div className="relative w-80 bg-slate-950 h-screen p-8 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-10">
              <span className="text-xl font-bold text-white tracking-tight">NAVIGATION</span>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6 mb-auto">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.path} 
                  className="text-lg font-medium text-slate-300 hover:text-orange-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Social Icons at Bottom */}
            <div className="flex gap-4 pt-6 border-t border-slate-800">
              <SocialIcon icon={<Youtube size={18} />} />
              <SocialIcon icon={<Github size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Sub-components for cleaner code ---

const ActionIcon = ({ icon, count, href }) => (

  <a href={href} className="relative p-2 text-slate-600 hover:text-orange-600 transition-colors">
    {icon}
    {count > 0 && (
      <span className="absolute top-1 right-1 bg-orange-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
        {count}
      </span>
    )}
  </a>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="p-2 text-slate-400 border border-slate-800 rounded-full hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all">
    {icon}
  </a>
);

export default Navbar;