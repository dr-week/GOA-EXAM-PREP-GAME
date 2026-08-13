// State & Storage Manager Module
export const state = {
  questionsData: {},
  allDatabaseQuestions: [],
  currentCategory: 'goa_special_gk',
  currentQuestionIndex: 0,
  omrExamQuestions: [],
  omrCurrentIndex: 0,
  omrUserAnswers: {},
  examTimeLeft: 1800,
  examTimerInterval: null,
  memoryCards: [],
  flippedCards: [],
  matchedPairs: 0,
  mathScore: 0,
  mathTimeLeft: 60,
  mathTimerInterval: null,
  currentMathProblem: {},
  userXP: parseInt(localStorage.getItem('userXP') || '0'),
  userLevel: 1,
  userStreak: parseInt(localStorage.getItem('userStreak') || '1'),
  bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
  lifelines: { fiftyFifty: true }
};

state.userLevel = Math.floor(state.userXP / 100) + 1;

export function addXP(amount) {
  state.userXP += amount;
  state.userLevel = Math.floor(state.userXP / 100) + 1;
  localStorage.setItem('userXP', state.userXP);
  updateXPDisplay();
}

export function updateXPDisplay() {
  const xpElem = document.getElementById('user-xp');
  const lvlElem = document.getElementById('user-level');
  const streakElem = document.getElementById('user-streak');
  const progElem = document.getElementById('xp-progress');

  if (xpElem) xpElem.innerText = state.userXP;
  if (lvlElem) lvlElem.innerText = state.userLevel;
  if (streakElem) streakElem.innerText = state.userStreak;
  if (progElem) progElem.style.width = `${state.userXP % 100}%`;
}
