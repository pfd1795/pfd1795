# INVARIANTES.md — Decisiones técnicas no deducibles del código

> 📌 **Decisiones que un agente sin historial podría revertir por error.**
> Cada entrada lleva evidencia `archivo:línea` cuando es aplicable; los archivos binarios se citan
> por ruta. No borrar sin decisión formal.
> Los agentes deben leer este archivo antes de tocar las áreas afectadas.

## 1. Paleta de arcoíris duplicada a propósito

- **Decisión:** la paleta del modo `multicolor` está duplicada en dos sitios y **debe mantenerse así**.
- **Por qué:** `scripts/theme-init.js` es un script clásico que no puede importar módulos ES.
- **Evidencia:** `scripts/utils/themeBackgrounds.js:74` (`RAINBOW_GRADIENT`) y `scripts/theme-init.js:41` (`ARCOIRIS`). Cualquier cambio de paleta se hace en **ambos** sitios.
- **Señal anti-regresión:** no unificar en un solo módulo; no borrar la duplicación.

## 2. Excepción `pages/my-programs/dj/index.html` (autocontenida)

- **Decisión:** `pages/my-programs/dj/index.html` es una estación de música autocontenida con tema y estilos propios (`dj.css`, `dj.js`); no carga el chrome compartido, usa su propio favicon inline y registra el service worker desde `dj.js`.
- **Por qué:** su naturaleza (audio en tiempo real) exige aislamiento.
- **Evidencia:** `pages/my-programs/AGENTS.md:19-22`.
- **Señal anti-regresión:** no replicar esta excepción en herramientas nuevas; no intentar "unificar" `pages/my-programs/dj/index.html` con el chrome compartido.

## 3. CV PDF sin enlazar por decisión del desarrollador

- **Decisión:** `assets/files/PabloDiazCV.pdf` (238 KB) se mantiene en el repositorio **sin enlazar**. Es material para reenlazar si se recupera el botón de descarga.
- **Evidencia:** `docs/LIMITACIONES.md:42` y `assets/files/PabloDiazCV.pdf` (238116 bytes), sin referencias en HTML, JS ni CSS.
- **Señal anti-regresión:** no borrar el PDF; no añadir enlaces a él sin petición explícita.

## 4. Claves de récord `<slug>_best_v1` y migración

- **Decisión:** cada juego guarda su récord bajo `<slug>_best_v1` en `localStorage`. Los juegos que usaron otra clave migran automáticamente (copian el valor a la clave nueva y borran la antigua al abrir).
- **Evidencia:** `AGENTS.md` § "Inventario de claves de localStorage" (líneas 374-396); `pages/my-games/AGENTS.md:33-36`.
- **Señal anti-regresión:** no renombrar slugs publicados sin actualizar carpeta, manifiesto y clave; no borrar claves antiguas sin migración.

## 5. Juegos no se adaptan al chrome del portafolio

- **Decisión:** los juegos son estáticos y autocontenidos en `pages/my-games/<slug>/index.html`; no se editan para adaptarlos al chrome del portafolio.
- **Evidencia:** `pages/my-games/AGENTS.md:19-20`.
- **Señal anti-regresión:** no modificar el código de un juego para que encaje en el portafolio.

## 6. Canon visual retro-arcade y dimensionado de canvas

- **Decisión:** todos los juegos comparten paleta neón oscura, modal `<dialog id="options">`, overlay `.scanlines` y marco máximo de 900×900 px CSS (`--game-max`/`--game-chrome`, buffer nítido vía `renderScale`).
- **Evidencia:** `pages/my-games/AGENTS.md:22-32`; `AGENTS.md:481-487` (dimensionado del escenario).
- **Señal anti-regresión:** un juego nuevo copia el chrome; no introduce paletas ni modales propios ni cambia la resolución lógica para achicar/agrandar el marco.

## 7. Claves de `localStorage` del sitio

- **Decisión:** las claves de tema/idioma/fondo/dirección/velocidad/escala son las del inventario de `AGENTS.md` § "Inventario de claves de localStorage". Una clave nueva debe reflejarse ahí, en `utils/storage.js` y en `theme-init.js`.
- **Evidencia:** `AGENTS.md` § "Inventario de claves de localStorage" (líneas 374-396).
- **Señal anti-regresión:** no añadir claves propias sin actualizar los tres sitios; los juegos usan el patrón `<slug>_best_v1` sin colisionar.

## 8. Navegación de las grillas de juegos y programas

- **Decisión:** las tarjetas de `pages/my-games/` y `pages/my-programs/` abren su contenido en la misma pestaña, sin `target="_blank"`; se vuelve a la grilla con el botón «Atrás» del navegador.
- **Por qué:** se alinea con el comportamiento de `pages/my-studies/` y evita la proliferación de pestañas. Los juegos siguen siendo autocontenidos y no se editan para añadir el chrome del portafolio (invariante 5).
- **Evidencia:** `scripts/controllers/juegos/fnJuegos.js` (enlace `.juego-card__jugar`) y `scripts/controllers/programas/fnProgramas.js` (enlace `.programa-card__abrir`), sin `target="_blank"`.
- **Señal anti-regresión:** no reintroducir `target="_blank"` ni `rel="noopener noreferrer"` en esas dos grillas; los enlaces que sí lo usan son externos (redes y créditos en `index.html`, y los generados en `scripts/controllers/home/fnHome.js`).

## 9. Layout flex del modal solo con `[open]`

- **Decisión:** `display: flex` y `flex-direction: column` se declaran en `.modal-dialog[open]`, nunca en `.modal-dialog` a secas.
- **Por qué:** una regla de autor con `display: flex` anula el `display: none` que el navegador aplica a `dialog:not([open])`; el diálogo cerrado queda visible con el botón de cierre sobre el contenido.
- **Evidencia:** `stylesheets/base.css` (bloque `.modal-dialog`).
- **Señal anti-regresión:** no mover esas dos declaraciones al selector base del diálogo; la cabecera y el cuerpo flexibles solo existen mientras el modal está abierto.