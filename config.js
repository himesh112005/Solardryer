// Configuration file for SolarDry Solutions - Production Ready

const CONFIG = {
    // Site Information
    SITE_NAME: 'SolarDry Solutions',
    SITE_EMAIL: 'solardryer@gmail.com',
    SITE_PHONE: '+91 94230 80717',
    SITE_ADDRESS: 'SSVPS\'s BAPUSAHEB SHIVAJIRAO DEORE COLLEGE OF ENGINEERING, Department of Mechanical Engineering Deopur, Dhule, MS, India',
    
    // URLs
    SITE_URL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost',
    API_BASE_URL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000',
    
    // API Endpoints
    API_ENDPOINTS: {
        AUTH: '/api/auth',
        PRODUCTS: '/api/products',
        ARTICLES: '/api/articles',
        MESSAGES: '/api/messages',
        USERS: '/api/users',
        SETTINGS: '/api/settings'
    },
    
    // Admin Settings
    ADMIN_SETTINGS: {
        SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
        MAX_LOGIN_ATTEMPTS: 5,
        PASSWORD_MIN_LENGTH: 6,
        ENABLE_TWO_FACTOR: false
    },
    
    // Database Settings
    DB_NAME: 'solarDryDB',
    DB_VERSION: '1.0.0',
    AUTO_BACKUP_INTERVAL: 7 * 24 * 60 * 60 * 1000, // Weekly
    
    // Feature Flags
    FEATURES: {
        ENABLE_BLOG: true,
        ENABLE_PRODUCTS: true,
        ENABLE_ADMIN: true,
        ENABLE_CONTACT_FORM: true,
        ENABLE_API: true,
        MAINTENANCE_MODE: false
    },
    
    // Environment
    ENVIRONMENT: 'production',
    DEBUG_MODE: false,
    LOG_LEVEL: 'error'
};

// Helper function to get config value
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], CONFIG);
}

// Logger function
function log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    if (CONFIG.DEBUG_MODE || level === 'error' || level === 'warn') {
        console.log(logMessage);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
