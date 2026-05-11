// Admin Drying Guide Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Drying Guide Page Loaded');
    loadGuideItems();
    setupForm();
});

// Load items
function loadGuideItems() {
    const tbody = document.getElementById('guide-table');
    if (!tbody) return;

    let items = JSON.parse(localStorage.getItem('dryingGuideItems')) || [];
    
    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No items yet. <a href="#" onclick="openAddModal(); return false;">Add your first item</a></td></tr>';
        return;
    }

    tbody.innerHTML = items.map(item => {
        const massInfo = item.initialMass && item.finalMass 
            ? `${item.initialMass}g → ${item.finalMass}g` 
            : '—';
        const timeInfo = item.traditionalTime 
            ? `☀️ ${item.traditionalTime} → 🔆 ${item.dryingTime}` 
            : item.dryingTime;

        return `
        <tr>
            <td><strong>${item.name}</strong></td>
            <td><span class="status active">${item.category}</span></td>
            <td>${item.temperature}</td>
            <td>${massInfo}</td>
            <td>${timeInfo}</td>
            <td>
                <button onclick="editItem(${item.id})" class="btn-small">Edit</button>
                <button onclick="deleteItem(${item.id})" class="btn-small delete">Delete</button>
            </td>
        </tr>
    `;
    }).join('');
}

// Setup form
function setupForm() {
    const form = document.getElementById('guideForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const editId = document.getElementById('editId').value;
        const item = {
            name: document.getElementById('itemName').value.trim(),
            category: document.getElementById('itemCategory').value,
            temperature: document.getElementById('itemTemp').value.trim(),
            humidity: document.getElementById('itemHumidity').value.trim(),
            dryingTime: document.getElementById('itemTime').value.trim(),
            traditionalTime: document.getElementById('itemTraditionalTime').value.trim(),
            initialMass: document.getElementById('itemInitialMass').value.trim(),
            finalMass: document.getElementById('itemFinalMass').value.trim(),
            notes: document.getElementById('itemNotes').value.trim()
        };

        if (!item.name || !item.temperature || !item.humidity || !item.dryingTime) {
            alert('Please fill all required fields');
            return;
        }

        let items = JSON.parse(localStorage.getItem('dryingGuideItems')) || [];

        if (editId) {
            // Update existing
            const index = items.findIndex(i => i.id == editId);
            if (index > -1) {
                items[index] = { ...items[index], ...item };
            }
            alert('✅ Item updated successfully!');
        } else {
            // Add new
            item.id = Date.now();
            items.push(item);
            alert('✅ Item added successfully!');
        }

        localStorage.setItem('dryingGuideItems', JSON.stringify(items));
        closeModal();
        loadGuideItems();
    });
}

// Open add modal
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Add Drying Guide Item';
    document.getElementById('editId').value = '';
    document.getElementById('guideForm').reset();
    document.getElementById('itemInitialMass').value = '1000';
    document.getElementById('guideModal').style.display = 'flex';
}

// Edit item
function editItem(id) {
    const items = JSON.parse(localStorage.getItem('dryingGuideItems')) || [];
    const item = items.find(i => i.id == id);
    if (!item) return;

    document.getElementById('modalTitle').textContent = 'Edit Drying Guide Item';
    document.getElementById('editId').value = id;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('itemTemp').value = item.temperature;
    document.getElementById('itemHumidity').value = item.humidity;
    document.getElementById('itemTime').value = item.dryingTime;
    document.getElementById('itemTraditionalTime').value = item.traditionalTime || '';
    document.getElementById('itemInitialMass').value = item.initialMass || '1000';
    document.getElementById('itemFinalMass').value = item.finalMass || '';
    document.getElementById('itemNotes').value = item.notes || '';
    document.getElementById('guideModal').style.display = 'flex';
}

// Delete item
function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    let items = JSON.parse(localStorage.getItem('dryingGuideItems')) || [];
    items = items.filter(i => i.id != id);
    localStorage.setItem('dryingGuideItems', JSON.stringify(items));
    alert('✅ Item deleted successfully!');
    loadGuideItems();
}

// Close modal
function closeModal() {
    document.getElementById('guideModal').style.display = 'none';
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
