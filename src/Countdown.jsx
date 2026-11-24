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
    const targetDate = new Date(loveConfig.birthday).getTime(); 
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
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

  // 🚨 MANUAL UNLOCK BUTTON (For you to test)
  const handleEnter = () => {
    unlockWebsite();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0d0508] text-white flex flex-col items-center justify-center relative overflow-hidden font-quicksand px-4">
      <CelebrationEffect trigger={isBirthday} />

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4a1525_0%,_#000000_80%)] opacity-80 pointer-events-none" />

      <div className="z-10 text-center flex flex-col items-center w-full max-w-3xl">
        
        <h1 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-8">
          Counting down to your special day...
        </h1>

        {!isBirthday ? (
          <div className="flex gap-3 md:gap-6 mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 flex flex-col items-center min-w-[80px] md:min-w-[110px]">
                <span className="font-bold text-3xl md:text-5xl text-[#ffb3c6] animate-pulse">{value}</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-300 mt-2">{unit}</span>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-[#ffb3c6] drop-shadow-[0_0_30px_rgba(255,179,198,0.8)] mb-4">
              🎉 HAPPY BIRTHDAY! 🎉
            </h2>
            <p className="text-xl md:text-2xl text-gray-300">Today is all about you ❤️</p>
          </motion.div>
        )}

        {/* 🚨 EMERGENCY / TESTING BUTTON */}
       {/* ' <button 
          onClick={handleEnter}
          className="mt-8 px-8 py-3 rounded-full bg-white/10 border border-white/30 text-white font-bold hover:bg-white/20 transition-all z-50"
        >
          Enter The Website 🎁
        </button>' */}

      </div>
    </div>
  );
};

export default Countdown;