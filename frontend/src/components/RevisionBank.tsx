import React, { useState } from 'react';
import type { Question } from '../types';

interface RevisionBankProps {
  questions: Question[];
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const RevisionBank: React.FC<RevisionBankProps> = ({
  questions,
  bookmarks,
  onToggleBookmark,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [viewBookmarksOnly, setViewBookmarksOnly] = useState<boolean>(false);

  const subjects = ['all', ...Array.from(new Set(questions.map((q) => q.subject || q.category || 'general')))];

  const filteredQuestions = questions.filter((q) => {
    const subjName = q.subject || q.category || 'general';
    const matchesSearch =
      (q.question || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.explanation || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || subjName === selectedSubject;
    const matchesBookmark = !viewBookmarksOnly || bookmarks.includes(q.id);
    return matchesSearch && matchesSubject && matchesBookmark;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>📚 Revision & Notes Bank</span>
          </h2>
          <p className="text-xs text-slate-400">
            Instant search across {questions.length} indexed questions & detailed explanations.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="relative max-w-md w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keywords (e.g. Zuari, Mandovi, 1961)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips & Bookmarks Button */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setViewBookmarksOnly(!viewBookmarksOnly)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
            viewBookmarksOnly
              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          🔖 Saved Bookmarks ({bookmarks.length})
        </button>

        <div className="h-4 w-[1px] bg-slate-800 mx-1" />

        {subjects.slice(0, 10).map((subj) => (
          <button
            key={subj}
            onClick={() => {
              setSelectedSubject(subj);
              setViewBookmarksOnly(false);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedSubject === subj && !viewBookmarksOnly
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {subj === 'all' ? '🌐 All Subjects' : subj.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-xs text-slate-400">
        Showing <strong className="text-indigo-400">{filteredQuestions.length}</strong> matching questions:
      </div>

      {/* Questions Card List */}
      <div className="space-y-4">
        {filteredQuestions.slice(0, 20).map((q, idx) => {
          const isBookmarked = bookmarks.includes(q.id);

          return (
            <div
              key={q.id || idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-indigo-400 font-medium">
                  {q.subject}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-semibold">Correct: {q.answer}</span>
                  <button
                    onClick={() => onToggleBookmark(q.id)}
                    className={`text-sm ${isBookmarked ? 'text-amber-400' : 'text-slate-600 hover:text-slate-300'}`}
                  >
                    🔖
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-white leading-relaxed">{q.question}</h4>

              {/* Explanation Box */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                <strong className="text-indigo-300">Explanation: </strong>
                {q.explanation}
              </div>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="text-center text-xs text-slate-500 py-8">
            No matching questions found. Try refining your search query!
          </div>
        )}
      </div>

      {/* Phased Roadmap Section */}
      <div className="pt-8 border-t border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>🚀 Official Phased Feature Update Roadmap</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-indigo-400">Phase 1</span>
            <h4 className="text-xs font-bold text-white">Audio Mute & 60fps Acceleration</h4>
            <p className="text-[11px] text-slate-400">Global Web Audio API synthesizer with GPU layer acceleration.</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-purple-400">Phase 2</span>
            <h4 className="text-xs font-bold text-white">Visual Score Analytics</h4>
            <p className="text-[11px] text-slate-400">Zero-dependency SVG accuracy bar charts tracking performance.</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-amber-400">Phase 3</span>
            <h4 className="text-xs font-bold text-white">Automated Gazette Scraping</h4>
            <p className="text-[11px] text-slate-400">Python scraper fetching live GPSC recruitment notices.</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Phase 4</span>
            <h4 className="text-xs font-bold text-white">Cloud Mobile APK CI/CD</h4>
            <p className="text-[11px] text-slate-400">Automated GitHub Actions pipeline building native Android APKs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
