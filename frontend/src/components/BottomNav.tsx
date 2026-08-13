import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#090d16]/90 border-t border-slate-800 px-6 py-2 flex items-center justify-around">
      <button
        onClick={() => onSelectTab('dashboard')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          activeTab === 'dashboard' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        <span className="text-lg">📊</span>
        <span className="text-[10px] font-bold">Studio</span>
      </button>

      <button
        onClick={() => onSelectTab('arcade')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          activeTab === 'arcade' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        <span className="text-lg">🧠</span>
        <span className="text-[10px] font-bold">Arcade</span>
      </button>

      <button
        onClick={() => onSelectTab('revision')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          activeTab === 'revision' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        <span className="text-lg">📚</span>
        <span className="text-[10px] font-bold">Revision</span>
      </button>
    </nav>
  );
};
