// Reveal animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all projects and sections
document.querySelectorAll('.project, section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Water ripple effect
document.querySelectorAll('.water-ripple').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.background = `radial-gradient(circle at ${x}px ${y}px, 
            rgba(136, 197, 221, 0.1) 0%, 
            rgba(136, 197, 221, 0) 50%)`;
    });

    element.addEventListener('mouseleave', () => {
        element.style.background = '';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const abstractArt = document.querySelector('.abstract-art');
    
    window.addEventListener('scroll', () => {
        if (heroSection.getBoundingClientRect().bottom > 0) {
            const scrolled = window.pageYOffset;
            abstractArt.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });
});

// Tab functionality for works section
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projects = document.querySelectorAll('.project');
    
    // Only run this code if we're on the works page
    if (tabButtons.length > 0 && projects.length > 0) {
        // Function to filter projects
        function filterProjects(category) {
            projects.forEach(project => {
                if (category === 'all' || project.dataset.type === category) {
                    project.classList.add('active');
                    project.style.display = 'block';
                    project.style.opacity = '1';
                    project.style.height = 'auto';
                    project.style.margin = '';
                    project.style.padding = '';
                    project.style.overflow = 'visible';
                } else {
                    project.classList.remove('active');
                    project.style.display = 'none';
                    project.style.opacity = '0';
                    project.style.height = '0';
                    project.style.margin = '0';
                    project.style.padding = '0';
                    project.style.overflow = 'hidden';
                }
            });
        }
        
        // Initialize with "all" category selected
        filterProjects('all');
        
        // Add click event listeners to tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter projects based on category
                const category = button.dataset.category;
                filterProjects(category);
                
                // Pause any playing videos
                document.querySelectorAll('.project-video').forEach(video => {
                    video.pause();
                    video.currentTime = 0;
                });
            });
        });
    }
});

// Update the media handling code
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-media').forEach(mediaContainer => {
        const video = mediaContainer.querySelector('video');
        const image = mediaContainer.querySelector('img');
        const projectTitle = mediaContainer.closest('.project').querySelector('h3').textContent;
        
        if (video) {
            // Handle click for popup
            mediaContainer.addEventListener('click', (e) => {
                e.preventDefault();
                openMediaPopup(video.cloneNode(true), projectTitle);
            });

            // Keep hover functionality for preview
            mediaContainer.addEventListener('mouseenter', () => {
                video.play();
            });

            mediaContainer.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        } else if (image) {
            // Handle click for image popup
            mediaContainer.addEventListener('click', (e) => {
                e.preventDefault();
                openMediaPopup(image.cloneNode(true), projectTitle);
            });
        }
    });
});

// Pause all other videos when a new tab is selected
function pauseAllVideos() {
    document.querySelectorAll('.project-video').forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

// Function to open media popup with caption
function openMediaPopup(mediaElement, caption) {
    const popup = document.getElementById('mediaPopup');
    const container = document.querySelector('.media-container');
    const captionElement = document.querySelector('.media-caption');
    
    if (!popup || !container) {
        console.error('Media popup elements not found');
        return;
    }
    
    // Clear previous content
    container.innerHTML = '';
    
    // Add new content
    container.appendChild(mediaElement);
    
    // Set caption
    if (captionElement && caption) {
        captionElement.textContent = caption;
    }
    
    // Show popup
    popup.style.display = 'flex';
    
    // Handle video specific settings
    if (mediaElement.tagName === 'VIDEO') {
        mediaElement.muted = false;
        mediaElement.controls = true;
        mediaElement.play();
    }
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

// Function to close media popup
function closeMediaPopup() {
    const popup = document.getElementById('mediaPopup');
    
    if (!popup) return;
    
    popup.style.display = 'none';
    
    // Stop video if playing
    const video = popup.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    
    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

// Add event listeners for media popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Close popup when clicking the close button
    const closeButton = document.querySelector('.close-media-popup');
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMediaPopup();
        });
    }

    // Close popup when clicking outside the content
    const mediaPopup = document.getElementById('mediaPopup');
    if (mediaPopup) {
        mediaPopup.addEventListener('click', (e) => {
            if (e.target === mediaPopup) {
                closeMediaPopup();
            }
        });
    }

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMediaPopup();
        }
    });
});

// Back to Top Button functionality
document.addEventListener('DOMContentLoaded', () => {
    const toTopButton = document.getElementById('toTopBtn');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            toTopButton.classList.add('visible');
        } else {
            toTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    toTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Add hover effect for tech stack tags
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseover', () => {
            tag.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseout', () => {
            tag.style.transform = 'scale(1)';
        });
    });

    // Add dynamic year calculation for experience
    const dates = document.querySelectorAll('.date');
    
    dates.forEach(date => {
        const text = date.textContent;
        if (text.includes('Present')) {
            const startYear = parseInt(text.split('-')[0]);
            const currentYear = new Date().getFullYear();
            const years = currentYear - startYear;
            date.setAttribute('title', `${years} years of experience`);
        }
    });
}); 

document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.classList.add('animate-card');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        const viewBtn = item.querySelector('.view-btn');
        viewBtn.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('h3').textContent;
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.style.display = 'block';
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}); 

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.classList.add('animate-card');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}); 

// Update navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        // Remove the existing click event listeners that are preventing navigation
        link.removeEventListener('click', preventDefault);
        
        // Check if the link is an on-page link (starts with #)
        if (link.getAttribute('href').startsWith('#')) {
            // For on-page links, implement smooth scrolling
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        // For page links (not starting with #), allow default navigation
    });
    
    // Set active class for current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Initialize scroll to top button
    const toTopButton = document.getElementById('toTopBtn');
    
    if (toTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                toTopButton.classList.add('visible');
            } else {
                toTopButton.classList.remove('visible');
            }
        });
        
        toTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Rest of your initialization code...
});

// Helper function for removeEventListener (not used directly)
function preventDefault(e) {
    e.preventDefault();
}

// Add animation for education cards
document.addEventListener('DOMContentLoaded', () => {
    // Get all education cards
    const educationCards = document.querySelectorAll('.education-card');
    
    // Set up the observer
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                educationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Prepare and observe each card
    educationCards.forEach((card, index) => {
        // Set initial styles
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`; // Staggered animation
        
        // Observe the card
        educationObserver.observe(card);
    });
    
    // Add hover effects for course tags
    const courseTags = document.querySelectorAll('.course-tag');
    
    courseTags.forEach(tag => {
        tag.addEventListener('mouseover', () => {
            tag.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseout', () => {
            tag.style.transform = 'scale(1)';
        });
    });
}); 

// Initialize circular progress animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate progress rings when they come into view
    const progressRings = document.querySelectorAll('.progress-ring-circle');
    
    if (progressRings.length > 0) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const valueElement = circle.closest('.progress-ring').querySelector('.progress-value');
                    const percentage = parseInt(valueElement.textContent);
                    
                    // Calculate stroke-dasharray based on percentage
                    const radius = circle.getAttribute('r');
                    const circumference = 2 * Math.PI * radius;
                    const strokeDasharray = `${(percentage * circumference) / 100} ${circumference}`;
                    
                    // Animate the stroke
                    setTimeout(() => {
                        circle.style.strokeDasharray = strokeDasharray;
                    }, 300);
                    
                    progressObserver.unobserve(circle);
                }
            });
        }, { threshold: 0.1 });
        
        progressRings.forEach(ring => {
            progressObserver.observe(ring);
        });
    }
    
    // Animate language progress bars
    const languageProgressBars = document.querySelectorAll('.language-progress');
    
    if (languageProgressBars.length > 0) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.style.width || '0%';
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        languageProgressBars.forEach(bar => {
            // Initially set width to 0
            const originalWidth = bar.style.width;
            bar.style.width = '0%';
            
            // Observe the bar
            barObserver.observe(bar);
            
            // Animate to actual width when in view
            setTimeout(() => {
                bar.style.width = originalWidth;
            }, 300);
        });
    }
    
    // Add hover effects for software items
    const softwareItems = document.querySelectorAll('.software-item');
    
    softwareItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}); 