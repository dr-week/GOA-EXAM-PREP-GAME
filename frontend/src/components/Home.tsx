import React, { useState } from 'react';

interface HomeProps {
  onStartFullExam: () => void;
  onStartPractice: (subjectKey: string) => void;
  subjectKeys: string[];
}

export const Home: React.FC<HomeProps> = ({
  onStartFullExam,
  onStartPractice,
  subjectKeys,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(subjectKeys[0] || 'goa_special_gk');

  const formatSubjectName = (key: string) => {
    if (!key) return '';
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {/* Hero Welcome Glassmorphic Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900/60 border border-indigo-500/20 p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            ✨ GPSC / GSSC Official Exam Engine 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Master Goa State Competitive Exams
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Practice over 2,056+ curated questions with real-time 100-Question OMR simulators, subject drills, and interactive brain arcade games.
          </p>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Official OMR Exam Arena */}
        <div className="group relative rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Full OMR Exam Arena</h3>
                <span className="text-[10px] uppercase font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                  Timed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Full 100-question paper simulation covering all 13 Goa subjects with a 30-minute timer.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">📋 100 Questions</span>
              <span className="flex items-center gap-1">⏱️ 30 Mins</span>
              <span className="flex items-center gap-1">🎯 Pass: 60%</span>
            </div>
          </div>

          <button
            onClick={onStartFullExam}
            className="mt-6 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Launch Official Test</span>
            <span>🚀</span>
          </button>
        </div>

        {/* Card 2: Subject Practice Studio */}
        <div className="group relative rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl">
              ⚡
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Subject Practice Studio</h3>
              <p className="text-xs text-slate-400 mt-1">
                Select a specific subject domain for focused practice and immediate explanation views.
              </p>
            </div>

            {/* Subject Selector Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Choose Topic Domain:</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-purple-500"
              >
                {subjectKeys.map((key) => (
                  <option key={key} value={key}>
                    {formatSubjectName(key)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => onStartPractice(selectedSubject)}
            className="mt-6 w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Start Practice Drill</span>
            <span>🎯</span>
          </button>
        </div>
      </div>
    </div>
  );
};
