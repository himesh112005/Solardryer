// Save site settings
function saveSiteSettings(event) {
    event.preventDefault();
    
    const settings = {
        siteName: document.getElementById('siteName').value,
        siteEmail: document.getElementById('siteEmail').value,
        sitePhone: document.getElementById('sitePhone').value
    };
    
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    alert('Site settings saved successfully!');
}

// Change password
function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (currentPassword !== 'admin123') {
        alert('Current password is incorrect!');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }
    
    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    
    // Update credentials in localStorage
    const credentials = JSON.parse(localStorage.getItem('adminCredentials')) || {
        username: 'admin',
        password: 'admin123'
    };
    
    credentials.password = newPassword;
    localStorage.setItem('adminCredentials', JSON.stringify(credentials));
    
    alert('Password changed successfully!');
    document.getElementById('securityForm').reset();
}

// Update profile
function updateProfile(event) {
    event.preventDefault();
    
    const profile = {
        adminName: document.getElementById('adminName').value,
        adminEmail: document.getElementById('adminEmail').value
    };
    
    localStorage.setItem('adminProfile', JSON.stringify(profile));
    alert('Profile updated successfully!');
}

// Backup data
function backupData() {
    const backupData = {
        products: localStorage.getItem('products'),
        articles: localStorage.getItem('articles'),
        messages: localStorage.getItem('contactMessages'),
        users: localStorage.getItem('adminUsers'),
        settings: localStorage.getItem('siteSettings'),
        date: new Date().toLocaleString()
    };
    
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_${new Date().getTime()}.json`;
    link.click();
    
    alert('Backup downloaded successfully!');
}

// Clear cache
function clearCache() {
    if (confirm('Are you sure you want to clear the cache?')) {
        localStorage.clear();
        alert('Cache cleared successfully!');
        location.reload();
    }
}

// Restore defaults
function restoreDefaults() {
    if (confirm('This will reset all settings to defaults. Are you sure?')) {
        localStorage.clear();
        alert('Settings restored to defaults!');
        location.href = 'admin-dashboard.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAdminLogin();
    
    // Load settings if they exist
    const settings = JSON.parse(localStorage.getItem('siteSettings'));
    if (settings) {
        document.getElementById('siteName').value = settings.siteName;
        document.getElementById('siteEmail').value = settings.siteEmail;
        document.getElementById('sitePhone').value = settings.sitePhone;
    }
});
