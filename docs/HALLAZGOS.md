# Hallazgos de auditoría — Portafolio pfd1795

Informe generado por auditoría de código (sin correcciones aplicadas). Destinado a un
agente de corrección: cada hallazgo tiene ID, gravedad, ubicación, evidencia y corrección
propuesta. Las reglas del repositorio siguen vigentes: vanilla JS/CSS, rutas relativas,
sin frameworks, commits manuales del desarrollador, y cualquier cambio en temas se
refleja a la vez en `utils/storage.js`, `theme-init.js` y `mis-estudios/js/tema.js`.

Fecha: 2026-11-05 · Alcance: núcleo completo + muestreo de juegos (`snake/`, `ritmo/`,
`match-3/`) + chequeo transversal de los 15 juegos. Método: lectura de código +
verificación automatizada por HTTP (`python3 -m http.server`), cruce de claves de
traducción, selectores CSS y tokens.

## Resumen

| Gravedad | Cantidad | Ids |
| --- | --- | --- |
| Bug | 4 | H-01, H-02, H-03, H-04 |
| Lógica dudosa | 8 | H-05 … H-12 |
| Código muerto | 3 | H-13, H-14, H-15 |
| Sugerencias | 2 | H-16, H-17 |

El sitio carga y funciona: sin 404, sin rutas absolutas, sin recursos externos en juegos,
canon visual y claves de récord de los 15 juegos correctos. Los hallazgos molestos son de
detalle, robustez y limpieza, no bloqueantes.

## Catálogo de hallazgos

### H-01 — Bug (.saltar usa un token que solo existe en la enciclopedia)

- **Gravedad:** bug (visual, impacto bajo).
- **Ubicación:** `stylesheets/base.css:1029` · definición en `stylesheets/enciclopedia.css:8-13`.
- **Evidencia:** la clase `.saltar` (enlace "Saltar al contenido", compartida por portada,
  `juegos/` y `mis-estudios/`) declara `color: var(--enc-accent);`. `--enc-accent` se define
  solo en `enciclopedia.css`, que no cargan `index.html` ni `juegos/index.html`. En esas
  páginas el color cae al valor heredado del texto en lugar del acento: la intención del
  token falla en 2 de las 3 páginas que la usan.
- **Corrección propuesta:** en `base.css`, usar fallback del sistema de temas:
  `color: var(--enc-accent, var(--theme-color));`. Alternativa: mover la definición de
  `--enc-accent` a `base.css` (en `:root` y `html.dark`) y dejar que `enciclopedia.css`
  solo la consuma. La primera opción es una línea y no toca la enciclopedia.

### H-02 — Bug latente (match-3 duplica cada fila del grid)

- **Gravedad:** bug latente (no rompe la partida actual, pero rompe el contrato de datos).
- **Ubicación:** `juegos/match-3/index.html:286` y `:292` (`initBoard()`).
- **Evidencia:** dentro de `for (let r...)` se hace `grid.push(row)` al crear la fila y
  **otra vez** `grid.push(row)` después de llenarla. Al terminar, `grid` tiene 16
  referencias (cada fila duplicada en `r` y `r + 8`). Todo el código itera con `r < ROWS`
  (8), por lo que las referencias sobrantes nunca se leen — pero cualquier lógica futura
  que asuma `grid.length === ROWS` (o lea el segundo bloque de filas) tropezará, y el
  recolector de basura no libera porque el doble push retiene lo mismo. Esto
  contradice el uso en el resto del juego (caídas, `snapCells`, `doShuffle`), que sí
  presuppone 8 filas.
- **Corrección propuesta:** eliminar el `grid.push(row)` duplicado (línea 292) y verificar
  la partida completa tras el cambio (intercambio, especiales, cataratas, mezcla).

### H-03 — Bug (comas visibles entre habilidades en el modal de estudios)

- **Gravedad:** bug (visual/HTML, impacto bajo).
- **Ubicación:** `javascripts/controllers/home/fnHome.js:110`.
- **Evidencia:** `const skillsList = selectedEducation.skills.map(skill => `<li>${skill}</li>`).join(", ");`
  produce `<li>A</li>, <li>B</li>, …` Los nodos de texto `", "` entre `<li>` dentro de
  `<ul>` son visibles (se pintan comas entre los ítems) y el HTML es inválido.
- **Corrección propuesta:** `join("")` en lugar de `join(", ")` (el `<ul>` del modal ya
  se muestra inline con separación propia, ver `base.css` sección modal `ul { gap }`).

### H-04 — Bug de robustez (ritmo crashea si no hay AudioContext)

- **Gravedad:** bug (robustez; solo sin soporte de Web Audio).
- **Ubicación:** `juegos/ritmo/index.html:410` (`startSong`), con `AudioEngine.init()` en
  `:202-214`.
- **Evidencia:** si `window.AudioContext`/`webkitAudioContext` no existe, `init()` no crea
  el contexto y `audio.ctx` queda `null`; `startSong` ejecuta
  `game.songStart = audio.ctx.currentTime + 0.2` → `TypeError` sin manejar: la partida
  no arranca y el diálogo queda en el aire (solo Checking, sin accidente en navegadores
  modernos).
- **Corrección propuesta:** en `startSong`, cortar temprano si `!audio.ctx`
  (avisar en pantalla con un `txt(...)` estilo aviso, o mantener el juego "silencioso"
  usando `performance.now()` como reloj de emergencia). La opción mínima: `if(!audio.ctx){ txt → }
  return;` antes de usar `audio.ctx`.

### H-05 — Lógica dudosa (doble render al restaurar el idioma guardado)

- **Gravedad:** lógica dudosa (funciona, trabajo duplicado innecesario).
- **Ubicación:** `javascripts/controllers/sidebar/fnChangeLanguage.js:94-98` +
  orden de arranque en `javascripts/main.js:9-17`.
- **Evidencia:** en la carga, si el idioma guardado ≠ `html.lang`, `sectionLanguage()` llama
  a `changeLanguage(savedLanguage)` **antes** de que `HomeController`/`JuegosController`
  monten sus grillas: `reloadHomeContent()` / `reloadGamesContent()` renderizan una vez
  aquí, y los controladores que corren justo después renderizan otra vez lo mismo.
- **Corrección propuesta:** en el arranque, aplicar solo el estado (setCurrentLanguage +
  `document.documentElement.lang` + los textos `[data-lang]` de la barra) sin invocar las
  re-renderizaciones: p. ej. extraer el cuerpo de `changeLanguage` en
  `changeLanguage(lang, { rerender = true })` y en el init pasar `rerender: false`.

### H-06 — Lógica dudosa (sincronización entre pestañas parcial)

- **Gravedad:** lógica dudosa (estado visual desfasado con 2 pestañas abiertas).
- **Ubicación:** `fnThemeMode.js:52-60` (sin listener `storage`),
  `theme-init.js:160-168` y `mis-estudios/js/tema.js:170-178` (solo `<html>`),
  `fnChangeLanguage.js` (sin listener `storage`).
- **Evidencia:** al cambiar modo/idioma en una pestaña B:
  - El **modo** se refleja en `<html>` (theme-init) pero `body.dark`/`body.light`
    (que aplica `applyTheme`), el `switch`, `mode-icon` y `mode-label` del modal quedan
    desfasados en la pestaña A; `base.css` admite ambos nodos, así que el fondo reacciona
    pero los componentes ligados a `body:not(.dark)`/etiqueta no.
  - El **idioma** no propaga nada: `currentLanguage` (módulo) y la UI de la pestaña A
    quedan en el idioma viejo hasta recargar. `docs/AUDITORIA.md:77` promete
    "sincronización entre pestañas vía evento `storage`", pero esta preferencia no la
    cumple.
- **Corrección propuesta:** añadir en `fnThemeMode` un listener `storage`
  (guardar valor, comparar, `applyTheme(...)`) y decidir el idioma: o sincronizar con
  listener + recarga de grillas, o actualizar `docs/AUDITORIA.md` declarando el idioma
  como "solo se aplica al recargar". (Mantener lo ya existente de fondo/escala/acento.)

### H-07 — Lógica dudosa (el submenú no se repliega cuando vuelve una sección padre)

- **Gravedad:** lógica dudosa (UX del sidebar).
- **Ubicación:** `javascripts/controllers/sidebar/fnSectionNav.js:16-30`.
- **Evidencia:** `setActive()` abre el submenú (`.is-open` + `aria-expanded="true"`) cuando
  la sección activa es hija, pero cuando el scroll vuelve a "Inicio" solo retira
  `.has-active` del grupo: el submenú queda desplegado hasta que el usuario toca el
  chevron. No está declarado como comportamiento esperado ni en `AGENTS.md` ni en
  `docs/AUDITORIA.md`.
- **Corrección propuesta:** decidir el criterio y hacerlo explícito: en el `else`
  (sección padre activa) cerrar el submenú solo si no hay hija visible
  (`submenu.classList.remove('is-open'); expand?.setAttribute('aria-expanded','false')`),
  o documentar el estado actual como decisión.

### H-08 — Lógica dudosa (resolución de claves por orden de secciones)

- **Gravedad:** lógica dudosa (fragilidad latente).
- **Ubicación:** `javascripts/controllers/sidebar/fnChangeLanguage.js:10-22`.
- **Evidencia:** `getTranslation()` busca la clave en `page → introSection → home →
  header` y devuelve el primer match. Hoy no hay colisiones dañinas, pero 2 claves
  comparten nombre entre secciones con textos distintos (`title`, `workplace`):
  reutilizar cualquiera de esas palabras en HTML resolvería al texto de `page`, no el
  esperado. Nada en el JSON previene esto.
- **Corrección propuesta:** mantener el fallback actual pero documentar en
  `translations.json` (comentario) que las claves son "espacio único" entre esas 4
  secciones, o renombrar las colisionadas (`workplace` ya es de la sección header
  destinada al CV muerto — ver H-13; al eliminarlas el riesgo desaparece).

### H-09 — Lógica dudosa (botón JUGAR del canvas inicial sin handler)

- **Gravedad:** lógica dudosa (UI muerta en funcionamiento normal).
- **Ubicación:** `juegos/match-3/index.html:957` (`drawButton('play', …)`) vs `:1029-1039`
  (`pointerdown`).
- **Evidencia:** en el estado `start`, cualquier `pointerdown` en el canvas inicia el
  juego directamente (`if (state === 'start'){ startGame(); return; }`), y `overlayClick`
  solo se consulta en `paused/over/victory`. El botón JUGAR pintado en el canvas es
  puramente decorativo (un clic sobre él inicia igual, por accidente), y su entrada en
  `buttons` es un resto.
- **Corrección propuesta:** las dos coherentes: (a) en `pointerdown`, cuando
  `state === 'start'`, pasar primero por `overlayClick(p.x, p.y)` (y mantener el arranque
  por clic fuera del botón si se quiere), o (b) no dibujar un botón "botón" en pantalla
  de inicio (hoy hay `drawButton('play', …)` que no funciona como botón). Recomendable (a)
  + `info()` de "Presiona ENTER o toca la pantalla" ya presente.

### H-10 — Lógica dudosa (ritmo avanza de pantalla con teclas del sistema)

- **Gravedad:** lógica dudosa (UX, sin daño).
- **Ubicación:** `juegos/ritmo/index.html:594-604`.
- **Evidencia:** en `case 'title'`, `goSelect()` se ejecuta para **cualquier** `keydown`
  (con `e.repeat` filtrado pero sin lista de teclas): F5, F12, `Alt+Tab`, etc. avanzan a
  la selección de canción antes de que el navegador complete su acción default.
- **Corrección propuesta:** lista blanca en `title`: teclas imprimibles o `Space/Enter`
  (p. ej. `if (code.length !== 1 && !['Space','Enter'].includes(code)) return;` antes del
  switch) o separar por `event.key` singular.

### H-11 — Lógica dudosa (resize a mitad de animación desalinea caramelos)

- **Gravedad:** lógica dudosa (glitch visual puntual).
- **Ubicación:** `juegos/match-3/index.html:1146` (listener `resize`) + `:249-274`
  (`resize()` → `snapCells()`).
- **Evidencia:** durante `fall/clear/swap`, `resize()` recalcula `cellSize` y ancla
  `px/py` de todas las celdas a su posición nueva, pero los tweens en vuelo interpolan
  entre su `from` capturado (geometría vieja) hasta el objetivo viejo: las celdas
  quedan desalineadas hasta el siguiente re-anclaje natural. No crashea y
  se compensa al terminar los tweens o al siguiente move.
- **Corrección propuesta:** en `resize()`, si `phase !== 'idle'`, aplazar el snap:
  marcar un flag `needsRealign` y ejecutar `snapCells()` en `onStable()`.

### H-12 — Lógica dudosa (regla `body:not(.dark)` activa brevemente en modo oscuro)

- **Gravedad:** lógica dudosa (casi invisible, pero incoherente con el diseño).
- **Ubicación:** `stylesheets/base.css:739` vs `javascripts/theme-init.js:71-73`.
- **Evidencia:** el pre-pintado solo puede tocar `<html>` (el script clásico corre antes de
  que exista `<body>`); `body.dark` lo agrega `fnThemeMode()` al llegar `DOMContentLoaded`.
  Ventana entre primer pintado y ese evento: `body:not(.dark) .modal-dialog .settings .settings-icon`
  aplica el invert aunque el modo sea oscuro (el modal está cerrado así que hoy no se ve).
  Si alguien reutiliza el patrón `body:not(.dark)` en un componente visible, produciría
  un destello.
- **Corrección propuesta:** reescribir la regla contra el nodo que sí está listo antes
  de pintar: `html:not(.dark) .modal-dialog .settings .settings-icon` (equivale exacto
  para la página, ya que el modo se pre-pinta en `<html>`), y dejar una nota en el token
  del sistema para nuevos componentes.

### H-13 — Código muerto (24 claves de traducción huérfanas y excl. de `name`)

- **Gravedad:** código muerto.
- **Ubicación:** `javascripts/lang/translations.json` (sección `header` y `introSection.role`).
- **Evidencia (cruce automatizado de data-lang/data-i18n/propiedades y labelKey vs pool):**
  Ninguna página ni módulo consume estas claves (son restos del antiguo CV/modal):
  `cv`, `description`, `downloadTile`, `fullname`, `fullnameTitle`, `githubName`,
  `githubTitle`, `greeting1`, `greetingResume`, `linkedinName`, `linkedinTitle`,
  `mailName`, `mailTitle`, `nationality`, `nationalityTitle`, `profession1`,
  `profession2`, `profession3`, `resume`, `webSiteName`, `webSiteTitle`, `workplace`
  (sección `header`), `role` (introSection) — y `technologies` (header) se solapa con el
  que sí se usa vía `homeTexts.technologiesLabel`. Nota: `introSection.name` ("Pablo") sí
  está definido y `data-lang="name"` existe en `index.html:60`, pero
  `applyTranslations()` saltea `key === "name"` (línea 30-32) a propósito no documentado
  tampoco en su comentario.
  Además `introSection.role` tiene errata de contenido (`"aplicaiones móvil"`).
- **Corrección propuesta:** eliminar las 23 claves muertas (dejar `header` vacío o solo con
  lo que quede real), decidir el caso `name` (o traducir o quitar el `data-lang`) y
  documentar la exclusión en el comentario de `applyTranslations()`. Verificar que la
  portada y el modal siguen intactos tras el recorte.

### H-14 — Código muerto (asset PDF del CV sin referencias)

- **Gravedad:** código muerto.
- **Ubicación:** `assets/files/PabloDiazCV.pdf`.
- **Evidencia:** grep en todo el repo (HTML/JS/CSS/JSON/docs): ningún archivo lo
  referencia (relacionado con las claves `cv/resume/downloadTile` de H-13, restos de un
  botón "Descargar CV" eliminado).
- **Corrección propuesta:** decidir si el CV vuelve (entonces enlazarlo desde el sidebar o
  el modal y restaurar las claves) o eliminar el archivo del repo. No borrar por quedar
  aquí sin la decisión del desarrollador.

### H-15 — Código muerto (tokens de color sin uso)

- **Gravedad:** código muerto (deuda mayor a la declarada).
- **Ubicación:** `stylesheets/base.css:191-226` (alias `--color-*`) y `:358-364`
  (3 semánticos).
- **Evidencia (cruce automatizado de `var(--x)` en las 4 hojas + JS + HTML):** de 59 alias de
  compatibilidad, **41 nunca se referencian** (toda la familia `--color-blue/-dark/-light`,
  green, red, yellow, purple, pink, orange, cyan, black, dark, gray, y semánticos como
  `--color-success/warning/error/info`). Además 3 tokens semánticos del propio sistema
  están definidos y sin uso: `--color-background-neutral`, `--color-border-light`,
  `--color-separator` (sí usados: `--color-white`, `--color-overlay-dark` y resto).
- **Corrección propuesta:** AGENTS de los alias "para compatibilidad": no purgar sin
  decisión. Opciones: (a) borrar los 41 + 3 sin referencias y reflotar al primer uso real
  (más limpio), o (b) reducirlos a los legacy con un comentario "solo se usan estos N".
  Cualquiera de las dos actualiza el comentario "Alias de compatibilidad" y asegura que
  las páginas siguen idénticas (a11y visual: son definiciones muertas, sin efecto a
  runtime).

### H-16 — Sugerencia (a11y: canvases sin `aria-label`)

- **Gravedad:** sugerencia.
- **Ubicación:** `juegos/ajedrez/index.html`, `arkanoid/`, `damas/`, `match-3/`, `pool/`, `ritmo/`.
- **Evidencia:** 9 de 15 juegos (y la `_template/`) declaran `<canvas … aria-label="…">`;
  estos 6 no. El resto del canon (dialog, scanlines, récord, sin CDN) está uniforme.
- **Corrección propuesta:** añadir `aria-label` igual al resto (p. ej. "Tablero de ajedrez",
  "Escenario del juego de ritmo") — se resuelven en 1 línea por juego, sin tocar lógica.

### H-17 — Sugerencia (documentar/normalizar la excepción de `data-lang="name"`)

- **Gravedad:** sugerencia.
- **Ubicación:** `javascripts/controllers/sidebar/fnChangeLanguage.js:30-32` y
  `index.html:60`.
- **Evidencia:** `applyTranslations()` saltea explícitamente la clave `name` sin comentario
  que explique por qué (el nombre "Pablo" se queda literal siempre). A futuro, un nombre
  distinto del valor traducido genera dudas.
- **Corrección propuesta:** comentar la línea (si la decisión es mantener el nombre sin
  traducción) o enlazar el `data-lang="name"` con la clave `introSection.name` como el
  demás texto.

## Verificado sin hallazgos

- **Rutas y carga:** todas las páginas (27 URLs) y assets responden 200; sin `@import` en
  CSS; sin `href="/..."`/`src="/..."`; `base.css` antes que la hoja de página en todos los
  HTML. `favicon.svg` resuelto en raíz y subpáginas.
- **Manifiesto `juegos.json`:** 15 entradas `published`, `slug` = carpeta kebab-case,
  campos `title/description/genre/controls` con ES/EN completos, `covers` cargando,
  clave raíz `version`.
- **Canon de juegos (15/15 + plantilla):** `<dialog id="options">` con `aria-labelledby`,
  `showModal()`, cierre por ✕/ESC/backdrop, overlay `.scanlines`, paleta neón, sin CDNs ni
  recursos externos, récord `localStorage` con `<slug>_best_v1` y llaves antiguas migradas
  exactamente como la tabla de `juegos/README.md`.
- **Dimensionado del canvas:** `renderScale` y `--game-max/--game-chrome` presentes en los
  6 juegos del canon + plantilla (snake como referencia revisada línea a línea, sin
  lógica defectuosa salvo lo ya estándar del canon).
- **Doble pre-pintado de tema (theme-init.js ⇄ tema.js):** claves, defaults, listas de
  temas/direcciones/velocidades/escalas y lógica de degradados exactamente sincronizadas
  (diferencia declarada y válida: manejado de acento inválido — uno fija default, el otro
  limpia para dejar valores de `:root`; efecto idéntico).
- **i18n:** todas las claves usadas están definidas ES/EN (sin huecos); fallback
  `getText()` de la grilla al español funciona; portada y grilla re-renderizan al cambiar;
  el modal re-abre con textos correctos.
- **Accesibilidad base:** `aria-expanded`/`aria-controls` navbar-submenú, `aria-pressed` en
  opciones del modal, `role="status"`/`aria-live`, `rel="noopener noreferrer"` en todos
  los targets `_blank`, `aria-labelledby="modal-title"` con `#modal-title` en ambos
  contenidos dinámicos, `loading="lazy"` en imágenes listadas.
- **Eventos con delegación** (modal settings, fondo, escala, color, idioma) y
  `InitModalDialog` con bloqueo `.modal-open` + repliegue en evento `close` (ESC incluido).
- **Almacenamiento:** todos los accesos `localStorage` envueltos en try/catch y
  sin colisión de claves site ↔ juegos.

## Falsos positivos descartados (para no reauditar)

1. Los "404" de `css/tema.css` y `js/app.js` en `mis-estudios/estudios/*` son ejemplos de
   código escapados en bloques `<code>`, no recursos reales.
2. Clases CSS como `.color-option`, `.juego-card__portada` "sin uso" en los chequeos son
   interpoladas en strings de JS (`class="color-option${…}"`); sí se usan.
3. Las claves de `translations.json` que los cruces daban como huérfanas y aparecen en
   `H-13` fueron verificadas una a una contra `texts.*`, `labelKey:`, `data-lang` y
   `data-i18n-*` en `js` y `html` antes de listarlas.

## Deuda técnica conocida — estado al día (AUDITORIA §8)

- `.modal-closed` continúa inexistente (bloqueo vía `.modal-open`); el hallazgo H-12
  sugiere además revisar `body:not(.dark)` para la familia de reglas nuevas.
- Las portadas siguen siendo 1 por juego: el carrusel CSS existe y está correcto
  (con animación anulada por `prefers-reduced-motion`), sin imágenes para activarse.
- Sin `updatedAt` por juego y sin filtro por género: sigue sin existir.
- Copiar correo solo con `navigator.clipboard` (fallback: `console.warn`): sigue igual.

---

Fin del informe. Para corregir: priorizar H-01 → H-04 (bugs), luego H-05/H-06/H-07/H-08
(estado de UI), luego el abandono de muertos H-13/H-14/H-15 (requiere decisión del
desarrollador para H-14 y para el recorte de tokens). Toda corrección termina con la
verificación manual del `AGENTS.md` raíz (servir por HTTP y remarcar las páginas
afectadas por la tabla de la sección «Páginas a cargar según lo modificado»).
