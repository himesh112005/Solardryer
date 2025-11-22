// Admin Products Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Products Page Loaded');
    loadProducts();
});

// Load products
function loadProducts() {
    const tbody = document.getElementById('products-table');
    
    if (!tbody) return;

    try {
        // Load from localStorage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        
        // If products array is empty but initialized, keep it empty
        const initialized = localStorage.getItem('productsInitialized');
        
        if (products.length === 0 && initialized) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">No products. <a href="admin-add-product.html">Create your first product</a></td></tr>';
            return;
        }
        
        displayProducts(products, tbody);
    } catch (error) {
        console.error('Error loading products:', error);
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">Error loading products</td></tr>';
    }
}

// Display products
function displayProducts(products, tbody) {
    if (!products || products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No products found. <a href="admin-add-product.html">Add new product</a></td></tr>';
        return;
    }

    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.model_id}</td>
            <td>₹${product.price.toLocaleString('en-IN')}</td>
            <td><span class="status ${product.status}">${product.status}</span></td>
            <td>
                <a href="admin-edit-product.html?id=${product.id}" class="btn-small">Edit</a>
                <button onclick="deleteProduct(${product.id})" class="btn-small delete">Delete</button>
            </td>
        </tr>
    `).join('');
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products = products.filter(p => p.id !== id);
            localStorage.setItem('products', JSON.stringify(products));
            localStorage.setItem('productsInitialized', 'true');
            
            console.log('Product deleted. Remaining:', products.length);
            alert('✅ Product deleted successfully!');
            loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('❌ Error deleting product');
        }
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
