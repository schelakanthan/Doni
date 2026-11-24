import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveConfig } from './config/loveConfig';

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Flatten all photos from all locations into one single array
  const allPhotos = loveConfig.gallery?.flatMap((location) => location.photos) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdeff2] to-[#f8e8ee] py-24 px-4 font-quicksand relative overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fbc8d5] rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#e8d5f2] rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-[#a1445a] mb-4"
          >
            Our Memories 📸
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#c76b85] text-xl font-dancing"
          >
            Every moment captured with you...
          </motion.p>
        </div>

        {/* ONE Single Grid for all photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {allPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer ${
                // Make some random images span 2 rows or columns for a cool masonry effect
                index % 6 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <img 
                src={photo} 
                alt="Our Memory" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Our+Memory"; }}
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-4xl drop-shadow-lg">🔍</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Full Screen Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedPhoto} 
              alt="Memory" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/40 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;