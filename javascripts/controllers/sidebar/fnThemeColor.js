const savedColor = localStorage.getItem('theme-color') || 'blue';
const savedColorValue = localStorage.getItem('theme-color-value') || '#3b82f6';
const colorOptions = document.querySelectorAll('.color-option');

function changeColor(color, colorValue) {
  document.documentElement.style.setProperty('--theme-color', colorValue);

  colorOptions.forEach(option => {
    const htmlOption = option;
    if (htmlOption.dataset.color === color) {
      option.classList.add('selected');
    } else {
      option.classList.remove('selected');
    }
  });

  localStorage.setItem('theme-color', color);
  localStorage.setItem('theme-color-value', colorValue);
}

export default function themeColor() {
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      const htmlOption = option;
      const color = htmlOption.dataset.color || 'blue';
      const colorValue = htmlOption.dataset.value || '#3b82f6';
      changeColor(color, colorValue);
    });
  });

  changeColor(savedColor, savedColorValue);
}