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
        contactForm.addEventListener('submit', async function(e) {
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

            try {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                console.log('Attempting to send message via API...');

                // Check if backend is available
                const healthCheck = await fetch(`${api.baseURL}/api/health`).catch(() => null);
                
                if (!healthCheck) {
                    console.warn('Backend server not responding, using local storage fallback');
                    saveMessageLocally(name, email, phone, subject, message);
                    showNotification('✅ Message saved locally. Admin will review it soon.', 'success');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    return;
                }

                // Try API if backend is available
                if (typeof api !== 'undefined' && api.sendMessage) {
                    const result = await api.sendMessage({
                        name, email, phone, subject, message
                    });
                    
                    if (result.success) {
                        showNotification('✅ Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
                        contactForm.reset();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        console.error('API error:', result.message);
                        // Fallback to local storage
                        saveMessageLocally(name, email, phone, subject, message);
                        showNotification('✅ Message saved. Thank you for contacting us!', 'success');
                        contactForm.reset();
                    }
                } else {
                    // No API, use local storage
                    saveMessageLocally(name, email, phone, subject, message);
                    showNotification('✅ Message saved. Thank you for contacting us!', 'success');
                    contactForm.reset();
                }

                // Restore button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
            } catch (error) {
                console.error('Error:', error);
                
                // Save to local storage as fallback
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();
                
                saveMessageLocally(name, email, phone, subject, message);
                showNotification('✅ Message saved successfully. We will review it soon.', 'success');
                contactForm.reset();
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }
});

// Save message locally
function saveMessageLocally(name, email, phone, subject, message) {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    
    const newMessage = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        status: 'unread',
        createdDate: new Date().toISOString()
    };
    
    messages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    console.log('Message saved to local storage:', newMessage);
}

// Setup fallback contact form (if API not available)
function setupFallbackContact() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

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

        // Save locally
        saveMessageLocally(name, email, phone, subject, message);
        
        showNotification('✅ Message saved successfully. We will review it soon.', 'success');
        contactForm.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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