@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo 🚀 GOA EXAM PREP - AUTOMATED APK MAKER SCRIPT
echo Powered by Capacitor (Official Ionic Web-to-APK Tool)
echo ===================================================
echo.

:: 1. Check if Node.js & npm are installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js and npm are not installed or not in PATH!
    echo Please download and install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [Step 1/5] Checking package.json...
if not exist "package.json" (
    echo Creating minimal package.json...
    call npm init -y >nul 2>nul
)

echo.
echo [Step 2/5] Installing Capacitor CLI & Android platform...
call npm install @capacitor/core @capacitor/cli @capacitor/android

echo.
echo [Step 3/5] Initializing Capacitor App...
if not exist "capacitor.config.json" (
    call npx cap init "Goa Exam Prep" "com.govtexam.goa" --web-dir "."
)

echo.
echo [Step 4/5] Adding Android Native Project Platform...
if not exist "android" (
    call npx cap add android
)

echo.
echo [Step 5/5] Syncing Web Assets (HTML, CSS, JS, Markdown Question Banks)...
call npx cap copy
call npx cap sync

echo.
echo ===================================================
echo ✅ SUCCESS! Android Native Project created in .\android
echo ===================================================
echo.
echo Options to build your final .APK file:
echo.
echo OPTION A (Recommended - Official Android Studio):
echo   Run: npx cap open android
echo   Click: "Build" -> "Build Bundle(s) / APK(s)" -> "Build APK(s)"
echo.
echo OPTION B (Command Line with Android SDK installed):
echo   cd android && gradlew assembleDebug
echo   APK location: android/app/build/outputs/apk/debug/app-debug.apk
echo.
pause
