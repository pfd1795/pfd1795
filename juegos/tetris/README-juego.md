# Tetris — Retro Arcade

Carpeta: `tetris/` · Archivo único: `index.html` (HTML + CSS + JS Vanilla embebidos).

## Descripción

Tetris clásico con estética neon retro-arcade sobre tema oscuro. Tablero de 10×20,
pieza fantasma (ghost), cola de 3 piezas siguientes, guardado de pieza (hold),
rotación SRS con wall kicks y puntuación clásica. Partida infinita: termina cuando
la pila llega arriba. Funciona sin conexión, sin frameworks ni recursos externos.

## Mecánicas

- **Tablero:** 10 columnas × 20 filas, renderizado íntegramente en `<canvas>` (480×640 px lógicos).
- **Piezas:** los 7 tetrominós (I, J, L, O, S, T, Z) con bolsa de 7 (aparecen de forma uniforme por ciclos).
- **Rotación:** estándar SRS con tablas de wall kicks para JLSTZ y para la pieza I.
- **Puntuación clásica** (multiplicada por el nivel vigente):

linea| Puntos
1
100
2
300
3
500
4 (Tetris)
800
Caída suave: +1 punto por celda. Caída instantánea (hard drop): +2 puntos por celda.

Niveles: +1 nivel cada 10 líneas. Velocidad de caída según la guía moderna:
(0.8 − (nivel − 1) × 0.007)^(nivel − 1) segundos por fila.
Ghost piece: silueta de la posición de caída de la pieza actual.
Hold (⇄ / C): guardar la pieza una vez por pieza; al recuperarla aparece en la parte superior.
Lock delay: la pieza apoyada fija tras 500 ms; moverla o rotarla reinicia el contador
(máximo 15 reinicios por pieza para evitar estancamiento infinito).
Derrota: la partida termina si la pieza nueva no cabe al aparecer o si se fija
parcialmente fuera del tablero. No hay condición de victoria (modo clásico infinito).
Estados: Inicio, Jugando, Pausa (P/Esc, botón o al ocultar la pestaña), Reanudar, Game Over.
Controles
Escritorio
← → o A / D
Mover pieza (con auto-repetición DAS/ARR)
↑ o W / X
Rotar horario
Z
Rotar antihorario
↓ o S
Caída suave (+1 punto por celda)
Espacio
Caída instantánea (+2 puntos por celda)
C o Shift
Guardar / recuperar pieza (hold)
P o Esc
Pausa / reanudar
Enter
Jugar / reiniciar
Móvil
Botones táctiles: ◀ ▶ ▼ (mover y caída suave, con mantener pulsado), ⟳ rotar,
⤓ caída instantánea, ⇄ guardar pieza, y botón Jugar/Pausa/Seguir.
Gestos sobre el tablero: tocar rota la pieza; deslizar a los lados la mueve;
arrastrar hacia abajo la baja suave; deslizar rápido hacia abajo la suelta.
Al abrir Opciones durante la partida, el juego se pausa automáticamente.
Arquitectura
Un único index.html autocontenido. El JS vive en una IIFE en modo estricto.
Secciones diferenciadas: constantes (piezas, colores, kicks, timings), estado del juego
(objeto game), persistencia, entrada (teclado con DAS/ARR, botones pointer y gestos),
lógica (update) y render (draw con funciones por capa: tablero, pila, flash de líneas,
pieza, ghost, paneles, popups y overlays).
Canvas de 480×640 px lógicos con buffer escalado por renderScale
(cssWidth / 480 × devicePixelRatio, máx. 2) para nitidez en pantallas HiDPI.
Bucle con requestAnimationFrame y dt acotado a 50 ms.
Panel lateral dentro del canvas: pieza guardada, cola de 3 siguientes, nivel y líneas.
DOM solo para cabecera, HUD, botones táctiles, modal de opciones y scanlines CRT.
Persistencia
Récord en localStorage con la clave única tetris_best_v1 (patrón <slug>_best_v1).
Se actualiza en vivo al superar el récord y se muestra aviso de "¡NUEVO RÉCORD!".
Acceso envuelto en try/catch (navegadores con almacenamiento bloqueado degradan sin error).
Si en el futuro la clave cambia, migrar copiando el valor antiguo a la clave nueva y
borrando la antigua la primera vez que se abra el juego.
Posibles mejoras
Efectos de sonido y música con Web Audio API (opcionalmente sintetizados, sin assets).
Detección de T-Spin y bonificación Back-to-Back.
Temas visuales alternativos (Game Boy monocromo, CRT verde, alto contraste).
Estadísticas por pieza y por partida; pantalla de resultados detallada.
Modos alternativos: Sprint (40 líneas), Ultra (2 minutos), Zen sin fin.
Vibración háptica en móvil (navigator.vibrate) y soporte PWA para juego offline instalado.

Para jugarlo: guarda ambos archivos en una carpeta `tetris/` y abre `index.html` en el navegador; no necesita servidor ni conexión.