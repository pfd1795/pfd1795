# AGENTS.md — `programas/`

Reglas locales para agentes que trabajan en la sección Programas. Complementa el
[`AGENTS.md`](../AGENTS.md) raíz (arquitectura general, estilo de código y convenciones).

## Qué es esta carpeta

- `index.html`: índice de la sección con buscador y la grilla de programas; se renderiza
  desde [`data/herramientas.json`](./data/herramientas.json) con
  `js/controllers/programas/` (se monta en `main.js` solo si existe `.programas-grid`).
- `programas.css`: estilos específicos de la sección (tarjetas `.programa-card*` y override
  de acento `--prog-accent` para los componentes de la sección).
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
   tarjetas no se traducen; la interfaz compartida (barra, sidebar, modal) sí cambia ES/EN,
   incluido el buscador (`aria-label`, placeholder y `#sin-resultados`).
   Las cadenas de UI generadas en la grilla (`openTool` y `comingSoon`)
   se toman de `translations.page[lang]`.
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
   `programa-card`, `categoria`) conservan español y BEM-like; no renombrar por
   consistencia con `controllers/` (que usa inglés) ni sin motivo real. Los estilos
   locales se rigen por `programas.css` y el acento adaptativo `--prog-accent`.
5. **Rutas relativas**: despliegue en subruta de GitHub Pages; ninguna ruta absoluta
   (`/images/…`, `/stylesheets/…`).
6. **Buscador**: el `js/buscador.js` compartido opera solo si existe
   `#buscador`; esta página lo configura con `data-buscador-tarjetas=".programa-card"` y
   su texto de placeholder. Filtra por término, oculta categorías vacías y usa
   `#sin-resultados`. Los textos viven en
   `translations.page[lang]` (claves `searchPrograms*`) y se actualizan con el evento
   `site:languagechange`.
7. **Tarjetas**: todas las tarjetas muestran el icono del campo `icon` del manifiesto (con
   `code.svg` como respaldo) a la izquierda del título, dentro de `.programa-card__cabecera` con
   `.programa-card__icono`; es decorativo (`alt=""`). Las herramientas `wip` añaden
   `.programa-card__estado` con la etiqueta traducida `comingSoon`. Al implementar una, cambiar su
   entrada a `status: "published"`: la tarjeta pasa a mostrar descripción y botón `openTool` que
   navega en la misma pestaña (estilo `.programa-card__abrir`), sin `target="_blank"`. La
   categoría y las tecnologías no se renderizan: quedan en `data-categoria` y `data-claves` para el
   buscador.
8. **Herramienta nueva**: crear `herramientas/<slug>.html` (kebab-case, autocontenida,
   sin recursos externos) y añadir su entrada a `data/herramientas.json` con
   `status: "published"` solo si está probada. (Guía en
   `docs/prompts/crear-programas-web.md`.)
9. **Sin firmas de IA**: una tarjeta no incluye marcas de agua, comentarios-firma,
   nombres de modelos de IA, código ni recursos propios de un agente. La única firma
   admitida está en el footer de la portada (`../index.html`), según la regla del
   [`AGENTS.md` raíz](../AGENTS.md#firma-de-agentes-ia-en-el-footer).

10. **Interacción con el usuario**: sigue la regla del [`AGENTS.md` raíz](../AGENTS.md#interacción-con-el-usuario-mediante-menús): usar `question` con opciones sugeridas en cada decisión y cierre.

## Verificación local

Ver el procedimiento general en el [`AGENTS.md` raíz](../AGENTS.md#verificación-manual-para-agentes).
Específico de esta carpeta, tras cualquier cambio:

1. `python -m http.server 8000` desde la raíz del repositorio y abrir
   `http://localhost:8000/programas/`.
2. El tema (modo, acento, fondo, escala) se pinta sin parpadeo y coincide con el del portafolio.
3. El modal de Configuración funciona desde el footer del sidebar y persiste los cambios.
4. La grilla renderiza desde `data/herramientas.json`: 11 herramientas publicadas + 5
   "Próximamente", agrupadas en las categorías del manifiesto.
5. El buscador filtra por término y muestra/oculta `#sin-resultados`.
6. El buscador oculta las categorías vacías.
7. Las tarjetas implementadas (paletas, favicons, código QR, convertidor de imágenes,
   convertidor de unidades, escáner de dispositivos, formateador JSON, estación de música
   DJ, editor de textos, pizarra de dibujo, validador YAML) abren su herramienta en la misma
   pestaña, las herramientas cargan sin errores de consola y «Atrás» devuelve a la grilla.
8. Enlace "Programas" en el sidebar funciona desde portada, juegos, mis-estudios y artículos.
9. Al cambiar ES/EN desde el modal, las cadenas de UI generadas en JS se re-renderizan
   (`Abrir`/`Open` y `Próximamente`/`Coming soon`); las etiquetas del manifiesto siguen en español.
10. El buscador sigue filtrando por tecnología y categoría aunque esas etiquetas ya no se
   muestren en la tarjeta.
