// Load users from database
function loadUsers() {
    const users = db.getAllUsers();
    displayUsers(users);
}

// Display users in table
function displayUsers(users) {
    const tbody = document.getElementById('users-table-body');
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No users found</td></tr>';
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td><span class="role-badge ${user.role}">${user.role}</span></td>
            <td><span class="status ${user.status}">${user.status}</span></td>
            <td>${new Date(user.joinedDate).toLocaleDateString()}</td>
            <td>
                <button onclick="editUser(${user.id})" class="btn-small">Edit</button>
                <button onclick="deleteUser(${user.id})" class="btn-small delete">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Open add user modal
function openAddUserModal() {
    document.getElementById('userModal').style.display = 'block';
}

// Close user modal
function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
    document.getElementById('addUserForm').reset();
}

// Handle add user
function handleAddUser(event) {
    event.preventDefault();
    
    const newUser = {
        username: document.getElementById('newUsername').value,
        email: document.getElementById('newEmail').value,
        password: document.getElementById('newPassword').value,
        role: document.getElementById('newRole').value,
        status: 'active'
    };
    
    db.addUser(newUser);
    alert('User added successfully!');
    closeUserModal();
    loadUsers();
}

// Delete user
function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        db.deleteUser(id);
        loadUsers();
        alert('User deleted successfully!');
    }
}

// Edit user
function editUser(id) {
    alert('Edit functionality coming soon!');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAdminLogin();
    loadUsers();
    
    // Modal close handlers
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = closeUserModal;
    }
    
    window.onclick = function(event) {
        const modal = document.getElementById('userModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
});
