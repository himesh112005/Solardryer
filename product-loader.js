// Product Loader Script with Supabase Real-time Support
const api = new APIClient();

document.addEventListener('DOMContentLoaded', function() {
    console.log('Products page loading...');
    loadProducts();
    
    // Subscribe to Real-time updates
    if (api.supabase) {
        api.subscribeToProducts((payload) => {
            console.log('Product change detected, reloading grid...');
            loadProducts();
        });
    }
});

// Load products
async function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) {
        console.error('Product grid not found');
        return;
    }

    productGrid.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">Loading products...</div>';

    try {
        // Fetch from API (Supabase prioritized inside APIClient)
        const result = await api.getProducts();
        
        let products = [];
        if (result.success && result.data.length > 0) {
            products = result.data;
        } else {
            // Fallback to local defaults if no DB data
            products = getDefaultProducts();
        }
        
        // Filter active products
        const activeProducts = products.filter(p => p.status === 'active');
        
        if (activeProducts.length === 0) {
            productGrid.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">No products available.</div>';
            return;
        }
        
        // Display products
        displayProducts(activeProducts, productGrid);
        
    } catch (error) {
        console.error('Error loading products:', error);
        productGrid.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">Error loading products.</div>';
    }
}

// Display products
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

// Get default products (only called if no data in DB)
function getDefaultProducts() {
    return [
        {
            id: '1',
            name: 'Small Farm Unit',
            model_id: 'S-100',
            price: 25000,
            description: 'Perfect for individual farmers, this compact unit offers high efficiency for small batches of produce.',
            image: 'https://placehold.co/300x200/2a9d8f/ffffff?text=Small+Farm+Dryer',
            status: 'active'
        },
        {
            id: '2',
            name: 'Commercial Processor',
            model_id: 'C-500',
            price: 150000,
            description: 'A medium-scale solution designed for co-ops and small businesses requiring larger capacity and faster drying times.',
            image: 'https://placehold.co/300x200/e9c46a/264653?text=Commercial+Dryer',
            status: 'active'
        }
    ];
}
