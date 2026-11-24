# Auditoría del código del proyecto

Alcance: HTML, CSS, JavaScript y manifiestos JSON del portafolio, incluidas las páginas de juego y
las herramientas de `programas/`. Método: lectura directa y `grep -n` antes de cada afirmación,
servido HTTP en `http://localhost:8000` y carga de las 65 páginas con Chrome headless por CDP para
revisar consola, red, búsqueda, filtros, idioma y preferencias. No se han aplicado correcciones.

## Resultado global

- 64 de 65 páginas cargan sin errores de consola ni de red. La excepción es `/juegos/arkanoid/`,
  que solicita un `/favicon.ico` inexistente.
- Todos los archivos JavaScript pasan `node --check` (incluidos 53 bloques inline); todos los JSON
  son válidos; todos los recursos locales citados existen, salvo rutas dentro de ejemplos de
  código y cadenas generadas en JS.
- Conteos verificados contra los manifiestos: 20 juegos `published`, 28 artículos `published`,
  11 herramientas `published` y 5 `wip`. Los archivos de las entradas `published` existen y el
  precache del Service Worker cubre todas las páginas.
- Sin claves `localStorage` colisionantes entre el sitio y los juegos; sin dependencias externas;
  sin rutas absolutas reales; sin `target="_blank"` sin `rel="noopener noreferrer"`.

## Hallazgos

### 1. El buscador de juegos no encuentra títulos ni descripciones

- **Ubicación:** `js/controllers/juegos/fnJuegos.js:82` y `js/buscador.js:86-96`.
- **Evidencia:** `CardGame()` solo escribe `data-categoria` en el `<article>`; el título y la
  descripción se pintan en `fnJuegos.js:96-98`, pero no se exponen como atributos. El buscador
  compartido construye su texto de búsqueda con `data-titulo`, `data-descripcion`, `data-claves` y
  `data-categoria`. Con la página cargada, `tetris` y `neon` devuelven 0 de 20 tarjetas y muestran
  `#sin-resultados`, mientras que `arcade` devuelve 7 y `puzzle` 3 (coincidencias solo por género).
- **Impacto:** el placeholder de `juegos/index.html:69` promete buscar «titulo, descripcion o
  genero», pero dos de los tres criterios no funcionan. La función de búsqueda de la grilla de
  juegos queda inutilizable para el caso habitual (buscar por nombre).
- **Corrección sugerida:** añadir `data-titulo`, `data-descripcion` y `data-claves` al `<article>`
  en `CardGame()`, con `title`, `description` y los términos útiles del manifiesto (género,
  tecnologías y controles) escapados con `esc()`. Verificar con `tetris`, `neon` y un género.

### 2. La grilla de programas no se actualiza al cambiar de idioma

- **Ubicación:** `js/controllers/sidebar/fnChangeLanguage.js:98-106` y
  `js/controllers/programas/fnProgramas.js:141-152`.
- **Evidencia:** `changeLanguage()` importa y llama solo a `reloadHomeContent()` y
  `reloadGamesContent()`; `fnProgramas.js` exporta únicamente `GridProgramas()`. Al conmutar a EN
  desde el modal de Configuración en `/programas/`, los chips siguen diciendo «Todas» y «Linux»,
  los botones «Abrir», el estado «Próximamente» y la nota «Se abre en una pestaña nueva». La
  categoría activa y el filtro se conservan, pero el texto no.
- **Impacto:** las cadenas de UI generadas en JS quedan en español dentro de una interfaz marcada
  como `lang="en"`. La limitación ya se describe en `AGENTS.md:549`, pero contradice la sección de
  programas (`AGENTS.md:469`), que atribuye esas cadenas a `translations.page[lang]`.
- **Corrección sugerida:** extraer de `GridProgramas()` una función `reloadProgramasContent()`
  que durante el re-render conserve la categoría activa, exportarla y llamarla desde el bloque
  `rerender` de `fnChangeLanguage.js`, junto a las otras dos recargas. Actualizar
  `AGENTS.md:549` y el mapa de módulos con el nuevo export.

### 3. El buscador de las tres secciones sigue en español con `lang="en"`

- **Ubicación:** `juegos/index.html:67,69,74`, `programas/index.html:60,62,66` y
  `mis-estudios/index.html:60,62,66`.
- **Evidencia:** el `aria-label` del input, el valor de `data-buscador-placeholder` y el texto de
  `#sin-resultados` son literales en español, sin `data-lang` ni `data-i18n-aria-label`. Además,
  `js/buscador.js:45` lee el placeholder una sola vez al iniciar. La verificación con
  `localStorage.language = "en"` muestra «Buscar juegos», «buscador juegos: titulo, descripcion o
  genero (20 de 20 juegos)» y «No hay juegos que coincidan…» en las tres páginas.
- **Impacto:** el anuncio para lectores de pantalla y los mensajes del buscador no siguen el idioma
  elegido, aunque el resto de la interfaz sí cambie.
- **Corrección sugerida:** añadir las claves a `js/lang/translations.json` (sección `page`),
  marcar el input y `#sin-resultados` con los atributos `data-lang` / `data-i18n-aria-label`,
  mover el texto del placeholder a una clave con `{visibles}` y `{total}`, y hacer que
  `buscador.js` vuelva a aplicar el placeholder traducido cuando cambie el idioma.

### 4. Accesibilidad insuficiente en el secuenciador de `dj.html`

- **Ubicación:** `programas/herramientas/dj.js:509-540,964,966`.
- **Evidencia:** `vol.id` y `pan.id` reciben `''` cuando el control no es máster, lo que genera 28
  atributos `id=""` en el DOM. Las celdas creadas en `buildSeq()` (`.rcell`, `.cell` y `.rollc`)
  no tienen texto ni nombre accesible: la inspección CDP cuenta 3120 botones sin nombre.
- **Impacto:** `id=""` es inválido y no aporta ninguna referencia; los 3120 botones no tienen
  nombre accesible para lectores de pantalla y los controles de mezcla pierden su etiqueta
  programática.
- **Corrección sugerida:** no asignar `id` cuando no se necesite y conservar el `aria-label`
  existente; dar a cada celda un `aria-label` con pista y paso (o un `role="grid"` con filas y
  encabezados etiquetados en el contenedor del secuenciador).

### 5. `snake` no tiene `<h1>`

- **Ubicación:** `juegos/snake/index.html:233-254`.
- **Evidencia:** es el único juego sin elemento `<h1>`; el título «Snake Retro» solo existe en el
  `<title>` y en el `aria-label` del canvas (239). El resto de juegos sí incluyen un `<h1>` visible
  (p. ej. `juegos/tetris/index.html:194`).
- **Impacto:** la página de juego carece de encabezado de nivel 1 y difiere del patrón del resto
  de la grilla.
- **Corrección sugerida:** añadir un `<h1>` con el nombre del juego al iniciar el cuerpo, visible
  o con la clase de ocultación accesible ya usada en el proyecto, sin modificar el canvas ni su
  lógica.

### 6. `AGENTS.md` describe mal el estado `wip` de los manifiestos

- **Ubicación:** `AGENTS.md:354`; en contraste con `js/controllers/programas/fnProgramas.js:80-89`,
  `js/controllers/mis-estudios/fnMisEstudios.js:53-73` y `programas/AGENTS.md:61-63`.
- **Evidencia:** la frase «Solo se publican entradas con `status: "published"` y slug válido»
  se aplica a las tres grillas. `herramientas.json` tiene 5 entradas `wip` y `fnProgramas.js`
  genera para ellas una tarjeta con «Próximamente»; `fnMisEstudios.js` hace lo mismo con el mismo
  esquema. `programas/AGENTS.md` sí describe correctamente ese comportamiento.
- **Impacto:** un agente que siga `AGENTS.md:354` puede concluir que las entradas `wip` no se
  renderizan y omitir su manejo al tocar los controladores.
- **Corrección sugerida:** acotar la frase a `juegos/data/juegos.json` y añadir que programas y
  mis-estudios renderizan también las entradas `wip` como «Próximamente» sin enlace.

### 7. Las páginas de juego no declaran icono

- **Ubicación:** `juegos/arkanoid/index.html:1-9` y otras 18 carpetas de juego, incluida
  `juegos/_template/index.html`.
- **Evidencia:** 19 de los 21 `index.html` de `juegos/` no contienen `<link rel="icon">`; solo
  `ajedrez/` y `damas/` usan `href="data:,"`. No existe `/favicon.ico` en la raíz, por lo que el
  navegador emite una petición 404; se ha observado en la carga de `/juegos/arkanoid/`.
- **Impacto:** ruido en la pestaña de red y petición fallida en cada juego abierto. No afecta a la
  funcionalidad.
- **Corrección sugerida:** añadir `<link rel="icon" type="image/svg+xml" href="../favicon.svg">`
  en la plantilla y en las páginas de juego que no lo tengan, o un `href="data:,"` si se prefiere
  no mostrar icono.

### 8. El cierre del sidebar desde el overlay no devuelve el foco

- **Ubicación:** `js/controllers/sidebar/sidebar.controller.js:47-59,65`.
- **Evidencia:** `closeMenu()` solo llama a `openButton?.focus()` si
  `sidebar.contains(document.activeElement)`. Al cerrar haciendo clic en `.sidebar-overlay`, el
  foco ya no está dentro del sidebar, así que no se restaura. `AGENTS.md:465` exige devolver el
  foco al botón que abrió el menú.
- **Impacto:** una persona que navega con teclado pierde su posición al cerrar el menú con el ratón
  o con un toque fuera de él.
- **Corrección sugerida:** guardar el elemento activo en `openMenu()` y usarlo como destino
  incondicional de `focus()` en `closeMenu()`, con `openButton` como respaldo.

## Observaciones no accionables

- Los 26 enlaces locales marcados como rotos por el escaneo estático están dentro de bloques
  `<pre><code>` o de cadenas que generan URLs; no son referencias reales.
- Los comentarios heredados en JS/CSS y los tokens CSS reservados sin consumo directo se tratan
  como estado actual tolerado por `AGENTS.md`; no se proponen cambios.
- Existe un caso límite en el que `theme-color` y `theme-color-value` podrían quedar
  desincronizados si se perdiera una de las dos claves; no se ha reproducido en una instalación
  normal.
- Las firmas de modelos del footer de `index.html` están todas en el único lugar permitido.

## Cierre

El informe solo entrega hallazgos y correcciones propuestas. Cada ítem se registra por separado en
`docs/informes/trabajo-pendiente.md`; no se han modificado archivos de código ni creado commits.
