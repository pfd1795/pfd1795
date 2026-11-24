# AGENTS.md — `mis-estudios/`

Reglas locales para agentes que trabajan en la enciclopedia de informática. Complementa el
[`AGENTS.md`](../AGENTS.md) raíz (arquitectura general, estilo de código y convenciones).

## Qué es esta carpeta

- `index.html`: índice de la enciclopedia con buscador; la grilla de artículos se renderiza
  desde [`data/articulos.json`](./data/articulos.json) con `js/controllers/mis-estudios/`
  (se monta en `main.js` solo si existe `.estudios-grid`).
- `mis-estudios.css`: estilos específicos de la sección (acento adaptativo `--enc-accent`).
- `articulos/*.html`: artículos educativos estáticos, un archivo `<slug>.html` por artículo
  (HTML, Git, Terminal, JavaScript, Redes, CSS, HTTP y navegador, Cliente-servidor y APIs,
  SQL, Seguridad web, Criptografía, TLS, Sistemas operativos, Modelado de datos y
  normalización, Paradigmas de programación, Sistemas numéricos y representación de datos,
  Python, Patrones de diseño, Inteligencia artificial, Aprendizaje automático, Redes
  neuronales, Lógica digital y álgebra de Boole, C y gestión de memoria, Frameworks de
  front-end, Frameworks de back-end, Principios de diseño y SOLID, Editores, IDEs y
  depuración, Empaquetado y despliegue, TypeScript, Accesibilidad web, Bases de datos NoSQL, Testing automatizado, GitHub Actions y CI/CD, Docker y contenedores, Linux y servidores, Expresiones regulares).
  Las entradas `wip` del manifiesto se muestran con la etiqueta de UI `comingSoon` de
  `translations.page[lang]` («Próximamente» / «Coming soon»).
- `data/articulos.json`: manifiesto de la grilla (mismo esquema que `juegos.json`:
  `version` + `categories` + `items`).
- `js/copiar.js`: botón «Copiar» sobre los bloques de código de los artículos (script
  clásico con `defer`, solo en las páginas de artículo). Copia con `navigator.clipboard` y
  respaldo con `execCommand`, dedentando la sangría del código antes de copiar.

El pre-pintado del tema y el buscador son **compartidos**: `js/theme-init.js` y
`js/buscador.js` (configurado por `data-attributes` del input `#buscador`); esta carpeta
no tiene copias propias. Los estilos de `.buscador__*` viven en `stylesheets/base.css`
y aquí solo se conserva el override de acento `--enc-accent`.

## Reglas para agentes

1. **Contenido solo en español**: los artículos no usan el sistema de traducciones
   (`translations.json`); la interfaz compartida (barra, sidebar, modal) sí cambia ES/EN,
   incluido el buscador (`aria-label`, placeholder y `#sin-resultados`).
   La única etiqueta de UI generada en la grilla, `comingSoon` (entradas `wip`), se toma de
   `translations.page[lang]`; los títulos, descripciones, categorías y palabras clave siguen
   siendo solo español.
2. **Pre-pintado obligatorio**: toda página nueva debe cargar `js/theme-init.js` en el
   `<head>` antes de pintar (`../js/` desde esta carpeta, `../../js/` desde `articulos/`).
   Es el único script de pre-pintado del sitio: si se añade o cambia una clave de tema,
   actualizar `theme-init.js` y `js/utils/storage.js` a la vez (inventario en el
   [`AGENTS.md` raíz](../AGENTS.md#inventario-de-claves-de-localstorage)).
3. **Chrome compartido, no copiado**: las páginas cargan `../stylesheets/base.css` +
   `mis-estudios.css` (`../../…` y `../mis-estudios.css` desde `articulos/`), el sidebar
   con rutas ajustadas (`../index.html#seccion` desde esta carpeta, `../../index.html#seccion`
   desde `articulos/`) y `../js/main.js` como módulo, para reutilizar el modal de
   Configuración del portafolio.
4. **Nombres heredados en español**: las clases de esta carpeta (`buscador__campo`,
   `estudio-card`, `categoria`, `tl-dr`) conservan español y BEM-like; no renombrar por
   consistencia con `controllers/` (que usa inglés) ni sin motivo real. Los estilos locales
   se rigen por `mis-estudios.css` y el acento adaptativo `--enc-accent`.
5. **Rutas relativas**: despliegue en subruta de GitHub Pages; ninguna ruta absoluta
   (`/images/…`, `/stylesheets/…`).
6. **Buscador**: el `js/buscador.js` compartido opera solo si existe `#buscador`; esta
   página lo configura con `data-buscador-tarjetas=".estudio-card"` y su texto de
   placeholder. Filtra por término, actualiza el conteo del placeholder, oculta categorías
   vacías y usa `#sin-resultados`. Los textos viven en `translations.page[lang]` (claves
   `searchStudies*`) y se actualizan con el evento `site:languagechange`. No acoplarlo a
   módulos ES.
7. **Contenido educativo**: agregar un artículo es crear `articulos/<slug>.html`
   (kebab-case, sin prefijos redundantes), siguiendo la estructura de los existentes, y
   añadir su entrada a `data/articulos.json` (`status: "published"` solo si está probado).
   Los artículos cargan `../js/copiar.js`; la caja «En 5 puntos» (`.tl-dr`) es recomendable, no obligatoria
   (los artículos ya publicados sin ella se respetan), y —si
   ayudan— diagramas SVG inline con las clases de `mis-estudios.css` (`.diagrama`); nada de
   imágenes remotas ni librerías externas.
8. **Sin firmas de IA**: un artículo no incluye marcas de agua, comentarios-firma, nombres
   de modelos de IA, código ni recursos propios de un agente. La única firma admitida está
   en el footer de la portada (`../index.html`), según la regla del
   [`AGENTS.md` raíz](../AGENTS.md#firma-de-agentes-ia-en-el-footer).

## Verificación local

Ver el procedimiento general en el [`AGENTS.md` raíz](../AGENTS.md#verificación-manual-para-agentes).
Específico de esta carpeta, tras cualquier cambio:

1. `python -m http.server 8000` desde la raíz del repositorio y abrir
   `http://localhost:8000/mis-estudios/`.
2. El tema (modo, acento, fondo, escala) se pinta sin parpadeo y coincide con el del portafolio.
3. El modal de Configuración funciona desde el footer del sidebar y persiste los cambios.
4. La grilla renderiza desde `data/articulos.json`: 36 artículos publicados, agrupados en las categorías del manifiesto.
5. El buscador filtra por término, actualiza el conteo del placeholder y muestra/oculta
   `#sin-resultados`.
6. En `articulos/*.html`: enlaces de vuelta correctos (`../index.html`, `../../index.html`),
   el submenú del sidebar apunta a las secciones de la portada con la profundidad de rutas
   correcta y los enlaces entre artículos (`articulos/<slug>.html` relativos entre ellos)
   funcionan.
7. El botón «Copiar» aparece sobre los bloques de código de cada artículo, copia el código
   sin la sangría del HTML y confirma con «Copiado» (o aviso si falla).
