# 🚀 Web to APK Automated Converter Script
# Powered by @capacitor/cli (Zero custom native code required)

import os
import subprocess
import sys

def run_cmd(cmd):
    print(f"\n👉 Running: {cmd}")
    res = subprocess.run(cmd, shell=True)
    if res.returncode != 0:
        print(f"❌ Command failed: {cmd}")
        return False
    return True

def main():
    print("=" * 60)
    print("📱 GOA EXAM PREP - AUTOMATED WEB TO APK CONVERTER")
    print("=" * 60)

    # Step 1: Ensure Node & NPM are installed
    if not run_cmd("npm --version"):
        print("❌ Node.js is required. Install Node.js from https://nodejs.org")
        sys.exit(1)

    # Step 2: Initialize package.json if missing
    if not os.path.exists("package.json"):
        run_cmd("npm init -y")

    # Step 3: Install Capacitor Dependencies from GitHub / npm
    print("\n📦 Installing Capacitor Web-to-Native framework...")
    run_cmd("npm install @capacitor/core @capacitor/cli @capacitor/android")

    # Step 4: Capacitor Init
    if not os.path.exists("capacitor.config.json"):
        print("\n⚙️ Initializing Capacitor config...")
        run_cmd('npx cap init "Goa Exam Prep" "com.govtexam.goa" --web-dir "."')

    # Step 5: Add Android project folder
    if not os.path.exists("android"):
        print("\n🤖 Adding Android native project platform...")
        run_cmd("npx cap add android")

    # Step 6: Sync web assets & markdown question banks
    print("\n🔄 Syncing web files & Markdown data into Android container...")
    run_cmd("npx cap copy")
    run_cmd("npx cap sync")

    print("\n" + "=" * 60)
    print("✨ DONE! Native Android Project generated in ./android directory.")
    print("=" * 60)
    print("\n🔨 To compile into `.apk` file, choose your method:")
    print("1. Open in Android Studio:")
    print("   👉 Run command: npx cap open android")
    print("   👉 Click: Build -> Build Bundle(s) / APK(s) -> Build APK")
    print("\n2. Direct Gradle Build (if Android SDK installed):")
    print("   👉 Command: cd android && ./gradlew assembleDebug")
    print("   👉 Output: android/app/build/outputs/apk/debug/app-debug.apk")

if __name__ == "__main__":
    main()
