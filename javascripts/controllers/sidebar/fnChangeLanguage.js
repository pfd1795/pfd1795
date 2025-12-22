// import { currentLanguage } from "../../lang/translations.config";
// import translations from "../../lang/translations.json" with { type: "json" };

// import { updateModeText } from "./fnThemeMode";

// const languageBtn = document.querySelector(".settings-language .btn");

// const savedLanguage = localStorage.getItem("language") || "es";

// function changeLanguage(lang = currentLanguage as 'es' | 'en') {

//   const elements = document.querySelectorAll("[data-lang]");
//   elements.forEach(element => {
//     const key = element.getAttribute("data-lang");
//     if (translations.page[lang]) {
//       element.textContent = translations.page[lang][key];
//     }
//   });

//   updateModeText();

//   localStorage.setItem("language", lang);

//   document.documentElement.lang = lang;
// }

// export default function sectionLanguage() {
//   languageBtn?.addEventListener("click", () => {
//     const newLang = currentLanguage === "es" ? "en" : "es";
//     changeLanguage(newLang);
//   });

//   changeLanguage(savedLanguage);
// }