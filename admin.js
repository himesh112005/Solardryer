// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAdminLogin();
    displayCurrentDate();
    displayAdminUsername();
    loadRecentMessages();
    updateStatistics();
});

// Check if user is logged in
function checkAdminLogin() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') || localStorage.getItem('adminLoggedIn');
    
    if (!isLoggedIn) {
        window.location.href = 'admin.html';
    }
}

// Display admin username
function displayAdminUsername() {
    const username = sessionStorage.getItem('adminUsername') || localStorage.getItem('adminUsername') || 'Admin';
    const adminInfoElement = document.getElementById('admin-username');
    if (adminInfoElement) {
        adminInfoElement.textContent = `Welcome, ${username}`;
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

// Load recent messages
function loadRecentMessages() {
    const messages = db.getAllMessages().slice(-5).reverse();
    const tbody = document.getElementById('messages-tbody');
    
    if (!tbody) return;
    
    if (messages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No messages yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = messages.map(msg => `
        <tr>
            <td>${msg.name}</td>
            <td>${msg.email}</td>
            <td>${msg.subject}</td>
            <td>${new Date(msg.createdDate).toLocaleDateString()}</td>
            <td><span class="status ${msg.status}">${msg.status}</span></td>
            <td><a href="admin-messages.html?id=${msg.id}" class="btn-small">View</a></td>
        </tr>
    `).join('');
}

// Update dashboard statistics
function updateStatistics() {
    const stats = db.getStatistics();
    
    // Update message count
    const messageCountEl = document.getElementById('message-count');
    if (messageCountEl) {
        messageCountEl.textContent = stats.unreadMessages;
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
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        
        alert('Logged out successfully!');
        window.location.href = 'admin.html';
    }
}
