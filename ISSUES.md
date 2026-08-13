# 🐛 Issues, Bug Log & Fix Record

This document records identified bugs, root causes, regression tests, and resolutions across the **Goa Exam Prep Studio**.

---

## 🛑 Bug #1: Official Exam Hall Completes Early After 1 Question

### 📌 Problem Description
In the Official Exam Hall (OMR mode), answering Question 1 caused the exam to immediately end/reset instead of allowing the user to navigate through all 100 questions.

### 🔬 Root Cause
1. **Async Database Race Condition**: Clicking "Exam Arena" in the sidebar before `db_export.json` finished loading over the network caused `allDatabaseQuestions` to be temporarily empty (`length = 0`), which triggered an immediate fallback termination.
2. **Missing Navigation Guard**: `nextOMRQuestion()` did not ask for confirmation before submitting when reaching the end of the question palette.

### 🛠️ Resolution & Fix Applied
1. **Async Guard in [`js/exam.js`](file:///d:/CODES/busy/govtexamtest/js/exam.js)**:
   ```javascript
   if (tabName === 'exam-arena') {
     if (allDatabaseQuestions.length === 0) {
       loadQuestionBanks().then(() => startFullExamArena());
     } else if (omrExamQuestions.length === 0) {
       startFullExamArena();
     }
   }
   ```
2. **Decoupled Answer Selection from Submission**: Answering a question (`selectOMRAnswer`) now simply marks the option as selected and updates the OMR palette without ending the test.
3. **Explicit Submission Prompt**: Reaching the final question now asks for confirmation (`confirm(...)`) before executing `submitFullExam()`.

---

## 🛑 Bug #2: Unconnected Topbar Search Input

### 📌 Problem Description
The topbar search bar (`#global-search`) was present visually in HTML layout but lacked an event listener connection, rendering it unresponsive.

### 🛠️ Resolution & Fix Applied
- Connected `filterGlobalSearch(query)` in [`js/main.js`](file:///d:/CODES/busy/govtexamtest/js/main.js) triggered on `Enter` keyup.
- Searches questions and explanations across the 213-question database instantly and displays formatted search result cards in the Study view.

---

## 🛑 Bug #3: Duplicate Question Registrations Across Markdown Files

### 📌 Problem Description
Duplicate questions existed across multiple subject files, inflating question count and skewing exam score stats.

### 🛠️ Resolution & Fix Applied
- Created [`test_fast.py`](file:///d:/CODES/busy/govtexamtest/test_fast.py) duplicate detection script.
- Recompiled database into [`data/questions.db`](file:///d:/CODES/busy/govtexamtest/data/questions.db) via `compile_db.py` ensuring unique question constraints.
