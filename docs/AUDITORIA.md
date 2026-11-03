# Hoja de verificación para auditorías

Guía para auditar el portafolio **pfd1795**. Está pensada para ordenar la revisión: primero pone
en marcha el sitio y verifica lo crítico (carga y rutas), y después recorre cada sistema.
Los detalles de arquitectura están en [`AGENTS.md`](../AGENTS.md); la guía de juegos en
[`juegos/README.md`](../juegos/README.md).

## Alcance

- Sitio 100% estático con HTML, CSS y JavaScript vanilla: no hay build, tests, linting,
  dependencias ni backend (es una decisión de diseño, intencional).
- Despliegue: GitHub Pages en subruta (`https://pfd1795.github.io/pfd1795/`), automático en
  push a `main` (`.github/workflows/static.yml`).

## Puesta en marcha

Es obligatorio servir por HTTP (`file://` rompe módulos ES y la importación del JSON por CORS):

```bash
python -m http.server 8000
# revisar: /, /mis-estudios/, /mis-estudios/estudios/estudios_html.html, /juegos/ y al menos un juego
```

## Verificación

### 1. Carga y consola

- [ ] En `/`, `/mis-estudios/`, las 6 páginas de `mis-estudios/estudios/`, `/juegos/` y al menos
      2 juegos: sin errores en consola y sin peticiones 404.
- [ ] HTML carga `base.css` antes que la hoja de su página, sin `@import`.
- [ ] El tema se aplica antes del primer pintado, sin parpadeo (pre-pintado en
      `javascripts/theme-init.js` y `mis-estudios/js/tema.js`).

### 2. Rutas y assets

- [ ] No hay rutas absolutas desde la raíz del dominio (`href="/..."`, `src="/..."`): el sitio
      vive en una subruta de GitHub Pages.
- [ ] `<slug>` de carpeta = `slug` del manifiesto, en kebab-case.
- [ ] Todos los assets referenciados existen: portadas de los 15 juegos
      (`assets/images/games/<slug>/cover.jpg`), `assets/images/project-nextjs.jpg`,
      `assets/icons/gamepad.svg` y el resto de iconos de `assets/icons/`.
- [ ] Los iconos inyectados por JS se resuelven con `utils/assets.js` (funcionan desde la raíz y
      desde subcarpetas).

### 3. Manifiesto de juegos (`javascripts/data/juegos.json`)

- [ ] 15 entradas con `status: "published"`; `slug` válido; campos ES/EN completos
      (`title`, `description`, `genre`; `controls` recomendado).
- [ ] Clave raíz `version` presente; rutas del campo `covers` relativas a `juegos/index.html` y
      cargan por HTTP.
- [ ] Cada juego: `index.html` autocontenido (sin CDNs ni recursos externos), récord en
      `localStorage` con clave `<slug>_best_v1` sin colisiones, `README-juego.md` presente.

### 4. Navegación

- [ ] Sidebar: header + `nav.sidebar-menu` + footer; grupo "Inicio"/chevron con submenú de 3
      hijas (`data-target`); scrollspy marca `.active` según la sección visible y abre el
      submenú con `.has-active` en las hijas.
- [ ] "Mis estudios" y "Juegos" navegan a sus subpáginas; en ellas también cargan la barra, el
      sidebar y el modal del portafolio, con rutas ajustadas (`../` o `../../`).
- [ ] Al abrir el menú el fondo queda `inert` y el foco entra al botón de cierre; al cerrarlo
      se devuelve el foco al botón que lo abrió.

### 5. Temas y configuración

- [ ] Modo claro/oscuro sincronizado (`body.dark` y `html.dark`).
- [ ] 6 acentos (`utils/themeColors.js`), 10 temas de fondo, 7 direcciones y 3 velocidades
      (`utils/themeBackgrounds.js`); arcoíris `multicolor` anulado con `prefers-reduced-motion`.
- [ ] Escala tipográfica `--font-scale` (0.85 / 1 / 1.15) sin tocar los breakpoints en `px`.
- [ ] Los controles del modal usan delegación de eventos sobre `document` y siguen operativos
      tras regenerarse; filas de "Dirección" y "Velocidad" condicionales con `.is-hidden`.
- [ ] Las preferencias persisten en `localStorage` con las claves de `utils/storage.js`
      (`theme-mode`, `theme-color-value`, `theme-background`, `gradient-direction`,
      `psychedelic-speed`, `font-scale`); sincronización entre pestañas vía evento `storage`.

### 6. Internacionalización

- [ ] El cambio de idioma actualiza `[data-lang]` y los `title`/`aria-label` de
      `[data-i18n-title]`/`[data-i18n-aria-label]` sin reabrir el modal.
- [ ] Portada y grilla de juegos se re-renderizan al cambiar de idioma
      (`reloadHomeContent()` / `reloadGamesContent()`).
- [ ] Limitación conocida: el contenido de la enciclopedia y el de los juegos está solo en
      español; las tarjetas de la grilla sí se traducen desde el manifiesto.

### 7. Accesibilidad

- [ ] Enlace "Saltar al contenido" y salto funcional con teclado.
- [ ] Tarjetas de estudios como `<button aria-haspopup="dialog">`; avisos con
      `role="status"`/`aria-live="polite"`; enlaces sociales con `aria-label`;
      externos con `rel="noopener noreferrer"`.
- [ ] Cada contenido dinámico de `<dialog>` genera su `id="modal-title"` (referenciado por
      `aria-labelledby`).

### 8. Deuda técnica conocida (verificar que sigue siendo así)

- [ ] Bloqueo de scroll del modal vía `.modal-open` en `<body>` (no existe `.modal-closed`).
- [ ] Cada juego tiene una sola portada generada; el carrusel con 2–3 portadas existe en el
      código pero aún no tiene imágenes.
- [ ] Sin `updatedAt` por juego en el manifiesto y sin filtro por género en la grilla.
- [ ] Copiar el correo solo con `navigator.clipboard` (fallback: aviso en consola).
