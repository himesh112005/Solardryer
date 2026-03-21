// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    // Use authManager if available, otherwise fallback
    if (typeof authManager !== 'undefined') {
        authManager.protectPage('admin.html');
    } else {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'admin.html';
            return;
        }
    }
    
    displayCurrentDate();
    displayAdminUsername();
    loadRecentMessages();
    updateStatistics();
});

// Display admin username
function displayAdminUsername() {
    const user = (typeof authManager !== 'undefined' && authManager.getUser) 
        ? authManager.getUser() 
        : JSON.parse(localStorage.getItem('user'));
    
    const adminInfoElement = document.getElementById('admin-username');
    if (adminInfoElement && user) {
        adminInfoElement.textContent = `Welcome, ${user.username}`;
    }
}

// Display current date
function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Load recent messages from localStorage
function loadRecentMessages() {
    const tbody = document.getElementById('messages-tbody');
    
    if (!tbody) return;
    
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    
    if (messages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No messages yet</td></tr>';
        return;
    }
    
    const recentMessages = messages.slice(-5).reverse();
    
    tbody.innerHTML = recentMessages.map(msg => `
        <tr>
            <td>${msg.name}</td>
            <td>${msg.email}</td>
            <td>${msg.subject}</td>
            <td>${new Date(msg.createdDate).toLocaleDateString()}</td>
            <td><span class="status ${msg.status}">${msg.status}</span></td>
            <td><a href="admin-messages.html" class="btn-small">View</a></td>
        </tr>
    `).join('');
}

// Update dashboard statistics
function updateStatistics() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const unreadCount = messages.filter(m => m.status === 'unread').length;
    
    const messageCountEl = document.getElementById('message-count');
    if (messageCountEl) {
        messageCountEl.textContent = unreadCount;
    }
}

// Handle Add Product
function handleAddProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const modelId = document.getElementById('model-id').value;
    const price = document.getElementById('price').value;
    
    if (name && modelId && price) {
        alert('Product added successfully!');
        document.getElementById('addProductForm').reset();
        window.location.href = 'admin-products.html';
    }
}

// Handle Add Blog
function handleAddBlog(event) {
    event.preventDefault();
    const title = document.getElementById('blog-title').value;
    const category = document.getElementById('blog-category').value;
    const content = document.getElementById('blog-content').value;
    
    if (title && category && content) {
        alert('Blog article published successfully!');
        document.getElementById('addBlogForm').reset();
        window.location.href = 'admin-blog.html';
    }
}

// Delete Product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        alert('Product deleted successfully!');
        location.reload();
    }
}

// Delete Blog
function deleteBlog(id) {
    if (confirm('Are you sure you want to delete this article?')) {
        alert('Article deleted successfully!');
        location.reload();
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        if (typeof authManager !== 'undefined') {
            authManager.logout();
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('rememberMe');
            window.location.href = 'admin.html';
        }
    }
}
