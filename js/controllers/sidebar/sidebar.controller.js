import themeMode from "./fnThemeMode.js";
import themeColor from "./fnThemeColor.js";
import backgroundTheme from "./fnBackgroundTheme.js";
import fontSize from "./fnFontScale.js";
import sectionLanguage from "./fnChangeLanguage.js";
import sectionNav from "./fnSectionNav.js";
import { openSettingsModal } from "../settings/settings.controller.js";

export default function SidebarController() {
  const overlay = document.querySelector(".sidebar-overlay");
  const sidebar = document.querySelector(".sidebar");
  const openButton = document.querySelector(".navbar .btn");
  const closeButton = document.querySelector(".sidebar-header .btn-close");
  const expandToggle = sidebar?.querySelector(".sidebar-expand");
  const submenu = sidebar?.querySelector(".sidebar-submenu");

  function setSubmenuOpen(isOpen) {
    if (!expandToggle || !submenu) return;

    submenu.classList.toggle("is-open", isOpen);
    expandToggle.setAttribute("aria-expanded", String(isOpen));
  }

  function setBackgroundInert(inert) {
    document.querySelectorAll('.navbar, .main-layout, .main-content, .footer, .modal-dialog')
      .forEach((element) => {
        element.inert = inert;
      });
  }

  function openMenu() {
    if (!sidebar || !overlay) return;

    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    openButton?.setAttribute("aria-expanded", "true");

    if (submenu?.querySelector(".sidebar-item.active")) {
      setSubmenuOpen(true);
    }

    setBackgroundInert(true);
    closeButton?.focus();
  }

  function closeMenu() {
    if (!sidebar || !overlay) return;

    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    openButton?.setAttribute("aria-expanded", "false");
    setBackgroundInert(false);

    if (sidebar?.contains(document.activeElement)) {
      openButton?.focus();
    }
  }

  openButton?.addEventListener("click", openMenu);

  closeButton?.addEventListener("click", closeMenu);

  overlay?.addEventListener("click", closeMenu);

  expandToggle?.addEventListener("click", () => {
    setSubmenuOpen(!submenu?.classList.contains("is-open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebar?.classList.contains("active")) {
      closeMenu();
    }
  });

  sidebar?.querySelectorAll(".sidebar-item[data-target]").forEach((item) => {
    item.addEventListener("click", () => {
      const target = document.getElementById(item.dataset.target);

      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    });
  });

  /* Los items que navegan a otra página (p. ej. "Mis estudios") cierran el menú. */
  sidebar?.querySelectorAll(".sidebar-item[href]").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  sidebar?.querySelector(".btn-settings")?.addEventListener("click", () => {
    closeMenu();
    openSettingsModal();
  });

  /* section navigation (scrollspy) */
  sectionNav();

  /* language */
  sectionLanguage();

  /* theme mode */
  themeMode();

  /* theme color */
  themeColor();

  /* background theme (gradients) */
  backgroundTheme();

  /* font size */
  fontSize();
}
