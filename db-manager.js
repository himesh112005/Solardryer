class DatabaseManager {
    constructor() {
        this.db = this.initializeDatabase();
    }

    // Initialize database from localStorage
    initializeDatabase() {
        const stored = localStorage.getItem('solarDryDB');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Default database structure
        return {
            users: [
                {
                    id: 1,
                    username: 'admin',
                    email: 'admin@solardry.com',
                    password: 'admin123',
                    role: 'admin',
                    status: 'active',
                    joinedDate: '2025-01-01',
                    lastLogin: new Date().toISOString()
                }
            ],
            products: [
                {
                    id: 1,
                    name: 'Small Farm Unit',
                    modelId: 'S-100',
                    price: 25000,
                    description: 'Perfect for individual farmers, this compact unit offers high efficiency for small batches of produce.',
                    image: 'https://placehold.co/300x200/2a9d8f/ffffff?text=Small+Farm+Dryer',
                    status: 'active',
                    createdDate: '2025-01-01'
                },
                {
                    id: 2,
                    name: 'Commercial Processor',
                    modelId: 'C-500',
                    price: 150000,
                    description: 'A medium-scale solution designed for co-ops and small businesses.',
                    image: 'https://placehold.co/300x200/e9c46a/264653?text=Commercial+Dryer',
                    status: 'active',
                    createdDate: '2025-01-02'
                },
                {
                    id: 3,
                    name: 'Industrial High-Flow System',
                    modelId: 'I-2000',
                    price: 500000,
                    description: 'The top-tier solution for large-volume industrial applications.',
                    image: 'https://placehold.co/300x200/f4a261/ffffff?text=Industrial+System',
                    status: 'active',
                    createdDate: '2025-01-03'
                }
            ],
            articles: [],
            contactMessages: [],
            settings: {
                siteName: 'SolarDry Solutions',
                siteEmail: 'solardryer@gmail.com',
                sitePhone: '+91 94230 80717',
                siteAddress: 'SSVPS\'s BAPUSAHEB SHIVAJIRAO DEORE COLLEGE OF ENGINEERING, Deopur, Dhule, MS, India'
            }
        };
    }

    // Save database to localStorage
    save() {
        localStorage.setItem('solarDryDB', JSON.stringify(this.db));
    }

    // ============ USER METHODS ============
    getAllUsers() {
        return this.db.users;
    }

    getUserById(id) {
        return this.db.users.find(u => u.id === id);
    }

    getUserByUsername(username) {
        return this.db.users.find(u => u.username === username);
    }

    addUser(user) {
        const newUser = {
            id: Math.max(...this.db.users.map(u => u.id), 0) + 1,
            ...user,
            joinedDate: new Date().toISOString().split('T')[0],
            lastLogin: null
        };
        this.db.users.push(newUser);
        this.save();
        return newUser;
    }

    updateUser(id, userData) {
        const user = this.db.users.find(u => u.id === id);
        if (user) {
            Object.assign(user, userData);
            this.save();
            return user;
        }
        return null;
    }

    deleteUser(id) {
        const index = this.db.users.findIndex(u => u.id === id);
        if (index > -1) {
            this.db.users.splice(index, 1);
            this.save();
            return true;
        }
        return false;
    }

    // ============ PRODUCT METHODS ============
    getAllProducts() {
        return this.db.products;
    }

    getProductById(id) {
        return this.db.products.find(p => p.id === id);
    }

    addProduct(product) {
        const newProduct = {
            id: Math.max(...this.db.products.map(p => p.id), 0) + 1,
            ...product,
            createdDate: new Date().toISOString().split('T')[0]
        };
        this.db.products.push(newProduct);
        this.save();
        return newProduct;
    }

    updateProduct(id, productData) {
        const product = this.db.products.find(p => p.id === id);
        if (product) {
            Object.assign(product, productData);
            this.save();
            return product;
        }
        return null;
    }

    deleteProduct(id) {
        const index = this.db.products.findIndex(p => p.id === id);
        if (index > -1) {
            this.db.products.splice(index, 1);
            this.save();
            return true;
        }
        return false;
    }

    // ============ ARTICLE METHODS ============
    getAllArticles() {
        return this.db.articles;
    }

    getArticleById(id) {
        return this.db.articles.find(a => a.id === id);
    }

    addArticle(article) {
        const newArticle = {
            id: Math.max(...this.db.articles.map(a => a.id), 0) + 1,
            ...article,
            createdDate: new Date().toISOString().split('T')[0],
            status: 'draft'
        };
        this.db.articles.push(newArticle);
        this.save();
        return newArticle;
    }

    updateArticle(id, articleData) {
        const article = this.db.articles.find(a => a.id === id);
        if (article) {
            Object.assign(article, articleData);
            this.save();
            return article;
        }
        return null;
    }

    deleteArticle(id) {
        const index = this.db.articles.findIndex(a => a.id === id);
        if (index > -1) {
            this.db.articles.splice(index, 1);
            this.save();
            return true;
        }
        return false;
    }

    // ============ CONTACT MESSAGE METHODS ============
    getAllMessages() {
        return this.db.contactMessages;
    }

    getMessageById(id) {
        return this.db.contactMessages.find(m => m.id === id);
    }

    addMessage(message) {
        const newMessage = {
            id: Math.max(...this.db.contactMessages.map(m => m.id), 0) + 1,
            ...message,
            createdDate: new Date().toISOString(),
            status: 'unread',
            reply: null
        };
        this.db.contactMessages.push(newMessage);
        this.save();
        return newMessage;
    }

    updateMessage(id, messageData) {
        const message = this.db.contactMessages.find(m => m.id === id);
        if (message) {
            Object.assign(message, messageData);
            this.save();
            return message;
        }
        return null;
    }

    deleteMessage(id) {
        const index = this.db.contactMessages.findIndex(m => m.id === id);
        if (index > -1) {
            this.db.contactMessages.splice(index, 1);
            this.save();
            return true;
        }
        return false;
    }

    getUnreadMessageCount() {
        return this.db.contactMessages.filter(m => m.status === 'unread').length;
    }

    // ============ SETTINGS METHODS ============
    getSettings() {
        return this.db.settings;
    }

    updateSettings(settingsData) {
        this.db.settings = { ...this.db.settings, ...settingsData };
        this.save();
        return this.db.settings;
    }

    // ============ SEARCH METHODS ============
    searchProducts(keyword) {
        return this.db.products.filter(p => 
            p.name.toLowerCase().includes(keyword.toLowerCase()) ||
            p.modelId.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    searchArticles(keyword) {
        return this.db.articles.filter(a => 
            a.title.toLowerCase().includes(keyword.toLowerCase()) ||
            a.excerpt.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    searchMessages(keyword) {
        return this.db.contactMessages.filter(m => 
            m.name.toLowerCase().includes(keyword.toLowerCase()) ||
            m.email.toLowerCase().includes(keyword.toLowerCase()) ||
            m.subject.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    // ============ STATISTICS METHODS ============
    getStatistics() {
        return {
            totalProducts: this.db.products.length,
            totalArticles: this.db.articles.length,
            totalUsers: this.db.users.length,
            totalMessages: this.db.contactMessages.length,
            unreadMessages: this.getUnreadMessageCount(),
            activeProducts: this.db.products.filter(p => p.status === 'active').length,
            publishedArticles: this.db.articles.filter(a => a.status === 'published').length
        };
    }

    // ============ EXPORT/IMPORT METHODS ============
    exportData() {
        return JSON.stringify(this.db, null, 2);
    }

    importData(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            this.db = { ...this.db, ...imported };
            this.save();
            return true;
        } catch (error) {
            console.error('Import failed:', error);
            return false;
        }
    }

    // Clear all data
    clearDatabase() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
            this.db = this.initializeDatabase();
            this.save();
            return true;
        }
        return false;
    }
}

// Create global database instance
const db = new DatabaseManager();
