// Admin Add Article Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Add Article Page Loaded');
    setupArticleForm();
});

// Setup article form
function setupArticleForm() {
    const form = document.getElementById('addArticleForm');
    if (!form) {
        console.error('Form not found');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const category = document.getElementById('category').value.trim();
        const author = document.getElementById('author').value.trim() || 'Admin';
        const excerpt = document.getElementById('excerpt').value.trim();
        const content = document.getElementById('content').value.trim();
        const image = document.getElementById('image').value.trim();
        const status = document.getElementById('status').value.trim();
        
        // Validation
        if (!title || !category || !excerpt || !content) {
            alert('Please fill in all required fields (Title, Category, Excerpt, Content)');
            console.error('Validation failed', { title, category, excerpt, content });
            return;
        }

        console.log('Creating article with data:', { title, category, author, excerpt, status });

        try {
            // Create article object with unique ID
            const article = {
                id: Date.now(), // Use timestamp as unique ID
                title: title,
                category: category,
                author: author,
                excerpt: excerpt,
                content: content,
                image: image || 'https://placehold.co/300x200/2a9d8f/ffffff?text=' + encodeURIComponent(title),
                status: status,
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString()
            };

            console.log('Article object created:', article);

            // Save to localStorage
            let articles = JSON.parse(localStorage.getItem('articles')) || [];
            console.log('Current articles count:', articles.length);
            
            articles.push(article);
            localStorage.setItem('articles', JSON.stringify(articles));
            localStorage.setItem('articlesInitialized', 'true');
            
            console.log('Article saved successfully. Total articles:', articles.length);
            
            alert('✅ Article published successfully!');
            
            // Reset form
            form.reset();
            
            // Redirect to blog management
            setTimeout(() => {
                window.location.href = 'admin-blog.html';
            }, 500);
            
        } catch (error) {
            console.error('Error saving article:', error);
            alert('❌ Error saving article: ' + error.message);
        }
    });
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
