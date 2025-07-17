import React from 'react';
import confetti from 'canvas-confetti';

export default function Confetti({ onClaim }) {
  const handleClick = () => {
    const defaults = {
      spread: 180,
      ticks: 100,
      gravity: 4,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
    };

    const shoot = () => {
      confetti({ ...defaults, particleCount: 40, scalar: 1.2, shapes: ['star'] });
      confetti({ ...defaults, particleCount: 10, scalar: 0.75, shapes: ['circle'] });
    };

    shoot();
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);

    // Call the point claim logic
    onClaim();
  };

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-6 rounded w-[200px] h-[30px] flex items-center justify-center"
      >
        Claim!
      </div>
    </div>
  );
}
