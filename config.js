// Configuration file for easy deployment updates

const CONFIG = {
    // Site Information
    SITE_NAME: 'SolarDry Solutions',
    SITE_EMAIL: 'solardryer@gmail.com',
    SITE_PHONE: '+91 94230 80717',
    SITE_ADDRESS: 'SSVPS\'s BAPUSAHEB SHIVAJIRAO DEORE COLLEGE OF ENGINEERING, Department of Mechanical Engineering Deopur, Dhule, MS, India',
    
    // URLs
    SITE_URL: window.location.origin,
    REPO_URL: 'https://github.com/yourusername/solar_dryer_app',
    DOCS_URL: 'https://yourdomain.com/docs',
    
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
    
    // Email Settings
    EMAIL_FROM: 'noreply@solardry.com',
    SUPPORT_EMAIL: 'support@solardry.com',
    ADMIN_EMAIL: 'admin@solardry.com',
    
    // Feature Flags
    FEATURES: {
        ENABLE_BLOG: true,
        ENABLE_PRODUCTS: true,
        ENABLE_ADMIN: true,
        ENABLE_CONTACT_FORM: true,
        ENABLE_USER_REGISTRATION: false,
        MAINTENANCE_MODE: false
    },
    
    // API Endpoints (if needed in future)
    API_BASE_URL: 'https://api.solardry.com/v1',
    
    // Social Media
    SOCIAL_LINKS: {
        FACEBOOK: 'https://facebook.com/solardry',
        TWITTER: 'https://twitter.com/solardry',
        INSTAGRAM: 'https://instagram.com/solardry',
        LINKEDIN: 'https://linkedin.com/company/solardry'
    },
    
    // Analytics
    GOOGLE_ANALYTICS_ID: 'UA-XXXXXXXXX-X',
    ENABLE_ANALYTICS: true,
    
    // Environment
    ENVIRONMENT: 'production', // development, staging, production
    DEBUG_MODE: false,
    LOG_LEVEL: 'info' // debug, info, warn, error
};

// Helper function to get config value
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], CONFIG);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
