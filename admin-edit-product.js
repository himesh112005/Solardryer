// Admin Edit Product Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

let currentProductId = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Edit Product Page Loaded');
    
    // Get product ID from URL
    const params = new URLSearchParams(window.location.search);
    currentProductId = parseInt(params.get('id'));
    
    console.log('Product ID:', currentProductId);
    
    if (currentProductId) {
        loadProduct(currentProductId);
    } else {
        alert('Product ID not found');
        window.location.href = 'admin-products.html';
    }
    
    setupProductForm();
});

// Load product for editing
function loadProduct(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === id);
    
    if (!product) {
        alert('Product not found');
        window.location.href = 'admin-products.html';
        return;
    }
    
    console.log('Product loaded:', product);
    
    // Populate form
    document.getElementById('name').value = product.name;
    document.getElementById('modelId').value = product.model_id;
    document.getElementById('price').value = product.price;
    document.getElementById('description').value = product.description;
    document.getElementById('image').value = product.image || '';
    document.getElementById('status').value = product.status;
}

// Setup product form
function setupProductForm() {
    const form = document.getElementById('editProductForm');
    if (!form) {
        console.error('Form not found');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!currentProductId) {
            alert('Product ID not found');
            return;
        }
        
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
            // Update product
            updateProduct(currentProductId, {
                name, model_id: modelId, price, description, image, status
            });
            
            alert('✅ Product updated successfully!');
            window.location.href = 'admin-products.html';
        } catch (error) {
            console.error('Error updating product:', error);
            alert('❌ Error updating product: ' + error.message);
        }
    });
}

// Update product in localStorage
function updateProduct(id, data) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const index = products.findIndex(p => p.id === id);
    
    if (index > -1) {
        products[index] = {
            ...products[index],
            ...data,
            id: id // Keep original ID
        };
        localStorage.setItem('products', JSON.stringify(products));
        console.log('Product updated:', products[index]);
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
