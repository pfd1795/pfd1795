# Auditoría del código del proyecto

Alcance: HTML, CSS, JavaScript y manifiestos JSON del portafolio, incluidas las páginas de juego,
las herramientas de `programas/` y la PWA. Método: lectura directa y búsquedas antes de cada
afirmación, sitio servido por HTTP en `http://127.0.0.1:8129`, carga con Chrome headless por CDP de
las páginas implicadas, `node --check` sobre los 29 archivos JavaScript, validación de JSON y
comprobaciones estáticas de rutas, ids, fragmentos, atributos y claves de traducción. No se han
aplicado correcciones de código.

## Resultado global

- Los 29 archivos JavaScript pasan `node --check`; los manifiestos y `translations.json` son válidos.
- Conteos verificados contra los manifiestos: 20 juegos `published`, 36 artículos `published`,
  11 herramientas `published` y 5 `wip`.
- Las 104 claves i18n están completas en ES y EN, sin colisiones entre `page`, `introSection`,
  `home` y `header`.
- No hay rutas absolutas, referencias locales ausentes, fragmentos rotos, ids duplicados ni
  `target="_blank"` sin `rel="noopener noreferrer"`.
- El precache del Service Worker contiene 163 URLs existentes, 72 de ellas HTML, y `CACHE_NAME`
  se actualiza con el sitio.
- El controlador de idioma reaplica el estado cuando recibe un evento `storage` con
  `key === null` y lo hace sin reescribir la clave; comprobado en navegador tras `localStorage.clear()`.
- La búsqueda y los chips de las tres grillas funcionan con el campo vacío: los 18 géneros de
  `juegos/` filtran sus tarjetas y el buscador ignora tildes.

## Hallazgos

### El buscador no encuentra el género traducido en inglés

- **Ubicación:** `js/controllers/juegos/fnJuegos.js:83-84`.
- **Evidencia:** `data-claves` se construye solo con `technologies`, mientras que `data-categoria`
  recibe `genreKey(game)`, es decir, la clave estable en español. La etiqueta visible, en cambio,
  sale de `getText(game.genre, lang)` (`:74`). `js/buscador.js:87-96` incluye `data-categoria` en el
  texto buscable. Con el idioma EN activo, una tarjeta muestra `Arcade · skill` pero expone
  `data-categoria="Arcade · habilidad"`; buscar `skill` devuelve 0 juegos y buscar `habilidad`
  devuelve 2.
- **Impacto:** en inglés el buscador no filtra por el género que ve el usuario, aunque la tabla de
  verificación manual exige búsqueda por título, descripción, tecnología y género.
- **Corrección sugerida:** añadir `getText(game.genre, lang)` al valor de `data-claves` y conservar
  `data-categoria` con la clave estable para que los chips sigan filtrando por `genre.es`.

### La copia de imagen del generador de QR pierde los errores asíncronos

- **Ubicación:** `programas/herramientas/generador-codigo-qr.html:987-1002`.
- **Evidencia:** `lienzoActual.toBlob()` recibe una callback `async` (`:992-996`) donde se lanza
  `throw new Error('Blob no disponible')` y se hace `await navigator.clipboard.write(...)`. El
  `try/catch` exterior (`:990`, `:1000-1002`) solo cubre la llamada sincrónica a `toBlob`, así que
  no puede capturar ni el `throw` ni un rechazo de `write()`.
- **Impacto:** si el portapapeles rechaza la escritura o el blob es nulo, queda un rechazo no
  manejado en consola y `#aviso-portapapeles` no muestra el mensaje de error.
- **Corrección sugerida:** convertir `toBlob` en una `Promise` y hacer `await` dentro del `try`
  existente, o gestionar el error dentro de la callback y actualizar el aviso en ambos caminos.

### Temporizador de IA obsoleto en ajedrez

- **Ubicación:** `juegos/ajedrez/index.html:886-890`, `:946-955` y `:1024`.
- **Evidencia:** `resumeGame()` llama a `scheduleAI()` si es el turno de la IA; `scheduleAI()`
  programa un `setTimeout` de 350 ms cuyo callback solo comprueba `state === 'playing'` (`:950`,
  `:953`), sin revalidar `engine.turn` ni una generación de partida. `btnRestart` invoca
  `startGame()` (`:1024`), que también puede programar otro temporizador (`:877`), y no cancela el
  anterior.
- **Impacto:** al pausar y reanudar, o al reiniciar, durante esos 350 ms, el temporizador antiguo
  ejecuta `aiBestMove()` y `commitMove()` sobre el estado actual: la IA mueve dos veces o lo hace
  en el turno del jugador humano.
- **Corrección sugerida:** guardar el identificador del temporizador, cancelarlo en `startGame()`,
  `toMenu()`, `pauseGame()` y `undo()`, y añadir al callback una validación de turno y de
  generación antes de `commitMove()`.

### Temporizador de IA obsoleto en damas

- **Ubicación:** `juegos/damas/index.html:736-740`, `:801-810` y `:900`.
- **Evidencia:** `resumeGame()` programa otra IA con `scheduleAI()` y `btnRestart` llama a
  `startGame()` (`:900`), que también puede programarla (`:727`). El callback de `:804-810` solo
  valida `state`, sin comprobar `engine.turn` ni una generación de partida.
- **Impacto:** misma secuencia que en ajedrez: una jugada automática puede ejecutarse en el turno
  del jugador tras pausa/reanudo o reinicio rápido.
- **Corrección sugerida:** cancelar el temporizador en los cambios de estado y verificar
  `engine.turn === aiColor` dentro del callback.

### La celebración del jefe se filtra a la partida siguiente

- **Ubicación:** `juegos/dungeon-crawler/index.html:669-682`, `:736` y `:930-934`.
- **Evidencia:** `killEnemy()` fija `game.winT = 1200` al vencer al jefe. `startGame()` reinicia
  puntuación, planta, objetos y temporizador de nivel, pero no `winT`. `update()` descuenta `winT`
  mientras el estado es `PLAYING` y llama a `winGame()` al llegar a cero.
- **Impacto:** si la partida se reinicia durante la celebración, la nueva partida entra en estado
  de victoria tras 1,2 s y recibe el bonus de `winGame()` sin haber derrotado al jefe en ella.
- **Corrección sugerida:** inicializar `game.winT = 0` en `startGame()` y al volver a menú.

### El anuncio accesible de victoria omite la puntuación del nivel

- **Ubicación:** `juegos/match-3/index.html:447`.
- **Evidencia:** `endState()` construye el mensaje de victoria con `totalScore`, que todavía no
  incluye la puntuación del nivel recién completado. El marcador y el récord usan
  `totalScore + score` (`:430-431`), y el mensaje de derrota de la propia línea `:447` también.
  El destino es `#sr-status`, con `role="status"` y `aria-live="polite"` (`:59`).
- **Impacto:** un lector de pantalla anuncia menos puntos de los reales cada vez que se supera un
  nivel.
- **Corrección sugerida:** usar `totalScore + score` en la rama de victoria.

### La pantalla de título de ritmo no acepta teclas imprimibles

- **Ubicación:** `juegos/ritmo/index.html:625-636` y `:489`.
- **Evidencia:** el manejador guarda `const code = e.code` y avanza si `code.length === 1` o si es
  `Enter`/`Space`. Los valores de `KeyboardEvent.code` son siempre multicarácter (`KeyA`,
  `Digit1`, `Comma`, …), por lo que la primera condición nunca se cumple. El texto dibujado invita
  a «PULSA UNA TECLA O TOCA LA PANTALLA».
- **Impacto:** pulsar una letra o un número, tal como indica la pantalla, no abre el selector de
  canciones; solo funcionan `Enter`, `Espacio` y el toque.
- **Corrección sugerida:** comprobar `e.key.length === 1` en lugar de `code.length === 1`.

### Cerrar Opciones reanuda partidas pausadas por el usuario o por el navegador

- **Ubicación:** `juegos/ritmo/index.html:620` y `:699`; `juegos/pool/index.html:600` y `:671`;
  `juegos/tetris/index.html:848-858`.
- **Evidencia:** los tres `openModal()` pausan solo si el estado era `playing`, pero el listener
  `close` reanuda siempre que encuentra el estado `paused`: `resumeGame()` en ritmo y pool,
  `togglePause()` en tetris. En tetris, `visibilitychange` y `blur` también pausan por su cuenta
  (`:860-866`). `pong/index.html:339-348` usa el patrón correcto con `modalWasPlaying`.
- **Impacto:** si el jugador pausa con `P`/Escape, o la pausa viene de perder el foco, abrir y
  cerrar Opciones reanuda la partida sin querer y pueden perderse notas o piezas en movimiento.
- **Corrección sugerida:** registrar `modalWasPlaying` al abrir el diálogo y reanudar solo si es
  `true` y el estado sigue `paused`, restableciendo el indicador al cerrar.

### La pantalla de título de pool anuncia teclas que no funcionan

- **Ubicación:** `juegos/pool/index.html:552` y `:613`.
- **Evidencia:** el texto invita a «PULSA UNA TECLA O TOCA LA PANTALLA», pero en el estado `title`
  el manejador solo acepta `Enter` y `Space`.
- **Impacto:** cualquier otra tecla pulsada desde la portada no inicia la partida.
- **Corrección sugerida:** aceptar también teclas imprimibles (`e.key.length === 1`) o cambiar el
  texto a «PULSA ENTER O TOCA LA PANTALLA».

### El mini rack de pool dibuja una bola con color prestado

- **Ubicación:** `juegos/pool/index.html:535-537` y `:442`.
- **Evidencia:** el bucle de 5 filas recorre 15 posiciones, pero el array direccional tiene 14
  números (`[1,2,3,4,5,6,7,9,10,11,12,13,14,15]`). En la última iteración `n` es `undefined`,
  `BALL_COLORS[undefined]` también y `circle()` asigna `g.fillStyle = undefined`, por lo que el
  lienzo conserva el color anterior.
- **Impacto:** la última bola decorativa del rack de la pantalla de título se pinta con un color
  duplicado.
- **Corrección sugerida:** usar los 15 valores del array de `rack()` (`:244`) o ajustar el bucle
  para que no lea más allá del array.

### Tetris lanza una excepción al iniciar la partida

- **Ubicación:** `juegos/tetris/index.html:638-656`, `:500-502` y `:1159`.
- **Evidencia:** `startGame()` pone `game.queue = []` y después llama a `spawnNext()`, que ejecuta
  `makePiece(game.queue.shift())` antes de `refillQueue()`. Con la cola vacía, `type` es
  `undefined` y `SHAPES[type]` falla en `:428`. CDP confirma la excepción al pulsar «Jugar» y al
  usar `Enter` desde la pantalla de título.
- **Impacto:** la partida queda en estado `PLAYING` pero sin pieza y sin `updateHud()`, por lo que
  el indicador sigue mostrando «Inicio» y el tablero no es jugable hasta una nueva interacción.
- **Corrección sugerida:** llamar a `refillQueue()` antes de `spawnNext()` en `startGame()`, o no
  vaciar `game.queue` al reiniciar.

## Verificaciones descartadas

- `programas/herramientas/dj.js:1196-1198`: la rama `document.hidden` programa un `setTimeout`
  sin pedir un `requestAnimationFrame`; por sí sola no deja un RAF pendiente que se duplique al
  volver a la pestaña. No se confirma el doble bucle y no se registra como hallazgo.
- `js/controllers/sidebar/fnChangeLanguage.js:128-141`: acepta `event.key === null`, lee con
  `getLanguage()` y reaplica con `persist: false`; tras `localStorage.clear()` el idioma y el resto
  de preferencias vuelven a sus valores por defecto.
- Los chips de género de `juegos/` filtran correctamente con el campo de búsqueda vacío. El único
  resultado a cero observado durante la auditoría procedía de un término de búsqueda escrito antes
  de pulsar el chip.

## Cierre

El informe entrega hallazgos, evidencia, impacto y correcciones propuestas. Los ítems accionables
se registran por separado en `docs/informes/trabajo-pendiente.md`. No se han modificado archivos de
código ni creado commits.
