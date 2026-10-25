import {
  getThemeBackground,
  setThemeBackground,
  getGradientDirection,
  setGradientDirection,
  getPsychedelicSpeed,
  setPsychedelicSpeed,
  STORAGE_KEY_THEME_BACKGROUND,
  STORAGE_KEY_GRADIENT_DIRECTION,
  STORAGE_KEY_PSYCHEDELIC_SPEED
} from "../../utils/storage.js";
import {
  getPageThemeStyles,
  isBackgroundTheme,
  isGradientDirection,
  isPsychedelicSpeed,
  DEFAULT_BACKGROUND_THEME,
  DEFAULT_GRADIENT_DIRECTION,
  DEFAULT_PSYCHEDELIC_SPEED
} from "../../utils/themeBackgrounds.js";

function applyTheme(theme, direction, speed) {
  const styles = getPageThemeStyles(theme, direction, speed);
  const root = document.documentElement;

  root.classList.toggle("has-page-theme", theme !== "default");
  root.style.setProperty("--page-background", styles.background);
  root.style.setProperty("--page-gradient", styles.gradient ?? "none");
  root.style.setProperty("--page-background-size", styles.backgroundSize);
  root.style.setProperty("--page-background-repeat", styles.backgroundRepeat);
  root.style.setProperty("--page-animation", styles.animation);
}

function markSelected(selector, attribute, value) {
  document.querySelectorAll(selector).forEach((option) => {
    const isSelected = option.getAttribute(attribute) === value;

    option.classList.toggle("selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });
}

/* La fila de dirección solo aplica a temas con degradado lineal/radial y la
   de velocidad solo al tema multicolor (misma lógica que fortunista). */
function syncConditionalRows(theme) {
  const directionRow = document.querySelector(".settings-row--direction");
  const speedRow = document.querySelector(".settings-row--speed");

  directionRow?.classList.toggle("is-hidden", theme === "default" || theme === "multicolor");
  speedRow?.classList.toggle("is-hidden", theme !== "multicolor");
}

function normalizeTheme(value) {
  return isBackgroundTheme(value) ? value : DEFAULT_BACKGROUND_THEME;
}

function normalizeDirection(value) {
  return isGradientDirection(value) ? value : DEFAULT_GRADIENT_DIRECTION;
}

function normalizeSpeed(value) {
  return isPsychedelicSpeed(value) ? value : DEFAULT_PSYCHEDELIC_SPEED;
}

export default function backgroundTheme() {
  let theme = normalizeTheme(getThemeBackground());
  let direction = normalizeDirection(getGradientDirection());
  let speed = normalizeSpeed(getPsychedelicSpeed());

  applyTheme(theme, direction, speed);

  document.addEventListener("click", (event) => {
    const themeOption = event.target.closest(".theme-option");

    if (themeOption) {
      const next = themeOption.dataset.theme;

      if (!isBackgroundTheme(next) || next === theme) return;

      theme = next;
      setThemeBackground(theme);
      applyTheme(theme, direction, speed);
      markSelected(".theme-option", "data-theme", theme);
      syncConditionalRows(theme);
      return;
    }

    const directionOption = event.target.closest(".direction-option");

    if (directionOption) {
      const next = directionOption.dataset.direction;

      if (!isGradientDirection(next) || next === direction) return;

      direction = next;
      setGradientDirection(direction);
      applyTheme(theme, direction, speed);
      markSelected(".direction-option", "data-direction", direction);
      return;
    }

    const speedOption = event.target.closest(".speed-option");

    if (speedOption) {
      const next = speedOption.dataset.speed;

      if (!isPsychedelicSpeed(next) || next === speed) return;

      speed = next;
      setPsychedelicSpeed(speed);
      applyTheme(theme, direction, speed);
      markSelected(".speed-option", "data-speed", speed);
    }
  });

  /* Sincroniza el estado local y los anillos de selección cuando el tema se
     cambia en otra pestaña. El CSS ya lo actualizan theme-init.js/tema.js con
     su propio listener; aquí no se vuelve a escribir en localStorage. */
  window.addEventListener("storage", (event) => {
    let changed = false;

    if (event.key === STORAGE_KEY_THEME_BACKGROUND || event.key === null) {
      const nextTheme = normalizeTheme(getThemeBackground());

      if (nextTheme !== theme) {
        theme = nextTheme;
        changed = true;
      }
    }

    if (event.key === STORAGE_KEY_GRADIENT_DIRECTION || event.key === null) {
      const nextDirection = normalizeDirection(getGradientDirection());

      if (nextDirection !== direction) {
        direction = nextDirection;
        changed = true;
      }
    }

    if (event.key === STORAGE_KEY_PSYCHEDELIC_SPEED || event.key === null) {
      const nextSpeed = normalizeSpeed(getPsychedelicSpeed());

      if (nextSpeed !== speed) {
        speed = nextSpeed;
        changed = true;
      }
    }

    if (!changed) return;

    applyTheme(theme, direction, speed);
    markSelected(".theme-option", "data-theme", theme);
    markSelected(".direction-option", "data-direction", direction);
    markSelected(".speed-option", "data-speed", speed);
    syncConditionalRows(theme);
  });
}
