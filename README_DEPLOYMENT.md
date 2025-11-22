# SolarDry Solutions - Deployment Guide

## Quick Start

### Local Development
```bash
npm install
npm start
# Server runs on http://localhost:3000
```

### Vercel Deployment
```bash
vercel --prod
```

## Supported Deployment Platforms

### 1. **Vercel** (Recommended)
- **Cost**: Free tier available
- **Setup Time**: 5 minutes
- **Features**: Auto-scaling, CDN, serverless
- **Guide**: See DEPLOYMENT_VERCEL.md

### 2. **Heroku**
- **Cost**: $7/month minimum
- **Setup Time**: 10 minutes
- **Features**: Easy deployment, database support

```bash
heroku create your-app-name
git push heroku main
```

### 3. **Railway.app**
- **Cost**: $5/month minimum
- **Setup Time**: 10 minutes
- **Features**: MySQL support, auto-deploy

### 4. **DigitalOcean**
- **Cost**: $5/month
- **Setup Time**: 30 minutes
- **Features**: Full control, SSH access

### 5. **AWS**
- **Cost**: Variable
- **Setup Time**: 60 minutes
- **Features**: Most flexible, scalable

## Fixed Dependencies

### Updated package.json

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "nodemailer": "^6.9.7"
  }
}
```

## Environment Setup

### Development (.env)
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=solardry_db
JWT_SECRET=dev_secret_key
```

### Production (Vercel)
Set these in Vercel Dashboard → Settings → Environment Variables:

```
NODE_ENV=production
PORT=3000
JWT_SECRET=production_secret_key
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=solardry_production_db
```

## Pre-Deployment Checklist

- [ ] All npm dependencies compatible
- [ ] .env file excluded from Git
- [ ] vercel.json configured
- [ ] package.json has correct engines
- [ ] No console.log in production code
- [ ] All routes tested locally
- [ ] Database migrations ready
- [ ] Static files configured
- [ ] CORS settings appropriate
- [ ] Error handling implemented

## Common Issues & Solutions

### Issue: npm ETARGET Error
**Cause**: Package version doesn't exist
**Fix**: Update to compatible versions
```bash
npm install jsonwebtoken@9.0.2
npm install bcryptjs@2.4.3
```

### Issue: 502 Bad Gateway
**Cause**: Server crashed or timeout
**Check**: Vercel logs, database connection

### Issue: Static Files 404
**Cause**: Wrong file paths
**Fix**: Check vercel.json routes

### Issue: Database Connection Failed
**Cause**: Credentials or network issue
**Fix**: Verify env variables and firewall rules

## Performance Optimization

1. **Enable Caching**
   - Static files: 1 year
   - API routes: 60 seconds

2. **Use CDN**
   - Vercel includes CDN
   - Images served from edge

3. **Optimize Assets**
   - Minify CSS/JS
   - Compress images
   - Lazy load content

## Security Best Practices

1. **Environment Variables**
   - Never commit .env
   - Use Vercel's vault

2. **Database**
   - Use strong passwords
   - Limit access IPs
   - Regular backups

3. **API Security**
   - Rate limiting
   - Input validation
   - CORS properly configured

4. **HTTPS**
   - Always enabled
   - Valid SSL certificate
   - Redirect HTTP to HTTPS

## Monitoring

### Set Up Alerts
- Email on deployment failure
- Monitor uptime
- Track error rates
- Performance metrics

### Tools
- Vercel Analytics (included)
- Google Analytics
- Sentry for error tracking
- New Relic for monitoring

## Database Options

### For Production

1. **MySQL on AWS RDS**
   - Managed database
   - Automatic backups
   - High availability

2. **MongoDB Atlas**
   - NoSQL alternative
   - Free tier available
   - Global distribution

3. **Firebase/Firestore**
   - Serverless
   - Real-time sync
   - Built-in security

## Scaling Plan

### Current (Phase 1)
- Vercel free tier
- SQLite or local MySQL
- CDN via Vercel

### Growth (Phase 2)
- Vercel pro ($20/month)
- AWS RDS MySQL
- Enhanced monitoring

### Enterprise (Phase 3)
- Multiple regions
- Load balancing
- Advanced caching
- 24/7 monitoring

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Express.js**: https://expressjs.com
- **Node.js**: https://nodejs.org
- **MySQL**: https://dev.mysql.com/doc/

## Success Checklist

✅ App deployed to production URL
✅ HTTPS working
✅ API endpoints responding
✅ Database connected
✅ Static files loading
✅ Error monitoring active
✅ Performance metrics visible
✅ Automatic backups configured
✅ Domain configured
✅ Team access set up

---

**Status**: ✅ Production Ready
**Last Updated**: 2025-01-15
**Next Review**: 2025-02-15
