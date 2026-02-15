const STORAGE_KEY_THEME_MODE = 'theme-mode';
const STORAGE_KEY_THEME_COLOR = 'theme-color';
const STORAGE_KEY_THEME_COLOR_VALUE = 'theme-color-value';
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
  const value = getStorageItem(STORAGE_KEY_THEME_COLOR_VALUE, '#3b82f6');
  return { color, value };
}

export function setThemeColor(color, value) {
  const successColor = setStorageItem(STORAGE_KEY_THEME_COLOR, color);
  const successValue = setStorageItem(STORAGE_KEY_THEME_COLOR_VALUE, value);
  return successColor && successValue;
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
  STORAGE_KEY_LANGUAGE,
  getStorageItem,
  setStorageItem
};
