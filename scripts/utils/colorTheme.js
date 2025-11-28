// Elementos del DOM
const openMenuBtn = document.getElementById("openMenuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const settingsHeader = document.getElementById("settingsHeader");
const settingsContent = document.getElementById("settingsContent");
const settingsArrow = document.getElementById("settingsArrow");
const navLinks = document.querySelectorAll(".nav-link");
const colorOptions = document.querySelectorAll(".color-option");

// Estado del menú
let isMenuOpen = false;
let isSettingsOpen = false;

// Colores del tema
const themeColors = {
    blue: "#3b82f6",
    green: "#10b981",
    orange: "#f59e0b",
    red: "#ef4444",
    purple: "#8b5cf6",
    pink: "#ec4899"
};

let currentTheme = "blue";

function openMenu() {
    isMenuOpen = true;
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        sidebar.focus();
    }, 100);
}

function closeMenu() {
    isMenuOpen = false;
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
    openMenuBtn.focus();
}

function toggleSettings() {
    isSettingsOpen = !isSettingsOpen;

    if (isSettingsOpen) {
        settingsContent.classList.add("open");
        settingsArrow.style.transform = "rotate(180deg)";
    } else {
        settingsContent.classList.remove("open");
        settingsArrow.style.transform = "rotate(0deg)";
    }
}

function setActivePage(page) {
    navLinks.forEach(link => {
        if (link.dataset.page === page) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Guardar en localStorage
    localStorage.setItem("currentPage", page);
}

function changeTheme(color) {
    if (!themeColors[color]) return;

    currentTheme = color;
    const themeColor = themeColors[color];

    // Actualizar colores en el CSS
    document.documentElement.style.setProperty("--theme-color", themeColor);

    // Actualizar elementos que usan el color del tema
    const themedElements = document.querySelectorAll(".menu-button, .sidebar, .sidebar-header, .settings-header, .nav-link.active");
    themedElements.forEach(el => {
        if (el.classList.contains("nav-link")) {
            el.style.backgroundColor = el.classList.contains("active") ? themeColor : "";
        } else if (el.classList.contains("sidebar") || el.classList.contains("sidebar-header") || el.classList.contains("settings-header")) {
            el.style.borderColor = themeColor;
        } else {
            el.style.backgroundColor = themeColor;
        }
    });

    // Actualizar selección de colores
    colorOptions.forEach(option => {
        if (option.dataset.color === color) {
            option.classList.add("selected");
        } else {
            option.classList.remove("selected");
        }
    });

    // Guardar en localStorage
    localStorage.setItem("themeColor", color);
}

export default function controllerNavbar() {
    const savedPage = localStorage.getItem("currentPage") || "home";
    const savedTheme = localStorage.getItem("themeColor") || "blue";

    setActivePage(savedPage);
    changeTheme(savedTheme);

    openMenuBtn.addEventListener("click", openMenu);
    closeMenuBtn.addEventListener("click", closeMenu);
    sidebarOverlay.addEventListener("click", closeMenu);
    settingsHeader.addEventListener("click", toggleSettings);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isMenuOpen) {
            closeMenu();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            // e.preventDefault();
            const page = link.dataset.page;
            setActivePage(page);
            closeMenu();

            console.log("Navegando a:", page);
        });
    });

    colorOptions.forEach(option => {
        option.addEventListener("click", () => {
            const color = option.dataset.color;
            changeTheme(color);
        });
    });
};