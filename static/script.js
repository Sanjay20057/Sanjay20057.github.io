document.addEventListener("DOMContentLoaded", () => {

    /* =====================
       LOADING SCREEN & INITIAL ANIMATIONS
    ===================== */
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');

        // Hide loader after animation
        setTimeout(function() {
            loader.classList.add('hidden');

            // Trigger initial page animations
            setTimeout(function() {
                animateOnLoad();
            }, 100);
        }, 2500); // Match loader animation duration
    });

    function animateOnLoad() {
        // Animate navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.add('appear');
        }

        // Animate side elements
        const fixedEmail = document.querySelector('.fixed-email');
        const fixedSocial = document.querySelector('.fixed-social');

        if (fixedEmail) fixedEmail.classList.add('appear');
        if (fixedSocial) fixedSocial.classList.add('appear');

        // Animate hero section with delays
        const heroElements = document.querySelectorAll('.hero .fade-up');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('appear');
            }, index * 100);
        });
    }

    /* =====================
       SCROLL-TRIGGERED ANIMATIONS
    ===================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-up elements except hero (already animated on load)
    const fadeUpElements = document.querySelectorAll('.section .fade-up');
    fadeUpElements.forEach(element => {
        observer.observe(element);
    });

    /* =====================
       MOBILE MENU
    ===================== */
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
            mobileMenu.classList.toggle("active");

            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
                navLinks.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.style.overflow = '';
            });
        });
    }

    /* =====================
       NAVBAR SCROLL EFFECT
    ===================== */
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollDirection = 'up';
    let ticking = false;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Determine scroll direction
        if (scrollTop > lastScrollTop) {
            scrollDirection = 'down';
        } else {
            scrollDirection = 'up';
        }

        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    /* =====================
       SCROLL SPY FOR NAVIGATION
    ===================== */
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a[href^='#']");

    function updateActiveNavLink() {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateActiveNavLink);
            ticking = true;
        }
    });

    /* =====================
       SMOOTH SCROLL WITH OFFSET
    ===================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Offset for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =====================
       BLUR NAVBAR ON SCROLL
    ===================== */
    function applyNavbarBlur() {
        const scrolled = window.scrollY;

        if (scrolled > 0) {
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.webkitBackdropFilter = 'blur(10px)';
        } else {
            navbar.style.backdropFilter = 'blur(0px)';
            navbar.style.webkitBackdropFilter = 'blur(0px)';
        }
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(applyNavbarBlur);
            ticking = true;
        }
    });

    /* =====================
       PROJECT CARD TILT EFFECT (Optional Enhancement)
    ===================== */
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* =====================
       KEYBOARD NAVIGATION
    ===================== */
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /* =====================
       ORIENTATION CHANGE FIX
    ===================== */
    window.addEventListener("orientationchange", () => {
        if (navLinks) {
            navLinks.classList.remove("active");
        }
        if (mobileMenu) {
            mobileMenu.classList.remove("active");
        }
        document.body.style.overflow = '';
    });

    /* =====================
       FOCUS VISIBLE POLYFILL
    ===================== */
    document.body.addEventListener('mousedown', () => {
        document.body.classList.add('using-mouse');
    });

    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });

    /* =====================
       PERFORMANCE: DEBOUNCE HELPER
    ===================== */
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    /* =====================
       PRELOAD CRITICAL IMAGES
    ===================== */
    const criticalImages = document.querySelectorAll('img[src*="static"]');
    criticalImages.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });

    /* =====================
       EMAIL OBFUSCATION CLICK TRACKING (Optional)
    ===================== */
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Email link clicked');
            // Add analytics tracking here if needed
        });
    });

    /* =====================
       PREVENT LAYOUT SHIFT
    ===================== */
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        if (!section.style.minHeight) {
            section.style.minHeight = '200px';
        }
    });

    /* =====================
       CONSOLE EASTER EGG
    ===================== */
    console.log(`
    %c Hi there! 👋
    %c Thanks for checking out my portfolio.
    %c Looking for talented data scientists? Let's chat!
    `,
    'color: #64ffda; font-size: 16px; font-weight: bold;',
    'color: #8892b0; font-size: 12px;',
    'color: #8892b0; font-size: 12px;'
    );

    /* =====================
       CUSTOM CURSOR TRAIL (Optional Enhancement)
    ===================== */
    let cursorDot;
    let cursorOutline;

    function initCustomCursor() {
        cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorDot.style.cssText = `
            width: 8px;
            height: 8px;
            background: var(--green);
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            mix-blend-mode: difference;
            transition: transform 0.15s ease;
        `;

        cursorOutline = document.createElement('div');
        cursorOutline.className = 'cursor-outline';
        cursorOutline.style.cssText = `
            width: 40px;
            height: 40px;
            border: 2px solid var(--green);
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.15s ease;
            mix-blend-mode: difference;
        `;

        // Only add on larger screens
        if (window.innerWidth > 768) {
            document.body.appendChild(cursorDot);
            document.body.appendChild(cursorOutline);

            document.addEventListener('mousemove', (e) => {
                cursorDot.style.left = e.clientX + 'px';
                cursorDot.style.top = e.clientY + 'px';

                cursorOutline.style.left = (e.clientX - 20) + 'px';
                cursorOutline.style.top = (e.clientY - 20) + 'px';
            });

            // Scale cursor on link hover
            const links = document.querySelectorAll('a, button');
            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    cursorDot.style.transform = 'scale(1.5)';
                    cursorOutline.style.transform = 'scale(1.5)';
                });

                link.addEventListener('mouseleave', () => {
                    cursorDot.style.transform = 'scale(1)';
                    cursorOutline.style.transform = 'scale(1)';
                });
            });
        }
    }

    // Uncomment to enable custom cursor
    // initCustomCursor();

});