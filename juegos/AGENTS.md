# AGENTS.md — `juegos/`

Reglas locales para agentes que trabajan en esta carpeta. Complementa el [`AGENTS.md`](../AGENTS.md)
raíz (arquitectura general, estilo de código y convenciones) y la guía completa
[`juegos/README.md`](./README.md), que es la referencia de integración de juegos.

## Qué es esta carpeta

- `index.html`: la grilla de juegos (chrome del portafolio). Se renderiza desde
  [`../javascripts/data/juegos.json`](../javascripts/data/juegos.json) con `controllers/juegos/`;
  se monta en `main.js` solo si existe `.juegos-grid`.
- `_template/`: plantilla para juegos nuevos (no aparece en la grilla).
- `<slug>/`: un juego por carpeta, autocontenido en un único `index.html` (+ `README-juego.md`).

## Reglas para agentes

1. **No editar el código de un juego** para adaptarlo al chrome del portafolio. Los juegos son
   estáticos y autocontenidos dentro de este repositorio: todo el código vive en
   `<slug>/index.html`.
2. **Canon visual retro-arcade**: todos los juegos comparten el mismo aspecto (paleta neón oscura
   `#0d0221`/`#1a1033` + neones verde/rosa/cian/amarillo/violeta, tipografía `"Courier New"`,
   modal de opciones nativo `<dialog id="options">`, overlay `.scanlines` CRT, botones cian
   transparente). La referencia canónica es [`snake/index.html`](./snake/index.html) y la
   plantilla [`_template/index.html`](./_template/index.html); la especificación completa está en
   [`README.md` (sección "Canon visual retro-arcade")](./README.md#canon-visual-retro-arcade).
   Un juego nuevo debe copiar ese chrome; no introducir paletas ni modales propios.
   El escenario comparte además el dimensionado canónico (marco máximo 900×900 px CSS con
   `--game-max`/`--game-chrome` y buffer nítido vía `renderScale`), definido en
   [`README.md` (sección "Dimensionado del canvas")](./README.md#dimensionado-del-canvas-marco-común);
   un juego nuevo no cambia la resolución lógica para achicar o agrandar el marco.
3. **El `slug` es el identificador**: carpeta en kebab-case, entrada en el manifiesto y clave de
   récord `<slug>_best_v1` en `localStorage`. No renombrar slugs publicados sin actualizar los
   tres. Si un juego cambia de clave de récord, debe migrar la clave antigua automáticamente
   (copiar el valor a la clave nueva y borrar la antigua al abrir el juego).
4. **Manifiesto** (`javascripts/data/juegos.json`): un solo juego por entrada; textos `es`/`en`
   en el objeto; `status: "published"` solo si el juego está probado; `covers` con rutas relativas
   a `juegos/index.html` (una imagen = estática; 2–3 = carrusel por CSS; ninguna = placeholder).
   El filtro de la grilla solo publica entradas con `status: "published"` y slug válido.
5. **Integración de un juego nuevo**: seguir el paso a paso y el checklist de calidad de
   [`README.md` (sección "Cómo agregar un juego")](./README.md#cómo-agregar-un-juego), incluyendo
   comprobar que el `index.html` del juego no carga recursos externos.
6. **No introducir build, frameworks ni dependencias** en esta grilla ni en los juegos.
7. **Portadas nuevas**: el procedimiento para generarlas es una herramienta a pedido explícito en
   [`../docs/prompts/portadas-juegos.md`](../docs/prompts/portadas-juegos.md); no leerla salvo
   petición del desarrollador.

## Verificación local

Ver el procedimiento general en el [`AGENTS.md` raíz](../AGENTS.md#verificación-manual-para-agentes).
Específico de esta carpeta, tras cualquier cambio:

1. `python -m http.server 8000` desde la raíz del repositorio y abrir `http://localhost:8000/juegos/`.
2. La grilla muestra solo los juegos `published`, con portada, título, descripción y controles
   traducidos según el idioma (`fnJuegos.js` re-renderiza al cambiar ES/EN).
3. Cada tarjeta lanza su juego en pestaña nueva (`target="_blank" rel="noopener noreferrer"`) y el
   juego arranca sin errores y guarda su récord con `<slug>_best_v1`.
4. Si se tocó el tema o el modal, comprobar que la grilla comparte modo/acento con la portada.
5. Si se tocó un juego, comprobar que sigue el canon visual: paleta neón oscura, `h1` verde con
   glow, botones cian transparente, modal `<dialog id="options">` (abre/cierra con ✕, ESC y clic
   en el backdrop) y overlay `.scanlines`. El récord anterior se conserva tras la migración de
   clave (probar con una clave antigua pre-cargada si se cambió la clave).
6. Si se tocó el dimensionado, comprobar en escritorio (1920×1080) y móvil (390×844) que no hay
   scroll, que los controles táctiles siguen visibles y que el buffer del canvas iguala el
   tamaño visible × DPR (mínimo la resolución lógica; ver la sección "Dimensionado del canvas"
   del README).
