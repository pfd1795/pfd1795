# Ajedrez Arcade

## Descripción

Ajedrez completo en una sola página web (`index.html`), renderizado íntegramente en
Canvas 2D con estética retro arcade (pixel art, tema oscuro). Incluye modo de un
jugador contra una IA propia (negamax con poda alfa-beta, búsqueda de quiescencia y
tablas de posición, tres niveles de dificultad) y modo de dos jugadores en el mismo
dispositivo. Sin frameworks, librerías, CDNs ni recursos externos: funciona sin
conexión.

## Mecánicas

- Reglas completas del ajedrez: movimiento de las 6 piezas, enroque (corto y largo),
  captura al paso, coronación con elección de pieza, jaque, jaque mate y ahogado.
- Tablas por: material insuficiente, regla de 50 movimientos y triple repetición.
- IA con 3 niveles: Fácil (profundidad 1 + variedad aleatoria), Normal (2) y
  Difícil (3), todos con quiescencia para evitar capturas ciegas.
- Resaltado de pieza seleccionada, destinos legales (punto = movimiento,
  anillo = captura), último movimiento y jaque en el rey.
- Animación de movimiento de piezas y contador de material capturado.
- Puntuación: puntos de material capturado por cada bando (peon 1, caballo/alfil 3,
  torre 5, dama 9). Récord persistente (victorias, derrotas, tablas y racha) solo en
  modo 1 jugador.

## Controles

### Escritorio

- Clic: seleccionar pieza / mover al destino.
- `U`: deshacer movimiento (retira también la respuesta de la IA).
- `Esc`: pausa / reanudar.
- `Enter`: confirmar en pantallas de fin / reanudar.
- Cualquier tecla en el menú: iniciar partida.

### Móvil

- Tocar una pieza y luego el destino.
- Botones ⏸ (pausa) y ↶ (deshacer) en la barra secundaria.
- Tocar la pantalla en el menú para empezar.

## Arquitectura

Todo vive en `index.html`, organizado en secciones:

- **Sprites pixel art**: matrices de 16x16 caracteres convertidas a canvas
  offscreen (una por tipo de pieza y color), dibujadas con `imageSmoothingEnabled=false`.
- **Motor de ajedrez**: tablero de 64 casillas, generación de movimientos
  pseudo-legales + filtro de legalidad con hacer/deshacer (`make`/`unmake`),
  derechos de enroque, casilla de al paso, reloj de 50 jugadas y hash de posición
  para repeticiones.
- **IA**: evaluación (material + tablas PST), negamax con poda alfa-beta,
  quiescencia de capturas y ordenación MVV-LVA.
- **Renderizador Canvas**: tablero, coordenadas, resaltados, animaciones y piezas.
- **UI DOM**: solo cabecera, barra de estado, overlays (menú, pausa, fin,
  coronación) y modal de opciones; toda la jugabilidad ocurre en el canvas.
- **Máquina de estados**: `menu → playing ⇄ paused → gameover`.

## Persistencia

`localStorage` (clave `ajedrez-arcade-v1`) guarda: victorias, derrotas, tablas,
racha actual, mejor racha y los ajustes del menú (modo, dificultad y color). Si el
almacenamiento no está disponible, el juego funciona igualmente sin récord.

## Posibles Mejoras

- Efectos de sonido con WebAudio API (el modal de opciones ya los lista).
- Cronómetro de partida y modos de ritmo (blitz, rapid).
- Temas visuales alternativos (el modal ya lo prevé).
- Biblioteca de aperturas para la IA y tabla de finales básica.
- Historial jugable con navegación por movimientos y exportación PGN.
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

Abrir `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge, Safari),
en escritorio o móvil. No requiere servidor, instalación ni conexión a Internet.