// Admin Edit User Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

let currentUserId = null;
let currentUserPassword = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Edit User Page Loaded');
    
    // Get user ID from URL
    const params = new URLSearchParams(window.location.search);
    currentUserId = parseInt(params.get('id'));
    
    console.log('User ID:', currentUserId);
    
    if (currentUserId) {
        loadUser(currentUserId);
    } else {
        alert('User ID not found');
        window.location.href = 'admin-users.html';
    }
    
    setupUserForm();
});

// Load user for editing
function loadUser(id) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === id);
    
    if (!user) {
        alert('User not found');
        window.location.href = 'admin-users.html';
        return;
    }
    
    console.log('User loaded:', { id: user.id, username: user.username, email: user.email });
    
    // Store current password for verification
    currentUserPassword = user.password;
    
    // Populate form
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('role').value = user.role;
    document.getElementById('status').value = user.status;
}

// Setup user form
function setupUserForm() {
    const form = document.getElementById('editUserForm');
    if (!form) {
        console.error('Form not found');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!currentUserId) {
            alert('User ID not found');
            return;
        }
        
        const email = document.getElementById('email').value.trim();
        const role = document.getElementById('role').value;
        const status = document.getElementById('status').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        
        // Validation
        if (!email || !role || !status) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Password validation if new password provided
        if (newPassword || confirmNewPassword) {
            if (!newPassword || !confirmNewPassword) {
                alert('Please enter and confirm the new password');
                return;
            }
            
            if (newPassword !== confirmNewPassword) {
                alert('Passwords do not match');
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmNewPassword').value = '';
                return;
            }
            
            if (newPassword.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
        }

        try {
            // Check if email already exists (for other users)
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const otherUser = users.find(u => u.id !== currentUserId && u.email.toLowerCase() === email.toLowerCase());
            
            if (otherUser) {
                alert('Email already in use by another user');
                return;
            }

            // Prepare update data
            const updateData = {
                email: email,
                role: role,
                status: status
            };

            // Hash new password if provided
            if (newPassword) {
                updateData.password = hashPassword(newPassword);
            }

            // Update user
            updateUser(currentUserId, updateData);
            
            alert('✅ User updated successfully!');
            window.location.href = 'admin-users.html';
        } catch (error) {
            console.error('Error updating user:', error);
            alert('❌ Error updating user: ' + error.message);
        }
    });
}

// Update user in localStorage
function updateUser(id, data) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const index = users.findIndex(u => u.id === id);
    
    if (index > -1) {
        users[index] = {
            ...users[index],
            email: data.email,
            role: data.role,
            status: data.status,
            updatedAt: new Date().toISOString()
        };
        
        // Only update password if provided
        if (data.password) {
            users[index].password = data.password;
        }
        
        localStorage.setItem('users', JSON.stringify(users));
        console.log('User updated:', { id: users[index].id, username: users[index].username, email: users[index].email });
    }
}

// Simple password hashing function (must match login hash function)
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

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
