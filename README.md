<div align="center">

  # 🌴 Goa Government Exam Prep Studio 🚀
  ### *The Ultimate GPSC, GSSC, LDC, MTS & State Exam Preparation Platform*

  🌐 **Live Demo Application:**  
  ### 👉 [Goa Govt Exam Master - Aptitude & GK Quiz Studio](https://dr-week.github.io/GOA-EXAM-PREP-GAME/) 👈

  <br>

  [![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-10b981?style=for-the-badge&logo=github)](https://dr-week.github.io/GOA-EXAM-PREP-GAME/)
  [![GitHub Stars](https://img.shields.io/github/stars/dr-week/GOA-EXAM-PREP-GAME?style=for-the-badge&color=6366f1)](https://github.com/dr-week/GOA-EXAM-PREP-GAME)
  [![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)
  [![Questions Database](https://img.shields.io/badge/Questions-213%20Indexed-06b6d4?style=for-the-badge)](data/db_export.json)
  [![Android Ready](https://img.shields.io/badge/Android-Capacitor%20Ready-f59e0b?style=for-the-badge)](build_apk.bat)

  <p align="center">
    <strong>Sleek Glassmorphic Interface • 100-Question OMR Simulator • Brain Arcade Games • Modular ES Engine</strong>
  </p>

</div>

---

## 🌟 Overview

Welcome to **Goa Exam Prep Studio** — an interactive web and native mobile application designed specifically for aspirants preparing for **Goa Public Service Commission (GPSC)**, **Goa Staff Selection Commission (GSSC)**, **Lower Division Clerk (LDC)**, **Multi-Tasking Staff (MTS)**, and **Talathi** competitive examinations.

Experience the live app now at **[Goa Govt Exam Master - Aptitude & GK Quiz Studio](https://dr-week.github.io/GOA-EXAM-PREP-GAME/)**!

Built with **Zero-Dependency Vanilla Web Technologies (HTML5, Vanilla CSS Glassmorphism, Modular ES JS)**, this platform packs a **213+ Question Relational SQLite Database**, an **OMR Exam Simulator with 30-Minute Timer**, **Interactive Brain Training Arcade Games**, and an **Android Packaging Pipeline**!

---

## ⚡ Key Features

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FULL GOVT EXAM ARENA (OMR SIMULATOR)                                      │
│    • 100-Question interactive OMR palette grid with instant feedback        │
│    • 30-minute exam countdown timer with auto-submit guards                 │
│    • Double-Randomizer Engine (shuffles question order & A/B/C/D choices)   │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🧠 BRAIN ARCADE GAMES                                                       │
│    • 🃏 Memory Match: Sharpen visual memory with Goa landmarks & symbols     │
│    • ⚡ 60-Second Speed Math Trainer: Boost rapid quantitative calculations   │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📚 STRUCTURED MARKDOWN QUESTION BANKS & STUDY READER                         │
│    • 213+ curated questions categorized across 10 subject domains           │
│    • Real-time topbar search engine filtering questions & explanations      │
│    • LocalStorage bookmarking system for tricky questions revision          │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📱 NATIVE ANDROID MOBILE OPTIMIZATION                                       │
│    • Responsive 60fps glassmorphic UI with native bottom navigation bar    │
│    • Capacitor build scripts (`build_apk.bat` / `make_apk.py`) for APKs      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏝️ Subject Domains Covered (10 Modules)

| Icon | Topic Domain | Syllabus Details |
| :---: | :--- | :--- |
| 🏝️ | **Goa Special GK** | 1961 Liberation, 3 Districts Update (Kushavati HQ Quepem), Konkani Act 1987 |
| ⛰️ | **Geography & Ports** | Sonsogor Peak (1,166m), Zuari River, Mormugao Port, New Zuari Cable Bridge |
| 🎭 | **Culture & Schemes** | Shigmo Festival, Divar Bonderam, Griha Aadhar Scheme, Chikhal Kalo |
| 🚩 | **Freedom Struggle** | 1580 Cuncolim Revolt, 1787 Pinto Revolt, Dr. T.B. Cunha, Lohia 18 June 1946 |
| 📜 | **Konkani & RTI** | Devanagari Vocabulary, Goa RTI Act 30-day/48-hr timelines |
| 💻 | **Computer Awareness** | MS Office shortcuts, Goa Online e-Governance, Dharani Land Records |
| ⚖️ | **Goa Polity** | Article 371I, 40 Assembly Seats, 2 Lok Sabha Seats, Panchayati Raj |
| 🔢 | **Quantitative Aptitude** | Percentages, Profit/Loss, Speed/Distance, Simple & Compound Interest |
| 🧩 | **Logical Reasoning** | Coding-Decoding, Blood Relations, Number Series, Antonyms |
| 🔥 | **General Studies India** | 50 Master Questions on History, Science, Economics & National Geography |

---

## 🛠️ Automated Scripts & Developer Tools

| Command | Purpose |
| :--- | :--- |
| `python compile_db.py` | Compiles Markdown banks (`data/*.md`) into SQLite DB (`questions.db`) & JSON (`db_export.json`). |
| `python randomizer_engine.py` | Double-shuffles question sequence & choices into `randomized_mock_exam.md`. |
| `python test_ui_suite.py` | Runs end-to-end DOM structure & SQLite database integrity tests. |
| `python test_exam_hall.py` | Runs regression test preventing early exam completion bugs. |
| `python test_official_rules.py` | Validates 60fps hardware acceleration CSS & mobile media query breakpoints. |
| `.\build_apk.bat` | Packages the web application into a native Android `.apk` installer using Ionic Capacitor. |

---

## 🚀 Quick Start

### 🌐 Play Online (No Installation Required)
Launch the live application in any browser:  
👉 **[Goa Govt Exam Master - Aptitude & GK Quiz Studio](https://dr-week.github.io/GOA-EXAM-PREP-GAME/)**

### 1. Serve Locally
Simply start a lightweight Python web server:
```bash
python -m http.server 8000
```
Open **`http://localhost:8000`** in your browser!

### 2. Build Android APK
Ensure Node.js is installed, then run:
```bash
build_apk.bat
```

---

## 📜 Architecture & Codebase Design

The frontend is engineered with modular **ES Modules (`js/`)**:
```
govtexamtest/
├── index.html              # Main single-page application layout
├── style.css               # Dark-mode glassmorphic 60fps CSS design system
├── js/
│   ├── main.js             # Entry point & global window bindings
│   ├── state.js            # Reactive state store & XP progress
│   ├── db.js               # JSON database loader & shuffler logic
│   ├── exam.js             # OMR Exam Arena & 30-min countdown timer
│   ├── games.js            # Brain Arcade Memory Match & Speed Math
│   └── audio.js            # Web Audio API sound synthesizer
├── data/                   # 10 Subject Markdown Question Banks
├── compile_db.py           # SQLite database builder
└── randomizer_engine.py    # Randomized mock test generator
```

---

## 🔗 Integrated Open-Source Repositories

- **[ratneshmaurya/Aptitude_Practice_Questions](https://github.com/ratneshmaurya/Aptitude_Practice_Questions)** – Aptitude question banks.
- **[drsarveshwarbharti/Aptitude-For-Placements](https://github.com/drsarveshwarbharti/Aptitude-For-Placements)** – Placement quantitative logic.
- **[rohanmistry231/CSE-Aptitude-Test-Practice-Hub](https://github.com/rohanmistry231/CSE-Aptitude-Test-Practice-Hub)** – Difficulty-categorized sets.
- **[kubowania/memory-game](https://github.com/kubowania/memory-game)** – Memory card matching game pattern.
- **[ionic-team/capacitor](https://github.com/ionic-team/capacitor)** – Web-to-Native Android container framework.

---

<div align="center">
  <sub>Built for Goa competitive exam aspirants with ❤️</sub>
</div>
