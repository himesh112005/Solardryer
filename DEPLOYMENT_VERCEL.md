# Vercel Deployment Guide

## Prerequisites

- Vercel account (https://vercel.com)
- GitHub account with repository
- Node.js 18.x

## Step 1: Prepare Project

```bash
# Install dependencies
npm install

# Test locally
npm start
```

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/solar-dryer-solutions.git
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure project settings:
   - Framework: Other
   - Build Command: Leave empty
   - Output Directory: Leave empty
5. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

## Step 4: Configure Environment Variables

In Vercel Dashboard:

1. Go to Settings → Environment Variables
2. Add the following variables:

```
NODE_ENV=production
PORT=3000
JWT_SECRET=your_secret_key_here
```

For database (if using MySQL):
```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=3306
```

## Step 5: Configure Custom Domain

1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS settings with Vercel nameservers
4. Wait for DNS propagation (usually 24-48 hours)

## Deployment Checklist

- [ ] All dependencies in package.json are correct
- [ ] .env file is NOT committed to Git
- [ ] vercel.json configuration is present
- [ ] No sensitive data in code
- [ ] All routes are properly configured
- [ ] Environment variables set in Vercel
- [ ] Domain configured (if applicable)
- [ ] HTTPS enabled (automatic)

## Troubleshooting

### Build Fails with npm Error

**Problem**: `npm error code ETARGET`

**Solution**:
```bash
# Update package.json with compatible versions
npm install --save jsonwebtoken@9.0.2
npm install --save bcryptjs@2.4.3
```

### 500 Error on Vercel

Check logs in Vercel Dashboard:
1. Go to Deployments
2. Click on failed deployment
3. View "Function Logs"
4. Check error messages

### Static Files Not Loading

Ensure files are in root directory or use proper paths in vercel.json

### Database Connection Issues

- Use environment variables for credentials
- Ensure database is accessible from Vercel's servers
- Consider using serverless database (Firebase, MongoDB Atlas)

## Monitoring & Maintenance

### Enable Vercel Analytics

1. Dashboard → Settings → Analytics
2. Enable Web Analytics
3. Add to your code:

```html
<script src="/_vercel/insights/script.js"></script>
```

### Check Performance

- Dashboard → Analytics
- Monitor response times
- Check error rates

## Scaling & Performance

- Vercel provides unlimited bandwidth
- Functions scale automatically
- Use Edge Functions for reduced latency
- CDN distribution included

## Next Steps

1. Set up custom domain
2. Enable analytics
3. Configure monitoring
4. Set up automatic deployments
5. Monitor performance metrics

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Community: https://discord.gg/vercel

---

**Deployment Status**: ✅ Ready for Production
**Version**: 1.0.0
**Last Updated**: 2025-01-15
