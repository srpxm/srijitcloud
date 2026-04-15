const headline = "SRIJIT PAL";
const subtitle = "I bridge the gap between rigorous computer science fundamentals and highly polished user experiences.";
const typingTarget = document.getElementById("typing");
const subtitleTarget = document.getElementById("typing1");
const topBtn = document.getElementById("topBtn");
const sections = document.querySelectorAll(".section");
const toggle = document.getElementById("theme-toggle");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-links a");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const caseStudyButtons = document.querySelectorAll(".case-study-btn");
const modal = document.getElementById("case-study-modal");
const modalClose = document.getElementById("case-study-close");
const statusWidget = document.getElementById("status-widget");
const statusRefresh = document.getElementById("status-refresh");
const statusValue = document.getElementById("status-value");
const statusDetail = document.getElementById("status-detail");
const statusChip = document.getElementById("status-chip");
const statusMeta = document.getElementById("status-meta");

const caseStudies = {
    ums: {
        title: "University Management System",
        summary: "An end-to-end academic operations platform covering student, faculty, and administrative workflows with role-based dashboards and structured backend services.",
        stack: ["Django", "REST API", "PostgreSQL", "Responsive UI"],
        frontend: [
            "Designed dense dashboard layouts that remain readable on laptops, tablets, and smaller screens.",
            "Built role-aware screens so students, faculty, and admins only see actions relevant to their workflow.",
            "Handled tables, forms, and data-heavy modules without sacrificing responsiveness or visual clarity."
        ],
        backend: [
            "Modeled students, courses, enrollments, attendance, and grading around relational consistency in PostgreSQL.",
            "Built Django REST endpoints for role-based permissions, validation, and secure administrative actions.",
            "Optimized high-volume list and reporting endpoints with pagination, scoped queries, and lean serializers."
        ],
        outcomes: [
            "Unified the UI and schema around the same domain model, reducing disconnect between design and implementation.",
            "Created a maintainable backend base for adding future academic modules without rewriting the interface.",
            "Demonstrated both product polish and engineering discipline in the same project."
        ]
    },
    commerce: {
        title: "E-commerce Platform",
        summary: "A multi-vendor marketplace built for artisan discovery, product management, and reliable order flows, combining clean storefront UX with backend structure built to scale.",
        stack: ["Django", "REST API", "Catalog Search", "Frontend UX"],
        frontend: [
            "Structured browsing, search, and product presentation around quick scanning and trust-building visuals.",
            "Designed flexible listing and checkout flows that remain intuitive across desktop and mobile layouts.",
            "Balanced storefront polish with vendor-focused management interfaces and clear interaction states."
        ],
        backend: [
            "Designed product, vendor, inventory, and order models to support marketplace workflows without data ambiguity.",
            "Exposed REST endpoints for product discovery, vendor operations, and transaction-safe order handling.",
            "Planned search, filtering, and catalog reads around performance, query discipline, and predictable API contracts."
        ],
        outcomes: [
            "Connected marketplace UX decisions directly to backend rules, inventory logic, and search behavior.",
            "Created a codebase where product growth does not force architectural compromises later.",
            "Showed the ability to reason about both user conversion and backend maintainability."
        ]
    }
};

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

function setProjectVisibility(card, shouldShow, immediate = false) {
    if (shouldShow) {
        card.hidden = false;
        if (immediate) {
            card.classList.add("is-visible");
            return;
        }

        requestAnimationFrame(() => {
            card.classList.add("is-visible");
        });
        return;
    }

    card.classList.remove("is-visible");
    window.setTimeout(() => {
        if (!card.classList.contains("is-visible")) {
            card.hidden = true;
        }
    }, 220);
}

function applyFilter(filter) {
    filterButtons.forEach((button) => {
        const isActive = button.dataset.filter === filter;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(" ");
        const shouldShow = filter === "all" || tags.includes(filter);
        setProjectVisibility(card, shouldShow);
    });
}

function renderList(target, items) {
    target.innerHTML = "";
    items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        target.appendChild(li);
    });
}

function openCaseStudy(caseStudyKey) {
    const data = caseStudies[caseStudyKey];
    if (!data) {
        return;
    }

    document.getElementById("case-study-title").textContent = data.title;
    document.getElementById("case-study-summary").textContent = data.summary;

    const stackTarget = document.getElementById("case-study-stack");
    stackTarget.innerHTML = "";
    data.stack.forEach((item) => {
        const chip = document.createElement("span");
        chip.textContent = item;
        stackTarget.appendChild(chip);
    });

    renderList(document.getElementById("case-study-frontend"), data.frontend);
    renderList(document.getElementById("case-study-backend"), data.backend);
    renderList(document.getElementById("case-study-outcomes"), data.outcomes);

    modal.hidden = false;
    document.body.classList.add("modal-open");
}

function closeCaseStudy() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
}

function setStatus(state) {
    statusValue.textContent = state.value;
    statusDetail.textContent = state.detail;
    statusChip.textContent = state.chip;
    statusMeta.textContent = state.meta;
}

async function loadStatus() {
    const endpoint = statusWidget.dataset.apiEndpoint.trim();

    if (!endpoint) {
        setStatus({
            value: "API hook ready",
            detail: "Add your custom endpoint to the data-api-endpoint attribute and this widget will fetch live status data without a page reload.",
            chip: "Custom REST API",
            meta: "Waiting for endpoint configuration"
        });
        return;
    }

    setStatus({
        value: "Fetching live status...",
        detail: "Contacting your custom REST API endpoint.",
        chip: "Fetching",
        meta: "Request in progress"
    });

    try {
        const response = await fetch(endpoint, {
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Status endpoint returned ${response.status}`);
        }

        const data = await response.json();
        const value = data.status || data.state || data.currentStatus || data.message || "Live";
        const detail = data.detail || data.description || data.note || "Status powered by my custom REST API.";
        const chip = data.badge || data.source || "API live";
        const updatedAt = data.updatedAt || data.updated_at || data.timestamp;

        setStatus({
            value,
            detail,
            chip,
            meta: updatedAt ? `Updated ${updatedAt}` : "Live data received"
        });
    } catch (error) {
        setStatus({
            value: "API temporarily unavailable",
            detail: "The widget is wired for a live endpoint, but the current request did not succeed. Plug in the final URL or check the service response.",
            chip: "Fetch failed",
            meta: error.message
        });
    }
}

window.addEventListener("load", () => {
    initializeTheme();
    closeCaseStudy();
    typeHeadline();
    revealSections();
    syncTopButton();
    projectCards.forEach((card) => setProjectVisibility(card, true, true));
    loadStatus();
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

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        applyFilter(button.dataset.filter);
    });
});

caseStudyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        openCaseStudy(button.dataset.caseStudy);
    });
});

modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.dataset.close === "modal") {
        closeCaseStudy();
    }
});

modalClose.addEventListener("click", closeCaseStudy);
statusRefresh.addEventListener("click", loadStatus);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
        closeCaseStudy();
    }
});

prefersLight.addEventListener("change", (event) => {
    if (!localStorage.getItem("portfolio-theme")) {
        toggleTheme(event.matches);
    }
});
