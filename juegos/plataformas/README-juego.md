# Neon Ninja

## Descripción

Plataformas 2D estilo run 'n gun clásico (Mario, Contra, Sonic, Shinobi) con estética neón sobre tema oscuro, desarrollado íntegramente con HTML5, CSS3 y JavaScript Vanilla. Toda la jugabilidad ocurre en un `<canvas>` de 640×360 con desplazamiento horizontal de cámara y sprites pixel art pre-renderizados; el DOM solo se usa para la cabecera, el HUD, los botones táctiles y el modal de opciones.

## Mecánicas

- Controlas a un ninja que corre, salta (con salto variable, *coyote time* y búfer de pulsación) y lanza hasta 3 shurikens simultáneos.
- 3 niveles con mapas de bloques diseñados a mano y dificultad creciente: plataformas elevadas, huecos, pinchos, robots patrulla y avispas voladoras.
- Puntuación: orbe +10, robot +50 (pisotón o shuriken), avispa +100 (solo shuriken), nivel completado +100.
- 3 vidas: un toque enemigo, un pincho o caer al vacío cuesta una vida y reinicia el nivel conservando la puntuación; tras el daño hay invulnerabilidad parpadeante.
- Derrota al quedarte sin vidas (Game Over); victoria al superar los 3 niveles y llegar a la bandera final.
- Cámara con seguimiento suave del jugador, fondo con estrellas y skyline con paralelaje.

## Controles

### Escritorio

- Flechas o A/D: moverse
- Espacio, ↑ o W: saltar (mantén pulsado para salto más alto)
- X o J: lanzar shuriken
- P o Escape: pausa / reanudar
- Enter: jugar o reiniciar

### Móvil

- Botones ◀ ▶: moverse (mantener pulsado)
- SALTAR: saltar · SHURIKEN: disparar
- Tocar la pantalla: jugar, pausar y reanudar

## Arquitectura

Archivo único `index.html` con tres bloques:

- CSS: variables de tema neón, layout Flexbox, botones táctiles con media queries y modal.
- HTML: barra superior (título + Opciones), barra secundaria (HUD: puntuación, récord, nivel, vidas, estado), canvas, botones táctiles y modal.
- JavaScript (IIFE en modo estricto):
  - Estados: START, LEVEL (transición entre niveles), PLAYING, PAUSED, OVER y WIN.
  - Niveles definidos como matrices de caracteres (X sólido, ^ pinchos, o orbe, W robot, F avispa, S inicio, G meta) con normalización de filas al cargar.
  - Física con gravedad, colisiones AABB resueltas por eje contra la rejilla de bloques, coyote time, búfer de salto y salto variable.
  - Enemigos: robots con gravedad que giran ante muros, bordes y pinchos; avispas con patrulla sinusoidal. Pisotón con rebote estilo clásico.
  - Sprites como matrices de caracteres pre-renderizados en canvases fuera de pantalla; shurikens giratorios dibujados por código.
  - Bucle con `requestAnimationFrame` y `dt` limitado; efectos de explosiones, popups de puntos y textos con brillo neón.

## Persistencia

- `localStorage` con clave `ninja_best_v1` guarda el récord.
- Acceso envuelto en try/catch para navegadores con almacenamiento bloqueado.
- Sin servidores ni almacenamiento externo.

## Posibles Mejoras

- Música y efectos de sonido con Web Audio API (salto, shuriken, daño).
- Selector de dificultad y temas visuales alternativos.
- Doble salto, wall jump y dash estilo Shinobi.
- Enemigos nuevos: torretas, Saltadores, jefes de fin de nivel.
- Checkpoints a mitad de nivel y niveles adicionales.
- Monedas de vida extra y power-ups (escudo, disparo triple).
- Modo PWA para jugar sin conexión.

## Estructura del proyecto

```text
proyecto/
├── index.html
├── README-juego.md
├── assets/
│   ├── sprites/
│   ├── sounds/
│   ├── fonts/
│   └── ui/
├── docs/
│   └── ideas-futuras.md
└── backups/
```