document.addEventListener("DOMContentLoaded", () => {

    /* =====================
       LOADING SCREEN & INITIAL ANIMATIONS
    ===================== */
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');

        setTimeout(function() {
            loader.classList.add('hidden');
            setTimeout(function() {
                animateOnLoad();
            }, 100);
        }, 2500);
    });

    function animateOnLoad() {
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.classList.add('appear');

        const fixedEmail = document.querySelector('.fixed-email');
        const fixedSocial = document.querySelector('.fixed-social');
        if (fixedEmail) fixedEmail.classList.add('appear');
        if (fixedSocial) fixedSocial.classList.add('appear');

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
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeUpElements = document.querySelectorAll('.section .fade-up');
    fadeUpElements.forEach(element => {
        observer.observe(element);
    });

    /* =====================
       TAB SWITCHER
    ===================== */
    (function initTabs() {
        const tabButtons  = document.querySelectorAll('.tab-btn');
        const tabPanels   = document.querySelectorAll('.tab-panel');
        const indicator   = document.querySelector('.tab-indicator');

        if (!tabButtons.length || !indicator) return;

        // Position indicator to match the currently-active button
        function moveIndicator(btn) {
            const nav  = btn.closest('.tab-nav');
            const isHorizontal = getComputedStyle(nav).flexDirection === 'row';

            if (isHorizontal) {
                // mobile horizontal rail — move left
                indicator.style.left   = btn.offsetLeft + 'px';
                indicator.style.top    = '';
            } else {
                // desktop vertical rail — move top
                indicator.style.top    = btn.offsetTop + 'px';
                indicator.style.left   = '';
            }
        }

        // Set initial indicator position on the active tab
        const activeBtn = document.querySelector('.tab-btn.active');
        if (activeBtn) moveIndicator(activeBtn);

        // Also reposition on resize (vertical ↔ horizontal switch)
        window.addEventListener('resize', () => {
            const current = document.querySelector('.tab-btn.active');
            if (current) moveIndicator(current);
        });

        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;

                // Update active button
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update active panel
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === 'tab-panel-' + target) {
                        panel.classList.add('active');
                    }
                });

                // Slide indicator
                moveIndicator(btn);
            });
        });
    })();

    /* =====================
       MOBILE MENU
    ===================== */
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks   = document.getElementById("nav-links");

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
                navLinks.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.style.overflow = '';
            }
        });

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
    let ticking = false;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
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
       SCROLL SPY
    ===================== */
    const sections = document.querySelectorAll("section[id]");
    const navItems  = document.querySelectorAll(".nav-links a[href^='#']");

    function updateActiveNavLink() {
        let current = "";
        sections.forEach(section => {
            if (scrollY >= (section.offsetTop - 200)) {
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
       SMOOTH SCROLL
    ===================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =====================
       BLUR NAVBAR ON SCROLL
    ===================== */
    function applyNavbarBlur() {
        if (window.scrollY > 0) {
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
       PROJECT CARD TILT
    ===================== */
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const rotateX = (e.clientY - rect.top  - rect.height / 2) / 20;
            const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* =====================
       CERTIFICATE MODAL
    ===================== */
    // Make openModal and closeModal globally accessible
    window.openModal = function(certId) {
        const modal = document.getElementById('certModal');
        const modalImg = document.getElementById('modalImage');

        if (!modal || !modalImg) return;

        // Get the certificate image from the card
        const certCard = document.getElementById(certId);
        if (!certCard) return;

        const certImage = certCard.querySelector('.cert-preview-img img');
        if (!certImage) return;

        // Set modal image source to the certificate image
        modalImg.src = certImage.src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        const modal = document.getElementById('certModal');
        if (!modal) return;

        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('certModal');
            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
        }
    });

    // Close modal when clicking outside the image
    const certModal = document.getElementById('certModal');
    if (certModal) {
        certModal.addEventListener('click', function(e) {
            if (e.target === certModal) {
                closeModal();
            }
        });
    }

    /* =====================
       KEYBOARD NAV
    ===================== */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /* =====================
       ORIENTATION CHANGE
    ===================== */
    window.addEventListener("orientationchange", () => {
        if (navLinks)   navLinks.classList.remove("active");
        if (mobileMenu) mobileMenu.classList.remove("active");
        document.body.style.overflow = '';
    });

    /* =====================
       FOCUS VISIBLE HELPERS
    ===================== */
    document.body.addEventListener('mousedown', () => document.body.classList.add('using-mouse'));
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') document.body.classList.remove('using-mouse');
    });

    /* =====================
       PREVENT LAYOUT SHIFT
    ===================== */
    document.querySelectorAll('.section').forEach(section => {
        if (!section.style.minHeight) section.style.minHeight = '200px';
    });

    /* =====================
       PRELOAD CRITICAL IMAGES
    ===================== */
    document.querySelectorAll('img[src*="static"]').forEach(img => {
        const pre = new Image();
        pre.src = img.src;
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

});