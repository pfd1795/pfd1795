# Nombre del juego

## Descripción

Resumen breve del videojuego: género, objetivo y estilo visual. Indica que está hecho con
HTML5, CSS3 y JavaScript vanilla, y que toda la jugabilidad se renderiza en `<canvas>`.

## Mecánicas

- Objetivo principal.
- Condición de victoria (si aplica).
- Condición de derrota.
- Puntuación y récord.
- Dificultad y progresión.
- Powerups, enemigos u obstáculos.

## Controles

### Escritorio

- Flechas o WASD: mover.
- Enter: jugar o reiniciar.
- P / Escape: pausa.

### Móvil

- Botones táctiles o D-pad.
- Tocar la pantalla para empezar.

## Arquitectura

Archivo único `index.html` con tres bloques:

- CSS: variables de tema, layout responsive y modal de opciones.
- HTML: barra superior (título + Opciones), HUD, canvas, controles táctiles y modal.
- JavaScript (IIFE en modo estricto): estados `START`, `PLAYING`, `PAUSED` y `OVER`,
  bucle con `requestAnimationFrame` y persistencia del récord.

## Persistencia

Clave de `localStorage` usada por el juego y qué datos guarda (por ejemplo, `template_best_v1`).
Debe ser única para evitar colisiones con otros juegos del portafolio.

## Posibles mejoras

- Ideas para futuras versiones.
- Contenido que se dejó fuera del alcance inicial.
