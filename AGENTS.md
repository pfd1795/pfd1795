# AGENTS.md - Guía para Agentes de Código

## Descripción del Proyecto

Portafolio web personal desarrollado con HTML, CSS y JavaScript vanilla. Sitio estático desplegado en GitHub Pages.

**URL de producción:** https://pfd1795.github.io/pfd1795/

**Documentación vigente:** `README.md` (introducción y ejecución para personas), `AGENTS.md` (arquitectura, convenciones y limitaciones para agentes), `AGENTS.md` locales en `juegos/`, `mis-estudios/` y `programas/` (reglas propias de cada carpeta; los agentes los combinan con el de la raíz), `docs/README.md` (índice de la documentación) y `juegos/README.md` (cómo agregar y documentar juegos). `docs/prompts/` contiene herramientas para desarrolladores: solo leerlas cuando se pida explícitamente. No hay fases ni tareas activas en el repositorio; el estado real está en el código y en esta guía. Los informes de auditoría y el tracker de trabajo pendiente, cuando se generen, viven exclusivamente en `docs/informes/`.

---

## Reglas obligatorias

### ❌ Prohibido hacer commits o push

Los agentes IA **no pueden** hacer commits, push, ni modificar el repositorio Git bajo ninguna circunstancia. Solo leer, analizar y proponer cambios. Los commits son manuales y los realiza el desarrollador.

### ⏱️ Sin plazos ni estimaciones

No hay fechas límite, días estimados ni urgencias. Trabajar al ritmo necesario.

### 📚 Documentación exclusiva para agentes IA

La documentación técnica (`AGENTS.md`, `AGENTS.md` locales, `docs/`) está escrita **exclusivamente para agentes IA, en español**. `README.md` es el único documento orientado a personas. Prohibido crear otros documentos para humanos.

### 📁 Carpeta exclusiva para informes, auditorías, fases, tareas y hallazgos

Los informes de auditoría, planes de trabajo, listas de pendientes, trackers y demás hallazgos se guardan **única y exclusivamente** en `docs/informes/` (la carpeta se crea la primera vez que haga falta). No crear estos archivos en ninguna otra ubicación del repo. El resto de la documentación describe **el estado actual del código**, no el proceso que llevó a él.

**Tracker único de trabajo pendiente:** `docs/informes/trabajo-pendiente.md` es el único documento de tareas abiertas del repo. Toda tarea pendiente nueva se agrega ahí; al cerrar un ítem se **borra** (nunca se marca resuelto ni se anexa historial). No crear trackers ni informes paralelos.

Consecuencias obligatorias:

- **Nada de códigos de hallazgo.** No inventar prefijos tipo `B1`, `L-*`, `O-*`, `SEC-*`, `TAREA-*` ni escribirlos en títulos de tests o comentarios: no existe documento que los defina, así que quedan como referencias muertas.
- **Nada de historial.** No escribir "se eliminó X", "antes hacía Y", "hasta el <fecha>". Lo que sí se conserva es la **señal anti-regresión** (`Eliminado:`, `DEPRECATED`, "no usar en código nuevo"): sin ella un agente futuro re-agrega código muerto o usa APIs deprecadas.
- Si al trabajar aparece una limitación, se agrega a la sección "Limitaciones y problemas conocidos" de `AGENTS.md` con evidencia verificada.

### 🚫 Prohibido escribir comentarios en el código

Aplica a **todo el código del proyecto, existente o nuevo**: HTML, CSS y JavaScript. Toda información sobre funciones, archivos o lógica extra vive en la **documentación para agentes** (`AGENTS.md` y `docs/`), nunca en el código.

- **Excepciones (únicas):** pragmas técnicos funcionales — `@ts-expect-error`, `@ts-ignore`, `@ts-nocheck`, `eslint-disable`, shebang — limitados a su función sintáctica. Prohibido usarlos para explicar código.
- **Fuera de alcance:** archivos de configuración y plantillas operativas (`.env.example`, `docker-compose*`, templates, `package.json`), cuyos comentarios son necesarios para operar.
- **Cumplimiento:** por disciplina, con revisión en cada cambio (sin guard automático).
- **Estado:** la regla aplica a código nuevo y modificado; el código existente puede contener comentarios heredados, pendientes de retirar.

### 🔍 No revisar historial de git

Los agentes **no deben** ejecutar `git log`, `git show`, `git diff` ni ningún comando que acceda al historial de commits, a menos que el usuario lo solicite explícitamente. Trabajar únicamente con los archivos actuales del repositorio.

---

## Arranque de sesión y menú de trabajo

### Arranque con `@pfd1795/AGENTS.md`

Si el usuario envía como **único contenido escrito** la mención `@pfd1795/AGENTS.md` (con o sin espacios alrededor, y aunque el cliente expanda esa mención adjuntando el archivo), **llamar a la herramienta `question`** con un único ítem:

- `question`: `Proyecto entendido. ¿En qué quieres trabajar?`
- `header`: `Menú de trabajo`
- `options` (en este orden):
  1. `Auditar la documentación (consistencia interna)`
  2. `Auditar el código del proyecto completo`
  3. `Verificar la veracidad de la documentación contra el código`
  4. `Ver tareas pendientes sugeridas`
  5. `Sugerir y planificar la próxima tarea pendiente recomendada`

No incluir una opción de texto libre adicional: la herramienta `question` la agrega automáticamente y cumple el rol de "Otra tarea (la describo yo)".

No imprimir la lista como texto plano, no leer archivos, no ejecutar comandos y no usar herramientas distintas de `question`: este caso **no** cuenta como "empezar a trabajar" y por lo tanto **no activa** la checklist "Antes de empezar a trabajar". El texto del archivo adjuntado automáticamente por la mención no se considera una instrucción adicional. Si el mensaje incluye cualquier otra cosa además de la mención, proceder normalmente.

No existe disparador por `listo` ni por variantes: `listo` significa "terminé" y **no** abre el menú. El menú solo se muestra con `@pfd1795/AGENTS.md`.

Al recibir la selección, ejecutar el guion correspondiente sin pedir instrucciones adicionales. Excepciones: la opción 4 solo lista y espera elección; la opción 5 presenta el plan y espera confirmación antes de ejecutar. Si el usuario escribe su propia tarea (campo de texto libre), aplicar el guion 6.

### Guiones de las opciones

#### 1. Auditar la documentación (consistencia interna)

Auditar la documentación de forma interna, sin compararla contra el código.

Alcance: `AGENTS.md` (raíz y locales en `juegos/`, `mis-estudios/`, `programas/`), `README.md`, `docs/README.md` y `docs/prompts/*`.

- Enlaces vigentes (relativos y absolutos).
- Unicidad: `docs/` es documentación para agentes en español; no hay documento para humanos aparte de `README.md`; no hay planes, fases ni informes activos fuera de `docs/informes/`.
- Conteos publicados: artículos en `mis-estudios/data/articulos.json`, juegos en `juegos/data/juegos.json`, herramientas en `programas/data/herramientas.json`; verificar por lectura directa, no de memoria.
- Ausencia de historial, plazos, estimaciones, códigos de hallazgo y trackers paralelos.
- Instrucciones claras y aplicables por un agente IA.

Entregable: informe en `docs/informes/` con hallazgo, ubicación y corrección propuesta; los ítems accionables se agregan a `docs/informes/trabajo-pendiente.md`. No verificar firmas, APIs ni citas contra código: eso es la opción 3. No modificar docs de estado en esta auditoría.

#### 2. Auditar el código del proyecto completo

Auditar el código completo del portafolio: HTML, CSS, JavaScript y manifiestos JSON.

Alcance: errores, bugs, lógica incorrecta, duplicación, código muerto, vulnerabilidades y desviaciones de las convenciones de `AGENTS.md` (estilo, rutas relativas, módulos ES, accesibilidad, PWA).

Método:

- Usar `grep -n` o lectura directa antes de afirmar cualquier cosa.
- Servir por HTTP (`python -m http.server 8000`) y cargar las páginas indicadas en la tabla de verificación manual; revisar la consola de DevTools sin errores.
- No ejecutar `git log`, `git show`, `git diff` ni ningún comando de historial.
- No proponer reintroducir código marcado como eliminado o deprecado.

Entregable: informe en `docs/informes/` con hallazgo, evidencia `archivo:línea`, impacto y corrección sugerida. Cada hallazgo accionable se agrega como ítem a `docs/informes/trabajo-pendiente.md` (una tarea = un cambio acotado), sin códigos de hallazgo, sin fechas y sin historial. No ejecutar correcciones ni hacer commits en esta tarea.

#### 3. Verificar la veracidad de la documentación contra el código

Verificar la veracidad de la documentación contra el código.

Alcance: toda afirmación verificable de `AGENTS.md` (raíz y locales), `README.md`, `docs/**` y `juegos/README.md`.

Método:

- Confirmar cada afirmación con `grep -n` o lectura directa del archivo citado; no reproducir docs de memoria.
- Revisar citas, exports, manifiestos, conteos y rutas.

Entregable: informe en `docs/informes/` con tabla `documento / afirmación / evidencia / estado / corrección propuesta`, más los ítems accionables en `docs/informes/trabajo-pendiente.md`. No editar docs de estado durante esta verificación.

#### 4. Ver tareas pendientes sugeridas

Leer `docs/informes/trabajo-pendiente.md` si existe y listar los ítems abiertos con su alcance y un orden sugerido. Si no existe el tracker, listar la deuda técnica y las limitaciones de `AGENTS.md` (raíz y locales) como ítems sugeridos. No ejecutar ninguno: esperar a que el usuario elija un número. Nunca ejecutar todos juntos; se respeta "una tarea = un cambio acotado". Al cerrar la tarea elegida, borrarla del tracker (y de `AGENTS.md` si aplica).

#### 5. Sugerir y planificar la próxima tarea pendiente recomendada

Sugerir y planificar la próxima tarea pendiente recomendada, sin ejecutarla.

Método:

- Leer `AGENTS.md` (raíz y locales), `README.md`, `docs/README.md` y `docs/informes/trabajo-pendiente.md` si existe.
- Excluir tareas bloqueadas o fuera de alcance.
- Elegir UNA sola tarea por impacto, dependencias, verificabilidad con grep/lectura y posibilidad de cerrarla con verificación manual + documentación.
- Reverificar sus citas y cifras contra el código antes de planificar.

Entregable: el plan se presenta en el chat; la tarea recomendada se gestiona en `docs/informes/trabajo-pendiente.md`, que es el único registro de pendientes. No crear un archivo de plan paralelo salvo petición explícita del usuario (en ese caso, en `/home/gris/.opencode/plan`).

- Tarea elegida y motivo.
- Plan: pasos, archivos de código y docs a tocar, verificación manual (páginas a cargar y checklist).
- Criterios de cierre: verificación manual sin errores en consola, documentación afectada actualizada, ítem borrado del tracker si aplica.
- Detenerse e informar "listo para ejecutar el plan". No ejecutar hasta recibir confirmación.

#### 6. Otra tarea

Si el usuario escribió su tarea en el campo de texto libre, usar esa descripción; si no, pedir al usuario que la describa. Luego aplicar el protocolo normal: checklist "Antes de empezar a trabajar", convenciones de código, verificación manual, documentación afectada en la misma tarea.

> Estos guiones son la fuente ejecutable de las opciones del menú. No depender de `docs/prompts/`: solo se leen a pedido explícito.

### Antes de empezar a trabajar

1. Leer `AGENTS.md` (raíz y los locales relevantes de la carpeta tocada).
2. Leer `README.md` y `docs/README.md`.
3. Consultar las secciones "Limitaciones y problemas conocidos" y "Deuda técnica" de `AGENTS.md`.
4. Servir el sitio por HTTP (obligatorio) y verificar según la tabla de "Verificación manual (para agentes)".
5. Respetar las convenciones de estilo (JS/CSS/HTML) y las reglas de mantenimiento de `AGENTS.md`.
6. No modificar datos personales del desarrollador; la firma de IA solo va en el footer de la portada.

---

## Comandos

### Desarrollo Local

No requiere build ni instalación de dependencias. Es **obligatorio** servir el sitio por HTTP: abrir `index.html` con `file://` no funciona porque los módulos ES y la importación de JSON quedan bloqueados por CORS.

```bash
# Servidor local simple (elegir una opción)
python -m http.server 8000
npx serve .
```

Luego abrir `http://localhost:8000/` (o el puerto que corresponda).

### Despliegue

Automático via GitHub Actions en push a `main` (`.github/workflows/static.yml`).

### Verificación manual (para agentes)

El proyecto no tiene tests ni linting; validar los cambios de esta forma:

1. **Servir por HTTP** (obligatorio; `file://` bloquea módulos ES y JSON):

   ```bash
   python -m http.server 8000
   # → http://localhost:8000/
   ```

2. **Páginas a cargar según lo modificado:**

   | Cambio afecta a… | Cargar |
   | --- | --- |
   | `base.css`, `sidebar/`, `main.js`, `theme-init.js` | `/`, `/juegos/`, `/mis-estudios/` y una subpágina de estudio (p. ej. `/mis-estudios/articulos/css.html`) |
   | `controllers/home/`, `lang/` | `/` (portada) |
   | `controllers/juegos/`, `juegos/data/juegos.json` | `/juegos/` |
   | `mis-estudios/` (contenido, `mis-estudios.css`, manifiesto `data/articulos.json`) | `/mis-estudios/` y una subpágina de `articulos/` (p. ej. `/mis-estudios/articulos/css.html`) |
   | `programas/` (contenido, `programas.css`, manifiesto `data/herramientas.json`) | `/programas/` y una herramienta de `/programas/herramientas/` (p. ej. `/programas/herramientas/generador-paletas.html`) |
   | `js/buscador.js` | `/mis-estudios/`, `/programas/` y `/juegos/` (filtro, conteo del placeholder y chips de categoría; en juegos, de género) |
   | Modal de Configuración (`settings.controller.js`, `utils/dialog.js`) | `/` y `/juegos/` (apertura desde el footer del sidebar) |

3. **Checklist funcional en el navegador:**
   - Consola de DevTools sin errores (módulos ES fallidos se ven ahí).
   - Navegador moderno: módulos ES, `import … with { type: "json" }`, `<dialog>`, `IntersectionObserver`, `color-mix()`.
   - Sidebar: scrollspy marca la sección visible; abrir/cerrar deja `inert` solo en el fondo y devuelve el foco al botón que lo abrió.
   - Modal de Configuración: modo claro/oscuro, acento, fondo de página (dirección/velocidad según tema), tamaño de fuente y idioma persisten tras una recarga dura.
   - Idioma ES/EN: la portada y la grilla de juegos se re-renderizan con las cadenas correctas (las cadenas generadas en JS no usan `data-lang`).
   - Tema sin parpadeo: tras recarga dura, el fondo y el acento correctos se pintan antes del primer frame (lo aplica `js/theme-init.js`, único en todo el sitio).
   - En `juegos/`: las tarjetas del manifiesto se renderizan, las portadas cargan, el buscador y los chips de género filtran (incluido el cambio ES/EN) y los lanzamientos abren pestaña nueva con `rel="noopener noreferrer"`.
   - En `mis-estudios/`: el tema del portafolio se respeta y el buscador filtra, actualiza el conteo del placeholder y muestra/oculta `#sin-resultados`.
4. **Registros en consola permitidos:** los avisos de `utils/storage.js` cuando `localStorage` está bloqueado (modo privado) son esperables; cualquier otro error sí es un problema.

---

## Estructura del Proyecto

```
├── README.md               # Introducción y ejecución para personas
├── AGENTS.md               # Guía técnica para agentes
├── docs/                   # Documentación organizada
│   ├── README.md           # Índice de la documentación
│   └── prompts/            # Herramientas de desarrollo (leer solo a pedido)
│       ├── crear-estudios.md        # Prompt para crear artículos de la enciclopedia
│       ├── fichas-estudios.md       # Fichas de trabajo de los artículos (tema, slug, categoría)
│       ├── crear-videojuegos.md     # Prompt para crear juegos integrados
│       ├── crear-programas-web.md   # Prompt para crear herramientas de la sección programas
│       └── portadas-juegos.md       # Guía para generar portadas de la grilla
├── index.html              # Entrada principal (portada)
├── mis-estudios/           # Enciclopedia de informática (contenido educativo)
│   ├── AGENTS.md           # Reglas locales de la enciclopedia para agentes
│   ├── index.html          # Índice con buscador; grilla generada desde data/articulos.json
│   ├── mis-estudios.css    # Estilos específicos de la enciclopedia
│   ├── articulos/          # Un artículo por archivo <slug>.html
│   ├── data/articulos.json # Manifiesto de la grilla de artículos
│   └── js/copiar.js        # Botón «Copiar» de los bloques de código (solo artículos)
├── juegos/                 # Grilla y juegos arcade (guía en juegos/README.md)
│   ├── AGENTS.md           # Reglas locales de la grilla y los juegos para agentes
│   ├── index.html          # Grilla generada desde juegos/data/juegos.json
│   ├── README.md           # Cómo agregar juegos
│   ├── juegos.css          # Estilos específicos de la grilla de juegos
│   ├── data/juegos.json    # Manifiesto de la grilla de juegos
│   ├── _template/          # Plantilla base para juegos nuevos
│   └── <slug>/             # Un juego por carpeta (index.html + README-juego.md)
├── programas/              # Programas y herramientas (ver programas/AGENTS.md)
│   ├── AGENTS.md           # Reglas locales de la sección para agentes
│   ├── index.html          # Índice con buscador y filtros; grilla desde data/herramientas.json
│   ├── programas.css       # Estilos específicos de la sección
│   ├── herramientas/       # Herramientas implementadas (un archivo <slug>.html por herramienta)
│   └── data/herramientas.json # Manifiesto de la grilla de herramientas
├── js/                     # Módulos ES6 (compartidos por todo el sitio)
│   ├── main.js             # Punto de entrada
│   ├── theme-init.js       # Pre-pintado del tema (script clásico síncrono, único)
│   ├── buscador.js         # Buscador de grillas (script clásico configurable)
│   ├── controllers/        # Controladores de UI
│   │   ├── home/           # Grillas y modales de contenido (experiencia, estudios, proyectos)
│   │   ├── juegos/         # Grilla de juegos desde el manifiesto
│   │   ├── mis-estudios/   # Grilla de artículos desde el manifiesto
│   │   ├── programas/      # Grilla de herramientas desde el manifiesto
│   │   ├── sidebar/        # Menú lateral: tema, idioma, scrollspy, acentos y fondos
│   │   └── settings/       # Modal de configuración
│   ├── utils/              # Utilidades
│   └── lang/               # Internacionalización
├── stylesheets/            # CSS compartido
│   ├── base.css            # Base compartida: reset, tokens, layout, modal, componentes, navbar y sidebar
│   └── portada.css         # Estilos específicos de la portada
└── assets/                # Imágenes e iconos
```

### Mapa de módulos JavaScript

Inventario archivo → exportaciones → responsabilidad. Si se añade, renombra o cambia
el propósito de un módulo, actualizar esta tabla como parte del cambio.

**Punto de entrada y pre-pintado**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `js/main.js` | — (script principal) | Monta `InitModalDialog`, `SidebarController` (si existe `#HomePage`), `HomeController` (si existe `.main-layout`) y los controladores de grilla (`JuegosController` si existe `.juegos-grid`, `MisEstudiosController` si existe `.estudios-grid`, `ProgramasController` si existe `.programas-grid`) tras `DOMContentLoaded`. Registra también el Service Worker (PWA). |
| `js/theme-init.js` | IIFE clásica (no módulo) | Aplica modo, acento, fondo y escala desde `localStorage` antes del primer pintado en **todas las páginas del portafolio y sus secciones** (portada, `juegos/`, `mis-estudios/`, `programas/` y artículos/herramientas con chrome compartido). Salvo los juegos y `dj.html`, autocontenidos. Es el único script de pre-pintado; duplica las claves de `utils/storage.js` a propósito. |
| `js/buscador.js` | IIFE clásica (no módulo) | Buscador único de las grillas: filtra las tarjetas del término (y por categoría si hay chips `.filtro`), actualiza el placeholder con el conteo y usa `#sin-resultados`. Se configura por `data-attributes` del input `#buscador` (`data-buscador-tarjetas`, `data-buscador-placeholder`); la recarga tras renders dinámicos la resuelve un `MutationObserver` y los chips por delegación sobre `document`. |

**Controladores — `controllers/home/`**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `home.controller.js` | `default HomeController()` | Inicializa las grillas de la portada y el scrollspy dependiente. |
| `fnHome.js` | `GridWorkExperience()`, `GridEducation()`, `GridProjects()`, `reloadHomeContent()` | Genera el HTML de cada grilla (cadenas tomadas de `translations.home[lang]` e `introSection`) y re-renderiza al cambiar de idioma, conservando la tarjeta de experiencia expandida. |

**Controladores — `controllers/juegos/`**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `juegos.controller.js` | `default JuegosController()` | Carga el manifiesto `juegos/data/juegos.json`, lo valida y dispara el render de la grilla. |
| `fnJuegos.js` | `GridGames()`, `reloadGamesContent()` | Genera los chips de filtro por género y las tarjetas desde el manifiesto (etiquetas por idioma desde `translations.page[lang]`), marca `data-categoria` en cada tarjeta, preserva el género activo y re-renderiza al cambiar de idioma. |

**Controladores — `controllers/mis-estudios/`**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `mis-estudios.controller.js` | `default MisEstudiosController()` | Dispara el render de la grilla de artículos. |
| `fnMisEstudios.js` | `GridEstudios()` | Genera las categorías y tarjetas de artículos desde `mis-estudios/data/articulos.json` (mismo esquema que juegos.json). Contenido solo en español. |

**Controladores — `controllers/programas/`**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `programas.controller.js` | `default ProgramasController()` | Dispara el render de la grilla de herramientas. |
| `fnProgramas.js` | `GridProgramas()` | Genera los chips de filtro, las categorías y las tarjetas desde `programas/data/herramientas.json` (mismo esquema que juegos.json). Contenido solo en español. |

**Controladores — `controllers/sidebar/`**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `sidebar.controller.js` | `default SidebarController()` | Abre/cierra el menú, marca `inert` en el fondo, gestiona el foco de retorno y marcar el enlace activo. |
| `fnSectionNav.js` | `default sectionNav()` | Scrollspy con `IntersectionObserver`: marca `.active` y abre el submenú cuando la sección es hija. |
| `fnChangeLanguage.js` | `sectionLanguage()` (default), `applyTranslations()` | Toggle ES/EN y actualización de `[data-lang]`, `[data-i18n-title]`, `[data-i18n-aria-label]`. Las claves se resuelven desde un índice único por idioma armado con las 4 secciones en orden fijo; un aviso en consola señala cualquier colisión. |
| `fnThemeMode.js` | `themeMode()` (default), `updateModeText()` | Alterna claro/oscuro y actualiza el texto del botón correspondiente. |
| `fnThemeColor.js` | `default themeColor()` | Aplica el acento activo (`--theme-color`, `--theme-color-soft`) desde `utils/themeColors.js` y sincroniza el swatch seleccionado entre pestañas sin reescribir `localStorage`. |
| `fnBackgroundTheme.js` | `default backgroundTheme()` | Aplica tema de fondo, dirección del degradado y velocidad (`--page-*`). |
| `fnFontScale.js` | `default fontSize()` | Aplica la escala tipográfica (`--font-scale`) de 0.85 / 1 / 1.15. |

**Controladores — `controllers/settings/`**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `settings.controller.js` | `openSettingsModal()` | Genera el contenido del modal de Configuración en cada apertura y delega los eventos sobre `document` (sobrevive al re-render dinámico). |

**Utilidades — `utils/`**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `assets.js` | `ICONS_URL` | URL absoluta de `assets/icons/` vía `import.meta.url`, válida en raíz y subcarpetas. |
| `copyEmail.js` | `copyEmail()` | Copia el correo (fijado en el código) con `navigator.clipboard`. |
| `dialog.js` | `ModalDialog()`, `InitModalDialog()` | Crea y conecta el `<dialog>` compartido (Configuración y educación) y mantiene el estado de `<body>` con `.modal-open` / `.modal-closed`. |
| `storage.js` | getters/setters por clave + `STORAGE_KEY_*` | Acceso seguro a `localStorage` con valores por defecto y captura de errores. |
| `themeBackgrounds.js` | `BACKGROUND_THEMES`, `GRADIENT_DIRECTIONS`, `PSYCHEDELIC_SPEEDS`, `FONT_SCALE_OPTIONS` | Catálogos únicos de los temas de fondo, 7 direcciones, 3 velocidades y 3 escalas. |
| `themeColors.js` | `THEME_COLORS`, `getThemeColorDef` | Fuente única de los 6 acentos disponibles. |

**Internacionalización y scripts clásicos de sección**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `js/lang/translations.config.js` | `currentLanguage`, `setCurrentLanguage()` | Estado global del idioma (`es` \| `en`) leído por todas las grillas. |
| `js/lang/translations.json` | datos JSON | Claves de la UI (`page`, `introSection`, `home`, `header`, …). |
| `mis-estudios/js/copiar.js` | IIFE clásica (no módulo) | Botón “Copiar” sobre los bloques de código de los artículos: copia con `navigator.clipboard` (respaldo `execCommand`), dedentando la sangría. Solo en páginas de estudio. |

### Manifiestos de contenido

Las tres grillas de sección usan el **mismo esquema de manifiesto**: una clave raíz
`version` (formato) y un array `items`; en `mis-estudios/` y `programas/` hay además
un array `categories` (`id` + `label {es}`) que ordena y agrupa las tarjetas. Cada
entrada lleva `slug` (kebab-case, validado con un patrón), `title`, `description`,
`status: "published" \| "wip"` y campos propios de la sección (`covers`/`year`/`genre` en
juegos; `keywords`/`category` en artículos y herramientas; `icon`/`technologies` en
herramientas). Solo se publican entradas con `status: "published"` y slug válido;
las URLs no van en el manifiesto: se construyen como `<patrón de la sección>/<slug>…`.

| Manifiesto | Grilla | Contenido de las entradas |
| --- | --- | --- |
| `juegos/data/juegos.json` | `.juegos-grid` | Juegos en `juegos/<slug>/index.html` |
| `mis-estudios/data/articulos.json` | `.estudios-grid` | Artículos en `mis-estudios/articulos/<slug>.html` |
| `programas/data/herramientas.json` | `.programas-grid` | Herramientas en `programas/herramientas/<slug>.html` |

### Inventario de claves de `localStorage`

Referencia única de preferencias. Recuerda: una clave nueva debe reflejarse aquí,
en `utils/storage.js` y en `theme-init.js` (único script de pre-pintado).

| Clave | Valores posibles | Escribe | Lee | Por defecto |
| --- | --- | --- | --- | --- |
| `theme-mode` | `dark` \| `light` | `fnThemeMode` (vía `utils/storage.js`) | `theme-init.js` | `dark` |
| `theme-color` | nombre de acento en `themeColors.js` (`blue`\|`red`\|…) | `fnThemeColor` | `utils/storage.js` (`getThemeColor`) | `blue` |
| `theme-color-value` | color CSS, p. ej. `hsl(210 75% 28%)` | `fnThemeColor` | `theme-init.js` | `hsl(210 75% 28%)` |
| `theme-background` | `default` \| color \| `multicolor` (`BACKGROUND_THEMES`) | `fnBackgroundTheme` | `theme-init.js` | `default` |
| `gradient-direction` | una de `GRADIENT_DIRECTIONS` | `fnBackgroundTheme` | `theme-init.js` | `topToBottom` |
| `psychedelic-speed` | `lento` \| `normal` \| `rapido` | `fnBackgroundTheme` | `theme-init.js` | `normal` |
| `font-scale` | `0.85` \| `1` \| `1.15` | `fnFontScale` | `theme-init.js` | `1` |
| `language` | `es` \| `en` | `fnChangeLanguage` | `fnChangeLanguage`, `translations.config.js` | `es` |
| `<slug>_best_v1` | número u objeto JSON (récord del juego; algunos juegos guardan `{record, bestLevel}` o un mapa por canción) | cada juego en `juegos/<slug>/` | el propio juego | — (propio de cada juego) |

Los juegos que antes usaban otra clave migran la clave antigua automáticamente (copian el valor
a la clave `<slug>_best_v1` y borran la antigua la primera vez que se abre el juego). El mapa
completo de claves actuales y antiguas está en `juegos/README.md` (sección "Canon visual
retro-arcade"). Además del récord, algunos juegos guardan preferencias propias con el patrón
`<slug>_…_v1` (p. ej. `snake_settings_v1` o `neon-maze_sfx_v1`): son claves privadas de cada
juego, documentadas en `juegos/README.md`, y no deben borrarse al limpiar el inventario.

---

## Estilo de Código

### Comentarios

Prohibido escribir comentarios en el código (HTML, CSS y JS). Toda información sobre funciones, archivos o lógica extra vive en la documentación para agentes (`AGENTS.md` y `docs/`), nunca en el código. Excepciones únicas: pragmas técnicos funcionales (`@ts-expect-error`, `@ts-ignore`, `@ts-nocheck`, `eslint-disable`, shebang) y archivos de configuración/plantillas operativas. Cumplimiento por disciplina; el código existente puede contener comentarios heredados, pendientes de retirar.

### JavaScript

- **Módulos ES6**: Usar `import`/`export` (type="module")
- **Comillas**: Simples para strings nuevos (`'texto'`); el código existente mezcla simples y dobles, así que respetar el estilo del archivo que se edite
- **Punto y coma**: Siempre al final de sentencias
- **Indentación**: 2 espacios
- **Funciones**: Preferir arrow functions para callbacks
- **Variables**: Usar `const`, `let` solo cuando sea necesario
- **Nullish**: Usar optional chaining (`?.`) para elementos DOM

```javascript
// Correcto
import { fn } from './utils.js';

const element = document.querySelector('.class');
element?.addEventListener('click', () => {
  console.log('clicked');
});
```

### CSS

- **Metodología**: BEM-like (`.block-element--modifier`)
- **Variables**: Usar sistema de diseño en la sección `:root` de `stylesheets/base.css`
- **Nesting**: Permitido (CSS moderno nativo)
- **Comentarios**: Secciones con `/* ===== Nombre ===== */`
- **Unidades**: `rem` para texto, `em` para componentes, `px` para breakpoints
- **Responsive**: Mobile-first con `@media (min-width: 768px)`. Se admiten excepciones puntuales con `@media (max-width: 767px)` cuando son complementarias de un bloque `min-width` ya existente (p. ej. `base.css`, `portada.css`, `mis-estudios.css`); no sustituyen al enfoque mobile-first.

```css
/* Correcto */
.my-component {
  padding: var(--space-4);
  font-size: var(--text-base);

  @media (min-width: 768px) {
    padding: var(--space-8);
  }

  &.active {
    background: var(--theme-color);
  }
}
```

### HTML

- **Comillas**: Dobles para atributos (`"value"`)
- **Idioma**: Atributo `lang="es"` en `<html>`
- **Accesibilidad**: Alt text en imágenes, atributos `title` en links
- **Scripts**: Usar `defer type="module"`, salvo `js/theme-init.js`, que es un script clásico síncrono a propósito para aplicar el tema antes del primer pintado
- **SEO**: Meta tags descripción y keywords incluidos

```html
<!-- Correcto -->
<script src="./js/main.js" defer type="module"></script>
<img src="./assets/image.png" alt="Descripción" loading="lazy" />
```

---

## Arquitectura

### JavaScript

- **Controladores**: Funciones export default que inicializan componentes. Punto de entrada: `js/main.js`.
- **Utils**: Funciones puras exportadas nombradas.
- **DOM**: Verificar existencia antes de manipular (`if (element)`).
- **Eventos**: Usar delegation cuando sea posible.
- **Menú lateral**: `.sidebar` se compone de header, `nav.sidebar-menu` y `footer` con el botón de ajustes. Dentro de `nav.sidebar-menu` hay un `.sidebar-item--group` que contiene dos botones hermanos: la fila "Inicio" (`.sidebar-item` con icono `home` + `data-target="inicio"`) y el botón `.sidebar-expand` (chevron con `aria-expanded`/`aria-controls`) que despliega un `.sidebar-submenu` con 3 elementos (`data-target`: experiencia, estudios, proyectos; en `mis-estudios/` son enlaces `../index.html#seccion` o `../../index.html#seccion` desde `mis-estudios/articulos/*.html`). El scrollspy (`controllers/sidebar/fnSectionNav.js`) marca el item `.active` según la sección visible; si es una hija, abre el submenú y añade `.has-active` al `--group`. Al abrir el menú, `sidebar.controller.js` marca el fondo como `inert` (`.navbar`, `.main-layout`/`.main-content`, `.footer`, `.modal-dialog`) y lleva el foco al botón de cierre; al cerrarlo retira el `inert` y devuelve el foco al botón que lo abrió.
- **Enlaces externos del menú**: debajo de "Inicio" hay `<a class="sidebar-item">` para "Mis estudios" (icono `menu_book`, → `./mis-estudios/index.html`), "Juegos" (icono `gamepad`, → `./juegos/index.html`) y "Programas" (icono `build`, → `./programas/index.html`; en esas subpáginas lleva `.active` y `aria-current="page"`, y las rutas se ajustan con `../` o `../../`). No llevan `data-target`, por lo que el scrollspy los ignora; `sidebar.controller.js` cierra el menú al pulsarlos.
- **Grillas y manifiestos**: las tres secciones (`juegos/`, `mis-estudios/`, `programas/`) siguen el mismo patrón: `index.html` con buscador (y filtros por categoría en programas y por género en juegos), un contenedor `<seccion>-grid` vacío en el HTML, un manifiesto `<seccion>/data/*.json` y un controlador en `js/controllers/<seccion>/` (`<seccion>.controller.js` + `fn<Seccion>.js`) que renderiza las tarjetas. El controlador se monta en `main.js` solo si existe su contenedor. Para agregar contenido nuevo: archivo por `slug` en la carpeta de la sección + entrada en el manifiesto + verificación.
- **Enciclopedia** (`mis-estudios/`): comparte la preferencia de tema del portafolio (pre-pintado con `js/theme-init.js`). Sus páginas cargan también la barra, el menú lateral y `js/main.js`, de modo que el modal de Configuración funciona igual que en la portada. La grilla se renderiza desde `mis-estudios/data/articulos.json`; los artículos viven en `mis-estudios/articulos/<slug>.html`. El contenido es solo en español, pero las etiquetas de UI generadas en JS (p. ej. «Próximamente») se toman de `translations.page[lang]`. El buscador es el `js/buscador.js` compartido, configurado por `data-attributes` del input.
- **Juegos**: `juegos/index.html` es una subpágina que reutiliza `base.css`, la barra, el sidebar y el modal; usa `.main-content` (compartido con la enciclopedia) y `juegos/juegos.css`. La grilla se renderiza desde `juegos/data/juegos.json` con `controllers/juegos/`. El buscador es el `js/buscador.js` compartido y los chips de filtro por género se generan en `fnJuegos.js` desde el campo `genre` del manifiesto: la clave estable es `genre.es`, que se replica en `data-categoria` de cada tarjeta; las etiquetas visibles y el género activo se conservan al cambiar de idioma. Cada juego vive en `juegos/<slug>/index.html`, es autocontenido y se abre en una pestaña nueva (`target="_blank"` + `rel="noopener noreferrer"`). El manifiesto se valida con un patrón de `slug` y solo publica entradas con `status: "published"`.
- **Programas** (`programas/`): subpágina que reutiliza `base.css`, la barra, el sidebar y el modal; usa `.main-content` y `programas/programas.css`. La grilla se renderiza desde `programas/data/herramientas.json` con `controllers/programas/` (chips de filtro incluidos, generados desde las categorías del manifiesto): las herramientas `published` se convierten en enlace (botón «Abrir» con `target="_blank"` + `rel="noopener noreferrer"`, patrón de la grilla de juegos) y las `wip` conservan el estado «Próximamente». El contenido del manifiesto es solo en español, pero las cadenas de UI de la grilla («Abrir», «Próximamente», «Filtrar por categoría», «Todas» y la nota de pestaña nueva) se toman de `translations.page[lang]`; no se traducen títulos ni descripciones. Las herramientas propias viven en `programas/herramientas/<slug>.html`, son autocontenidas y siguen el patrón de `juegos/` (guía en `docs/prompts/crear-programas-web.md`). El buscador es el `js/buscador.js` compartido; comparte el tema mediante `js/theme-init.js`.
El dimensionado del escenario de los juegos de marco pequeño y de la plantilla (snake,
space-invaders, neon-racer, plataformas, dungeon-crawler, tower-defense) sigue un criterio
común: marco máximo de 900×900 px CSS (`--game-max` y, según el juego, `--game-chrome` o
el sistema de reservas `--reserve-*`) y buffer del canvas renderizado a la resolución
visible (`renderScale`), documentado en `juegos/README.md` (sección "Dimensionado del
canvas"). Las portadas muestran la portada del campo `covers` del manifiesto (ver
Arquitectura CSS).
- **Rutas de assets**: los iconos que se inyectan desde JS (modal de Configuración y modo) se resuelven con `utils/assets.js` (`import.meta.url` → `assets/icons/`), para que funcionen tanto desde la raíz (`index.html`) como desde subcarpetas (`mis-estudios/` y `juegos/`).
- **Configuración**: el modal (`.modal-dialog`) se rellena desde `controllers/settings/settings.controller.js`; los controles de idioma/modo/color/fondo/dirección/velocidad y tamaño de fuente usan **delegación de eventos sobre `document`**, por lo que siguen funcionando aunque el contenido se genere dinámicamente en cada apertura. Las filas de "Dirección del degradado" y "Velocidad" son condicionales: se muestran/ocultan con `.is-hidden` según el tema de fondo elegido (dirección para temas con degradado; velocidad solo para `multicolor`). La lógica de aplicación vive en `controllers/sidebar/fnBackgroundTheme.js` (fondo, dirección y velocidad) y `fnFontScale.js`; los datos están centralizados en `utils/themeBackgrounds.js`. `applyTranslations()` (en `fnChangeLanguage.js`) actualiza el texto de `[data-lang]` y el `title`/`aria-label` de `[data-i18n-title]`/`[data-i18n-aria-label]`, de modo que los controles dinámicos cambian de idioma sin reabrir el modal.
- **Pre-pintado del tema**: para evitar el parpadeo, el modo, el acento, el fondo y el tamaño de fuente se aplican antes del primer pintado. **Todas las páginas del portafolio y de sus secciones** (portada, `juegos/`, `mis-estudios/`, `programas/` y los artículos/herramientas con chrome compartido) usan el mismo `js/theme-init.js` (script clásico síncrono en `<head>`, con la profundidad de ruta que corresponda: `../js/` o `../../js/`). **Se exceptúan los juegos de `juegos/<slug>/` y `programas/herramientas/dj.html`**, autocontenidos, que gestionan su propio tema. Lee las mismas claves de `localStorage` que `utils/storage.js` (`theme-mode`, `theme-color-value`, `theme-background`, `gradient-direction`, `psychedelic-speed`, `font-scale`).
- **PWA (instalable/offline)**: `manifest.json` y `service-worker.js` en la raíz; iconos en `assets/icons/icon-192.png` e `icon-512.png` (más `icon.svg` como fuente). `main.js` registra el SW con URL derivada de `import.meta.url`; las páginas de juego lo registran con un script inline. El SW precachea todo el sitio (lista generada en `service-worker.js`) y usa network-first para navegaciones y stale-while-revalidate para assets. Al publicar cambios, subir `CACHE_NAME` (`v2`, …) para forzar el refresco. Mantener las rutas relativas al desplegar en subruta.

### CSS

- **Sistema de diseño**: tokens definidos en la sección `:root` de `stylesheets/base.css` — neutros (`--n100…--n900`, `--dn100…--dn900`), superficies (`--color-background`, `--color-surface`, `--color-border`), texto (`--color-text`, `--color-text-secondary`), acentos en trío (`--<color>-claro/-normal/-oscuro`), tipografía (`--text-*`, `--font-*`), radios, sombras (`--shadow-sm…--shadow-xl`) y bordes (`--border-thin/-normal/-thick`).
- **Hojas CSS**: `stylesheets/base.css` contiene todo lo compartido (reset, variables, estilos globales, `.main-content`, modal, componentes, navbar y sidebar); `stylesheets/portada.css` añade lo específico de la portada, y cada sección es dueña de su hoja: `juegos/juegos.css`, `mis-estudios/mis-estudios.css` y `programas/programas.css`. Cada HTML carga siempre `base.css` primero y después la hoja de su página, sin `@import`; un cambio compartido se hace una sola vez en `base.css`.
- **Alias de compatibilidad**: el único alias que queda definido y con uso real es
  `--color-white` (→ `--n100`). Tras la última auditoría se purgaron los ~44 tokens sin
  referencias (toda la familia `--color-blue/-dark/…` y los semánticos
  `--color-success/warning/error/info`, `--color-background-neutral`, `--color-border-light`,
  `--color-separator`); reflotar un alias solo al aparecer su primer uso real.
- **Escalas reservadas**: `:root` conserva escalas completas (`--text-*`, `--space-*`,
  `--size-*`, `--n*`/`--dn*` y `--<color>-claro`) de las que hoy solo se consumen algunos
  valores. Se mantienen como escala deliberada, igual que `--breakpoint-*` (solo referencia);
  no purgarlas sin decidir formalmente reducir la paleta.
- **Temas de color**: el acento activo se expone como `--theme-color` (variante oscura) y `--theme-color-soft` (variante clara). `utils/themeColors.js` es la fuente única de las 6 opciones (campo `soft`); `controllers/sidebar/fnThemeColor.js` aplica esos valores y `js/theme-init.js` deriva la variante clara del valor guardado mediante `aclarar()`. Los tokens CSS `--<color>-claro` son entradas de la paleta con usos directos puntuales (p. ej. el escáner), no la fuente del acento de la UI.
- **Footer**: `.footer` existe solo en la portada (`index.html`) y está compuesto por la sección de tecnologías (`.footer-tech`), la de agentes de IA (`.footer-ai`), los créditos de iconos y el bloque `.footer-bottom`. Usa el acento adaptativo `--footer-accent` (`--theme-color` en modo claro y `--theme-color-soft` en modo oscuro, mismo patrón que `--enc-accent` de la enciclopedia) para que los títulos y las firmas tengan contraste en ambos modos. Las listas usan `.footer-chips` con `.footer-chip`; las firmas de IA son `.footer-chip--ai` dentro de `.footer-chips--ai`.
- **Temas de fondo (degradados)**: el fondo de página se controla con `--page-background`, `--page-gradient`, `--page-scrim`, `--page-background-size`, `--page-background-repeat` y `--page-animation`, consumidos por `.body-container`. `utils/themeBackgrounds.js` define los 10 temas (default + 8 colores, incluido violeta, + multicolor), las 7 direcciones (4 lineales, 2 radiales y color sólido) y las 3 velocidades. El degradado usa los tokens `--<color>-oscuro` y `--neutral-background-soft`, este último redefinido en modo oscuro. El modo `multicolor` usa un arcoíris animado con `@keyframes page-rainbow` (180s lento / 30s normal / 10s rápido) que se anula con `prefers-reduced-motion`. La paleta del arcoíris está duplicada a propósito en `utils/themeBackgrounds.js` (`RAINBOW_GRADIENT`) y en `js/theme-init.js` (`ARCOIRIS`): este último es un script clásico que no puede importar módulos, así que cualquier cambio de paleta debe hacerse en ambos sitios. En modo claro, `html.has-page-theme` aplica un velo neutro (`--page-scrim`) y oscurece el texto secundario para mantener el contraste.
- **Tamaño de fuente**: `html` usa `font-size: calc(16px * var(--font-scale, 1))`; el modal fija `--font-scale` en 0.85, 1 o 1.15, por lo que escala toda la tipografía basada en `rem` sin tocar los breakpoints en `px`.
- **Modo oscuro**: clase `.dark` en `body.dark` (portafolio) y `html.dark` (subpáginas como `mis-estudios/`, que la fijan antes de pintar); la sección `:root` de `base.css` admite ambos selectores y `fnThemeMode.js` actualiza los dos nodos. Redefine las variables semánticas (`--color-background`, `--color-surface`, `--color-text`, …), por lo que los componentes se adaptan solos.
- **Enciclopedia**: estilos en `mis-estudios/mis-estudios.css`; conserva los nombres de clase originales y usa el acento adaptativo `--enc-accent`.
- **Juegos**: `juegos/juegos.css` contiene la página y las tarjetas (`.juego-card*`) con tokens de `base.css`. Cada tarjeta muestra su portada (`.juego-card__portada`) leyendo `covers` del manifiesto: rutas relativas a `juegos/index.html`, como `../assets/images/games/<slug>/cover.jpg`. Con una sola imagen es estática; con 2–3 se activa el carrusel por CSS (`--carousel`, crossfade); sin imágenes, placeholder con degradado. La guía para generar portadas es una herramienta de desarrollo en `docs/prompts/portadas-juegos.md`.
- **Buscador y filtros**: los estilos de `.buscador__campo`, `.buscador__mensaje`, `.filtros` y `.filtro` viven en la sección de componentes de `stylesheets/base.css` y los comparten `mis-estudios/`, `programas/` y `juegos/`. Cada hoja de sección conserva solo los overrides de acento propios: `--enc-accent` en la enciclopedia, `--prog-accent` en programas y `--theme-color` (el acento de `base.css`) en juegos.
- **Programas**: `programas/programas.css` contiene la página, las tarjetas (`.programa-card*`) y el override de acento `--prog-accent` para los chips `.filtro`, cuyos estilos compartidos están en `base.css`.
- **Modal**: `.modal-dialog` usa las variables semánticas y se adapta al modo oscuro automáticamente; el botón de cierre usa `.modal-close`; el estado se expresa con clases excluyentes en `<body>` (`.modal-open` bloquea el scroll con `overflow-y: hidden`, `.modal-closed` lo restaura con `overflow-y: visible`), gestionadas por `utils/dialog.js`. El `<dialog>` referencia `aria-labelledby="modal-title"`, por lo que cada contenido dinámico (Configuración y educación) debe generar un elemento con `id="modal-title"` en cada apertura.
- **Salto al contenido**: el estilo del enlace `.saltar` vive en la sección de componentes de `stylesheets/base.css` y lo comparten la portada y la enciclopedia.
- **Encabezado del navbar**: solo `index.html` mantiene `<h1>Pablo Diaz</h1>`. Las subpáginas (secciones, artículos y herramientas) usan `<span class="navbar-name">Pablo Diaz</span>` para dejar el único `<h1>` al título real de la página; `.navbar-name` comparte estilo con el `h1` del logo en `base.css`. `dj.html` es la excepción autocontenida.
- **Transiciones**: variables `--transition-normal`, `--ease-in-out`; se anulan con `prefers-reduced-motion: reduce`.

### Internacionalización

- Idioma principal de la interfaz: Español, con traducciones EN de la interfaz.
- La mayoría de los módulos usan nombres de variables y funciones en inglés. Los scripts clásicos (`js/theme-init.js`, `js/buscador.js`, `mis-estudios/js/copiar.js`) y la enciclopedia conservan nombres heredados en español.
- Comentarios y documentación: español.
- Configuración en `js/lang/translations.config.js`; traducciones en `js/lang/translations.json` (secciones: `page`, `introSection`, `home`, `header`, entre otras).

---

## Limitaciones y problemas conocidos

### Arquitectura y ejecución

- Sitio completamente estático: sin backend, API, base de datos ni autenticación.
- Sin build, sin gestor de dependencias, sin tests automatizados y sin linting. La única automatización es el despliegue de GitHub Pages.
- Es obligatorio servir por HTTP. `file://` bloquea los módulos ES y la importación de JSON por CORS.
- GitHub Pages publica el repositorio en una subruta; todas las rutas deben ser relativas.
- No hay configuración por entorno ni variables de entorno.

### Compatibilidad de navegador

- Requiere navegadores modernos: módulos ES, import attributes (`with { type: "json" }`), CSS nesting, `<dialog>`, `IntersectionObserver`, `color-mix()` y `@view-transition`.
- `@view-transition` y `color-mix()` son mejoras progresivas; si el navegador no las soporta, la página sigue funcionando con menor fidelidad visual.
- Sin `IntersectionObserver`, el scrollspy no se activa.

### Preferencias y almacenamiento

- Tema, idioma, fondo, dirección, velocidad y escala se guardan en `localStorage`. Si el navegador lo bloquea, se usan los valores por defecto y no se persiste nada.
- `js/theme-init.js` es el único script de pre-pintado y duplica la lectura de las claves a propósito. Cualquier clave de tema nueva debe añadirse en él y en `js/utils/storage.js`.
- Los juegos usan claves propias con el patrón `<slug>_best_v1`, sin colisionar con las del sitio. Todos comparten el canon visual retro-arcade (paleta neón oscura, modal `<dialog>`, scanlines CRT) documentado en `juegos/README.md`.

### Internacionalización

- La interfaz tiene traducciones ES/EN, pero el contenido de la enciclopedia (`mis-estudios/`) y el de los juegos (`juegos/<slug>/`) está solo en español. Las tarjetas de la grilla de juegos sí se traducen desde el manifiesto.
- `applyTranslations()` busca claves en `page`, `introSection`, `home` y `header`; una clave
  nueva debe colocarse en una de esas secciones. Las claves deben ser únicas entre esas 4
  secciones: `fnChangeLanguage.js` arma un índice por idioma y avisa por consola si se
  duplican. La clave `name` no se traduce: `applyTranslations()` la saltea a propósito
  porque es un nombre propio.
- Las cadenas que se renderizan desde JavaScript se traducen al generarse (por ejemplo, `GridProjects()` toma `viewProject` de `translations.introSection[lang]`, y `GridGames()` toma las etiquetas de `translations.page[lang]`), no vía `data-lang`.
- Al cambiar de idioma se re-renderizan la portada y la grilla de juegos (`reloadHomeContent()` de `controllers/home/fnHome.js` y `reloadGamesContent()` de `controllers/juegos/fnJuegos.js`); ambas no hacen nada si su contenedor no existe.
- Cuidar el orden entre `applyTranslations()` y las funciones que regeneran HTML (`GridWorkExperience`, `GridProjects`) al tocar idioma: las cadenas renderizadas en JS deben traducirse al generarse.

### Contenido y assets

- La enciclopedia cuenta con 28 artículos publicados.
- La imagen del proyecto de la portada se sirve desde `assets/images/project-nextjs.jpg` (autohospedada). Las portadas de los juegos viven en `assets/images/games/<slug>/`.
- Los iconos se sirven desde `assets/`; los que se inyectan desde JavaScript usan `utils/assets.js` para funcionar en la raíz y en subcarpetas. El icono `gamepad.svg` identifica el enlace "Juegos" del menú lateral.
- **Juegos**: los juegos son estáticos y autocontenidos en `juegos/<slug>/index.html` dentro de este repositorio; no hay directorio externo de desarrollo. La guía, el canon visual y el manifiesto están en `juegos/README.md` y `juegos/data/juegos.json`.
- El correo que copia `utils/copyEmail.js` está fijado en el código. Si cambia, hay que actualizarlo ahí y en la información de contacto.
- **`assets/files/PabloDiazCV.pdf`** (238 KB) se mantiene en el repositorio sin enlazar por
  decisión del desarrollador: es material para reenlazar el CV desde el sidebar o el modal si se
  recupera el botón de descarga. Hasta entonces, ninguna página lo referencia y así debe quedar.

### Deuda técnica

- Cada juego tiene una sola portada (`cover.jpg`); las portadas 2 y 3 para el carrusel aún no se han generado (la guía y el código ya aceptan hasta 3 mediante `covers`).
- No existe `updatedAt` por juego en el manifiesto.
- El contenido de la enciclopedia no tiene traducción al inglés.

### Rendimiento y mantenimiento

- No hay minificación, bundling ni caché personalizada; es intencional para mantener el sitio simple.
- Usar `loading="lazy"` en imágenes y evitar dependencias externas.
- Cualquier cambio en el sistema de temas debe reflejarse en `utils/storage.js`, `utils/themeBackgrounds.js` y `theme-init.js` (único script de pre-pintado).

---

## Firma de agentes IA en el footer

Orden permanente para todo agente o modelo de IA que trabaje en este repositorio.

1. **Firma obligatoria**: todo agente o modelo de IA que aporte al proyecto —con aporte grande o
   pequeño— debe añadir su nombre en la sección "Agentes de IA" del footer de `index.html` (la
   primera página principal del sitio). La firma es un `<li class="footer-chip footer-chip--ai">`
   dentro del `<ul class="footer-chips footer-chips--ai">`, y solo contiene el nombre del modelo.
2. **Un único lugar permitido**: el footer de la portada es el **único** punto del sitio donde un
   modelo puede dejar su marca. No hay ninguna otra mención autorizada.
3. **Prohibiciones**: un modelo de IA **no puede** dejar marcas de agua, comentarios-firma, nombres
   de modelo en el código, archivos ni recursos propios, claves de `localStorage` propias, entradas
   en el manifiesto, textos en `README-juego.md`, contenidos en la enciclopedia ni ninguna otra
   forma de mención, aclaración o expresión en el resto del sitio.
4. **Aclaraciones del modelo**: si el modelo desea expresar o aclarar algo, ese mensaje se incluye
   únicamente en la sección "Agentes de IA" del footer de la portada (por ejemplo, en la nota de la
   sección, que es texto del sitio y se traduce con `data-lang`), nunca en otro archivo.
5. **Textos de la sección**: el título, la descripción y la nota de la sección "Agentes de IA" son
   del sitio y se traducen con `data-lang` (`footerAiTitle`, `footerAiText`, `footerAiNote` en
   `translations.json`). Los nombres de los modelos no se traducen.

Los `AGENTS.md` locales de `juegos/` y `mis-estudios/` repiten esta orden: esas carpetas no admiten
firmas, marcas ni menciones de modelos de IA.

---

## Protocolo de mantenimiento de documentación

**Regla de oro:** todo cambio de código que afecte APIs, firmas o comportamientos documentados **actualiza la documentación afectada en la misma tarea**.

### Qué tocar por tipo de cambio

| Cambio de código | Docs a actualizar |
| --- | --- |
| Entrada nueva en un manifiesto (`juegos/data/juegos.json`, `mis-estudios/data/articulos.json`, `programas/data/herramientas.json`) | Archivo por `slug` en la carpeta de la sección + entrada en el manifiesto + verificación por HTTP |
| Juego nuevo | `juegos/<slug>/index.html` + `README-juego.md`, entrada en `juegos/data/juegos.json`, canon visual en `juegos/README.md` |
| Artículo nuevo | `mis-estudios/articulos/<slug>.html`, entrada en `mis-estudios/data/articulos.json` |
| Herramienta nueva | `programas/herramientas/<slug>.html`, entrada en `programas/data/herramientas.json` |
| Cambio en CSS compartido | `stylesheets/base.css` (una sola vez; las hojas de sección no duplican) |
| Cambio en tema, acento o fondo | `js/utils/storage.js`, `js/theme-init.js`, `js/utils/themeBackgrounds.js` y el inventario de claves de `AGENTS.md` |
| Cambio en internacionalización | `js/lang/translations.json` y las cadenas renderizadas en JS |
| Cambio en sidebar, navbar o modal | `controllers/sidebar/*`, `stylesheets/base.css` |
| Ítem de limitación o deuda corregido | Borrar el ítem de `AGENTS.md` (y del tracker si aplica) |
| Funcionalidad nueva o eliminada (mayor) | `README.md` y `AGENTS.md` |

### Reglas anti-regresión

1. **Verificar contra el código antes de escribir** (`grep -n`/lectura directa), no reproducir docs ni escribir de memoria.
2. **Anti-API-fantasma:** antes de documentar una firma o export, verificar que existe con `grep -n`.
3. **Atribución con grep:** documentar consumos pantalla↔componente/servicio con `grep -rn <símbolo>`, nunca de memoria.
4. **Re-contar claims numéricos** (artículos publicados, juegos, herramientas, claves de `localStorage`) antes de cada cierre.
5. **Concisión:** integrar solo divergencias de valor.
6. **Documentación solo para agentes IA, en español** (excepción: `README.md` para personas); sin plazos; prohibido commits/push.

---

## Reglas de mantenimiento

- **Sin frameworks ni build**: Vanilla JS/CSS únicamente; no introducir bundlers, frameworks ni backend.
- **GitHub Pages**: mantener rutas relativas y compatibilidad con despliegue estático desde `main`.
- **Performance**: usar `loading="lazy"` en imágenes.
- **Documentación**: mantener `README.md`, `AGENTS.md` (raíz y los locales de `juegos/` y `mis-estudios/`), `docs/README.md` y `juegos/README.md` sincronizados con el código. No reintroducir planes de tareas, fases ni informes de estado: la documentación describe el estado real del código.
- **Juegos**: un juego nuevo se integra copiando su carpeta a `juegos/<slug>/` siguiendo el canon visual retro-arcade (`_template/` como base, `snake/` como referencia), añadiendo su entrada a `juegos/data/juegos.json` (con `status: "published"` solo si está probado) y documentándolo con `README-juego.md`; no se edita el juego para adaptarlo al chrome del portafolio.
- **Información personal**: no modificar los datos personales del desarrollador.
- **Firma de IA**: todo agente o modelo de IA que aporte al proyecto firma **solo** en el footer de la portada (ver "Firma de agentes IA en el footer"); en ningún otro lugar del sitio puede dejar marcas, comentarios, código o recursos propios.
- **Commits**: no crear commits automáticamente ni ejecutar `git commit`; los commits son manuales y los realiza el desarrollador.
