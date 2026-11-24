import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveConfig } from './config/loveConfig';

const Timeline = () => {
  const [expandedId, setExpandedId] = useState(null);

  // Default timeline data (can be moved to loveConfig.ts later if you want)
  const timelineData = loveConfig.timeline || [
    {
      id: 1,
      title: "The Beginning",
      date: "January 2023",
      description: "The universe conspired to bring us together. The day my life changed forever.",
      image: "/images/memory1.jpg",
      location: "Where it all started"
    },
    {
      id: 2,
      title: "First Conversation",
      date: "February 2023",
      description: "We talked for hours and hours. I knew right then that you were special.",
      image: "/images/memory2.jpg",
      location: "On the phone"
    },
    {
      id: 3,
      title: "First Meeting",
      date: "March 2023",
      description: "Seeing you in person for the first time took my breath away. You were even more beautiful than I imagined.",
      image: "/images/memory3.jpg",
      location: "The Coffee Shop"
    },
    {
      id: 4,
      title: "First Date",
      date: "April 2023",
      description: "I was so nervous, but you made everything feel so easy and natural. The best night ever.",
      image: "/images/memory1.jpg",
      location: "Downtown"
    },
    {
      id: 5,
      title: "Favorite Memory",
      date: "Summer 2023",
      description: "Watching the sunset together, holding your hand, and realizing I want to do this forever.",
      image: "/images/memory2.jpg",
      location: "The Beach"
    },
    {
      id: 6,
      title: "Funniest Moment",
      date: "Fall 2023",
      description: "When we got lost and ended up laughing uncontrollably. You always make everything fun.",
      image: "/images/memory3.jpg",
      location: "Somewhere off the map"
    },
    {
      id: 7,
      title: "Hard Times We Overcame",
      date: "Winter 2023",
      description: "We faced challenges, but our love only grew stronger. I'm so glad we held on to each other.",
      image: "/images/memory1.jpg",
      location: "Together"
    },
    {
      id: 8,
      title: "Today",
      date: "Present",
      description: "Still falling more in love with you every single day. Happy Birthday, my love.",
      image: "/images/memory2.jpg",
      location: "Right here, with you"
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdeff2] to-[#f8e8ee] py-24 px-4 font-quicksand relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-[-100px] w-[400px] h-[400px] bg-[#f9c5d1] rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-100px] w-[500px] h-[500px] bg-[#e8d5f2] rounded-full blur-[80px] opacity-30 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-[#a1445a] mb-4"
          >
            Our Story ❤️
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#c76b85] text-lg md:text-xl font-dancing"
          >
            Every moment with you is a beautiful chapter
          </motion.p>
        </div>

        <div className="relative border-l-4 border-[#f3cdd8] ml-4 md:ml-1/2">
          {timelineData.map((item, index) => {
            const isExpanded = expandedId === item.id;
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-12 md:w-1/2 ${isEven ? 'md:pr-12 md:ml-0 md:text-right' : 'md:pl-12 md:ml-auto'}`}
              >
                {/* Dot on the line */}
                <div className={`absolute top-4 w-8 h-8 bg-[#c76b85] rounded-full border-4 border-white shadow-md flex items-center justify-center text-white text-xs z-10
                  ${isEven ? '-right-4 md:-right-4' : '-left-4 md:-left-4'}`}
                >
                  {index + 1}
                </div>

                {/* Card */}
                <div 
                  onClick={() => toggleExpand(item.id)}
                  className={`bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                    ${isEven ? 'md:items-end' : 'md:items-start'} flex flex-col`}
                >
                  <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                    <span className="text-[#e88aa0] text-lg">✨</span>
                    <h3 className="font-playfair text-2xl font-bold text-[#a1445a]">{item.title}</h3>
                  </div>
                  <div className="text-sm text-[#b87b8b] font-semibold mb-2">{item.date}</div>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden w-full"
                      >
                        <div className="pt-4 border-t border-[#f3cdd8] mt-2">
                          {/* Photo */}
                          <div className="w-full h-48 bg-pink-100 rounded-xl mb-4 overflow-hidden relative group">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => { e.target.src =   "/ü.JPG"; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                              <span className="text-white font-semibold">{item.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-[#7a4b5a] leading-relaxed">
                            {item.description}
                          </p>
                          
                          <div className={`mt-4 flex text-2xl animate-pulse ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                            ❤️ 💖 💕
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {!isExpanded && (
                    <span className="text-xs text-[#c76b85] font-semibold mt-2 italic opacity-70">
                      Tap to read more...
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;