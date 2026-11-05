import { setCurrentLanguage, currentLanguage } from "../../lang/translations.config.js";
import translations from "../../lang/translations.json" with { type: "json" };
import { getLanguage, setLanguage, STORAGE_KEY_LANGUAGE } from "../../utils/storage.js";
import { updateModeText } from "./fnThemeMode.js";
import { reloadHomeContent } from "../home/fnHome.js";
import { reloadGamesContent } from "../juegos/fnJuegos.js";

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
}

/* `rerender` controla si se vuelve a renderizar la portada y la grilla de
   juegos. En el arranque se restaura el idioma guardado ANTES de que
   HomeController/JuegosController monten las grillas, así que ahí se pasa
   `rerender: false` para no renderizar la misma pantalla dos veces. */
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
    reloadHomeContent();
    reloadGamesContent();
  }
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
