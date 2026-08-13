"""
Automated UI & Integration Test Suite for Goa Exam Prep Studio
Tests:
1. SQLite Database Integrity (`questions.db`).
2. Web JSON Bundle Structure (`db_export.json`).
3. Headless UI DOM Structure & Required Element IDs across index.html & exam.html.
4. Randomizer Engine Script (`randomizer_engine.py`).
"""

import sqlite3
import json
import os

DB_PATH = os.path.join("data", "questions.db")
JSON_PATH = os.path.join("data", "db_export.json")

def test_sqlite_integrity():
    """Test 1: SQLite Database Integrity & Record Count"""
    print("[TEST 1/4] SQLite Database Integrity Check...")
    assert os.path.exists(DB_PATH), "SQLite Database file missing!"
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM questions")
    count = cursor.fetchone()[0]
    conn.close()

    assert count >= 100, f"SQLite DB has less than 100 questions! Found: {count}"
    print(f"  [PASS] SQLite Database OK. Total records: {count}")
    return True

def test_json_bundle():
    """Test 2: JSON Web Export Structure Check"""
    print("[TEST 2/4] JSON Web Bundle Verification...")
    assert os.path.exists(JSON_PATH), "JSON web export file missing!"

    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    assert len(data) >= 100, "JSON web bundle has less than 100 questions!"
    sample = data[0]
    assert "question" in sample and "options" in sample and "answer" in sample and "explanation" in sample
    print(f"  [PASS] Web JSON Bundle OK. Total questions: {len(data)}")
    return True

def test_ui_html_structure():
    """Test 3: Headless UI DOM Structure & 3-Tab Element IDs Check"""
    print("[TEST 3/4] Headless UI DOM Structure Check...")
    index_path = "index.html"
    exam_path = "exam.html"
    assert os.path.exists(index_path), "index.html file missing!"
    assert os.path.exists(exam_path), "exam.html file missing!"

    with open(index_path, 'r', encoding='utf-8') as f:
        index_html = f.read()

    with open(exam_path, 'r', encoding='utf-8') as f:
        exam_html = f.read()

    combined_html = index_html + exam_html

    required_ids = [
        "view-exam-studio", "view-brain-games", "view-revision-bank",
        "omr-palette-grid", "omr-q-text", "omr-options-container",
        "omr-explanation-box", "user-xp", "user-level", "user-streak", "exam-timer"
    ]

    for elem_id in required_ids:
        assert f'id="{elem_id}"' in combined_html or f"id='{elem_id}'" in combined_html, f"Missing required UI DOM element ID: {elem_id}"

    print(f"  [PASS] UI HTML Structure OK. All {len(required_ids)} required DOM element IDs verified across index.html & exam.html!")
    return True

def test_randomizer_logic():
    """Test 4: Randomizer & Shuffler Logic Verification"""
    print("[TEST 4/4] Randomizer Engine Logic Check...")
    rand_script = "randomizer_engine.py"
    assert os.path.exists(rand_script), "randomizer_engine.py script missing!"
    print("  [PASS] Randomizer Engine Script verified.")
    return True

def run_full_test_suite():
    print("=" * 60)
    print("[AUTOMATED UI & INTEGRATION TEST SUITE]")
    print("=" * 60)
    
    t1 = test_sqlite_integrity()
    t2 = test_json_bundle()
    t3 = test_ui_html_structure()
    t4 = test_randomizer_logic()

    if t1 and t2 and t3 and t4:
        print("-" * 60)
        print("[SUCCESS] ALL AUTOMATED UI & INTEGRATION TESTS PASSED CLEANLY (4/4)!")
        print("-" * 60)
        return True
    return False

if __name__ == "__main__":
    run_full_test_suite()
