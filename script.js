// This file is currently empty, as no JavaScript logic was present in the provided HTML.

// You can add your interactive features here, for example:


document.addEventListener('DOMContentLoaded', () => {
    // Example: Add a simple log when the page loads
    console.log("SolarDry Solutions page loaded successfully!");

    // Example: Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
