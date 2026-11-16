import { ModalDialog } from "../../utils/dialog.js";
import { currentLanguage } from "../../lang/translations.config.js";
import translations from "../../lang/translations.json" with { type: "json" };
import { applyTranslations } from "../sidebar/fnChangeLanguage.js";
import {
  getLanguage,
  getThemeColor,
  getThemeMode,
  getThemeBackground,
  getGradientDirection,
  getPsychedelicSpeed,
  getFontScale
} from "../../utils/storage.js";
import { THEME_COLORS } from "../../utils/themeColors.js";
import {
  BACKGROUND_THEMES,
  GRADIENT_DIRECTIONS,
  PSYCHEDELIC_SPEEDS,
  FONT_SCALE_OPTIONS,
  themeSwatch,
  getDirectionIcon
} from "../../utils/themeBackgrounds.js";
import { ICONS_URL } from "../../utils/assets.js";

function text(lang, key, fallback = key) {
  return translations.page?.[lang]?.[key] ?? fallback;
}

function buildColorOptions(lang, selectedColor) {
  return THEME_COLORS.map(({ color, labelKey, swatch }) => {
    const label = text(lang, labelKey, color);
    const isSelected = color === selectedColor;

    return `<button type="button" class="color-option${isSelected ? " selected" : ""}" style="background: ${swatch};" data-color="${color}" title="${label}" aria-label="${label}" data-i18n-title="${labelKey}" data-i18n-aria-label="${labelKey}" aria-pressed="${isSelected}"></button>`;
  }).join("");
}

function buildBackgroundOptions(lang, selectedTheme) {
  return BACKGROUND_THEMES.map(({ key, labelKey }) => {
    const label = text(lang, labelKey, key);
    const isSelected = key === selectedTheme;

    return `<button type="button" class="theme-option${isSelected ? " selected" : ""}" style="background: ${themeSwatch(key)};" data-theme="${key}" title="${label}" aria-label="${label}" data-i18n-title="${labelKey}" data-i18n-aria-label="${labelKey}" aria-pressed="${isSelected}"></button>`;
  }).join("");
}

function buildDirectionOptions(lang, selectedDirection) {
  return GRADIENT_DIRECTIONS.map(({ key, labelKey }) => {
    const label = text(lang, labelKey);
    const isSelected = key === selectedDirection;

    return `<button type="button" class="direction-option${isSelected ? " selected" : ""}" data-direction="${key}" title="${label}" aria-label="${label}" data-i18n-title="${labelKey}" data-i18n-aria-label="${labelKey}" aria-pressed="${isSelected}"><svg class="direction-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">${getDirectionIcon(key)}</svg></button>`;
  }).join("");
}

function buildSpeedOptions(lang, selectedSpeed) {
  return PSYCHEDELIC_SPEEDS.map(({ key, labelKey }) => {
    const label = text(lang, labelKey);
    const isSelected = key === selectedSpeed;

    return `<button type="button" class="speed-option${isSelected ? " selected" : ""}" data-speed="${key}" title="${label}" aria-label="${label}" data-i18n-title="${labelKey}" data-i18n-aria-label="${labelKey}" aria-pressed="${isSelected}">${label}</button>`;
  }).join("");
}

function buildFontScaleOptions(lang, selectedScale) {
  return FONT_SCALE_OPTIONS.map(({ value, labelKey, size }) => {
    const label = text(lang, labelKey);
    const isSelected = value === selectedScale;

    return `<button type="button" class="font-scale-option${isSelected ? " selected" : ""}" data-font-scale="${value}" title="${label}" aria-label="${label}" data-i18n-title="${labelKey}" data-i18n-aria-label="${labelKey}" aria-pressed="${isSelected}"><span style="font-size: ${size}px;">A</span></button>`;
  }).join("");
}

function buildSettingsContent() {
  const lang = currentLanguage;
  const texts = translations.page[lang];
  const savedLanguage = getLanguage();
  const savedMode = getThemeMode();
  const savedColor = getThemeColor().color;
  const savedTheme = getThemeBackground();
  const savedDirection = getGradientDirection();
  const savedSpeed = getPsychedelicSpeed();
  const savedFontScale = getFontScale();

  const showDirection = savedTheme !== "default" && savedTheme !== "multicolor";
  const showSpeed = savedTheme === "multicolor";

  return `
    <section class="settings">
      <h2 class="settings-title" id="modal-title" data-lang="settings"></h2>

      <div class="settings-row">
        <img class="settings-icon" src="${ICONS_URL}translate.svg" alt="" />
        <span class="settings-label" data-lang="language"></span>
        <div class="segmented" role="group" aria-label="${texts.language}" data-i18n-aria-label="language">
          <button type="button" class="segment${savedLanguage === "es" ? " active" : ""}" data-lang-value="es">ES</button>
          <button type="button" class="segment${savedLanguage === "en" ? " active" : ""}" data-lang-value="en">EN</button>
        </div>
      </div>

      <div class="settings-row">
        <img class="settings-icon mode-icon" src="${ICONS_URL}${savedMode === "dark" ? "dark_mode.svg" : "light_mode.svg"}" alt="" />
        <span class="settings-label mode-label">${texts[savedMode]}</span>
        <label class="switch">
          <input type="checkbox" class="switch-input" role="switch" aria-label="${texts["dark-mode"]}" data-i18n-aria-label="dark-mode" aria-checked="${savedMode === "dark"}"${savedMode === "dark" ? " checked" : ""} />
          <span class="switch-track"></span>
        </label>
      </div>

      <div class="settings-row settings-row--colors">
        <div class="settings-row-header">
          <img class="settings-icon" src="${ICONS_URL}palette.svg" alt="" />
          <span class="settings-label" data-lang="theme-color"></span>
        </div>
        <div class="color-options" role="group" aria-label="${texts["theme-color"]}" data-i18n-aria-label="theme-color">
          ${buildColorOptions(lang, savedColor)}
        </div>
      </div>

      <div class="settings-row settings-row--colors settings-row--background">
        <div class="settings-row-header">
          <img class="settings-icon" src="${ICONS_URL}palette.svg" alt="" />
          <span class="settings-label" data-lang="theme-background"></span>
        </div>
        <div class="theme-options" role="group" aria-label="${texts["theme-background"]}" data-i18n-aria-label="theme-background">
          ${buildBackgroundOptions(lang, savedTheme)}
        </div>
      </div>

      <div class="settings-row settings-row--direction${showDirection ? "" : " is-hidden"}">
        <img class="settings-icon" src="${ICONS_URL}arrow_right.svg" alt="" />
        <span class="settings-label" data-lang="gradient-direction"></span>
        <div class="direction-options" role="group" aria-label="${texts["gradient-direction"]}" data-i18n-aria-label="gradient-direction">
          ${buildDirectionOptions(lang, savedDirection)}
        </div>
      </div>

      <div class="settings-row settings-row--speed${showSpeed ? "" : " is-hidden"}">
        <img class="settings-icon" src="${ICONS_URL}speed.svg" alt="" />
        <span class="settings-label" data-lang="psychedelic-speed"></span>
        <div class="speed-options" role="group" aria-label="${texts["psychedelic-speed"]}" data-i18n-aria-label="psychedelic-speed">
          ${buildSpeedOptions(lang, savedSpeed)}
        </div>
      </div>

      <div class="settings-row settings-row--font">
        <img class="settings-icon" src="${ICONS_URL}format_size.svg" alt="" />
        <span class="settings-label" data-lang="font-size"></span>
        <div class="font-scale-options" role="group" aria-label="${texts["font-size"]}" data-i18n-aria-label="font-size">
          ${buildFontScaleOptions(lang, savedFontScale)}
        </div>
      </div>
    </section>
  `;
}

export function openSettingsModal() {
  ModalDialog(buildSettingsContent());
  applyTranslations();
}
