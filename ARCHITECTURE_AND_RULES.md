# 🎯 Goa Exam Prep - Architecture Rules & Modular Coding Guidelines

This document outlines the strict modular architecture rules and skill guidelines for maintaining the **Goa Exam Prep Codebase**.

---

## 🏗️ 1. ES Module Architecture (`js/`)

The JavaScript codebase is split into 5 clean, decoupled ES Modules under [`js/`](file:///d:/CODES/busy/govtexamtest/js/):

| Module File | Responsibility | Exports / Imports |
|---|---|---|
| **[`js/state.js`](file:///d:/CODES/busy/govtexamtest/js/state.js)** | Central reactive state store, XP level calculation, localStorage persistence. | `state`, `addXP()`, `updateXPDisplay()` |
| **[`js/audio.js`](file:///d:/CODES/busy/govtexamtest/js/audio.js)** | Web Audio API sound synthesis (`correct` & `wrong` chimes). | `playSound()` |
| **[`js/db.js`](file:///d:/CODES/busy/govtexamtest/js/db.js)** | `db_export.json` loader, Fisher-Yates array randomizer & option text shuffler. | `loadQuestionBanks()`, `shuffleArray()`, `shuffleOptionsAndAnswer()` |
| **[`js/exam.js`](file:///d:/CODES/busy/govtexamtest/js/exam.js)** | Unified OMR Exam Hall, 30-min countdown timer, palette rendering, option locks. | `startFullExamArena()`, `renderOMRQuestion()`, `submitFullExam()` |
| **[`js/games.js`](file:///d:/CODES/busy/govtexamtest/js/games.js)** | Brain Arcade games (Memory Match card flip & 60-Sec Speed Math trainer). | `loadBrainGame()`, `initMemoryGame()`, `startSpeedMath()` |
| **[`js/main.js`](file:///d:/CODES/busy/govtexamtest/js/main.js)** | Main ES module entry point registering global window handlers & DOM listeners. | Primary Entry Point |

---

## 📜 2. Coding Rules & Best Practices

1. **No Monolithic Files**: Never add game logic or exam timer code directly to a single `app.js` file. Place features into their respective domain modules under `js/`.
2. **State Isolation**: All global counters (`userXP`, `userStreak`, `omrUserAnswers`) must be mutated via `js/state.js`.
3. **No Direct DOM Polling in Loops**: Use event-driven DOM updates and explicit functions.
4. **Hardware Acceleration**: Always use GPU-accelerated CSS properties (`transform`, `opacity`, `will-change`) for 60fps animations in `style.css`.
5. **Mandatory Automated Test Verification**: Any code modification must be verified by running `python test_ui_suite.py` and `python test_exam_hall.py`.

---

## 🛠️ 3. Development Skill Commands

| Action | Command | Skill Description |
|---|---|---|
| **Run Fast Syntax Test** | `python test_fast.py` | Validates syntax and duplicate detection across all 12 Markdown question banks. |
| **Run UI & DOM Suite** | `python test_ui_suite.py` | Runs end-to-end headless DOM and database integrity tests. |
| **Run Exam Hall Test** | `python test_exam_hall.py` | Prevents regression bugs causing early exam termination. |
| **Run Exam Rules Test** | `python test_official_rules.py` | Verifies hardware acceleration & mobile responsive breakpoints. |
| **Recompile SQLite DB** | `python compile_db.py` | Re-indexes `data/*.md` into `data/questions.db` & `data/db_export.json`. |
| **Run Double-Randomizer** | `python randomizer_engine.py` | Generates randomized mock paper `data/randomized_mock_exam.md`. |
