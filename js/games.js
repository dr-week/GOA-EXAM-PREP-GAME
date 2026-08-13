// Brain Games Arcade Module
import { state, addXP } from './state.js';
import { playSound } from './audio.js';
import { shuffleArray } from './db.js';

const MEMORY_EMOJIS = ['🏝️', '🏝️', '🏛️', '🏛️', '🔢', '🔢', '🧩', '🧩', '📜', '📜', '💻', '💻', '🚩', '🚩', '🎭', '🎭'];

export function loadBrainGame(type) {
  document.querySelectorAll('#view-brain-games .btn-chip').forEach(b => b.classList.remove('active'));
  if (type === 'memory') {
    document.querySelector("#view-brain-games .btn-chip:nth-child(1)").classList.add('active');
    document.getElementById('game-memory-box').classList.remove('hidden');
    document.getElementById('game-speedmath-box').classList.add('hidden');
    initMemoryGame();
  } else {
    document.querySelector("#view-brain-games .btn-chip:nth-child(2)").classList.add('active');
    document.getElementById('game-memory-box').classList.add('hidden');
    document.getElementById('game-speedmath-box').classList.remove('hidden');
  }
}

export function initMemoryGame() {
  const grid = document.getElementById('memory-grid');
  if (!grid) return;
  grid.innerHTML = '';
  state.flippedCards = [];
  state.matchedPairs = 0;

  state.memoryCards = shuffleArray(MEMORY_EMOJIS);
  state.memoryCards.forEach((emoji, idx) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.index = idx;
    card.dataset.emoji = emoji;
    card.innerText = '❓';
    card.onclick = () => flipMemoryCard(card);
    grid.appendChild(card);
  });
}

export function flipMemoryCard(card) {
  if (state.flippedCards.length >= 2 || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  card.innerText = card.dataset.emoji;
  state.flippedCards.push(card);

  if (state.flippedCards.length === 2) {
    if (state.flippedCards[0].dataset.emoji === state.flippedCards[1].dataset.emoji) {
      playSound('correct');
      addXP(15);
      state.matchedPairs++;
      state.flippedCards = [];
      if (state.matchedPairs === 8) {
        alert('🎉 MEMORY GAME COMPLETE! +120 XP');
      }
    } else {
      playSound('wrong');
      setTimeout(() => {
        state.flippedCards[0].classList.remove('flipped');
        state.flippedCards[1].classList.remove('flipped');
        state.flippedCards[0].innerText = '❓';
        state.flippedCards[1].innerText = '❓';
        state.flippedCards = [];
      }, 800);
    }
  }
}

export function startSpeedMath() {
  state.mathScore = 0;
  state.mathTimeLeft = 60;
  document.getElementById('math-score-tag').innerText = `Score: ${state.mathScore}`;
  
  if (state.mathTimerInterval) clearInterval(state.mathTimerInterval);

  state.mathTimerInterval = setInterval(() => {
    state.mathTimeLeft--;
    document.getElementById('math-time-tag').innerText = `Time Left: ${state.mathTimeLeft}s`;
    if (state.mathTimeLeft <= 0) {
      clearInterval(state.mathTimerInterval);
      alert(`⏱️ TIME UP!\n\nYour Speed Math Score: ${state.mathScore} Correct Answers!`);
    }
  }, 1000);

  nextMathProblem();

  const input = document.getElementById('math-answer-input');
  if (input) {
    input.onkeyup = (e) => {
      if (parseInt(input.value) === state.currentMathProblem.answer) {
        playSound('correct');
        state.mathScore++;
        addXP(5);
        document.getElementById('math-score-tag').innerText = `Score: ${state.mathScore}`;
        input.value = '';
        nextMathProblem();
      }
    };
  }
}

export function nextMathProblem() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  const ops = ['+', '-', '*'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let ans = 0;
  if (op === '+') ans = num1 + num2;
  if (op === '-') ans = num1 - num2;
  if (op === '*') ans = num1 * num2;

  state.currentMathProblem = { answer: ans };
  const probElem = document.getElementById('math-problem');
  if (probElem) probElem.innerText = `${num1} ${op} ${num2} = ?`;
}
