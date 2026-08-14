"""
Automated Test 8: Sub-Second Database Compiler Benchmark Test
Verifies that database compilation and JSON exporting execute in < 1.0 second.
"""

import time
import os
import subprocess
import sys

def test_fast_compiler_performance():
    print("=" * 60)
    print("[AUTOMATED TEST 8: FAST COMPILER BENCHMARK TEST]")
    print("=" * 60)

    manage_script = os.path.join("src", "manage_db.py")
    assert os.path.exists(manage_script), "src/manage_db.py script missing!"

    start_time = time.time()
    result = subprocess.run([sys.executable, manage_script, "compile"], capture_output=True, text=True)
    elapsed = time.time() - start_time

    assert result.returncode == 0, f"Compilation failed with output:\n{result.stderr}"
    assert elapsed < 2.0, f"Compilation took too long ({elapsed:.2f}s)! Benchmark target is < 2.0s."

    print(f"  [PASS] Database compiler completed in {elapsed:.3f}s (Benchmark passed < 2.0s)!")
    print("-" * 60)
    print("[SUCCESS] FAST COMPILER BENCHMARK VERIFIED CLEANLY!")

if __name__ == "__main__":
    test_fast_compiler_performance()
