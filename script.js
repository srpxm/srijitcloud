const headline = "SRIJIT PAL";
const subtitle = "I create backend-driven products with a sharp visual voice and serious engineering depth.";
const typingTarget = document.getElementById("typing");
const subtitleTarget = document.getElementById("typing1");
const topBtn = document.getElementById("topBtn");
const sections = document.querySelectorAll(".section");
const toggle = document.getElementById("theme-toggle");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-links a");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

let headIndex = 0;
let subIndex = 0;

function typeHeadline() {
    if (headIndex < headline.length) {
        typingTarget.textContent += headline.charAt(headIndex);
        headIndex += 1;
        setTimeout(typeHeadline, 70);
        return;
    }

    typeSubtitle();
}

function typeSubtitle() {
    if (subIndex < subtitle.length) {
        subtitleTarget.textContent += subtitle.charAt(subIndex);
        subIndex += 1;
        setTimeout(typeSubtitle, 24);
    }
}

function revealSections() {
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 120) {
            section.classList.add("show");
        }
    });
}

function syncTopButton() {
    topBtn.style.display = window.scrollY > 320 ? "block" : "none";
}

function closeMenu() {
    navMenu.classList.remove("open");
    navMenu.dataset.open = "false";
    navToggle.setAttribute("aria-expanded", "false");
}

function toggleTheme(forceLight) {
    const isLight = typeof forceLight === "boolean" ? forceLight : !document.body.classList.contains("light-mode");
    document.body.classList.toggle("light-mode", isLight);
    toggle.textContent = isLight ? "Dark" : "Light";
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
}

function initializeTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
        toggleTheme(savedTheme === "light");
        return;
    }

    toggleTheme(prefersLight.matches);
}

window.addEventListener("load", () => {
    initializeTheme();
    typeHeadline();
    revealSections();
    syncTopButton();
});

window.addEventListener("scroll", () => {
    revealSections();
    syncTopButton();
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

toggle.addEventListener("click", () => {
    const shouldUseLight = !document.body.classList.contains("light-mode");
    toggleTheme(shouldUseLight);
});

navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navMenu.dataset.open = isOpen ? "true" : "false";
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

prefersLight.addEventListener("change", (event) => {
    if (!localStorage.getItem("portfolio-theme")) {
        toggleTheme(event.matches);
    }
});
