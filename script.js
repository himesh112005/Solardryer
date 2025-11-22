// Main script file for SolarDry Solutions

document.addEventListener('DOMContentLoaded', function() {
    console.log('SolarDry Solutions loaded');
    
    // Initialize page
    initializePage();
});

function initializePage() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav links
    updateActiveNavLink();
    
    // Load products from API if available
    loadProducts();
}

// Update active navigation link
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Load products from API
async function loadProducts() {
    if (typeof api === 'undefined') {
        console.log('API not available, using static products');
        return;
    }

    try {
        // Uncomment to load from API
        // const result = await api.getProducts();
        // if (result.success) {
        //     displayProducts(result.data);
        // }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products
function displayProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-content">
                <span class="product-type">Model ID: ${product.model_id}</span>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
                <a href="contact.html" class="btn">Inquire Now</a>
            </div>
        </div>
    `).join('');
}
