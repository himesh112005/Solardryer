let currentMessageId = null;
let allMessages = [];

// Load messages from database
function loadMessages() {
    allMessages = db.getAllMessages();
    displayMessages(allMessages);
    updateMessageStats();
}

// Display messages in table
function displayMessages(messages) {
    const tbody = document.getElementById('messages-table-body');
    
    if (messages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No messages found</td></tr>';
        return;
    }
    
    tbody.innerHTML = messages.map((msg) => {
        const date = new Date(msg.createdDate);
        const formattedDate = date.toLocaleDateString();
        const statusClass = msg.status === 'unread' ? 'unread' : 'read';
        const statusText = msg.status.charAt(0).toUpperCase() + msg.status.slice(1);
        
        return `
            <tr class="${msg.status === 'unread' ? 'unread-row' : ''}">
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

// View message details
function viewMessage(id) {
    const message = db.getMessageById(id);
    currentMessageId = id;
    
    if (!message) {
        alert('Message not found');
        return;
    }
    
    const date = new Date(message.createdDate);
    const formattedDate = date.toLocaleString();
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="message-details">
            <div class="message-header">
                <div class="message-sender">
                    <h3>${message.name}</h3>
                    <p><strong>Email:</strong> <a href="mailto:${message.email}">${message.email}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:${message.phone}">${message.phone}</a></p>
                </div>
                <div class="message-meta">
                    <p><strong>Date:</strong> ${formattedDate}</p>
                    <p><strong>Status:</strong> <span class="status ${message.status}">${message.status.charAt(0).toUpperCase() + message.status.slice(1)}</span></p>
                </div>
            </div>
            
            <div class="message-subject">
                <h4>Subject: ${message.subject}</h4>
            </div>
            
            <div class="message-body">
                <p>${message.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            ${message.reply ? `
                <div class="message-reply">
                    <h4>Admin Reply:</h4>
                    <p>${message.reply.replace(/\n/g, '<br>')}</p>
                    <small>Replied on: ${new Date(message.replyDate).toLocaleString()}</small>
                </div>
            ` : ''}
        </div>
    `;
    
    // Update button state
    const markReadBtn = document.getElementById('markReadBtn');
    if (message.status === 'read') {
        markReadBtn.textContent = 'Already Read';
        markReadBtn.disabled = true;
    } else {
        markReadBtn.textContent = 'Mark as Read';
        markReadBtn.disabled = false;
    }
    
    document.getElementById('messageModal').style.display = 'block';
    
    // Mark as read when opened
    if (message.status === 'unread') {
        setTimeout(() => {
            markAsRead();
        }, 1000);
    }
}

// Mark message as read
function markAsRead() {
    if (currentMessageId !== null) {
        const message = db.getMessageById(currentMessageId);
        if (message && message.status === 'unread') {
            db.updateMessage(currentMessageId, { status: 'read' });
            loadMessages();
            
            // Update button
            const markReadBtn = document.getElementById('markReadBtn');
            markReadBtn.textContent = 'Already Read';
            markReadBtn.disabled = true;
        }
    }
}

// Reply to message
function replyToMessage() {
    const message = db.getMessageById(currentMessageId);
    if (message) {
        const subject = `Re: ${message.subject}`;
        const body = `Hello ${message.name},\n\nThank you for reaching out.\n\nBest regards,\nSolarDry Solutions Team`;
        
        window.location.href = `mailto:${message.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
}

// Delete message with confirmation
function deleteMessageConfirm(id) {
    if (confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
        deleteMessage(id);
    }
}

// Delete message
function deleteMessage(id = currentMessageId) {
    if (id === null) return;
    
    db.deleteMessage(id);
    loadMessages();
    
    if (currentMessageId === id) {
        closeModal();
    }
    
    showNotification('Message deleted successfully!', 'success');
}

// Filter messages
function filterMessages() {
    const filter = document.getElementById('statusFilter').value;
    let filtered = allMessages;
    
    if (filter === 'unread') {
        filtered = allMessages.filter(msg => msg.status === 'unread');
    } else if (filter === 'read') {
        filtered = allMessages.filter(msg => msg.status === 'read');
    }
    
    displayMessages(filtered);
}

// Search messages
function searchMessages() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    const filtered = allMessages.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm) ||
        msg.email.toLowerCase().includes(searchTerm) ||
        msg.phone.includes(searchTerm) ||
        msg.subject.toLowerCase().includes(searchTerm) ||
        msg.message.toLowerCase().includes(searchTerm)
    );
    
    displayMessages(filtered);
}

// Update message statistics
function updateMessageStats() {
    const total = allMessages.length;
    const unread = allMessages.filter(m => m.status === 'unread').length;
    const read = allMessages.filter(m => m.status === 'read').length;
    
    document.getElementById('totalMessages').textContent = total;
    document.getElementById('unreadMessages').textContent = unread;
    document.getElementById('readMessages').textContent = read;
}

// Close modal
function closeModal() {
    document.getElementById('messageModal').style.display = 'none';
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    document.body.insertBefore(notification, document.body.firstChild);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAdminLogin();
    loadMessages();
    
    // Modal close handlers
    document.querySelector('.close').onclick = closeModal;
    window.onclick = function(event) {
        const modal = document.getElementById('messageModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
    
    // Auto-refresh messages every 30 seconds
    setInterval(() => {
        loadMessages();
    }, 30000);
});
