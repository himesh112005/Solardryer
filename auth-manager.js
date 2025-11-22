// Authentication Manager - Prevents infinite redirect loops

class AuthManager {
    constructor() {
        this.isChecking = false;
        this.isLoggedIn = false;
        this.user = null;
        this.checkTimer = null;
    }

    // Initialize auth manager
    init() {
        console.log('Initializing Auth Manager');
        this.checkLoginStatus();
    }

    // Check login status once
    checkLoginStatus() {
        if (this.isChecking) {
            console.warn('Auth check already in progress');
            return;
        }

        this.isChecking = true;
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            try {
                this.user = JSON.parse(user);
                this.isLoggedIn = true;
                console.log('User logged in:', this.user.username);
            } catch (error) {
                console.error('Invalid user data:', error);
                this.logout();
            }
        } else {
            this.isLoggedIn = false;
            console.log('User not logged in');
        }

        this.isChecking = false;
    }

    // Protect page - only run once
    protectPage(redirectTo = 'admin.html') {
        // Check if already protected
        if (this.checkTimer) {
            return;
        }

        this.checkLoginStatus();

        if (!this.isLoggedIn) {
            console.log('Not logged in, redirecting to:', redirectTo);
            // Use replace to prevent going back to protected page
            window.location.replace(redirectTo);
            return false;
        }

        console.log('User authenticated, allowing access');
        return true;
    }

    // Logout
    logout() {
        console.log('Logging out...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
        this.isLoggedIn = false;
        this.user = null;
        window.location.replace('admin.html');
    }

    // Get current user
    getUser() {
        return this.user;
    }

    // Check if logged in
    isAuthenticated() {
        return this.isLoggedIn;
    }
}

// Create global auth manager instance
let authManager = new AuthManager();

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        authManager.init();
    });
} else {
    authManager.init();
}
