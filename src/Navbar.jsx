import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loveConfig } from './config/loveConfig';

const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `px-3 py-2 rounded-full font-semibold text-xs md:text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-1 ${
      isActive 
        ? 'bg-[#c76b85] text-white shadow-lg shadow-pink-300/50' 
        : 'text-[#9e4a60] hover:bg-pink-100'
    }`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-pink-200 shadow-[0_4px_20px_rgba(200,130,150,0.1)] font-quicksand">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-[#a1445a] hover:scale-105 transition-transform duration-300">
          <span className="animate-pulse">💖</span>
          <span className="hidden sm:block">{loveConfig.girlfriendName}</span>
        </Link>

        <div className="flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide py-1">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/gallery" className={getLinkClass('/gallery')}>Gallery</Link>
          <Link to="/timeline" className={getLinkClass('/timeline')}>Our Story</Link>
          <Link to="/why-i-love-you" className={getLinkClass('/why-i-love-you')}>Why I Love You</Link>
          <Link to="/quiz" className={getLinkClass('/quiz')}>Love Quiz</Link>
          <Link to="/countdown" className={getLinkClass('/countdown')}>Countdown</Link>
          <Link to="/future" className={getLinkClass('/future')}>Our Future</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;