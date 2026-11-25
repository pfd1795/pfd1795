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

function esColorValido(valor) {
  return Boolean(valor) && Boolean(window.CSS) && CSS.supports("color", valor);
}

function derivarSoft(valor, nombre) {
  const definicion = getThemeColorDef(nombre);

  if (String(valor).trim().toLowerCase() === definicion.value.toLowerCase()) {
    return definicion.soft;
  }

  const mezcla = `color-mix(in srgb, ${valor} 30%, white)`;

  return esColorValido(mezcla) ? mezcla : null;
}

function aplicarAcento(valorGuardado, nombre) {
  const root = document.documentElement;
  const definicion = getThemeColorDef(nombre);
  const valor = esColorValido(valorGuardado) ? valorGuardado : definicion.value;
  const soft = derivarSoft(valor, nombre);

  root.style.setProperty("--theme-color", valor);

  if (soft) {
    root.style.setProperty("--theme-color-soft", soft);
  }

  markSelected(definicion.color);
}

function changeColor(color, { persist = true } = {}) {
  const themeColor = getThemeColorDef(color);

  aplicarAcento(themeColor.value, themeColor.color);

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

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY_THEME_COLOR &&
        event.key !== STORAGE_KEY_THEME_COLOR_VALUE &&
        event.key !== null) return;

    const guardado = getThemeColor();

    aplicarAcento(guardado.value, guardado.color);
  });

  const guardado = getThemeColor();

  aplicarAcento(guardado.value, guardado.color);
}
