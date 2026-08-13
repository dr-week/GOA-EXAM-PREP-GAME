// Database & Question Fetcher Module
import { state, updateXPDisplay } from './state.js';

export async function loadQuestionBanks() {
  try {
    const res = await fetch(`data/db_export.json?v=` + Date.now());
    const records = await res.json();
    
    state.allDatabaseQuestions = records;
    state.questionsData = {};

    records.forEach(q => {
      if (!state.questionsData[q.category]) {
        state.questionsData[q.category] = [];
      }
      state.questionsData[q.category].push({
        id: q.id,
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation
      });
    });

    console.log("✅ Modular DB Engine Loaded. Total Questions Indexed:", records.length);
  } catch (err) {
    console.error("Failed to load database bundle", err);
  }

  updateXPDisplay();
}

export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function shuffleOptionsAndAnswer(questionObj) {
  const originalOptions = questionObj.options.map(opt => opt.replace(/^[A-D]\)\s*/, ''));
  const correctText = questionObj.answer.replace(/^[A-D]\)\s*/, '');

  const shuffledTexts = shuffleArray(originalOptions);
  const letters = ['A', 'B', 'C', 'D'];
  const newOptions = [];
  let newAnswer = '';

  shuffledTexts.forEach((text, idx) => {
    const formattedOpt = `${letters[idx]}) ${text}`;
    newOptions.push(formattedOpt);
    if (text === correctText) {
      newAnswer = formattedOpt;
    }
  });

  return {
    ...questionObj,
    options: newOptions,
    answer: newAnswer
  };
}
