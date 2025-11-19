document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        // Toggle the 'open' class on the navigation list
        navLinks.classList.toggle('open');
        
        // Toggle the icon (from burger '≡' to X '✖')
        // Using innerHTML is safe here as the content is known characters.
        menuToggle.innerHTML = navLinks.classList.contains('open') ? '&#x2716;' : '&#x2261;';
    });
    
    // Optional: Close menu if a link is clicked (good mobile UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                menuToggle.innerHTML = '&#x2261;';
            }
        });
    });
});