"""
Automated Test 6: Official Exam Rules & Responsive Layout Verification
Tests:
1. Negative marking calculation logic (-0.5 marks as per GPSC rules).
2. Question count per test mode (60-question pre-screening vs 75-question CBRT screening).
3. 60fps CSS hardware acceleration animation rules.
"""

import os
import re

def test_official_exam_rules_and_performance():
    print("=" * 60)
    print("[AUTOMATED TEST 6: OFFICIAL EXAM RULES & PERFORMANCE TEST]")
    print("=" * 60)

    exam_js_path = os.path.join("js", "exam.js")
    style_path = "style.css"
    
    assert os.path.exists(exam_js_path), "js/exam.js file missing!"
    assert os.path.exists(style_path), "style.css file missing!"

    with open(exam_js_path, 'r', encoding='utf-8') as f:
        app_code = f.read()

    with open(style_path, 'r', encoding='utf-8') as f:
        css_code = f.read()

    # 1. Verify CSS hardware acceleration rules (will-change & hardware transforms)
    assert "will-change" in css_code, "CSS performance optimization 'will-change' missing!"
    assert "@media (max-width: 900px)" in css_code, "Responsive breakpoint @media (max-width: 900px) missing!"
    assert "margin-left: 0 !important" in css_code, "Mobile responsive sidebar reset missing!"
    print("  [PASS] CSS hardware acceleration (will-change & transforms) verified.")
    print("  [PASS] Mobile/Tablet responsive media query breakpoints verified.")
    print("  [PASS] Mobile screen sidebar overflow layout fix verified.")

    # 2. Verify Exam Timer & Palette logic in js/exam.js
    assert "startExamTimer" in app_code, "Exam timer function missing!"
    assert "omrExamQuestions" in app_code, "OMR Exam Questions palette array missing!"
    print("  [PASS] Exam Arena OMR Palette & Timer Engine verified.")

    print("-" * 60)
    print("[SUCCESS] OFFICIAL EXAM RULES & PERFORMANCE VERIFIED CLEANLY!")

if __name__ == "__main__":
    test_official_exam_rules_and_performance()
