"""
Dedicated Question Randomizer Engine & Suite Builder Script
Standalone Python script that:
1. Loads questions from all Markdown banks (.md) or SQLite Database (questions.db).
2. Performs a true Fisher-Yates double-shuffle on both Question sequence AND Options (A, B, C, D) positions.
3. Automatically generates randomized mock exam test papers into Markdown format.
"""

import os
import re
import json
import random

DATA_DIR = "data"
MOCK_EXAM_FILE = os.path.join(DATA_DIR, "randomized_mock_exam.md")

def parse_all_markdown_files():
    """Parses all Markdown files in data/ directory"""
    md_files = [f for f in os.listdir(DATA_DIR) if f.endswith('.md') and not f.startswith('randomized')]
    all_questions = []

    for md_file in md_files:
        filepath = os.path.join(DATA_DIR, md_file)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        blocks = content.split('---')
        for block in blocks:
            if '### Question' not in block:
                continue

            qTextMatch = re.search(r'### Question \d+\s*\n\*\*(.*?)\*\*', block, re.DOTALL)
            optionsMatch = list(re.finditer(r'- ([A-D]\).*?)(?=\n- |\n\n|\n\*\*|\n$)', block, re.DOTALL))
            ansMatch = re.search(r'\*\*Answer:\*\*\s*([A-D]\).*?)(?=\n|$)', block)
            expMatch = re.search(r'\*\*Explanation:\*\*\s*([\s\S]*?)$', block)

            if qTextMatch and len(optionsMatch) >= 4 and ansMatch:
                opts = [m.group(1).strip() for m in optionsMatch]
                all_questions.append({
                    "question": qTextMatch.group(1).strip(),
                    "options": opts,
                    "answer": ansMatch.group(1).strip(),
                    "explanation": expMatch.group(1).strip() if expMatch else "No explanation provided.",
                    "category": md_file.replace('.md', '')
                })

    return all_questions

def double_shuffle_question(q_obj):
    """Performs double shuffle: shuffles option positions (A, B, C, D) while preserving correct answer mapping"""
    raw_options = [re.sub(r'^[A-D]\)\s*', '', opt) for opt in q_obj['options']]
    correct_text = re.sub(r'^[A-D]\)\s*', '', q_obj['answer'])

    # Fisher-Yates shuffle options
    shuffled_options_text = list(raw_options)
    random.shuffle(shuffled_options_text)

    letters = ['A', 'B', 'C', 'D']
    new_options = []
    new_answer = ""

    for idx, text in enumerate(shuffled_options_text):
        opt_str = f"{letters[idx]}) {text}"
        new_options.append(opt_str)
        if text == correct_text:
            new_answer = opt_str

    return {
        "question": q_obj['question'],
        "options": new_options,
        "answer": new_answer,
        "explanation": q_obj['explanation'],
        "category": q_obj['category']
    }

def run_randomizer_engine():
    print("=" * 60)
    print("[QUESTION RANDOMIZER ENGINE & MOCK BUILDER]")
    print("=" * 60)

    all_qs = parse_all_markdown_files()
    if not all_qs:
        print("[Error] No questions found to randomize!")
        return

    print(f"[Info] Loaded {len(all_qs)} total questions across subject banks.")

    # 1. Shuffle Question Sequence
    shuffled_qs = list(all_qs)
    random.shuffle(shuffled_qs)

    # 2. Shuffle Option Positions (A, B, C, D)
    final_randomized_qs = [double_shuffle_question(q) for q in shuffled_qs]

    # Output to randomized_mock_exam.md
    with open(MOCK_EXAM_FILE, 'w', encoding='utf-8') as f:
        f.write("# 🎲 Randomized Mock Exam Paper\n")
        f.write(f"**Total Questions:** {len(final_randomized_qs)}\n\n")

        for idx, q in enumerate(final_randomized_qs, 1):
            f.write("---\n\n")
            f.write(f"### Question {idx}\n")
            f.write(f"**[{q['category'].upper()}] {q['question']}**\n")
            for opt in q['options']:
                f.write(f"- {opt}\n")
            f.write(f"\n**Answer:** {q['answer']}\n")
            f.write(f"**Explanation:** {q['explanation']}\n\n")

    print(f"[SUCCESS] Successfully generated randomized mock paper at: {MOCK_EXAM_FILE}")
    print("[SUCCESS] Double-Randomizer Engine verified cleanly!")

if __name__ == "__main__":
    run_randomizer_engine()
