// Service Worker — PWA offline-first
// Precachea todo el sitio (lista generada con las mismas exclusiones del
// workflow de despliegue: sin documentación, CV ni plantilla de juegos).
// Bump CACHE_NAME (v2, v3, ...) al actualizar el sitio para forzar refresco.
const CACHE_NAME = 'pwa-cache-v55';
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
  "./assets/images/profile.png",
  "./assets/images/project-nextjs.jpg",
  "./favicon.svg",
  "./index.html",
  "./scripts/buscador.js",
  "./scripts/controllers/home/fnHome.js",
  "./scripts/controllers/home/home.controller.js",
  "./scripts/controllers/juegos/fnJuegos.js",
  "./scripts/controllers/juegos/juegos.controller.js",
  "./scripts/controllers/mis-estudios/fnMisEstudios.js",
  "./scripts/controllers/mis-estudios/mis-estudios.controller.js",
  "./scripts/controllers/programas/fnProgramas.js",
  "./scripts/controllers/programas/programas.controller.js",
  "./scripts/controllers/settings/settings.controller.js",
  "./scripts/controllers/sidebar/fnBackgroundTheme.js",
  "./scripts/controllers/sidebar/fnChangeLanguage.js",
  "./scripts/controllers/sidebar/fnFontScale.js",
  "./scripts/controllers/sidebar/fnSectionNav.js",
  "./scripts/controllers/sidebar/fnThemeColor.js",
  "./scripts/controllers/sidebar/fnThemeMode.js",
  "./scripts/controllers/sidebar/sidebar.controller.js",
  "./scripts/lang/translations.config.js",
  "./scripts/lang/translations.json",
  "./scripts/main.js",
  "./scripts/theme-init.js",
  "./scripts/utils/assets.js",
  "./scripts/utils/copyEmail.js",
  "./scripts/utils/dialog.js",
  "./scripts/utils/storage.js",
  "./scripts/utils/themeBackgrounds.js",
  "./scripts/utils/themeColors.js",
  "./pages/my-games/neon-chess/cover.jpg",
  "./pages/my-games/neon-chess/index.html",
  "./pages/my-games/neon-arkanoid/cover.jpg",
  "./pages/my-games/neon-arkanoid/index.html",
  "./pages/my-games/neon-card-match/cover.jpg",
  "./pages/my-games/neon-card-match/index.html",
  "./pages/my-games/neon-checkers/cover.jpg",
  "./pages/my-games/neon-checkers/index.html",
  "./pages/my-games/data/juegos.json",
  "./pages/my-games/neon-dodge-arena/cover.jpg",
  "./pages/my-games/neon-dodge-arena/index.html",
  "./pages/my-games/neon-dungeon-crawler/cover.jpg",
  "./pages/my-games/neon-dungeon-crawler/index.html",
  "./pages/my-games/index.html",
  "./pages/my-games/juegos.css",
  "./pages/my-games/neon-match-3/cover.jpg",
  "./pages/my-games/neon-match-3/index.html",
  "./pages/my-games/neon-maze/cover.jpg",
  "./pages/my-games/neon-maze/index.html",
  "./pages/my-games/neon-racer/cover.jpg",
  "./pages/my-games/neon-racer/index.html",
  "./pages/my-games/neon-rally/cover.jpg",
  "./pages/my-games/neon-rally/index.html",
  "./pages/my-games/neon-rock-paper-scissors/cover.jpg",
  "./pages/my-games/neon-rock-paper-scissors/index.html",
  "./pages/my-games/neon-platformer/cover.jpg",
  "./pages/my-games/neon-platformer/index.html",
  "./pages/my-games/neon-pong/cover.jpg",
  "./pages/my-games/neon-pong/index.html",
  "./pages/my-games/neon-pool/cover.jpg",
  "./pages/my-games/neon-pool/index.html",
  "./pages/my-games/neon-rhythm/cover.jpg",
  "./pages/my-games/neon-rhythm/index.html",
  "./pages/my-games/neon-snake/cover.jpg",
  "./pages/my-games/neon-snake/index.html",
  "./pages/my-games/neon-space-invaders/cover.jpg",
  "./pages/my-games/neon-space-invaders/index.html",
  "./pages/my-games/neon-tic-tac-toe/cover.jpg",
  "./pages/my-games/neon-tic-tac-toe/index.html",
  "./pages/my-games/neon-tetris/cover.jpg",
  "./pages/my-games/neon-tetris/index.html",
  "./pages/my-games/neon-tower-defense/cover.jpg",
  "./pages/my-games/neon-tower-defense/index.html",
  "./manifest.json",
  "./pages/my-studies/apis/index.html",
  "./pages/my-studies/apis/index.en.html",
  "./pages/my-studies/aprendizaje-automatico/index.html",
  "./pages/my-studies/aprendizaje-automatico/index.en.html",
  "./pages/my-studies/c-memoria/index.html",
  "./pages/my-studies/c-memoria/index.en.html",
  "./pages/my-studies/ci-cd/index.html",
  "./pages/my-studies/criptografia/index.html",
  "./pages/my-studies/criptografia/index.en.html",
  "./pages/my-studies/css/index.html",
  "./pages/my-studies/css/index.en.html",
  "./pages/my-studies/docker/index.html",
  "./pages/my-studies/empaquetado-despliegue/index.html",
  "./pages/my-studies/empaquetado-despliegue/index.en.html",
  "./pages/my-studies/editores-ides-depuracion/index.html",
  "./pages/my-studies/editores-ides-depuracion/index.en.html",
  "./pages/my-studies/frameworks-backend/index.html",
  "./pages/my-studies/frameworks-backend/index.en.html",
  "./pages/my-studies/frameworks-frontend/index.html",
  "./pages/my-studies/frameworks-frontend/index.en.html",
  "./pages/my-studies/git/index.html",
  "./pages/my-studies/git/index.en.html",
  "./pages/my-studies/html/index.html",
  "./pages/my-studies/html/index.en.html",
  "./pages/my-studies/http/index.html",
  "./pages/my-studies/http/index.en.html",
  "./pages/my-studies/inteligencia-artificial/index.html",
  "./pages/my-studies/inteligencia-artificial/index.en.html",
  "./pages/my-studies/javascript/index.html",
  "./pages/my-studies/javascript/index.en.html",
  "./pages/my-studies/linux-servidores/index.html",
  "./pages/my-studies/logica-booleana/index.html",
  "./pages/my-studies/logica-booleana/index.en.html",
  "./pages/my-studies/modelado-datos/index.html",
  "./pages/my-studies/modelado-datos/index.en.html",
  "./pages/my-studies/paradigmas/index.html",
  "./pages/my-studies/paradigmas/index.en.html",
  "./pages/my-studies/patrones/index.html",
  "./pages/my-studies/patrones/index.en.html",
  "./pages/my-studies/python/index.html",
  "./pages/my-studies/python/index.en.html",
  "./pages/my-studies/redes-neuronales/index.html",
  "./pages/my-studies/redes-neuronales/index.en.html",
  "./pages/my-studies/redes/index.html",
  "./pages/my-studies/redes/index.en.html",
  "./pages/my-studies/regex/index.html",
  "./pages/my-studies/seguridad-web/index.html",
  "./pages/my-studies/seguridad-web/index.en.html",
  "./pages/my-studies/sistemas-numericos/index.html",
  "./pages/my-studies/sistemas-numericos/index.en.html",
  "./pages/my-studies/sistemas-operativos/index.html",
  "./pages/my-studies/sistemas-operativos/index.en.html",
  "./pages/my-studies/solid/index.html",
  "./pages/my-studies/solid/index.en.html",
  "./pages/my-studies/sql/index.html",
  "./pages/my-studies/sql/index.en.html",
  "./pages/my-studies/terminal/index.html",
  "./pages/my-studies/terminal/index.en.html",
  "./pages/my-studies/testing/index.html",
  "./pages/my-studies/testing/index.en.html",
  "./pages/my-studies/tls/index.html",
  "./pages/my-studies/tls/index.en.html",
  "./pages/my-studies/typescript/index.html",
  "./pages/my-studies/accesibilidad/index.html",
  "./pages/my-studies/nosql/index.html",
  "./pages/my-studies/fundamentos-ciberseguridad/index.html",
  "./pages/my-studies/phishing-ingenieria-social/index.html",
  "./pages/my-studies/malware-ransomware/index.html",
  "./pages/my-studies/identidad-y-mfa/index.html",
  "./pages/my-studies/antivirus-edr/index.html",
  "./pages/my-studies/respuesta-incidentes/index.html",
  "./pages/my-studies/data/articulos.json",
  "./pages/my-studies/index.html",
  "./pages/my-studies/js/copiar.js",
  "./pages/my-studies/mis-estudios.css",
  "./pages/my-programs/data/herramientas.json",
  "./pages/my-programs/convertidor-de-unidades/index.html",
  "./pages/my-programs/convertidor-imagenes/index.html",
  "./pages/my-programs/dj/dj.css",
  "./pages/my-programs/dj/dj.js",
  "./pages/my-programs/dj/index.html",
  "./pages/my-programs/editor-text/index.html",
  "./pages/my-programs/escaner-dispositivos/index.html",
  "./pages/my-programs/formateador-json/index.html",
  "./pages/my-programs/generador-codigo-qr/index.html",
  "./pages/my-programs/generador-favicons/index.html",
  "./pages/my-programs/generador-paletas/index.html",
  "./pages/my-programs/pizarra-dibujo/index.html",
  "./pages/my-programs/validador-de-yaml/index.html",
  "./pages/my-programs/index.html",
  "./pages/my-programs/programas.css",
  "./service-worker.js",
  "./stylesheets/base.css",
  "./stylesheets/portada.css",
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url)))
    ).then((resultados) => {
      const fallidos = resultados.filter((resultado) => resultado.status === 'rejected');
      if (fallidos.length) {
        console.warn(`[SW] No se pudieron precachear ${fallidos.length} URLs:`, fallidos.map((r) => r.reason));
      }
      return self.skipWaiting();
    })
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
        .catch(async () => {
          const directa = await caches.match(request, { ignoreSearch: true });
          if (directa) return directa;

          /* Las navegaciones a /pages/my-games/ (o /pages/my-games) no coinciden con la entrada
             precacheada ./pages/my-games/index.html: resolver el index del directorio. */
          const base = new URL(request.url);
          const candidatas = [
            new URL('./index.html', base.href).href,
            new URL(base.pathname.replace(/\/?$/, '/') + 'index.html', base.href).href
          ];
          for (const url of candidatas) {
            const encontrada = await caches.match(url, { ignoreSearch: true });
            if (encontrada) return encontrada;
          }
          return caches.match('./index.html');
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => {
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
