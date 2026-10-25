import { getThemeColor, setThemeColor } from "../../utils/storage.js";
import { getThemeColorDef } from "../../utils/themeColors.js";

function markSelected(color) {
  const colorOptions = document.querySelectorAll(".color-option");

  colorOptions.forEach((option) => {
    const isSelected = option.dataset.color === color;

    option.classList.toggle("selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });
}

function changeColor(color) {
  const themeColor = getThemeColorDef(color);
  const root = document.documentElement;

  root.style.setProperty("--theme-color", themeColor.value);
  root.style.setProperty("--theme-color-soft", themeColor.soft);

  markSelected(themeColor.color);

  setThemeColor(themeColor.color, themeColor.value);
}

export default function themeColor() {
  document.addEventListener("click", (event) => {
    const option = event.target.closest(".color-option");

    if (!option) return;

    changeColor(option.dataset.color || "blue");
  });

  changeColor(getThemeColor().color);
}
