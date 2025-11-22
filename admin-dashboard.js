// Admin Dashboard Script

// Protect this page - runs only once
if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Dashboard Loaded');
    
    displayAdminInfo();
    displayCurrentDate();
    loadRecentMessages();
});

// Display admin info
function displayAdminInfo() {
    const user = authManager.getUser();
    
    if (user) {
        const adminInfoElement = document.getElementById('admin-username');
        if (adminInfoElement) {
            adminInfoElement.textContent = `Welcome, ${user.username}`;
        }
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
    const tbody = document.getElementById('messages-tbody');
    
    if (!tbody) return;

    try {
        // First try to load from API
        if (typeof api !== 'undefined' && api && typeof api.getMessages === 'function') {
            api.getMessages().then(result => {
                if (result && result.success && result.data && result.data.length > 0) {
                    const messages = result.data.slice(-5).reverse();
                    displayMessages(messages, tbody);
                } else {
                    // Fallback to local storage
                    loadMessagesFromLocalStorage(tbody);
                }
            }).catch(error => {
                console.error('API Error, loading from local storage:', error);
                loadMessagesFromLocalStorage(tbody);
            });
        } else {
            // API not available, use local storage
            loadMessagesFromLocalStorage(tbody);
        }
    } catch (error) {
        console.error('Error loading messages:', error);
        loadMessagesFromLocalStorage(tbody);
    }
}

// Load messages from local storage
function loadMessagesFromLocalStorage(tbody) {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    
    if (messages.length > 0) {
        const recentMessages = messages.slice(-5).reverse();
        displayMessages(recentMessages, tbody);
        
        // Update unread count
        updateUnreadCount(messages);
    } else {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No messages yet</td></tr>';
    }
}

// Update unread message count
function updateUnreadCount(messages) {
    const unreadCount = messages.filter(m => m.status === 'unread').length;
    const countElement = document.getElementById('message-count');
    if (countElement) {
        countElement.textContent = unreadCount;
    }
}

// Display messages in table
function displayMessages(messages, tbody) {
    if (!messages || messages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No messages yet</td></tr>';
        return;
    }

    tbody.innerHTML = messages.map(msg => {
        const date = new Date(msg.createdDate || msg.created_date);
        const formattedDate = date.toLocaleDateString();
        const statusClass = (msg.status === 'unread') ? 'unread' : 'read';
        
        return `
            <tr>
                <td>${msg.name}</td>
                <td>${msg.email}</td>
                <td>${msg.subject}</td>
                <td>${formattedDate}</td>
                <td><span class="status ${statusClass}">${msg.status}</span></td>
                <td><a href="admin-messages.html" class="btn-small">View</a></td>
            </tr>
        `;
    }).join('');

    // Update message count
    const unreadCount = messages.filter(m => m.status === 'unread').length;
    const countElement = document.getElementById('message-count');
    if (countElement) {
        countElement.textContent = unreadCount;
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
