import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveConfig } from './config/loveConfig';
import CelebrationEffect from './CelebrationEffect';
import a from "./assets/a.jpeg"; // Your photo

const ProposalScreen = () => {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  
  const containerRef = useRef(null);
  const noButtonRef = useRef(null);

  // The changing text for the NO button
  const noTexts = [
    "NO 😏",
    "Nope 😏",
    "Nice try 😂",
    "Are you sure? 🥺",
    "Really? 😭",
    "Okay... but I'm still asking ❤️"
  ];

  // Logic to move the NO button safely within the screen
  const moveNoButton = () => {
    if (saidYes || !containerRef.current || !noButtonRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = noButtonRef.current.getBoundingClientRect();

    // Calculate safe boundaries so the button doesn't go off-screen
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    // Generate random new position
    const newX = Math.random() * maxX - (maxX / 2); // Center around the middle
    const newY = Math.random() * maxY - (maxY / 2);

    setNoPosition({ x: newX, y: newY });
    
    // Increase count for the text change (max out at the last text)
    setNoCount((prev) => Math.min(prev + 1, noTexts.length - 1));
  };

  // Handle mobile taps (move before click registers)
  const handleNoTouch = (e) => {
    e.preventDefault();
    moveNoButton();
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-[#1a0b12] via-[#0d0508] to-black text-white flex flex-col items-center justify-center relative overflow-hidden font-quicksand px-4"
    >
      {/* 🚨 Celebration Effect Component */}
      <CelebrationEffect trigger={saidYes} />

      {/* Background Stars & Glowing Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            initial={{ opacity: 0.1, scale: Math.random() * 0.5 + 0.5 }}
            animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.2, 1] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      {/* Floating Hearts Background */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.4, 0] }}
          transition={{ duration: Math.random() * 6 + 6, repeat: Infinity, delay: Math.random() * 5 }}
          className="absolute text-2xl md:text-4xl pointer-events-none"
          style={{ left: `${Math.random() * 100}%` }}
        >
          ❤️
        </motion.div>
      ))}

      {/* ================= MAIN CONTENT ================= */}
      <AnimatePresence mode="wait">
        {!saidYes ? (
          <motion.div 
            key="proposal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="z-20 flex flex-col items-center text-center max-w-3xl"
          >
            {/* Optional Photo with glowing ring */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mb-8 relative"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#c76b85] shadow-[0_0_40px_rgba(199,107,133,0.5)]">
                <img src={a} alt="Us" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#c76b85] text-white p-2 rounded-full text-xl shadow-lg">
                💍
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] leading-tight"
            >
              Will you marry me, <br />
              <span className="font-dancing text-[#ffb3c6] text-6xl md:text-8xl drop-shadow-[0_0_30px_rgba(255,179,198,0.6)]">
                {loveConfig.girlfriendName}
              </span>?
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              className="text-6xl md:text-8xl mb-12 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]"
            >
              💍
            </motion.div>

            {/* BUTTONS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 w-full relative h-24"
            >
              {/* YES Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSaidYes(true)}
                className="z-30 px-12 py-5 rounded-full bg-gradient-to-r from-[#e88aa0] to-[#c76b85] text-white font-bold text-2xl shadow-[0_0_40px_rgba(232,138,160,0.6)] hover:shadow-[0_0_60px_rgba(232,138,160,1)] transition-all duration-300 border border-white/20"
              >
                YES ❤️
              </motion.button>

              {/* NO Button (Playful) */}
              <motion.button
                ref={noButtonRef}
                animate={{ x: noPosition.x, y: noPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={moveNoButton}
                onTouchStart={handleNoTouch}
                onClick={moveNoButton} // Fallback for click
                className="z-20 px-8 py-4 rounded-full bg-transparent border-2 border-gray-600 text-gray-400 font-semibold text-lg hover:bg-white/5 transition-colors cursor-not-allowed select-none"
                style={{ position: 'relative' }}
              >
                {noTexts[noCount]}
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          // ================= YES CELEBRATION SCREEN =================
          <motion.div 
            key="celebration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="z-20 flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl md:text-[150px] mb-8 drop-shadow-[0_0_50px_rgba(255,107,133,0.8)]"
            >
              ❤️
            </motion.div>
            
            <h1 className="font-playfair text-5xl md:text-8xl font-bold text-[#ffb3c6] mb-6 drop-shadow-[0_0_30px_rgba(255,179,198,0.8)] animate-pulse">
              SHE SAID YES!!!
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-dancing text-3xl md:text-5xl text-white mb-4"
            >
              I can't believe it... 🥹
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-xl md:text-2xl text-gray-300 font-light tracking-widest mt-8"
            >
              Here's to forever. ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProposalScreen;