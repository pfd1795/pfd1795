# Trabajo pendiente

- Actualizar el roster de artículos publicados en `docs/prompts/crear-estudios.md` (añadir `editores-ides-depuracion` y `empaquetado-despliegue`) y añadir el paso de mantenerlo en el bloque de integración.
- Retirar de `docs/prompts/fichas-estudios.md` la columna de estado y la sección de orden de publicación; trasladar los ocho temas nuevos al tracker.
- Añadir «Empaquetado y despliegue» a la enumeración de artículos de `mis-estudios/AGENTS.md`.
- Sustituir el número de `CACHE_NAME` hardcodeado por una instrucción relativa en `docs/prompts/crear-estudios.md` y `docs/prompts/fichas-estudios.md`.
- Añadir `docs/informes/` al árbol de `docs/` en `AGENTS.md`.
- Añadir `programas/AGENTS.md` a la lista de documentación a mantener en `AGENTS.md`.
- Completar los árboles de estructura de `AGENTS.md` y `README.md` con `manifest.json`, `service-worker.js` y `favicon.svg`.
- Ajustar la redacción de `docs/README.md` sobre `docs/informes/`.
- Integrar o retirar `programas/herramientas/cuerpo-humano.html`: si se integra, entrada en `herramientas.json`, precache del SW con subida de `CACHE_NAME`, documentación en `programas/AGENTS.md` y cambio del `<h1>` del navbar por `.navbar-name`; si se retira, eliminar el archivo.
- Añadir `id="figura-cuerpo"` al `<svg>` de `programas/herramientas/cuerpo-humano.html` si la herramienta se conserva.

- Añadir un `<h1>` accesible a `juegos/snake/index.html`.
- Añadir `<link rel="icon">` a `juegos/_template/index.html` y a las 18 páginas de juego que no lo declaran.
