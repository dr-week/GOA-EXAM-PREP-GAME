<div align="center">

  # 🌴 Goa Government Exam Prep Studio 🚀
  ### *The Ultimate GPSC, GSSC, LDC, MTS & State Exam Preparation Platform*

  🌐 **Live Demo Application:**  
  ### 👉 [Goa Govt Exam Master - Aptitude & GK Quiz Studio](https://dr-week.github.io/GOA-EXAM-PREP-GAME/) 👈

  <br>

  [![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-10b981?style=for-the-badge&logo=github)](https://dr-week.github.io/GOA-EXAM-PREP-GAME/)
  [![GitHub Stars](https://img.shields.io/github/stars/dr-week/GOA-EXAM-PREP-GAME?style=for-the-badge&color=6366f1)](https://github.com/dr-week/GOA-EXAM-PREP-GAME)
  [![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)
  [![Questions Database](https://img.shields.io/badge/Questions-226%20Indexed-06b6d4?style=for-the-badge)](data/db_export.json)
  [![Android Ready](https://img.shields.io/badge/Android-Capacitor%20Ready-f59e0b?style=for-the-badge)](build_apk.bat)

  <p align="center">
    <strong>Sleek Glassmorphic Interface • 100-Question OMR Simulator • Brain Arcade Games • Modular ES Engine</strong>
  </p>

</div>

---

## 🌟 Overview

Welcome to **Goa Exam Prep Studio** — an interactive web and native mobile application designed specifically for aspirants preparing for **Goa Public Service Commission (GPSC)**, **Goa Staff Selection Commission (GSSC)**, **Lower Division Clerk (LDC)**, **Multi-Tasking Staff (MTS)**, and **Talathi** competitive examinations.

Experience the live app now at **[Goa Govt Exam Master - Aptitude & GK Quiz Studio](https://dr-week.github.io/GOA-EXAM-PREP-GAME/)**!

Built with **Zero-Dependency Vanilla Web Technologies (HTML5, Vanilla CSS Glassmorphism, Modular ES JS)**, this platform packs a **226+ Question Relational SQLite Database**, an **OMR Exam Simulator with 30-Minute Timer**, **Interactive Brain Training Arcade Games**, and an **Android Packaging Pipeline**!

---

## ⚡ Key Features

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🏛️ FULL GOVT EXAM ARENA (OMR SIMULATOR)                                      │
│    • Standalone new-tab exam launcher (exam.html) for distraction-free tests│
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
│    • 226+ curated questions categorized across 13 subject domains           │
│    • Real-time search engine filtering questions & explanations             │
│    • LocalStorage bookmarking system for tricky questions revision          │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📱 NATIVE ANDROID MOBILE OPTIMIZATION                                       │
│    • Responsive 60fps glassmorphic UI with native bottom navigation bar    │
│    • Capacitor build scripts (`build_apk.bat` / `make_apk.py`) for APKs      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏝️ Subject Domains Covered (13 Question Banks)

| Icon | Topic Domain | Syllabus Details |
| :---: | :--- | :--- |
| 🆕 | **Goa Current Affairs 2026** | Kushavati 3rd District (HQ Quepem), ULLAS Literacy, Sukanya Scheme, Startup Policy |
| 🏝️ | **Goa Special GK** | 1961 Liberation, 3 Districts Update, Konkani Official Language Act 1987 |
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

## 🛠️ Automated Scripts & Quality Control Matrix

| Command | Purpose |
| :--- | :--- |
| `python src/manage_db.py audit` | Audits all Markdown banks for 0 duplicate questions & 0 formatting blunders. |
| `python src/manage_db.py compile` | Compiles Markdown banks (`data/*.md`) into SQLite DB (`questions.db`) & JSON (`db_export.json`). |
| `python src/manage_db.py seed-bulk` | Programmatically generates 500+ Goa Q&A into the database. |
| `python src/manage_db.py test` | Runs the full end-to-end Pytest suite verifying DB integrity and UI structure. |
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

The codebase has been refactored into a modern, modular structure, pivoting towards a React/Tailwind/Supabase ecosystem:
```text
govtexamtest/
├── /src                    # Source code for the backend and data pipelines
│   ├── manage_db.py        # The ONLY unified CLI tool for all database operations
│   ├── compile_db.py       # SQLite database builder
│   ├── deep_audit_md.py    # Automated Markdown blunder & duplicate detector
│   └── create_500_goa.py   # Bulk question generator
├── /tests                  # Pytest automated testing suite
│   ├── test_ui_suite.py
│   └── test_fast.py
├── /data                   # Subject Markdown Question Banks & Databases
│   ├── questions.db
│   └── db_export.json
├── /public                 # Frontend Web App assets (HTML/CSS/JS)
│   ├── index.html
│   └── /js                 # Modular ES JS Engine
└── build_apk.bat           # Capacitor APK build script
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
