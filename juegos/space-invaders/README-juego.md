# Space Invaders Retro

## Descripción

Space Invaders clásico con estética arcade neón sobre tema oscuro, desarrollado íntegramente con HTML5, CSS3 y JavaScript Vanilla. Toda la jugabilidad ocurre en un `<canvas>` de 480×540 con sprites pixel art pre-renderizados; el DOM solo se usa para la cabecera, el HUD, los botones táctiles y el modal de opciones.

## Mecánicas

- Flota de 50 aliens (5 filas × 10 columnas) que marcha lateralmente, desciende al tocar el borde y acelera a medida que quedan menos aliens.
- Puntuación clásica por tipo: calamar 30, cangrejo 20, pulpo 10 puntos. El OVNI bonus cruza la parte superior y vale 50/100/150/300 al azar.
- Una sola bala del jugador en pantalla (estilo clásico); los aliens disparan desde las columnas vivas con cadencia y velocidad crecientes.
- 4 búnkers destructibles ladrillo a ladrillo; los aliens los erosionan al pisarlos.
- 3 vidas: al ser tocado, la acción se congela un instante y el cañón reaparece con parpadeo de invulnerabilidad.
- Derrota: quedarte sin vidas o sufrir la invasión (que los aliens lleguen a tu línea).
- Oleadas infinitas: cada nueva flota arranca más abajo y más rápida; los búnkers se reconstruyen.
- La velocidad de marcha, el intervalo de disparo enemigo y el número máximo de balas enemigas escalan con la oleada.

## Controles

### Escritorio

- Flechas o A/D: mover el cañón
- Espacio: disparar (también inicia la partida)
- P o Escape: pausa / reanudar
- Enter: jugar o reiniciar

### Móvil

- Botones ◀ ▶: mover (mantener pulsado)
- DISPARAR: disparar (mantener para fuego continuo)
- Tocar la pantalla: jugar, pausar y reanudar

## Arquitectura

Archivo único `index.html` con tres bloques:

- CSS: variables de tema neón, layout Flexbox, controles táctiles con media queries y modal.
- HTML: barra superior (título + Opciones), barra secundaria (HUD: puntuación, récord, oleada, vidas, estado), canvas, botones táctiles y modal.
- JavaScript (IIFE en modo estricto):
  - Estados: START, PLAYING, PAUSED, WAVE (transición entre oleadas) y OVER.
  - Sprites definidos como matrices de caracteres y pre-renderizados en canvases fuera de pantalla (2 fotogramas por alien).
  - Bucle con `requestAnimationFrame` y `dt` limitado; la flota avanza a pasos discretos con intervalo dinámico según aliens vivos y oleada.
  - Colisiones AABB contra aliens, OVNI, búnkers (con destrucción de ladrillos y vecinos), jugador y límites.
  - Efectos: explosiones radiales, popups de puntos, estrellas titilantes y textos con brillo neón.

## Persistencia

- `localStorage` con clave `invaders_best_v1` guarda el récord.
- Acceso envuelto en try/catch para navegadores con almacenamiento bloqueado.
- Sin servidores ni almacenamiento externo.

## Posibles Mejoras

- Música de fondo y efectos de sonido con Web Audio API (incluido el clásico "latido" de la flota).
- Selector de dificultad y temas visuales alternativos.
- Tipos de bala enemiga clásicos (rolling, plunger, squiggly).
- Bono extra por precisión y estadísticas de fin de partida.
- Gestos de deslizamiento como control alternativo.
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