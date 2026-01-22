document.addEventListener("DOMContentLoaded", () => {

    /* =====================
       MOBILE MENU
    ===================== */
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    mobileMenu.addEventListener("click", e => {
        e.stopPropagation();
        navLinks.classList.toggle("active");
    });

    document.addEventListener("click", e => {
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
            navLinks.classList.remove("active");
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => navLinks.classList.remove("active"));
    });

    /* =====================
   DARK MODE TOGGLE
==================== */
const toggle = document.createElement("div");
toggle.innerText = "Dark mode";
toggle.style.cursor = "pointer";
toggle.style.marginLeft = "20px";
toggle.style.padding = "10px 14px";
toggle.style.borderRadius = "12px";
toggle.style.background = "rgba(255,255,255,0.6)";
toggle.style.color = "#111827";
toggle.style.fontWeight = "600";
toggle.style.userSelect = "none";

const nav = document.querySelector("nav");
const navLinksContainer = document.getElementById("nav-links");

function updateToggleUI() {
    if (document.body.classList.contains("dark")) {
        toggle.innerText = "Light mode";
        toggle.style.background = "rgba(99,102,241,0.85)";
        toggle.style.color = "#fff";
    } else {
        toggle.innerText = "Dark mode";
        toggle.style.background = "rgba(255,255,255,0.6)";
        toggle.style.color = "#111827";
    }
}

function placeDarkToggle() {
    if (window.innerWidth <= 768) {
        if (!navLinksContainer.contains(toggle)) {
            navLinksContainer.appendChild(toggle);
        }
    } else {
        if (!nav.contains(toggle)) {
            nav.appendChild(toggle);
        }
    }
}

// Initial placement
placeDarkToggle();

// Re-position on resize
window.addEventListener("resize", placeDarkToggle);

// Toggle dark mode
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
    updateToggleUI();
});

// Initial UI update
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}
updateToggleUI();


    /* =====================
       SCROLL SPY
    ===================== */
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop - 150) {
                current = sec.getAttribute("id");
            }
        });

        links.forEach(a => {
            a.classList.remove("active");
            if (a.getAttribute("href") === `#${current}`) {
                a.classList.add("active");
            }
        });
    });

    /* =====================
   BACK TO TOP
==================== */
const backTop = document.createElement("div");
backTop.id = "backToTop";
backTop.innerHTML = "⬆️";

backTop.style.position = "fixed";
backTop.style.bottom = "30px";
backTop.style.right = "30px";
backTop.style.display = "none";
backTop.style.background = "linear-gradient(135deg, #6366f1, #7c83ff)";
backTop.style.color = "#fff";
backTop.style.padding = "12px 14px";
backTop.style.borderRadius = "50%";
backTop.style.cursor = "pointer";
backTop.style.boxShadow = "0 10px 20px rgba(99,102,241,0.3)";
backTop.style.transition = "transform 0.3s ease, opacity 0.3s ease";
backTop.style.zIndex = "999";

document.body.appendChild(backTop);

window.addEventListener("scroll", () => {
    backTop.style.display = scrollY > 400 ? "block" : "none";
});

backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

backTop.addEventListener("mouseenter", () => {
    backTop.style.transform = "translateY(-3px)";
});

backTop.addEventListener("mouseleave", () => {
    backTop.style.transform = "translateY(0)";
});


   /* =====================
   RESUME MODAL
===================== */
const modal = document.createElement("div");
modal.id = "resumeModal";
modal.style.display = "none";
modal.style.alignItems = "center";
modal.style.justifyContent = "center";
modal.style.animation = "fadeIn 0.3s ease";

modal.innerHTML = `
    <div class="modal-box">
        <div class="modal-header">
            <h3>My Resume</h3>
            <button class="modal-close">✕</button>
        </div>
        <iframe src="/static/Sanjay_Resume.pdf#zoom=page-width"></iframe>
    </div>
`;

document.body.appendChild(modal);

// Preview Button
const previewBtn = document.querySelector(".preview-btn");

if (previewBtn) {
    previewBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
}

// Close when clicking outside
modal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Prevent close on modal click
modal.querySelector(".modal-box").addEventListener("click", (e) => {
    e.stopPropagation();
});

// Close button
modal.querySelector(".modal-close").addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});


    /* =====================
       AOS
    ===================== */
    if (typeof AOS !== "undefined") {
        AOS.init({ duration: 800, once: true });
    }
});

/* =====================
   FIX MENU ON ROTATION
===================== */
window.addEventListener("orientationchange", () => {
    const navLinks = document.getElementById("nav-links");
    if (navLinks) {
        navLinks.classList.remove("active");
    }
});

