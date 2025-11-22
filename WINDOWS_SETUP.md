# Windows Setup & Deployment Guide

## Prerequisites for Windows

### Step 1: Install Node.js

1. Download from https://nodejs.org (LTS version)
2. Run installer
3. Accept defaults
4. **Restart your computer**

### Step 2: Verify Installation

Open PowerShell or Command Prompt and run:

```bash
node --version
npm --version
```

Should show version numbers (e.g., v18.17.0, 9.6.7)

## Install Vercel CLI on Windows

### Method 1: Using PowerShell (Recommended)

```bash
npm install -g vercel
```

### Method 2: Using Command Prompt (as Administrator)

1. Right-click Command Prompt
2. Select "Run as administrator"
3. Paste:
```bash
npm install -g vercel
```

### Verify Installation

```bash
vercel --version
```

Should display Vercel version (e.g., 28.14.5)

## If "vercel" Command Still Not Found

### Solution 1: Check npm Global Path

```bash
npm config get prefix
```

This shows where global packages are installed.

### Solution 2: Add to PATH (Advanced Users)

1. Right-click "This PC" → Properties
2. Advanced system settings
3. Environment Variables
4. Edit Path
5. Add: `C:\Users\YOUR_USERNAME\AppData\Roaming\npm`
6. Click OK
7. Restart PowerShell/Command Prompt

### Solution 3: Use npx (Universal Method)

Instead of `vercel --prod`, use:

```bash
npx vercel --prod
```

This downloads and runs Vercel without global installation.

## Deploy Using Run Scripts

### Easy Method: Use Batch File

1. Double-click `QUICK_DEPLOY.bat`
2. Follow prompts
3. Wait for deployment

### Manual Method: Step by Step

```bash
# Navigate to project folder
cd C:\Users\user\Desktop\solar_dryer_app

# Install dependencies
npm install

# Install Vercel globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to staging (test)
vercel

# Deploy to production
vercel --prod
```

## PowerShell Common Issues

### Issue: "npm is not recognized"

**Fix:**
```bash
# Restart PowerShell and try again
```

Or use Command Prompt instead.

### Issue: "ExecutionPolicy"

If you get execution policy error:

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run your command again.

### Issue: Long paths with spaces

Wrap path in quotes:
```bash
cd "C:\Users\user\Desktop\solar_dryer_app"
```

## Vercel Account Setup (Windows)

1. Go to https://vercel.com/signup
2. Sign up with GitHub account
3. Verify email
4. Create new project

Then:
```bash
vercel login
```

It will open browser for authentication.

## GitHub Setup (Windows)

### Install Git

1. Download from https://git-scm.com
2. Use default options
3. Restart computer

### Create GitHub Repository

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/solar-dryer-solutions.git
git push -u origin main
```

## Windows Terminal Tips

### Use Windows Terminal (Modern)

1. Download from Microsoft Store
2. Supports PowerShell, Command Prompt, WSL
3. Better experience than legacy CMD

### Useful PowerShell Commands

```bash
# Clear screen
Clear-Host

# List files
Get-ChildItem

# Navigate to folder
Set-Location "C:\path\to\folder"

# Check if command exists
Get-Command vercel

# Install package
npm install -g package-name
```

## Troubleshooting Windows Issues

### Issue: "Path too long"

Windows has 260 character limit. Solution:

```bash
# Enable long paths (Windows 10+)
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

### Issue: Slow npm install

```bash
# Clear npm cache
npm cache clean --force

# Set registry
npm config set registry https://registry.npmjs.org/
```

### Issue: Permission errors

```bash
# Run PowerShell as Administrator
# Then reinstall globally
npm install -g vercel --force
```

## Deployment Checklist for Windows

- [ ] Node.js installed and verified
- [ ] npm working
- [ ] Vercel CLI installed (`vercel --version` works)
- [ ] Git installed
- [ ] GitHub account created
- [ ] Vercel account created
- [ ] Code pushed to GitHub
- [ ] Environment variables set in Vercel
- [ ] Deployment successful
- [ ] Live URL accessible

## Quick Reference

```bash
# Setup
node --version
npm --version
npm install
npm install -g vercel

# Deployment
vercel --prod
# OR
npx vercel --prod

# Troubleshooting
vercel --version
npm config get prefix
npm cache clean --force
```

## Support

If issues persist:

1. Restart computer
2. Clear npm cache: `npm cache clean --force`
3. Reinstall Node.js
4. Check internet connection
5. Visit https://vercel.com/support

---

**Last Updated**: 2025-01-15
**Tested On**: Windows 10/11, PowerShell 7.x
