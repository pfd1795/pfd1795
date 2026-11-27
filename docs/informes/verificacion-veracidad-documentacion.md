# Verificación de la veracidad de la documentación contra el código

## Alcance y método

Se verificaron las afirmaciones comprobables de `AGENTS.md` (raíz y locales de `pages/my-games/`, `pages/my-studies/` y `pages/my-programs/`), `README.md`, `docs/README.md`, `docs/INVARIANTES.md`, `docs/LIMITACIONES.md`, `pages/my-games/README.md` y `docs/prompts/*`. Quedan fuera `docs/HUMANOS.md`, por instrucción, y los informes de auditoría previos, por ser registros puntuales y no documentos de estado.

Cada afirmación se confirmó con lectura directa o `grep -n`; los conteos se recalcularon desde los manifiestos y el sistema de archivos, no desde la documentación. El sitio se sirvió por HTTP (`python3 -m http.server 8127`) y `/`, `/pages/my-games/`, `/pages/my-studies/`, `/pages/my-programs/`, un artículo, una herramienta, `service-worker.js` y `scripts/main.js` respondieron 200. No se consultó el historial de Git ni se modificaron los documentos de estado.

## Resultado global

Los conteos publicados coinciden con el código: 20 juegos publicados, 36 artículos publicados, 11 herramientas publicadas y 5 `wip`. Las correcciones aplicadas a `docs/LIMITACIONES.md`, `README.md`, `AGENTS.md`, `pages/my-studies/AGENTS.md` y `pages/my-games/README.md` concuerdan con lo verificado: 29 artículos con versión inglesa y 7 sin ella, `updatedAt` presente y en `null` en 20 juegos, respaldo por posición del scrollspy, precisión sobre las 28 páginas `.en.html` fuera del precache y enumeración de los 11 juegos con `--game-max` más la plantilla.

Quedan tres divergencias. Cada cambio accionable está registrado en `docs/informes/trabajo-pendiente.md`, el tracker único de tareas abiertas.

## Hallazgos

| Documento | Afirmación | Evidencia | Estado | Corrección propuesta |
| --- | --- | --- | --- | --- |
| `docs/prompts/crear-estudios.md:173` (roster) | «Artículos ya publicados»: 31 entradas. | El manifiesto tiene 36; faltan `ci-cd`, `docker`, `linux-servidores`, `regex` y `testing`, todos con su archivo HTML presente. | Desactualizado | Añadir los cinco slugs al roster. |
| `docs/prompts/crear-estudios.md:150` | «No traduzcas el artículo al inglés ni añadas alternativas por idioma». | 29 archivos `<slug>.en.html` y la regla 8 de `pages/my-studies/AGENTS.md:71-80` definen esa versión. | Contradictorio | Alinear la instrucción con la convención `<slug>.en.html`. |
| `docs/prompts/fichas-estudios.md:18` | «Los ocho temas pendientes se gestionan en el tracker». | El tracker lista 7 artículos restantes; los 15 slugs de las fichas figuran en el manifiesto. | Desactualizado | Publicar 7 o remitir al tracker sin fijar una cifra. |

## Verificado como correcto

- Manifiestos: `version` + `items` en los tres, con `categories` en artículos y herramientas; 20 entradas de juegos con `updatedAt` válido (`null` en todas), 36 artículos con archivo HTML presente y 20 juegos con `README-juego.md`.
- Catálogo de `pages/my-games/README.md`: coincide con el manifiesto; tabla de claves de récord: las 15 filas y sus claves antiguas aparecen en el código de cada juego.
- Versiones inglesas: 29 archivos `.en.html`; los 7 slugs ausentes coinciden con el tracker; solo `testing.en.html` está en `PRECACHE_URLS`, de modo que las otras 28 páginas no están precacheadas.
- Service Worker: 163 URL, todas existentes; de 101 HTML locales solo faltan esas 28 versiones y `pages/my-games/_template/index.html`, que el workflow excluye del despliegue. Estrategias network-first y stale-while-revalidate presentes.
- Mapa de módulos: los `export` documentados existen en los 23 archivos citados; `main.js` monta cada controlador condicionado a su contenedor.
- Inventario de `localStorage`: 8 claves del sitio presentes en `utils/storage.js` y `theme-init.js` según corresponda; catálogos de 10 fondos, 7 direcciones, 3 velocidades, 3 escalas y 6 acentos; duplicación intencional de la paleta arcoíris entre `utils/themeBackgrounds.js` y `scripts/theme-init.js`; `aclarar()` presente en el pre-pintado.
- Internacionalización: `applyTranslations()` resuelve desde índices `Map` por idioma construidos con las 4 secciones en orden fijo y avisa de colisiones por consola; `site:languagechange`, `MutationObserver` y el manejo de chips por delegación están implementados; `footerAi*` existe en `translations.page.es` y `.en`.
- Configuración: contenido generado en cada apertura, filas condicionales con `.is-hidden`, escuchas delegadas sobre `document` en los controladores laterales e `inert` gestionado al abrir y cerrar el sidebar.
- Pre-pintado: `scripts/theme-init.js` se carga en todas las páginas con chrome compartido y no aparece en los juegos ni en `pages/my-programs/dj/index.html`.
- Footer y firma: solo `index.html` tiene `.footer` y el `<h1>Pablo Diaz</h1>`; la firma `Big Pickle` está en `index.html:197` y no aparece en otros archivos del sitio.
- Invariante del CV: `docs/INVARIANTES.md:24` cita `docs/LIMITACIONES.md:43` y `assets/files/PabloDiazCV.pdf` (238116 bytes), sin referencias en HTML, JS ni CSS.
- Estado del tracker: `AGENTS.md:9` precisa que no hay fases y que las tareas abiertas viven solo en `docs/informes/trabajo-pendiente.md`.
- Responsabilidad del modal: `AGENTS.md:334` describe `settings.controller.js` como generador del contenido y atribuye la delegación a los controladores de `controllers/sidebar/`, donde están las escuchas sobre `document`.
- Enlaces relativos de todos los documentos del alcance: ningún destino local roto.
