import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // 🚨 Required for the button
import { loveConfig } from './config/loveConfig';
import CelebrationEffect from './CelebrationEffect';
import a from "./assets/a.jpeg"; 

const ProposalTransition = () => {
  const [stage, setStage] = useState(0);
  const [saidYes, setSaidYes] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  // The cinematic sequence messages
  const messages = [
    { text: "I've been thinking about something...", delay: 3000 },
    { text: "About our future...", delay: 3000 },
    { text: "About all the moments we haven't lived yet...", delay: 3500 },
    { text: "About growing old together...", delay: 3500 },
    { text: "And there is one person I want beside me through all of it.", delay: 4000 },
    { text: loveConfig.girlfriendName, delay: 3000, isName: true },
    { text: "The answer has always been you.", delay: 4000 },
    { text: "❤️ I have one question for you...", delay: 3500, isFinal: true },
  ];

  // Logic to automatically play the messages and move to the Proposal stage
  useEffect(() => {
    if (stage < messages.length) {
      const timer = setTimeout(() => {
        setStage(stage + 1);
      }, messages[stage].delay);
      return () => clearTimeout(timer);
    } else if (stage === messages.length) {
      // Wait 1.5 seconds after the last message, then show the proposal
      const timer = setTimeout(() => {
        setStage(messages.length + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [stage, messages.length]);

  // Playful NO button texts
  const noTexts = [
    "NO 😏",
    "Nope 😏",
    "Nice try 😂",
    "Are you sure? 🥺",
    "Really? 😭",
    "Okay... but I'm still asking ❤️"
  ];

  // Logic to move the NO button safely
  const moveNoButton = () => {
    if (saidYes) return;
    const maxX = window.innerWidth / 2 - 100;
    const maxY = window.innerHeight / 2 - 100;
    setNoPosition({ x: Math.random() * maxX - (maxX / 2), y: Math.random() * maxY - (maxY / 2) });
    setNoCount((prev) => Math.min(prev + 1, noTexts.length - 1));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-playfair px-4">
      
      {/* Celebration Effect (Triggers when she clicks YES) */}
      <CelebrationEffect trigger={saidYes} />

      {/* Cinematic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none z-10"></div>
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4a1525_0%,_#000000_70%)]"
      />

      <div className="z-20 w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        
        {/* ================= STAGE 1: CINEMATIC MESSAGES ================= */}
        {stage <= messages.length && (
          <AnimatePresence mode="wait">
            {stage > 0 && (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full text-center"
              >
                {messages[stage - 1].isName ? (
                  <h1 className="text-6xl md:text-8xl font-dancing text-[#ffb3c6] drop-shadow-[0_0_30px_rgba(255,179,198,0.6)]">
                    {messages[stage - 1].text}
                  </h1>
                ) : messages[stage - 1].isFinal ? (
                  <motion.h2 
                    animate={{ textShadow: ["0px 0px 10px rgba(255,255,255,0.2)", "0px 0px 30px rgba(255,255,255,0.6)", "0px 0px 10px rgba(255,255,255,0.2)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl md:text-5xl font-semibold text-white leading-tight"
                  >
                    {messages[stage - 1].text}
                  </motion.h2>
                ) : (
                  <h2 className="text-2xl md:text-4xl text-gray-300 font-light tracking-wide leading-relaxed">
                    {messages[stage - 1].text}
                  </h2>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* ================= STAGE 2: THE PROPOSAL ================= */}
        {stage > messages.length && !saidYes && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            className="flex flex-col items-center text-center w-full"
          >
            <div className="mb-8 relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#c76b85] shadow-[0_0_40px_rgba(199,107,133,0.5)]">
                <img src={a} alt="Us" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#c76b85] text-white p-2 rounded-full text-xl shadow-lg">
                💍
              </div>
            </div>

            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] leading-tight">
              Will you marry me, <br />
              <span className="font-dancing text-[#ffb3c6] text-6xl md:text-8xl drop-shadow-[0_0_30px_rgba(255,179,198,0.6)]">
                {loveConfig.girlfriendName}
              </span>?
            </h1>

            <div className="text-6xl md:text-8xl mb-12 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
              💍
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full relative h-24">
              {/* YES Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSaidYes(true)}
                className="z-30 px-12 py-5 rounded-full bg-gradient-to-r from-[#e88aa0] to-[#c76b85] text-white font-bold text-2xl shadow-[0_0_40px_rgba(232,138,160,0.6)] hover:shadow-[0_0_60px_rgba(232,138,160,1)] transition-all duration-300 border border-white/20"
              >
                YES ❤️
              </motion.button>

              {/* Playful NO Button */}
              <motion.button
                animate={{ x: noPosition.x, y: noPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={moveNoButton}
                className="z-20 px-8 py-4 rounded-full bg-transparent border-2 border-gray-600 text-gray-400 font-semibold text-lg hover:bg-white/5 transition-colors cursor-not-allowed select-none"
              >
                {noTexts[noCount]}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ================= STAGE 3: SHE SAID YES ================= */}
        {saidYes && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="flex flex-col items-center text-center"
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

            {/* 🚨 BUTTON TO GIFT ROOM 🚨 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5 }}
              className="mt-12"
            >
              <Link
                to="/gift-room"
                className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#e88aa0] to-[#c76b85] text-white font-bold text-xl shadow-[0_0_30px_rgba(232,138,160,0.6)] hover:scale-105 transition-all duration-300"
              >
                Claim Your Gift 🎁
              </Link>
            </motion.div>

          </motion.div>
        )}

      </div>
    </div>
  );
};

export default ProposalTransition;