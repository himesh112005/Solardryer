# Complete Deployment Guide - SolarDry Solutions

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git installed
- GitHub account
- Vercel account (free)

## Step 1: Verify Node.js and npm Installation

```bash
node --version
npm --version
```

Expected output:
- Node: v18.x.x or higher
- npm: 9.x.x or higher

## Step 2: Install Vercel CLI Globally

### On Windows (PowerShell or Command Prompt):

```bash
npm install -g vercel
```

**If you get permission error:**
```bash
npm install -g vercel --force
```

### Verify Installation:

```bash
vercel --version
```

You should see the Vercel version number.

## Step 3: Prepare Local Repository

### Initialize Git (if not done):

```bash
cd c:\Users\user\Desktop\solar_dryer_app
git init
git add .
git commit -m "Initial commit: SolarDry Solutions"
```

### Create .gitignore (if missing):

```bash
echo node_modules/ >> .gitignore
echo .env >> .gitignore
echo .env.local >> .gitignore
echo .vercel/ >> .gitignore
git add .gitignore
git commit -m "Add gitignore"
```

## Step 4: Push to GitHub

### Create Repository on GitHub:

1. Go to https://github.com/new
2. Repository name: `solar-dryer-solutions`
3. Description: `SolarDry Solutions - Solar Drying Technology Platform`
4. Click "Create repository"

### Push Code:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/solar-dryer-solutions.git
git push -u origin main
```

## Step 5: Deploy with Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste: `https://github.com/YOUR_USERNAME/solar-dryer-solutions`
4. Click "Continue"
5. Configure Project:
   - **Framework Preset**: Other
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
6. Click "Deploy"

Wait 2-5 minutes for deployment...

### Option B: Via Vercel CLI (Windows)

```bash
# Login to Vercel
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod
```

When prompted:
```
? Set up and deploy "C:\Users\user\Desktop\solar_dryer_app"? [Y/n] y
? Which scope do you want to deploy to? YOUR_USERNAME
? Link to existing project? [y/N] n
? What's your project's name? solar-dryer-solutions
? In which directory is your code located? ./
? Want to override the settings? [y/N] n
```

## Step 6: Configure Environment Variables

### In Vercel Dashboard:

1. Go to your project
2. Settings → Environment Variables
3. Add these variables:

```
NODE_ENV = production
JWT_SECRET = your_secure_secret_key_here
```

For database (if using MySQL):
```
DB_HOST = your_db_host
DB_USER = your_db_user
DB_PASSWORD = your_db_password
DB_NAME = solardry_prod
DB_PORT = 3306
```

## Step 7: Verify Deployment

After deployment completes:

```bash
# Check deployment status
vercel --prod --confirm

# View live site
vercel env pull  # Downloads .env from Vercel

# Check logs
vercel logs
```

Visit your live URL (shown in terminal or Vercel dashboard)

## Step 8: Configure Custom Domain (Optional)

### In Vercel Dashboard:

1. Settings → Domains
2. Add custom domain
3. Update DNS records with Vercel's nameservers
4. Wait 24-48 hours for propagation

## Troubleshooting

### Issue: "vercel" command not found

**Solution:**
```bash
# Reinstall Vercel CLI
npm uninstall -g vercel
npm install -g vercel

# Or use npx
npx vercel --prod
```

### Issue: Permission Denied on Windows

**Solution:**
```bash
# Run PowerShell as Administrator
# Then reinstall
npm install -g vercel --force
```

### Issue: Build Fails

**Check logs:**
```bash
vercel logs
```

Common causes:
- Missing dependencies in package.json
- Incorrect environment variables
- Port conflicts

### Issue: Deployment Hangs

**Solution:**
```bash
# Cancel and retry
Ctrl + C

# Try again with verbose output
vercel --prod --debug
```

## Local Testing Before Deployment

### Test Production Build Locally:

```bash
# Install dependencies
npm install

# Start server
npm start

# Visit http://localhost:3000
```

### Test Deployment Configuration:

```bash
# Create production build
npm run build

# Run production build locally
npm run start
```

## Deployment Checklist

- [ ] Node.js v18+ installed
- [ ] npm dependencies installed (`npm install`)
- [ ] Vercel CLI installed globally (`npm install -g vercel`)
- [ ] Code pushed to GitHub
- [ ] GitHub repository created
- [ ] Vercel account created
- [ ] Project linked to Vercel
- [ ] Environment variables configured
- [ ] Deployment successful
- [ ] Live URL accessible
- [ ] All pages working
- [ ] API endpoints responding
- [ ] Database connected (if applicable)
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)

## Post-Deployment

### Verify Everything Works:

1. **Check Main Site**
   - Visit deployment URL
   - Click all navigation links
   - Fill out contact form

2. **Test Admin Panel**
   - Visit /admin.html
   - Login with: admin / admin123
   - Check all dashboard pages

3. **Check API**
   - Visit /api/health
   - Should show: `{"status":"OK",...}`

4. **Monitor Performance**
   - Vercel Dashboard → Analytics
   - Check response times
   - Monitor errors

## Automatic Deployments

### Enable Auto-Deploy on Push:

Already configured! Every push to main branch triggers deployment.

```bash
# Make changes
git add .
git commit -m "Update content"
git push origin main

# Vercel automatically deploys!
```

## Scaling & Optimization

### Current Setup:
- ✅ Free tier with limits
- ✅ CDN included
- ✅ Automatic HTTPS
- ✅ Serverless functions ready

### When You Need More:
- Upgrade to Pro tier ($20/month)
- Add database service
- Implement caching
- Enable analytics

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Guide**: https://nextjs.org/learn
- **Node.js Docs**: https://nodejs.org/docs
- **GitHub Help**: https://docs.github.com

## Quick Reference Commands

```bash
# Setup
npm install
npm install -g vercel

# Development
npm start

# Deployment
git push origin main          # Auto-deploys via Vercel
vercel --prod                # Manual deployment
vercel logs                   # View deployment logs
vercel env pull               # Download environment variables
vercel env list               # List environment variables
```

## Success Indicators

✅ Deployment shows "Ready" in Vercel dashboard
✅ Live URL loads without errors
✅ All pages accessible
✅ Admin login works
✅ No console errors
✅ Performance metrics visible
✅ HTTPS enabled

---

**Status**: ✅ Complete Deployment Guide Ready
**Last Updated**: 2025-01-15
**Version**: 1.0.0
