// Service Worker — PWA offline-first
// Precachea todo el sitio (lista generada con las mismas exclusiones del
// workflow de despliegue: sin documentación, CV ni plantilla de juegos).
// Bump CACHE_NAME (v2, v3, ...) al actualizar el sitio para forzar refresco.
const CACHE_NAME = 'pwa-cache-v8';
const PRECACHE_URLS = [
  "./assets/icons/arrow_right.svg",
  "./assets/icons/build.svg",
  "./assets/icons/chevron_down.svg",
  "./assets/icons/close.svg",
  "./assets/icons/code.svg",
  "./assets/icons/css.svg",
  "./assets/icons/dark_mode.svg",
  "./assets/icons/docs.svg",
  "./assets/icons/escaner.svg",
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
  "./js/buscador.js",
  "./js/controllers/home/fnHome.js",
  "./js/controllers/home/home.controller.js",
  "./js/controllers/juegos/fnJuegos.js",
  "./js/controllers/juegos/juegos.controller.js",
  "./js/controllers/mis-estudios/fnMisEstudios.js",
  "./js/controllers/mis-estudios/mis-estudios.controller.js",
  "./js/controllers/programas/fnProgramas.js",
  "./js/controllers/programas/programas.controller.js",
  "./js/controllers/settings/settings.controller.js",
  "./js/controllers/sidebar/fnBackgroundTheme.js",
  "./js/controllers/sidebar/fnChangeLanguage.js",
  "./js/controllers/sidebar/fnFontScale.js",
  "./js/controllers/sidebar/fnSectionNav.js",
  "./js/controllers/sidebar/fnThemeColor.js",
  "./js/controllers/sidebar/fnThemeMode.js",
  "./js/controllers/sidebar/sidebar.controller.js",
  "./js/lang/translations.config.js",
  "./js/lang/translations.json",
  "./js/main.js",
  "./js/theme-init.js",
  "./js/utils/assets.js",
  "./js/utils/copyEmail.js",
  "./js/utils/dialog.js",
  "./js/utils/storage.js",
  "./js/utils/themeBackgrounds.js",
  "./js/utils/themeColors.js",
  "./juegos/ajedrez/index.html",
  "./juegos/arkanoid/index.html",
  "./juegos/card-match/index.html",
  "./juegos/damas/index.html",
  "./juegos/data/juegos.json",
  "./juegos/dodge-arena/index.html",
  "./juegos/dungeon-crawler/index.html",
  "./juegos/index.html",
  "./juegos/juegos.css",
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
  "./mis-estudios/articulos/apis.html",
  "./mis-estudios/articulos/aprendizaje-automatico.html",
  "./mis-estudios/articulos/c-memoria.html",
  "./mis-estudios/articulos/criptografia.html",
  "./mis-estudios/articulos/css.html",
  "./mis-estudios/articulos/frameworks-backend.html",
  "./mis-estudios/articulos/frameworks-frontend.html",
  "./mis-estudios/articulos/git.html",
  "./mis-estudios/articulos/html.html",
  "./mis-estudios/articulos/http.html",
  "./mis-estudios/articulos/inteligencia-artificial.html",
  "./mis-estudios/articulos/javascript.html",
  "./mis-estudios/articulos/logica-booleana.html",
  "./mis-estudios/articulos/modelado-datos.html",
  "./mis-estudios/articulos/paradigmas.html",
  "./mis-estudios/articulos/patrones.html",
  "./mis-estudios/articulos/python.html",
  "./mis-estudios/articulos/redes-neuronales.html",
  "./mis-estudios/articulos/redes.html",
  "./mis-estudios/articulos/seguridad-web.html",
  "./mis-estudios/articulos/sistemas-numericos.html",
  "./mis-estudios/articulos/sistemas-operativos.html",
  "./mis-estudios/articulos/solid.html",
  "./mis-estudios/articulos/sql.html",
  "./mis-estudios/articulos/terminal.html",
  "./mis-estudios/articulos/tls.html",
  "./mis-estudios/data/articulos.json",
  "./mis-estudios/index.html",
  "./mis-estudios/js/copiar.js",
  "./mis-estudios/mis-estudios.css",
  "./programas/data/herramientas.json",
  "./programas/herramientas/convertidor-imagenes.html",
  "./programas/herramientas/escaner-dispositivos.html",
  "./programas/herramientas/generador-codigo-qr.html",
  "./programas/herramientas/generador-favicons.html",
  "./programas/herramientas/generador-paletas.html",
  "./programas/index.html",
  "./programas/programas.css",
  "./service-worker.js",
  "./stylesheets/base.css",
  "./stylesheets/portada.css",
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
