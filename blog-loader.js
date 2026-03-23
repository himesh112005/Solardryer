// Blog Article Loader Script with Supabase Support
const api = new APIClient();

document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog page loading...');
    loadBlogArticles();
});

// Load blog articles
async function loadBlogArticles() {
    const blogList = document.getElementById('blogList');
    
    if (!blogList) {
        console.error('Blog list container not found');
        return;
    }

    blogList.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">Loading articles...</div>';

    try {
        // Fetch from Supabase via APIClient
        let articles = [];
        
        // Try Supabase first if configured
        if (api.supabase) {
            const { data, error } = await api.supabase
                .from('articles')
                .select('*')
                .eq('status', 'published')
                .order('created_at', { ascending: false });

            if (!error && data && data.length > 0) {
                articles = data;
            } else {
                console.log('No articles in Supabase, loading defaults...');
                articles = getDefaultArticles();
            }
        } else {
            articles = getDefaultArticles();
        }
        
        if (articles.length === 0) {
            blogList.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">No articles published yet. Check back soon!</div>';
            return;
        }
        
        // Display articles
        displayBlogArticles(articles, blogList);
        
    } catch (error) {
        console.error('Error loading articles:', error);
        blogList.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">Error loading articles. Please try again.</div>';
    }
}

// Display blog articles
function displayBlogArticles(articles, container) {
    container.innerHTML = articles.map(article => {
        const categoryClass = `tag-${article.category}`;
        const date = new Date(article.created_at || article.createdDate);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        return `
            <article class="blog-card">
                <img src="${article.image_url || article.image || 'https://placehold.co/300x200/2a9d8f/ffffff?text=' + encodeURIComponent(article.title)}" 
                     alt="${article.title}" 
                     class="card-image"
                     onerror="this.src='https://placehold.co/300x200/2a9d8f/ffffff?text=Article'">
                <div class="card-content">
                    <span class="card-tag ${categoryClass}">${getCategoryLabel(article.category)}</span>
                    <h2 class="card-title">${article.title}</h2>
                    <p class="card-excerpt">${article.excerpt}</p>
                    <div class="card-meta">
                        <small>By ${article.author || 'Admin'} • ${formattedDate}</small>
                    </div>
                    <a href="#" onclick="viewArticle('${article.id}'); return false;" class="read-more-link">
                        Read Full Article &rarr;
                    </a>
                </div>
            </article>
        `;
    }).join('');
}

// Get default articles (if DB is empty)
function getDefaultArticles() {
    return [
        {
            id: '1',
            title: 'Stop Wasting Fuel: The Hidden Cost Savings of Switching to Solar Drying',
            category: 'economics',
            excerpt: 'Many businesses underestimate the long-term expense of fuel-based drying. We break down the true economic benefits and ROI when you transition to our sustainable solar solutions.',
            content: 'In the agricultural industry, fuel costs represent one of the largest operational expenses...',
            author: 'Admin',
            image: 'https://images.unsplash.com/photo-1543277322-a9b3438f615e?crop=entropy&fit=crop&q=80&w=500',
            status: 'published',
            created_at: '2025-01-10T10:00:00Z'
        }
    ];
}

// Get category label
function getCategoryLabel(category) {
    const labels = {
        'economics': 'Economics & ROI',
        'product': 'Product Education',
        'quality': 'Quality & Policy',
        'impact': 'Social Impact'
    };
    return labels[category] || category;
}

// View article
async function viewArticle(id) {
    let article = null;
    
    if (api.supabase) {
        const { data } = await api.supabase
            .from('articles')
            .select('*')
            .eq('id', id)
            .single();
        article = data;
    }
    
    if (!article) {
        const defaults = getDefaultArticles();
        article = defaults.find(a => a.id == id);
    }
    
    if (article) {
        // Modern modal or simple alert for now
        alert(`"${article.title}"\n\n${article.content}`);
    }
}
