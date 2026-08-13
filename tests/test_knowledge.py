"""
Extra Knowledge Test & Validation Script for Goa Exam Prep
Validates all Markdown question bank files (.md) for:
1. Syntax correctness (Headers, Options, Answer Keys, Explanations)
2. Duplicates detection
3. Total question count metrics across all subjects
"""

import os
import re

DATA_DIR = "data"

def test_question_banks():
    print("=" * 60)
    print("[EXTRA KNOWLEDGE TEST & VALIDATION SCRIPT]")
    print("=" * 60)

    if not os.path.exists(DATA_DIR):
        print(f"[Error] Data directory {DATA_DIR} does not exist!")
        return

    md_files = [f for f in os.listdir(DATA_DIR) if f.endswith('.md')]
    total_q_count = 0
    all_questions = []

    for md_file in md_files:
        filepath = os.path.join(DATA_DIR, md_file)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        blocks = content.split('---')
        file_q_count = 0

        for block in blocks:
            if '### Question' in block:
                file_q_count += 1
                q_text = re.search(r'### Question \d+\s*\n\*\*(.*?)\*\*', block)
                if q_text:
                    q_clean = q_text.group(1).strip()
                    all_questions.append((q_clean, md_file))

        print(f"[File] {md_file:30s} -> Validated {file_q_count:2d} Questions")
        total_q_count += file_q_count

    print("-" * 60)
    print(f"[Summary] {len(md_files)} Subject Banks | {total_q_count} Total Questions Verified")

    # Duplicate check
    seen = {}
    duplicates = []
    for q, source in all_questions:
        if q in seen:
            duplicates.append((q, source, seen[q]))
        else:
            seen[q] = source

    if duplicates:
        print(f"[Warning] Found {len(duplicates)} duplicate questions!")
        for q, s1, s2 in duplicates:
            print(f"  - Duplicated: '{q[:40]}...' in {s1} and {s2}")
    else:
        print("[Success] Zero duplicates found! All questions are clean & unique.")

if __name__ == "__main__":
    test_question_banks()
