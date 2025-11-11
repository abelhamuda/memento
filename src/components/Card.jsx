import React from 'react';

const Card = ({ card, isFlipped, isMatched, onClick, disabled }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched && !disabled) {
      onClick();
    }
  };

  return (
    <div 
      className="card-3d h-24 md:h-32 cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className={`card-inner relative w-full h-full ${isFlipped || isMatched ? 'card-flipped' : ''}`}>
        {/* Card Back */}
        <div className="card-back bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg border-2 border-white/20 flex items-center justify-center">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">?</span>
          </div>
        </div>
        
        {/* Card Front */}
        <div className={`card-front rounded-xl shadow-lg border-2 ${
          isMatched 
            ? 'border-emerald-400 bg-gradient-to-br from-emerald-400 to-green-500' 
            : 'border-white/30 bg-gradient-to-br from-slate-100 to-slate-200'
        } flex items-center justify-center`}>
          <div className={`text-3xl md:text-4xl font-bold transition-all duration-300 ${
            isMatched ? 'scale-110 text-white' : 'text-gray-800'
          }`}>
            {card.emoji}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;