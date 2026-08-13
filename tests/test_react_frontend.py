"""
Automated Test Suite for React / Vite Frontend Components & Export Bundle
Tests:
1. React Public DB Export Bundle Integrity (frontend/public/db_export.json).
2. Question Schema Validation (options count == 4, valid answer prefixes A/B/C/D).
3. React Source Files Integrity (App.tsx, Navbar.tsx, Home.tsx, ExamArena.tsx, BrainArcade.tsx, RevisionBank.tsx).
"""

import json
import os

PUBLIC_JSON_PATH = os.path.join("frontend", "public", "db_export.json")
SRC_DIR = os.path.join("frontend", "src")

def test_react_public_db_export():
    """Test 1: React Public Asset DB Export Bundle Check"""
    assert os.path.exists(PUBLIC_JSON_PATH), "frontend/public/db_export.json missing!"

    with open(PUBLIC_JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert len(data) >= 1000, f"Expected 1000+ questions in public export, found {len(data)}"
    print(f"  [PASS] React Public DB Export OK. Total questions: {len(data)}")

def test_react_question_schema():
    """Test 2: Schema Validation across all questions"""
    with open(PUBLIC_JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    valid_answers = ("A", "B", "C", "D")

    for i, q in enumerate(data):
        assert "question" in q and q["question"], f"Empty question text at index {i}"
        assert "options" in q and isinstance(q["options"], list), f"Invalid options format at index {i}"
        assert len(q["options"]) == 4, f"Question at index {i} does not have exactly 4 options!"
        assert "answer" in q and q["answer"].startswith(valid_answers), f"Invalid answer prefix at index {i}: {q.get('answer')}"
        assert "explanation" in q, f"Missing explanation at index {i}"
        subject = q.get("subject") or q.get("category")
        assert subject, f"Missing subject/category at index {i}"

    print(f"  [PASS] All {len(data)} questions passed schema validation cleanly!")

def test_react_components_exist():
    """Test 3: Verify all required React component files exist"""
    components = [
        "App.tsx",
        "main.tsx",
        os.path.join("components", "Navbar.tsx"),
        os.path.join("components", "Home.tsx"),
        os.path.join("components", "ExamArena.tsx"),
        os.path.join("components", "BrainArcade.tsx"),
        os.path.join("components", "RevisionBank.tsx"),
        os.path.join("components", "ScoreModal.tsx"),
        os.path.join("components", "BottomNav.tsx"),
        os.path.join("utils", "audio.ts"),
        os.path.join("utils", "i18n.ts"),
    ]

    for comp in components:
        comp_path = os.path.join(SRC_DIR, comp)
        assert os.path.exists(comp_path), f"Missing React source file: {comp_path}"

    print(f"  [PASS] All {len(components)} React frontend source files verified!")
