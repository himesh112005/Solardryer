// Home Page Loader Script - Connected to localStorage (Admin Panel)
const DATA_VERSION = '3.0'; // Bump this when default data changes

document.addEventListener('DOMContentLoaded', function() {
    console.log('Home page loading...');
    
    // Reset defaults if data version changed (ensures new sample data loads)
    if (localStorage.getItem('dataVersion') !== DATA_VERSION) {
        localStorage.removeItem('products');
        localStorage.removeItem('dryingGuideItems');
        localStorage.removeItem('articles');
        localStorage.setItem('dataVersion', DATA_VERSION);
        console.log('Data version updated to', DATA_VERSION, '- defaults refreshed');
    }
    
    loadHomeProducts();
    loadDryingGuide();
});

// ============ PRODUCTS (from Admin) ============
function loadHomeProducts() {
    const productGrid = document.getElementById('homeProductGrid');
    if (!productGrid) return;

    // Read from localStorage (shared with admin panel)
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    // If no admin products, use defaults
    if (products.length === 0) {
        products = getDefaultHomeProducts();
    }
    
    const activeProducts = products.filter(p => p.status === 'active').slice(0, 3);
    
    if (activeProducts.length === 0) {
        productGrid.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">No featured products available.</div>';
        return;
    }
    
    displayHomeProducts(activeProducts, productGrid);
}

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

function getDefaultHomeProducts() {
    return [
        { id: 1, name: 'SolarDry Compact – Small Farm Unit', model_id: 'SD-100', price: 25000, description: 'Ideal for individual farmers drying up to 10 kg per batch. Compact, portable, and perfect for fruits, vegetables, and herbs.', image: 'https://placehold.co/400x250/2a9d8f/ffffff?text=Small+Farm+Dryer', status: 'active' },
        { id: 2, name: 'SolarDry Plus – Medium Community Dryer', model_id: 'SD-300', price: 75000, description: 'Designed for farmer groups and co-operatives. Handles 25–50 kg per batch with enhanced airflow and dual-tray system.', image: 'https://placehold.co/400x250/e9c46a/264653?text=Medium+Community+Dryer', status: 'active' },
        { id: 3, name: 'SolarDry Pro – Large Commercial Dryer', model_id: 'SD-750', price: 200000, description: 'Built for agri-businesses and food processors. Capacity of 100–200 kg per batch with fan-assisted convection and temperature control.', image: 'https://placehold.co/400x250/f4a261/ffffff?text=Large+Commercial+Dryer', status: 'active' },
        { id: 4, name: 'SolarDry Max – Industrial High-Flow System', model_id: 'SD-2000', price: 500000, description: 'Top-tier industrial system for large-volume processing units. Handles 500+ kg per batch with automated controls and multi-zone drying.', image: 'https://placehold.co/400x250/264653/e9c46a?text=Industrial+System', status: 'active' }
    ];
}

// ============ DRYING GUIDE (from Admin) ============
function loadDryingGuide() {
    const guideGrid = document.getElementById('dryingGuideGrid');
    if (!guideGrid) return;

    // Read from localStorage (managed by admin panel)
    let items = JSON.parse(localStorage.getItem('dryingGuideItems')) || [];
    
    // If no admin items, use defaults
    if (items.length === 0) {
        items = getDefaultDryingGuideItems();
        // Save defaults so admin sees them too
        localStorage.setItem('dryingGuideItems', JSON.stringify(items));
    }

    displayDryingGuide(items, guideGrid);
}

function displayDryingGuide(items, container) {
    container.innerHTML = items.map(item => {
        const categoryColors = {
            'fruit': { bg: '#fff3e0', accent: '#e65100', icon: '🍎' },
            'vegetable': { bg: '#e8f5e9', accent: '#2e7d32', icon: '🥕' },
            'spice': { bg: '#fce4ec', accent: '#c62828', icon: '🌶️' },
            'grain': { bg: '#fff8e1', accent: '#f57f17', icon: '🌾' },
            'herb': { bg: '#e0f2f1', accent: '#00695c', icon: '🌿' },
            'other': { bg: '#f3e5f5', accent: '#6a1b9a', icon: '📦' }
        };
        const cat = categoryColors[item.category] || categoryColors['other'];

        // Calculate mass reduction percentage
        const initialMass = parseFloat(item.initialMass) || 0;
        const finalMass = parseFloat(item.finalMass) || 0;
        const massReduction = initialMass > 0 ? Math.round(((initialMass - finalMass) / initialMass) * 100) : 0;

        // Build time comparison bar
        const traditionalTime = item.traditionalTime || '';
        const solarTime = item.dryingTime || '';

        return `
            <div class="drying-guide-card" style="--card-accent: ${cat.accent}; --card-bg: ${cat.bg};">
                <div class="guide-card-header">
                    <span class="guide-icon">${cat.icon}</span>
                    <span class="guide-category">${item.category}</span>
                </div>
                <h4 class="guide-item-name">${item.name}</h4>
                <div class="guide-specs">
                    <div class="guide-spec">
                        <span class="spec-icon">🌡️</span>
                        <div>
                            <span class="spec-label">Temperature</span>
                            <span class="spec-value">${item.temperature}</span>
                        </div>
                    </div>
                    <div class="guide-spec">
                        <span class="spec-icon">💧</span>
                        <div>
                            <span class="spec-label">Humidity</span>
                            <span class="spec-value">${item.humidity}</span>
                        </div>
                    </div>
                </div>

                <!-- Mass Before & After -->
                ${initialMass > 0 ? `
                <div class="guide-mass-section">
                    <div class="mass-header">⚖️ Mass Change (per 1 kg sample)</div>
                    <div class="mass-bar-wrapper">
                        <div class="mass-row">
                            <span class="mass-label">Before</span>
                            <div class="mass-bar-track">
                                <div class="mass-bar initial" style="width: 100%;"></div>
                            </div>
                            <span class="mass-val">${item.initialMass} g</span>
                        </div>
                        <div class="mass-row">
                            <span class="mass-label">After</span>
                            <div class="mass-bar-track">
                                <div class="mass-bar final" style="width: ${(finalMass / initialMass * 100).toFixed(0)}%; background: var(--card-accent);"></div>
                            </div>
                            <span class="mass-val">${item.finalMass} g</span>
                        </div>
                    </div>
                    <div class="mass-reduction">↓ ${massReduction}% moisture removed</div>
                </div>
                ` : ''}

                <!-- Time Comparison: Traditional vs Solar -->
                <div class="guide-time-compare">
                    <div class="time-compare-header">⏱️ Drying Time Comparison</div>
                    <div class="time-row traditional">
                        <span class="time-method">☀️ Open Sun</span>
                        <span class="time-value bad">${traditionalTime || 'N/A'}</span>
                    </div>
                    <div class="time-row solar">
                        <span class="time-method">🔆 Solar Dryer</span>
                        <span class="time-value good">${solarTime}</span>
                    </div>
                </div>

                ${item.notes ? `<p class="guide-notes">${item.notes}</p>` : ''}
            </div>
        `;
    }).join('');
}

function getDefaultDryingGuideItems() {
    return [
        { id: 1, name: 'Mango Slices', category: 'fruit', temperature: '55–65°C', humidity: '10–12%', dryingTime: '8–12 hrs', initialMass: '1000', finalMass: '150', traditionalTime: '3–5 days', notes: 'Slice 5–8mm thick. Golden color when done.' },
        { id: 2, name: 'Tomatoes', category: 'vegetable', temperature: '55–60°C', humidity: '8–10%', dryingTime: '10–18 hrs', initialMass: '1000', finalMass: '100', traditionalTime: '4–7 days', notes: 'Halve or quarter. Leathery texture when ready.' },
        { id: 3, name: 'Red Chilli', category: 'spice', temperature: '50–60°C', humidity: '8–10%', dryingTime: '6–10 hrs', initialMass: '1000', finalMass: '200', traditionalTime: '5–8 days', notes: 'Whole or split. Brittle when fully dry.' },
        { id: 4, name: 'Paddy / Rice', category: 'grain', temperature: '40–50°C', humidity: '12–14%', dryingTime: '6–8 hrs', initialMass: '1000', finalMass: '860', traditionalTime: '2–3 days', notes: 'Spread thin layer. Cracks when bitten = done.' },
        { id: 5, name: 'Mint Leaves', category: 'herb', temperature: '35–45°C', humidity: '6–8%', dryingTime: '3–5 hrs', initialMass: '1000', finalMass: '120', traditionalTime: '2–4 days', notes: 'Crumbles easily when properly dried.' },
        { id: 6, name: 'Onion Flakes', category: 'vegetable', temperature: '55–65°C', humidity: '4–6%', dryingTime: '6–10 hrs', initialMass: '1000', finalMass: '100', traditionalTime: '3–5 days', notes: 'Slice 3mm rings. Crispy and translucent.' },
        { id: 7, name: 'Turmeric', category: 'spice', temperature: '50–60°C', humidity: '8–10%', dryingTime: '10–15 hrs', initialMass: '1000', finalMass: '200', traditionalTime: '7–14 days', notes: 'Boil 45 min first. Hard and brittle when done.' },
        { id: 8, name: 'Banana Chips', category: 'fruit', temperature: '60–70°C', humidity: '6–8%', dryingTime: '8–12 hrs', initialMass: '1000', finalMass: '180', traditionalTime: '3–5 days', notes: 'Slice 3–5mm. Crispy and slightly chewy.' },
        { id: 9, name: 'Coriander', category: 'herb', temperature: '35–40°C', humidity: '6–8%', dryingTime: '4–6 hrs', initialMass: '1000', finalMass: '110', traditionalTime: '3–5 days', notes: 'Tie in bunches. Keep aroma by low temperature.' },
        { id: 10, name: 'Grapes (Raisins)', category: 'fruit', temperature: '50–60°C', humidity: '14–18%', dryingTime: '24–48 hrs', initialMass: '1000', finalMass: '250', traditionalTime: '10–20 days', notes: 'Dip in alkaline solution for golden color.' },
        { id: 11, name: 'Amla (Gooseberry)', category: 'fruit', temperature: '50–55°C', humidity: '8–10%', dryingTime: '10–14 hrs', initialMass: '1000', finalMass: '140', traditionalTime: '5–8 days', notes: 'Deseed and slice. High vitamin C retention.' },
        { id: 12, name: 'Drumstick (Moringa)', category: 'vegetable', temperature: '50–60°C', humidity: '6–8%', dryingTime: '6–10 hrs', initialMass: '1000', finalMass: '130', traditionalTime: '4–6 days', notes: 'Slice pods or dry leaves. Retains nutrients well.' }
    ];
}
