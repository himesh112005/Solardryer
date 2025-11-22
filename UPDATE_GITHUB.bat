@echo off
REM SolarDry Solutions - Quick GitHub Update Script

echo ==========================================
echo SolarDry Solutions - GitHub Update
echo ==========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed
    echo Please install from https://git-scm.com
    pause
    exit /b 1
)

echo [1/4] Checking Git status...
git status
echo.

echo [2/4] Staging changes...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to stage changes
    pause
    exit /b 1
)
echo Changes staged successfully

echo.
echo [3/4] Committing changes...
set /p commit_msg="Enter commit message (or press Enter for 'Update'): "
if "%commit_msg%"=="" (
    set commit_msg=Update SolarDry Solutions
)

git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo ERROR: Failed to commit
    echo (This might be normal if there are no changes)
)

echo.
echo [4/4] Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to push
    echo Check your internet connection
    pause
    exit /b 1
)

echo.
echo ==========================================
echo ✅ GitHub Update Complete!
echo ==========================================
echo.
echo Your changes have been pushed to GitHub.
echo Vercel will auto-deploy if deployed from GitHub.
echo.
pause
