import React from 'react';

const ScoreBoard = ({ moves, matches, time, bestScore }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
      <h2 className="text-white text-xl font-bold mb-4 text-center">Game Stats</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-white/80 text-sm">Moves</div>
          <div className="text-white text-2xl font-bold">{moves}</div>
        </div>
        
        <div className="text-center">
          <div className="text-white/80 text-sm">Matches</div>
          <div className="text-white text-2xl font-bold">{matches}/8</div>
        </div>
        
        <div className="text-center">
          <div className="text-white/80 text-sm">Time</div>
          <div className="text-white text-2xl font-bold">{formatTime(time)}</div>
        </div>
        
        <div className="text-center">
          <div className="text-white/80 text-sm">Best</div>
          <div className="text-white text-2xl font-bold">
            {bestScore ? `${bestScore}m` : '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;