# 🎯 Goa Exam Prep - Architecture Rules & Modern Tech Stack Guidelines

This document outlines the strict modular architecture rules and skill guidelines for maintaining the **Goa Exam Prep Codebase**. The project is migrating to a modern, scalable, production-grade tech stack.

---

## 🏗️ 1. Modern Technology Stack (React, Tailwind, Supabase)

The codebase has pivoted from Vanilla HTML/JS/CSS to a modern component-based architecture:

| Layer | Recommended Technology | Responsibility |
|---|---|---|
| **Frontend Framework** | **React (via Vite) / Next.js** | Replaces Vanilla HTML/JS. Uses reusable functional components and hooks for state management. |
| **Styling Engine** | **Tailwind CSS + shadcn/ui** | Replaces massive `style.css`. Uses utility-first CSS and pre-built components for fast, glassmorphic UI development. |
| **Backend & Database** | **Supabase (PostgreSQL)** | Replaces local SQLite (`questions.db`). Provides real-time database, user authentication (cloud saves), and API endpoints. |
| **Type Safety** | **TypeScript** | Replaces vanilla JavaScript. Ensures robust type-checking across 2,500+ questions. |

---

## 📜 2. Coding Rules & Best Practices

1. **Component-Based Architecture**: Never use monolithic files. UI elements (Timers, Question Cards, Modals) must be broken down into separate React components (e.g., `<ExamTimer />`, `<QuestionCard />`).
2. **State Management**: Use React Context or Zustand for global state (User XP, Streak, Current Exam State) instead of manual DOM mutations.
3. **API Integration**: All database fetches must go through the Supabase Client. No static JSON bundle loading for dynamic data.
4. **Tailwind First**: Do not write custom CSS unless absolutely necessary for complex animations (Framer Motion is preferred). Use Tailwind utility classes.
5. **Mandatory Automated Test Verification**: Any code modification must be verified by running the test suite (`python src/manage_db.py test`).

---

## 🛠️ 3. Development Skill Commands

The Python backend is maintained strictly as a CLI tool (`manage_db.py`) for data generation and pipeline management.

| Action | Command | Description |
|---|---|---|
| **Recompile SQLite DB** | `python src/manage_db.py compile` | Re-indexes `data/*.md` into `data/questions.db` & JSON. |
| **Run Audit Suite** | `python src/manage_db.py audit` | Validates syntax and duplicate detection across all Markdown banks. |
| **Seed Bulk Q&A** | `python src/manage_db.py seed-bulk` | Programmatically generates 500+ Goa Q&A. |
| **Run Full Test Suite** | `python src/manage_db.py test` | Runs end-to-end Pytest suite in `/tests`. |
