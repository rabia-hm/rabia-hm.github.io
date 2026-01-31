/* ============================================
   MIDNIGHT DATA — Portfolio Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // THEME PALETTES
    // ========================================
    const themes = {
        midnight: {
            colors: [
                'radial-gradient(circle, rgba(139,26,58,0.55) 0%, rgba(139,26,58,0.15) 70%)',
                'radial-gradient(circle, rgba(212,86,122,0.50) 0%, rgba(212,86,122,0.12) 70%)',
                'radial-gradient(circle, rgba(232,141,165,0.45) 0%, rgba(232,141,165,0.10) 70%)',
                'radial-gradient(circle, rgba(184,38,79,0.50) 0%, rgba(184,38,79,0.12) 70%)',
                'radial-gradient(circle, rgba(139,26,58,0.55) 0%, rgba(212,86,122,0.15) 70%)',
            ],
            border: 'rgba(139,26,58,0.30)',
            icon: '\u263E',  // lune
        },
        rose: {
            colors: [
                'radial-gradient(circle, rgba(122,21,48,0.55) 0%, rgba(122,21,48,0.15) 70%)',
                'radial-gradient(circle, rgba(163,30,69,0.50) 0%, rgba(163,30,69,0.12) 70%)',
                'radial-gradient(circle, rgba(212,114,138,0.45) 0%, rgba(212,114,138,0.10) 70%)',
                'radial-gradient(circle, rgba(196,90,120,0.48) 0%, rgba(196,90,120,0.12) 70%)',
                'radial-gradient(circle, rgba(232,160,180,0.40) 0%, rgba(232,160,180,0.10) 70%)',
            ],
            border: 'rgba(163,30,69,0.30)',
            icon: '\u2740',  // fleur
        }
    };

    let currentTheme = localStorage.getItem('theme') || 'midnight';

    // ========================================
    // BUBBLES BACKGROUND
    // ========================================
    const bubblesContainer = document.getElementById('bubbles');
    const BUBBLE_COUNT = 25;

    function createBubbles(themeName) {
        bubblesContainer.innerHTML = '';
        const palette = themes[themeName];

        for (let i = 0; i < BUBBLE_COUNT; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            const size = Math.random() * 60 + 10;
            const left = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 10;

            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = left + '%';
            bubble.style.background = palette.colors[Math.floor(Math.random() * palette.colors.length)];
            bubble.style.animationDuration = duration + 's';
            bubble.style.animationDelay = delay + 's';
            bubble.style.border = '1px solid ' + palette.border;

            bubblesContainer.appendChild(bubble);
        }
    }

    // ========================================
    // THEME TOGGLE
    // ========================================
    const themeToggle = document.getElementById('themeToggle');
    const toggleIcon = document.getElementById('toggleIcon');

    function applyTheme(themeName) {
        if (themeName === 'rose') {
            document.documentElement.setAttribute('data-theme', 'rose');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        toggleIcon.textContent = themes[themeName].icon;
        createBubbles(themeName);
        localStorage.setItem('theme', themeName);
        currentTheme = themeName;
    }

    themeToggle.addEventListener('click', () => {
        const next = currentTheme === 'midnight' ? 'rose' : 'midnight';
        applyTheme(next);
    });

    // Init theme
    applyTheme(currentTheme);

    // ========================================
    // NAVBAR SCROLL
    // ========================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // MOBILE NAV TOGGLE
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // ========================================
    // TYPING EFFECT
    // ========================================
    const typingElement = document.getElementById('typingText');
    const phrases = [
        'Data Analyste en devenir',
        'Etudiante a 42',
        'Python | SQL | Visualisation',
        'Disponible pour un stage',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const current = phrases[phraseIndex];

        if (!isDeleting) {
            typingElement.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
        } else {
            typingElement.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        const speed = isDeleting ? 40 : 80;
        setTimeout(typeEffect, speed);
    }

    setTimeout(typeEffect, 1500);

    // ========================================
    // STAT COUNTER ANIMATION
    // ========================================
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const start = performance.now();

            function updateCount(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                stat.textContent = Math.floor(eased * target);

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            }

            requestAnimationFrame(updateCount);
        });
    }

    // ========================================
    // SKILL BAR ANIMATION
    // ========================================
    function animateSkillBars() {
        document.querySelectorAll('.skill-fill').forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    // ========================================
    // SCROLL REVEAL (Intersection Observer)
    // ========================================
    const revealElements = document.querySelectorAll(
        '.skill-category, .project-card, .about-grid, .contact-grid, .highlight'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger stat animation when hero stats come into view
                if (!statsAnimated && entry.target.closest('.hero')) {
                    animateStats();
                    statsAnimated = true;
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));

    // Observe hero stats separately
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        }, { threshold: 0.5 });
        statsObserver.observe(heroStats);
    }

    // Observe skill bars
    const skillsSection = document.getElementById('competences');
    if (skillsSection) {
        const skillObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateSkillBars();
                skillObserver.unobserve(skillsSection);
            }
        }, { threshold: 0.2 });
        skillObserver.observe(skillsSection);
    }

    // ========================================
    // CONTACT FORM (placeholder handler)
    // ========================================
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Message envoye &#10003;';
        btn.style.background = 'linear-gradient(135deg, #2d7a4f, #3da065)';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });

    // ========================================
    // SMOOTH SCROLL for nav links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
