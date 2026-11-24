import React, { createContext, useState, useEffect, useContext } from 'react';
import { loveConfig } from '../config/loveConfig';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if the current date is past the birthday
    const targetDate = new Date(loveConfig.birthday).getTime();
    const now = new Date().getTime();
    
    // 🚨 FOR TESTING: If you want to test the website NOW, temporarily change this to `true`
    // Change it back to `false` when you actually want to wait for the countdown!
    const testingMode = false; 

    if (now >= targetDate || testingMode) {
      setIsUnlocked(true);
    } else {
      const saved = localStorage.getItem('website_unlocked');
      if (saved === 'true') setIsUnlocked(true);
    }
  }, []);

  const unlockWebsite = () => {
    setIsUnlocked(true);
    localStorage.setItem('website_unlocked', 'true');
  };

  const resetWebsite = () => {
    setIsUnlocked(false);
    localStorage.removeItem('website_unlocked');
  };

  return (
    <ProgressContext.Provider value={{ isUnlocked, unlockWebsite, resetWebsite }}>
      {children}
    </ProgressContext.Provider>
  );
};