import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const CelebrationEffect = ({ trigger }) => {
  useEffect(() => {
    if (!trigger) return;

    // 1. Standard Confetti (Pink & White)
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f9c5d1', '#e8b4c4', '#ffffff'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f9c5d1', '#e8b4c4', '#ffffff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 2. Gold Particle Burst (after 500ms)
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FFDF00'],
        scalar: 1.2,
      });
    }, 500);

    // 3. Heart Explosion (using custom shapes)
    setTimeout(() => {
      const heart = confetti.shapeFromText({ text: '❤️', scalar: 2 });
      confetti({
        particleCount: 40,
        spread: 120,
        origin: { y: 0.5 },
        shapes: [heart],
        scalar: 2,
      });
    }, 1000);

    // 4. Fireworks effect
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 360,
        startVelocity: 30,
        origin: { y: 0.4 },
        colors: ['#ff6b35', '#ffe066', '#ffb347', '#c76b85'],
        ticks: 200,
      });
    }, 1500);

  }, [trigger]);

  return null; // This component doesn't render anything visually, it just runs the effects
};

export default CelebrationEffect;