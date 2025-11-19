document.addEventListener('DOMContentLoaded', () => {
    // Basic script to handle mobile navigation toggle
    const menuToggle = document.getElementById('menu-toggle');
    const desktopNav = document.querySelector('.desktop-nav .nav-links');
    const mobileNavLinksContainer = document.getElementById('mobile-nav-links');

    if (menuToggle && desktopNav && mobileNavLinksContainer) {
        
        // Clone desktop links to use in the mobile menu
        const navItems = desktopNav.innerHTML;
        mobileNavLinksContainer.innerHTML = navItems;

        // Functionality for the mobile menu toggle
        menuToggle.addEventListener('click', () => {
            mobileNavLinksContainer.classList.toggle('open');
            
            // Toggle the icon (from burger '≡' to X '✖')
            menuToggle.innerHTML = mobileNavLinksContainer.classList.contains('open') ? '&#x2716;' : '&#x2261;';
        });
        
        // Close menu if a link is clicked (good mobile UX)
        mobileNavLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNavLinksContainer.classList.contains('open')) {
                    mobileNavLinksContainer.classList.remove('open');
                    menuToggle.innerHTML = '&#x2261;';
                }
            });
        });
    }
});