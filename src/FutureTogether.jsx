import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveConfig } from './config/loveConfig';

const FutureTogether = () => {
  const [selectedDest, setSelectedDest] = useState(null);

  const destinations = loveConfig.destinations || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdeff2] to-[#f8e8ee] py-24 px-4 font-quicksand relative overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#fbc8d5] rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-[#a1445a] mb-4"
          >
            Our Future 🌎
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#c76b85] text-xl font-dancing"
          >
            All the places I want to see with you...
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedDest(dest)}
              className="relative h-64 rounded-3xl overflow-hidden cursor-pointer group shadow-lg"
            >
              {/* Image */}
              <img 
                src={dest.image} 
                alt={dest.country} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="text-3xl mb-2">{dest.flag}</div>
                <h3 className="text-white font-playfair text-2xl font-bold">{dest.country}</h3>
                <p className="text-white/70 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Tap to see our dream...
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Destination Message */}
      <AnimatePresence>
        {selectedDest && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedDest(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl"
            >
              <div className="h-48 relative">
                <img src={selectedDest.image} alt={selectedDest.country} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedDest(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80 transition"
                >
                  ✕
                </button>
              </div>
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">{selectedDest.flag}</div>
                <h3 className="font-playfair text-3xl font-bold text-[#a1445a] mb-4">{selectedDest.country}</h3>
                <p className="font-dancing text-2xl text-[#c76b85] leading-relaxed">
                  "{selectedDest.description}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FutureTogether;