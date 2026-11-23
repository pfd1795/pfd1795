import { setCurrentLanguage, currentLanguage } from "../../lang/translations.config.js";
import translations from "../../lang/translations.json" with { type: "json" };
import { getLanguage, setLanguage, STORAGE_KEY_LANGUAGE } from "../../utils/storage.js";
import { updateModeText } from "./fnThemeMode.js";
import { reloadHomeContent } from "../home/fnHome.js";
import { reloadGamesContent } from "../juegos/fnJuegos.js";
import { reloadProgramasContent } from "../programas/fnProgramas.js";

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

    /* El nombre "Pablo" no se traduce: es un nombre propio y debe quedar
       literal en todos los idiomas, por eso se saltea esta clave. */
    if (key === "name") {
      return;
    }

    const value = getTranslation(lang, key);

    if (value !== undefined) {
      element.textContent = value;
    }
  });

  /* Atributos localizados de controles generados dinámicamente (muestras de
     tema, direcciones, velocidad y fuente). Así el title y el aria-label
     cambian de idioma sin necesidad de reabrir el modal. */
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

function changeLanguage(lang, { rerender = true } = {}) {
  if (!VALID_LANGUAGES.includes(lang)) {
    console.warn("Invalid language:", lang);
    return;
  }

  setCurrentLanguage(lang);
  setLanguage(lang);

  document.documentElement.lang = lang;

  applyTranslations();

  updateModeText();

  if (rerender) {
    /* Conservar la tarjeta de experiencia abierta: se reconstruye la grilla
       desde cero, así que hay que recordar qué panel estaba desplegado. */
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

  /* Sincronización entre pestañas: si otra pestaña del sitio cambia el
     idioma, se re-aplica el estado y se re-renderizan las grillas aquí. */
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY_LANGUAGE) return;
    if (!VALID_LANGUAGES.includes(event.newValue)) return;
    if (event.newValue === currentLanguage) return;

    changeLanguage(event.newValue);

    document.querySelectorAll(".segment[data-lang-value]").forEach((option) => {
      option.classList.toggle("active", option.dataset.langValue === event.newValue);
    });
  });

  const savedLanguage = getLanguage();

  if (document.documentElement.lang !== savedLanguage) {
    changeLanguage(savedLanguage, { rerender: false });
  }
}
