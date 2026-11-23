# AGENTS.md — `programas/`

Reglas locales para agentes que trabajan en la sección Programas. Complementa el
[`AGENTS.md`](../AGENTS.md) raíz (arquitectura general, estilo de código y convenciones).

## Qué es esta carpeta

- `index.html`: índice de la sección con buscador, chips de filtro por categoría y la
  grilla de programas; se renderiza desde
  [`data/herramientas.json`](./data/herramientas.json) con `js/controllers/programas/`
  (se monta en `main.js` solo si existe `.programas-grid`; los chips también se generan
  desde el manifiesto).
- `programas.css`: estilos específicos de la sección (tarjetas `.programa-card*` y override
  de acento `--prog-accent` para los chips `.filtro`, compartidos en `stylesheets/base.css`).
- `herramientas/`: herramientas implementadas, una por archivo `<slug>.html`
  autocontenido (`convertidor-de-unidades`, `convertidor-imagenes`, `dj`, `editor-text`,
  `escaner-dispositivos`, `formateador-json`, `generador-codigo-qr`, `generador-favicons`,
  `generador-paletas`, `pizarra-dibujo`, `validador-de-yaml`).
  Siguen el patrón de `juegos/`: cargan `../../stylesheets/base.css` + `../programas.css`,
  `../../js/main.js` y `../../js/theme-init.js`, con sidebar y modal de Configuración
  completos. **Excepción documentada:** `dj.html` es una estación de música autocontenida
  con tema y estilos propios (`dj.css`); no carga el chrome compartido, usa su propio
  favicon inline y registra el service worker desde `dj.js`. No replicar esta excepción
  en herramientas nuevas. (Guía de creación en `docs/prompts/crear-programas-web.md`.)
- `data/herramientas.json`: manifiesto de la grilla (mismo esquema que `juegos.json`:
  `version` + `categories` + `items`; las entradas llevan `icon` y `technologies`).

El pre-pintado del tema y el buscador son **compartidos**: `js/theme-init.js` y
`js/buscador.js` (configurado por `data-attributes` del input `#buscador`); esta carpeta
no tiene copias propias.

## Reglas para agentes

1. **Contenido solo en español**: los títulos, descripciones, categorías y tecnologías de las
   tarjetas no se traducen; la interfaz compartida (barra, sidebar, modal) sí cambia ES/EN.
   Las cadenas de UI generadas en la grilla (`openTool`, `comingSoon`, `filterByCategory`,
   `allCategories` y `openInNewTab`) se toman de `translations.page[lang]`.
2. **Pre-pintado obligatorio**: toda página nueva debe cargar `js/theme-init.js` en el
   `<head>` antes de pintar (`../js/` desde esta carpeta, `../../js/` desde
   `herramientas/`), salvo las excepciones documentadas anteriores (`dj.html`), que
   gestionan su propio tema. Es el único script de pre-pintado del sitio: si se añade o cambia una
   clave de tema, actualizar `theme-init.js` y `js/utils/storage.js` a la vez (inventario
   en el [`AGENTS.md` raíz](../AGENTS.md#inventario-de-claves-de-localstorage)).
3. **Chrome compartido, no copiado**: las páginas cargan `../stylesheets/base.css` +
   `programas.css` (`../../…` y `../programas.css` desde `herramientas/`), el sidebar con
   rutas ajustadas (`../index.html#seccion` desde esta carpeta, `../../index.html#seccion`
   desde `herramientas/`) y `../js/main.js` como módulo, para reutilizar el modal de
   Configuración del portafolio.
4. **Nombres heredados en español**: las clases de esta carpeta (`buscador__campo`,
   `programa-card`, `filtro`, `categoria`) conservan español y BEM-like; no renombrar por
   consistencia con `controllers/` (que usa inglés) ni sin motivo real. Los estilos
   locales se rigen por `programas.css` y el acento adaptativo `--prog-accent`.
5. **Rutas relativas**: despliegue en subruta de GitHub Pages; ninguna ruta absoluta
   (`/images/…`, `/stylesheets/…`).
6. **Buscador y filtros**: el `js/buscador.js` compartido opera solo si existe
   `#buscador`; esta página lo configura con `data-buscador-tarjetas=".programa-card"` y
   su texto de placeholder. Filtra por término, actualiza el conteo del placeholder,
   oculta categorías vacías y usa `#sin-resultados`. Los chips `.filtro` se renderizan
   desde el manifiesto y sus clics los gestiona el buscador por delegación sobre
   `document` (sobreviven a los re-renders).
7. **Tarjetas**: las herramientas `wip` del manifiesto se marcan con
   `.programa-card__estado` y la etiqueta traducida `comingSoon`. Al implementar una, cambiar su
   entrada a `status: "published"` (la tarjeta se convierte en enlace automáticamente: botón
   `openTool` con `target="_blank"` + `rel="noopener noreferrer"` y la nota `openInNewTab`,
   con los estilos `.programa-card__abrir` / `.programa-card__nota` de `programas.css`),
   siguiendo el patrón de la grilla de juegos. Si la tarjeta describía
   otra cosa (categoría, tecnologías), alinearla con la herramienta real.
8. **Herramienta nueva**: crear `herramientas/<slug>.html` (kebab-case, autocontenida,
   sin recursos externos) y añadir su entrada a `data/herramientas.json` con
   `status: "published"` solo si está probada. (Guía en
   `docs/prompts/crear-programas-web.md`.)
9. **Sin firmas de IA**: una tarjeta no incluye marcas de agua, comentarios-firma,
   nombres de modelos de IA, código ni recursos propios de un agente. La única firma
   admitida está en el footer de la portada (`../index.html`), según la regla del
   [`AGENTS.md` raíz](../AGENTS.md#firma-de-agentes-ia-en-el-footer).

## Verificación local

Ver el procedimiento general en el [`AGENTS.md` raíz](../AGENTS.md#verificación-manual-para-agentes).
Específico de esta carpeta, tras cualquier cambio:

1. `python -m http.server 8000` desde la raíz del repositorio y abrir
   `http://localhost:8000/programas/`.
2. El tema (modo, acento, fondo, escala) se pinta sin parpadeo y coincide con el del portafolio.
3. El modal de Configuración funciona desde el footer del sidebar y persiste los cambios.
4. La grilla renderiza desde `data/herramientas.json`: 11 herramientas publicadas + 5
   "Próximamente", agrupadas en las categorías del manifiesto, con sus chips de filtro.
5. El buscador filtra por término, actualiza el conteo del placeholder y muestra/oculta
   `#sin-resultados`.
6. Los chips de categoría filtran las tarjetas y ocultan las categorías vacías.
7. Las tarjetas implementadas (paletas, favicons, código QR, convertidor de imágenes,
   convertidor de unidades, escáner de dispositivos, formateador JSON, estación de música
   DJ, editor de textos, pizarra de dibujo, validador YAML) abren su herramienta en pestaña
   nueva y las herramientas cargan sin errores de consola.
8. Enlace "Programas" en el sidebar funciona desde portada, juegos, mis-estudios y artículos.
9. Al cambiar ES/EN desde el modal, las cadenas de UI generadas en JS se re-renderizan
   (`Abrir`/`Open`, `Próximamente`/`Coming soon`, `Todas`/`All` y la nota de pestaña nueva) y el
   chip de categoría activo conserva `aria-pressed` y el filtro; las etiquetas del manifiesto
   siguen en español.
