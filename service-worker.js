// Service Worker — PWA offline-first
// Precachea todo el sitio (lista generada con las mismas exclusiones del
// workflow de despliegue: sin documentación, CV ni plantilla de juegos).
// Bump CACHE_NAME (v2, v3, ...) al actualizar el sitio para forzar refresco.
const CACHE_NAME = 'pwa-cache-v50';
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
  "./juegos/neon-chess/cover.jpg",
  "./juegos/neon-chess/index.html",
  "./juegos/neon-arkanoid/cover.jpg",
  "./juegos/neon-arkanoid/index.html",
  "./juegos/neon-card-match/cover.jpg",
  "./juegos/neon-card-match/index.html",
  "./juegos/neon-checkers/cover.jpg",
  "./juegos/neon-checkers/index.html",
  "./juegos/data/juegos.json",
  "./juegos/neon-dodge-arena/cover.jpg",
  "./juegos/neon-dodge-arena/index.html",
  "./juegos/neon-dungeon-crawler/cover.jpg",
  "./juegos/neon-dungeon-crawler/index.html",
  "./juegos/index.html",
  "./juegos/juegos.css",
  "./juegos/neon-match-3/cover.jpg",
  "./juegos/neon-match-3/index.html",
  "./juegos/neon-maze/cover.jpg",
  "./juegos/neon-maze/index.html",
  "./juegos/neon-racer/cover.jpg",
  "./juegos/neon-racer/index.html",
  "./juegos/neon-rally/cover.jpg",
  "./juegos/neon-rally/index.html",
  "./juegos/neon-rock-paper-scissors/cover.jpg",
  "./juegos/neon-rock-paper-scissors/index.html",
  "./juegos/neon-platformer/cover.jpg",
  "./juegos/neon-platformer/index.html",
  "./juegos/neon-pong/cover.jpg",
  "./juegos/neon-pong/index.html",
  "./juegos/neon-pool/cover.jpg",
  "./juegos/neon-pool/index.html",
  "./juegos/neon-rhythm/cover.jpg",
  "./juegos/neon-rhythm/index.html",
  "./juegos/neon-snake/cover.jpg",
  "./juegos/neon-snake/index.html",
  "./juegos/neon-space-invaders/cover.jpg",
  "./juegos/neon-space-invaders/index.html",
  "./juegos/neon-tic-tac-toe/cover.jpg",
  "./juegos/neon-tic-tac-toe/index.html",
  "./juegos/neon-tetris/cover.jpg",
  "./juegos/neon-tetris/index.html",
  "./juegos/neon-tower-defense/cover.jpg",
  "./juegos/neon-tower-defense/index.html",
  "./manifest.json",
  "./mis-estudios/articulos/apis.html",
  "./mis-estudios/articulos/apis.en.html",
  "./mis-estudios/articulos/aprendizaje-automatico.html",
  "./mis-estudios/articulos/aprendizaje-automatico.en.html",
  "./mis-estudios/articulos/c-memoria.html",
  "./mis-estudios/articulos/c-memoria.en.html",
  "./mis-estudios/articulos/ci-cd.html",
  "./mis-estudios/articulos/criptografia.html",
  "./mis-estudios/articulos/criptografia.en.html",
  "./mis-estudios/articulos/css.html",
  "./mis-estudios/articulos/css.en.html",
  "./mis-estudios/articulos/docker.html",
  "./mis-estudios/articulos/empaquetado-despliegue.html",
  "./mis-estudios/articulos/empaquetado-despliegue.en.html",
  "./mis-estudios/articulos/editores-ides-depuracion.html",
  "./mis-estudios/articulos/editores-ides-depuracion.en.html",
  "./mis-estudios/articulos/frameworks-backend.html",
  "./mis-estudios/articulos/frameworks-backend.en.html",
  "./mis-estudios/articulos/frameworks-frontend.html",
  "./mis-estudios/articulos/frameworks-frontend.en.html",
  "./mis-estudios/articulos/git.html",
  "./mis-estudios/articulos/git.en.html",
  "./mis-estudios/articulos/html.html",
  "./mis-estudios/articulos/html.en.html",
  "./mis-estudios/articulos/http.html",
  "./mis-estudios/articulos/http.en.html",
  "./mis-estudios/articulos/inteligencia-artificial.html",
  "./mis-estudios/articulos/inteligencia-artificial.en.html",
  "./mis-estudios/articulos/javascript.html",
  "./mis-estudios/articulos/javascript.en.html",
  "./mis-estudios/articulos/linux-servidores.html",
  "./mis-estudios/articulos/logica-booleana.html",
  "./mis-estudios/articulos/logica-booleana.en.html",
  "./mis-estudios/articulos/modelado-datos.html",
  "./mis-estudios/articulos/modelado-datos.en.html",
  "./mis-estudios/articulos/paradigmas.html",
  "./mis-estudios/articulos/paradigmas.en.html",
  "./mis-estudios/articulos/patrones.html",
  "./mis-estudios/articulos/patrones.en.html",
  "./mis-estudios/articulos/python.html",
  "./mis-estudios/articulos/python.en.html",
  "./mis-estudios/articulos/redes-neuronales.html",
  "./mis-estudios/articulos/redes-neuronales.en.html",
  "./mis-estudios/articulos/redes.html",
  "./mis-estudios/articulos/redes.en.html",
  "./mis-estudios/articulos/regex.html",
  "./mis-estudios/articulos/seguridad-web.html",
  "./mis-estudios/articulos/seguridad-web.en.html",
  "./mis-estudios/articulos/sistemas-numericos.html",
  "./mis-estudios/articulos/sistemas-numericos.en.html",
  "./mis-estudios/articulos/sistemas-operativos.html",
  "./mis-estudios/articulos/sistemas-operativos.en.html",
  "./mis-estudios/articulos/solid.html",
  "./mis-estudios/articulos/solid.en.html",
  "./mis-estudios/articulos/sql.html",
  "./mis-estudios/articulos/sql.en.html",
  "./mis-estudios/articulos/terminal.html",
  "./mis-estudios/articulos/terminal.en.html",
  "./mis-estudios/articulos/testing.html",
  "./mis-estudios/articulos/testing.en.html",
  "./mis-estudios/articulos/tls.html",
  "./mis-estudios/articulos/tls.en.html",
  "./mis-estudios/articulos/typescript.html",
  "./mis-estudios/articulos/accesibilidad.html",
  "./mis-estudios/articulos/nosql.html",
  "./mis-estudios/articulos/fundamentos-ciberseguridad.html",
  "./mis-estudios/articulos/phishing-ingenieria-social.html",
  "./mis-estudios/articulos/malware-ransomware.html",
  "./mis-estudios/articulos/identidad-y-mfa.html",
  "./mis-estudios/articulos/antivirus-edr.html",
  "./mis-estudios/articulos/respuesta-incidentes.html",
  "./mis-estudios/data/articulos.json",
  "./mis-estudios/index.html",
  "./mis-estudios/js/copiar.js",
  "./mis-estudios/mis-estudios.css",
  "./programas/data/herramientas.json",
  "./programas/herramientas/convertidor-de-unidades.html",
  "./programas/herramientas/convertidor-imagenes.html",
  "./programas/herramientas/dj.html",
  "./programas/herramientas/dj.css",
  "./programas/herramientas/dj.js",
  "./programas/herramientas/editor-text.html",
  "./programas/herramientas/escaner-dispositivos.html",
  "./programas/herramientas/formateador-json.html",
  "./programas/herramientas/generador-codigo-qr.html",
  "./programas/herramientas/generador-favicons.html",
  "./programas/herramientas/generador-paletas.html",
  "./programas/herramientas/pizarra-dibujo.html",
  "./programas/herramientas/validador-de-yaml.html",
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

          /* Las navegaciones a /juegos/ (o /juegos) no coinciden con la entrada
             precacheada ./juegos/index.html: resolver el index del directorio. */
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
