import { currentLanguage } from "../../lang/translations.config.js";
import translations from "../../lang/translations.json" with { type: "json" };
import { getThemeMode, setThemeMode } from "../../utils/storage.js";
import { ICONS_URL } from "../../utils/assets.js";

let currentMode = "dark";

function applyTheme(mode) {
  currentMode = mode;

  /* El portafolio aplica `.dark`/`.light` en <body>; la enciclopedia lo
     aplica en <html> para evitar el parpadeo. Se actualizan ambos nodos para
     que el tema quede siempre sincronizado, se abra donde se abra. */
  const isDark = mode === "dark";

  for (const node of [document.documentElement, document.body].filter(Boolean)) {
    node.classList.toggle("dark", isDark);
    node.classList.toggle("light", !isDark);
  }

  const switchInput = document.querySelector(".switch-input");
  if (switchInput) {
    switchInput.checked = mode === "dark";
    switchInput.setAttribute("aria-checked", String(mode === "dark"));
  }

  const modeIcon = document.querySelector(".mode-icon");
  if (modeIcon) {
    modeIcon.src = ICONS_URL + (mode === "dark" ? "dark_mode.svg" : "light_mode.svg");
  }

  updateModeText();

  setThemeMode(mode);
}

function toggleMode() {
  const nextMode = currentMode === "dark" ? "light" : "dark";

  applyTheme(nextMode);
}

export function updateModeText() {
  const lang = currentLanguage;
  const modeText = document.querySelector(".mode-label");

  if (modeText) {
    modeText.textContent = translations.page[lang][currentMode];
  }
}

export default function themeMode() {
  document.addEventListener("change", (event) => {
    if (event.target.closest(".switch-input")) {
      toggleMode();
    }
  });

  applyTheme(getThemeMode());
}
