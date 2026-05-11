// Product Loader Script - Connected to localStorage (Admin Panel)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Products page loading...');
    loadProducts();
});

function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    productGrid.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">Loading products...</div>';

    // Read from localStorage (shared with admin panel)
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    if (products.length === 0) {
        products = getDefaultProducts();
    }
    
    const activeProducts = products.filter(p => p.status === 'active');
    
    if (activeProducts.length === 0) {
        productGrid.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">No products available.</div>';
        return;
    }
    
    displayProducts(activeProducts, productGrid);
}

function displayProducts(products, container) {
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image_url || product.image || 'https://placehold.co/300x200/2a9d8f/ffffff?text=' + encodeURIComponent(product.name)}" 
                 alt="${product.name}"
                 onerror="this.src='https://placehold.co/300x200/2a9d8f/ffffff?text=Product'">
            <div class="product-card-content">
                <span class="product-type">Model ID: ${product.model_id || product.modelId}</span>
                <h3>${product.name}</h3>
                <p>${product.description || 'Quality solar dryer for farming needs.'}</p>
                <div class="price">₹${parseFloat(product.price).toLocaleString('en-IN')}</div>
                <div class="actions" style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                     <a href="mailto:sanjeev.suryawanshi269@gmail.com?subject=Inquiry about ${encodeURIComponent(product.name)}" class="btn">Inquire Now</a>
                </div>
            </div>
        </div>
    `).join('');
}

function getDefaultProducts() {
    return [
        { id: 1, name: 'SolarDry Compact – Small Farm Unit', model_id: 'SD-100', price: 25000, description: 'Ideal for individual farmers drying up to 10 kg per batch. Compact, portable, and perfect for fruits, vegetables, and herbs.', image: 'https://placehold.co/400x250/2a9d8f/ffffff?text=Small+Farm+Dryer', status: 'active' },
        { id: 2, name: 'SolarDry Plus – Medium Community Dryer', model_id: 'SD-300', price: 75000, description: 'Designed for farmer groups and co-operatives. Handles 25–50 kg per batch with enhanced airflow and dual-tray system.', image: 'https://placehold.co/400x250/e9c46a/264653?text=Medium+Community+Dryer', status: 'active' },
        { id: 3, name: 'SolarDry Pro – Large Commercial Dryer', model_id: 'SD-750', price: 200000, description: 'Built for agri-businesses and food processors. Capacity of 100–200 kg per batch with fan-assisted convection and temperature control.', image: 'https://placehold.co/400x250/f4a261/ffffff?text=Large+Commercial+Dryer', status: 'active' },
        { id: 4, name: 'SolarDry Max – Industrial High-Flow System', model_id: 'SD-2000', price: 500000, description: 'Top-tier industrial system for large-volume processing units. Handles 500+ kg per batch with automated controls and multi-zone drying.', image: 'https://placehold.co/400x250/264653/e9c46a?text=Industrial+System', status: 'active' }
    ];
}
