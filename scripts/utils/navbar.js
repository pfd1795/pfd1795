let isDarkMode = true;
let currentColor = '#3b82f6';
let settingsOpen = false;
let currentLanguage = 'es';

const translations = {
  es: {
    // Header
    "web-developer": "Desarrollador Web",
    "language": "Idioma",
    "menu": "Menú",

    // Sidebar
    "close": "Cerrar",
    "home": "Inicio",
    "resume": "Curriculum",
    "settings": "Configurar",

    // Configuración
    "dark": "Modo Oscuro",
    "light": "Modo Claro",
    "theme-color": "Color del tema"
  },
  en: {
    // Header
    "web-developer": "Web Developer",
    "language": "Language",
    "menu": "Menu",

    // Sidebar
    "close": "Close",
    "home": "Home",
    "resume": "Resume",
    "settings": "Settings",

    // Configuración
    "dark": "Dark Mode",
    "light": "Light Mode",
    "theme-color": "Theme Color"
  }
};

export default function navbarController() {
  function openMenu() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleSettings() {
    settingsOpen = !settingsOpen;
    if (settingsOpen) {
      settingsContent.classList.add('open');
      settingsArrow.classList.add('open');
    } else {
      settingsContent.classList.remove('open');
      settingsArrow.classList.remove('open');
    }
  }

  function toggleMode() {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      modeToggle.classList.remove('active');
      updateModeText();
      modeIcon.innerHTML = '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />';
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      modeToggle.classList.add('active');
      updateModeText();
      modeIcon.innerHTML = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />';
    }

    localStorage.setItem('theme-mode', isDarkMode ? 'dark' : 'light');
  }

  function updateModeText() {
    if (isDarkMode) {
      modeText.textContent = translations[currentLanguage]['dark'];
    } else {
      modeText.textContent = translations[currentLanguage]['light'];
    }
  }

  function changeColor(color, colorValue) {
    currentColor = colorValue;

    document.documentElement.style.setProperty('--theme-color', colorValue);

    colorOptions.forEach(option => {
      if (option.dataset.color === color) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });

    localStorage.setItem('theme-color', color);
    localStorage.setItem('theme-color-value', colorValue);
  }

  function setActivePage(page) {
    navLinks.forEach(link => {
      if (link.dataset.page === page) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    localStorage.setItem('current-page', page);
    toggleMode();
  }

  function changeLanguage(lang) {
    currentLanguage = lang;

    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
      const key = element.getAttribute('data-lang');
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    updateModeText();

    localStorage.setItem('language', lang);

    document.documentElement.lang = lang;
  }

  const overlay = document.querySelector('.sidebar-overlay');
  const sidebar = document.querySelector('.sidebar');

  const settingsHeader = document.querySelector('.settings-header');
  const settingsContent = document.querySelector('.settings-content');
  const settingsArrow = document.querySelector('.settings-header .arrow-icon');

  const navLinks = document.querySelectorAll('.nav-link');

  const modeText = document.querySelector('.theme-mode-toggle .theme-label');
  const modeIcon = document.querySelector('.toggle-slider .icon');
  const modeToggle = document.querySelector('.toggle-switch');

  const colorOptions = document.querySelectorAll('.color-option');

  const languageBtn = document.querySelector('.settings-language .btn');


  document.querySelector('.navbar-header .btn').addEventListener('click', openMenu);
  document.querySelector('.sidebar-header .btn').addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  settingsHeader.addEventListener('click', toggleSettings);

  modeToggle.addEventListener('click', toggleMode);

  languageBtn.addEventListener('click', () => {
    const newLang = currentLanguage === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeMenu();
    }
  });

  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      const color = option.dataset.color;
      const colorValue = option.dataset.value;
      changeColor(color, colorValue);
    });
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // e.preventDefault();
      const page = link.dataset.page;
      setActivePage(page);
      closeMenu();
    });
  });

  document.querySelector(".logo-link").addEventListener('click', (e) => {
    setActivePage("home");
  });

  const savedMode = localStorage.getItem('theme-mode') || 'dark';
  const savedColor = localStorage.getItem('theme-color') || 'blue';
  const savedColorValue = localStorage.getItem('theme-color-value') || '#3b82f6';
  const savedPage = localStorage.getItem('current-page') || 'home';
  const savedLanguage = localStorage.getItem('language') || 'es';

  isDarkMode = savedMode === 'dark';
  if (!isDarkMode) {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    modeToggle.classList.add('active');
    updateModeText();
    modeIcon.innerHTML = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />';
  }

  currentColor = savedColorValue;

  changeColor(savedColor, savedColorValue);
  setActivePage(savedPage);
  changeLanguage(savedLanguage);
};