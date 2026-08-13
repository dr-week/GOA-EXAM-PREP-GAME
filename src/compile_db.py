"""
SQLite Database Generator & Integration Script for Goa Exam Prep
Parses all 10 Markdown question files (.md) and compiles them into a single, high-performance SQLite database (data/questions.db)
"""

import os
import re
import sqlite3
import json

DATA_DIR = "data"
DB_PATH = os.path.join(DATA_DIR, "questions.db")
JSON_PATH = os.path.join(DATA_DIR, "db_export.json")

def init_db(cursor):
    """Creates the relational database schema"""
    cursor.execute("DROP TABLE IF EXISTS questions")
    cursor.execute("""
        CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            question_text TEXT NOT NULL UNIQUE,
            option_a TEXT NOT NULL,
            option_b TEXT NOT NULL,
            option_c TEXT NOT NULL,
            option_d TEXT NOT NULL,
            answer TEXT NOT NULL,
            explanation TEXT NOT NULL,
            source_file TEXT NOT NULL
        )
    """)

def parse_md_file(filepath):
    """Parses structured markdown questions into dictionary records"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    blocks = content.split('---')
    questions = []

    for block in blocks:
        if '### Question' not in block:
            continue

        qTextMatch = re.search(r'### Question \d+\s*\n\*\*(.*?)\*\*', block, re.DOTALL)
        optionsMatch = list(re.finditer(r'- ([A-D]\).*?)(?=\n- |\n\n|\n\*\*|\n$)', block, re.DOTALL))
        ansMatch = re.search(r'\*\*Answer:\*\*\s*([A-D]\).*?)(?=\n|$)', block)
        expMatch = re.search(r'\*\*Explanation:\*\*\s*([\s\S]*?)$', block)

        if qTextMatch and len(optionsMatch) >= 4 and ansMatch:
            opts = [m.group(1).strip() for m in optionsMatch]
            record = {
                "question": qTextMatch.group(1).strip(),
                "option_a": opts[0],
                "option_b": opts[1],
                "option_c": opts[2],
                "option_d": opts[3],
                "answer": ansMatch.group(1).strip(),
                "explanation": expMatch.group(1).strip() if expMatch else "No explanation."
            }
            questions.append(record)

    return questions

def compile_database():
    print("=" * 60)
    print("[SQLITE DATABASE GENERATOR & COMPILER]")
    print("=" * 60)

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    init_db(cursor)

    md_files = [f for f in os.listdir(DATA_DIR) if f.endswith('.md')]
    all_db_records = []
    inserted_count = 0

    for md_file in md_files:
        cat_name = md_file.replace('.md', '')
        filepath = os.path.join(DATA_DIR, md_file)
        parsed_qs = parse_md_file(filepath)

        for q in parsed_qs:
            try:
                cursor.execute("""
                    INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, answer, explanation, source_file)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    cat_name, q["question"], q["option_a"], q["option_b"],
                    q["option_c"], q["option_d"], q["answer"], q["explanation"], md_file
                ))
                inserted_count += 1
                all_db_records.append({
                    "id": inserted_count,
                    "category": cat_name,
                    "question": q["question"],
                    "options": [q["option_a"], q["option_b"], q["option_c"], q["option_d"]],
                    "answer": q["answer"],
                    "explanation": q["explanation"]
                })
            except sqlite3.IntegrityError:
                pass # Skip duplicates

    conn.commit()
    conn.close()

    # Also export JSON bundle for fast web app loading
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(all_db_records, f, indent=2)

    print(f"[SUCCESS] Compiled SQLite Database: {DB_PATH}")
    print(f"[SUCCESS] Exported Web JSON Bundle: {JSON_PATH}")
    print(f"[METRICS] Successfully indexed {inserted_count} unique questions into relational database!")

if __name__ == "__main__":
    compile_database()
