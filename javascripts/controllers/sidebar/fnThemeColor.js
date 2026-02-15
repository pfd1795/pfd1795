import { getThemeColor, setThemeColor } from "../../utils/storage.js";

function changeColor(color, colorValue) {
  document.documentElement.style.setProperty('--theme-color', colorValue);

  const colorOptions = document.querySelectorAll('.color-option');
  
  colorOptions.forEach(option => {
    const htmlOption = option;
    if (htmlOption.dataset.color === color) {
      option.classList.add('selected');
    } else {
      option.classList.remove('selected');
    }
  });

  setThemeColor(color, colorValue);
}

export default function themeColor() {
  const colorOptions = document.querySelectorAll('.color-option');
  const savedTheme = getThemeColor();

  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      const htmlOption = option;
      const color = htmlOption.dataset.color || 'blue';
      const colorValue = htmlOption.dataset.value || '#3b82f6';
      changeColor(color, colorValue);
    });
  });

  changeColor(savedTheme.color, savedTheme.value);
}
