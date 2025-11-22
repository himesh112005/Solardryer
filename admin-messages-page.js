// Admin Messages Page Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

let allMessages = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Messages Page Loaded');
    loadMessages();
});

// Load messages
function loadMessages() {
    const tbody = document.getElementById('messages-table');
    
    if (!tbody) return;

    try {
        // Try API first
        if (typeof api !== 'undefined' && api && typeof api.getMessages === 'function') {
            api.getMessages().then(result => {
                if (result && result.success && result.data) {
                    allMessages = result.data;
                    displayMessages(allMessages, tbody);
                } else {
                    // Fallback to local storage
                    loadMessagesFromLocalStorage(tbody);
                }
            }).catch(error => {
                console.error('API error, loading from local storage:', error);
                loadMessagesFromLocalStorage(tbody);
            });
        } else {
            // API not available
            loadMessagesFromLocalStorage(tbody);
        }
    } catch (error) {
        console.error('Error:', error);
        loadMessagesFromLocalStorage(tbody);
    }
}

// Load from local storage
function loadMessagesFromLocalStorage(tbody) {
    allMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    displayMessages(allMessages, tbody);
}

// Display messages
function displayMessages(messages, tbody) {
    if (!messages || messages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No messages found</td></tr>';
        return;
    }

    tbody.innerHTML = messages.map(msg => {
        const date = new Date(msg.createdDate || msg.created_date);
        const formattedDate = date.toLocaleDateString();
        const statusClass = msg.status === 'unread' ? 'unread' : 'read';
        const statusText = msg.status.charAt(0).toUpperCase() + msg.status.slice(1);
        
        return `
            <tr class="${statusClass === 'unread' ? 'unread-row' : ''}">
                <td><strong>${msg.name}</strong></td>
                <td>${msg.email}</td>
                <td>${msg.phone}</td>
                <td>${msg.subject}</td>
                <td>${formattedDate}</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td>
                    <button onclick="viewMessage(${msg.id})" class="btn-small">View</button>
                    <button onclick="deleteMessageConfirm(${msg.id})" class="btn-small delete">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

function viewMessage(id) {
    const message = allMessages.find(m => m.id === id);
    
    if (!message) {
        alert('Message not found');
        return;
    }
    
    const date = new Date(message.createdDate).toLocaleString();
    alert(`From: ${message.name} (${message.email})\nPhone: ${message.phone}\nDate: ${date}\n\nMessage:\n${message.message}`);
    
    // Mark as read
    if (message.status === 'unread') {
        markAsRead(message.id);
    }
}

function markAsRead(id) {
    const index = allMessages.findIndex(m => m.id === id);
    if (index > -1) {
        allMessages[index].status = 'read';
        localStorage.setItem('contactMessages', JSON.stringify(allMessages));
        loadMessages();
    }
}

function deleteMessageConfirm(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        deleteMessage(id);
    }
}

function deleteMessage(id) {
    const index = allMessages.findIndex(m => m.id === id);
    if (index > -1) {
        allMessages.splice(index, 1);
        localStorage.setItem('contactMessages', JSON.stringify(allMessages));
        loadMessages();
        alert('Message deleted successfully!');
    }
}

function filterMessages() {
    const filter = document.getElementById('statusFilter').value;
    let filtered = allMessages;
    
    if (filter === 'unread') {
        filtered = allMessages.filter(msg => msg.status === 'unread');
    } else if (filter === 'read') {
        filtered = allMessages.filter(msg => msg.status === 'read');
    }
    
    const tbody = document.getElementById('messages-table');
    displayMessages(filtered, tbody);
}

function searchMessages() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    const filtered = allMessages.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm) ||
        msg.email.toLowerCase().includes(searchTerm) ||
        msg.phone.includes(searchTerm) ||
        msg.subject.toLowerCase().includes(searchTerm) ||
        msg.message.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.getElementById('messages-table');
    displayMessages(filtered, tbody);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
