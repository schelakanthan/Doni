import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // 🚨 Added for the Secret Message button
import confetti from 'canvas-confetti';

const GiftRoom = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelResult, setWheelResult] = useState(null);
  const [spinCount, setSpinCount] = useState(0);

  const spinTimeout = useRef(null);

  const gifts = [
    "IPHONE 🤗",
    "LAPTOP 😘",
    "TV 📺",
    "1000€❤️",
    "CAR 🧸",
    "NOTHING🌹",
    "Flowers 💐",
    "RING 💍"
  ];

  const winningIndex = 3;

  const colors = [
    "#f9c5d1",
    "#e8b4c4",
    "#f3cdd8",
    "#ffb3c6",
    "#e88aa0",
    "#c76b85",
    "#d9a5b5",
    "#fbc8d5"
  ];

  const segmentAngle = 360 / gifts.length;

  // Create wheel segment
  const createWheelSegment = (index) => {
    const startAngle = index * segmentAngle - 90;
    const endAngle = startAngle + segmentAngle;

    const startRad = startAngle * Math.PI / 180;
    const endRad = endAngle * Math.PI / 180;

    const x1 = 150 + 150 * Math.cos(startRad);
    const y1 = 150 + 150 * Math.sin(startRad);

    const x2 = 150 + 150 * Math.cos(endRad);
    const y2 = 150 + 150 * Math.sin(endRad);

    return `
      M 150 150
      L ${x1} ${y1}
      A 150 150 0 0 1 ${x2} ${y2}
      Z
    `;
  };

  // Always land on the winning segment
  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWheelResult(null);

    const currentRotation = wheelRotation;

    // Middle of the winning segment
    const winningMiddle = winningIndex * segmentAngle
      + segmentAngle / 2;

    // Pointer is at the top (270 degrees in wheel coordinates)
    const targetAngle = (270 - winningMiddle + 360) % 360;

    // Calculate rotation needed from current position
    const currentNormalized =
      ((currentRotation % 360) + 360) % 360;

    const additionalRotation =
      (targetAngle - currentNormalized + 360) % 360;

    // Different number of full spins every time
    const extraSpins = 6 + (spinCount % 5);

    const finalRotation =
      currentRotation + extraSpins * 360 + additionalRotation;

    setWheelRotation(finalRotation);
    setSpinCount(prev => prev + 1);

    // Match this duration with the animation duration
    spinTimeout.current = setTimeout(() => {
      setIsSpinning(false);

      // Always show the winning gift
      setWheelResult(gifts[winningIndex]);

      confetti({
        particleCount: 180,
        spread: 110,
        startVelocity: 40,
        origin: { y: 0.6 },
        colors: [
          '#FFD700',
          '#FFA500',
          '#f9c5d1',
          '#c76b85',
          '#ffffff'
        ]
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b12] via-[#0d0508] to-black text-white flex flex-col items-center justify-center relative overflow-hidden font-quicksand px-3 py-16">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#4a1525_0%,_#000000_80%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            Spin the Wheel 🎡
          </h1>

          <p className="text-[#ffb3c6] text-lg sm:text-xl font-dancing">
            Let fate decide what you get today...
          </p>

          <p className="text-white/50 text-xs mt-3">
            Spin #{spinCount}
          </p>
        </motion.div>

        {/* Wheel */}
        <div className="flex flex-col items-center w-full">

          <div className="relative w-[min(88vw,550px)] aspect-square flex items-center justify-center mb-12">

            {/* Pointer */}
            <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 z-30 w-0 h-0 border-l-[18px] sm:border-l-[25px] border-r-[18px] sm:border-r-[25px] border-t-[32px] sm:border-t-[45px] border-l-transparent border-r-transparent border-t-[#ffb3c6] drop-shadow-[0_0_15px_rgba(255,179,198,0.8)]" />

            {/* Wheel border */}
            <div className="absolute inset-0 rounded-full border-[5px] sm:border-[8px] border-[#4a1525] shadow-[0_0_60px_rgba(199,107,133,0.5)]" />

            {/* Rotating Wheel */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              animate={{ rotate: wheelRotation }}
              transition={{
                duration: 5,
                ease: [0.12, 0, 0.18, 1]
              }}
              style={{
                transformOrigin: 'center center'
              }}
            >
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full"
              >
                {gifts.map((gift, index) => {
                  const midAngle =
                    index * segmentAngle + segmentAngle / 2;

                  return (
                    <g key={index}>
                      <path
                        d={createWheelSegment(index)}
                        fill={colors[index]}
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="1.5"
                      />

                      {/* Text positioned inside each segment */}
                      <g
                        transform={`rotate(${midAngle}, 150, 150)`}
                      >
                        <text
                          x="150"
                          y="65"
                          fill="#4a1525"
                          fontSize="10"
                          fontWeight="800"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {gift.split(' ').map((word, wordIndex) => (
                            <tspan
                              key={wordIndex}
                              x="150"
                              dy={wordIndex === 0 ? 0 : 11}
                            >
                              {word}
                            </tspan>
                          ))}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </motion.div>

            {/* Center Spin Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`
                absolute z-40
                w-[23%] aspect-square
                rounded-full
                bg-white
                flex items-center justify-center
                font-bold text-[#c76b85]
                text-sm sm:text-xl
                shadow-[0_0_30px_rgba(255,255,255,0.6)]
                transition-all duration-300
                ${
                  isSpinning
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:scale-110 active:scale-95 cursor-pointer'
                }
              `}
            >
              {isSpinning ? '❤️' : 'SPIN ❤️'}
            </button>

          </div>

          {/* Spin instruction */}
          {!wheelResult && (
            <p className="text-[#ffb3c6] text-center text-sm sm:text-base mb-6">
              {isSpinning
                ? 'Your love is waiting at the finish line... ❤️'
                : 'Come on! Spin until you find your surprise 💕'}
            </p>
          )}

          {/* Result */}
          <AnimatePresence>
            {wheelResult && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center bg-gradient-to-r from-[#c76b85] to-[#e88aa0] p-6 sm:p-8 rounded-3xl shadow-[0_0_50px_rgba(232,138,160,0.6)] border border-white/30 max-w-lg w-full"
              >
                <h3 className="text-xl sm:text-2xl text-white mb-3 font-playfair">
                  The wheel has spoken! ❤️
                </h3>

                <p className="text-2xl sm:text-4xl font-dancing text-white font-bold mb-4">
                  You Only Want My Love ❤️
                </p>

                <p className="text-sm sm:text-base text-white/90">
                  No matter how many times you spin,
                  It's choose Love. 💍
                </p>

                <button
                  onClick={() => setWheelResult(null)}
                  className="mt-6 bg-white text-[#c76b85] px-7 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  Spin Again 💕
                </button>

                {/* 🚨 ADDED SECRET MESSAGE BUTTON 🚨 */}
                <div className="mt-4">
                  <Link
                    to="/secret-message"
                    className="inline-block px-8 py-3 rounded-full bg-transparent border-2 border-white/50 text-white font-bold text-sm sm:text-base hover:bg-white/10 hover:scale-105 transition-all duration-300"
                  >
                    Wait... there's one more secret 🤫
                  </Link>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default GiftRoom;