// Shared Mobile Navigation Script for all pages
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navElement = document.querySelector('.navbar nav');
    
    if (menuToggle && navElement) {
        menuToggle.addEventListener('click', function() {
            // Toggle the hamburger animation
            menuToggle.classList.toggle('active');
            // Toggle the nav dropdown
            navElement.classList.toggle('nav-open');
        });

        // Close menu when a link is clicked (for smooth UX)
        const navLinks = navElement.querySelectorAll('.nav-links a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navElement.classList.remove('nav-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navElement.contains(e.target)) {
                menuToggle.classList.remove('active');
                navElement.classList.remove('nav-open');
            }
        });
    }
});
