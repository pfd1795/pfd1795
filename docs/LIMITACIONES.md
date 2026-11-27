# LIMITACIONES.md — Limitaciones y problemas conocidos

> 📌 **Índice de las limitaciones que el sistema tiene hoy**, con evidencia verificada.
> Si al trabajar aparece una nueva limitación, se agrega aquí con evidencia `archivo:línea`.

## Arquitectura y ejecución

- Sitio completamente estático: sin backend, API, base de datos ni autenticación.
- Sin build, sin gestor de dependencias, sin tests automatizados y sin linting. La única automatización es el despliegue de GitHub Pages.
- Es obligatorio servir por HTTP. `file://` bloquea los módulos ES y la importación de JSON por CORS.
- GitHub Pages publica el repositorio en una subruta; todas las rutas deben ser relativas.
- No hay configuración por entorno ni variables de entorno.

## Compatibilidad de navegador

- Requiere navegadores modernos: módulos ES, import attributes (`with { type: "json" }`), CSS nesting, `<dialog>`, `IntersectionObserver`, `color-mix()` y `@view-transition`.
- `@view-transition` y `color-mix()` son mejoras progresivas; si el navegador no las soporta, la página sigue funcionando con menor fidelidad visual.
- Sin `IntersectionObserver`, el scrollspy usa un respaldo por posición al hacer scroll (`js/controllers/sidebar/fnSectionNav.js`).

## Preferencias y almacenamiento

- Tema, idioma, fondo, dirección, velocidad y escala se guardan en `localStorage`. Si el navegador lo bloquea, se usan los valores por defecto y no se persiste nada.
- `js/theme-init.js` es el único script de pre-pintado y duplica la lectura de las claves a propósito. Cualquier clave de tema nueva debe añadirse en él y en `js/utils/storage.js`.
- Los juegos usan claves propias con el patrón `<slug>_best_v1`, sin colisionar con las del sitio. Todos comparten el canon visual retro-arcade (paleta neón oscura, modal `<dialog>`, scanlines CRT) documentado en `juegos/README.md`.

## Internacionalización

- La interfaz tiene traducciones ES/EN, pero el contenido de la enciclopedia (`mis-estudios/`) está en español por defecto, con versiones opcionales en inglés (`<slug>.en.html`), y el de los juegos (`juegos/<slug>/`) está solo en español. En la grilla de juegos se traducen el título (desde el manifiesto) y la etiqueta del botón (desde `translations.page[lang]`); descripción, género y tecnologías son metadatos del buscador.
- `applyTranslations()` busca claves en `page`, `introSection`, `home` y `header`; una clave nueva debe colocarse en una de esas secciones. Las claves deben ser únicas entre esas 4 secciones: `fnChangeLanguage.js` arma un índice por idioma y avisa por consola si se duplican. La clave `name` no se traduce: `applyTranslations()` la saltea a propósito porque es un nombre propio.
- Las cadenas que se renderizan desde JavaScript se traducen al generarse (por ejemplo, `GridProjects()` toma `viewProject` de `translations.introSection[lang]`, y `GridGames()` toma las etiquetas de `translations.page[lang]`), no vía `data-lang`.
- La interfaz del buscador de las tres grillas también se traduce: `aria-label` y placeholder se marcan con `data-i18n-aria-label` / `data-i18n-placeholder` (claves `search<Seccion>Aria` y `search<Seccion>Placeholder` en `translations.page[lang]`), y `#sin-resultados` usa `data-lang="search<Seccion>Empty"`. `applyTranslations()` escribe el placeholder localizado en `data-buscador-placeholder` y emite `site:languagechange`; `js/buscador.js` (script clásico) lo escucha y vuelve a leer el atributo sin importar módulos ES. El placeholder es una etiqueta fija por idioma (`Buscar juegos` / `Buscar programas` / `Buscar estudios`) y no muestra contadores.
- Al cambiar de idioma se re-renderizan la portada y las grillas de juegos y programas (`reloadHomeContent()` de `controllers/home/fnHome.js`, `reloadGamesContent()` de `controllers/juegos/fnJuegos.js` y `reloadProgramasContent()` de `controllers/programas/fnProgramas.js`); todas no hacen nada si su contenedor no existe.
- Cuidar el orden entre `applyTranslations()` y las funciones que regeneran HTML (`GridWorkExperience`, `GridProjects`) al tocar idioma: las cadenas renderizadas en JS deben traducirse al generarse.

## Contenido y assets

- La enciclopedia cuenta con 42 artículos publicados.
- La imagen del proyecto de la portada se sirve desde `assets/images/project-nextjs.jpg` (autohospedada). Las portadas de los juegos viven en `juegos/<slug>/cover.jpg`.
- Los iconos se sirven desde `assets/`; los que se inyectan desde JavaScript usan `utils/assets.js` para funcionar en la raíz y en subcarpetas. El icono `gamepad.svg` identifica el enlace "Juegos" del menú lateral.
- Los iconos del menú lateral llevan el color fijado en el SVG (`fill="#FFFFFF"` / `stroke="#FFFFFF"`): al cargar un SVG con `<img>` se renderiza como documento independiente y `currentColor` resuelve a negro, sin heredar el `color` de `.sidebar-item` (evidencia: `assets/icons/build.svg:1`, frente a `assets/icons/gamepad.svg:1`). No usar `currentColor` en iconos inyectados como `<img>`.
- **Juegos**: los juegos son estáticos y autocontenidos en `juegos/<slug>/index.html` dentro de este repositorio; no hay directorio externo de desarrollo. La guía, el canon visual y el manifiesto están en `juegos/README.md` y `juegos/data/juegos.json`.
- Las grillas de juegos y programas navegan al contenido en la misma pestaña; los juegos no incluyen un enlace propio de vuelta a `juegos/index.html` (evidencia: sin coincidencias de `Volver` en `juegos/*/index.html`), así que el retorno depende del botón «Atrás» del navegador. Las herramientas sí tienen «← Volver al índice» (p. ej. `programas/herramientas/generador-paletas.html:207`).
- El correo que copia `utils/copyEmail.js` está fijado en el código. Si cambia, hay que actualizarlo ahí y en la información de contacto.
- **`assets/files/PabloDiazCV.pdf`** (238 KB) se mantiene en el repositorio sin enlazar por decisión del desarrollador: es material para reenlazar el CV desde el sidebar o el modal si se recupera el botón de descarga. Hasta entonces, ninguna página lo referencia y así debe quedar.

## Deuda técnica

- Cada juego tiene una sola portada (`cover.jpg`); las portadas 2 y 3 para el carrusel aún no se han generado (la guía y el código ya aceptan hasta 3 mediante `covers`).
- Ningún juego tiene fecha registrada en `updatedAt`: las 20 entradas del manifiesto usan `null`.
- Faltan 13 artículos de la enciclopedia con versión en inglés (`ci-cd`, `docker`, `linux-servidores`, `typescript`, `accesibilidad`, `nosql`, `regex`, `fundamentos-ciberseguridad`, `phishing-ingenieria-social`, `malware-ransomware`, `identidad-y-mfa`, `antivirus-edr` y `respuesta-incidentes`); los otros 29 tienen su archivo `<slug>.en.html`.

## Rendimiento y mantenimiento

- No hay minificación, bundling ni caché personalizada; es intencional para mantener el sitio simple.
- Usar `loading="lazy"` en imágenes y evitar dependencias externas.
- Cualquier cambio en el sistema de temas debe reflejarse en `utils/storage.js`, `utils/themeBackgrounds.js` y `theme-init.js` (único script de pre-pintado).