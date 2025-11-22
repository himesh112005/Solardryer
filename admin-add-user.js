// Admin Add User Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Add User Page Loaded');
    setupUserForm();
});

// Setup user form
function setupUserForm() {
    const form = document.getElementById('addUserForm');
    if (!form) {
        console.error('Form not found');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const role = document.getElementById('role').value;
        const status = document.getElementById('status').value;
        
        // Validation
        if (!username || !email || !password || !role || !status) {
            alert('Please fill in all required fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            document.getElementById('password').value = '';
            document.getElementById('confirmPassword').value = '';
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            alert('Username can only contain letters, numbers, and underscores');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        try {
            // Check if username or email already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
                alert('Username already exists. Please choose a different username.');
                return;
            }

            if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
                alert('Email already exists. Please use a different email address.');
                return;
            }

            // Hash password (must match login hash function)
            const hashedPassword = hashPassword(password);

            // Create user object
            const user = {
                id: Date.now(),
                username: username,
                email: email,
                password: hashedPassword, // Store hashed password
                role: role,
                status: status,
                joinedDate: new Date().toISOString().split('T')[0],
                lastLogin: null,
                createdAt: new Date().toISOString()
            };

            console.log('Creating user:', { id: user.id, username: user.username, email: user.email, role: user.role });

            // Save to localStorage
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('usersInitialized', 'true');
            
            console.log('User created successfully. Total users:', users.length);
            
            alert('✅ User created successfully!');
            
            // Reset form
            form.reset();
            
            // Redirect to users management
            setTimeout(() => {
                window.location.href = 'admin-users.html';
            }, 500);
            
        } catch (error) {
            console.error('Error creating user:', error);
            alert('❌ Error creating user: ' + error.message);
        }
    });
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

// Verify password function
function verifyPassword(inputPassword, hashedPassword) {
    const inputHash = hashPassword(inputPassword);
    return inputHash === hashedPassword;
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
