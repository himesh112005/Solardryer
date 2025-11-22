@echo off
REM SolarDry Solutions - Quick Deployment Script for Windows

echo ==========================================
echo SolarDry Solutions - Deployment Script
echo ==========================================
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [1/5] Checking Vercel CLI...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install Vercel CLI
        pause
        exit /b 1
    )
)
echo Vercel CLI OK

echo.
echo [2/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed

echo.
echo [3/5] Checking Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Git is not installed
    echo Skipping Git operations
) else (
    echo [4/5] Committing changes...
    git add .
    git commit -m "Automated deployment commit" >nul 2>&1
    
    echo [5/5] Pushing to repository...
    git push >nul 2>&1
)

echo.
echo ==========================================
echo Starting Vercel Deployment...
echo ==========================================
echo.

vercel --prod

echo.
echo ==========================================
echo Deployment Complete!
echo ==========================================
pause
