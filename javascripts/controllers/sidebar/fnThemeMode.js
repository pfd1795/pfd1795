import { currentLanguage } from "../../lang/translations.config.js";
import translations from "../../lang/translations.json" with { type: "json" };
import { getThemeMode, setThemeMode } from "../../utils/storage.js";

let currentMode = "dark";

function applyTheme(mode) {
  currentMode = mode;

  document.body.classList.toggle("dark", mode === "dark");
  document.body.classList.toggle("light", mode === "light");

  const modeToggle = document.querySelector(".toggle-switch");
  const modeIcon = document.querySelector(".toggle-slider img");

  modeToggle?.classList.toggle("active", mode === "light");

  if (modeIcon) {
    modeIcon.src = "./assets/icons/" + (mode === "dark" ? "dark_mode.svg" : "light_mode.svg");
  }

  updateModeText(mode);

  setThemeMode(mode);
}

function toggleMode() {
  const nextMode = currentMode === "dark" ? "light" : "dark";

  applyTheme(nextMode);
}

export function updateModeText(mode) {
  const lang = currentLanguage;
  const modeText = document.querySelector(".theme-mode-toggle .theme-label");

  if (modeText) {
    modeText.textContent = translations.page[lang][mode];
  }
}

export default function themeMode() {
  const modeToggle = document.querySelector(".toggle-switch");
  
  modeToggle?.addEventListener("click", toggleMode);

  const savedMode = getThemeMode();

  applyTheme(savedMode);
}
