// About Page Loader

document.addEventListener('DOMContentLoaded', function() {
    console.log('About page loading...');
    loadAboutContent();
});

// Load about content
function loadAboutContent() {
    try {
        let aboutData = JSON.parse(localStorage.getItem('aboutContent'));
        
        // If no content stored, use defaults
        if (!aboutData) {
            aboutData = getDefaultAboutContent();
            localStorage.setItem('aboutContent', JSON.stringify(aboutData));
        }
        
        // Populate basic content
        if (document.getElementById('missionTitle')) {
            document.getElementById('missionTitle').textContent = aboutData.mission.title;
            document.getElementById('missionContent').textContent = aboutData.mission.content;
        }
        
        if (document.getElementById('visionTitle')) {
            document.getElementById('visionTitle').textContent = aboutData.vision.title;
            document.getElementById('visionContent').textContent = aboutData.vision.content;
        }
        
        if (document.getElementById('companyTitle')) {
            document.getElementById('companyTitle').textContent = aboutData.company.title;
            document.getElementById('companyContent').textContent = aboutData.company.content;
        }

        // Load company photo
        if (aboutData.company.photo && document.getElementById('aboutCompanyPhoto')) {
            document.getElementById('aboutCompanyPhoto').src = aboutData.company.photo;
            if (aboutData.company.photoCaption) {
                document.getElementById('aboutCompanyPhotoCaption').textContent = aboutData.company.photoCaption;
            }
        }

        // Load mentors
        if (aboutData.mentors && aboutData.mentors.length > 0) {
            loadMentors(aboutData.mentors);
        }

        // Load team
        if (aboutData.team && aboutData.team.length > 0) {
            loadTeam(aboutData.team);
        }

        // Load achievements
        if (aboutData.achievements && aboutData.achievements.length > 0) {
            loadAchievements(aboutData.achievements);
        }

        // Load partners
        if (aboutData.partners && aboutData.partners.length > 0) {
            loadPartners(aboutData.partners);
        }

        // Load timeline
        if (aboutData.timeline && aboutData.timeline.length > 0) {
            loadTimeline(aboutData.timeline);
        }
        
        console.log('About content loaded');
    } catch (error) {
        console.error('Error loading about content:', error);
    }
}

// Load mentors
function loadMentors(mentors) {
    const grid = document.getElementById('mentorsGrid');
    if (!grid) return;

    grid.innerHTML = mentors.map(mentor => `
        <div class="mentor-card">
            <h3>${mentor.name}</h3>
            <p class="mentor-title">${mentor.title}</p>
            <p class="mentor-org">${mentor.organization}</p>
            <p class="mentor-bio">${mentor.bio}</p>
        </div>
    `).join('');
}

// Load team
function loadTeam(team) {
    const grid = document.getElementById('teamGrid');
    if (!grid) return;

    grid.innerHTML = team.map(member => `
        <div class="team-member">
            <div class="member-avatar">👤</div>
            <h3>${member.name}</h3>
            <p class="member-role">${member.role}</p>
            <p class="member-bio">${member.bio}</p>
        </div>
    `).join('');
}

// Load achievements
function loadAchievements(achievements) {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;

    grid.innerHTML = achievements.map(achievement => `
        <div class="achievement-card">
            <h3>${achievement.number}</h3>
            <p>${achievement.label}</p>
        </div>
    `).join('');
}

// Load partners
function loadPartners(partners) {
    const grid = document.getElementById('partnersGrid');
    if (!grid) return;

    grid.innerHTML = partners.map(partner => `
        <div class="partner-card">
            <a href="${partner.url}" target="_blank" class="partner-link">
                ${partner.logo ? `<img src="${partner.logo}" alt="${partner.name}">` : `<div class="partner-placeholder">${partner.name}</div>`}
                <h3>${partner.name}</h3>
            </a>
        </div>
    `).join('');
}

// Load timeline
function loadTimeline(timeline) {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    container.innerHTML = timeline.map((item, index) => `
        <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
            <div class="timeline-content">
                <h3>${item.year}</h3>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
}

// Get default about content
function getDefaultAboutContent() {
    return {
        mission: {
            title: 'Our Mission',
            content: 'To provide innovative, affordable, and sustainable solar drying solutions that empower farmers and businesses to reduce post-harvest loss, improve product quality, and create economic opportunities in rural communities worldwide.'
        },
        vision: {
            title: 'Our Vision',
            content: 'A world where renewable solar energy is harnessed to build resilient food systems, reduce environmental impact, and create pathways out of poverty for farmers and agricultural communities across the globe.'
        },
        company: {
            title: 'About Our Company',
            content: 'SolarDry Solutions was founded with a passion for solving one of agriculture\'s biggest challenges: post-harvest loss. With a team of engineers, agricultural experts, and sustainability advocates, we design and deploy solar drying technology that transforms how food is preserved and valued in global supply chains. Our solutions are built on three pillars: sustainability, affordability, and impact.',
            photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&fit=crop&q=80&w=800',
            photoCaption: 'SolarDry Solutions Team'
        },
        team: [],
        mentors: [],
        achievements: [],
        partners: [],
        timeline: []
    };
}
