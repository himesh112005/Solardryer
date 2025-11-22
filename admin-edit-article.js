// Admin Edit Article Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

let currentArticleId = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Edit Article Page Loaded');
    
    // Get article ID from URL
    const params = new URLSearchParams(window.location.search);
    currentArticleId = params.get('id');
    
    if (currentArticleId) {
        loadArticle(currentArticleId);
    }
    
    setupArticleForm();
});

// Load article for editing
function loadArticle(id) {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const article = articles.find(a => a.id == id);
    
    if (!article) {
        alert('Article not found');
        window.location.href = 'admin-blog.html';
        return;
    }
    
    // Populate form
    document.getElementById('title').value = article.title;
    document.getElementById('category').value = article.category;
    document.getElementById('author').value = article.author;
    document.getElementById('excerpt').value = article.excerpt;
    document.getElementById('content').value = article.content;
    document.getElementById('image').value = article.image || '';
    document.getElementById('status').value = article.status;
}

// Setup article form
function setupArticleForm() {
    const form = document.getElementById('editArticleForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!currentArticleId) {
            alert('Article ID not found');
            return;
        }
        
        const title = document.getElementById('title').value.trim();
        const category = document.getElementById('category').value;
        const author = document.getElementById('author').value.trim() || 'Admin';
        const excerpt = document.getElementById('excerpt').value.trim();
        const content = document.getElementById('content').value.trim();
        const image = document.getElementById('image').value.trim();
        const status = document.getElementById('status').value;
        
        // Validation
        if (!title || !category || !excerpt || !content) {
            alert('Please fill in all required fields');
            return;
        }

        // Update article
        updateArticle(currentArticleId, {
            title, category, author, excerpt, content, image, status
        });
        
        alert('Article updated successfully!');
        window.location.href = 'admin-blog.html';
    });
}

// Update article in localStorage
function updateArticle(id, data) {
    let articles = JSON.parse(localStorage.getItem('articles')) || [];
    const index = articles.findIndex(a => a.id == id);
    
    if (index > -1) {
        articles[index] = {
            ...articles[index],
            ...data,
            updatedDate: new Date().toISOString()
        };
        localStorage.setItem('articles', JSON.stringify(articles));
        console.log('Article updated:', articles[index]);
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
