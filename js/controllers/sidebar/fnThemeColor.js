import {
  getThemeColor,
  setThemeColor,
  STORAGE_KEY_THEME_COLOR,
  STORAGE_KEY_THEME_COLOR_VALUE
} from "../../utils/storage.js";
import { getThemeColorDef } from "../../utils/themeColors.js";

function markSelected(color) {
  const colorOptions = document.querySelectorAll(".color-option");

  colorOptions.forEach((option) => {
    const isSelected = option.dataset.color === color;

    option.classList.toggle("selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });
}

function changeColor(color, { persist = true } = {}) {
  const themeColor = getThemeColorDef(color);
  const root = document.documentElement;

  root.style.setProperty("--theme-color", themeColor.value);
  root.style.setProperty("--theme-color-soft", themeColor.soft);

  markSelected(themeColor.color);

  /* En el arranque y en la sincronización entre pestañas no se reescribe:
     el valor ya está guardado (o lo acaba de escribir la otra pestaña). */
  if (persist) {
    setThemeColor(themeColor.color, themeColor.value);
  }
}

export default function themeColor() {
  document.addEventListener("click", (event) => {
    const option = event.target.closest(".color-option");

    if (!option) return;

    changeColor(option.dataset.color || "blue");
  });

  /* Sincronización entre pestañas: si otra cambia el acento, se repinta el
     swatch seleccionado sin volver a escribir localStorage. */
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY_THEME_COLOR && event.key !== STORAGE_KEY_THEME_COLOR_VALUE) return;
    changeColor(getThemeColor().color, { persist: false });
  });

  changeColor(getThemeColor().color, { persist: false });
}
