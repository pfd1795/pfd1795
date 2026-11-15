# AGENTS.md — `programas/`

Reglas locales para agentes que trabajan en la sección Programas. Complementa el
[`AGENTS.md`](../AGENTS.md) raíz (arquitectura general, estilo de código y convenciones).

## Qué es esta carpeta

- `index.html`: índice de la sección con buscador, filtros por categoría y tarjetas de
  programas (propios). Se renderiza estáticamente en HTML.
- `js/tema.js`: pre-pintado del tema (script clásico síncrono).
- `js/buscador.js`: filtro de tarjetas del índice (script clásico con `defer`).
- `programas/programas/`: herramientas implementadas, una por archivo `<slug>.html`
  autocontenido (`convertidor-imagenes`, `generador-codigo-qr`, `generador-favicons`,
  `generador-paletas`). Siguen el patrón de `juegos/`: cargan `../../stylesheets/base.css` +
  `programas.css`, `../../javascripts/main.js` y `../js/tema.js`, con sidebar y modal de
  Configuración completos. (Guía de creación en `docs/prompts/crear-programas-web.md`.)

## Reglas para agentes

1. **Contenido solo en español**: las tarjetas no usan el sistema de traducciones
   (`translations.json`); la interfaz compartida (barra, sidebar, modal) sí cambia ES/EN.
2. **Pre-pintado obligatorio**: toda página nueva debe cargar `js/tema.js` en el `<head>` antes de
   pintar. Duplica las claves de `localStorage` de `utils/storage.js`: si se añade o cambia una
   clave de tema, actualizar `tema.js`, `theme-init.js` y `utils/storage.js` a la vez
   (inventario en el [`AGENTS.md` raíz](../AGENTS.md#inventario-de-claves-de-localstorage)).
3. **Chrome compartido, no copiado**: las páginas cargan `../stylesheets/base.css` +
   `programas.css`, el sidebar con rutas ajustadas (`../index.html#seccion` desde esta carpeta,
   `../../index.html#seccion` desde subpáginas) y `../javascripts/main.js` como módulo, para
   reutilizar el modal de Configuración del portafolio.
4. **Nombres heredados en español**: los scripts de esta carpeta y sus clases (`buscador__campo`,
   `programa-card`) conservan español y BEM-like; no renombrar por consistencia con `controllers/`
   (que usa inglés) ni sin motivo real. Los estilos locales se rigen por `programas.css` y el
   acento adaptativo `--prog-accent`.
5. **Rutas relativas**: despliegue en subruta de GitHub Pages; ninguna ruta absoluta (`/images/…`,
   `/stylesheets/…`).
6. **Buscador**: `buscador.js` opera solo si existen `#buscador`, `.programa-card` y las
   categorías; muestra el conteo filtrado en el `placeholder` del input, gestiona los chips
   `.filtro` y usa `#sin-resultados`. No acoplarlo a módulos ES.
7. **Tarjetas**: las herramientas aún no implementadas se marcan con `.programa-card__estado`
   "Próximamente". Al implementar una, convertir su tarjeta en enlace (botón `Abrir` con
   `target="_blank"` + `rel="noopener noreferrer"` y la nota "Se abre en una pestaña nueva",
   con los estilos `.programa-card__abrir` / `.programa-card__nota` de `programas.css`),
   siguiendo el patrón de la grilla de juegos. Si la tarjeta describía otra cosa
   (categoría, tecnologías), alinearla con la herramienta real.
8. **Sin firmas de IA**: una tarjeta no incluye marcas de agua, comentarios-firma, nombres de
   modelos de IA, código ni recursos propios de un agente. La única firma admitida está en el
   footer de la portada (`../index.html`), según la regla del [`AGENTS.md` raíz](../AGENTS.md#firma-de-agentes-ia-en-el-footer).

## Verificación local

Ver el procedimiento general en el [`AGENTS.md` raíz](../AGENTS.md#verificación-manual-para-agentes).
Específico de esta carpeta, tras cualquier cambio:

1. `python -m http.server 8000` desde la raíz del repositorio y abrir
   `http://localhost:8000/programas/`.
2. El tema (modo, acento, fondo, escala) se pinta sin parpadeo y coincide con el del portafolio.
3. El modal de Configuración funciona desde el footer del sidebar y persiste los cambios.
4. El buscador filtra por término, actualiza el contador y muestra/oculta `#sin-resultados`.
5. Los chips de categoría filtran las tarjetas y ocultan las categorías vacías.
6. Las tarjetas implementadas (paletas, favicons, código QR, convertidor de imágenes) abren su
   herramienta en pestaña nueva y las herramientas cargan sin errores de consola.
7. Enlace "Programas" en el sidebar funciona desde portada, juegos, mis-estudios y artículos.