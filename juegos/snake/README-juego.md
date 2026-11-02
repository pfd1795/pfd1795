# Snake Retro

## Descripción

Snake clásico con estética arcade neón sobre tema oscuro, desarrollado íntegramente con HTML5, CSS3 y JavaScript Vanilla. Todo el juego se renderiza en un `<canvas>` de 20×20 celdas; el DOM solo se usa para la cabecera, el HUD, el D-pad táctil y el modal de opciones.

## Mecánicas

- La serpiente avanza automáticamente en la dirección actual.
- Cada comida suma 10 puntos y hace crecer el cuerpo un segmento.
- La velocidad aumenta progresivamente: el intervalo baja 3 ms por comida, desde 150 ms hasta un mínimo de 65 ms (el HUD muestra el multiplicador).
- Fin de partida: chocar contra una pared o contra el propio cuerpo.
- Victoria: completar el tablero (ocupar las 400 celdas).
- El récord se guarda automáticamente y se muestra "¡Nuevo récord!" al superarlo.

## Controles

### Escritorio

- Flechas o WASD: mover la serpiente
- Espacio o P: pausa / reanudar
- Escape: pausa / cerrar opciones
- Enter: jugar o reiniciar

### Móvil

- D-pad táctil: mover la serpiente
- Tocar la pantalla: jugar, pausar y reanudar

## Arquitectura

Archivo único `index.html` con tres bloques:

- CSS: variables de tema neón, layout con Flexbox/Grid, D-pad con media queries y modal.
- HTML: barra superior (título + botón Opciones), barra secundaria (HUD), canvas, D-pad y modal.
- JavaScript (IIFE en modo estricto):
  - Estados: START, PLAYING, PAUSED, OVER.
  - Bucle con `requestAnimationFrame` y acumulador de tiempo para pasos a intervalo fijo.
  - Cola de direcciones (máximo 2) que evita giros de 180°.
  - Colisiones de pared y cuerpo; comida generada solo en celdas libres.
  - Renderizado Canvas 2D con brillos neón (`shadowBlur`) y textos parpadeantes.

## Persistencia

- `localStorage` con clave `snake_best_v1` guarda el récord.
- Acceso envuelto en try/catch para navegadores con almacenamiento bloqueado.
- Sin servidores ni almacenamiento externo.

## Posibles Mejoras

- Música y efectos de sonido con Web Audio API.
- Selector de dificultad (velocidad base configurable).
- Temas visuales alternativos (claro, monocromo, CRT con scanlines).
- Obstáculos y power-ups (doble puntos, cámara lenta, fantasma).
- Gestos de deslizamiento (swipe) como control alternativo.
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