const STORAGE_KEY_THEME_MODE = 'theme-mode';
const STORAGE_KEY_THEME_COLOR = 'theme-color';
const STORAGE_KEY_THEME_COLOR_VALUE = 'theme-color-value';
const STORAGE_KEY_THEME_BACKGROUND = 'theme-background';
const STORAGE_KEY_GRADIENT_DIRECTION = 'gradient-direction';
const STORAGE_KEY_PSYCHEDELIC_SPEED = 'psychedelic-speed';
const STORAGE_KEY_FONT_SCALE = 'font-scale';
const STORAGE_KEY_LANGUAGE = 'language';

function getStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ?? defaultValue;
  } catch (error) {
    console.warn('Error accessing localStorage:', error);
    return defaultValue;
  }
}

function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn('Error saving to localStorage:', error);
    return false;
  }
}

export function getThemeMode() {
  return getStorageItem(STORAGE_KEY_THEME_MODE, 'dark');
}

export function setThemeMode(mode) {
  return setStorageItem(STORAGE_KEY_THEME_MODE, mode);
}

export function getThemeColor() {
  const color = getStorageItem(STORAGE_KEY_THEME_COLOR, 'blue');
  const value = getStorageItem(STORAGE_KEY_THEME_COLOR_VALUE, 'hsl(210 75% 28%)');
  return { color, value };
}

export function setThemeColor(color, value) {
  const successColor = setStorageItem(STORAGE_KEY_THEME_COLOR, color);
  const successValue = setStorageItem(STORAGE_KEY_THEME_COLOR_VALUE, value);
  return successColor && successValue;
}

export function getThemeBackground() {
  return getStorageItem(STORAGE_KEY_THEME_BACKGROUND, 'default');
}

export function setThemeBackground(background) {
  return setStorageItem(STORAGE_KEY_THEME_BACKGROUND, background);
}

export function getGradientDirection() {
  return getStorageItem(STORAGE_KEY_GRADIENT_DIRECTION, 'topToBottom');
}

export function setGradientDirection(direction) {
  return setStorageItem(STORAGE_KEY_GRADIENT_DIRECTION, direction);
}

export function getPsychedelicSpeed() {
  return getStorageItem(STORAGE_KEY_PSYCHEDELIC_SPEED, 'normal');
}

export function setPsychedelicSpeed(speed) {
  return setStorageItem(STORAGE_KEY_PSYCHEDELIC_SPEED, speed);
}

export function getFontScale() {
  const value = parseFloat(getStorageItem(STORAGE_KEY_FONT_SCALE, '1'));

  return Number.isFinite(value) ? value : 1;
}

export function setFontScale(scale) {
  return setStorageItem(STORAGE_KEY_FONT_SCALE, String(scale));
}

export function getLanguage() {
  return getStorageItem(STORAGE_KEY_LANGUAGE, 'es');
}

export function setLanguage(lang) {
  return setStorageItem(STORAGE_KEY_LANGUAGE, lang);
}

export {
  STORAGE_KEY_THEME_MODE,
  STORAGE_KEY_THEME_COLOR,
  STORAGE_KEY_THEME_COLOR_VALUE,
  STORAGE_KEY_THEME_BACKGROUND,
  STORAGE_KEY_GRADIENT_DIRECTION,
  STORAGE_KEY_PSYCHEDELIC_SPEED,
  STORAGE_KEY_FONT_SCALE,
  STORAGE_KEY_LANGUAGE,
  getStorageItem,
  setStorageItem
};
