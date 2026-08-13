import sys
import os
import subprocess

def print_help():
    print("=" * 60)
    print(" Goa Exam Prep - Unified Database Manager CLI")
    print("=" * 60)
    print("Usage: python src/manage_db.py <command>")
    print("\nCommands:")
    print("  compile    - Compiles all Markdown banks into SQLite & JSON")
    print("  audit      - Deep checks for duplicates and formatting blunders")
    print("  seed-bulk  - Seeds 500+ Goa Q&A programmatically")
    print("  test       - Runs full unit & UI test suite")
    print("=" * 60)

def main():
    if len(sys.argv) < 2:
        print_help()
        sys.exit(1)

    command = sys.argv[1]
    
    # Ensure we run from the project root and it's in sys.path
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(project_root)
    if project_root not in sys.path:
        sys.path.insert(0, project_root)

    if command == "compile":
        import src.compile_db as compile_db
        compile_db.compile_database()
    elif command == "audit":
        import src.deep_audit_md as deep_audit_md
        deep_audit_md.audit_markdown_files()
    elif command == "seed-bulk":
        print("[SEED BULK] Starting 500 Goa Q&A generation...")
        import src.create_500_goa as create_500_goa
        create_500_goa.create_500_more_goa_questions()
    elif command == "test":
        print("[TEST] Running test suite...")
        subprocess.run([sys.executable, "-m", "pytest", "tests/"])
    else:
        print(f"Unknown command: {command}")
        print_help()
        sys.exit(1)

if __name__ == "__main__":
    main()
