// Admin Edit About Script

if (!authManager.protectPage('admin.html')) {
    // If protection fails, script won't continue
}

let aboutData = {};
let teamCounter = 0;
let achievementCounter = 0;
let mentorCounter = 0;
let partnerCounter = 0;
let timelineCounter = 0;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Edit About Page Loaded');
    loadAboutData();
    setupForm();
    setupPhotoPreview();
});

// Load about data
function loadAboutData() {
    try {
        aboutData = JSON.parse(localStorage.getItem('aboutContent'));
        
        if (!aboutData) {
            aboutData = getDefaultAboutContent();
        }
        
        // Populate form with data
        document.getElementById('missionTitle').value = aboutData.mission.title;
        document.getElementById('missionContent').value = aboutData.mission.content;
        document.getElementById('visionTitle').value = aboutData.vision.title;
        document.getElementById('visionContent').value = aboutData.vision.content;
        document.getElementById('companyTitle').value = aboutData.company.title;
        document.getElementById('companyContent').value = aboutData.company.content;
        document.getElementById('companyPhoto').value = aboutData.company.photo || '';
        document.getElementById('companyPhotoCaption').value = aboutData.company.photoCaption || '';
        
        // Load team members
        if (aboutData.team && aboutData.team.length > 0) {
            aboutData.team.forEach((member) => {
                addTeamMember(member);
            });
        }
        
        // Load mentors
        if (aboutData.mentors && aboutData.mentors.length > 0) {
            aboutData.mentors.forEach((mentor) => {
                addMentor(mentor);
            });
        }
        
        // Load achievements
        if (aboutData.achievements && aboutData.achievements.length > 0) {
            aboutData.achievements.forEach((achievement) => {
                addAchievement(achievement);
            });
        }

        // Load partners
        if (aboutData.partners && aboutData.partners.length > 0) {
            aboutData.partners.forEach((partner) => {
                addPartner(partner);
            });
        }

        // Load timeline
        if (aboutData.timeline && aboutData.timeline.length > 0) {
            aboutData.timeline.forEach((item) => {
                addTimelineItem(item);
            });
        }
        
        console.log('About data loaded');
    } catch (error) {
        console.error('Error loading about data:', error);
    }
}

// Setup form
function setupForm() {
    const form = document.getElementById('editAboutForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveAboutData();
    });
}

// Setup photo preview
function setupPhotoPreview() {
    const photoInput = document.getElementById('companyPhoto');
    if (photoInput) {
        photoInput.addEventListener('change', updatePhotoPreview);
        photoInput.addEventListener('blur', updatePhotoPreview);
    }
}

// Update photo preview
function updatePhotoPreview() {
    const photoUrl = document.getElementById('companyPhoto').value.trim();
    const preview = document.getElementById('companyPhotoPreview');
    
    if (photoUrl) {
        preview.innerHTML = `
            <div class="preview-container">
                <img src="${photoUrl}" alt="Company Photo" onerror="this.src='https://placehold.co/400x300/2a9d8f/ffffff?text=Company+Photo'">
                <p>${document.getElementById('companyPhotoCaption').value || 'Company Photo'}</p>
            </div>
        `;
    } else {
        preview.innerHTML = '';
    }
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
        team: [
            { name: 'John Smith', role: 'Founder & CEO', bio: '20+ years in renewable energy and sustainable agriculture.' },
            { name: 'Sarah Johnson', role: 'Chief Technology Officer', bio: 'Expert in solar thermal systems and agricultural engineering.' },
            { name: 'Dr. Rajesh Patel', role: 'Head of Research', bio: 'PhD in Agricultural Science with focus on food preservation.' }
        ],
        mentors: [
            { name: 'Prof. Dr. James Wilson', title: 'Solar Energy Expert', organization: 'University of Cambridge', bio: 'Leading researcher in renewable energy systems.' }
        ],
        achievements: [
            { number: '5000+', label: 'Farmers Empowered' },
            { number: '50,000+', label: 'Metric Tons Preserved' },
            { number: '30+', label: 'Countries Reached' },
            { number: '$100M+', label: 'Value Created' }
        ],
        partners: [
            { name: 'SSVPS Engineering', logo: 'ssvps-college-of-engineering-dhule-logo.jpg', url: 'https://www.ssvpsengg.ac.in/' },
            { name: 'Dassault Systèmes', logo: 'image.png', url: 'https://www.lafondation3ds.org/' }
        ],
        timeline: [
            { year: '2018', title: 'Company Founded', description: 'SolarDry Solutions established with vision to revolutionize food preservation.' },
            { year: '2019', title: 'First Installation', description: 'Deployed 100 solar dryers in rural communities.' },
            { year: '2021', title: 'Expansion', description: 'Expanded operations to 15 countries with 2000+ installations.' },
            { year: '2023', title: 'Major Milestone', description: 'Reached 5000 farmers empowered and 50,000 metric tons preserved.' }
        ]
    };
}

// Add mentor
function addMentor(mentor = null) {
    const container = document.getElementById('mentorsContainer');
    const id = 'mentor_' + (++mentorCounter);
    
    const mentorHTML = `
        <div class="mentor-item" id="${id}">
            <div class="form-row">
                <div class="form-group">
                    <label>Mentor Name</label>
                    <input type="text" class="mentor-name" placeholder="Full name" value="${mentor ? mentor.name : ''}">
                </div>
                <div class="form-group">
                    <label>Title/Expertise</label>
                    <input type="text" class="mentor-title" placeholder="e.g., Solar Energy Expert" value="${mentor ? mentor.title : ''}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Organization</label>
                    <input type="text" class="mentor-org" placeholder="Organization name" value="${mentor ? mentor.organization : ''}">
                </div>
            </div>
            <div class="form-group">
                <label>Bio</label>
                <textarea class="mentor-bio" placeholder="Brief biography" rows="2">${mentor ? mentor.bio : ''}</textarea>
            </div>
            <button type="button" onclick="removeElement('${id}')" class="btn btn-small delete">Remove</button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', mentorHTML);
}

// Add team member
function addTeamMember(member = null) {
    const container = document.getElementById('teamMembersContainer');
    const id = 'team_' + (++teamCounter);
    
    const memberHTML = `
        <div class="team-item" id="${id}">
            <div class="form-row">
                <div class="form-group">
                    <label>Team Member Name</label>
                    <input type="text" class="team-name" placeholder="Full name" value="${member ? member.name : ''}">
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <input type="text" class="team-role" placeholder="Job title" value="${member ? member.role : ''}">
                </div>
            </div>
            <div class="form-group">
                <label>Bio</label>
                <textarea class="team-bio" placeholder="Brief biography" rows="2">${member ? member.bio : ''}</textarea>
            </div>
            <button type="button" onclick="removeElement('${id}')" class="btn btn-small delete">Remove</button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', memberHTML);
}

// Add achievement
function addAchievement(achievement = null) {
    const container = document.getElementById('achievementsContainer');
    const id = 'achievement_' + (++achievementCounter);
    
    const achievementHTML = `
        <div class="achievement-item" id="${id}">
            <div class="form-row">
                <div class="form-group">
                    <label>Number/Stat</label>
                    <input type="text" class="achievement-number" placeholder="e.g., 5000+" value="${achievement ? achievement.number : ''}">
                </div>
                <div class="form-group">
                    <label>Label</label>
                    <input type="text" class="achievement-label" placeholder="e.g., Farmers Empowered" value="${achievement ? achievement.label : ''}">
                </div>
            </div>
            <button type="button" onclick="removeElement('${id}')" class="btn btn-small delete">Remove</button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', achievementHTML);
}

// Add partner
function addPartner(partner = null) {
    const container = document.getElementById('partnersContainer');
    const id = 'partner_' + (++partnerCounter);
    
    const partnerHTML = `
        <div class="partner-item" id="${id}">
            <div class="form-row">
                <div class="form-group">
                    <label>Partner Name</label>
                    <input type="text" class="partner-name" placeholder="Organization name" value="${partner ? partner.name : ''}">
                </div>
                <div class="form-group">
                    <label>Partner Logo URL</label>
                    <input type="url" class="partner-logo" placeholder="Logo URL" value="${partner ? partner.logo : ''}">
                </div>
            </div>
            <div class="form-group">
                <label>Partner Website</label>
                <input type="url" class="partner-url" placeholder="https://example.com" value="${partner ? partner.url : ''}">
            </div>
            <button type="button" onclick="removeElement('${id}')" class="btn btn-small delete">Remove</button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', partnerHTML);
}

// Add timeline item
function addTimelineItem(item = null) {
    const container = document.getElementById('timelineContainer');
    const id = 'timeline_' + (++timelineCounter);
    
    const timelineHTML = `
        <div class="timeline-item" id="${id}">
            <div class="form-row">
                <div class="form-group">
                    <label>Year</label>
                    <input type="text" class="timeline-year" placeholder="e.g., 2020" value="${item ? item.year : ''}">
                </div>
                <div class="form-group">
                    <label>Milestone Title</label>
                    <input type="text" class="timeline-title" placeholder="Milestone title" value="${item ? item.title : ''}">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="timeline-description" placeholder="Milestone description" rows="2">${item ? item.description : ''}</textarea>
            </div>
            <button type="button" onclick="removeElement('${id}')" class="btn btn-small delete">Remove</button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', timelineHTML);
}

// Save about data
function saveAboutData() {
    try {
        const aboutData = {
            mission: {
                title: document.getElementById('missionTitle').value.trim(),
                content: document.getElementById('missionContent').value.trim()
            },
            vision: {
                title: document.getElementById('visionTitle').value.trim(),
                content: document.getElementById('visionContent').value.trim()
            },
            company: {
                title: document.getElementById('companyTitle').value.trim(),
                content: document.getElementById('companyContent').value.trim(),
                photo: document.getElementById('companyPhoto').value.trim(),
                photoCaption: document.getElementById('companyPhotoCaption').value.trim()
            },
            team: [],
            mentors: [],
            achievements: [],
            partners: [],
            timeline: []
        };

        // Collect team members
        document.querySelectorAll('.team-item').forEach(item => {
            const name = item.querySelector('.team-name').value.trim();
            const role = item.querySelector('.team-role').value.trim();
            const bio = item.querySelector('.team-bio').value.trim();
            
            if (name && role) {
                aboutData.team.push({ name, role, bio });
            }
        });

        // Collect mentors
        document.querySelectorAll('.mentor-item').forEach(item => {
            const name = item.querySelector('.mentor-name').value.trim();
            const title = item.querySelector('.mentor-title').value.trim();
            const organization = item.querySelector('.mentor-org').value.trim();
            const bio = item.querySelector('.mentor-bio').value.trim();
            
            if (name && title) {
                aboutData.mentors.push({ name, title, organization, bio });
            }
        });

        // Collect achievements
        document.querySelectorAll('.achievement-item').forEach(item => {
            const number = item.querySelector('.achievement-number').value.trim();
            const label = item.querySelector('.achievement-label').value.trim();
            
            if (number && label) {
                aboutData.achievements.push({ number, label });
            }
        });

        // Collect partners
        document.querySelectorAll('.partner-item').forEach(item => {
            const name = item.querySelector('.partner-name').value.trim();
            const logo = item.querySelector('.partner-logo').value.trim();
            const url = item.querySelector('.partner-url').value.trim();
            
            if (name) {
                aboutData.partners.push({ name, logo, url });
            }
        });

        // Collect timeline
        document.querySelectorAll('.timeline-item').forEach(item => {
            const year = item.querySelector('.timeline-year').value.trim();
            const title = item.querySelector('.timeline-title').value.trim();
            const description = item.querySelector('.timeline-description').value.trim();
            
            if (year && title) {
                aboutData.timeline.push({ year, title, description });
            }
        });

        // Validate required fields
        if (!aboutData.mission.title || !aboutData.mission.content ||
            !aboutData.vision.title || !aboutData.vision.content ||
            !aboutData.company.title || !aboutData.company.content) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Save to localStorage
        localStorage.setItem('aboutContent', JSON.stringify(aboutData));

        console.log('About content saved:', aboutData);
        showNotification('✅ About section updated successfully!', 'success');

    } catch (error) {
        console.error('Error saving about data:', error);
        showNotification('❌ Error saving data: ' + error.message, 'error');
    }
}

// Remove element
function removeElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

// Reset form
function resetForm() {
    if (confirm('Are you sure you want to reset all changes?')) {
        location.reload();
    }
}

// Show notification
function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    if (!document.querySelector('style[data-notification-about]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification-about', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 3000;
                min-width: 300px;
                max-width: 600px;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: slideDown 0.3s ease;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
            }
            
            .notification-success {
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .notification-error {
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            @keyframes slideDown {
                from {
                    top: -100px;
                    opacity: 0;
                }
                to {
                    top: 20px;
                    opacity: 1;
                }
            }

            .photo-preview {
                margin-top: 1rem;
            }

            .preview-container {
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .preview-container img {
                width: 100%;
                max-height: 300px;
                object-fit: cover;
                display: block;
            }

            .preview-container p {
                background: #f5f5f5;
                padding: 1rem;
                margin: 0;
                font-size: 0.9rem;
                color: #666;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.insertBefore(notification, document.body.firstChild);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
    }
}
