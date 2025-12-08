const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

mobileMenu.addEventListener("click", () => {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});
