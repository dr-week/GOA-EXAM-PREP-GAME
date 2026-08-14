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
    print("  ci         - Runs full parallel CI pipeline (audit + compile + test + build)")
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
    elif command == "ci":
        print("=" * 60)
        print("[CI PIPELINE] Running Full Integration & Verification Chain")
        print("=" * 60)
        print("\n[STEP 1/4] Running Markdown Audit...")
        import src.deep_audit_md as deep_audit_md
        deep_audit_md.audit_markdown_files()

        print("\n[STEP 2/4] Compiling SQLite DB & Web Exports...")
        import src.compile_db as compile_db
        compile_db.compile_database()
        # Copy to frontend public
        subprocess.run(["cmd.exe", "/c", "copy", "data\\db_export.json", "frontend\\public\\db_export.json"], check=False)

        print("\n[STEP 3/4] Running Pytest Backend & Frontend Schema Suite...")
        res_pytest = subprocess.run([sys.executable, "-m", "pytest", "tests/"])
        if res_pytest.returncode != 0:
            print("[CI FAIL] Pytest suite failed!")
            sys.exit(1)

        print("\n[STEP 4/4] Running Vitest & React Production Build...")
        frontend_dir = os.path.join(project_root, "frontend")
        res_vitest = subprocess.run(["npm.cmd", "test"], cwd=frontend_dir)
        if res_vitest.returncode != 0:
            print("[CI FAIL] Vitest suite failed!")
            sys.exit(1)

        res_build = subprocess.run(["npm.cmd", "run", "build"], cwd=frontend_dir)
        if res_build.returncode != 0:
            print("[CI FAIL] Vite production build failed!")
            sys.exit(1)

        print("\n" + "=" * 60)
        print("[CI SUCCESS] Entire Pipeline Passed 100% Cleanly!")
        print("=" * 60)
    else:
        print(f"Unknown command: {command}")
        print_help()
        sys.exit(1)

if __name__ == "__main__":
    main()
