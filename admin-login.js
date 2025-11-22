// Admin Login Script - Fixed Password Verification

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Login Page Loaded');
    
    // Check if already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        console.log('User already logged in, redirecting to dashboard');
        window.location.replace('admin-dashboard.html');
        return;
    }
    
    setupLoginForm();
});

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (!loginForm) {
        console.error('Login form not found');
        return;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        console.log('Login attempt for user:', username);
        
        if (!username || !password) {
            showNotification('Please enter username and password', 'error');
            return;
        }

        try {
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Logging in...';

            let loginSuccess = false;

            // Check if it's the master admin credentials
            if (username === 'admin' && password === 'admin123') {
                console.log('Master admin credentials validated');
                loginSuccess = true;
                setupAdminLogin('admin', remember);
            } else {
                // Try to validate against user database
                console.log('Checking user database');
                if (validateUserCredentials(username, password)) {
                    loginSuccess = true;
                    setupUserLogin(username, remember);
                } else {
                    console.log('Invalid credentials');
                }
            }

            if (loginSuccess) {
                showNotification('✅ Login successful! Redirecting...', 'success');
                
                setTimeout(() => {
                    window.location.replace('admin-dashboard.html');
                }, 1000);
            } else {
                showNotification('❌ Invalid username or password', 'error');
                document.getElementById('password').value = '';
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }

        } catch (error) {
            console.error('Login error:', error);
            showNotification('❌ Error: ' + error.message, 'error');
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';
        }
    });
}

// Setup admin login for master credentials
function setupAdminLogin(username, remember) {
    const token = btoa(JSON.stringify({
        id: 1,
        username: username,
        role: 'admin',
        iat: Date.now(),
        isMasterAdmin: true
    }));
    
    const userData = {
        id: 1,
        username: username,
        email: 'admin@solardry.com',
        role: 'admin',
        isMasterAdmin: true
    };
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    if (remember) {
        localStorage.setItem('rememberMe', 'true');
    }
    
    console.log('Master admin login setup complete');
}

// Validate user credentials against database
function validateUserCredentials(username, password) {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find user by username (case-insensitive)
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
        
        if (!user) {
            console.warn('User not found:', username);
            return false;
        }

        // Get the stored password hash
        const storedHash = user.password;
        
        // Hash the input password
        const inputHash = hashPassword(password);
        
        console.log('Comparing passwords');
        console.log('Input hash matches:', inputHash === storedHash);
        
        // Direct comparison
        if (inputHash === storedHash) {
            // Update last login
            user.lastLogin = new Date().toISOString();
            users[users.findIndex(u => u.id === user.id)] = user;
            localStorage.setItem('users', JSON.stringify(users));
            
            console.log('User authenticated:', username);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error validating credentials:', error);
        return false;
    }
}

// Setup user login
function setupUserLogin(username, remember) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    
    if (user) {
        const token = btoa(JSON.stringify({
            id: user.id,
            username: user.username,
            role: user.role,
            iat: Date.now()
        }));
        
        const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        console.log('User login setup complete for:', username);
    }
}

// Simple password hashing function
function hashPassword(password) {
    let hash = 0;
    
    // Simple hash algorithm
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Add salt to make it consistent
    const salt = 'solardry_';
    const finalHash = salt + Math.abs(hash).toString(16);
    
    console.log('Password hashed:', finalHash);
    return finalHash;
}

function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 3000;
                min-width: 300px;
                max-width: 600px;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: slideDown 0.3s ease;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
            }
            
            .notification-content p {
                margin: 0;
                flex: 1;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                margin-left: 1rem;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            .notification-success {
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .notification-error {
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            @keyframes slideDown {
                from {
                    top: -100px;
                    opacity: 0;
                }
                to {
                    top: 20px;
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.insertBefore(notification, document.body.firstChild);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    window.location.replace('admin.html');
}
