import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loveConfig } from './config/loveConfig';

// Array of cute emojis to cycle through for the cards
const cardEmojis = ['❤️', '😂', '🥰', '✨', '🤗', '💖', '🌸', '💫', '🫶', '🌹'];

const FlipCard = ({ reason, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of the card */}
        <div 
          className="absolute w-full h-full backface-hidden bg-white/80 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center justify-center border-2 border-[#f3cdd8] shadow-[0_10px_30px_-10px_rgba(200,130,150,0.3)] hover:shadow-[0_15px_40px_-10px_rgba(200,130,150,0.5)] transition-shadow"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-6xl mb-4 animate-bounce">
            {cardEmojis[index % cardEmojis.length]}
          </div>
          <h3 className="font-playfair text-2xl font-bold text-[#a1445a] text-center mb-2">
            {reason.title}
          </h3>
          <p className="text-[#c76b85] text-sm font-semibold animate-pulse">
            Tap to discover...
          </p>
        </div>

        {/* Back of the card */}
        <div 
          className="absolute w-full h-full backface-hidden bg-gradient-to-br from-[#fde3ea] to-[#f9c5d1] rounded-3xl p-6 flex flex-col items-center justify-center border-2 border-white shadow-xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-4xl mb-3">💌</div>
          <p className="font-dancing text-xl md:text-2xl text-[#7a4b5a] text-center font-bold leading-relaxed">
            "{reason.message}"
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const WhyILoveYou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdeff2] to-[#f8e8ee] py-24 px-4 font-quicksand relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#fbc8d5] rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#e8d5f2] rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-[#a1445a] mb-4"
          >
            Do you know why I love you?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#c76b85] text-xl font-dancing"
          >
            There are a million reasons, but here are a few...
          </motion.p>
        </div>

        {/* Grid of Flip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {loveConfig.reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FlipCard reason={reason} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyILoveYou;