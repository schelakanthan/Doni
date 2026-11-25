import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loveConfig } from './config/loveConfig';
import { useProgress } from './context/ProgressContext';
import CelebrationEffect from './CelebrationEffect';

const Countdown = () => {
  const navigate = useNavigate();
  const { unlockWebsite } = useProgress();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    // 🚨 FIX: Use Local Timezone instead of UTC
    // Parse the "YYYY-MM-DD" string from config into numbers
    const [year, month, day] = loveConfig.birthday.split('-').map(Number);
    
    // Create a date in the user's local timezone (Month is -1 because JS months are 0-indexed)
    // This sets it to Midnight (00:00:00) on her birthday
    const targetDate = new Date(year, month - 1, day, 0, 0, 0).getTime(); 

    /* 
    🧪 TO TEST WITH 9 MINUTES, REPLACE THE ABOVE LINE WITH THIS:
    const targetDate = new Date().getTime() + (9 * 60 * 1000);
    */

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsBirthday(true);
        unlockWebsite(); // 🚨 Unlock the whole website
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [unlockWebsite]);

  // Emergency bypass button for you to test the site
  const handleEnter = () => {
    unlockWebsite();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0d0508] text-white flex flex-col items-center justify-center relative overflow-hidden font-quicksand px-4">
      
      <CelebrationEffect trigger={isBirthday} />

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4a1525_0%,_#000000_80%)] opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

      <div className="z-10 text-center flex flex-col items-center w-full max-w-3xl">
        
        {!isBirthday ? (
          <>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-playfair text-3xl md:text-5xl font-bold text-white mb-12 text-center"
            >
              Counting down to your special day...
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16"
            >
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-8 flex flex-col items-center min-w-[80px] md:min-w-[120px] shadow-[0_0_30px_rgba(199,107,133,0.1)]">
                  <span className="font-bold text-4xl md:text-6xl text-[#ffb3c6] animate-pulse drop-shadow-[0_0_10px_rgba(255,179,198,0.5)]">
                    {value}
                  </span>
                  <span className="text-xs md:text-sm uppercase tracking-widest text-gray-400 mt-2">
                    {unit}
                  </span>
                </div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 flex flex-col items-center"
          >
            <div className="text-7xl mb-6 animate-bounce">🎂</div>
            <h2 className="font-playfair text-5xl md:text-7xl font-bold text-[#ffb3c6] drop-shadow-[0_0_40px_rgba(255,179,198,0.8)] mb-6 text-center">
              🎉 HAPPY BIRTHDAY! 🎉
            </h2>
            <p className="text-2xl md:text-3xl text-gray-200 font-dancing">
              Today is all about you ❤️
            </p>
          </motion.div>
        )}

        {/* Emergency / Testing Button */}
        <button 
          onClick={handleEnter}
          className="mt-8 px-10 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 hover:scale-105 transition-all z-50 backdrop-blur-md"
        >
          {isBirthday ? "Enter The Website 🎁" : "Skip Countdown (Test) ⏭️"}
        </button>

      </div>
    </div>
  );
};

export default Countdown;