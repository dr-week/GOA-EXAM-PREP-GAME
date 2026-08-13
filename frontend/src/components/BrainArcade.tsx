import React, { useState, useEffect } from 'react';

const CARD_ICONS = ['🌴', '🏛️', '⛵', '🏝️', '🎭', '📜', '🔢', '⚡'];

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const BrainArcade: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'menu' | 'speedMath' | 'memoryMatch'>('menu');

  // Speed Math State
  const [mathA, setMathA] = useState<number>(5);
  const [mathB, setMathB] = useState<number>(7);
  const [mathAnswer, setMathAnswer] = useState<string>('');
  const [mathScore, setMathScore] = useState<number>(0);
  const [mathTimeLeft, setMathTimeLeft] = useState<number>(60);
  const [isMathActive, setIsMathActive] = useState<boolean>(false);

  // Memory Match State
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState<number>(0);

  // Initialize Memory Game Cards
  const initMemoryGame = () => {
    const duplicated = [...CARD_ICONS, ...CARD_ICONS];
    const shuffled = duplicated
      .sort(() => 0.5 - Math.random())
      .map((icon, idx) => ({
        id: idx,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMemoryMoves(0);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves((m) => m + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Speed Math Timer
  useEffect(() => {
    if (!isMathActive) return;
    if (mathTimeLeft <= 0) {
      setIsMathActive(false);
      alert(`Time Up! Your Speed Math Score: ${mathScore}`);
      return;
    }
    const timer = setInterval(() => setMathTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isMathActive, mathTimeLeft]);

  const generateNewProblem = () => {
    setMathA(Math.floor(Math.random() * 20) + 1);
    setMathB(Math.floor(Math.random() * 20) + 1);
    setMathAnswer('');
  };

  const handleStartMath = () => {
    setMathScore(0);
    setMathTimeLeft(60);
    setIsMathActive(true);
    generateNewProblem();
  };

  const handleMathSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(mathAnswer) === mathA + mathB) {
      setMathScore((s) => s + 10);
      generateNewProblem();
    } else {
      setMathAnswer('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>🧠 Brain Arcade Studio</span>
          </h2>
          <p className="text-xs text-slate-400">
            Interactive cognitive micro-games to build memory & mental calculation speed.
          </p>
        </div>
        {activeGame !== 'menu' && (
          <button
            onClick={() => {
              setActiveGame('menu');
              setIsMathActive(false);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            ← Back to Menu
          </button>
        )}
      </div>

      {/* Menu View */}
      {activeGame === 'menu' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Speed Math */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl">
              ⚡
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">60-Sec Speed Math Trainer</h3>
              <p className="text-xs text-slate-400 mt-1">
                Boost your quantitative calculation speed with rapid-fire math problems under 60 seconds.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveGame('speedMath');
                handleStartMath();
              }}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/20 active:scale-[0.99] transition-all"
            >
              Play Speed Math
            </button>
          </div>

          {/* Memory Match */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl">
              🃏
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Goa Heritage Memory Match</h3>
              <p className="text-xs text-slate-400 mt-1">
                Sharpen visual memory by matching Goa landmark icons and cultural symbols.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveGame('memoryMatch');
                initMemoryGame();
              }}
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 active:scale-[0.99] transition-all"
            >
              Play Memory Match
            </button>
          </div>
        </div>
      )}

      {/* Speed Math View */}
      {activeGame === 'speedMath' && (
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Score: <strong className="text-amber-400 text-sm">{mathScore}</strong></span>
            <span>Time Left: <strong className="text-white text-sm">{mathTimeLeft}s</strong></span>
          </div>

          <div className="py-8 bg-slate-950 border border-slate-800 rounded-2xl">
            <span className="text-4xl font-extrabold text-white tracking-wider">
              {mathA} + {mathB} = ?
            </span>
          </div>

          <form onSubmit={handleMathSubmit} className="space-y-4">
            <input
              type="number"
              autoFocus
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              placeholder="Type answer..."
              className="w-full bg-slate-950 border border-slate-800 text-white text-center text-xl font-bold py-3 rounded-xl focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-lg shadow-amber-600/20"
            >
              Submit Answer ↵
            </button>
          </form>
        </div>
      )}

      {/* Memory Match View */}
      {activeGame === 'memoryMatch' && (
        <div className="max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Moves: <strong className="text-cyan-400 text-sm">{memoryMoves}</strong></span>
            <button
              onClick={initMemoryGame}
              className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs hover:text-white"
            >
              Restart
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`h-20 rounded-2xl border text-3xl flex items-center justify-center transition-all duration-300 transform ${
                  card.isFlipped || card.isMatched
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-white rotate-0'
                    : 'bg-slate-950 border-slate-800 text-transparent hover:border-slate-700'
                }`}
              >
                {card.isFlipped || card.isMatched ? card.icon : '❓'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
