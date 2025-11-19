document.addEventListener('DOMContentLoaded', () => {
    // This script handles the mobile navigation toggle functionality.
    
    const menuToggle = document.getElementById('menu-toggle');
    const desktopNav = document.querySelector('.desktop-nav .nav-links');
    const mobileNavLinksContainer = document.getElementById('mobile-nav-links');

    if (menuToggle && desktopNav && mobileNavLinksContainer) {
        
        // Populate the mobile menu using the desktop links
        const navItems = desktopNav.innerHTML;
        mobileNavLinksContainer.innerHTML = navItems;

        // Toggle visibility and icon on click
        menuToggle.addEventListener('click', () => {
            mobileNavLinksContainer.classList.toggle('open');
            
            // Toggle the icon (from burger to X)
            const isMenuOpen = mobileNavLinksContainer.classList.contains('open');
            menuToggle.innerHTML = isMenuOpen 
                ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
                : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>';
        });
        
        // Close menu if a link is clicked
        mobileNavLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNavLinksContainer.classList.contains('open')) {
                    mobileNavLinksContainer.classList.remove('open');
                    // Reset icon to burger
                    menuToggle.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>';
                }
            });
        });
    }
});