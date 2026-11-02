# Dulce Explosión — Match-3 Arcade

## Descripción

Puzzle match-3 estilo Candy Crush con estética retro arcade oscura. Intercambia
caramelos adyacentes para alinear 3 o más del mismo tipo, genera caramelos
especiales, encadena cascadas con multiplicador de combo y alcanza la meta de
puntos de cada nivel antes de agotar tus movimientos. Los niveles son infinitos
y la dificultad crece en cada uno.

## Mecánicas

- Tablero 8×8, 6 tipos de caramelos (color + forma, para accesibilidad).
- Intercambio válido solo entre casillas adyacentes; si no genera combinación,
  la jugada se revierte y no consume movimiento.
- Puntuación: 20 puntos por caramelo × multiplicador de combo de la cascada.
- Especiales:
  - Combinar 4 en línea → **caramelo rayado** (limpia fila o columna).
  - Combinar en L o T → **bomba** (explosión 3×3).
  - Combinar 5 en línea → **bomba de color** (elimina todos los caramelos de un color).
  - Intercambiar especiales entre sí activa efectos combinados
    (bomba de color + bomba de color = limpia todo el tablero).
- Cascadas: las combinaciones en cadena suben el combo (x2, x3, …) y multiplican puntos.
- Niveles: meta = 1500 + 750 × (nivel − 1); 20 movimientos por nivel.
- Sin movimientos válidos el tablero se mezcla automáticamente.
- Derrota: movimientos agotados sin alcanzar la meta. Victoria: meta alcanzada.
- Pista automática tras 5 segundos de inactividad.

## Controles

### Escritorio

- Ratón: clic en un caramelo y clic en un vecino para intercambiar, o arrastrar en la dirección deseada.
- Teclado: flechas mueven el cursor; Enter/Espacio selecciona; con selección, flechas = intercambiar.
- ESC o P: pausa. Enter en pantallas de inicio/fin: acción principal.

### Móvil

- Tocar dos casillas vecinas o arrastrar desde una casilla hacia la dirección del intercambio.
- Toques en botones de overlay (JUGAR, REANUDAR, etc.).

## Arquitectura

Proyecto de archivo único: todo (HTML, CSS, JS) vive en `index.html`, sin
dependencias ni conexión. Estructura del repositorio preparada para crecer:

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