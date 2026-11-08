# Dodge Arena — Retro Arcade

Carpeta: `dodge-arena/` · Archivo único: `index.html` (HTML + CSS + JS Vanilla embebidos).

## Descripción

Arena minimalista de supervivencia en vista cenital con estética neon retro-arcade sobre tema
oscuro. **Sin mecánica de ataque**: tu única herramienta es moverte y el dash mientras
esquivas proyectiles que rebotan elásticamente en los muros. Modo infinito por oleadas: no
hay condición de victoria, la "victoria" es superar tu récord. Funciona sin conexión, sin
frameworks ni recursos externos.

## Mecánicas

- **Arena cerrada:** cuadrada, con muros de neón cian que reflejan los proyectiles
  (ángulo de incidencia = ángulo de reflexión, sin perder velocidad). Sin obstáculos
  interiores: minimalismo puro. El jugador no rebota, se desliza por los bordes.
- **Proyectiles rebotantes:** conviven hasta 40 a la vez. Vida limitada (parpadean antes
  de esfumarse) para que la arena se renueve. Tipos:
  - *Bouncer* (rosa): clásico rebotador, desde la oleada 1.
  - *Seeker* (amarillo): persigue despacio con giro limitado; no rebota, muere contra el
    muro. Desde la oleada 2.
  - *Splitter* (violeta): al segundo rebote se fragmenta en 2-3 shards rápidos. Desde la
    oleada 3.
  - *Heavy* (naranja): grande y lento, ocupa espacio y empuja el tráfico. Desde la oleada 5.
- **Aparición justa:** todo proyectil se anuncia con un marcador telegráfico (punto de
  mira parpadeante con anillo que se cierra, ~0,6 s) junto al borde antes de aparecer,
  apuntando hacia dentro (a veces hacia ti, con dispersión).
- **Oleadas:** cada 25 s sube el nivel de amenaza con anuncio "OLEADA N": más frecuencia
  de spawn, más velocidad y tipos nuevos. Superar una oleada puntúa.
- **Derrota y vidas:** 3 vidas. Al ser tocado pierdes 1, ganas 2 s de invulnerabilidad y
  un pulso verde repele los proyectiles cercanos. Sin vidas → Game Over.
- **Dash:** impulso rápido en la dirección de movimiento (o de la última direccional si
  estás parado), 0,2 s de invulnerabilidad y cooldown de 1,5 s con anillo indicador
  alrededor del jugador (arco de recarga).
- **Near miss:** rozar un proyectil rápido sin chocar suma +50, con micro-sacudida de
  pantalla y vibración (máximo 1 por proyectil por segundo).
- **Powerups defensivos (nunca ataques tú):** aparecen por la arena (máximo 2, vida 10 s):
  - *Escudo* (hexágono cian): absorbe 1 golpe; si ya lo tienes, +250.
  - *Cámara lenta* (rombo violeta): 3 s con los proyectiles y spawns al 45 % de velocidad;
    tú te mueves a velocidad normal.
  - *Pulso limpiador* (anillos verdes): destruye con +25 todos los proyectiles en 160 px.
- **Puntuación:** 10 pts/s supervivido + 50 por near miss + 250 × oleada superada +
  25 por proyectil barrido con el pulso (+250 si coges escudo con uno activo).
- **HUD:** puntuación, récord, vidas, oleada, tiempo, estado del dash y etiqueta de estado.
- **Estados:** Inicio (con proyectiles rebotando de fondo en modo atracción),
  Supervivencia, Pausa (P/Esc, botón, al ocultar la pestaña o abrir Opciones) y
  Game Over con desglose.

## Controles

### Escritorio
teclas | accion
W-A-S-D / Flechas
Mover
SPACE o SHIFT
Dash (o empezar partida)
P o Esc
Pausa / reanudar
Enter
Jugar / reanudar / nueva partida
Móvil
Joystick dinámico: toca la arena y arrastra; la base aparece donde tocas y la
palanca sigue tu dedo (zona muerta de 8 px, radio máximo 44 px).
Botón DASH (amarillo) y botón Jugar (Jugar/Pausa/Seguir/Otra vez).
Tocar la arena también empieza o reanuda la partida.
Arquitectura
Un único index.html autocontenido. El JS vive en una IIFE en modo estricto.
Secciones: constantes, estado global (game, player, arrays projs/telegraphs/
powers), persistencia, jugador (movimiento con inercia, dash con buffer de un frame),
proyectiles (spawn telegrafiado, reflexión especular, seeker con giro limitado, splitter
con fragmentación), oleadas, powerups, colisiones, entrada (teclado + joystick multi-
pointer con setPointerCapture) y render por capas.
Física de rebote: reflexión por componente (vx = ±|vx|) al cruzar cada muro, con
chispas y contador de rebotes para el splitter.
Pausa selectiva: solo el estado PLAY actualiza la simulación; START ejecuta solo los
proyectiles de atracción y la cosmética; PAUSE congela todo.
Canvas de 480×640 px lógicos (3:4 vertical) con buffer escalado por renderScale
(cssWidth / 480 × devicePixelRatio, máx. 2) para nitidez HiDPI; CSS lo hace
responsive con aspect-ratio y un máximo de 560 px.
Bucle con requestAnimationFrame y dt acotado a 50 ms; la cámara lenta es un factor
de tiempo (sdt) aplicado solo a proyectiles, spawns y powerups.
Efectos: partículas aditivas (rebotes, dash, explosiones), anillos de pulso expansivos,
popups flotantes, screen shake acumulativo con decaimiento exponencial y vibración
háptica en móvil.
DOM solo para cabecera, HUD, botones táctiles, modal de opciones y scanlines CRT.
Persistencia
Récord en localStorage con la clave única dodge-arena_best_v1 (patrón <slug>_best_v1).
Se actualiza en vivo al superar el récord y se muestra aviso de "¡NUEVO RÉCORD!" en el
Game Over.
Acceso envuelto en try/catch (degrada sin error si el almacenamiento está bloqueado).
Si en el futuro la clave cambia, migrar copiando el valor antiguo a la clave nueva y
borrando la antigua la primera vez que se abra el juego.
Posibles mejoras
Efectos de sonido y música sintetizados con Web Audio API (sin assets).
Dificultad seleccionable (spawn más lento/rápido, más vidas) y modo contrarreloj.
Muros internos ocasionales que se abren y cierran, manteniendo el minimalismo.
Más powerups: imán inverso, decoy/cebo, tiempo congelado.
Tipos nuevos: proyectil telescópico que acelera, rebotador que se divide en cada toque.
Tabla de mejores puntuaciones (top 5) y estadísticas acumuladas.
Temas visuales alternativos (CRT verde, alto contraste, atardecer synthwave).
Soporte PWA para juego offline instalado.

Para jugarlo: guarda ambos archivos en una carpeta `dodge-arena/` y abre `index.html` en el navegador; no necesita servidor ni conexión.