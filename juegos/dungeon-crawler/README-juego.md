# Neon Depths

## Descripción

Dungeon crawler de acción con vista cenital, mazmorras procedurales y estética neón sobre tema oscuro, desarrollado íntegramente con HTML5, CSS3 y JavaScript Vanilla. La jugabilidad ocurre en un `<canvas>` de 640×480 sobre un mundo de 48×36 casillas de 40 px con cámara que sigue al jugador, sistema de iluminación con oscuridad recortada (jugador y antorchas) y sprites pixel art pre-renderizados; el DOM solo se usa para la cabecera, el HUD, los controles táctiles y el modal de opciones.

## Mecánicas

- Explora mazmorras generadas proceduralmente: 7-9 salas conectadas por pasillos de 2 casillas de ancho, con enlaces extra para crear atajos.
- Combate en tiempo real: golpe de espada en arco (120°) con retroceso de enemigos, enfriamiento de 340 ms y daño 2.
- Enemigos con IA distinta: slimes que deambulan y persiguen de cerca, murciélagos rápidos y erráticos, esqueletos que patrullan y acosan a distancia media.
- Cada 1-4 profundidad escala la vida y velocidad enemiga; en la **Profundidad 5** aguarda el **Guardián** (50 PV, embestida telegrafiada) que debe derrotarse para ganar.
- Objetivos por piso: encuentra la **llave** 🔑 para abrir la **escalera** y desciende; la escalera brilla en la oscuridad para ayudarte a orientarte.
- Objetos: orbes +10, pociones (+2 de vida o +25 puntos si estás lleno), botín ocasional de enemigos.
- 6 puntos de vida; el contacto enemigo quita 1-2 según tipo, con invulnerabilidad parpadeante y retroceso. A 0 PV, Game Over.
- Puntuación: slime 20, murciélago 30, esqueleto 50, Guardián 300, descender +100, victoria +500 + 25 por punto de vida restante.
- **Mini mapa** en la esquina: salas visitadas, conexiones, escalera y llave descubiertas, y posición del jugador.
- Antorchas parpadeantes sobre los muros crean zonas de luz en la oscuridad, clave para la atmósfera y la orientación.

## Controles

### Escritorio

- WASD o flechas: moverse (8 direcciones)
- Espacio o J: golpe de espada (mantén para atacar en cadena)
- P o Escape: pausa / reanudar
- Enter: jugar o reiniciar

### Móvil

- D-pad táctil para moverte en 4 direcciones
- Botón ATACAR redondo para la espada
- Tocar la pantalla: jugar, pausar y reanudar

## Arquitectura

Archivo único `index.html` con tres bloques:

- CSS: variables de tema neón, layout Flexbox, d-pad con CSS Grid y modal.
- HTML: barra superior (título + Opciones), HUD (puntuación, récord, profundidad, vida con corazones, llave, estado), canvas, controles táctiles y modal.
- JavaScript (IIFE en modo estricto):
  - Estados: START, LEVEL (transición entre profundidades), PLAYING, PAUSED, OVER y WIN.
  - **Generación procedural** (`generateFloor`): salas sin solapamiento con margen, tallado de salas y pasillos en L sobre un `Uint8Array`, conexión en cadena más 2 enlaces aleatorios, elección de sala inicial / llave / escalera (la más lejana), antorchas sobre muros y colocación de enemigos y objetos con reintento si el layout sale pobre.
  - Física con colisiones AABB resueltas por eje contra la rejilla; enemigos con knocking-back, rebote de dirección al chocar y resolución independiente de ejes para deslizarse por muros.
  - IA por tipo (deambular/persecución con ángulos) y máquina de fases del jefe (perseguir → telegrafiar → embestir).
  - Iluminación: lienzo fuera de pantalla con `globalCompositeOperation` `destination-out` y degradados radiales para recortar luz del jugador, antorchas y escalera.
  - Mini mapa dibujado desde `lvl.rooms` y `lvl.visited`.
  - Bucle con `requestAnimationFrame` y `dt` limitado; efectos de explosiones, popups de puntos y textos con brillo neón.

## Persistencia

- `localStorage` con clave `dungeon_best_v1` guarda el récord de puntuación.
- Acceso envuelto en try/catch para navegadores con almacenamiento bloqueado.
- Sin servidores ni almacenamiento externo.

## Posibles Mejoras

- Música ambiental y efectos de sonido con Web Audio API.
- Salas especiales: tesoro con trampas, tiendas de mercader, santuarios de curación.
- Nuevos enemigos: fantasmas que atraviesan muros, arqueros, jefes intermedios.
- Power-ups: espada de mayor alcance, botas de velocidad, armadura.
- Trampas activas: pinchos temporizados, placas de presión, flechas desde muros.
- Semilla de mazmorra reproducible y modo mazmorra infinita.
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