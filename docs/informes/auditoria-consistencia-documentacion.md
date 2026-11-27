# Auditoría de documentación (consistencia interna)

Alcance: `AGENTS.md` (raíz y locales de `juegos/`, `mis-estudios/` y `programas/`), `README.md`,
`docs/README.md`, `docs/INVARIANTES.md`, `docs/LIMITACIONES.md` y `docs/prompts/*`. Método:
lectura directa de los archivos, verificación de enlaces y anclas con script y recuento desde
los manifiestos. No se comparan firmas, APIs ni citas contra el código: eso corresponde a la
verificación de veracidad.

## Resultado global

- Enlaces relativos y anclas: 49 enlaces revisados, 14 con ancla; ninguno roto en los archivos
  del alcance. La URL absoluta de producción responde correctamente.
- Conteos publicados verificados por lectura directa: 36 artículos publicados, 20 juegos y
  11 herramientas publicadas + 5 `wip`. Coinciden con `README.md:14-16`,
  `docs/LIMITACIONES.md:37,47-48`, `mis-estudios/AGENTS.md:97` y `programas/AGENTS.md:91`.
- Existen 29 archivos `<slug>.en.html` y solo 1 figura en `PRECACHE_URLS`; las otras 28 páginas
  quedan fuera, cifra coherente con `README.md:20`, `docs/LIMITACIONES.md:48` y el tracker.
- Unicidad: `docs/` es documentación para agentes en español salvo `docs/HUMANOS.md`; los
  documentos para personas son `README.md` y `docs/HUMANOS.md`; informes, planes y trackers
  viven solo en `docs/informes/`.
- No hay plazos, estimaciones, códigos de hallazgo, historial ni trackers paralelos en el
  alcance: las únicas apariciones de esos términos son las reglas que los prohíben.

## Hallazgos

### Los esqueletos canónicos contradicen la convención del navbar

- **Ubicación:** `AGENTS.md:517`, `docs/prompts/crear-estudios.md:325,394,411` y
  `docs/prompts/crear-programas-web.md:212,376,390`.
- **Evidencia:** `AGENTS.md:517` fija `<span class="navbar-name">Pablo Diaz</span>` en las
  subpáginas para dejar el único `<h1>` al título real. Los dos esqueletos canónicos ponen
  `<h1>Pablo Diaz</h1>` en el navbar y otro `<h1>` en el contenido (`crear-estudios.md:394,411` y
  `crear-programas-web.md:376,390`). Además, `crear-programas-web.md:212` afirma «solo uno en la
  página, dentro del main» mientras su esqueleto genera dos, y `crear-estudios.md:325` contradice
  su propio esqueleto al presentar el `<h1>` del navbar como ajeno al contenido.
- **Corrección propuesta:** sustituir el `<h1>` del navbar por `<span class="navbar-name">` en
  ambos esqueletos y ajustar las frases de `crear-estudios.md:325` y
  `crear-programas-web.md:212` a la convención de un solo `<h1>` por página.
- **Registro:** añadido al tracker único.

### El esqueleto de artículos omite el enlace «Programas» del sidebar

- **Ubicación:** `docs/prompts/crear-estudios.md:558-567`, frente a `AGENTS.md:476` y
  `programas/AGENTS.md:100`; `docs/prompts/crear-programas-web.md:455-468` sí lo incluye.
- **Evidencia:** el esqueleto del prompt de artículos solo contiene los enlaces «Mis estudios»
  (activo) y «Juegos». `AGENTS.md:476` describe tres enlaces de sección en el sidebar, y
  `programas/AGENTS.md:100` exige comprobar el enlace «Programas» también desde artículos. Seguir
  el esqueleto produce una página sin ese enlace y deja las dos herramientas de desarrollo
  desalineadas entre sí.
- **Corrección propuesta:** añadir al esqueleto de `crear-estudios.md` el enlace
  `<a class="sidebar-item" href="../../programas/index.html">` con `build.svg` y
  `data-lang="programs"`, en la posición que ocupa en `crear-programas-web.md:465-468`.
- **Registro:** añadido al tracker único.

### Los prompts de estudios y programas permiten comentarios en el código generado

- **Ubicación:** `docs/prompts/crear-estudios.md:337-339,458,509-510` y
  `docs/prompts/crear-programas-web.md:345,405,485,500`, frente a `AGENTS.md:39-46,404`.
- **Evidencia:** `crear-estudios.md:337` pide «comentarios breves cuando ayuden» y `:339` los
  admite cuando forman parte de la explicación; su esqueleto incluye comentarios en el bloque de
  código (`:458`) y en el HTML (`:509-510`). El esqueleto de `crear-programas-web.md` incluye
  comentarios en CSS, HTML y JavaScript (`:345,405,485,500`). `AGENTS.md:39-46,404` prohíbe
  escribir comentarios en HTML, CSS y JavaScript del proyecto; la excepción de plantillas
  operativas no cubre los artículos ni las herramientas generadas.
- **Corrección propuesta:** retirar la autorización de `crear-estudios.md:337-339` y los
  comentarios de ambos esqueletos, o declarar explícitamente en los tres prompts que el código
  integrado en este repositorio no lleva comentarios.
- **Registro:** añadido al tracker único. El requisito «Comentarios útiles» de
  `docs/prompts/crear-videojuegos.md:612` y los comentarios de su esqueleto (`:934,1039`) se
  gestionan en el ítem ya abierto, ampliado en esta pasada.

## Ya presentes en el tracker

Estos hallazgos ya tenían ítem abierto y no se han duplicado:

- El roster de `docs/prompts/crear-estudios.md:173-209` lista 31 de 36 artículos publicados.
- `docs/prompts/crear-estudios.md:150` contradice la convención de versiones en inglés de la
  regla 8 de `mis-estudios/AGENTS.md`.
- `docs/prompts/fichas-estudios.md:18` fija ocho temas pendientes cuando el tracker lista siete.
- `docs/prompts/crear-estudios.md:629` y `docs/prompts/fichas-estudios.md:330-331` remiten la
  actualización de la documentación al `AGENTS.md` raíz, que no publica esas cifras.
- `docs/informes/trabajo-pendiente.md:3` incluye la lista de slugs ya traducidos.
- `docs/INVARIANTES.md:4` exige evidencia `archivo:línea` en entradas que citan secciones o
  símbolos sin línea concreta.

## Verificado como correcto

- Estructura de documentación: `docs/informes/` es el único lugar de informes y del tracker; no
  hay planes, fases ni auditorías activas fuera de esa carpeta.
- Numeración correlativa de las reglas locales en `juegos/AGENTS.md`, `mis-estudios/AGENTS.md` y
  `programas/AGENTS.md`.
- `docs/INVARIANTES.md:30,48` citan el rango 374-396 del inventario de claves.
- `docs/LIMITACIONES.md:29` describe las versiones en inglés como opcionales y artículo por
  artículo, en línea con `README.md:84` y `mis-estudios/AGENTS.md:71-80`.
- `docs/prompts/crear-programas-web.md:200` remite al contrato del punto 7.
- `README.md:87` separa las limitaciones verificadas de las tareas abiertas.
- Las anclas usadas por las guías locales y los prompts (`#firma-de-agentes-ia-en-el-footer`,
  `#interacción-con-el-usuario-mediante-menús`, `#verificación-manual-para-agentes`,
  `#inventario-de-claves-de-localstorage`, `#canon-visual-retro-arcade`,
  `#dimensionado-del-canvas-marco-común` y `#cómo-agregar-un-juego`) resuelven a encabezados
  existentes.
- Las cifras publicadas coinciden entre todos los documentos que las mencionan; el inventario
  de `localStorage` y el mapa de módulos conservan una terminología coherente entre la guía raíz
  y las guías locales. Su conformidad con el código no se evalúa en esta auditoría.
