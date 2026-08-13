# 🎨 Goa Exam Prep Platform - Master Design Guidelines, Architectural Rules & Repository Index

This document serves as the master specification for UI design standards, mobile responsiveness rules, architectural guidelines, and integrated open-source GitHub repositories for **Goa Government Exam Prep Studio**.

---

## 🛡️ Master Development Rules & Non-Destructive Principles

### Rule 1: Zero-Data Loss Policy
- **No Question Bank Deletions**: All 13 Markdown question banks in `data/*.md` (226+ indexed questions) must be preserved.
- **Relational DB Synchronization**: The SQLite database (`data/questions.db`) and web bundle (`data/db_export.json`) are automatically recompiled using `python compile_db.py`.

### Rule 2: Non-Destructive UI Refactoring
- Refactoring UI layouts must never delete underlying engine capabilities:
  - OMR Palette Grid & 30-Minute Exam Timer.
  - 50:50 Lifeline & In-Page Result Modal.
  - Global Audio Toggle (`🔊 Audio ON` / `🔇 Audio OFF`).
  - Brain Training Arcade (Memory Match & Speed Math).
  - Revision Bank Markdown Viewer, Instant Search, and LocalStorage Bookmarks.

### Rule 3: Phone-First Mobile UI Architecture
- **Desktop Layout (`> 900px`)**: Fixed 280px left sidebar, topbar header, multi-column card grids.
- **Phone Layout (`<= 900px`)**:
  - Desktop sidebar hidden completely (`display: none !important`).
  - Main canvas margin reset to zero (`margin-left: 0 !important; width: 100vw !important`).
  - Top sticky header displaying logo, Level, and Streak.
  - Fixed 60px bottom navigation bar for 1-tap switching between Studio, Arcade, and Revision tabs.
  - All touch targets (buttons, dropdowns) sized to minimum 48px height.

---

## 🎨 Design System & Visual Specification

### 💎 Dark Mode Glassmorphism Color Palette
- **Primary Background**: `#090d16` (Deep Space Dark)
- **Sidebar & Nav Bar Surface**: `#0f172a` (Slate Dark)
- **Card Container Surface**: `#1e293b` (Elevated Card Layer)
- **Card Active Border**: `#3b82f6` (Accent Indigo)
- **Primary Action Gradient**: `linear-gradient(135deg, #6366f1 0%, #a855f7 100%)`
- **Cyan Accent**: `#06b6d4`
- **Amber Streak**: `#f59e0b`
- **Success Emerald**: `#10b981`
- **Error Coral**: `#ef4444`

### 🔤 Typography
- **Headings**: `Outfit`, sans-serif (Weights: 600, 700)
- **Body**: `Plus Jakarta Sans`, sans-serif (Weights: 400, 500, 600)
- **Base Size**: `16px`, Line Height: `1.65`

---

## 🔗 Integrated Open-Source GitHub Repositories

1. **[ratneshmaurya/Aptitude_Practice_Questions](https://github.com/ratneshmaurya/Aptitude_Practice_Questions)** – Aptitude question banks.
2. **[drsarveshwarbharti/Aptitude-For-Placements](https://github.com/drsarveshwarbharti/Aptitude-For-Placements)** – Placement quantitative logic.
3. **[rohanmistry231/CSE-Aptitude-Test-Practice-Hub](https://github.com/rohanmistry231/CSE-Aptitude-Test-Practice-Hub)** – Difficulty-categorized sets.
4. **[kubowania/memory-game](https://github.com/kubowania/memory-game)** – Memory card matching game pattern.
5. **[ionic-team/capacitor](https://github.com/ionic-team/capacitor)** – Web-to-Native Android container framework.
