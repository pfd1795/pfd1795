# Card Match — Retro Arcade

Carpeta: `card-match/` · Archivo único: `index.html` (HTML + CSS + JS Vanilla embebidos).

## Descripción

Juego de memoria clásico con estética neon retro-arcade sobre tema oscuro. Volteas cartas de
dos en dos buscando parejas; las correctas quedan fijadas boca arriba y las incorrectas se
vuelven a ocultar tras un instante de estudio. Cada nivel es un tablero contra reloj: vacíalo
antes de que la cuenta atrás llegue a cero. Los aciertos consecutivos encadenan combos que
multiplican la puntuación. Modo infinito: la "victoria" es superar tu récord. Funciona sin
conexión, sin frameworks ni recursos externos.

## Mecánicas

- **Turno clásico:** clic o tap voltea una carta boca abajo; con dos levantadas se resuelve
  la jugada. Pareja correcta → quedan fijadas con brillo tenue permanente. Pareja
  incorrecta → bloqueo de estudio de ~0,65 s y vuelta boca abajo con animación de volteo.
- **Temporizador por nivel:** cuenta atrás con base = 20 s + 7 s por pareja del tablero.
  Cada acierto regala +3 s. Si llega a 0 → Game Over. Un fallo no roba tiempo: el castigo
  real es perder el combo. Barra de tiempo sobre el tablero que se vuelve roja y pulsante
  bajo los 10 s (con viñeta roja parpadeante).
- **Combos:** parejas consecutivas sin fallo suben el multiplicador x1 → x2 → x3 → x4 → x5
  (tope). Cada pareja puntúa 100 × multiplicador, con flash central "COMBO ×N" desde x2.
  Un fallo resetea a x1. El HUD muestra el multiplicador que aplicará tu próximo acierto.
- **Puntuación:** 100 × combo por pareja + bono de nivel completado (500 × nivel) + bono de
  tiempo restante (segundos × 5) al vaciar el tablero.
- **Progresión:** rejilla creciente por nivel: 4×3 (6 parejas) → 4×4 (8) → 5×4 (10) → 6×4
  (12) → 6×5 (15) → 6×6 (18). A partir de ahí se repite 6×6 reduciendo el tiempo base 2,5 s
  por nivel (mínimo 16 s). Anuncio "NIVEL N" con tamaño y parejas al empezar cada tablero.
- **Cartas:** 18 símbolos geométricos neón dibujados en canvas (estrella, luna, corazón,
  rayo, rombo, hexágono, cruz, anillo, ojo, triángulo, cuadrado, círculo, destello, sol,
  onda, chevrón, aspa y reloj de arena), cada uno con su color de la paleta neón. Las
  parejas comparten símbolo + color. Reverso violeta con "?" y animación de volteo (escala X
  con cambio de cara en el punto medio).
- **PEEK:** 1 uso por nivel (tecla H o botón) que revela en fantasma todas las cartas boca
  abajo durante 1,5 s (con fundido de entrada/salida). No cuenta como jugada ni interfiere
  con los volteos. Decidir cuándo gastarlo es parte de la estrategia. No se acumula entre
  niveles.
- **Derrota:** solo el temporizador — sin vidas. El bloqueo tras fallo evita el spameo de
  clics y da un respiro para memorizar.
- **HUD:** puntuación, récord, nivel, parejas restantes/total, tiempo (rojo bajo 10 s),
  combo y etiqueta de estado.
- **Estados:** Inicio (tablero de fondo en modo atracción con volteos automáticos),
  Jugando, Pausa (P/Esc, botón, al ocultar la pestaña o abrir Opciones) y Game Over con
  desglose (puntuación, récord, nivel alcanzado, parejas resueltas y mejor combo).

## Controles

### Escritorio
teclas | accion

Clic
Voltear carta
H
PEEK (espiar el tablero 1,5 s)
P o Esc
Pausa / reanudar
Enter
Jugar / reanudar / nueva partida
Space
Jugar / nueva partida
Móvil
Tap sobre la carta para voltearla; tocar la arena también empieza o reanuda la partida.
Botón PEEK ×N (rosa, muestra los usos restantes) y botón Jugar
(Jugar/Pausa/Seguir/Otra vez).
Arquitectura
Un único index.html autocontenido. El JS vive en una IIFE en modo estricto.
Secciones: constantes, símbolos (18 funciones de dibujo con helpers fillPoly/strokePts),
estado global (game, board, selection, selPending, attractBack), persistencia,
construcción de tablero (levelSpec + makeDeck con barajado Fisher-Yates y reparto
simétrico de parejas), resolución de turnos, modo atracción, cosmética, entrada y render.
Volteo: cada carta guarda anim {t, dur, from}; el render calcula scaleX = |cos(π·p)| y
cambia de cara en p ≥ 0,5. La lógica usa la cara lógica (down/up/matched), no la visual.
Resolución: con dos cartas seleccionadas y animaciones terminadas se compara sym;
el fallo difiere el volteo mediante lockT y selPending para mostrar ambas cartas.
Canvas de 480×640 px lógicos (3:4 vertical) con buffer escalado por renderScale
(cssWidth / 480 × devicePixelRatio, máx. 2) para nitidez HiDPI; CSS lo hace responsive
con aspect-ratio y un máximo de 560 px. El layout de cartas se calcula por nivel
(celdas proporcionales, altura acotada a 1,35 × anchura, rejilla centrada).
Bucle con requestAnimationFrame y dt acotado a 50 ms; solo el estado PLAY simula,
START ejecuta el modo atracción y PAUSE congela todo.
Efectos: partículas aditivas al acertar (color del símbolo), popups de puntos, flash de
combo con escala y color según multiplicador, anuncios con respaldo oscuro, screen shake
con decaimiento exponencial y vibración háptica en móvil.
DOM solo para cabecera, HUD, botones táctiles, modal de opciones y scanlines CRT.
Persistencia
Récord en localStorage con la clave única card-match_best_v1 (patrón <slug>_best_v1).
Se actualiza en vivo al superar el récord y se muestra aviso de "¡NUEVO RÉCORD!" en el
Game Over.
Acceso envuelto en try/catch (degrada sin error si el almacenamiento está bloqueado).
Si en el futuro la clave cambia, migrar copiando el valor antiguo a la clave nueva y
borrando la antigua la primera vez que se abra el juego.
Posibles mejoras
Efectos de sonido y música sintetizados con Web Audio API (sin assets).
Dificultad seleccionable (menos tiempo base, PEEK de pago, más niveles de repaso).
Modos alternativos: contrarreloj total, memoria creciente (cartas que se re-ocultan),
duo vs CPU con ritmo de volteos.
Powerups en el tablero: +tiempo, comodín que empareja con cualquier carta, segunda PEEK.
Tabla de mejores puntuaciones (top 5) y estadísticas acumuladas (parejas, mejor nivel).
Temas visuales alternativos (CRT verde, alto contraste, atardecer synthwave).
Soporte PWA para juego offline instalado.

Para jugarlo: guarda ambos archivos en una carpeta `card-match/` y abre `index.html` en el navegador; no necesita servidor ni conexión.