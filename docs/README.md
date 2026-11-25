# Documentación del portafolio

Índice de la documentación del proyecto **pfd1795**. Cada documento tiene un propósito distinto;
mantenerlos sincronizados con el código es parte del mantenimiento (ver `AGENTS.md`).

## Para personas

- [`README.md`](../README.md) — introducción, características, ejecución local, estructura,
  despliegue, limitaciones y contacto.
- [`HUMANOS.md`](./HUMANOS.md) — apuntes para desarrolladores humanos (bajo demanda): decisiones,
  objetivos, módulos y aclaraciones. No es fuente de verdad para agentes.

## Para agentes y mantenimiento

- [`AGENTS.md`](../AGENTS.md) — arquitectura, mapa de módulos, inventario de claves de
  `localStorage`, convenciones de código, verificación manual, limitaciones conocidas y reglas de
  mantenimiento.
- [`INVARIANTES.md`](./INVARIANTES.md) — decisiones técnicas no deducibles del código.
- [`LIMITACIONES.md`](./LIMITACIONES.md) — limitaciones y deuda técnica verificadas.
- `AGENTS.md` locales por carpeta (la raíz es la referencia; los locales solo añaden reglas propias):
  - [`juegos/AGENTS.md`](../juegos/AGENTS.md) — reglas de la grilla y de los juegos integrados.
  - [`mis-estudios/AGENTS.md`](../mis-estudios/AGENTS.md) — reglas de la enciclopedia.
  - [`programas/AGENTS.md`](../programas/AGENTS.md) — reglas de la sección Programas.

## Juegos

- [`juegos/README.md`](../juegos/README.md) — guía para agregar y documentar juegos, manifiesto,
  checklist de calidad y solución de problemas.
- Documentación por juego: `../juegos/<slug>/README-juego.md`.

## Herramientas de desarrollo

Esta carpeta solo se lee a pedido explícito del desarrollador; no forma parte de la
documentación de referencia para agentes.

- [`prompts/crear-estudios.md`](./prompts/crear-estudios.md) — instrucciones para generar un
  artículo de la enciclopedia: contexto del proyecto (rutas, clases CSS, categorías, artículos
  publicados), ficha de trabajo, esqueleto canónico, checklist de calidad y contrato de salida.
- [`prompts/fichas-estudios.md`](./prompts/fichas-estudios.md) — fichas de trabajo (tema, slug,
  categoría, objetivo, secciones) de los temas de la enciclopedia, listas para pegar en el prompt
  anterior.
- [`prompts/crear-videojuegos.md`](./prompts/crear-videojuegos.md) — instrucciones para generar
  un juego nuevo integrado en el portafolio.
- [`prompts/crear-programas-web.md`](./prompts/crear-programas-web.md) — instrucciones para
  generar una herramienta web para la sección Programas (pregunta primero qué herramienta crear).

## Informes

- `docs/informes/` — **única** ubicación para informes de auditoría, planes de trabajo, listas de
  pendientes, trackers y demás hallazgos. Contiene el tracker de trabajo pendiente y los informes
  que se generan.
- `docs/informes/trabajo-pendiente.md` — tracker único de tareas abiertas del repo. Toda tarea
  pendiente nueva se agrega ahí; al cerrar un ítem se borra (nunca se marca resuelto ni se anexa
  historial).
- Consecuencias: nada de códigos de hallazgo, nada de historial ("se eliminó X", "antes hacía Y");
  se conserva la señal anti-regresión (`Eliminado:`, `DEPRECATED`, "no usar en código nuevo").

## Convenciones

- No reintroducir planes de tareas, fases ni auditorías/informes de estado: la documentación describe el
  estado real del código. Los inventarios temporales (como los hallazgos de auditoría) viven solo durante
  su ciclo de corrección y se eliminan al cerrarse.
- Las rutas de la documentación son relativas al archivo que las contiene.
