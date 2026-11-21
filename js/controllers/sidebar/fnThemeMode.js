import { currentLanguage } from "../../lang/translations.config.js";
import translations from "../../lang/translations.json" with { type: "json" };
import {
  getThemeMode,
  setThemeMode,
  STORAGE_KEY_THEME_MODE
} from "../../utils/storage.js";
import { ICONS_URL } from "../../utils/assets.js";

let currentMode = "dark";

function applyTheme(mode, { persist = true } = {}) {
  currentMode = mode;

  /* El portafolio aplica `.dark` en <body>; la enciclopedia lo
     aplica en <html> para evitar el parpadeo. Se actualizan ambos nodos para
     que el tema quede siempre sincronizado, se abra donde se abra. */
  const isDark = mode === "dark";

  for (const node of [document.documentElement, document.body].filter(Boolean)) {
    node.classList.toggle("dark", isDark);
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

  /* Si el modo llegó desde el evento storage (otra pestaña) no se reescribe:
     evita un write circular innecesario en localStorage. */
  if (persist) {
    setThemeMode(mode);
  }
}

function toggleMode() {
  const nextMode = currentMode === "dark" ? "light" : "dark";

  applyTheme(nextMode);
}

export function updateModeText() {
  const lang = currentLanguage;
  const modeText = document.querySelector(".mode-label");

  const modeLabel = translations.page?.[lang]?.[currentMode];

  if (modeText && modeLabel !== undefined) {
    modeText.textContent = modeLabel;
  }
}

export default function themeMode() {
  document.addEventListener("change", (event) => {
    if (event.target.closest(".switch-input")) {
      toggleMode();
    }
  });

  /* Sincronización entre pestañas: si otra pestaña cambia el modo, se reaplica
     sobre el <html>/<body> y la UI del modal. event.key === null cubre
     localStorage.clear(), que elimina la clave sin emitir su nombre. */
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY_THEME_MODE && event.key !== null) return;

    const nextMode = getThemeMode();

    if (nextMode === currentMode) return;

    applyTheme(nextMode, { persist: false });
  });

  applyTheme(getThemeMode(), { persist: false });
}
