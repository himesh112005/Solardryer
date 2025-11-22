// Home Page Product Loader Script

document.addEventListener('DOMContentLoaded', function() {
    console.log('Home page loading...');
    loadHomeProducts();
});

// Load products for home page
function loadHomeProducts() {
    const productGrid = document.getElementById('homeProductGrid');
    
    if (!productGrid) {
        console.error('Product grid not found');
        return;
    }

    try {
        let products = JSON.parse(localStorage.getItem('products'));
        
        // Check if products were ever initialized
        const initialized = localStorage.getItem('productsInitialized');
        
        // If products is null and not initialized, load default products once
        if (products === null && !initialized) {
            products = getDefaultHomeProducts();
            localStorage.setItem('products', JSON.stringify(products));
            localStorage.setItem('productsInitialized', 'true');
            console.log('Products initialized with defaults');
        } else if (products === null) {
            // If products is null but was initialized, it means user deleted all
            products = [];
            localStorage.setItem('products', JSON.stringify(products));
            console.log('Products initialized as empty');
        }
        
        const activeProducts = products.filter(p => p.status === 'active');
        
        if (activeProducts.length === 0) {
            productGrid.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">No products available.</div>';
            return;
        }
        
        displayHomeProducts(activeProducts, productGrid);
        
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products
function displayHomeProducts(products, container) {
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image || 'https://placehold.co/300x200/2a9d8f/ffffff'}" 
                 alt="${product.name}"
                 onerror="this.src='https://placehold.co/300x200/2a9d8f/ffffff'">
            <div class="product-card-content">
                <span class="product-type">Model ID: ${product.model_id}</span>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
                <a href="mailto:solardryer@gmail.com?subject=Inquiry about ${encodeURIComponent(product.name)}" class="btn">Inquire Now</a>
            </div>
        </div>
    `).join('');
}

// Get default products (only called on first load)
function getDefaultHomeProducts() {
    return [
        {
            id: 1,
            name: 'Small Farm Unit',
            model_id: 'S-100',
            price: 25000,
            description: 'Perfect for individual farmers, this compact unit offers high efficiency for small batches of produce.',
            image: 'https://placehold.co/300x200/2a9d8f/ffffff?text=Small+Farm+Dryer',
            status: 'active'
        },
        {
            id: 2,
            name: 'Commercial Processor',
            model_id: 'C-500',
            price: 150000,
            description: 'A medium-scale solution designed for co-ops and small businesses requiring larger capacity and faster drying times.',
            image: 'https://placehold.co/300x200/e9c46a/264653?text=Commercial+Dryer',
            status: 'active'
        },
        {
            id: 3,
            name: 'Industrial High-Flow System',
            model_id: 'I-2000',
            price: 500000,
            description: 'The top-tier solution for large-volume industrial applications, featuring automated controls and continuous flow.',
            image: 'https://placehold.co/300x200/f4a261/ffffff?text=Industrial+System',
            status: 'active'
        }
    ];
}
