import React, { useState, useEffect } from 'react';
import Card from './Card';
import ScoreBoard from './ScoreBoard';
import Confetti from './Confetti';

const GameBoard = () => {
  const emojis = ['🎮', '🎨', '🚀', '🌟', '🎯', '🌈', '🎪', '🎭'];
  
  const createCards = () => {
    const cards = [...emojis, ...emojis].map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(createCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [bestScore, setBestScore] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let timer;
    if (gameStarted && !gameCompleted) {
      timer = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted]);

  useEffect(() => {
    if (matches === emojis.length) {
      setGameCompleted(true);
      const currentBest = localStorage.getItem('memoryBestScore');
      if (!currentBest || moves < parseInt(currentBest)) {
        localStorage.setItem('memoryBestScore', moves.toString());
        setBestScore(moves);
      }
    }
  }, [matches, emojis.length, moves]);

  const handleCardClick = (clickedIndex) => {
    if (!gameStarted) setGameStarted(true);
    
    if (flippedCards.length === 2 || cards[clickedIndex].isFlipped || cards[clickedIndex].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[clickedIndex].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedIndex];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setDisabled(true);
      setMoves(prev => prev + 1);

      const [firstIndex, secondIndex] = newFlippedCards;
      
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        // Match found
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstIndex].isMatched = true;
          updatedCards[secondIndex].isMatched = true;
          setCards(updatedCards);
          setFlippedCards([]);
          setMatches(prev => prev + 1);
          setDisabled(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstIndex].isFlipped = false;
          updatedCards[secondIndex].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTime(0);
    setGameStarted(false);
    setGameCompleted(false);
    setDisabled(false);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            The Memento
          </h1>
          <p className="text-white/80 text-lg">
            Match all pairs to win! Test your memory skills.
          </p>
        </div>

        {/* Score Board */}
        <div className="mb-8">
          <ScoreBoard 
            moves={moves} 
            matches={matches} 
            time={time} 
            bestScore={bestScore || localStorage.getItem('memoryBestScore')} 
          />
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => handleCardClick(index)}
              disabled={disabled}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 border border-white/30 hover:scale-105"
          >
            {gameCompleted ? 'Play Again' : 'Restart Game'}
          </button>
        </div>

        {/* Completion Message */}
        {gameCompleted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-40">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-bounce-in">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Congratulations! 🎉</h2>
              <p className="text-gray-600 mb-2">You completed the game in {moves} moves!</p>
              <p className="text-gray-600 mb-6">Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:scale-105 transition-transform duration-300"
              >
                Play Again
              </button>
            </div>
            <Confetti />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;