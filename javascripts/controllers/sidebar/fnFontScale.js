import { getFontScale, setFontScale, STORAGE_KEY_FONT_SCALE } from "../../utils/storage.js";
import { FONT_SCALE_OPTIONS, DEFAULT_FONT_SCALE, isFontScale } from "../../utils/themeBackgrounds.js";

function applyScale(scale) {
  document.documentElement.style.setProperty("--font-scale", String(scale));
}

function markSelected(scale) {
  document.querySelectorAll(".font-scale-option").forEach((option) => {
    const isSelected = Number(option.dataset.fontScale) === scale;

    option.classList.toggle("selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });
}

export default function fontSize() {
  let scale = getFontScale();

  if (!isFontScale(scale)) scale = DEFAULT_FONT_SCALE;

  applyScale(scale);

  document.addEventListener("click", (event) => {
    const option = event.target.closest(".font-scale-option");

    if (!option) return;

    const next = Number(option.dataset.fontScale);

    if (!isFontScale(next) || next === scale) return;

    scale = next;
    setFontScale(scale);
    applyScale(scale);
    markSelected(scale);
  });

  /* Refleja en la UI los cambios hechos en otra pestaña. El CSS ya lo aplica
     theme-init.js/tema.js con su propio listener; aquí no se reescribe storage. */
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY_FONT_SCALE && event.key !== null) return;

    const next = getFontScale();
    const normalized = isFontScale(next) ? next : DEFAULT_FONT_SCALE;

    if (normalized === scale) return;

    scale = normalized;
    applyScale(scale);
    markSelected(scale);
  });
}
