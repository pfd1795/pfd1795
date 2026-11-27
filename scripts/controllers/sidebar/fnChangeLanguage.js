import { setCurrentLanguage, currentLanguage } from "../../lang/translations.config.js";
import translations from "../../lang/translations.json" with { type: "json" };
import { getLanguage, setLanguage, STORAGE_KEY_LANGUAGE } from "../../utils/storage.js";
import { updateModeText } from "../../controllers/sidebar/fnThemeMode.js";
import { reloadHomeContent } from "../../controllers/home/fnHome.js";
import { reloadGamesContent } from "../../controllers/juegos/fnJuegos.js";
import { reloadProgramasContent } from "../../controllers/programas/fnProgramas.js";

const VALID_LANGUAGES = ["es", "en"];

const LANGUAGE_SECTIONS = ["page", "introSection", "home", "header"];

function buildTranslationIndex(lang) {
  const index = new Map();

  for (const section of LANGUAGE_SECTIONS) {
    const sectionKeys = translations[section]?.[lang];

    if (!sectionKeys) continue;

    for (const key of Object.keys(sectionKeys)) {
      if (index.has(key)) {
        console.error(`Clave de traducción duplicada: "${key}" (${section})`);
      } else {
        index.set(key, sectionKeys[key]);
      }
    }
  }

  return index;
}

const TRANSLATION_INDEX = Object.fromEntries(
  VALID_LANGUAGES.map((lang) => [lang, buildTranslationIndex(lang)])
);

function getTranslation(lang, key) {
  return TRANSLATION_INDEX[lang]?.get(key);
}

export function applyTranslations() {
  const lang = currentLanguage;

  document.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.getAttribute("data-lang");

    if (key === "name") {
      return;
    }

    const value = getTranslation(lang, key);

    if (value !== undefined) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const value = getTranslation(lang, element.getAttribute("data-i18n-title"));

    if (value !== undefined) {
      element.title = value;
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const value = getTranslation(lang, element.getAttribute("data-i18n-aria-label"));

    if (value !== undefined) {
      element.setAttribute("aria-label", value);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = getTranslation(lang, element.getAttribute("data-i18n-placeholder"));

    if (value !== undefined) {
      element.setAttribute("data-buscador-placeholder", value);
    }
  });
}

function changeLanguage(lang, { rerender = true, persist = true } = {}) {
  if (!VALID_LANGUAGES.includes(lang)) {
    console.warn("Invalid language:", lang);
    return;
  }

  setCurrentLanguage(lang);

  if (persist) {
    setLanguage(lang);
  }

  document.documentElement.lang = lang;

  applyTranslations();

  updateModeText();

  if (rerender) {
    const expandedHeader = document.querySelector('.card-work.expanded .card-work__header');
    const expandedPanelId = expandedHeader?.getAttribute('aria-controls') ?? null;

    reloadHomeContent(expandedPanelId);
    reloadGamesContent();
    reloadProgramasContent();
  }

  document.dispatchEvent(new CustomEvent("site:languagechange"));
}

export default function sectionLanguage() {
  document.addEventListener("click", (event) => {
    const segment = event.target.closest(".segment[data-lang-value]");

    if (!segment) return;

    const lang = segment.dataset.langValue;

    changeLanguage(lang);

    document.querySelectorAll(".segment[data-lang-value]").forEach((option) => {
      option.classList.toggle("active", option.dataset.langValue === lang);
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY_LANGUAGE && event.key !== null) return;

    const nextLang = event.key === null ? getLanguage() : event.newValue;

    if (!VALID_LANGUAGES.includes(nextLang)) return;
    if (nextLang === currentLanguage) return;

    changeLanguage(nextLang, { persist: false });

    document.querySelectorAll(".segment[data-lang-value]").forEach((option) => {
      option.classList.toggle("active", option.dataset.langValue === nextLang);
    });
  });

  const savedLanguage = getLanguage();

  if (document.documentElement.lang !== savedLanguage) {
    changeLanguage(savedLanguage, { rerender: false });
  }
}
