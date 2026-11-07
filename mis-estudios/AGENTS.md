# AGENTS.md — `mis-estudios/`

Reglas locales para agentes que trabajan en la enciclopedia de informática. Complementa el
[`AGENTS.md`](../AGENTS.md) raíz (arquitectura general, estilo de código y convenciones).

## Qué es esta carpeta

- `index.html`: índice de la enciclopedia con buscador y categorías.
- `estudios/*.html`: artículos educativos estáticos (HTML, Git, Terminal, JavaScript, Redes, CSS,
  HTTP y navegador, Cliente-servidor y APIs, SQL, Seguridad web, Criptografía, TLS, Sistemas
  operativos, Modelado de datos y normalización, Paradigmas de programación, Sistemas numéricos
  y representación de datos, Python, Patrones de diseño). Varios temarios siguen pendientes de
  desarrollo ("Próximamente").
- `js/tema.js`: pre-pintado del tema (script clásico síncrono).
- `js/buscador.js`: filtro de tarjetas del índice (script clásico con `defer`).
- `js/copiar.js`: botón «Copiar» sobre los bloques de código de los artículos (script clásico con
  `defer`, solo en las páginas de estudio). Copia con `navigator.clipboard` y respaldo con
  `execCommand`, dedentando la sangría del código antes de copiar.

## Reglas para agentes

1. **Contenido solo en español**: los artículos no usan el sistema de traducciones
   (`translations.json`); la interfaz compartida (barra, sidebar, modal) sí cambia ES/EN.
2. **Pre-pintado obligatorio**: toda página nueva debe cargar `js/tema.js` en el `<head>` antes de
   pintar. Duplica las claves de `localStorage` de `utils/storage.js`: si se añade o cambia una
   clave de tema, actualizar `tema.js`, `theme-init.js` y `utils/storage.js` a la vez
   (inventario en el [`AGENTS.md` raíz](../AGENTS.md#inventario-de-claves-de-localstorage)).
3. **Chrome compartido, no copiado**: las páginas cargan `../stylesheets/base.css` +
   `enciclopedia.css` (`../../…` desde `estudios/`), el sidebar con rutas ajustadas (`../index.html#seccion`
   desde esta carpeta, `../../index.html#seccion` desde `estudios/`) y `../javascripts/main.js`
   como módulo, para reutilizar el modal de Configuración del portafolio.
4. **Nombres heredados en español**: los scripts de esta carpeta y sus clases (`buscador__campo`,
   `estudio-card`) conservan español y BEM-like; no renombrar por consistencia con `controllers/`
   (que usa inglés) ni sin motivo real. `estilos` y lógica locales se rigen por `enciclopedia.css`
   y el acento adaptativo `--enc-accent`.
5. **Rutas relativas**: despliegue en subruta de GitHub Pages; ninguna ruta absoluta (`/images/…`,
   `/stylesheets/…`).
6. **Buscador**: `buscador.js` opera solo si existen `#buscador`, `.estudio-card` y las categorías;
   sus avisos usan `#contador` y `#sin-resultados`. No acoplarlo a módulos ES.
7. **Contenido educativo**: nuevo material se agrega como un `estudios/<tema>.html` siguiendo la
   estructura de los existentes y enlazándolo desde `index.html` con su categoría. Los artículos
   nuevos cargan además `../js/copiar.js`, añaden su caja «En 5 puntos» (`.tl-dr`) y —si ayudan—
   diagramas SVG inline con las clases de `enciclopedia.css` (`.diagrama`); nada de imágenes
   remotas ni librerías externas.

## Verificación local

Ver el procedimiento general en el [`AGENTS.md` raíz](../AGENTS.md#verificación-manual-para-agentes).
Específico de esta carpeta, tras cualquier cambio:

1. `python -m http.server 8000` desde la raíz del repositorio y abrir
   `http://localhost:8000/mis-estudios/`.
2. El tema (modo, acento, fondo, escala) se pinta sin parpadeo y coincide con el del portafolio.
3. El modal de Configuración funciona desde el footer del sidebar y persiste los cambios.
4. El buscador filtra por término, actualiza `#contador` y muestra/oculta `#sin-resultados`.
5. En `estudios/*.html`: enlaces de vuelta correctos (`../index.html`, `../../index.html`) y el
   submenú del sidebar apunta a las secciones de la portada con la profundidad de rutas correcta.
6. El botón «Copiar» aparece sobre los bloques de código de cada artículo, copia el código sin la
   sangría del HTML y confirma con «Copiado» (o aviso si falla).
