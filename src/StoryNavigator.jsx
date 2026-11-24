import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProgress } from './context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';

// Define the steps of the story in order
export const STORY_STEPS = [
  { path: '/', label: 'Home' },
  { path: '/timeline', label: 'Our Story' },
  { path: '/why-i-love-you', label: 'Why I Love You' },
  { path: '/quiz', label: 'The Quiz' },
  { path: '/transition', label: 'The Proposal' },
  { path: '/gift-room', label: 'The Gift' },
  { path: '/secret-message', label: 'Secret Letter' },
  { path: '/future', label: 'Our Future' },
  { path: '/final', label: 'Forever' },
];

const StoryNavigator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unlockedStep, resetProgress } = useProgress();
  const [showMenu, setShowMenu] = useState(false);

  // Find which step we are currently on
  const currentStepIndex = STORY_STEPS.findIndex((step) => step.path === location.pathname);

  // If we are on a page not in the list (like /countdown), don't show the navigator
  if (currentStepIndex === -1) return null;

  const handleRestart = () => {
    resetProgress();
    navigate('/');
    setShowMenu(false);
  };

  return (
    <>
      {/* 📱 MOBILE TOP PROGRESS BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#c76b85] to-[#e88aa0]"
          initial={{ width: 0 }}
          animate={{ width: `${(unlockedStep / (STORY_STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* 💻 DESKTOP VERTICAL INDICATOR */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-6">
        {STORY_STEPS.map((step, index) => {
          const isUnlocked = index <= unlockedStep;
          const isActive = index === currentStepIndex;
          
          return (
            <div key={step.path} className="relative group flex items-center justify-end">
              {/* Tooltip Label */}
              <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-[#c76b85] bg-white/80 px-2 py-1 rounded-md whitespace-nowrap">
                {step.label}
              </span>
              
              {/* Dot */}
              <button
                onClick={() => isUnlocked && navigate(step.path)}
                disabled={!isUnlocked}
                className={`w-4 h-4 rounded-full transition-all duration-300 relative z-10 ${
                  isActive 
                    ? 'bg-[#c76b85] scale-150 shadow-[0_0_15px_rgba(199,107,133,0.8)]' 
                    : isUnlocked 
                      ? 'bg-[#f3cdd8] hover:bg-[#c76b85] cursor-pointer' 
                      : 'bg-gray-300 cursor-not-allowed'
                }`}
              />
              
              {/* Connecting Line */}
              {index !== STORY_STEPS.length - 1 && (
                <div className={`absolute top-4 w-0.5 h-6 -z-0 ${index < unlockedStep ? 'bg-[#f3cdd8]' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* ⚙️ SETTINGS BUTTON & MENU */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-pink-200 flex items-center justify-center text-xl text-[#c76b85] hover:scale-110 transition-transform"
        >
          ⚙️
        </button>

        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl border border-pink-100 p-4 w-48"
            >
              <p className="text-xs text-gray-500 font-bold mb-3 uppercase tracking-wider">Settings</p>
              <button 
                onClick={handleRestart}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                Restart Experience ↻
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default StoryNavigator;