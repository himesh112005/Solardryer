# Quick Start Guide - SolarDry Solutions

## 🚀 Deployment Ready Checklist

### Prerequisites
- Node.js v16+ 
- MySQL 5.7+
- npm

### Step 1: Database Setup (5 minutes)

```bash
# Create database
mysql -u root -p < api/database/schema.sql

# Or manually create:
mysql -u root -p
CREATE DATABASE solardry_db;
GRANT ALL PRIVILEGES ON solardry_db.* TO 'solardry_user'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

### Step 2: Environment Setup (2 minutes)

Create `.env` file in root:
```
DB_HOST=localhost
DB_USER=solardry_user
DB_PASSWORD=your_password
DB_NAME=solardry_db
DB_PORT=3306

PORT=5000
NODE_ENV=production

JWT_SECRET=generate_random_secret_key_here
JWT_EXPIRE=7d

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@solardry.com
ADMIN_EMAIL=admin@solardry.com

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Step 3: Install Dependencies (3 minutes)

```bash
npm install
```

### Step 4: Start Server (1 minute)

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on: `http://localhost:5000`

## 📊 Admin Access

**URL:** `http://localhost:5000/admin.html`

**Login:**
- Username: `admin`
- Password: `admin123`

**⚠️ Change password immediately after first login!**

## 📝 Features Included

✅ Complete Website Frontend
✅ Admin Dashboard
✅ Product Management
✅ Blog Management
✅ Contact Form with Email
✅ User Management
✅ Settings Panel
✅ REST API
✅ MySQL Database
✅ JWT Authentication
✅ Responsive Design

## 🌐 Deployment Platforms

### GitHub Pages (Frontend Only)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/solar-dryer-solutions.git
git push -u origin main
```

### Heroku (Full Stack)
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku open
```

### Traditional VPS (Recommended for Production)

1. Upload files via FTP/SCP
2. Install Node.js and MySQL
3. Run: `npm install && npm start`
4. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start api/server.js
   pm2 startup
   pm2 save
   ```

## 🔒 Security Steps

- [ ] Change default admin password
- [ ] Generate new JWT_SECRET
- [ ] Enable HTTPS/SSL
- [ ] Setup firewall rules
- [ ] Backup database regularly
- [ ] Monitor error logs
- [ ] Enable CORS only for trusted domains

## 📈 First Steps After Deployment

1. **Login to Admin Panel**
   - Change default password
   - Update site settings
   - Add company information

2. **Add Products**
   - Add your product listings
   - Set pricing
   - Upload images

3. **Add Articles**
   - Create blog content
   - Publish articles

4. **Monitor Messages**
   - Check contact form submissions
   - Respond to inquiries

5. **Setup Email (Optional)**
   - Configure Gmail app password
   - Enable email notifications

## 🐛 Troubleshooting

### Database Error
```bash
# Check MySQL is running
mysql -u root -p

# Verify database exists
SHOW DATABASES;
```

### Port Already in Use
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues:
1. Check `.env` configuration
2. Review console errors
3. Check MySQL connection
4. Verify all files uploaded
5. Check file permissions

## ✅ Production Checklist

- [ ] Database backed up
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] Admin password changed
- [ ] Email configured (optional)
- [ ] Firewall rules set
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Database user with limited permissions
- [ ] Regular backup scheduled

## 📊 Expected Response Times

- Frontend Load: < 2s
- API Requests: < 500ms
- Database Queries: < 100ms

---

**Status:** ✅ Production Ready
**Version:** 1.0.0
**Last Updated:** 2025-01-15

Ready to deploy! 🎉
