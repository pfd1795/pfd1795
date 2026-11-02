# Damas Arcade

## Descripción

Damas con reglas españolas en una sola página web (`index.html`), renderizado
íntegramente en Canvas 2D con estética retro arcade (pixel art, tema oscuro).
Incluye modo de un jugador contra una IA propia (negamax con poda alfa-beta,
extensión de capturas forzadas y tres niveles de dificultad) y modo de dos
jugadores en el mismo dispositivo. Sin frameworks, librerías, CDNs ni recursos
externos: funciona sin conexión.

## Mecánicas

- Reglas españolas sobre tablero 8x8 con 12 piezas por bando.
- Los peones avanzan una casilla en diagonal y capturan hacia adelante y hacia atrás.
- Las damas son voladoras: se deslizan cualquier distancia por su diagonal.
- Captura obligatoria con ley de cantidad: si hay varias opciones, debe elegirse
  la que capture el máximo número de piezas.
- Multi-capturas encadenadas: la pieza sigue capturando mientras pueda; las piezas
  capturadas permanecen en el tablero hasta el final de la jugada y no pueden
  saltarse dos veces.
- Coronación solo al terminar la jugada en la última fila (un peón que pasa por
  ella durante una captura continúa la captura como peón).
- Pierde quien se queda sin jugadas legales (piezas capturadas o bloqueadas).
- Tablas por: dama contra dama, 25 jugadas de damas sin capturas ni avances de
  peón, y triple repetición de posición.
- Resaltado de pieza seleccionada, camino recorrido en multi-capturas, destinos
  (punto verde), piezas a capturar (anillo rojo) y último movimiento.
- Animación de movimientos (incluidas multi-capturas) y aviso de captura obligatoria.
- Puntuación: peón capturado 1 punto, dama 2 puntos. Récord persistente
  (victorias, derrotas, tablas y racha) solo en modo 1 jugador.

## Controles

### Escritorio

- Clic: seleccionar pieza / mover al destino.
- Multi-captura: clic en cada casilla del camino (los puntos verdes marcan el
  siguiente salto y el anillo rojo la pieza a capturar).
- Clic sobre la pieza seleccionada: deseleccionar.
- `U`: deshacer la jugada completa (retira también la respuesta de la IA).
- `Esc`: pausa / reanudar · `Enter`: confirmar en pantallas de fin.
- Cualquier tecla en el menú: iniciar partida.

### Móvil

- Tocar una pieza y luego el destino (o cada salto de la multi-captura).
- Botones ⏸ (pausa) y ↶ (deshacer) en la barra secundaria.
- Tocar la pantalla en el menú para empezar.

## Arquitectura

Todo vive en `index.html`, organizado en secciones:

- **Sprites pixel art**: matrices de 16x16 caracteres (peón y dama, con corona
  dorada) convertidas a canvas offscreen por color, dibujadas con
  `imageSmoothingEnabled=false`.
- **Motor de damas**: tablero de 64 casillas; generación de jugadas como
  secuencias completas (camino + capturas). Las multi-capturas se generan por
  DFS; las piezas capturadas permanecen en el tablero durante la búsqueda y no
  pueden saltarse dos veces. Filtro de ley de cantidad y contador de jugadas sin
  progreso. Hash de posición para repeticiones y registro hacer/deshacer
  (`makeMove`/`unmakeMove`).
- **IA**: evaluación (peón 100, dama 260, avance de peones, defensa de última
  fila, centralidad de damas), negamax con poda alfa-beta, extensión automática
  de cadenas de capturas en el horizonte y ordenación de jugadas.
- **Renderizador Canvas**: tablero, coordenadas, resaltados, camino de
  multi-captura, animaciones por pasos y fantasmas de captura que se desvanecen.
- **UI DOM**: solo cabecera, barra de estado, overlays (menú, pausa, fin) y
  modal de opciones; toda la jugabilidad ocurre en el canvas.
- **Máquina de estados**: `menu → playing ⇄ paused → gameover`.

## Persistencia

`localStorage` (clave `damas-arcade-v1`) guarda: victorias, derrotas, tablas,
racha actual, mejor racha y los ajustes del menú (modo, dificultad y color). Si
el almacenamiento no está disponible, el juego funciona igualmente sin récord.

## Posibles Mejoras

- Efectos de sonido con WebAudio API (el modal de opciones ya los lista).
- Cronómetro de partida y modos de ritmo.
- Temas visuales alternativos (el modal ya lo prevé).
- Deshacer parcial dentro de una multi-captura.
- Historial de jugadas con navegación y notación de damas.
- Rotación automática del tablero en modo 2 jugadores.

## Estructura del proyecto

```text
proyecto/

├── index.html
├── README-juego.md
│
├── assets/
│   ├── sprites/          (vacío: sprites generados por código)
│   ├── sounds/           (reservado para futuros efectos)
│   ├── fonts/            (reservado)
│   └── ui/               (reservado)
│
├── docs/
│   └── ideas-futuras.md  (reservado para mejoras)
│
└── backups/              (reservado)
```

## Cómo ejecutar

Abrir `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge,
Safari), en escritorio o móvil. No requiere servidor, instalación ni conexión
a Internet.