# Neon Maze — Retro Arcade

Carpeta: `neon-maze/` · Archivo único: `index.html` (HTML + CSS + JS Vanilla embebidos).

## Descripción

Laberinto top-down con estética neon retro-arcade sobre tema oscuro. Explora laberintos
procedurales infinitos, recoge llaves de colores, abre las puertas correspondientes y llega
a la salida esquivando enemigos. Los **patrulleros** recorren rutas fijas y los **centinelas**
te persiguen si te ven en línea recta por un pasillo. Funciona sin conexión, sin frameworks
ni recursos externos.

## Mecánicas

- **Laberintos procedurales** generados con recursive backtracker (laberinto perfecto, siempre
  conexo) más bucles extra para pasillos con alternativas. El tamaño crece con el nivel:
  de 13×11 hasta 25×17 celdas.
- **Objetivo:** recoger la(s) llave(s), abrir cada puerta de su color y alcanzar la salida.
- **Llaves y puertas de colores:** rosa, amarilla y cian. Las puertas se colocan sobre el
  camino a la salida, por lo que son obligatorias; cada llave se genera en una región
  alcanzable sin cruzar su propia puerta (nivel siempre resoluble en orden).
- **Puntuación:** gema +100 · llave +500 · abrir puerta +100 · bonus de tiempo restante
  al superar el nivel (segundos × 10).
- **Enemigos:**
  - *Patrulleros* (rosa, cuadrado): van y vuelven por pasillos rectos.
  - *Centinelas* (naranja, rombo): patrullan, pero si te ven en línea recta (hasta 5 casillas
    sin muros ni puertas) te persiguen unos segundos y luego regresan a su ruta.
  - La cantidad y velocidad aumentan con el nivel.
- **Powerups** (1 por nivel): *escudo* (absorbe un contacto) y *congelación* (enemigos
  quietos e inofensivos 3 s).
- **Vidas y tiempo:** 3 vidas. Perder una vida (enemigo o tiempo agotado) reinicia las
  posiciones y el tiempo del nivel, conservando llaves y puertas abiertas. Sin vidas: fin.
- **Progresión:** modo infinito; cada nivel superado genera otro más grande y rápido.
  Victoria por niveles (no hay final): la partida termina en Game Over.
- **Estados:** Inicio, Jugando, Pausa (P/Esc, botón, al ocultar la pestaña o abrir Opciones),
  Nivel superado y Game Over.

## Controles

### Escritorio

teclas | accion
WASD o flechas
Moverse (mantener para caminar continuo)
P o Esc
Pausa / reanudar
Enter
Jugar / siguiente / reiniciar
Móvil
D-pad táctil direccional (▲ ◀ ▼ ▶) con movimiento continuo al mantener pulsado.
Botones Jugar (Jugar/Pausa/Seguir/Siguiente) y Pausa.
Tocar el tablero inicia o reanuda la partida.
Arquitectura
Un único index.html autocontenido. El JS vive en una IIFE en modo estricto.
Secciones: constantes, estado global (game + player), persistencia, generación
(carveMaze, openLoops, bfsField, buildLevel), lógica de jugador y enemigos
(movimiento por casillas con interpolación, BFS para persecución y retorno), entrada
(teclado, D-pad con pila de direcciones) y render por capas (suelo, muros con glow,
puertas, salida, llaves, gemas, powerups, haces de visión, enemigos, jugador, popups,
inventario y overlays).
Canvas de 480×640 px lógicos con buffer escalado por renderScale
(cssWidth / 480 × devicePixelRatio, máx. 2) para nitidez HiDPI.
Bucle con requestAnimationFrame y dt acotado a 50 ms.
El tamaño de celda se calcula por nivel para centrar el laberinto sin cambiar la
resolución lógica.
DOM solo para cabecera, HUD, D-pad, botones, modal de opciones y scanlines CRT.
Persistencia
Récord en localStorage con la clave única neon-maze_best_v1 (patrón <slug>_best_v1).
Se actualiza en vivo al superar el récord y se muestra aviso de "¡NUEVO RÉCORD!".
Acceso envuelto en try/catch (degrada sin error si el almacenamiento está bloqueado).
Si en el futuro la clave cambia, migrar copiando el valor antiguo a la clave nueva y
borrando la antigua la primera vez que se abra el juego.
Posibles mejoras
Efectos de sonido y música sintetizados con Web Audio API (sin assets).
Niebla de guerra / radio de visión limitada y minimapa.
Más tipos de enemigos (drones que siguen paredes, torretas láser).
-interruptores que abren puertas a distancia y puertas de doble cerradura.
Modo contrarreloj diario con semilla fija y tabla de mejores tiempos.
Temas visuales alternativos (Game Boy, CRT verde, alto contraste).
Vibración háptica en móvil y soporte PWA para juego offline instalado.

Para jugarlo: guarda ambos archivos en una carpeta `neon-maze/` y abre `index.html` en el navegador; no necesita servidor ni conexión.