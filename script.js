particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#1E90FF", "#00ffff", "#0f3460"] },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

function showSection(sectionId) {
    const currentSection = document.querySelector('section.active');
    if (currentSection && currentSection.id !== sectionId) {
        currentSection.classList.remove('active');
        const transitionHandler = () => {
            currentSection.style.display = 'none';
            currentSection.removeEventListener('transitionend', transitionHandler);
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.style.display = 'block';
                setTimeout(() => {
                    targetSection.classList.add('active');
                    animateSectionContent(targetSection);
                }, 10);
            } else {
                console.error(`Section with ID '${sectionId}' not found`);
            }
        };
        currentSection.addEventListener('transitionend', transitionHandler);
    } else {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            animateSectionContent(targetSection);
        } else {
            console.error(`Section with ID '${sectionId}' not found`);
        }
    }
}

function animateSectionContent(section) {
    const elements = section.querySelectorAll('.skill-category, .skill-level, .about-img, .about-content p, .quiz-preview, .social-links a, .resume-container, .resume-item, .profile-img, .project-item');
    elements.forEach(el => el.classList.remove('animate'));
    setTimeout(() => {
        elements.forEach((el, index) => {
            setTimeout(() => el.classList.add('animate'), index * 150);
        });
    }, 200);
}

function setupQuizPreview(previewId, expandedId) {
    const preview = document.getElementById(previewId);
    const expanded = document.getElementById(expandedId);
    
    if (preview && expanded) {
        preview.addEventListener('click', function() {
            console.log(`Clicked ${previewId}`);
            expanded.classList.add('active');
            this.style.display = 'none';
            
            let closeBtn = expanded.querySelector('.close-quiz-btn');
            if (!closeBtn) {
                closeBtn = document.createElement('button');
                closeBtn.className = 'close-quiz-btn';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                closeBtn.onclick = () => {
                    expanded.classList.remove('active');
                    preview.style.display = 'flex';
                };
                expanded.appendChild(closeBtn);
            }
        });
    } else {
        console.error(`Elements ${previewId} or ${expandedId} not found`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");

    const navLinks = document.querySelectorAll('nav a[data-section]');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                showSection(this.getAttribute('data-section'));
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                }
            });
        });
    } else {
        console.error('No nav links with data-section found');
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    } else {
        console.error('Hamburger button not found');
    }
    
    const heroBtn = document.querySelector('.btn[data-section]');
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('nav a[data-section="resume"]').classList.add('active');
            showSection('resume');
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
        });
    } else {
        console.error('Hero button with data-section not found');
    }
    
    showSection('home');
    
    const quizTabs = document.querySelectorAll('.quiz-tab');
    if (quizTabs.length > 0) {
        quizTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                quizTabs.forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                document.getElementById(this.dataset.tab + '-content').classList.add('active');
            });
        });
    } else {
        console.error('No quiz-tab elements found');
    }
    
    setupQuizPreview('quizPreview1', 'quizExpanded1');
    setupQuizPreview('quizPreview2', 'quizExpanded2');
    setupQuizPreview('quizPreview3', 'quizExpanded3');
    setupQuizPreview('quizPreview4', 'quizExpanded4');
    setupQuizPreview('quizPreview5', 'quizExpanded5');
    
    const lampToggle = document.getElementById('lampToggle');
    if (lampToggle) {
        let isLightMode = false;
        lampToggle.addEventListener('click', function() {
            isLightMode = !isLightMode;
            document.body.classList.toggle('light-mode');
            this.classList.toggle('on');
        });
    } else {
        console.error('Lamp toggle (#lampToggle) not found');
    }
    
    const socialLinks = document.querySelectorAll('.social-links a');
    if (socialLinks.length > 0) {
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const iconClass = this.querySelector('i').classList[1];
                const urls = {
                    'fa-facebook': 'https://www.facebook.com/lrns.hntj',
                    'fa-instagram': 'https://www.instagram.com/lrns_hntj/',
                    'fa-github': 'https://github.com/enzohntji',
                };
                window.open(urls[iconClass] || '#', '_blank');
                this.style.transform = 'scale(1.3) rotate(360deg)';
                setTimeout(() => this.style.transform = '', 300);
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                }
            });
        });
    } else {
        console.error('No social links found');
    }

    const numbers = ['1.0', '1.25', '1.50', '1.75', '2.0', '2.25', '2.50', '2.75', '3.0'];

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    const circle = document.querySelector('.cursor-circle');
    const trail = document.querySelector('.cursor-trail');

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        trailX += (mouseX - trailX - 10) * 0.3;
        trailY += (mouseY - trailY - 10) * 0.3;
        trail.style.left = `${trailX}px`;
        trail.style.top = `${trailY}px`;

        circle.style.left = `${mouseX - 20}px`;
        circle.style.top = `${mouseY - 20}px`;

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    document.addEventListener('click', (e) => {
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        
        circle.classList.add('clicked');
        circle.textContent = randomNumber;
        
        setTimeout(() => {
            circle.classList.remove('clicked');
            setTimeout(() => {
                circle.textContent = '';
            }, 300);
        }, 300);
    });

    const interactiveElements = document.querySelectorAll('a, .btn, .skill-category, .quiz-preview, .profile-img, .about-img, .lamp-icon, .resume-item, .skill-tag, .hamburger, .project-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.querySelector('.cursor-circle').style.transform = 'scale(1.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            document.querySelector('.cursor-circle').style.transform = 'scale(1)';
        });
    });
});