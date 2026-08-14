import React from 'react';
import { Trophy, BookOpen, Target, Zap } from 'lucide-react';

interface ScoreModalProps {
  score: number;
  total: number;
  gainedXP: number;
  onClose: () => void;
}

export const ScoreModal: React.FC<ScoreModalProps> = ({
  score,
  total,
  gainedXP,
  onClose,
}) => {
  const percentage = Math.round((score / total) * 100);
  const isPassed = percentage >= 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow Background */}
        <div
          className={`absolute -top-20 -left-20 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
            isPassed ? 'bg-emerald-500/20' : 'bg-red-500/20'
          }`}
        />

        {/* Icon & Title */}
        <div className="space-y-2">
          <div className="flex justify-center">
            {isPassed ? (
              <Trophy className="w-16 h-16 text-emerald-400" />
            ) : (
              <BookOpen className="w-16 h-16 text-amber-400" />
            )}
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            {isPassed ? 'Exam Passed!' : 'Practice Completed'}
          </h3>
          <p className="text-xs text-slate-400">
            {isPassed
              ? 'Great job! You met the official GPSC/GSSC 60% qualification standard.'
              : 'Keep reviewing your weak topics in the Revision Bank!'}
          </p>
        </div>

        {/* Score Stats Ring / Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-around">
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1">
                <Target className="w-3.5 h-3.5 text-indigo-400" /> Score
              </div>
              <div className="text-2xl font-black text-white mt-1">
                {score} / {total}
              </div>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Accuracy</div>
              <div
                className={`text-2xl font-black mt-1 ${
                  isPassed ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {percentage}%
              </div>
            </div>
          </div>

          {/* Accuracy Progress Bar */}
          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-1000 ${
                isPassed ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="text-xs text-amber-400 font-semibold flex items-center justify-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-amber-400" /> Gained +{gainedXP} XP
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 active:scale-[0.99] transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
