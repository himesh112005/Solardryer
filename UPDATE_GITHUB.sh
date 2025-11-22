#!/bin/bash

# SolarDry Solutions - Quick GitHub Update Script

echo "=========================================="
echo "SolarDry Solutions - GitHub Update"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "ERROR: Git is not installed"
    echo "Please install from https://git-scm.com"
    exit 1
fi

echo "[1/4] Checking Git status..."
git status
echo ""

echo "[2/4] Staging changes..."
git add .
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to stage changes"
    exit 1
fi
echo "Changes staged successfully"

echo ""
echo "[3/4] Committing changes..."
read -p "Enter commit message (or press Enter for 'Update'): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update SolarDry Solutions"
fi

git commit -m "$commit_msg"
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to commit"
    echo "(This might be normal if there are no changes)"
fi

echo ""
echo "[4/4] Pushing to GitHub..."
git push origin main
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to push"
    echo "Check your internet connection"
    exit 1
fi

echo ""
echo "=========================================="
echo "✅ GitHub Update Complete!"
echo "=========================================="
echo ""
echo "Your changes have been pushed to GitHub."
echo "Vercel will auto-deploy if deployed from GitHub."
echo ""
