// Admin Settings Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Settings Page Loaded');
    loadSettings();
    setupSettingsForms();
});

// Load settings
function loadSettings() {
    try {
        // Get current settings from localStorage
        let settings = JSON.parse(localStorage.getItem('siteSettings'));
        
        // If no settings, use defaults
        if (!settings) {
            settings = getDefaultSettings();
            localStorage.setItem('siteSettings', JSON.stringify(settings));
        }
        
        // Populate form with settings
        if (document.getElementById('siteName')) {
            document.getElementById('siteName').value = settings.siteName || '';
        }
        if (document.getElementById('siteEmail')) {
            document.getElementById('siteEmail').value = settings.siteEmail || '';
        }
        if (document.getElementById('sitePhone')) {
            document.getElementById('sitePhone').value = settings.sitePhone || '';
        }
        
        console.log('Settings loaded:', settings);
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Get default settings
function getDefaultSettings() {
    return {
        siteName: 'SolarDry Solutions',
        siteEmail: 'solardryer@gmail.com',
        sitePhone: '+91 94230 80717',
        siteAddress: 'SSVPS BAPUSAHEB SHIVAJIRAO DEORE COLLEGE OF ENGINEERING, Deopur, Dhule, MS, India',
        theme: 'light',
        maintenanceMode: false,
        updatedDate: new Date().toISOString()
    };
}

// Setup settings forms
function setupSettingsForms() {
    // Site Settings Form
    const siteSettingsForm = document.getElementById('siteSettingsForm');
    if (siteSettingsForm) {
        siteSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSiteSettings();
        });
    }

    // Security Settings Form
    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            changePassword();
        });
    }

    // Profile Settings Form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateProfile();
        });
    }
}

// Save site settings
function saveSiteSettings() {
    try {
        const siteName = document.getElementById('siteName').value.trim();
        const siteEmail = document.getElementById('siteEmail').value.trim();
        const sitePhone = document.getElementById('sitePhone').value.trim();

        // Validation
        if (!siteName || !siteEmail || !sitePhone) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(siteEmail)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(sitePhone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }

        // Get current settings
        const settings = JSON.parse(localStorage.getItem('siteSettings')) || getDefaultSettings();

        // Update settings
        settings.siteName = siteName;
        settings.siteEmail = siteEmail;
        settings.sitePhone = sitePhone;
        settings.updatedDate = new Date().toISOString();

        // Save to localStorage
        localStorage.setItem('siteSettings', JSON.stringify(settings));

        console.log('Site settings saved:', settings);
        showNotification('✅ Site settings saved successfully!', 'success');

    } catch (error) {
        console.error('Error saving site settings:', error);
        showNotification('❌ Error saving settings: ' + error.message, 'error');
    }
}

// Change password
function changePassword() {
    try {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            showNotification('Please fill in all password fields', 'error');
            return;
        }

        if (newPassword.length < 6) {
            showNotification('New password must be at least 6 characters long', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            return;
        }

        // Get current user
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user) {
            showNotification('User not found', 'error');
            return;
        }

        // Verify current password
        const currentPasswordHash = hashPassword(currentPassword);
        
        // Check against master password
        let isPasswordValid = false;
        if (user.username === 'admin' && currentPassword === 'admin123') {
            isPasswordValid = true;
        } else {
            // Check against user database
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const dbUser = users.find(u => u.id === user.id);
            
            if (dbUser && currentPasswordHash === dbUser.password) {
                isPasswordValid = true;
            }
        }

        if (!isPasswordValid) {
            showNotification('❌ Current password is incorrect', 'error');
            document.getElementById('currentPassword').value = '';
            return;
        }

        // Update password in user database
        if (user.username !== 'admin') {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.id === user.id);
            
            if (userIndex > -1) {
                const newPasswordHash = hashPassword(newPassword);
                users[userIndex].password = newPasswordHash;
                localStorage.setItem('users', JSON.stringify(users));
            }
        }

        // Clear form
        document.getElementById('securityForm').reset();
        
        console.log('Password changed successfully for user:', user.username);
        showNotification('✅ Password changed successfully!', 'success');

    } catch (error) {
        console.error('Error changing password:', error);
        showNotification('❌ Error changing password: ' + error.message, 'error');
    }
}

// Update admin profile
function updateProfile() {
    try {
        const adminName = document.getElementById('adminName').value.trim();
        const adminEmail = document.getElementById('adminEmail').value.trim();

        // Validation
        if (!adminName || !adminEmail) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(adminEmail)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Get current user
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user) {
            showNotification('User not found', 'error');
            return;
        }

        // Update user in database
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === user.id);
        
        if (userIndex > -1) {
            users[userIndex].email = adminEmail;
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Update current user info in session
        user.email = adminEmail;
        localStorage.setItem('user', JSON.stringify(user));

        // Save admin profile
        const profile = {
            adminName: adminName,
            adminEmail: adminEmail,
            updatedDate: new Date().toISOString()
        };
        localStorage.setItem('adminProfile', JSON.stringify(profile));

        console.log('Profile updated:', profile);
        showNotification('✅ Profile updated successfully!', 'success');

    } catch (error) {
        console.error('Error updating profile:', error);
        showNotification('❌ Error updating profile: ' + error.message, 'error');
    }
}

// Backup data
function backupData() {
    try {
        const backupData = {
            settings: localStorage.getItem('siteSettings'),
            users: localStorage.getItem('users'),
            products: localStorage.getItem('products'),
            articles: localStorage.getItem('articles'),
            messages: localStorage.getItem('contactMessages'),
            timestamp: new Date().toISOString()
        };

        const dataStr = JSON.stringify(backupData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `backup_${new Date().getTime()}.json`;
        link.click();

        console.log('Backup downloaded');
        showNotification('✅ Backup downloaded successfully!', 'success');
    } catch (error) {
        console.error('Error backing up data:', error);
        showNotification('❌ Error backing up data: ' + error.message, 'error');
    }
}

// Clear cache
function clearCache() {
    if (confirm('Are you sure you want to clear the cache? This cannot be undone.')) {
        try {
            // Keep only essential data
            const essentialData = {
                users: localStorage.getItem('users'),
                siteSettings: localStorage.getItem('siteSettings')
            };

            localStorage.clear();
            localStorage.setItem('users', essentialData.users);
            localStorage.setItem('siteSettings', essentialData.siteSettings);

            console.log('Cache cleared');
            showNotification('✅ Cache cleared successfully!', 'success');

            setTimeout(() => {
                location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error clearing cache:', error);
            showNotification('❌ Error clearing cache: ' + error.message, 'error');
        }
    }
}

// Restore defaults
function restoreDefaults() {
    if (confirm('This will reset all settings to defaults. Are you sure?')) {
        try {
            const defaultSettings = getDefaultSettings();
            localStorage.setItem('siteSettings', JSON.stringify(defaultSettings));

            // Reload settings
            loadSettings();

            console.log('Defaults restored');
            showNotification('✅ Settings restored to defaults!', 'success');
        } catch (error) {
            console.error('Error restoring defaults:', error);
            showNotification('❌ Error restoring defaults: ' + error.message, 'error');
        }
    }
}

// Simple password hashing function
function hashPassword(password) {
    let hash = 0;
    
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    const salt = 'solardry_';
    return salt + Math.abs(hash).toString(16);
}

// Show notification
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
    
    if (!document.querySelector('style[data-notification-settings]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification-settings', 'true');
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
    }, 4000);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
