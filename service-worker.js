// Service Worker — PWA offline-first
// Bump CACHE_NAME (v2, v3, ...) al actualizar el sitio para forzar refresco.
const CACHE_NAME = 'pwa-cache-v1';
const PRECACHE_URLS = [
  "./assets/icons/arrow_right.svg",
  "./assets/icons/chevron_down.svg",
  "./assets/icons/close.svg",
  "./assets/icons/code.svg",
  "./assets/icons/css.svg",
  "./assets/icons/dark_mode.svg",
  "./assets/icons/docs.svg",
  "./assets/icons/format_size.svg",
  "./assets/icons/gamepad.svg",
  "./assets/icons/github.svg",
  "./assets/icons/gmail.svg",
  "./assets/icons/home.svg",
  "./assets/icons/html.svg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon.svg",
  "./assets/icons/js.svg",
  "./assets/icons/light_mode.svg",
  "./assets/icons/linkedin.svg",
  "./assets/icons/menu.svg",
  "./assets/icons/menu_book.svg",
  "./assets/icons/palette.svg",
  "./assets/icons/school.svg",
  "./assets/icons/setting.svg",
  "./assets/icons/speed.svg",
  "./assets/icons/translate.svg",
  "./assets/images/games/ajedrez/cover.jpg",
  "./assets/images/games/arkanoid/cover.jpg",
  "./assets/images/games/card-match/cover.jpg",
  "./assets/images/games/coverExample1.jpg",
  "./assets/images/games/damas/cover.jpg",
  "./assets/images/games/dodge-arena/cover.jpg",
  "./assets/images/games/dungeon-crawler/cover.jpg",
  "./assets/images/games/match-3/cover.jpg",
  "./assets/images/games/neon-maze/cover.jpg",
  "./assets/images/games/neon-racer/cover.jpg",
  "./assets/images/games/neon-rally/cover.jpg",
  "./assets/images/games/piedras-papel-tijeras/cover.jpg",
  "./assets/images/games/plataformas/cover.jpg",
  "./assets/images/games/pong/cover.jpg",
  "./assets/images/games/pool/cover.jpg",
  "./assets/images/games/ritmo/cover.jpg",
  "./assets/images/games/snake/cover.jpg",
  "./assets/images/games/space-invaders/cover.jpg",
  "./assets/images/games/ta-te-ti/cover.jpg",
  "./assets/images/games/tetris/cover.jpg",
  "./assets/images/games/tower-defense/cover.jpg",
  "./assets/images/profile.png",
  "./assets/images/project-nextjs.jpg",
  "./favicon.svg",
  "./index.html",
  "./javascripts/controllers/home/fnHome.js",
  "./javascripts/controllers/home/home.controller.js",
  "./javascripts/controllers/juegos/fnJuegos.js",
  "./javascripts/controllers/juegos/juegos.controller.js",
  "./javascripts/controllers/settings/settings.controller.js",
  "./javascripts/controllers/sidebar/fnBackgroundTheme.js",
  "./javascripts/controllers/sidebar/fnChangeLanguage.js",
  "./javascripts/controllers/sidebar/fnFontScale.js",
  "./javascripts/controllers/sidebar/fnSectionNav.js",
  "./javascripts/controllers/sidebar/fnThemeColor.js",
  "./javascripts/controllers/sidebar/fnThemeMode.js",
  "./javascripts/controllers/sidebar/sidebar.controller.js",
  "./javascripts/data/juegos.json",
  "./javascripts/lang/translations.config.js",
  "./javascripts/lang/translations.json",
  "./javascripts/main.js",
  "./javascripts/theme-init.js",
  "./javascripts/utils/assets.js",
  "./javascripts/utils/copyEmail.js",
  "./javascripts/utils/dialog.js",
  "./javascripts/utils/storage.js",
  "./javascripts/utils/themeBackgrounds.js",
  "./javascripts/utils/themeColors.js",
  "./juegos/ajedrez/index.html",
  "./juegos/arkanoid/index.html",
  "./juegos/card-match/index.html",
  "./juegos/damas/index.html",
  "./juegos/dodge-arena/index.html",
  "./juegos/dungeon-crawler/index.html",
  "./juegos/index.html",
  "./juegos/match-3/index.html",
  "./juegos/neon-maze/index.html",
  "./juegos/neon-racer/index.html",
  "./juegos/neon-rally/index.html",
  "./juegos/piedras-papel-tijeras/index.html",
  "./juegos/plataformas/index.html",
  "./juegos/pong/index.html",
  "./juegos/pool/index.html",
  "./juegos/ritmo/index.html",
  "./juegos/snake/index.html",
  "./juegos/space-invaders/index.html",
  "./juegos/ta-te-ti/index.html",
  "./juegos/tetris/index.html",
  "./juegos/tower-defense/index.html",
  "./manifest.json",
  "./mis-estudios/estudios/estudios_apis.html",
  "./mis-estudios/estudios/estudios_aprendizaje_automatico.html",
  "./mis-estudios/estudios/estudios_criptografia.html",
  "./mis-estudios/estudios/estudios_css.html",
  "./mis-estudios/estudios/estudios_git.html",
  "./mis-estudios/estudios/estudios_html.html",
  "./mis-estudios/estudios/estudios_http.html",
  "./mis-estudios/estudios/estudios_inteligencia_artificial.html",
  "./mis-estudios/estudios/estudios_javascript.html",
  "./mis-estudios/estudios/estudios_modelado_datos.html",
  "./mis-estudios/estudios/estudios_paradigmas.html",
  "./mis-estudios/estudios/estudios_patrones.html",
  "./mis-estudios/estudios/estudios_python.html",
  "./mis-estudios/estudios/estudios_redes.html",
  "./mis-estudios/estudios/estudios_redes_neuronales.html",
  "./mis-estudios/estudios/estudios_seguridad_web.html",
  "./mis-estudios/estudios/estudios_sistemas_numericos.html",
  "./mis-estudios/estudios/estudios_sistemas_operativos.html",
  "./mis-estudios/estudios/estudios_sql.html",
  "./mis-estudios/estudios/estudios_terminal.html",
  "./mis-estudios/estudios/estudios_tls.html",
  "./mis-estudios/index.html",
  "./mis-estudios/js/buscador.js",
  "./mis-estudios/js/copiar.js",
  "./mis-estudios/js/tema.js",
  "./stylesheets/base.css",
  "./stylesheets/enciclopedia.css",
  "./stylesheets/juegos.css",
  "./stylesheets/portada.css"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  let url;
  try { url = new URL(request.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
