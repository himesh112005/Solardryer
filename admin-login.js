// Admin credentials (In production, use proper authentication)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validate credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Store in sessionStorage/localStorage
        if (remember) {
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username);
        } else {
            sessionStorage.setItem('adminLoggedIn', 'true');
            sessionStorage.setItem('adminUsername', username);
        }
        
        // Show success message
        showAlert('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
        }, 1000);
    } else {
        showAlert('Invalid username or password!', 'error');
        document.getElementById('password').value = '';
    }
}

// Check if user is logged in
function checkAdminLogin() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') || localStorage.getItem('adminLoggedIn');
    
    if (!isLoggedIn && !window.location.pathname.includes('admin.html')) {
        window.location.href = 'admin.html';
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        
        showAlert('Logged out successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1000);
    }
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type} show`;
    alertDiv.textContent = message;
    
    const form = document.querySelector('.login-form');
    if (form) {
        form.parentElement.insertBefore(alertDiv, form);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // If on admin page and already logged in, redirect to dashboard
    if (window.location.pathname.includes('admin.html') && 
        (sessionStorage.getItem('adminLoggedIn') || localStorage.getItem('adminLoggedIn'))) {
        window.location.href = 'admin-dashboard.html';
    }
});
