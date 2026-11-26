# INVARIANTES.md — Decisiones técnicas no deducibles del código

> 📌 **Decisiones que un agente sin historial podría revertir por error.**
> Cada entrada lleva evidencia `archivo:línea`. No borrar sin decisión formal.
> Los agentes deben leer este archivo antes de tocar las áreas afectadas.

## 1. Paleta de arcoíris duplicada a propósito

- **Decisión:** la paleta del modo `multicolor` está duplicada en dos sitios y **debe mantenerse así**.
- **Por qué:** `js/theme-init.js` es un script clásico que no puede importar módulos ES.
- **Evidencia:** `js/utils/themeBackgrounds.js` (`RAINBOW_GRADIENT`) y `js/theme-init.js` (`ARCOIRIS`). Cualquier cambio de paleta se hace en **ambos** sitios.
- **Señal anti-regresión:** no unificar en un solo módulo; no borrar la duplicación.

## 2. Excepción `dj.html` (autocontenida)

- **Decisión:** `programas/herramientas/dj.html` es una estación de música autocontenida con tema y estilos propios (`dj.css`); no carga el chrome compartido, usa su propio favicon inline y registra el service worker desde `dj.js`.
- **Por qué:** su naturaleza (audio en tiempo real) exige aislamiento.
- **Evidencia:** `programas/AGENTS.md:21-24`.
- **Señal anti-regresión:** no replicar esta excepción en herramientas nuevas; no intentar "unificar" `dj.html` con el chrome compartido.

## 3. CV PDF sin enlazar por decisión del desarrollador

- **Decisión:** `assets/files/PabloDiazCV.pdf` (238 KB) se mantiene en el repositorio **sin enlazar**. Es material para reenlazar si se recupera el botón de descarga.
- **Evidencia:** `docs/LIMITACIONES.md:43` y `assets/files/PabloDiazCV.pdf` (238116 bytes), sin referencias en HTML, JS ni CSS.
- **Señal anti-regresión:** no borrar el PDF; no añadir enlaces a él sin petición explícita.

## 4. Claves de récord `<slug>_best_v1` y migración

- **Decisión:** cada juego guarda su récord bajo `<slug>_best_v1` en `localStorage`. Los juegos que usaron otra clave migran automáticamente (copian el valor a la clave nueva y borran la antigua al abrir).
- **Evidencia:** `AGENTS.md` § "Inventario de claves de localStorage" (línea ~369-391); `juegos/AGENTS.md:33-36`.
- **Señal anti-regresión:** no renombrar slugs publicados sin actualizar carpeta, manifiesto y clave; no borrar claves antiguas sin migración.

## 5. Juegos no se adaptan al chrome del portafolio

- **Decisión:** los juegos son estáticos y autocontenidos en `juegos/<slug>/index.html`; no se editan para adaptarlos al chrome del portafolio.
- **Evidencia:** `juegos/AGENTS.md:19-20`.
- **Señal anti-regresión:** no modificar el código de un juego para que encaje en el portafolio.

## 6. Canon visual retro-arcade y dimensionado de canvas

- **Decisión:** todos los juegos comparten paleta neón oscura, modal `<dialog id="options">`, overlay `.scanlines` y marco máximo de 900×900 px CSS (`--game-max`/`--game-chrome`, buffer nítido vía `renderScale`).
- **Evidencia:** `juegos/AGENTS.md:22-32`; `AGENTS.md` § "Arquitectura" (dimensionado del escenario).
- **Señal anti-regresión:** un juego nuevo copia el chrome; no introduce paletas ni modales propios ni cambia la resolución lógica para achicar/agrandar el marco.

## 7. Claves de `localStorage` del sitio

- **Decisión:** las claves de tema/idioma/fondo/dirección/velocidad/escala son las del inventario de `AGENTS.md` § "Inventario de claves de localStorage". Una clave nueva debe reflejarse ahí, en `utils/storage.js` y en `theme-init.js`.
- **Evidencia:** `AGENTS.md` § "Inventario de claves de localStorage" (línea ~369-391).
- **Señal anti-regresión:** no añadir claves propias sin actualizar los tres sitios; los juegos usan el patrón `<slug>_best_v1` sin colisionar.