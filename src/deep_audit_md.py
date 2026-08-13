import os
import glob
import re

def audit_markdown_files():
    md_files = glob.glob("data/*.md")
    print("=" * 60)
    print("[DEEP AUDIT: MARKDOWN BANKS DUPLICATE & BLUNDER DETECTOR]")
    print("=" * 60)

    all_questions = {}
    duplicates_found = 0
    formatting_blunders = 0

    for file_path in sorted(md_files):
        filename = os.path.basename(file_path)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract Question blocks
        q_blocks = re.findall(r'### Question \d+[\s\S]*?(?=### Question \d+|\Z)', content)

        for idx, block in enumerate(q_blocks):
            # 1. Check for Question Text
            q_match = re.search(r'\*\*(.*?)\*\*', block)
            if not q_match:
                print(f"  [BLUNDER] {filename} Question {idx+1}: Missing question text!")
                formatting_blunders += 1
                continue

            q_text = q_match.group(1).strip().lower()

            # 2. Check for duplicate questions across files
            if q_text in all_questions:
                print(f"  [DUPLICATE] '{q_match.group(1)}'")
                print(f"      - Original in: {all_questions[q_text]}")
                print(f"      - Duplicate in: {filename}")
                duplicates_found += 1
            else:
                all_questions[q_text] = filename

            # 3. Check for Answer key existence
            if "**Answer:**" not in block:
                print(f"  [BLUNDER] {filename} Question {idx+1}: Missing **Answer:** tag!")
                formatting_blunders += 1

            # 4. Check for Explanation key existence
            if "**Explanation:**" not in block:
                print(f"  [BLUNDER] {filename} Question {idx+1}: Missing **Explanation:** tag!")
                formatting_blunders += 1

    print("-" * 60)
    print(f"AUDIT COMPLETE | Unique Questions: {len(all_questions)} | Duplicates: {duplicates_found} | Blunders: {formatting_blunders}")
    print("-" * 60)

if __name__ == "__main__":
    audit_markdown_files()
