// Exam Hall OMR Engine Module
import { state, addXP } from './state.js';
import { playSound } from './audio.js';
import { shuffleArray, shuffleOptionsAndAnswer } from './db.js';

export function startFullExamArena(catKey = null) {
  let sourceQuestions = state.allDatabaseQuestions;
  
  if (catKey && state.questionsData[catKey]) {
    sourceQuestions = state.questionsData[catKey];
    const topicElem = document.getElementById('current-quiz-topic');
    if (topicElem) topicElem.innerText = `Practice Mode: ${catKey.replace('_', ' ').toUpperCase()}`;
  } else {
    // Slice to exactly 100 questions for official exam mode if DB has more
    if (sourceQuestions.length > 100) {
      sourceQuestions = shuffleArray(sourceQuestions).slice(0, 100);
    }
    const topicElem = document.getElementById('current-quiz-topic');
    if (topicElem) topicElem.innerText = '🏛️ GPSC / GSSC Official Exam Hall (100 Qs)';
  }

  if (!sourceQuestions || sourceQuestions.length === 0) {
    console.warn("Source questions empty, waiting for DB...");
    return;
  }

  // Double-Randomize: Shuffle Question Sequence AND Option Positions (A/B/C/D)
  state.omrExamQuestions = shuffleArray(sourceQuestions).map(q => shuffleOptionsAndAnswer(q));
  state.omrCurrentIndex = 0;
  state.omrUserAnswers = {};
  state.lifelines.fiftyFifty = true;

  const btn50 = document.getElementById('btn-5050');
  if (btn50) {
    btn50.disabled = false;
    btn50.innerText = '🔥 50:50 Lifeline';
  }

  const modal = document.getElementById('exam-score-modal');
  if (modal) modal.classList.add('hidden');

  startExamTimer();
  renderOMRPalette();
  renderOMRQuestion();
}

export function startExamTimer() {
  if (state.examTimerInterval) clearInterval(state.examTimerInterval);
  state.examTimeLeft = 1800; // 30 minutes

  state.examTimerInterval = setInterval(() => {
    state.examTimeLeft--;
    const mins = Math.floor(state.examTimeLeft / 60);
    const secs = state.examTimeLeft % 60;
    const formattedTime = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

    const timerElem = document.getElementById('exam-timer');
    if (timerElem) {
      timerElem.innerText = `⏱️ Time Left: ${formattedTime}`;
    }

    if (state.examTimeLeft <= 0) {
      clearInterval(state.examTimerInterval);
      submitFullExam(true); // Silent auto-submit without prompt on timeout
    }
  }, 1000);
}

export function renderOMRPalette() {
  const grid = document.getElementById('omr-palette-grid');
  if (!grid) return;
  grid.innerHTML = '';

  state.omrExamQuestions.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = 'palette-btn';
    btn.id = `palette-btn-${idx}`;
    btn.innerText = idx + 1;
    if (state.omrUserAnswers[idx]) {
      btn.classList.add('answered');
    }
    btn.onclick = () => {
      state.omrCurrentIndex = idx;
      renderOMRQuestion();
    };
    grid.appendChild(btn);
  });
}

export function renderOMRQuestion() {
  const q = state.omrExamQuestions[state.omrCurrentIndex];
  if (!q) return;

  const qCurr = document.getElementById('omr-q-curr');
  const qTotal = document.getElementById('omr-q-total');
  const qText = document.getElementById('omr-q-text');

  if (qCurr) qCurr.innerText = state.omrCurrentIndex + 1;
  if (qTotal) qTotal.innerText = state.omrExamQuestions.length;
  if (qText) qText.innerText = q.question;

  const optsContainer = document.getElementById('omr-options-container');
  if (!optsContainer) return;
  optsContainer.innerHTML = '';

  const expBox = document.getElementById('omr-explanation-box');
  
  document.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('current'));
  const currPaletteBtn = document.getElementById(`palette-btn-${state.omrCurrentIndex}`);
  if (currPaletteBtn) currPaletteBtn.classList.add('current');

  const previousSelectedOpt = state.omrUserAnswers[state.omrCurrentIndex];

  if (previousSelectedOpt) {
    const expText = document.getElementById('omr-explanation-text');
    if (expText) expText.innerText = q.explanation;
    if (expBox) expBox.classList.remove('hidden');
  } else {
    if (expBox) expBox.classList.add('hidden');
  }

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerText = opt;

    const optLetter = opt.charAt(0);
    const correctLetter = q.answer.charAt(0);

    if (previousSelectedOpt) {
      btn.disabled = true;
      if (previousSelectedOpt === opt) {
        if (optLetter === correctLetter) {
          btn.classList.add('correct');
        } else {
          btn.classList.add('wrong');
        }
      } else if (optLetter === correctLetter) {
        btn.classList.add('correct');
      }
    }

    btn.onclick = () => selectOMRAnswer(opt, q, btn);
    optsContainer.appendChild(btn);
  });
}

export function selectOMRAnswer(selectedOpt, q, selectedBtn) {
  if (state.omrUserAnswers[state.omrCurrentIndex]) return;

  state.omrUserAnswers[state.omrCurrentIndex] = selectedOpt;

  const paletteBtn = document.getElementById(`palette-btn-${state.omrCurrentIndex}`);
  if (paletteBtn) paletteBtn.classList.add('answered');

  const selectedLetter = selectedOpt.charAt(0);
  const correctLetter = q.answer.charAt(0);

  const allBtns = document.querySelectorAll('#omr-options-container .opt-btn');
  allBtns.forEach(btn => btn.disabled = true);

  if (selectedLetter === correctLetter) {
    selectedBtn.classList.add('correct');
    playSound('correct');
    addXP(10);
  } else {
    selectedBtn.classList.add('wrong');
    playSound('wrong');
    allBtns.forEach(btn => {
      if (btn.innerText.startsWith(correctLetter)) {
        btn.classList.add('correct');
      }
    });
  }

  const expText = document.getElementById('omr-explanation-text');
  const expBox = document.getElementById('omr-explanation-box');
  if (expText) expText.innerText = q.explanation;
  if (expBox) expBox.classList.remove('hidden');

  // SILENT SELECTION: No popups after single questions. Advances via Next button or Palette.
}

export function useFiftyFifty() {
  if (!state.lifelines.fiftyFifty) return;
  
  const q = state.omrExamQuestions[state.omrCurrentIndex];
  if (!q || state.omrUserAnswers[state.omrCurrentIndex]) return;

  const correctLetter = q.answer.charAt(0);
  const allBtns = Array.from(document.querySelectorAll('#omr-options-container .opt-btn'));
  const wrongBtns = allBtns.filter(btn => !btn.innerText.startsWith(correctLetter));
  
  const shuffledWrong = shuffleArray(wrongBtns);
  if (shuffledWrong[0]) shuffledWrong[0].style.visibility = 'hidden';
  if (shuffledWrong[1]) shuffledWrong[1].style.visibility = 'hidden';

  state.lifelines.fiftyFifty = false;
  const btn50 = document.getElementById('btn-5050');
  if (btn50) {
    btn50.disabled = true;
    btn50.innerText = '🚫 50:50 Used';
  }
}

export function prevOMRQuestion() {
  if (state.omrCurrentIndex > 0) {
    state.omrCurrentIndex--;
    renderOMRQuestion();
  }
}

export function nextOMRQuestion() {
  if (state.omrCurrentIndex < state.omrExamQuestions.length - 1) {
    state.omrCurrentIndex++;
    renderOMRQuestion();
  }
}

export function submitFullExam(isTimeout = false) {
  if (state.examTimerInterval) clearInterval(state.examTimerInterval);

  let score = 0;
  let unattempted = 0;

  state.omrExamQuestions.forEach((q, idx) => {
    if (state.omrUserAnswers[idx]) {
      if (state.omrUserAnswers[idx].charAt(0) === q.answer.charAt(0)) {
        score++;
      }
    } else {
      unattempted++;
    }
  });

  const total = state.omrExamQuestions.length;
  const accuracy = Math.round((score / total) * 100);

  // Render score in smooth in-page UI card instead of annoying popup alert
  const modal = document.getElementById('exam-score-modal');
  const resScore = document.getElementById('res-score');
  const resTotal = document.getElementById('res-total');
  const resUnattempted = document.getElementById('res-unattempted');
  const resAccuracy = document.getElementById('res-accuracy');

  if (resScore) resScore.innerText = score;
  if (resTotal) resTotal.innerText = total;
  if (resUnattempted) resUnattempted.innerText = unattempted;
  if (resAccuracy) resAccuracy.innerText = `${accuracy}%`;

  if (modal) {
    modal.classList.remove('hidden');
    modal.scrollIntoView({ behavior: 'smooth' });
  }
}

export function closeResultModal() {
  const modal = document.getElementById('exam-score-modal');
  if (modal) modal.classList.add('hidden');
}
