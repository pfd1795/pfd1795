# Auditoría de documentación (consistencia interna)

Alcance: `AGENTS.md` (raíz y locales de `pages/my-games/`, `pages/my-studies/` y `pages/my-programs/`), `README.md`, `docs/README.md`, `docs/INVARIANTES.md`, `docs/LIMITACIONES.md` y `docs/prompts/*`. Método: lectura directa de los archivos, comprobación de enlaces y anclas y recuento desde los manifiestos. No se comparan firmas, APIs ni citas contra el código: eso corresponde a la verificación de veracidad.

## Resultado global

- Enlaces Markdown relativos y anclas del alcance: ninguno roto.
- Conteos publicados verificados por lectura directa: 42 artículos, 20 juegos y 11 herramientas publicadas + 5 `wip`; 29 artículos con versión en inglés y 13 sin ella. Coinciden entre `README.md:14-15`, `docs/LIMITACIONES.md:37,50`, `pages/my-studies/AGENTS.md:97`, `pages/my-programs/AGENTS.md:88-89` y `docs/informes/trabajo-pendiente.md:3`.
- Unicidad: `docs/` es documentación para agentes en español salvo `docs/HUMANOS.md`; los documentos para personas son `README.md` y `docs/HUMANOS.md`; informes, planes y trackers viven solo en `docs/informes/`.
- No hay plazos, estimaciones, códigos de hallazgo, historial ni trackers paralelos en el alcance: las únicas apariciones de esos términos son las reglas que los prohíben.

## Hallazgos

### Roster incompleto en el prompt de estudios

- **Ubicación:** `docs/prompts/crear-estudios.md:178-219`.
- **Evidencia:** el roster «Artículos ya publicados» lista 36 entradas, frente a las 42 entradas `published` de `pages/my-studies/data/articulos.json` (cifra publicada en `README.md:14`, `docs/LIMITACIONES.md:37` y `pages/my-studies/AGENTS.md:97`). Faltan `fundamentos-ciberseguridad`, `phishing-ingenieria-social`, `malware-ransomware`, `identidad-y-mfa`, `antivirus-edr` y `respuesta-incidentes`.
- **Corrección propuesta:** añadir esas seis entradas al roster con su título y su archivo `<slug>/index.html`.

### Convención de archivos y rutas contradictoria en el prompt de estudios

- **Ubicación:** `docs/prompts/crear-estudios.md:71,77-79,99,233,370-374,571,576,638`.
- **Evidencia:** el propio prompt define el slug «sin la extensión» en `:233` y usa `./my-studies/SLUG/index.html` en `:638`, pero sus ejemplos (`:71,77-79`) y los enlaces internos (`:370-374`) usan `<slug>.html` (`css.html`, `javascript.html#dom`). La tabla de rutas de `:99` y el esqueleto canónico de `:571,576` indican `../../pages/my-games/index.html` y `../../pages/my-programs/index.html` desde `pages/my-studies/<slug>/`, lo que resuelve a `pages/pages/my-games/index.html` y `pages/pages/my-programs/index.html` en lugar de las rutas correctas. `pages/my-studies/AGENTS.md:12,97` documenta los artículos como `<slug>/index.html`.
- **Corrección propuesta:** unificar todo el prompt a `<slug>/index.html`, usar `../../my-games/index.html` y `../../my-programs/index.html` en `:99,571,576` y mostrar ejemplos de slug sin extensión.

### Fichas de estudio desalineadas con el roster y el tracker

- **Ubicación:** `docs/prompts/fichas-estudios.md:18,327-329`, frente a `docs/prompts/crear-estudios.md:178-219,274` y `docs/informes/trabajo-pendiente.md:3`.
- **Evidencia:** las 15 fichas cubren slugs que ya figuran en el roster de artículos publicados, y el prompt exige avisar y no repetir cuando una ficha pide un artículo existente (`:274`). El tracker lista 13 temas pendientes de traducción al inglés: 7 coinciden con las fichas y 6 no tienen ficha (`fundamentos-ciberseguridad`, `phishing-ingenieria-social`, `malware-ransomware`, `identidad-y-mfa`, `antivirus-edr`, `respuesta-incidentes`); 8 de las 15 fichas no figuran en el tracker (`logica-booleana`, `c-memoria`, `frameworks-frontend`, `frameworks-backend`, `solid`, `editores-ides-depuracion`, `empaquetado-despliegue` y `testing`). La integración de `:327-329` escribe `./my-studies<slug>/index.html`, sin la barra que sí aparece en `crear-estudios.md:638`.
- **Corrección propuesta:** retirar las fichas de artículos ya publicados o sustituirlas por fichas de traducción alineadas con los 13 slugs del tracker, y corregir la ruta a `./my-studies/<slug>/index.html`.

### Alcance mal descrito del prompt de videojuegos

- **Ubicación:** `docs/README.md:42-43`, `docs/prompts/crear-videojuegos.md:3-5` y `pages/my-games/AGENTS.md:24-47`.
- **Evidencia:** el índice presenta `crear-videojuegos.md` como instrucciones para generar un juego «integrado en el portafolio», mientras el prompt se declara autocontenido y ajeno a cualquier proyecto concreto; no incluye manifiesto, portada, chrome compartido ni PWA, que sí exige la guía local de juegos.
- **Corrección propuesta:** alinear la descripción de `docs/README.md` con el carácter genérico del prompt, o ampliar el prompt con el canon de integración de `pages/my-games/AGENTS.md`.

### Citas internas `archivo:línea` desactualizadas en invariantes

- **Ubicación:** `docs/INVARIANTES.md:25,31,37,43,49`.
- **Evidencia:** `:25` cita `docs/LIMITACIONES.md:42` como evidencia del CV, que está en `docs/LIMITACIONES.md:44` (la línea 42 describe el retorno desde los juegos a la grilla). `:31` cita `pages/my-games/AGENTS.md:33-36` para las claves de récord, regla situada en `:35-38`; `:37` cita `:19-20` para el carácter autocontenido, regla situada en `:21-23`. Además, `:31` y `:49` citan `AGENTS.md:374-396` para el inventario de `localStorage` (que va en `375-397`) y `:43` cita `AGENTS.md:481-487` para el dimensionado (que va en `482-488`).
- **Corrección propuesta:** actualizar las citas a `docs/LIMITACIONES.md:44`, `pages/my-games/AGENTS.md:35-38`, `pages/my-games/AGENTS.md:21-23`, `AGENTS.md:375-397` (en `:31` y `:49`) y `AGENTS.md:482-488` (en `:43`).

### Media query del esqueleto de videojuegos

- **Ubicación:** `docs/prompts/crear-videojuegos.md:546,811`.
- **Evidencia:** el texto describe el media query táctil/móvil como `(hover: none) and (pointer: coarse), (max-width: 600px)`, pero el esqueleto canónico solo declara `@media (max-width: 600px)`.
- **Corrección propuesta:** usar la misma condición en la descripción y en el esqueleto.

## Verificado como correcto

- Estructura de documentación: `docs/informes/` es el único lugar de informes y del tracker; no hay planes, fases ni auditorías activas fuera de esa carpeta.
- Numeración correlativa de las reglas locales en `pages/my-games/AGENTS.md`, `pages/my-studies/AGENTS.md` y `pages/my-programs/AGENTS.md`.
- Anclas usadas por las guías locales (`#firma-de-agentes-ia-en-el-footer`, `#interacción-con-el-usuario-mediante-menús`, `#verificación-manual-para-agentes`, `#inventario-de-claves-de-localstorage`, `#canon-visual-retro-arcade`, `#dimensionado-del-canvas-marco-común` y `#cómo-agregar-un-juego`) y enlaces relativos a encabezados existentes.
- Cifras publicadas coherentes entre todos los documentos que las mencionan; el inventario de `localStorage` y el mapa de módulos conservan una terminología coherente entre la guía raíz y las guías locales. Su conformidad con el código no se evalúa en esta auditoría.
- Convención de un solo `<h1>` por página: solo `index.html` lleva `<h1>Pablo Diaz</h1>` en el navbar y las subpáginas usan `.navbar-name` (`AGENTS.md:518`); ausencia de comentarios en los esqueletos y presencia del enlace «Programas» en ambos esqueletos de chrome compartido.
