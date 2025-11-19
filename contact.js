document.addEventListener('DOMContentLoaded', () => {
    // Note: The original HTML did not have a full mobile menu,
    // but this script adds basic functionality for the toggle button.
    
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        // Functionality for the mobile menu toggle
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            
            // Toggle the icon (from burger '≡' to X '✖')
            menuToggle.innerHTML = navLinks.classList.contains('open') ? '&#x2716;' : '&#x2261;';
        });
        
        // Close menu if a link is clicked (good mobile UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    menuToggle.innerHTML = '&#x2261;';
                }
            });
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !phone || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }
            
            // Save to database using DatabaseManager
            const messageData = {
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message
            };
            
            try {
                const result = db.addMessage(messageData);
                
                // Show success notification
                showNotification('✅ Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
                
                // Send email notification (simulated)
                sendEmailNotification(messageData);
                
                // Reset form
                contactForm.reset();
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Clear notification after 5 seconds
                setTimeout(() => {
                    const notification = document.querySelector('.notification');
                    if (notification) {
                        notification.remove();
                    }
                }, 5000);
                
            } catch (error) {
                showNotification('❌ Error sending message. Please try again.', 'error');
                console.error('Error:', error);
            }
        });
    }
});

// Show notification
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.insertBefore(notification, document.body.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Send email notification (simulated - in production use real email service)
function sendEmailNotification(messageData) {
    console.log('Email notification sent to admin:', messageData.email);
    
    // In production, you would call an email service API here
    // Example: sendToEmailService(messageData)
    
    // Store notification log
    const notifications = JSON.parse(localStorage.getItem('notificationLog')) || [];
    notifications.push({
        type: 'contact_message',
        from: messageData.email,
        subject: messageData.subject,
        timestamp: new Date().toISOString(),
        status: 'sent'
    });
    localStorage.setItem('notificationLog', JSON.stringify(notifications));
}