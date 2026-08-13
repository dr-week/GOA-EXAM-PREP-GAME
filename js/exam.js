// Exam Hall OMR Engine Module
import { state, addXP } from './state.js';
import { playSound } from './audio.js';
import { shuffleArray, shuffleOptionsAndAnswer, loadQuestionBanks } from './db.js';

export function startFullExamArena(catKey = null) {
  let sourceQuestions = state.allDatabaseQuestions;
  
  if (catKey && state.questionsData[catKey]) {
    sourceQuestions = state.questionsData[catKey];
    const topicElem = document.getElementById('current-quiz-topic');
    if (topicElem) topicElem.innerText = `Practice Mode: ${catKey.replace('_', ' ').toUpperCase()}`;
  } else {
    const topicElem = document.getElementById('current-quiz-topic');
    if (topicElem) topicElem.innerText = '🏛️ GPSC / GSSC Official Exam Hall';
  }

  if (!sourceQuestions || sourceQuestions.length === 0) {
    console.warn("Source questions empty, waiting for DB...");
    return;
  }

  state.omrExamQuestions = shuffleArray(sourceQuestions).map(q => shuffleOptionsAndAnswer(q));
  state.omrCurrentIndex = 0;
  state.omrUserAnswers = {};
  state.lifelines.fiftyFifty = true;

  const btn50 = document.getElementById('btn-5050');
  if (btn50) {
    btn50.disabled = false;
    btn50.innerText = '🔥 50:50 Lifeline';
  }

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
      alert('⏱️ TIME EXPIRED! Auto-submitting your exam paper now.');
      submitFullExam();
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
  } else {
    if (confirm("You have reached the last question. Would you like to finish and submit your exam paper?")) {
      submitFullExam();
    }
  }
}

export function submitFullExam() {
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

  alert(`🏆 EXAM SUBMITTED!\n\nScore: ${score} / ${total}\nUnattempted: ${unattempted}\nAccuracy: ${accuracy}%`);
  window.switchTab('dashboard');
}
