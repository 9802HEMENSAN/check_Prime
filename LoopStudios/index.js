const hamberger = document.querySelector(".hamberger");
const navmenu = document.querySelector(".nav-menu");

hamberger.addEventListener("click", MobileMenu);

function MobileMenu() {
    hamberger.classList.toggle("active");
    navmenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
