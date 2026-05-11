// Blog Article Loader Script - Connected to localStorage (Admin Panel)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog page loading...');
    loadBlogArticles();
});

function loadBlogArticles() {
    const blogList = document.getElementById('blogList');
    if (!blogList) return;

    blogList.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">Loading articles...</div>';

    // Read from localStorage (shared with admin panel)
    let articles = JSON.parse(localStorage.getItem('articles')) || [];
    
    // Filter published only
    articles = articles.filter(a => a.status === 'published');
    
    if (articles.length === 0) {
        articles = getDefaultArticles();
    }
    
    if (articles.length === 0) {
        blogList.innerHTML = '<div class="text-center" style="padding: 2rem; grid-column: 1/-1;">No articles published yet. Check back soon!</div>';
        return;
    }
    
    displayBlogArticles(articles, blogList);
}

function displayBlogArticles(articles, container) {
    container.innerHTML = articles.map(article => {
        const categoryClass = `tag-${article.category}`;
        const date = new Date(article.created_at || article.createdDate);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        return `
            <article class="blog-card">
                <img src="${article.image_url || article.image || 'https://placehold.co/300x200/2a9d8f/ffffff?text=' + encodeURIComponent(article.title)}" 
                     alt="${article.title}" class="card-image"
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

function getDefaultArticles() {
    return [
        {
            id: '1',
            title: 'Stop Wasting Fuel: The Hidden Cost Savings of Switching to Solar Drying',
            category: 'economics',
            excerpt: 'Many businesses underestimate the long-term expense of fuel-based drying. We break down the true economic benefits and ROI when transitioning to sustainable solar solutions.',
            content: 'In the agricultural industry, fuel costs represent one of the largest operational expenses for post-harvest processing. Traditional drying methods using diesel, LPG, or electric heaters can cost ₹5,000–₹15,000 per month depending on scale.\n\nSolar dryers eliminate this recurring cost entirely. With an initial investment of ₹25,000–₹5,00,000 (depending on capacity), most farmers recover their investment within 12–18 months.\n\nKey savings include:\n• Zero fuel costs\n• Reduced labor (automated airflow)\n• Lower spoilage rates (from 30% to under 5%)\n• Higher selling price for uniformly dried produce\n\nThe ROI is clear: solar drying is not just eco-friendly — it is a smart financial decision for any scale of operation.',
            author: 'Prof. Sanjeev Suryawanshi',
            image: 'https://images.unsplash.com/photo-1543277322-a9b3438f615e?crop=entropy&fit=crop&q=80&w=500',
            status: 'published',
            created_at: '2025-01-10T10:00:00Z'
        },
        {
            id: '2',
            title: 'How Solar Drying Preserves Nutrients Better Than Traditional Methods',
            category: 'quality',
            excerpt: 'Open sun drying destroys up to 50% of vitamins. Learn how our enclosed solar dryers maintain nutritional value, color, and taste of your produce.',
            content: 'Traditional open sun drying exposes food to UV radiation, dust, insects, and unpredictable weather. Studies show that open drying can destroy 30–50% of Vitamin A and Vitamin C content.\n\nSolar dryers solve this by:\n• Controlling temperature (40–70°C) to prevent nutrient breakdown\n• Enclosing the drying chamber to block contamination\n• Using forced convection for uniform moisture removal\n• Reducing drying time by 40–60% compared to open sun\n\nResearch conducted at SSVPS COE, Dhule confirms that solar-dried mango slices retain 85% of their Vitamin C content versus only 45% with open drying.\n\nThe result? Produce that is not only safer and more hygienic but also commands a premium price in the market.',
            author: 'Prof. Sanjeev Suryawanshi',
            image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?crop=entropy&fit=crop&q=80&w=500',
            status: 'published',
            created_at: '2025-02-15T10:00:00Z'
        },
        {
            id: '3',
            title: 'Choosing the Right Solar Dryer Size for Your Farm',
            category: 'product',
            excerpt: 'From small 10 kg units to industrial 500+ kg systems — this guide helps you select the perfect solar dryer model based on your crop volume and budget.',
            content: 'Selecting the right solar dryer depends on three key factors: daily crop volume, available space, and budget.\n\nHere is our recommendation:\n\n📦 SD-100 (Small Farm Unit) — ₹25,000\n• Best for: Individual farmers\n• Capacity: Up to 10 kg per batch\n• Ideal crops: Herbs, chillies, small fruit batches\n\n📦 SD-300 (Medium Community Dryer) — ₹75,000\n• Best for: Farmer co-operatives, SHGs\n• Capacity: 25–50 kg per batch\n• Ideal crops: Tomatoes, onions, mixed produce\n\n📦 SD-750 (Large Commercial Dryer) — ₹2,00,000\n• Best for: Agri-businesses, food processors\n• Capacity: 100–200 kg per batch\n• Ideal crops: Grains, bulk vegetables, spices\n\n📦 SD-2000 (Industrial System) — ₹5,00,000\n• Best for: Processing plants, export units\n• Capacity: 500+ kg per batch\n• Features: Multi-zone drying, automated controls\n\nContact us for a free consultation to find your ideal match.',
            author: 'Admin',
            image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&fit=crop&q=80&w=500',
            status: 'published',
            created_at: '2025-03-20T10:00:00Z'
        },
        {
            id: '4',
            title: 'Empowering Rural Women Through Solar Drying Entrepreneurship',
            category: 'impact',
            excerpt: 'How self-help groups in Maharashtra are using solar dryers to build sustainable micro-enterprises, reduce food waste, and generate year-round income.',
            content: 'In rural Maharashtra, post-harvest loss can reach 30–40% for perishable crops. Women-led Self Help Groups (SHGs) are now turning this challenge into an opportunity using solar dryers.\n\nWith support from La Fondation Dassault Systèmes and SSVPS COE, Dhule, several SHGs have adopted the SD-300 community dryer model to:\n\n• Dry seasonal produce (mango, tomato, amla) for year-round sale\n• Create value-added products like dried fruit snacks and spice powders\n• Supply to urban markets and e-commerce platforms\n• Generate ₹8,000–₹15,000 additional monthly income per group\n\nOne SHG leader, Savita Patil from Dhule district, shares: "Before the solar dryer, we would watch our mangoes rot in the field. Now we dry and sell them at 3x the price."\n\nThis is the real impact of solar drying — not just technology, but transformation.',
            author: 'Prof. Sanjeev Suryawanshi',
            image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?crop=entropy&fit=crop&q=80&w=500',
            status: 'published',
            created_at: '2025-04-05T10:00:00Z'
        }
    ];
}

function getCategoryLabel(category) {
    const labels = { 'economics': 'Economics & ROI', 'product': 'Product Education', 'quality': 'Quality & Policy', 'impact': 'Social Impact' };
    return labels[category] || category;
}

function viewArticle(id) {
    let articles = JSON.parse(localStorage.getItem('articles')) || [];
    let article = articles.find(a => a.id == id);
    
    if (!article) {
        const defaults = getDefaultArticles();
        article = defaults.find(a => a.id == id);
    }
    
    if (article) {
        alert(`"${article.title}"\n\n${article.content}`);
    }
}
