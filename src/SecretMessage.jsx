import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // 🚨 ADDED THIS IMPORT
import confetti from 'canvas-confetti';
import { loveConfig } from './config/loveConfig';

const SecretMessage = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Default code is "1126". You can change this in loveConfig.ts
  const secretCode = loveConfig.secretCode || "1126"; 
  const letterText = loveConfig.loveLetter || "My love,\n\nToday isn't only about celebrating your birthday...\n\nI love you. ❤️\n\nForever yours,\n" + loveConfig.yourName;

  const handleKeypadClick = (num) => {
    if (code.length < 4) {
      const newCode = code + num;
      setCode(newCode);
      setError(false);

      // If 4 digits are entered, check the code
      if (newCode.length === 4) {
        setTimeout(() => {
          if (newCode === secretCode) {
            setIsUnlocked(true);
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#f9c5d1', '#c76b85', '#ffffff']
            });
          } else {
            setError(true);
            setCode(""); // Reset code on wrong entry
          }
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setCode(code.slice(0, -1));
    setError(false);
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    // Small pop of confetti when opened
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#f9c5d1', '#ffffff']
    });
  };

  // Format the text to render line breaks correctly
  const formattedLetter = letterText.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdeff2] to-[#f8e8ee] flex flex-col items-center justify-center relative overflow-hidden font-quicksand px-4 py-24">
      
      {/* Decorative Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#f9c5d1] rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#e8d5f2] rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          
          {/* ================= STAGE 1: SECRET CODE ================= */}
          {!isUnlocked && (
            <motion.div
              key="code-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/60 text-center w-full max-w-md"
            >
              <div className="text-4xl mb-4">🔒</div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#a1445a] mb-2">
                Enter our secret number...
              </h1>
              <p className="text-[#c76b85] font-dancing text-xl mb-8">
                Hint: A very special date (MMDD)
              </p>

              {/* Code Dots */}
              <div className="flex justify-center gap-4 mb-8">
                {[0, 1, 2, 3].map((index) => (
                  <div 
                    key={index}
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      code.length > index 
                        ? 'bg-[#c76b85] border-[#c76b85]' 
                        : 'border-[#f3cdd8]'
                    } ${error ? 'border-red-400 bg-red-100' : ''}`}
                  />
                ))}
              </div>

              {/* Error Message */}
              <div className="h-6 mb-2">
                {error && <p className="text-red-500 font-semibold text-sm">Try again 😏</p>}
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeypadClick(num.toString())}
                    className="bg-white border border-[#f3cdd8] text-[#a1445a] text-2xl font-bold py-4 rounded-2xl shadow-sm hover:bg-[#fff0f5] active:scale-95 transition-all"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handleDelete}
                  className="bg-[#fde3ea] border border-[#f3cdd8] text-[#c76b85] text-xl font-bold py-4 rounded-2xl shadow-sm hover:bg-[#f9c5d1] active:scale-95 transition-all"
                >
                  ⌫
                </button>
                <button
                  onClick={() => handleKeypadClick("0")}
                  className="bg-white border border-[#f3cdd8] text-[#a1445a] text-2xl font-bold py-4 rounded-2xl shadow-sm hover:bg-[#fff0f5] active:scale-95 transition-all"
                >
                  0
                </button>
                <div></div> {/* Empty space for grid alignment */}
              </div>
            </motion.div>
          )}

          {/* ================= STAGE 2: THE ENVELOPE ================= */}
          {isUnlocked && !isEnvelopeOpen && (
            <motion.div
              key="envelope-screen"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="flex flex-col items-center text-center"
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#a1445a] mb-4">
                How could you forget? ❤️
              </h2>
              <p className="text-[#c76b85] text-xl font-dancing mb-12">
                There is still one more secret...
              </p>

              {/* Envelope Visual */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-64 h-44 md:w-80 md:h-56 bg-[#fbc8d5] rounded-lg shadow-2xl border-2 border-white/60 flex items-center justify-center cursor-pointer overflow-hidden group hover:scale-105 transition-transform"
                onClick={handleOpenEnvelope}
              >
                {/* Envelope Flaps (CSS styling) */}
                <div className="absolute top-0 w-full h-full border-t-[120px] border-t-[#f9c5d1] border-x-[130px] md:border-x-[160px] border-x-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 w-full h-1/2 bg-[#f4a6b8] rounded-b-lg z-10"></div>
                
                {/* Wax Seal */}
                <div className="absolute z-20 w-12 h-12 bg-[#c76b85] rounded-full flex items-center justify-center text-white text-xl shadow-lg border-2 border-white/30 group-hover:scale-110 transition-transform">
                  💌
                </div>
              </motion.div>

              <button
                onClick={handleOpenEnvelope}
                className="mt-12 px-10 py-4 rounded-full bg-gradient-to-r from-[#e88aa0] to-[#c76b85] text-white font-bold text-xl shadow-[0_10px_30px_-8px_#b15b73] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Open My Letter 💌
              </button>
            </motion.div>
          )}

          {/* ================= STAGE 3: THE LETTER ================= */}
          {isEnvelopeOpen && (
            <motion.div
              key="letter-screen"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
              className="bg-[#fffaf0] p-8 md:p-14 rounded-lg shadow-[0_20px_50px_rgba(180,120,140,0.3)] w-full max-w-2xl relative"
              style={{ 
                backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
              }}
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 text-[#d9a5b5] opacity-50 text-2xl">❦</div>
              <div className="absolute top-4 right-4 text-[#d9a5b5] opacity-50 text-2xl">❦</div>
              <div className="absolute bottom-4 left-4 text-[#d9a5b5] opacity-50 text-2xl">❦</div>
              <div className="absolute bottom-4 right-4 text-[#d9a5b5] opacity-50 text-2xl">❦</div>

              {/* The actual letter text */}
              <div className="font-dancing text-2xl md:text-3xl text-[#4a1525] leading-relaxed text-left whitespace-pre-wrap">
                {formattedLetter}
              </div>

              {/* Bottom element */}
              <div className="mt-8 text-center text-4xl animate-pulse">
                ❤️
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* 🚨 MOVED THE FINAL BUTTON OUTSIDE ANIMATEPRESENCE 🚨 */}
        {isEnvelopeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="mt-12"
          >
            <Link
              to="/final"
              className="inline-block px-10 py-4 rounded-full bg-[#c76b85] text-white font-bold text-lg shadow-[0_10px_30px_-8px_#b15b73] hover:scale-105 hover:bg-[#b15b73] transition-all duration-300"
            >
              One last thing... ✨
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default SecretMessage;