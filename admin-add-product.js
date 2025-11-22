// Admin Add Product Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Add Product Page Loaded');
    setupProductForm();
});

// Setup product form
function setupProductForm() {
    const form = document.getElementById('addProductForm');
    if (!form) {
        console.error('Form not found');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const modelId = document.getElementById('modelId').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const description = document.getElementById('description').value.trim();
        const image = document.getElementById('image').value.trim();
        const status = document.getElementById('status').value.trim();
        
        // Validation
        if (!name || !modelId || !price || !description) {
            alert('Please fill in all required fields');
            return;
        }

        if (price < 0) {
            alert('Price must be a positive number');
            return;
        }

        try {
            // Create product object with unique ID
            const product = {
                id: Date.now(),
                name: name,
                model_id: modelId,
                price: price,
                description: description,
                image: image || 'https://placehold.co/300x200/2a9d8f/ffffff?text=' + encodeURIComponent(name),
                status: status,
                createdDate: new Date().toISOString()
            };

            console.log('Product created:', product);

            // Save to localStorage
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));
            localStorage.setItem('productsInitialized', 'true');
            
            console.log('Product saved. Total products:', products.length);
            
            alert('✅ Product added successfully!');
            
            // Reset form
            form.reset();
            
            // Redirect to products management
            setTimeout(() => {
                window.location.href = 'admin-products.html';
            }, 500);
            
        } catch (error) {
            console.error('Error saving product:', error);
            alert('❌ Error saving product: ' + error.message);
        }
    });
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
