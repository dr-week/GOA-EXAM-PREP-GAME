# 🎨 Goa Exam Prep Platform - Design Guidelines, System Rules & GitHub Repositories

This document serves as the master specification for UI design standards, architectural guidelines, and recommended open-source GitHub repositories integrated into the **Goa Government Exam Prep Studio**.

---

## 🎨 1. Design Aesthetics & UI System

### 💎 Color System (Dark Mode Glassmorphism)
- **Background Main**: `#090d16` (Deep Space Dark)
- **Sidebar Surface**: `#0f172a` (Slate Dark)
- **Card Surface**: `#1e293b` (Elevated Card Layer)
- **Card Surface Hover**: `#26334d` (Active Hover Accent)
- **Primary Accent Gradient**: `linear-gradient(135deg, #6366f1 0%, #a855f7 100%)` (Indigo-Purple)
- **Cyan Accent Tag**: `#06b6d4`
- **Amber Streak**: `#f59e0b`
- **Success State**: `#10b981` (Emerald Green)
- **Error State**: `#ef4444` (Coral Red)

### 🔤 Typography & Hierarchy
- **Primary Headings**: `Outfit`, sans-serif (Weights: 600, 700)
- **Body Text**: `Plus Jakarta Sans`, sans-serif (Weights: 400, 500, 600)
- **Base Font Size**: `16px`, Line Height: `1.65`

### 📐 Layout Architecture & Responsive Breakpoints
1. **Fixed Sidebar (`260px`)**: Stays pinned during scroll; holds brand identity, main 5 navigation tabs, XP level progress bar, and daily streak badge.
2. **Main Canvas (`margin-left: 260px`)**: Topbar search input + GitHub pills + Streamlined 5 Tab Views.
3. **Responsive Breakpoint (`<= 900px`)**: Sidebar shifts to top navigation and OMR palette expands to a 10-column touch ribbon.

---

## 📜 2. Automated Test Suite Specifications & Rules

The project incorporates 5 automated testing and verification scripts:

1. **[`test_official_rules.py`](file:///d:/CODES/busy/govtexamtest/test_official_rules.py)**:
   - Verifies 60fps hardware acceleration (`will-change`) and mobile responsive breakpoints.
2. **[`test_exam_hall.py`](file:///d:/CODES/busy/govtexamtest/test_exam_hall.py)**:
   - Verifies multi-question navigation and ensures answering Question 1 does NOT trigger early test submission.
3. **[`test_ui_suite.py`](file:///d:/CODES/busy/govtexamtest/test_ui_suite.py)**:
   - SQLite DB integrity, web JSON export, DOM elements verification.
4. **[`test_fast.py`](file:///d:/CODES/busy/govtexamtest/test_fast.py)**:
   - Syntax validation and duplicate detection across all 12 Markdown banks.
5. **[`reason_knowledge.py`](file:///d:/CODES/busy/govtexamtest/reason_knowledge.py)**:
   - Verifies and logs official government sources in `knowledge_sources.json`.

---

## 🔗 3. Curated Open-Source GitHub Repositories

Below is the complete list of open-source GitHub repositories integrated into the platform:

### 📚 Aptitude & Exam Question Banks
1. **[ratneshmaurya/Aptitude_Practice_Questions](https://github.com/ratneshmaurya/Aptitude_Practice_Questions)**: Markdown question bank covering foundational math.
2. **[drsarveshwarbharti/Aptitude-For-Placements](https://github.com/drsarveshwarbharti/Aptitude-For-Placements)**: Quantitative & Logical collections.
3. **[rohanmistry231/CSE-Aptitude-Test-Practice-Hub](https://github.com/rohanmistry231/CSE-Aptitude-Test-Practice-Hub)**: Categorized aptitude test practice questions.

### 🎮 Open-Source Brain Games & Utilities
4. **[kubowania/memory-game](https://github.com/kubowania/memory-game)**: Vanilla JS memory matching card game logic.
5. **[Khazri71/HTML5-CSS3-JS-Memory-Game](https://github.com/Khazri71/HTML5-CSS3-JS-Memory-Game)**: Card flip animations and game state management.
6. **[bonartm/quizdown-js](https://github.com/bonartm/quizdown-js)**: Markdown-to-quiz instant rendering engine.

### 📱 Android APK Build & Automation Tools
7. **[ionic-team/capacitor](https://github.com/ionic-team/capacitor)**: Framework used in `build_apk.bat` & `make_apk.py`.
8. **[darkshredder/web-to-app-action](https://github.com/darkshredder/web-to-app-action)**: GitHub Marketplace Action for cloud APK building.
