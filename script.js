/* =============================================
   RIFAT AHMED — PORTFOLIO SCRIPTS
   Animations, Interactions, Premium UX
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: unobserve after reveal for performance
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    });

    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });

    // ==================== STICKY NAVBAR ====================
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // ==================== MOBILE NAVIGATION ====================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-pill').forEach((link) => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ==================== SERVICE ACCORDION ====================
    const serviceHeaders = document.querySelectorAll('.service-header');

    serviceHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            const serviceItem = header.closest('.service-item');
            const isActive = serviceItem.classList.contains('active');

            // Close all
            document.querySelectorAll('.service-item').forEach((item) => {
                item.classList.remove('active');
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                serviceItem.classList.add('active');
            }
        });
    });

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== CURSOR GLOW (Desktop Only) ====================
    if (window.matchMedia('(hover: hover)').matches) {
        const cursorGlow = document.createElement('div');
        cursorGlow.classList.add('cursor-glow');
        document.body.appendChild(cursorGlow);

        let mouseX = -200;
        let mouseY = -200;
        let glowX = -200;
        let glowY = -200;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    }

    // ==================== PARALLAX HERO BACKGROUND ====================
    const heroSection = document.getElementById('hero');
    const bgTexture = document.querySelector('.bg-texture');

    if (heroSection && bgTexture) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            bgTexture.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }

    // ==================== COUNTER ANIMATION ====================
    const statNumbers = document.querySelectorAll('.stat-number');
    const metricNumbers = document.querySelectorAll('.metric-number');

    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 60;
        const duration = 1500;
        const stepTime = duration / 60;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (target >= 1000) {
                element.textContent = Math.floor(current / 1000) + 'K' + suffix;
            } else if (Number.isInteger(target)) {
                element.textContent = Math.floor(current) + suffix;
            } else {
                element.textContent = current.toFixed(1) + suffix;
            }
        }, stepTime);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent.trim();
                let numericValue;
                let suffix = '';

                if (text.includes('K+')) {
                    numericValue = parseFloat(text.replace('K+', '')) * 1000;
                    suffix = '+';
                } else if (text.includes('K')) {
                    numericValue = parseFloat(text.replace('K', '')) * 1000;
                } else if (text.includes('+')) {
                    numericValue = parseFloat(text.replace('+', ''));
                    suffix = '+';
                } else {
                    numericValue = parseFloat(text);
                }

                if (!isNaN(numericValue)) {
                    animateCounter(entry.target, numericValue, suffix);
                }

                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach((el) => counterObserver.observe(el));
    metricNumbers.forEach((el) => counterObserver.observe(el));

    // ==================== TILT EFFECT ON EXP CARDS ====================
    const expCards = document.querySelectorAll('.exp-card');

    if (window.matchMedia('(hover: hover)').matches) {
        expCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ==================== TYPING EFFECT FOR HERO ROLE ====================
    const heroRole = document.querySelector('.hero-role');
    if (heroRole) {
        const originalText = heroRole.textContent;
        heroRole.textContent = '';
        heroRole.style.borderRight = '2px solid var(--accent)';

        let charIndex = 0;
        const typeInterval = setInterval(() => {
            heroRole.textContent = originalText.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex >= originalText.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    heroRole.style.borderRight = 'none';
                }, 1000);
            }
        }, 60);
    }

    // ==================== MAGNETIC BUTTON EFFECT ====================
    const magneticButtons = document.querySelectorAll('.btn-primary, .nav-cta');

    if (window.matchMedia('(hover: hover)').matches) {
        magneticButtons.forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ==================== ACTIVE NAV LINK HIGHLIGHT ====================
    const sections = document.querySelectorAll('.section');
    const navPills = document.querySelectorAll('.nav-pill');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navPills.forEach((pill) => {
                    pill.style.background = '';
                    pill.style.color = '';
                    pill.style.borderColor = '';
                });

                const activeLink = document.querySelector(`.nav-pill[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.style.background = 'var(--text)';
                    activeLink.style.color = 'var(--white)';
                    activeLink.style.borderColor = 'var(--text)';
                }
            }
        });
    }, {
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    });

    sections.forEach((section) => {
        navObserver.observe(section);
    });

    // ==================== PRELOAD ANIMATION ====================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease';
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });

        // Trigger hero reveals after page load
        setTimeout(() => {
            document.querySelectorAll('.hero .reveal').forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('revealed');
                }, i * 120);
            });
        }, 300);
    });
});
