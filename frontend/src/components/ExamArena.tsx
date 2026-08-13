import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/audio';
import type { Question } from '../types';

interface ExamArenaProps {
  questions: Question[];
  onExit: () => void;
  onFinishExam: (score: number, total: number) => void;
  isMuted?: boolean;
}

export const ExamArena: React.FC<ExamArenaProps> = ({
  questions,
  onExit,
  onFinishExam,
  isMuted = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<number, string[]>>({});
  const [usedLifelines, setUsedLifelines] = useState<Record<number, boolean>>({});

  // 30-Minute Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Reset or show explanation when changing question
  useEffect(() => {
    setShowExplanation(userAnswers[currentIndex] !== undefined);
  }, [currentIndex, userAnswers]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionLetter: string) => {
    // Record user answer
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionLetter,
    }));

    // Auto-reveal explanation when answered
    setShowExplanation(true);

    // Instant Right/Wrong Audio Feedback
    const isCorrect = currentQ.answer.startsWith(optionLetter);
    if (isCorrect) {
      playSound('correct', isMuted);
    } else {
      playSound('wrong', isMuted);
    }
  };

  // 🔥 50:50 Lifeline Logic
  const handleUse5050 = () => {
    if (usedLifelines[currentIndex]) return;
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const correctLetter = currentQ.answer.charAt(0); // 'A', 'B', 'C', or 'D'
    const letters = ['A', 'B', 'C', 'D'].filter((l) => l !== correctLetter);
    // Pick 2 wrong options to eliminate
    const shuffledWrong = letters.sort(() => 0.5 - Math.random()).slice(0, 2);

    setEliminatedOptions((prev) => ({
      ...prev,
      [currentIndex]: shuffledWrong,
    }));
    setUsedLifelines((prev) => ({
      ...prev,
      [currentIndex]: true,
    }));
    playSound('correct', isMuted);
  };

  const handleFinish = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      const selected = userAnswers[idx];
      if (selected && q.answer.startsWith(selected)) {
        score++;
      }
    });
    playSound('finish', isMuted);
    onFinishExam(score, questions.length);
  };

  const currentQ = questions[currentIndex] || {
    id: '1',
    question: 'Loading Question...',
    options: ['A) Option 1', 'B) Option 2', 'C) Option 3', 'D) Option 4'],
    answer: 'A) Option 1',
    explanation: 'No explanation available.',
    subject: 'General Knowledge',
  };

  const currentEliminated = eliminatedOptions[currentIndex] || [];
  const isLifelineUsed = usedLifelines[currentIndex] || false;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            ← Exit Test
          </button>
          <h2 className="text-sm font-bold text-white hidden sm:block">
            🏛️ Official GPSC/GSSC Exam Hall
          </h2>
        </div>

        {/* Countdown Timer & Lifeline */}
        <div className="flex items-center gap-3">
          {/* 🔥 50:50 Lifeline Button */}
          <button
            disabled={isLifelineUsed}
            onClick={handleUse5050}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border ${
              isLifelineUsed
                ? 'bg-slate-950 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed'
                : 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30'
            }`}
            title="Eliminate 2 wrong answers"
          >
            <span>🔥 50:50 Lifeline</span>
          </button>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
            <span className="text-amber-400 text-xs font-bold hidden sm:inline">⏱️ Time:</span>
            <span className="text-amber-300 font-mono text-sm font-bold">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <button
          onClick={handleFinish}
          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition-all"
        >
          Submit Exam
        </button>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Question Card (2 Cols) */}
        <div className="md:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Question <strong className="text-white">{currentIndex + 1}</strong> of{' '}
              {questions.length}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-indigo-300 font-medium">
              {currentQ.subject || currentQ.category || 'General'}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-base md:text-lg font-semibold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3">
            {(currentQ.options || []).map((opt, i) => {
              const letter = String.fromCharCode(65 + i); // 'A', 'B', 'C', 'D'
              const selectedLetter = userAnswers[currentIndex];
              const isSelected = selectedLetter === letter;
              const isAnswered = selectedLetter !== undefined;
              const isCorrectAnswer = currentQ.answer.startsWith(letter);
              const isEliminated = currentEliminated.includes(letter);

              if (isEliminated) {
                return (
                  <div
                    key={i}
                    className="w-full text-left p-4 rounded-2xl border bg-slate-950/20 border-slate-900 text-slate-700 text-xs font-medium line-through opacity-40 select-none flex items-center justify-between"
                  >
                    <span>{opt} (Eliminated)</span>
                    <span className="text-red-500/50">✖</span>
                  </div>
                );
              }

              // Determine dynamic styling based on instant feedback
              let btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700';
              let badge = null;

              if (isAnswered) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-semibold shadow-lg shadow-emerald-500/10';
                  badge = <span className="text-xs font-bold text-emerald-400">✓ Correct</span>;
                } else if (isSelected) {
                  btnStyle = 'bg-red-600/20 border-red-500 text-red-300 font-semibold shadow-lg shadow-red-500/10';
                  badge = <span className="text-xs font-bold text-red-400">✖ Wrong</span>;
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(letter)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs md:text-sm font-medium flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {badge}
                </button>
              );
            })}
          </div>

          {/* Explanation Toggle */}
          <div className="pt-2">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>{showExplanation ? 'Hide' : 'Show'} Explanation</span>
              <span>💡</span>
            </button>
            {showExplanation && (
              <div className="mt-3 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
                {currentQ.explanation}
              </div>
            )}
          </div>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                playSound('click', isMuted);
                setCurrentIndex((prev) => prev - 1);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-semibold text-white transition-colors"
            >
              ◄ Previous
            </button>
            <button
              disabled={currentIndex === questions.length - 1}
              onClick={() => {
                playSound('click', isMuted);
                setCurrentIndex((prev) => prev + 1);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-semibold text-white transition-colors"
            >
              Next Question ►
            </button>
          </div>
        </div>

        {/* Right Column: OMR Palette Grid (1 Col) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            OMR Answer Palette
          </h4>

          {/* Palette Grid */}
          <div className="grid grid-cols-5 gap-2 max-h-[420px] overflow-y-auto pr-1">
            {questions.map((_, idx) => {
              const isAnswered = userAnswers[idx] !== undefined;
              const isCurrent = idx === currentIndex;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    playSound('click', isMuted);
                    setCurrentIndex(idx);
                  }}
                  className={`h-9 rounded-xl text-xs font-bold transition-all ${
                    isCurrent
                      ? 'ring-2 ring-indigo-400 bg-indigo-600 text-white'
                      : isAnswered
                      ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-emerald-600/30 border border-emerald-500/40" />
              Answered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-slate-950 border border-slate-800" />
              Unanswered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
