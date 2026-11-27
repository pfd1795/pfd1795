# Neon Retro Rally — Retro Arcade

Carpeta: `neon-rally/` · Archivo único: `index.html` (HTML + CSS + JS Vanilla embebidos).

## Descripción

Juego de carreras arcade en vista cenital con estética neon retro-arcade sobre tema oscuro.
Corre una carrera de **3 vueltas contra 3 rivales con IA** por circuitos procedurales que
cambian en cada carrera. Conduce con física arcade (aceleración, agarre lateral e inercia),
**derrapa** para sumar puntos, suelta el **turbo** recogido en la pista y pisa los pads de
aceleración. Funciona sin conexión, sin frameworks ni recursos externos.

## Mecánicas

- **Circuito procedural:** cada carrera genera un trazado cerrado nuevo a partir de puntos
  de control con una spline Catmull-Rom, remuestreado a distancia de arco uniforme. Siempre
  es circular, con curvas de radio variado y bordes de neón rosa.
- **Modo carrera:** 3 vueltas contra 3 rivales (NEXO, VOLT y KIRA) que siguen la trazada,
  frenan en curvas según su curvatura y tienen una goma elástica suave para mantener la
  carrera reñida. Tu posición (P1–P4) se muestra en el HUD en todo momento.
- **Física arcade con derrapes:** la velocidad se descompone en componente frontal y lateral.
  El agarre lateral es alto de normal, pero mantener **FRENO a alta velocidad en curva**
  lo reduce y provocas un derrape: el coche desliza, deja marcas en el asfalto y suelta
  chispas. Derrapar puntúa (+100 por tramo).
- **Turbo:** recoge los rayos amarillos de la pista para cargar turbos (máximo 2) y
  actívalos con SPACE o el botón TURBO: 1,35 s de aceleración y velocidad punta extra
  con llamas traseras. Los pickups regeneran a los 8 s.
- **Pads de aceleración:** chevrones cian sobre el asfalto que dan un mini impulso
  instantáneo (+25) al pasar por encima, con enfriamiento de 2 s.
- **Vueltas y anti-atajo:** la vuelta solo puntúa si pasas por los dos checkpoints
  intermedios (a 1/3 y 2/3 del trazado) antes de cruzar meta; el progreso se sigue con
  una ventana de búsqueda que impide recortes por el campo.
- **Fuera de pista:** pisar la hierba/purple reduces velocidad punta y agarre; si te sales
  demasiado, el coche se recoloca automáticamente a la trazada con breve invulnerabilidad.
- **Salida:** semáforo con cuenta atrás 3-2-1. Tu coche sale en la pole; los rivales,
  escalonados detrás de la línea.
- **Puntuación:** derrape +100 · pickup de turbo +150 · pad +25 · vuelta completada +1000 ·
  mejor vuelta +500 extra · bono final por posición (P1 +3000, P2 +1500, P3 +750, P4 +300).
- **HUD:** puntuación, récord, vuelta, posición, tiempo total, mejor vuelta y turbos
  disponibles, más un velocímetro con barra de color en el lienzo.
- **Estados:** Inicio, Cuenta atrás, Carrera, Pausa (P/Esc, botón, al ocultar la pestaña
  o abrir Opciones) y Final con desglose de resultados.

## Controles

### Escritorio

### Escritorio
teclas | accion
W / Flecha arriba
Acelerar
S / Flecha abajo
Frenar (a alta velocidad en curva: derrapar) / marcha atrás
A-D / Flechas laterales
Girar
SPACE
Soltar turbo (o empezar carrera)
P o Esc
Pausa / reanudar
Enter
Jugar / reanudar / nueva carrera
Móvil
Botones ◀ ▶ de dirección (mantener para girar) a la izquierda.
Botones GAS, FRENO y TURBO a la derecha; FRENO a alta velocidad provoca el derrape.
Botón Jugar (Jugar/Pausa/Seguir/Otra vez) y tocar el circuito para empezar o reanudar.
Arquitectura
Un único index.html autocontenido. El JS vive en una IIFE en modo estricto.
Secciones: constantes, estado global (game, player, ais), persistencia, generación
del circuito (spline + remuestreo + curvatura + Path2D del asfalto y los bordes),
física del jugador (descomposición frontal/lateral de la velocidad, agarre exponencial),
IA de rivales sobre la trazada, lógica de vueltas con checkpoints, entrada (teclado y
botones táctiles multi-pointer) y render por capas.
Render por capas: rejilla de fondo, marcas de derrape, asfalto (Path2D con trazos
anchos), línea de meta a cuadros, pads, pickups, rivales, jugador, partículas en modo
aditivo, popups, minimapa, velocímetro y overlays de estado.
Cámara que sigue al coche con anticipación en la dirección de la velocidad, más
sacudida (screen shake) fuera de pista y con turbo.
Canvas de 640×480 px lógicos (4:3) con buffer escalado por renderScale
(cssWidth / 640 × devicePixelRatio, máx. 2) para nitidez HiDPI; CSS lo hace
responsive con aspect-ratio y un máximo de 900 px.
Bucle con requestAnimationFrame y dt acotado a 50 ms; estados de juego con
actualización selectiva (la carrera solo avanza en estado RACE).
Minimapa generado del propio circuito (polilínea escalada) con meta, rivales y jugador.
DOM solo para cabecera, HUD, botones táctiles, modal de opciones y scanlines CRT.
Persistencia
Récord en localStorage con la clave única neon-rally_best_v1 (patrón <slug>_best_v1).
Se actualiza en vivo al superar el récord y se muestra aviso de "¡NUEVO RÉCORD!" en los
resultados finales.
Acceso envuelto en try/catch (degrada sin error si el almacenamiento está bloqueado).
Si en el futuro la clave cambia, migrar copiando el valor antiguo a la clave nueva y
borrando la antigua la primera vez que se abra el juego.
Posibles mejoras
Efectos de sonido y música sintetizados con Web Audio API (sin assets).
Fantasma (ghost) de tu mejor carrera y modo contrarreloj con semilla fija.
Semillas compartibles para correr siempre el mismo circuito.
Derrape cargable que rellene la barra de turbo, y pads de hastily reducción.
Más rivales, dificultad seleccionable y campeonato de varias carreras.
Ítems ofensivos/defensivos (escudo, aceite, rayo) y colisiones entre rivales.
Temas visuales alternativos (CRT verde, alto contraste, atardecer synthwave).
Soporte PWA para juego offline instalado y vibración háptica en móvil.

Para jugarlo: guarda ambos archivos en una carpeta `neon-rally/` y abre `index.html` en el navegador; no necesita servidor ni conexión.