# Documentación del portafolio

Índice de la documentación del proyecto **pfd1795**. Cada documento tiene un propósito distinto;
mantenerlos sincronizados con el código es parte del mantenimiento (ver `AGENTS.md`).

## Para personas

- [`README.md`](../README.md) — introducción, características, ejecución local, estructura,
  despliegue, limitaciones y contacto.

## Para agentes y mantenimiento

- [`AGENTS.md`](../AGENTS.md) — arquitectura, convenciones de código, patrones de diseño,
  internacionalización, limitaciones conocidas y reglas de mantenimiento.
- [`MEJORAS.md`](./MEJORAS.md) — historial de mejoras implementadas y roadmap de pendientes.

## Juegos

- [`juegos/README.md`](../juegos/README.md) — guía para agregar y documentar juegos, manifiesto,
  checklist de calidad y solución de problemas.
- [`prompts/crear-videojuegos.md`](./prompts/crear-videojuegos.md) — prompt/instrucciones para generar
  un juego nuevo integrado en el portafolio.
- [`prompts/portadas-juegos.md`](./prompts/portadas-juegos.md) — prompt/instrucciones para generar
  las 3 portadas (pixel art retro arcade) de cada juego y su integración en la grilla.
- Documentación por juego: `../juegos/<slug>/README-juego.md`.

## Convenciones

- No reintroducir planes de tareas ni auditorías obsoletas; el estado real está en el código.
- Una mejora completada se mueve de "pendientes" a "implementadas" en `docs/MEJORAS.md` en el mismo
  cambio de código.
- Las rutas de la documentación son relativas al archivo que las contiene.
