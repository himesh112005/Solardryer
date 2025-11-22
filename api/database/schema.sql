-- Create Database
CREATE DATABASE IF NOT EXISTS solardry_db;
USE solardry_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'moderator', 'user') DEFAULT 'user',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    model_id VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    status ENUM('active', 'inactive', 'discontinued') DEFAULT 'active',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    excerpt TEXT,
    content LONGTEXT,
    author VARCHAR(100),
    image VARCHAR(255),
    status ENUM('published', 'draft', 'archived') DEFAULT 'draft',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message LONGTEXT NOT NULL,
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    reply TEXT,
    reply_date TIMESTAMP NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (status),
    INDEX (created_date)
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    site_name VARCHAR(255),
    site_email VARCHAR(100),
    site_phone VARCHAR(20),
    site_address TEXT,
    logo VARCHAR(255),
    secondary_logo VARCHAR(255),
    theme VARCHAR(50),
    maintenance_mode BOOLEAN DEFAULT FALSE,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Notification Log Table
CREATE TABLE IF NOT EXISTS notification_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50),
    from_email VARCHAR(100),
    subject VARCHAR(255),
    status VARCHAR(50),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_messages_email ON contact_messages(email);

-- Insert default admin user
INSERT INTO users (username, email, password, role, status) 
VALUES ('admin', 'admin@solardry.com', '$2a$10$YourHashedPasswordHere', 'admin', 'active')
ON DUPLICATE KEY UPDATE status='active';

-- Insert default settings
INSERT INTO settings (site_name, site_email, site_phone, site_address) 
VALUES (
    'SolarDry Solutions',
    'solardryer@gmail.com',
    '+91 94230 80717',
    'SSVPS BAPUSAHEB SHIVAJIRAO DEORE COLLEGE OF ENGINEERING, Deopur, Dhule, MS, India'
)
ON DUPLICATE KEY UPDATE site_email='solardryer@gmail.com';
