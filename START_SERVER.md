# How to Start the Server

## Option 1: With MySQL Database

### 1. Start MySQL
```bash
# Windows
mysql -u root -p

# Or if running as service
# MySQL service should auto-start
```

### 2. Create Database
```bash
mysql -u root -p < api/database/schema.sql
```

### 3. Start Node Server
```bash
npm install
npm start
```

Server runs on: **http://localhost:5000**

---

## Option 2: Without MySQL (Fallback Mode)

### 1. Ensure .env is configured
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
```

### 2. Start Server
```bash
npm install
npm start
```

Server runs on: **http://localhost:5000**

**Note:** Server will run in offline mode with fallback authentication

---

## Access Admin Panel

1. Visit: **http://localhost:5000/admin.html**
2. Login with:
   - Username: `admin`
   - Password: `admin123`

---

## Troubleshooting

### Port 5000 Already in Use

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -i :5000
kill -9 <PID>
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Cannot Connect to Database
- Server will automatically use fallback mode
- Check MySQL is running
- Verify credentials in .env

### 405 Error
- Ensure server is running
- Check API endpoint URLs
- Verify HTTP method (GET, POST, PUT, DELETE)

---

## API Endpoints

All endpoints require `Content-Type: application/json`

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user

### Messages
- `GET /api/messages` - Get all messages
- `GET /api/messages/count/unread` - Get unread count
- `POST /api/messages` - Send message
- `PUT /api/messages/:id/status` - Update status
- `DELETE /api/messages/:id` - Delete message

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

---

**Status:** ✅ Ready to Deploy
