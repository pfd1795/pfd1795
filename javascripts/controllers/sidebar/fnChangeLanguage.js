import { setCurrentLanguage, currentLanguage } from "../../lang/translations.config.js";
import translations from "../../lang/translations.json" with { type: "json" };
import { getLanguage, setLanguage } from "../../utils/storage.js";
import { updateModeText } from "./fnThemeMode.js";
import { reloadHomeContent } from "../home/fnHome.js";

const VALID_LANGUAGES = ["es", "en"];

const LANGUAGE_SECTIONS = ["page", "introSection", "home", "header"];

function getTranslation(lang, key) {
  for (const section of LANGUAGE_SECTIONS) {
    const value = translations[section]?.[lang]?.[key];

    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
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
}

function changeLanguage(lang) {
  if (!VALID_LANGUAGES.includes(lang)) {
    console.warn("Invalid language:", lang);
    return;
  }

  setCurrentLanguage(lang);
  setLanguage(lang);

  document.documentElement.lang = lang;

  applyTranslations();

  updateModeText();
  reloadHomeContent();
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

  const savedLanguage = getLanguage();

  if (document.documentElement.lang !== savedLanguage) {
    changeLanguage(savedLanguage);
  }
}
