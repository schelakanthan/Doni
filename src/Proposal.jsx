import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveConfig } from './config/loveConfig';
import { Link } from 'react-router-dom';

const Proposal = () => {
  const [answered, setAnswered] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-quicksand px-4">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b12] to-black pointer-events-none"></div>

      {/* Floating Hearts (Cinematic) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.5, 0] }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5 }}
          className="absolute text-3xl"
        >
          ❤️
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div 
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="z-10 text-center max-w-2xl mx-auto"
          >
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Will you marry me, {loveConfig.girlfriendName}?
            </h1>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
              <button
                onClick={() => setAnswered(true)}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-[#e88aa0] to-[#c76b85] text-white font-bold text-xl shadow-[0_0_30px_rgba(232,138,160,0.6)] hover:scale-110 transition-all duration-300"
              >
                Yes, forever 💍
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="answer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="z-10 text-center"
          >
            <div className="text-7xl md:text-9xl mb-6 animate-bounce">💍💖✨</div>
            <h1 className="font-dancing text-5xl md:text-7xl text-[#ffb3c6] mb-4 drop-shadow-[0_0_20px_rgba(255,179,198,0.8)]">
              She said Yes!
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-12">
              I love you more than anything, {loveConfig.girlfriendName}.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 rounded-full border border-[#ffb3c6] text-[#ffb3c6] hover:bg-[#ffb3c6] hover:text-black font-semibold transition-all duration-300"
            >
              Back to the beginning
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Proposal;