# Documentación del portafolio

Índice de la documentación del proyecto **pfd1795**. Cada documento tiene un propósito distinto;
mantenerlos sincronizados con el código es parte del mantenimiento (ver `AGENTS.md`).

## Para personas

- [`README.md`](../README.md) — introducción, características, ejecución local, estructura,
  despliegue, limitaciones y contacto.

## Para agentes y mantenimiento

- [`AGENTS.md`](../AGENTS.md) — arquitectura, mapa de módulos, inventario de claves de
  `localStorage`, convenciones de código, verificación manual, limitaciones conocidas y reglas de
  mantenimiento.
- `AGENTS.md` locales por carpeta (la raíz es la referencia; los locales solo añaden reglas propias):
  - [`juegos/AGENTS.md`](../juegos/AGENTS.md) — reglas de la grilla y de los juegos integrados.
  - [`mis-estudios/AGENTS.md`](../mis-estudios/AGENTS.md) — reglas de la enciclopedia.
- [`AUDITORIA.md`](./AUDITORIA.md) — hoja de verificación para auditar el proyecto.
- [`HALLAZGOS.md`](./HALLAZGOS.md) — informe de auditoría (2026-11-05) y su resolución.

## Juegos

- [`juegos/README.md`](../juegos/README.md) — guía para agregar y documentar juegos, manifiesto,
  checklist de calidad y solución de problemas.
- Documentación por juego: `../juegos/<slug>/README-juego.md`.

## Herramientas de desarrollo

Esta carpeta solo se lee a pedido explícito del desarrollador; no forma parte de la
documentación de referencia para agentes.

- [`prompts/crear-videojuegos.md`](./prompts/crear-videojuegos.md) — instrucciones para generar
  un juego nuevo integrado en el portafolio.
- [`prompts/portadas-juegos.md`](./prompts/portadas-juegos.md) — instrucciones para generar
  las portadas (pixel art retro arcade) de los juegos y su integración en la grilla.

## Convenciones

- No reintroducir planes de tareas, fases ni auditorías obsoletas; el estado real está en el código.
- Las rutas de la documentación son relativas al archivo que las contiene.
