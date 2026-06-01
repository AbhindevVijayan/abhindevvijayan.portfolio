document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // ==========================================================================
    // Custom Cursor Tracing
    // ==========================================================================
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const hoverables = document.querySelectorAll('a, button, select, input, textarea, .star, .tab-btn');

    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });
    }

    // ==========================================================================
    // Theme Toggle & Persistence
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Check existing choice
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = savedTheme;

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });

    // ==========================================================================
    // Typewriter Effect
    // ==========================================================================
    const typewriterElement = document.getElementById('typewriter-text');
    const phrases = [
        "am an MCA Graduate & Software Developer.",
        "apply Cricket Strategy to build agile code.",
        "love researching Civic Politics & Tech Law.",
        "build secure, scalable, compliant systems."
    ];
    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTypewriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, characterIndex - 1);
            characterIndex--;
            typingSpeed = 40; // delete faster
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, characterIndex + 1);
            characterIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && characterIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of phrase
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting next phrase
        }

        setTimeout(handleTypewriter, typingSpeed);
    }

    if (typewriterElement) {
        setTimeout(handleTypewriter, 1000);
    }

    // ==========================================================================
    // Sticky Navbar & Mobile Navigation Menu
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll shrink
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active section highligher on scroll
        highlightNavLinks();
    });

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('nav-active');
    });

    // Close menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('nav-active');
        });
    });

    // Highlight nav link based on viewport scroll
    function highlightNavLinks() {
        const scrollPosition = window.scrollY + 120;
        
        document.querySelectorAll('section').forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==========================================================================
    // Skills Tab Controls & Dynamic Progress Bars
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function animateProgressBars(tabId) {
        const activePanel = document.getElementById(tabId);
        if (!activePanel) return;

        const progressFills = activePanel.querySelectorAll('.skill-bar-fill');
        const percentages = activePanel.querySelectorAll('.skill-percentage');

        progressFills.forEach((fill, index) => {
            const targetWidth = percentages[index].textContent;
            // Short delay to allow browser layout render
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 50 * index);
        });
    }

    // Initialize first tab progress bars
    animateProgressBars('tech');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Switch buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Switch content panels
            tabContents.forEach(c => c.classList.remove('active'));
            const targetContent = document.getElementById(targetTab);
            targetContent.classList.add('active');

            // Reset widths of non-active to animate fresh again
            tabContents.forEach(c => {
                if (c.id !== targetTab) {
                    c.querySelectorAll('.skill-bar-fill').forEach(fill => {
                        fill.style.width = '0%';
                    });
                }
            });

            // Animate target
            animateProgressBars(targetTab);
        });
    });

    // Also trigger animations when section is scrolled into view (for initial load)
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateProgressBars('tech');
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.2 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // ==========================================================================
    // Feedback / Guestbook Dynamic Local Storage System
    // ==========================================================================
    const feedbackForm = document.getElementById('feedbackForm');
    const starRatingContainer = document.getElementById('starRating');
    const stars = document.querySelectorAll('.star');
    const fbRatingInput = document.getElementById('fbRating');
    const feedbackFeed = document.getElementById('feedbackFeed');
    const feedbackCountElem = document.getElementById('feedbackCount');
    const feedbackAverageElem = document.getElementById('feedbackAverage');

    // Sample initial testimonials
    const defaultTestimonials = [
        {
            name: "Dr. Rajesh K. Nair",
            role: "MCA HOD & Professor",
            rating: 5,
            message: "Abhindev was one of the most proactive developers in the MCA cohort. His command over system architectures and software principles is stellar. He always brought deep ethical perspectives into technology discussions.",
            date: "May 25, 2026"
        },
        {
            name: "Saurav Chandran",
            role: "Cricket League Coordinator",
            rating: 5,
            message: "I played alongside Abhindev in local club leagues. His capacity to stay patient under pressure and plan team deployments dynamically is incredible. He literally brings sports intelligence straight to his tech projects!",
            date: "May 12, 2026"
        },
        {
            name: "Meera Subramanian",
            role: "Senior UX/UI Engineer",
            rating: 4,
            message: "Worked with Abhindev on building the Civix Core prototype. His software capability is high, but what makes him stand out is his grasp of compliance regulations, user data rights, and clear policy flows.",
            date: "April 28, 2026"
        }
    ];

    // Star Selection logic
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const selectedValue = star.getAttribute('data-rating');
            fbRatingInput.value = selectedValue;
            
            // Clear rating errors
            document.getElementById('fbRatingError').parentNode.classList.remove('has-error');

            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= parseInt(selectedValue)) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Load and render guestbook reviews
    function getStoredFeedback() {
        const stored = localStorage.getItem('guestbook_feedback');
        if (stored) {
            return JSON.parse(stored);
        } else {
            // Write default data initially
            localStorage.setItem('guestbook_feedback', JSON.stringify(defaultTestimonials));
            return defaultTestimonials;
        }
    }

    function renderFeedbackList() {
        const reviews = getStoredFeedback();
        feedbackFeed.innerHTML = '';

        if (reviews.length === 0) {
            feedbackFeed.innerHTML = '<p class="empty-state">No notes left yet. Be the first!</p>';
            feedbackCountElem.textContent = '0';
            feedbackAverageElem.textContent = '0.0';
            return;
        }

        reviews.forEach(review => {
            const starsHTML = Array(5).fill('')
                .map((_, i) => `<i data-lucide="star" style="${i < review.rating ? 'fill: var(--accent-gold); color: var(--accent-gold);' : 'color: var(--text-muted);'}"></i>`)
                .join('');

            const reviewCard = document.createElement('div');
            reviewCard.className = 'feedback-item';
            reviewCard.innerHTML = `
                <div class="item-header">
                    <div class="item-author">
                        <h4>${escapeHTML(review.name)}</h4>
                        <span>${escapeHTML(review.role)} &bull; ${review.date}</span>
                    </div>
                    <div class="item-rating">
                        ${starsHTML}
                    </div>
                </div>
                <p>"${escapeHTML(review.message)}"</p>
            `;
            feedbackFeed.appendChild(reviewCard);
        });

        // Update stats
        feedbackCountElem.textContent = reviews.length;
        const totalRating = reviews.reduce((sum, r) => sum + parseInt(r.rating), 0);
        const avg = (totalRating / reviews.length).toFixed(1);
        feedbackAverageElem.textContent = avg;
        
        // Re-trigger lucide render for generated stars
        lucide.createIcons();
    }

    // Validate and submit feedback
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameIn = document.getElementById('fbName');
            const roleIn = document.getElementById('fbRole');
            const messageIn = document.getElementById('fbMessage');
            const ratingVal = fbRatingInput.value;
            
            let isValid = true;

            // Reset error states
            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

            if (!nameIn.value.trim()) {
                nameIn.parentNode.classList.add('has-error');
                isValid = false;
            }
            if (!roleIn.value) {
                roleIn.parentNode.classList.add('has-error');
                isValid = false;
            }
            if (!ratingVal) {
                fbRatingInput.parentNode.classList.add('has-error');
                isValid = false;
            }
            if (!messageIn.value.trim()) {
                messageIn.parentNode.classList.add('has-error');
                isValid = false;
            }

            if (!isValid) return;

            // Save new item
            const newFeedback = {
                name: nameIn.value.trim(),
                role: roleIn.value,
                rating: parseInt(ratingVal),
                message: messageIn.value.trim(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };

            const reviews = getStoredFeedback();
            reviews.unshift(newFeedback); // Prepend to list
            localStorage.setItem('guestbook_feedback', JSON.stringify(reviews));

            // Reset fields
            nameIn.value = '';
            roleIn.value = '';
            messageIn.value = '';
            fbRatingInput.value = '';
            stars.forEach(s => s.classList.remove('active'));

            // Re-render
            renderFeedbackList();
        });
    }

    // Escape script inputs
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Init feedback list render
    renderFeedbackList();

    // ==========================================================================
    // Dynamic Projects Grid Fetching
    // ==========================================================================
    const projectsGrid = document.getElementById('projectsGrid');

    async function getStoredProjects() {
        try {
            const response = await fetch('assets/projects.json?t=' + Date.now());
            const projects = await response.json();
            return projects;
        } catch (error) {
            console.error("Error loading projects database:", error);
            return [];
        }
    }

    async function renderProjectsList() {
        if (!projectsGrid) return;
        const projects = await getStoredProjects();
        projectsGrid.innerHTML = '';

        if (projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <p>No projects available.</p>
                </div>
            `;
            return;
        }

        projects.forEach(project => {
            const tagsHTML = project.tags.map(t => `<span>${escapeHTML(t.trim())}</span>`).join('');
            
            let linksHTML = '';
            if (project.sourceUrl) {
                linksHTML += `<a href="${escapeHTML(project.sourceUrl)}" target="_blank" class="project-link" aria-label="GitHub Repository"><i data-lucide="github"></i><span>Source</span></a>`;
            }
            if (project.liveUrl) {
                linksHTML += `<a href="${escapeHTML(project.liveUrl)}" target="_blank" class="project-link" aria-label="Live Demo"><i data-lucide="external-link"></i><span>Live Demo</span></a>`;
            }

            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-media">
                    <div class="project-glow"></div>
                    <div class="project-accent-icon"><i data-lucide="${escapeHTML(project.icon)}"></i></div>
                    <span class="project-category">${escapeHTML(project.category)}</span>
                </div>
                <div class="project-info">
                    <h3>${escapeHTML(project.title)}</h3>
                    <p>${escapeHTML(project.description)}</p>
                    <div class="project-tags">
                        ${tagsHTML}
                    </div>
                    <div class="project-links">
                        ${linksHTML}
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });

        // Re-render Lucide icons
        lucide.createIcons();
        
        // Re-register hover state cursor scaling
        const dynamicHoverables = projectsGrid.querySelectorAll('.project-link');
        dynamicHoverables.forEach(item => {
            item.addEventListener('mouseenter', () => cursor && cursor.classList.add('hovered'));
            item.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hovered'));
        });
    }

    // Trigger Initial Render
    renderProjectsList();

    // ==========================================================================
    // Contact Form Actions & Verification
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    const contactResetBtn = document.getElementById('contactResetBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const cName = document.getElementById('cName');
            const cEmail = document.getElementById('cEmail');
            const cSubject = document.getElementById('cSubject');
            const cMessage = document.getElementById('cMessage');
            
            let isValid = true;

            // Reset error views
            contactForm.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

            if (!cName.value.trim()) {
                cName.parentNode.classList.add('has-error');
                isValid = false;
            }
            if (!cEmail.value.trim() || !validateEmail(cEmail.value.trim())) {
                cEmail.parentNode.classList.add('has-error');
                isValid = false;
            }
            if (!cSubject.value.trim()) {
                cSubject.parentNode.classList.add('has-error');
                isValid = false;
            }
            if (!cMessage.value.trim()) {
                cMessage.parentNode.classList.add('has-error');
                isValid = false;
            }

            if (!isValid) return;

            // Successful simulate send
            contactForm.style.opacity = '0';
            setTimeout(() => {
                contactForm.style.display = 'none';
                contactSuccess.style.display = 'flex';
                
                // Clear fields
                cName.value = '';
                cEmail.value = '';
                cSubject.value = '';
                cMessage.value = '';
            }, 300);
        });
    }

    if (contactResetBtn) {
        contactResetBtn.addEventListener('click', () => {
            contactSuccess.style.display = 'none';
            contactForm.style.display = 'block';
            setTimeout(() => {
                contactForm.style.opacity = '1';
            }, 50);
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
