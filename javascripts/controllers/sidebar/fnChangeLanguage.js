import { setCurrentLanguage } from "../../lang/translations.config.js";
import translations from "../../lang/translations.json" with { type: "json" };
import { getLanguage, setLanguage } from "../../utils/storage.js";
import { updateModeText } from "./fnThemeMode.js";
import { reloadHomeContent } from "../home/fnHome.js";

const VALID_LANGUAGES = ['es', 'en'];
const LANGUAGE_NAMES = {
  es: 'Español',
  en: 'English'
};

function changeLanguage(lang) {
  if (!VALID_LANGUAGES.includes(lang)) {
    console.warn('Invalid language:', lang);
    return;
  }

  setCurrentLanguage(lang);
  setLanguage(lang);

  document.documentElement.lang = lang;

  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach(element => {
    const key = element.getAttribute("data-lang");
    
    if (key === 'name') {
      return;
    }
    
    if (translations.page[lang] && translations.page[lang][key]) {
      element.textContent = translations.page[lang][key];
    } else if (translations.introSection[lang] && translations.introSection[lang][key]) {
      element.textContent = translations.introSection[lang][key];
    } else if (translations.home && translations.home[lang] && translations.home[lang][key]) {
      element.textContent = translations.home[lang][key];
    } else if (translations.header && translations.header[lang] && translations.header[lang][key]) {
      element.textContent = translations.header[lang][key];
    }
  });

  const languageBtnLabel = document.querySelector('.language-toggle .current-lang');
  if (languageBtnLabel) {
    languageBtnLabel.textContent = LANGUAGE_NAMES[lang];
  }

  updateModeText();
  reloadHomeContent();
}

export default function sectionLanguage() {
  const languageBtn = document.querySelector(".language-toggle");
  
  if (!languageBtn) return;

  const savedLanguage = getLanguage();
  
  const initialLangLabel = languageBtn.querySelector('.current-lang');
  if (initialLangLabel) {
    initialLangLabel.textContent = LANGUAGE_NAMES[savedLanguage];
  }

  languageBtn.addEventListener("click", () => {
    const currentLang = getLanguage();
    const newLang = currentLang === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  });

  if (document.documentElement.lang !== savedLanguage) {
    changeLanguage(savedLanguage);
  }
}
