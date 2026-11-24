import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { loveConfig } from './config/loveConfig';

const FinalForever = () => {
  const formatBirthday = new Date(loveConfig.birthday).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col items-center justify-center relative overflow-hidden font-quicksand px-4 py-24">
      
      {/* Moving Night Sky / Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            initial={{ opacity: 0.1, scale: Math.random() * 0.5 + 0.5 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2], 
              scale: [1, 1.2, 1],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: Math.random() * 4 + 4, 
              repeat: Infinity, 
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center flex flex-col items-center w-full max-w-4xl">
        
        {/* Animated Ring */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="text-6xl md:text-8xl mb-12 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]"
        >
          💍
        </motion.div>

        {/* Names */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-playfair text-4xl md:text-6xl font-bold mb-12"
        >
          <span className="text-white">{loveConfig.yourName}</span>
          <span className="text-[#c76b85] mx-4 animate-pulse">❤️</span>
          <span className="text-white">{loveConfig.girlfriendName}</span>
        </motion.h1>

        {/* Messages */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="text-xl md:text-3xl text-gray-300 font-light tracking-widest mb-6"
        >
          This isn't the end of our story.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 4 }}
          className="font-dancing text-3xl md:text-5xl text-[#ffb3c6] mb-16 drop-shadow-[0_0_15px_rgba(255,179,198,0.5)]"
        >
          It's the beginning of forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 6 }}
          className="flex flex-col items-center mb-24"
        >
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-4">
            Happy Birthday, My Love ❤️
          </h2>
          <div className="text-[#c76b85] font-semibold text-lg md:text-xl tracking-widest">
            {formatBirthday}
          </div>
        </motion.div>

        {/* Replay Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 8 }}
          className="flex flex-col items-center gap-6"
        >
          <Link 
            to="/"
            className="px-10 py-4 rounded-full border border-[#c76b85] text-[#c76b85] font-bold text-lg hover:bg-[#c76b85] hover:text-white transition-all duration-300"
          >
            Replay Our Story ↻
          </Link>
          
          <p className="text-gray-500 text-sm mt-12">
            Made with all my love ❤️
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default FinalForever;