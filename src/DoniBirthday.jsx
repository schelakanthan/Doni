import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 🚨 Import useNavigate
import { loveConfig } from './config/loveConfig';
import { useProgress } from './context/ProgressContext'; // 🚨 Import Progress
import a from "./assets/a.jpeg";

const DoniBirthday = () => {
  const navigate = useNavigate(); // 🚨 For redirecting
  const { unlockStep } = useProgress(); // 🚨 For unlocking the next step

  const [wishShown, setWishShown] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [candles, setCandles] = useState([false, false, false, false, false]);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [showSurprise, setShowSurprise] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzleTiles, setPuzzleTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [showGift, setShowGift] = useState(false);

  // Floating hearts background
  useEffect(() => {
    const hearts = [];
    const emojis = ['❤️', '🌸', '✨', '💖', '🌷', '💕'];
    for (let i = 0; i < 12; i++) {
      hearts.push({
        id: i,
        emoji: emojis[i % emojis.length],
        left: Math.random() * 90 + 5,
        delay: Math.random() * 8,
        size: Math.random() * 1 + 0.8, // size between 0.8rem and 1.8rem
      });
    }
    setFloatingHearts(hearts);
  }, []);

  useEffect(() => {
    if (candles.every((c) => c === true)) {
      setWishShown(true);
    }
  }, [candles]);

  useEffect(() => {
    if (showSurprise) {
      initPuzzle();
    }
  }, [showSurprise]);

  const handleMakeWish = () => {
    setShowCake(true);
    setWishShown(false);
    setCandles([false, false, false, false, false]);
  };

  const blowCandle = (index) => {
    setCandles((prev) => {
      const newCandles = [...prev];
      newCandles[index] = true;
      return newCandles;
    });
  };

  const allCandlesOut = candles.every((c) => c === true);

  const initPuzzle = () => {
    let tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < 30; i++) {
      const a = Math.floor(Math.random() * 9);
      const b = Math.floor(Math.random() * 9);
      [tiles[a], tiles[b]] = [tiles[b], tiles[a]];
    }
    if (tiles.every((t, i) => t === i)) {
      [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
    }
    setPuzzleTiles(tiles);
    setSelectedTile(null);
    setMoveCount(0);
    setPuzzleSolved(false);
  };

  const handleTileClick = (index) => {
    if (puzzleSolved) return;

    if (selectedTile === null) {
      setSelectedTile(index);
    } else if (selectedTile === index) {
      setSelectedTile(null);
    } else {
      const newTiles = [...puzzleTiles];
      [newTiles[selectedTile], newTiles[index]] = [newTiles[index], newTiles[selectedTile]];
      setPuzzleTiles(newTiles);
      setSelectedTile(null);
      setMoveCount((prev) => prev + 1);

      const isSolved = newTiles.every((tile, i) => tile === i);
      if (isSolved) {
        setPuzzleSolved(true);
      }
    }
  };

  const getTileStyle = (tileNum) => {
    const row = Math.floor(tileNum / 3);
    const col = tileNum % 3;
    return {
      backgroundImage: `url(${a})`, 
      backgroundSize: '300% 300%',
      backgroundPosition: `${col * 50}% ${row * 50}%`,
    };
  };

  // 🚨 THE NEW FUNCTION TO CONTINUE THE STORY
  const handleContinueStory = () => {
    unlockStep(1); // Unlock "Our Story" (Step 1)
    navigate('/timeline'); // Go to the Timeline page
  };

  const formattedDate = new Date(loveConfig.birthday).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdeff2] to-[#f8e8ee] flex flex-col items-center justify-center relative overflow-hidden font-quicksand pt-24 p-4">
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-[-100px] left-[-80px] w-[400px] h-[400px] bg-[#f9c5d1] rounded-full blur-[80px] opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-[#fbc8d5] rounded-full blur-[80px] opacity-30 pointer-events-none"></div>

      {/* Floating Hearts Background */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-[#e0a3b5] opacity-0 pointer-events-none z-0 animate-[floatUp_8s_linear_infinite]"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}rem`,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-[50px] shadow-[0_30px_60px_-20px_rgba(180,120,140,0.4)] border border-white/80 p-8 md:p-14 text-center transition-transform duration-300 hover:-translate-y-2">
        
        {/* ================= MAIN PAGE ================= */}
        {!showSurprise && !showGift && (
          <>
            <div className="text-[#b87b8b] uppercase tracking-[6px] text-sm md:text-base font-semibold mb-2 opacity-90">
              celebrating
            </div>
            <h1 className="font-playfair text-6xl md:text-8xl font-bold text-[#a1445a] leading-tight drop-shadow-sm mb-4 tracking-wide">
              {loveConfig.girlfriendName}
            </h1>
            <div className="inline-block bg-[#ffeaf0] text-[#9e4a60] px-6 py-2 rounded-full text-lg md:text-xl font-bold border border-[#f3cdd8] shadow-sm mb-8">
              {formattedDate}
            </div>

            {/* Photo Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative p-2 rounded-full bg-gradient-to-tr from-[#f9c5d1] via-[#e8b4c4] to-[#f3cdd8] shadow-[0_15px_35px_-10px_rgba(190,120,140,0.6)] transition-transform duration-500 hover:scale-105 hover:rotate-2">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white bg-pink-100 flex items-center justify-center">
                  <img src={a} alt={loveConfig.girlfriendName} className="w-full h-full object-cover" />
                </div>
                <span className="absolute bottom-2 right-2 text-3xl animate-bounce">💗</span>
              </div>
              <div className="font-dancing text-2xl text-[#a85e72] mt-4 font-bold tracking-wide">
                the most beautiful soul I know ✨
              </div>
            </div>

            {/* Heart Divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-2xl animate-pulse">🌸</span>
              <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent via-[#dba5b5] to-transparent"></div>
              <span className="text-3xl animate-pulse text-[#c76b85]">💗</span>
              <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent via-[#dba5b5] to-transparent"></div>
              <span className="text-2xl animate-pulse">🌸</span>
            </div>

            {/* Message */}
            <div className="font-playfair italic text-lg md:text-xl text-[#7a4b5a] leading-relaxed max-w-xl mx-auto mb-8 relative">
              <span className="text-5xl text-[#d9a5b5] opacity-40 absolute -top-4 -left-2 font-serif">“</span>
              To the girl who makes every day feel like a celebration —<br />
              may your birthday be as radiant, kind, and beautiful as you are.
              <span className="text-5xl text-[#d9a5b5] opacity-40 absolute -bottom-8 -right-2 font-serif">”</span>
            </div>

            {/* Love Reasons */}
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-10">
              {loveConfig.reasons.map((reason, index) => (
                <div 
                  key={index} 
                  title={reason.message}
                  className="bg-[#fff0f5] border border-[#f3cdd8] text-[#9e4a60] px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-[#ffe4ec] transition-all duration-300 cursor-default flex items-center gap-2"
                >
                  <span>💖</span> {reason.title}
                </div>
              ))}
            </div>

            {/* Make a Wish Button */}
            {!showCake && (
              <button 
                onClick={handleMakeWish}
                className="bg-[#c76b85] text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_10px_25px_-8px_#b15b73] hover:bg-[#b15b73] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30"
              >
                Make a wish ✨
              </button>
            )}

            {/* Cake Section */}
            {showCake && (
              <div className="flex flex-col items-center animate-[fadeIn_0.6s_ease]">
                <div className="font-dancing text-2xl text-[#a85e72] font-bold mb-6">
                  {allCandlesOut ? '🎉 Your wish is on its way! 🎉' : '🕯️ Click each candle to blow it out'}
                </div>

                {/* Cake Design (CSS) */}
                <div className="relative w-[200px] flex flex-col items-center mb-6">
                  <div className="flex gap-3 mb-[-2px] z-10">
                    {candles.map((isOut, index) => (
                      <div
                        key={index}
                        onClick={() => blowCandle(index)}
                        className="relative cursor-pointer flex flex-col items-center hover:-translate-y-1 transition-transform"
                      >
                        {/* Flame */}
                        <div className={`absolute -top-5 w-3 h-5 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full shadow-[0_0_15px_5px_rgba(255,180,70,0.5)] transition-all duration-300 ${isOut ? 'opacity-0 scale-0' : 'animate-pulse'}`}></div>
                        {/* Wick */}
                        <div className="w-[2px] h-2 bg-gray-800 mb-[-1px]"></div>
                        {/* Candle Body */}
                        <div className={`w-2.5 h-10 bg-[repeating-linear-gradient(45deg,#ffd1dc,#ffd1dc_4px,#ffb3c6_4px,#ffb3c6_8px)] rounded-sm shadow-sm transition-opacity ${isOut ? 'opacity-60' : 'opacity-100'}`}></div>
                      </div>
                    ))}
                  </div>
                  {/* Cake Layers */}
                  <div className="w-[170px] h-[22px] bg-gradient-to-b from-[#f9c5d1] to-[#f4a6b8] rounded-t-xl shadow-inner z-0"></div>
                  <div className="w-[190px] h-[34px] bg-gradient-to-b from-[#fde3ea] to-[#f9c5d1] border-t-4 border-dashed border-white/50"></div>
                  <div className="w-[210px] h-[42px] bg-gradient-to-b from-[#f4a6b8] to-[#e88aa0] rounded-b-2xl shadow-[0_10px_25px_-8px_rgba(180,100,130,0.4)]"></div>
                </div>

                {allCandlesOut && (
                  <div className="font-dancing text-2xl text-[#8e5a6b] font-bold bg-[#fff0f5] px-6 py-4 rounded-3xl border border-dashed border-[#eac0cc] mb-6 animate-[popIn_0.6s_ease]">
                    I love you more than words can say — today and always. 💫
                  </div>
                )}

                {allCandlesOut && (
                  <button
                    onClick={() => setShowSurprise(true)}
                    className="bg-gradient-to-r from-[#e88aa0] to-[#c76b85] text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_10px_25px_-8px_#b15b73] hover:scale-105 active:scale-95 transition-all duration-300 animate-[glowPulse_2s_infinite]"
                  >
                    Let's go to your surprise 🎁
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* ================= SURPRISE / PUZZLE PAGE ================= */}
        {showSurprise && !showGift && (
          <div className="animate-[fadeIn_0.6s_ease] flex flex-col items-center">
            {!puzzleSolved ? (
              <>
                <div className="text-[#b87b8b] uppercase tracking-[6px] text-sm font-semibold mb-2">a little surprise for you</div>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#a1445a] mb-4">Solve the Puzzle 💝</h2>
                <p className="text-[#8e5a6b] mb-8 max-w-md mx-auto">
                  Click two tiles to swap them. Arrange the photo correctly to unlock your surprise!
                </p>

                <div className="grid grid-cols-3 gap-1 w-[300px] h-[300px] bg-gradient-to-br from-[#f9c5d1] to-[#f3cdd8] p-2 rounded-2xl shadow-lg mb-6">
                  {puzzleTiles.map((tileNum, index) => (
                    <div
                      key={index}
                      className={`w-full h-full rounded-lg cursor-pointer transition-all duration-200 bg-pink-100 border-2 ${
                        selectedTile === index ? 'border-[#c76b85] scale-105 shadow-xl z-10' : 'border-transparent hover:scale-105 hover:border-white hover:shadow-md'
                      }`}
                      style={getTileStyle(tileNum)}
                      onClick={() => handleTileClick(index)}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-6 font-bold text-[#9e4a60]">
                  <span>Moves: {moveCount}</span>
                  <button 
                    onClick={initPuzzle}
                    className="bg-[#fff0f5] border border-[#f3cdd8] px-4 py-2 rounded-full text-sm hover:bg-[#ffe4ec] hover:-translate-y-0.5 transition-all"
                  >
                    🔄 Shuffle
                  </button>
                </div>
              </>
            ) : (
              <div className="animate-[fadeIn_0.8s_ease] flex flex-col items-center">
                <div className="text-4xl mb-2 animate-bounce">🎉💖🎉</div>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#a1445a] mb-6">You did it, my love!</h2>
                
                <div className="grid grid-cols-3 gap-1 w-[300px] h-[300px] p-2 bg-gradient-to-br from-[#f9c5d1] to-[#f3cdd8] rounded-2xl shadow-[0_15px_40px_-8px_rgba(232,138,160,0.8)] mb-8">
                  {puzzleTiles.map((tileNum, index) => (
                    <div
                      key={index}
                      className="w-full h-full rounded-lg bg-pink-100 border-2 border-white/60"
                      style={getTileStyle(tileNum)}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={() => setShowGift(true)}
                  className="bg-[#c76b85] text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_10px_25px_-8px_#b15b73] hover:bg-[#b15b73] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Open Your Surprise Gift 🎁
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= FINAL SURPRISE GIFT PAGE ================= */}
        {showGift && (
          <div className="animate-[fadeIn_0.8s_ease] flex flex-col items-center">
            <div className="text-5xl mb-4 animate-pulse">🎁✨</div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#a1445a] mb-6">Your Surprise!</h2>
            
            <div className="font-dancing text-2xl text-[#8e5a6b] leading-relaxed font-bold space-y-4 mb-8">
              <p>Every piece of my heart belongs to you, {loveConfig.girlfriendName}. 🌸</p>
              <p>You are my today, my tomorrow, and my forever. 💫</p>
              <p className="text-3xl text-[#a1445a] mt-4 animate-pulse">Happy Birthday, my love. 🎂❤️</p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-[#fde3ea] to-[#f9c5d1] rounded-3xl border-2 border-dashed border-[#e88aa0] shadow-lg animate-[pulse_2s_infinite] mb-10">
              <span className="text-6xl">💖</span>
            </div>

            {/* 🚨 NEW BUTTON TO START THE STORY 🚨 */}
            <button 
              onClick={handleContinueStory}
              className="bg-gradient-to-r from-[#e88aa0] to-[#c76b85] text-white font-bold text-xl px-12 py-5 rounded-full shadow-[0_10px_30px_-8px_#b15b73] hover:scale-105 active:scale-95 transition-all duration-300 animate-[glowPulse_2s_infinite]"
            >
              Let's Start Our Story ❤️
            </button>
          </div>
        )}

      </div>

      {/* Custom Keyframes injected via inline style for Tailwind */}
      <style>{`
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(100vh) scale(0.6) rotate(0deg); }
          15% { opacity: 0.4; }
          85% { opacity: 0.4; }
          100% { opacity: 0; transform: translateY(-20vh) scale(1.2) rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 10px 25px -8px #b15b73; }
          50% { box-shadow: 0 10px 35px -5px #e88aa0, 0 0 20px rgba(232, 138, 160, 0.6); }
        }
      `}</style>
    </div>
  );
};

export default DoniBirthday;