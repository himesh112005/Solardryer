#!/bin/bash

# SolarDry Solutions - Quick Deployment Script for Linux/Mac

echo "=========================================="
echo "SolarDry Solutions - Deployment Script"
echo "=========================================="
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "[1/5] Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install Vercel CLI"
        exit 1
    fi
fi
echo "Vercel CLI OK"

echo ""
echo "[2/5] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi
echo "Dependencies installed"

echo ""
echo "[3/5] Checking Git..."
if ! command -v git &> /dev/null; then
    echo "WARNING: Git is not installed"
    echo "Skipping Git operations"
else
    echo "[4/5] Committing changes..."
    git add .
    git commit -m "Automated deployment commit" 2>/dev/null
    
    echo "[5/5] Pushing to repository..."
    git push 2>/dev/null
fi

echo ""
echo "=========================================="
echo "Starting Vercel Deployment..."
echo "=========================================="
echo ""

vercel --prod

echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
