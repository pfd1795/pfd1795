import { currentLanguage } from "../../lang/translations.config.js";
import translations from "../../lang/translations.json" with { type: "json" };

const STORAGE_KEY = "theme-mode";

const modeToggle = document.querySelector(".toggle-switch");
const modeText = document.querySelector(".theme-mode-toggle .theme-label");
const modeIcon = document.querySelector(".toggle-slider img");

let currentMode = "dark";

function applyTheme(mode) {
  currentMode = mode;

  document.body.classList.toggle("dark", mode === "dark");
  document.body.classList.toggle("light", mode === "light");

  modeToggle?.classList.toggle("active", mode === "light");

  if (modeIcon) {
    modeIcon.src = "./assets/icons/" + (mode === "dark" ? "dark_mode.svg" : "light_mode.svg");
  }

  updateModeText(mode);

  localStorage.setItem(STORAGE_KEY, mode);
}

function toggleMode() {
  const nextMode = currentMode === "dark" ? "light" : "dark";

  applyTheme(nextMode);
}

export function updateModeText(mode) {
  const lang = currentLanguage;

  if (modeText) {
    modeText.textContent = translations.page[lang][mode];
  }
}

export default function themeMode() {
  modeToggle?.addEventListener("click", toggleMode);

  const savedMode =
    (localStorage.getItem(STORAGE_KEY)) ?? "dark";

  applyTheme(savedMode);
}
