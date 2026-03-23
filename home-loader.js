// Home Page Product Loader Script with Supabase Real-time Support
const api = new APIClient();

document.addEventListener('DOMContentLoaded', function() {
    console.log('Home page loading...');
    loadHomeProducts();
    
    // Subscribe to Real-time updates
    if (api.supabase) {
        api.subscribeToProducts(() => {
            console.log('Home page: Product change detected, reloading...');
            loadHomeProducts();
        });
    }
});

// Load products for home page
async function loadHomeProducts() {
    const productGrid = document.getElementById('homeProductGrid');
    
    if (!productGrid) {
        console.error('Product grid not found');
        return;
    }

    try {
        const result = await api.getProducts();
        
        let products = [];
        if (result.success && result.data.length > 0) {
            products = result.data;
        } else {
            products = getDefaultHomeProducts();
        }
        
        const activeProducts = products.filter(p => p.status === 'active').slice(0, 3);
        
        if (activeProducts.length === 0) {
            productGrid.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">No featured products available.</div>';
            return;
        }
        
        displayHomeProducts(activeProducts, productGrid);
        
    } catch (error) {
        console.error('Error loading products on home page:', error);
    }
}

// Display products
function displayHomeProducts(products, container) {
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image_url || product.image || 'https://placehold.co/300x200/2a9d8f/ffffff'}" 
                 alt="${product.name}"
                 onerror="this.src='https://placehold.co/300x200/2a9d8f/ffffff'">
            <div class="product-card-content">
                <span class="product-type">Model ID: ${product.model_id || product.modelId}</span>
                <h3>${product.name}</h3>
                <p>${product.description || 'Quality solar dryer for farming needs.'}</p>
                <div class="price">₹${parseFloat(product.price).toLocaleString('en-IN')}</div>
                <a href="mailto:sanjeev.suryawanshi269@gmail.com?subject=Inquiry about ${encodeURIComponent(product.name)}" class="btn">Inquire Now</a>
            </div>
        </div>
    `).join('');
}

// Get default products
function getDefaultHomeProducts() {
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
