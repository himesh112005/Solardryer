// Admin Users Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Users Page Loaded');
    loadUsers();
});

// Load users
function loadUsers() {
    const tbody = document.getElementById('users-table');
    
    if (!tbody) return;

    try {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // If no users, initialize with default users
        if (users.length === 0) {
            users = getDefaultUsers();
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('usersInitialized', 'true');
            console.log('Users initialized with defaults');
        }
        
        displayUsers(users, tbody);
    } catch (error) {
        console.error('Error loading users:', error);
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">Error loading users</td></tr>';
    }
}

// Display users
function displayUsers(users, tbody) {
    if (!users || users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No users found. <a href="admin-add-user.html">Add new user</a></td></tr>';
        return;
    }

    tbody.innerHTML = users.map(user => {
        const date = new Date(user.joinedDate).toLocaleDateString();
        const roleClass = `role-${user.role}`;
        const statusClass = user.status;
        
        return `
            <tr>
                <td><strong>${user.username}</strong></td>
                <td>${user.email}</td>
                <td><span class="role-badge ${roleClass}">${user.role}</span></td>
                <td><span class="status ${statusClass}">${user.status}</span></td>
                <td>${date}</td>
                <td>
                    <a href="admin-edit-user.html?id=${user.id}" class="btn-small">Edit</a>
                    ${user.username !== 'admin' ? `<button onclick="deleteUser(${user.id})" class="btn-small delete">Delete</button>` : '<button class="btn-small" disabled title="Cannot delete admin user">Delete</button>'}
                </td>
            </tr>
        `;
    }).join('');
}

// Get default users with hashed passwords
function getDefaultUsers() {
    // Hash default passwords
    const adminPassword = hashPassword('admin123');
    const userPassword = hashPassword('user123');
    
    console.log('Creating default users with hashed passwords');
    
    return [
        {
            id: 1,
            username: 'admin',
            email: 'admin@solardry.com',
            password: adminPassword,
            role: 'admin',
            status: 'active',
            joinedDate: '2025-01-01',
            lastLogin: null,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            username: 'user1',
            email: 'user1@example.com',
            password: userPassword,
            role: 'user',
            status: 'active',
            joinedDate: '2025-01-10',
            lastLogin: null,
            createdAt: new Date().toISOString()
        }
    ];
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

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userToDelete = users.find(u => u.id === id);
            
            if (userToDelete && userToDelete.username === 'admin') {
                alert('❌ Cannot delete admin user');
                return;
            }
            
            users = users.filter(u => u.id !== id);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('usersInitialized', 'true');
            
            console.log('User deleted. Remaining:', users.length);
            alert('✅ User deleted successfully!');
            loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('❌ Error deleting user');
        }
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
