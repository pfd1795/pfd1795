import themeMode from "./fnThemeMode.js";
// import sectionLanguage from "./fnChangeLanguage.js";
import themeColor from "./fnThemeColor.js";

const overlay = document.querySelector(".sidebar-overlay");
const sidebar = document.querySelector(".sidebar");

function openMenu() {
  if (sidebar && overlay) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeMenu() {
  if (sidebar && overlay) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

export default function SidebarController() {
  document.querySelector(".navbar .btn")?.addEventListener("click", openMenu);

  document.querySelector(".sidebar-header .btn")?.addEventListener("click", closeMenu);

  overlay?.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar?.classList.contains("active")) {
      closeMenu();
    }
  });

  /* language */
  // sectionLanguage();

  /* theme mode */
  themeMode();

  /* theme color */
  themeColor();
}