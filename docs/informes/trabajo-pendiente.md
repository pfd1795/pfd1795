# Trabajo pendiente

- Actualizar el roster de artículos publicados en `docs/prompts/crear-estudios.md` (añadir `editores-ides-depuracion` y `empaquetado-despliegue`) y añadir el paso de mantenerlo en el bloque de integración.
- Retirar de `docs/prompts/fichas-estudios.md` la columna de estado y la sección de orden de publicación; trasladar los ocho temas nuevos al tracker.
- Añadir «Empaquetado y despliegue» a la enumeración de artículos de `mis-estudios/AGENTS.md`.
- Sustituir el número de `CACHE_NAME` hardcodeado por una instrucción relativa en `docs/prompts/crear-estudios.md` y `docs/prompts/fichas-estudios.md`.
- Añadir `docs/informes/` al árbol de `docs/` en `AGENTS.md`.
- Añadir `programas/AGENTS.md` a la lista de documentación a mantener en `AGENTS.md`.
- Completar los árboles de estructura de `AGENTS.md` y `README.md` con `manifest.json`, `service-worker.js` y `favicon.svg`.
- Ajustar la redacción de `docs/README.md` sobre `docs/informes/`.
- Añadir `data-titulo`, `data-descripcion` y `data-claves` a las tarjetas de `js/controllers/juegos/fnJuegos.js` para que el buscador encuentre juegos por nombre y descripción.
- Extraer `reloadProgramasContent()` en `js/controllers/programas/fnProgramas.js`, llamarla desde `fnChangeLanguage.js` al cambiar idioma y actualizar el mapa de módulos y la limitación de i18n de `AGENTS.md`.
- Integrar o retirar `programas/herramientas/cuerpo-humano.html`: si se integra, entrada en `herramientas.json`, precache del SW con subida de `CACHE_NAME`, documentación en `programas/AGENTS.md` y cambio del `<h1>` del navbar por `.navbar-name`; si se retira, eliminar el archivo.
- Añadir `id="figura-cuerpo"` al `<svg>` de `programas/herramientas/cuerpo-humano.html` si la herramienta se conserva.
- Traducir el buscador de juegos, programas y estudios: claves nuevas en `translations.json`, atributos `data-lang` y `data-i18n-aria-label`, y placeholder actualizable desde `js/buscador.js` al cambiar idioma.
- Eliminar los `id=""` de `programas/herramientas/dj.js` y dar nombre accesible a las celdas del secuenciador.
- Añadir un `<h1>` accesible a `juegos/snake/index.html`.
- Corregir `AGENTS.md:354` para acotar «solo se publican entradas `published`» a los juegos y documentar que programas y mis-estudios muestran las `wip` como «Próximamente».
- Añadir `<link rel="icon">` a `juegos/_template/index.html` y a las 18 páginas de juego que no lo declaran.
- Guardar el elemento activo al abrir el sidebar y restaurarlo al cerrar desde el overlay en `js/controllers/sidebar/sidebar.controller.js`.