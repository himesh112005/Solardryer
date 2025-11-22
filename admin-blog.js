// Admin Blog Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Blog Page Loaded');
    loadArticles();
});

// Load articles
function loadArticles() {
    const tbody = document.getElementById('articles-table');
    
    if (!tbody) return;

    // Load from localStorage
    let articles = JSON.parse(localStorage.getItem('articles')) || [];
    
    // If articles array is empty but initialized, keep it empty (don't restore defaults)
    const initialized = localStorage.getItem('articlesInitialized');
    
    if (articles.length === 0 && initialized) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No articles. <a href="admin-add-article.html">Create your first article</a></td></tr>';
        return;
    }
    
    displayArticles(articles, tbody);
}

// Display articles
function displayArticles(articles, tbody) {
    if (!articles || articles.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No articles found. <a href="admin-add-article.html">Add new article</a></td></tr>';
        return;
    }

    tbody.innerHTML = articles.map(article => {
        const date = new Date(article.createdDate).toLocaleDateString();
        return `
            <tr>
                <td>${article.title}</td>
                <td>${article.author}</td>
                <td>${date}</td>
                <td><span class="status ${article.status}">${article.status}</span></td>
                <td>
                    <a href="admin-edit-article.html?id=${article.id}" class="btn-small">Edit</a>
                    <button onclick="deleteArticle(${article.id})" class="btn-small delete">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

function openAddArticleModal() {
    window.location.href = 'admin-add-article.html';
}

function deleteArticle(id) {
    if (confirm('Are you sure you want to delete this article?')) {
        let articles = JSON.parse(localStorage.getItem('articles')) || [];
        articles = articles.filter(a => a.id !== id);
        localStorage.setItem('articles', JSON.stringify(articles));
        localStorage.setItem('articlesInitialized', 'true');
        
        alert('Article deleted successfully!');
        loadArticles();
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
