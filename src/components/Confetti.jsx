import React, { useEffect, useState } from 'react';

const Confetti = () => {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 3,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      size: Math.random() * 10 + 5,
    }));
    setConfettiPieces(pieces);

    const timer = setTimeout(() => setConfettiPieces([]), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className="absolute rounded-sm animate-bounce"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.animationDelay}s`,
            animationDuration: `${Math.random() * 2 + 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;