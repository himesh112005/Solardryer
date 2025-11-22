# Installation & Setup Guide

## Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** (v5.7 or higher)
- **npm** (comes with Node.js)

## Step 1: Install Node.js & MySQL

### Windows
- Download Node.js from https://nodejs.org/
- Download MySQL from https://dev.mysql.com/downloads/mysql/
- Install both with default settings

### macOS
```bash
brew install node
brew install mysql
```

### Linux (Ubuntu)
```bash
sudo apt-get install nodejs npm
sudo apt-get install mysql-server
```

## Step 2: Setup Database

### Create Database & User

```bash
mysql -u root -p
```

Run the SQL commands:
```sql
CREATE DATABASE solardry_db;
CREATE USER 'solardry_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON solardry_db.* TO 'solardry_user'@'localhost';
FLUSH PRIVILEGES;
```

### Import Schema

```bash
mysql -u solardry_user -p solardry_db < api/database/schema.sql
```

## Step 3: Setup Project

### Clone/Download Project
```bash
cd solar_dryer_app
```

### Install Dependencies
```bash
npm install
```

### Configure Environment

Edit `.env` file:
```
DB_HOST=localhost
DB_USER=solardry_user
DB_PASSWORD=strong_password
DB_NAME=solardry_db
DB_PORT=3306

PORT=5000
NODE_ENV=development

JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@solardry.com
```

## Step 4: Start Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

Server will run on: `http://localhost:5000`

## Step 5: Access Admin Panel

Visit: `http://localhost:5000/admin.html`

**Login Credentials:**
- Username: `admin`
- Password: `admin123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Articles
- `GET /api/articles` - Get all articles
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Messages
- `GET /api/messages` - Get all messages
- `GET /api/messages/count/unread` - Get unread count
- `POST /api/messages` - Create message
- `PUT /api/messages/:id/status` - Update status
- `PUT /api/messages/:id/reply` - Reply to message
- `DELETE /api/messages/:id` - Delete message

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Settings
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings

## Troubleshooting

### MySQL Connection Error
- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `.env`
- Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Node Modules Error
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## Security Notes

- Change `JWT_SECRET` in production
- Use strong password for database
- Enable HTTPS in production
- Restrict API access with authentication
- Regular database backups

## Next Steps

1. Customize site settings
2. Add products and articles
3. Configure email settings
4. Set up SSL certificate
5. Deploy to production server

## Support

For issues:
1. Check console for error messages
2. Review logs in database
3. Verify all connections
4. Contact development team

---

**Status:** ✅ Ready for Production
**Version:** 1.0.0
**Last Updated:** 2025-01-15
