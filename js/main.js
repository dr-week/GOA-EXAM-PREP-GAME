// Main Application Entry Point
import { state } from './state.js';
import { loadQuestionBanks } from './db.js';
import { startFullExamArena, prevOMRQuestion, nextOMRQuestion, submitFullExam, useFiftyFifty, closeResultModal } from './exam.js';
import { loadBrainGame, initMemoryGame, startSpeedMath } from './games.js';

// Expose navigation globally for HTML inline event handlers
window.switchTab = function(tabName) {
  document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));

  const activeNavs = document.querySelectorAll(`[data-tab="${tabName}"]`);
  const activeView = document.getElementById(`view-${tabName}`);

  activeNavs.forEach(n => n.classList.add('active'));
  if (activeView) activeView.classList.add('active');

  if (tabName === 'exam-studio') {
    window.exitExamArenaView();
  } else if (tabName === 'brain-games') {
    initMemoryGame();
  } else if (tabName === 'revision-bank') {
    loadMDFile('goa_current_affairs_2026', document.querySelector('.btn-chip'));
    renderBookmarks();
  }
};

// Opens Official Exam Arena in a NEW Window / Tab cleanly
window.launchExamArenaView = function(catKey = null) {
  const url = catKey ? `exam.html?cat=${catKey}` : 'exam.html';
  window.open(url, '_blank');
};

window.exitExamArenaView = function() {
  const launchScreen = document.getElementById('exam-launch-screen');
  const activeContainer = document.getElementById('active-exam-container');
  const modal = document.getElementById('exam-score-modal');

  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
  if (activeContainer) {
    activeContainer.classList.add('hidden');
    activeContainer.style.display = 'none';
  }
  if (launchScreen) {
    launchScreen.classList.remove('hidden');
    launchScreen.style.display = 'block';
  }

  if (state.examTimerInterval) clearInterval(state.examTimerInterval);
};

window.startCategoryQuiz = function(catKey) {
  window.launchExamArenaView(catKey);
};

window.launchSelectedPractice = function() {
  const selectElem = document.getElementById('practice-subject-select');
  if (!selectElem) return;
  const selectedCat = selectElem.value;
  window.startCategoryQuiz(selectedCat);
};

window.prevOMRQuestion = prevOMRQuestion;
window.nextOMRQuestion = nextOMRQuestion;
window.submitFullExam = submitFullExam;
window.useFiftyFifty = useFiftyFifty;
window.closeResultModal = closeResultModal;

window.loadBrainGame = function(gameType, btnElem = null) {
  if (btnElem) {
    document.querySelectorAll('#view-brain-games .btn-chip').forEach(b => b.classList.remove('active'));
    btnElem.classList.add('active');
  }
  loadBrainGame(gameType);
};

window.initMemoryGame = initMemoryGame;
window.startSpeedMath = startSpeedMath;
window.startFullExamArena = startFullExamArena;

// Audio Mute/Unmute Toggle Engine
window.toggleAudioMute = function() {
  const isMuted = localStorage.getItem('audioMuted') === 'true';
  const newMuteState = !isMuted;
  localStorage.setItem('audioMuted', newMuteState);
  updateAudioToggleButton(newMuteState);
};

function updateAudioToggleButton(isMuted) {
  const btn = document.getElementById('btn-audio-toggle');
  if (!btn) return;
  if (isMuted) {
    btn.innerText = '🔇 Audio OFF';
    btn.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    btn.style.color = '#fca5a5';
  } else {
    btn.innerText = '🔊 Audio ON';
    btn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    btn.style.color = '#6ee7b7';
  }
}

// Global Search Filter Logic for Study Notes & Questions
window.filterGlobalSearch = function(query) {
  const q = query.toLowerCase().trim();
  if (!q) return;

  window.switchTab('revision-bank');
  const viewer = document.getElementById('md-viewer-content');
  if (!viewer) return;

  const matches = state.allDatabaseQuestions.filter(item => 
    item.question.toLowerCase().includes(q) || 
    item.explanation.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    viewer.innerHTML = `<p style="color:var(--text-muted);">No matching questions found for "${query}". Try searching "Goa", "River", or "Percentage".</p>`;
    return;
  }

  viewer.innerHTML = `<h3>🔍 Search Results for "${query}" (${matches.length} matches found)</h3><br>` + 
    matches.map((m, idx) => `
      <div class="repo-card" style="margin-bottom:1.25rem;">
        <h4>${idx+1}. ${m.question}</h4>
        <p style="color:#10b981; font-weight:600; margin:0.5rem 0;">Correct Answer: ${m.answer}</p>
        <p style="font-size:0.9rem; color:var(--text-muted);">${m.explanation}</p>
      </div>
    `).join('');
};

window.loadMDFile = async function(catKey, btnElem = null) {
  if (btnElem) {
    document.querySelectorAll('#view-revision-bank .btn-chip').forEach(b => b.classList.remove('active'));
    btnElem.classList.add('active');
  }

  const viewer = document.getElementById('md-viewer-content');
  if (!viewer) return;
  viewer.innerHTML = '<p>Loading markdown notes...</p>';

  try {
    const res = await fetch(`data/${catKey}.md?v=` + Date.now());
    const text = await res.text();
    let html = text
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$2</h2>')
      .replace(/^### (.*$)/gim, '<h3>$3</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\n\n/gim, '<br><br>');

    viewer.innerHTML = html;
  } catch (err) {
    viewer.innerHTML = '<p>Failed to load study notes.</p>';
  }
};

window.renderBookmarks = function() {
  const container = document.getElementById('bookmarks-list');
  if (!container) return;
  if (state.bookmarks.length === 0) {
    container.innerHTML = '<p class="empty-state">No bookmarked questions yet. Click 🔖 during a test to save tricky questions!</p>';
    return;
  }

  container.innerHTML = state.bookmarks.map((b, i) => `
    <div class="repo-card" style="margin-bottom:1rem;">
      <h4>Q${i+1}: ${b.question}</h4>
      <p style="color:#10b981; font-weight:600;">Answer: ${b.answer}</p>
      <p><em>${b.explanation}</em></p>
    </div>
  `).join('');
};

// Event Listeners Initialization
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      window.switchTab(tabName);
    });
  });

  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        window.filterGlobalSearch(searchInput.value);
      }
    });
  }

  const initialMuteState = localStorage.getItem('audioMuted') === 'true';
  updateAudioToggleButton(initialMuteState);

  loadQuestionBanks();
});
