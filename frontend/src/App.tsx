import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { ExamArena } from './components/ExamArena';
import { BrainArcade } from './components/BrainArcade';
import { RevisionBank } from './components/RevisionBank';
import { BottomNav } from './components/BottomNav';
import { ScoreModal } from './components/ScoreModal';
import type { Question } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);

  const [userXP, setUserXP] = useState<number>(0);
  const [userStreak] = useState<number>(1);
  const [userLevel, setUserLevel] = useState<string>('Novice Aspirant');
  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);
  const [currentLang, setCurrentLang] = useState<string>('en');

  // Score Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    score: number;
    total: number;
    gainedXP: number;
  }>({
    isOpen: false,
    score: 0,
    total: 0,
    gainedXP: 0,
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjectKeys, setSubjectKeys] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Load questions directly from public/db_export.json
  useEffect(() => {
    fetch('/db_export.json')
      .then((res) => res.json())
      .then((data: Question[]) => {
        setQuestions(data);
        const keys = Array.from(new Set(data.map((q) => q.subject || q.category || 'general')));
        setSubjectKeys(keys);
      })
      .catch((err) => console.error('Failed to load questions:', err));
  }, []);

  // Update Level based on XP
  useEffect(() => {
    if (userXP > 500) setUserLevel('GPSC Master');
    else if (userXP > 200) setUserLevel('Senior Scholar');
    else if (userXP > 50) setUserLevel('Focused Cadet');
    else setUserLevel('Novice Aspirant');
  }, [userXP]);

  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleStartFullExam = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, 100);
    setActiveQuestions(shuffled);
    setIsExamActive(true);
  };

  const handleStartPractice = (subject: string) => {
    const filtered = questions.filter((q) => q.subject === subject);
    setActiveQuestions(filtered.length > 0 ? filtered : questions.slice(0, 30));
    setIsExamActive(true);
  };

  const handleFinishExam = (score: number, total: number) => {
    const gainedXP = score * 10;
    setUserXP((prev) => prev + gainedXP);
    setIsExamActive(false);
    setModalState({
      isOpen: true,
      score,
      total,
      gainedXP,
    });
  };

  if (isExamActive) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
        <ExamArena
          questions={activeQuestions}
          onExit={() => setIsExamActive(false)}
          onFinishExam={handleFinishExam}
          isMuted={!isAudioOn}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16 md:pb-0">
      {/* Score Modal */}
      {modalState.isOpen && (
        <ScoreModal
          score={modalState.score}
          total={modalState.total}
          gainedXP={modalState.gainedXP}
          onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        />
      )}

      {/* Top Navigation */}
      <Navbar
        userXP={userXP}
        userStreak={userStreak}
        userLevel={userLevel}
        isAudioOn={isAudioOn}
        onToggleAudio={() => setIsAudioOn(!isAudioOn)}
        currentLang={currentLang}
        onChangeLang={(lang) => setCurrentLang(lang)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      {/* Main Views */}
      <main className="pb-12">
        {activeTab === 'dashboard' && (
          <Home
            onStartFullExam={handleStartFullExam}
            onStartPractice={handleStartPractice}
            subjectKeys={subjectKeys}
          />
        )}

        {activeTab === 'arcade' && <BrainArcade />}

        {activeTab === 'revision' && (
          <RevisionBank
            questions={questions}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
    </div>
  );
}

export default App;
