# Neon Racer

## Descripción

Juego de carreras arcade clásico con estética neón sobre tema oscuro, desarrollado íntegramente con HTML5, CSS3 y JavaScript Vanilla. Toda la jugabilidad ocurre en un `<canvas>` vertical de 480×640 con sprites pixel art pre-renderizados; el DOM solo se usa para la cabecera, el HUD, los botones táctiles y el modal de opciones.

## Mecánicas

- Conduces un coche en una autopista de 3 carriles que se desplaza hacia abajo; el tráfico (coches y camiones) circula en tu misma dirección pero más lento.
- La velocidad del jugador aumenta sola y sin límite de tiempo: de 220 px/s hasta 560 px/s (el HUD la muestra como km/h).
- Puntuación: 1 punto por cada 10 px recorridos, más 10 puntos extra por cada vehículo adelantado.
- Dificultad progresiva: el intervalo de aparición de tráfico se reduce con la distancia y los vehículos circulan cada vez más despacio (más difícil de esquivar).
- Nunca se bloquean los 3 carriles a la vez: siempre existe al menos una vía libre.
- Fin de partida: un solo choque contra el tráfico. La explosión congela la escena y aparece el marcador final.
- Partida infinita: no hay victoria, solo superar tu propio récord.

## Controles

### Escritorio

- Flechas o A/D: mover el coche a los lados
- Espacio o P: pausa / reanudar
- Escape: pausa / cerrar opciones
- Enter: jugar o reiniciar

### Móvil

- Botones ◀ ▶: mover (mantener pulsado)
- Tocar la pantalla: jugar, pausar y reanudar

## Arquitectura

Archivo único `index.html` con tres bloques:

- CSS: variables de tema neón, layout Flexbox, botones táctiles con media queries y modal.
- HTML: barra superior (título + Opciones), barra secundaria (HUD: puntuación, récord, velocidad, estado), canvas, botones táctiles y modal.
- JavaScript (IIFE en modo estricto):
  - Estados: START, PLAYING, PAUSED, OVER.
  - Sprites definidos como matrices de caracteres y pre-renderizados en canvases fuera de pantalla (coche del jugador, coches y camiones en 3 colores).
  - Bucle con `requestAnimationFrame` y `dt` limitado; desplazamiento continuo de la carretera (líneas de carril y marcas laterales) según la velocidad.
  - Spawner de tráfico que garantiza siempre un carril libre y colisiones AABB contra el jugador.
  - Efectos: explosiones radiales, popups de "+10" al adelantar y textos con brillo neón.

## Persistencia

- `localStorage` con clave `neon-racer_best_v1` guarda el récord (la clave
  antigua `racer_best_v1` se migra automáticamente).
- Acceso envuelto en try/catch para navegadores con almacenamiento bloqueado.
- Sin servidores ni almacenamiento externo.

## Posibles Mejoras

- Música y efecto de motor/skid con Web Audio API.
- Selector de dificultad y temas visuales alternativos.
- Curvas de la carretera y cambios de escenario (día/noche, túnel).
- Power-ups: turbo, escudo, x2 puntos.
- Modo a dos jugadores alternados y tabla de récords múltiple.
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