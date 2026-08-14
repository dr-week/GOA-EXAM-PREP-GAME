import React from 'react';
import { Palmtree, Medal, Zap, Flame, Landmark, Brain, BookOpen, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  userXP: number;
  userStreak: number;
  userLevel: string;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  currentLang: string;
  onChangeLang: (lang: string) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userXP,
  userStreak,
  userLevel,
  isAudioOn,
  onToggleAudio,
  currentLang,
  onChangeLang,
  activeTab,
  onSelectTab,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090d16]/80 border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Title */}
        <div 
          onClick={() => onSelectTab('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Palmtree className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              Goa Exam <span className="text-indigo-400">Master</span>
            </h1>
            <p className="text-xs text-slate-400">GPSC, GSSC, LDC & State Prep Studio</p>
          </div>
        </div>

        {/* Stats & Nav Pills */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {/* Level & XP with Progress Bar */}
          <div className="flex flex-col gap-1 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-2xl text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 font-bold flex items-center gap-1">
                <Medal className="w-3.5 h-3.5" /> {userLevel}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-amber-400" /> {userXP} XP
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-orange-400 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-orange-400" /> {userStreak} Days
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/80">
              <div
                className="bg-gradient-to-r from-amber-500 to-indigo-500 h-full transition-all duration-500"
                style={{ width: `${Math.min((userXP / 500) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-full text-xs">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" /> Exam Studio
            </button>
            <button
              onClick={() => onSelectTab('arcade')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'arcade'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5" /> Brain Arcade
            </button>
            <button
              onClick={() => onSelectTab('revision')}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'revision'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Revision Bank
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={onToggleAudio}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="Toggle Sound Effects"
            >
              {isAudioOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Language Dropdown */}
            <select
              value={currentLang}
              onChange={(e) => onChangeLang(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="en">🇬🇧 ENG</option>
              <option value="gom">🇮🇳 Konkani (कोंकणी)</option>
              <option value="mr">🇮🇳 Marathi (मराठी)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
