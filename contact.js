// ============================================================
// Contact Page - EmailJS Integration + Form Handling
// ============================================================
// 
// This uses EmailJS (https://www.emailjs.com) to send emails
// directly from the frontend. The admin will receive an email
// notification for every contact form submission.
//
// SETUP INSTRUCTIONS:
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (e.g., Gmail) and note the SERVICE_ID
// 3. Create an Email Template with these variables:
//    {{from_name}}, {{from_email}}, {{phone}}, {{subject}}, {{message}}
// 4. Note the TEMPLATE_ID
// 5. Go to Account > General and note your PUBLIC_KEY
// 6. Replace the values below in EMAILJS_CONFIG
// ============================================================

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'tNk4u1BT5yJHDQWTR',              // ✅ DONE!
    SERVICE_ID: 'service_yhldxm1',               // ✅ DONE!
    TEMPLATE_ID: 'template_yd5g6ts',             // ✅ DONE!
    
    // Admin email where notifications will be sent
    ADMIN_EMAIL: 'sanjeev.suryawanshi269@gmail.com'
};

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('✅ EmailJS initialized successfully');
    } else {
        console.warn('⚠️ EmailJS SDK not loaded. Emails will not be sent.');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // ========================
    // Mobile Menu Toggle
    // ========================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            menuToggle.innerHTML = navLinks.classList.contains('open') ? '&#x2716;' : '&#x2261;';
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    menuToggle.innerHTML = '&#x2261;';
                }
            });
        });
    }

    // ========================
    // Character Count
    // ========================
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageField && charCount) {
        messageField.addEventListener('input', () => {
            const len = messageField.value.length;
            const max = 1000;
            charCount.textContent = `${len} / ${max}`;
            
            charCount.classList.remove('warning', 'limit');
            if (len > max) {
                charCount.classList.add('limit');
            } else if (len > max * 0.8) {
                charCount.classList.add('warning');
            }
        });
    }

    // ========================
    // Contact Form Submission
    // ========================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !phone || !subject || !message) {
                showNotification('Please fill in all required fields', 'error');
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

            // Show loading state
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnIcon.style.display = 'none';
            btnLoader.style.display = 'inline-flex';

            try {
                let emailSent = false;
                let apiSaved = false;

                // 1. Try sending email via EmailJS
                if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
                    try {
                        // Re-initialize to be absolutely sure
                        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

                        const templateParams = {
                            name: name,
                            email: email,
                            phone: phone,
                            subject: subject,
                            message: message,
                            from_name: name,
                            from_email: email,
                            to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
                            reply_to: email
                        };

                        const response = await emailjs.send(
                            EMAILJS_CONFIG.SERVICE_ID,
                            EMAILJS_CONFIG.TEMPLATE_ID,
                            templateParams
                        );

                        if (response.status === 200) {
                            console.log('✅ Email sent successfully:', response);
                            emailSent = true;
                        } else {
                            throw new Error(`EmailJS returned status ${response.status}: ${response.text}`);
                        }
                    } catch (emailError) {
                        console.error('❌ EmailJS error:', emailError);
                        // Show a specific alert for EmailJS failure
                        alert('⚠️ Email notification failed: ' + (emailError.text || emailError.message || 'Unknown error') + '\n\nYour message will still be saved to the database.');
                    }
                } else {
                    console.warn('⚠️ EmailJS not configured. Set up your credentials in EMAILJS_CONFIG.');
                }

                // 2. Try saving via backend API  
                try {
                    const healthCheck = await fetch(`${api.baseURL}/api/health`, {
                        signal: AbortSignal.timeout(3000)
                    }).catch(() => null);
                    
                    if (healthCheck && healthCheck.ok) {
                        if (typeof api !== 'undefined' && api.sendMessage) {
                            const result = await api.sendMessage({
                                name, email, phone, subject, message
                            });
                            
                            if (result.success) {
                                apiSaved = true;
                                console.log('✅ Message saved to backend');
                            }
                        }
                    }
                } catch (apiError) {
                    console.warn('Backend not available:', apiError.message);
                }

                // 3. Always save locally as backup
                saveMessageLocally(name, email, phone, subject, message);

                // Show success ONLY if one of the primary methods worked, or show backup success
                if (emailSent) {
                    showSuccessState();
                } else if (apiSaved) {
                    showSuccessState();
                    alert('Note: Message saved but email notification could not be sent.');
                } else {
                    // Saved locally only
                    showSuccessState();
                    console.log('Message saved locally. Email was not sent.');
                    alert('✅ Message saved locally! \n\nNote: Email notification failed. Please check your EmailJS settings.');
                }

            } catch (error) {
                console.error('Error:', error);
                
                // Save locally as fallback
                saveMessageLocally(name, email, phone, subject, message);
                showNotification('✅ Message saved successfully. We will review it soon.', 'success');
                contactForm.reset();
            }

            // Restore button
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnIcon.style.display = 'inline';
            btnLoader.style.display = 'none';
        });
    }
});

// ========================
// Success State
// ========================
function showSuccessState() {
    const form = document.getElementById('contactForm');
    const formHeader = document.querySelector('.form-header');
    const successState = document.getElementById('successState');
    
    if (form && successState) {
        form.style.display = 'none';
        if (formHeader) formHeader.style.display = 'none';
        successState.style.display = 'block';
        
        // Scroll to success state
        const wrapper = document.getElementById('formWrapper');
        if (wrapper) {
            wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// ========================
// Reset Form
// ========================
function resetForm() {
    const form = document.getElementById('contactForm');
    const formHeader = document.querySelector('.form-header');
    const successState = document.getElementById('successState');
    
    if (form && successState) {
        successState.style.display = 'none';
        if (formHeader) formHeader.style.display = 'block';
        form.style.display = 'flex';
        form.reset();
        
        // Reset char count
        const charCount = document.getElementById('charCount');
        if (charCount) {
            charCount.textContent = '0 / 1000';
            charCount.classList.remove('warning', 'limit');
        }
    }
}

// ========================
// Save Message Locally
// ========================
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
    
    console.log('💾 Message saved to local storage:', newMessage);
}

// ========================
// FAQ Toggle
// ========================
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item.active').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle clicked item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ========================
// Show Notification
// ========================
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