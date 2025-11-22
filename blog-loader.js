// Blog Article Loader Script

document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog page loading...');
    loadBlogArticles();
});

// Load blog articles
function loadBlogArticles() {
    const blogList = document.getElementById('blogList');
    
    if (!blogList) {
        console.error('Blog list container not found');
        return;
    }

    try {
        // Get articles from localStorage
        let articles = JSON.parse(localStorage.getItem('articles'));
        
        // Check if articles were ever initialized
        const initialized = localStorage.getItem('articlesInitialized');
        
        // If articles is null and not initialized, load default articles once
        if (articles === null && !initialized) {
            articles = getDefaultArticles();
            localStorage.setItem('articles', JSON.stringify(articles));
            localStorage.setItem('articlesInitialized', 'true');
            console.log('Articles initialized with defaults');
        } else if (articles === null) {
            // If articles is null but was initialized, it means user deleted all
            articles = [];
            localStorage.setItem('articles', JSON.stringify(articles));
            console.log('Articles initialized as empty');
        }
        
        // Filter only published articles
        const publishedArticles = articles.filter(a => a.status === 'published');
        
        if (publishedArticles.length === 0) {
            blogList.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">No articles published yet. Check back soon!</div>';
            return;
        }
        
        // Sort by date descending
        publishedArticles.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        
        // Display articles
        displayBlogArticles(publishedArticles, blogList);
        
    } catch (error) {
        console.error('Error loading articles:', error);
        blogList.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">Error loading articles. Please try again.</div>';
    }
}

// Display blog articles
function displayBlogArticles(articles, container) {
    container.innerHTML = articles.map(article => {
        const categoryClass = `tag-${article.category}`;
        const date = new Date(article.createdDate);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        return `
            <article class="blog-card">
                <img src="${article.image || 'https://placehold.co/300x200/2a9d8f/ffffff?text=' + encodeURIComponent(article.title)}" 
                     alt="${article.title}" 
                     class="card-image"
                     onerror="this.src='https://placehold.co/300x200/2a9d8f/ffffff?text=Article'">
                <div class="card-content">
                    <span class="card-tag ${categoryClass}">${getCategoryLabel(article.category)}</span>
                    <h2 class="card-title">${article.title}</h2>
                    <p class="card-excerpt">${article.excerpt}</p>
                    <div class="card-meta">
                        <small>By ${article.author} • ${formattedDate}</small>
                    </div>
                    <a href="#" onclick="viewArticle(${article.id}); return false;" class="read-more-link">
                        Read Full Article &rarr;
                    </a>
                </div>
            </article>
        `;
    }).join('');
}

// Get default articles (only called on first load)
function getDefaultArticles() {
    return [
        {
            id: 1,
            title: 'Stop Wasting Fuel: The Hidden Cost Savings of Switching to Solar Drying',
            category: 'economics',
            excerpt: 'Many businesses underestimate the long-term expense of fuel-based drying. We break down the true economic benefits and ROI when you transition to our sustainable solar solutions.',
            content: 'In the agricultural industry, fuel costs represent one of the largest operational expenses. Traditional drying methods rely heavily on fossil fuels, creating a significant financial burden on farmers and food processors. Our solar drying solutions eliminate these costs entirely, harnessing the unlimited energy of the sun.\n\nThe payback period for solar dryers typically ranges from 3-5 years, after which your operation runs virtually cost-free. Additionally, reduced energy consumption leads to lower carbon emissions and potential tax incentives for sustainable practices.\n\nBy switching to solar drying, you not only improve your bottom line but also contribute to environmental conservation. This makes it a win-win solution for your business and our planet.',
            author: 'Admin',
            image: 'https://images.unsplash.com/photo-1543277322-a9b3438f615e?crop=entropy&fit=crop&q=80&w=500',
            status: 'published',
            createdDate: '2025-01-10'
        },
        {
            id: 2,
            title: 'Direct vs. Indirect: Which Solar Dryer Model is Best for Your Specific Crop?',
            category: 'product',
            excerpt: 'Choosing the right dryer is critical for quality. Learn the differences between Direct, Indirect, and Mixed-Mode drying and find the perfect match for your delicate herbs or bulk grains.',
            content: 'Solar drying technology comes in three main configurations: Direct, Indirect, and Mixed-Mode dryers. Each has unique advantages depending on the crop and climate.\n\nDirect solar dryers expose produce directly to sunlight, making them ideal for hardy crops like grains and beans. They are cost-effective and simple to maintain.\n\nIndirect dryers use a separate solar collector to heat air that passes through the drying chamber, protecting delicate crops like herbs and spices from direct exposure. This method produces higher-quality products with better color and aroma retention.\n\nMixed-Mode dryers combine both methods for optimal results across various crop types. They are versatile and efficient, making them suitable for diverse agricultural operations.\n\nUnderstanding your crop\'s moisture content, sensitivity to heat, and market requirements will help you choose the perfect solar dryer model.',
            author: 'Admin',
            image: 'https://images.unsplash.com/photo-1582218084684-061266e07663?crop=entropy&fit=crop&q=80&w=500',
            status: 'published',
            createdDate: '2025-01-08'
        },
        {
            id: 3,
            title: 'How Solar Technology Guarantees Cleaner, More Hygienic Food Preservation',
            category: 'quality',
            excerpt: 'Unlike open-air sun drying, our sealed solar chambers protect produce from dust, pests, and contamination, ensuring a superior, shelf-stable, and safe final product.',
            content: 'Food safety is paramount in modern agriculture. Traditional open-air drying exposes produce to contaminants, insects, and environmental pollutants, compromising quality and safety.\n\nOur sealed solar drying chambers create a controlled environment that eliminates these risks. The enclosed design prevents pest infestation and dust contamination while maintaining optimal temperature and humidity levels.\n\nThis advanced approach ensures:\n- Higher food safety standards\n- Extended shelf life\n- Better nutritional retention\n- Premium product quality\n- Compliance with international food safety regulations\n\nBy choosing our sealed solar drying technology, you invest in not just your profits, but also the health and satisfaction of your customers.',
            author: 'Admin',
            image: 'https://images.unsplash.com/photo-1549488349-e366838a6a6c?crop=entropy&fit=crop&q=80&w=500',
            status: 'published',
            createdDate: '2025-01-05'
        },
        {
            id: 4,
            title: 'Building Food Security: Our Role in Reducing Post-Harvest Loss',
            category: 'impact',
            excerpt: 'In rural communities, spoilage is a massive challenge. Discover how our cost-effective solar dryers empower farmers to preserve surplus, leading to increased income and food resilience.',
            content: 'Post-harvest loss affects millions of farmers globally, with some regions losing up to 40% of their harvest. This waste represents lost income, wasted resources, and food insecurity for communities.\n\nOur mission at SolarDry Solutions is to change this narrative. By providing affordable, sustainable solar drying technology to rural communities, we enable farmers to:\n\n1. Preserve surplus harvests\n2. Access year-round income streams\n3. Reduce dependency on middlemen\n4. Improve food security\n5. Build resilient agricultural systems\n\nThrough partnerships with local communities and agricultural organizations, we\'ve helped thousands of farmers transform their operations. From small family farms to cooperative organizations, solar drying technology is proving to be a game-changer.\n\nTogether, we\'re not just improving individual livelihoods—we\'re building a more resilient, sustainable global food system.',
            author: 'Admin',
            image: 'https://images.unsplash.com/photo-1543468537-88f613c9e782?crop=entropy&fit=crop&q=80&w=500',
            status: 'published',
            createdDate: '2025-01-01'
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

// View article (can be expanded later for full article view)
function viewArticle(id) {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const article = articles.find(a => a.id === id);
    
    if (article) {
        // For now, show alert with article details
        // Later, can redirect to detailed article page
        alert(`"${article.title}"\n\n${article.content}`);
    }
}
