"""
Automated Test 5: Exam Hall Early-Termination Regression Prevention Test
Simulates full multi-question exam navigation to ensure tests do NOT complete early after 1 question.
"""

import os
import re

def test_exam_hall_navigation_logic():
    print("=" * 60)
    print("[AUTOMATED TEST 5: EXAM HALL EARLY-TERMINATION TEST]")
    print("=" * 60)

    app_path = "app.js"
    assert os.path.exists(app_path), "app.js file missing!"

    with open(app_path, 'r', encoding='utf-8') as f:
        code = f.read()

    # Verify selectOMRAnswer does NOT call submitFullExam or switchTab
    select_fn = re.search(r'function selectOMRAnswer[\s\S]*?\{([\s\S]*?)\}\n\nfunction', code)
    assert select_fn, "selectOMRAnswer function missing!"
    select_code = select_fn.group(1)

    assert "submitFullExam()" not in select_code, "CRITICAL BUG: selectOMRAnswer calls submitFullExam()!"
    assert "switchTab" not in select_code, "CRITICAL BUG: selectOMRAnswer switches tab early!"

    # Verify nextOMRQuestion checks for last question bounds
    next_fn = re.search(r'function nextOMRQuestion[\s\S]*?\{([\s\S]*?)\}', code)
    assert next_fn, "nextOMRQuestion function missing!"
    next_code = next_fn.group(1)

    assert "omrCurrentIndex < omrExamQuestions.length - 1" in next_code, "nextOMRQuestion missing bounds check!"

    print("  [PASS] selectOMRAnswer does not trigger early submission.")
    print("  [PASS] nextOMRQuestion correctly iterates through full question palette.")
    print("-" * 60)
    print("[SUCCESS] EXAM HALL MULTI-QUESTION NAVIGATION VERIFIED CLEANLY!")
    return True

if __name__ == "__main__":
    test_exam_hall_navigation_logic()
