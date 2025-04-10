// Consolidated script.js
document.addEventListener('DOMContentLoaded', () => {
    // === Reveal Animations on Scroll ===
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

    document.querySelectorAll('.project, section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // === Water Ripple Effect ===
    document.querySelectorAll('.water-ripple').forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            element.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(136, 197, 221, 0.1) 0%, rgba(136, 197, 221, 0) 50%)`;
        });
        element.addEventListener('mouseleave', () => {
            element.style.background = '';
        });
    });

    // === Parallax Effect for Hero Section ===
    const heroSection = document.querySelector('.hero-section');
    const abstractArt = document.querySelector('.abstract-art');
    if (heroSection && abstractArt) {
        window.addEventListener('scroll', () => {
            if (heroSection.getBoundingClientRect().bottom > 0) {
                const scrolled = window.pageYOffset;
                abstractArt.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        });
    }

    // === Tab Functionality for Works Section ===
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projects = document.querySelectorAll('.project');
    if (tabButtons.length > 0 && projects.length > 0) {
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
        filterProjects('all');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.dataset.category;
                filterProjects(category);
                pauseAllVideos();
            });
        });
    }

    // === Media Handling for Projects ===
    document.querySelectorAll('.project-media').forEach(mediaContainer => {
        const video = mediaContainer.querySelector('video');
        const image = mediaContainer.querySelector('img');
        const projectTitle = mediaContainer.closest('.project')?.querySelector('h3')?.textContent || '';
        if (video) {
            mediaContainer.addEventListener('click', (e) => {
                e.preventDefault();
                openMediaPopup(video.cloneNode(true), projectTitle);
            });
            mediaContainer.addEventListener('mouseenter', () => video.play());
            mediaContainer.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        } else if (image) {
            mediaContainer.addEventListener('click', (e) => {
                e.preventDefault();
                openMediaPopup(image.cloneNode(true), projectTitle);
            });
        }
    });

    // === Media Popup Functions ===
    function openMediaPopup(mediaElement, caption) {
        const popup = document.getElementById('mediaPopup');
        const container = document.querySelector('.media-container');
        const captionElement = document.querySelector('.media-caption');
        if (!popup || !container) return;
        container.innerHTML = '';
        container.appendChild(mediaElement);
        if (captionElement && caption) captionElement.textContent = caption;
        popup.style.display = 'flex';
        if (mediaElement.tagName === 'VIDEO') {
            mediaElement.muted = false;
            mediaElement.controls = true;
            mediaElement.play();
        }
        document.body.style.overflow = 'hidden';
    }

    function closeMediaPopup() {
        const popup = document.getElementById('mediaPopup');
        if (!popup) return;
        popup.style.display = 'none';
        const video = popup.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        document.body.style.overflow = 'auto';
    }

    const closeButton = document.querySelector('.close-media-popup');
    if (closeButton) closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMediaPopup();
    });

    const mediaPopup = document.getElementById('mediaPopup');
    if (mediaPopup) {
        mediaPopup.addEventListener('click', (e) => {
            if (e.target === mediaPopup) closeMediaPopup();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMediaPopup();
    });

    function pauseAllVideos() {
        document.querySelectorAll('.project-video').forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }

    // === Back to Top Button ===
    const toTopButton = document.getElementById('toTopBtn');
    if (toTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                toTopButton.classList.add('visible');
            } else {
                toTopButton.classList.remove('visible');
            }
        });
        toTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === Timeline Animation ===
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    timelineItems.forEach(item => timelineObserver.observe(item));

    // === Tech Tag Hover ===
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseover', () => tag.style.transform = 'scale(1.1)');
        tag.addEventListener('mouseout', () => tag.style.transform = 'scale(1)');
    });

    // === Dynamic Year Calculation ===
    const dates = document.querySelectorAll('.date');
    dates.forEach(date => {
        const text = date.textContent;
        if (text.includes('Present')) {
            const startYear = parseInt(text.split('-')[0].match(/\d{4}/));
            const currentYear = new Date().getFullYear();
            const years = currentYear - startYear;
            date.setAttribute('title', `${years} years of experience`);
        }
    });

    // === Photography Filter and Lightbox ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let filteredItems = Array.from(galleryItems);

    function updateFilteredItems() {
        filteredItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    }

    if (filterButtons.length > 0 && galleryItems.length > 0) {
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
                        item.classList.remove('animate-card');
                    }
                });
                updateFilteredItems();
            });
        });

        galleryItems.forEach(item => {
            const viewBtn = item.querySelector('.view-btn');
            if (viewBtn) {
                viewBtn.addEventListener('click', () => {
                    updateFilteredItems();
                    currentIndex = filteredItems.indexOf(item);
                    openLightbox();
                });
            }
        });

        if (lightbox) {
            closeLightbox.addEventListener('click', () => lightbox.classList.remove('active'));
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) lightbox.classList.remove('active');
            });
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                updateLightbox();
            });
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % filteredItems.length;
                updateLightbox();
            });
            document.addEventListener('keydown', (e) => {
                if (lightbox.classList.contains('active')) {
                    if (e.key === 'ArrowLeft') {
                        currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                        updateLightbox();
                    } else if (e.key === 'ArrowRight') {
                        currentIndex = (currentIndex + 1) % filteredItems.length;
                        updateLightbox();
                    } else if (e.key === 'Escape') {
                        lightbox.classList.remove('active');
                    }
                }
            });
        }

        function openLightbox() {
            const currentItem = filteredItems[currentIndex];
            const img = currentItem.querySelector('img');
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt; // Use alt as caption
            lightbox.classList.add('active');
        }

        function updateLightbox() {
            const currentItem = filteredItems[currentIndex];
            const img = currentItem.querySelector('img');
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt;
        }
    }

    // === Navigation ===
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // === Education Cards Animation ===
    const educationCards = document.querySelectorAll('.education-card');
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                educationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    educationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        educationObserver.observe(card);
    });

    const courseTags = document.querySelectorAll('.course-tag');
    courseTags.forEach(tag => {
        tag.addEventListener('mouseover', () => tag.style.transform = 'scale(1.05)');
        tag.addEventListener('mouseout', () => tag.style.transform = 'scale(1)');
    });

    // === Circular Progress and Language Bars ===
    const progressRings = document.querySelectorAll('.progress-ring-circle');
    if (progressRings.length > 0) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const valueElement = circle.closest('.progress-ring').querySelector('.progress-value');
                    const percentage = parseInt(valueElement.textContent);
                    const radius = circle.getAttribute('r');
                    const circumference = 2 * Math.PI * radius;
                    const strokeDasharray = `${(percentage * circumference) / 100} ${circumference}`;
                    setTimeout(() => circle.style.strokeDasharray = strokeDasharray, 300);
                    progressObserver.unobserve(circle);
                }
            });
        }, { threshold: 0.1 });
        progressRings.forEach(ring => progressObserver.observe(ring));
    }

    const languageProgressBars = document.querySelectorAll('.language-progress');
    if (languageProgressBars.length > 0) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.dataset.width || '0%';
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        languageProgressBars.forEach(bar => {
            bar.dataset.width = bar.style.width;
            bar.style.width = '0%';
            barObserver.observe(bar);
        });
    }

    const softwareItems = document.querySelectorAll('.software-item');
    softwareItems.forEach(item => {
        item.addEventListener('mouseenter', () => item.style.transform = 'translateY(-8px)');
        item.addEventListener('mouseleave', () => item.style.transform = 'translateY(0)');
    });
});
