# AGENTS.md - Guía para Agentes de Código

## Descripción del Proyecto

Portafolio web personal desarrollado con HTML, CSS y JavaScript vanilla. Sitio estático desplegado en GitHub Pages.

**URL de producción:** https://pfd1795.github.io/pfd1795/

**Documentación vigente:** `README.md` (introducción y ejecución para personas), `AGENTS.md` (arquitectura, convenciones y limitaciones para agentes), `AGENTS.md` locales en `juegos/` y `mis-estudios/` (reglas propias de cada carpeta; los agentes los combinan con el de la raíz), `docs/README.md` (índice de la documentación), `docs/AUDITORIA.md` (hoja de verificación para auditorías) y `juegos/README.md` (cómo agregar y documentar juegos). `docs/prompts/` contiene herramientas para desarrolladores: solo leerlas cuando se pida explícitamente. No hay fases, tareas, auditorías ni informes activos en el repositorio; el estado real está en el código y en esta guía.

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
   | `base.css`, `sidebar/`, `main.js`, `theme-init.js` | `/`, `/juegos/`, `/mis-estudios/` y una subpágina de estudio (p. ej. `/mis-estudios/estudios/estudios_css.html`) |
   | `controllers/home/`, `lang/` | `/` (portada) |
   | `controllers/juegos/`, `data/juegos.json` | `/juegos/` |
   | `mis-estudios/` (contenido, `enciclopedia.css`, `tema.js`, `buscador.js`) | `/mis-estudios/` y sus subpáginas de `estudios/` |
   | Modal de Configuración (`settings.controller.js`, `utils/dialog.js`) | `/` y `/juegos/` (apertura desde el footer del sidebar) |

3. **Checklist funcional en el navegador:**
   - Consola de DevTools sin errores (módulos ES fallidos se ven ahí).
   - Navegador moderno: módulos ES, `import … with { type: "json" }`, `<dialog>`, `IntersectionObserver`, `color-mix()`.
   - Sidebar: scrollspy marca la sección visible; abrir/cerrar deja `inert` solo en el fondo y devuelve el foco al botón que lo abrió.
   - Modal de Configuración: modo claro/oscuro, acento, fondo de página (dirección/velocidad según tema), tamaño de fuente y idioma persisten tras una recarga dura.
   - Idioma ES/EN: la portada y la grilla de juegos se re-renderizan con las cadenas correctas (las cadenas generadas en JS no usan `data-lang`).
   - Tema sin parpadeo: tras recarga dura, el fondo y el acento correctos se pintan antes del primer frame (lo aplica `theme-init.js` / `tema.js`).
   - En `juegos/`: las tarjetas del manifiesto se renderizan, las portadas cargan y los lanzamientos abren pestaña nueva con `rel="noopener noreferrer"`.
   - En `mis-estudios/`: el tema del portafolio se respeta y el buscador filtra y vacía el contador correctamente.
4. **Registros en consola permitidos:** los avisos de `utils/storage.js` y `theme-init.js` cuando `localStorage` está bloqueado (modo privado) son esperables; cualquier otro error sí es un problema.

---

## Estructura del Proyecto

```
├── README.md               # Introducción y ejecución para personas
├── AGENTS.md               # Guía técnica para agentes
├── docs/                   # Documentación organizada
│   ├── README.md           # Índice de la documentación
│   ├── AUDITORIA.md        # Hoja de verificación para auditorías
│   └── prompts/            # Herramientas de desarrollo (leer solo a pedido)
│       ├── crear-videojuegos.md    # Prompt para crear juegos integrados
│       └── portadas-juegos.md      # Guía para generar portadas de la grilla
├── index.html              # Entrada principal
├── mis-estudios/           # Enciclopedia de informática (contenido educativo)
│   └── AGENTS.md           # Reglas locales de la enciclopedia para agentes
├── juegos/                 # Grilla y juegos arcade (guía en juegos/README.md)
│   ├── AGENTS.md           # Reglas locales de la grilla y los juegos para agentes
│   ├── index.html          # Grilla generada desde javascripts/data/juegos.json
│   ├── README.md           # Cómo agregar juegos
│   ├── _template/          # Plantilla base para juegos nuevos
│   └── <slug>/             # Un juego por carpeta (index.html + README-juego.md)
├── javascripts/            # Módulos ES6
│   ├── main.js            # Punto de entrada
│   ├── theme-init.js      # Pre-pintado del tema (script clásico síncrono)
│   ├── controllers/       # Controladores de UI
│   │   ├── home/          # Grillas y modales de contenido (experiencia, estudios, proyectos)
│   │   ├── juegos/        # Grilla de juegos desde el manifiesto
│   │   ├── sidebar/       # Menú lateral: tema, idioma, scrollspy, acentos y fondos
│   │   └── settings/      # Modal de configuración
│   ├── data/              # Manifiestos de contenido (juegos.json)
│   ├── utils/             # Utilidades
│   └── lang/              # Internacionalización
├── stylesheets/           # CSS
│   ├── base.css           # Base compartida: reset, tokens, layout, modal, componentes, navbar y sidebar
│   ├── portada.css        # Estilos específicos de la portada
│   ├── enciclopedia.css   # Estilos específicos de la enciclopedia (mis-estudios/)
│   └── juegos.css         # Estilos específicos de la grilla de juegos
└── assets/                # Imágenes e iconos
```

### Mapa de módulos JavaScript

Inventario archivo → exportaciones → responsabilidad. Si se añade, renombra o cambia
el propósito de un módulo, actualizar esta tabla como parte del cambio.

**Punto de entrada y pre-pintado**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `javascripts/main.js` | — (script principal) | Monta `InitModalDialog`, `SidebarController` (si existe `#HomePage`), `HomeController` (si existe `.main-layout`) y `JuegosController` (si existe `.juegos-grid`) tras `DOMContentLoaded`. |
| `javascripts/theme-init.js` | IIFE clásica (no módulo) | Aplica modo, acento, fondo y escala desde `localStorage` antes del primer pintado (portada y `juegos/`). Duplica las claves de `utils/storage.js` a propósito. |

**Controladores — `controllers/home/`**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `home.controller.js` | `default HomeController()` | Inicializa las grillas de la portada y el scrollspy dependiente. |
| `fnHome.js` | `GridWorkExperience()`, `GridEducation()`, `GridProjects()`, `reloadHomeContent()` | Genera el HTML de cada grilla (cadenas tomadas de `translations.introSection[lang]`) y re-renderiza al cambiar de idioma. |

**Controladores — `controllers/juegos/`**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `juegos.controller.js` | `default JuegosController()` | Carga el manifiesto `data/juegos.json`, lo valida y dispara el render de la grilla. |
| `fnJuegos.js` | `GridGames()`, `reloadGamesContent()` | Genera las tarjetas desde el manifiesto (etiquetas por idioma desde `translations.page[lang]`) y re-renderiza al cambiar de idioma. |

**Controladores — `controllers/sidebar/`**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `sidebar.controller.js` | `default SidebarController()` | Abre/cierra el menú, marca `inert` en el fondo, gestiona el foco de retorno y marcar el enlace activo. |
| `fnSectionNav.js` | `default sectionNav()` | Scrollspy con `IntersectionObserver`: marca `.active` y abre el submenú cuando la sección es hija. |
| `fnChangeLanguage.js` | `sectionLanguage()` (default), `applyTranslations()` | Toggle ES/EN y actualización de `[data-lang]`, `[data-i18n-title]`, `[data-i18n-aria-label]`. |
| `fnThemeMode.js` | `themeMode()` (default), `updateModeText()` | Alterna claro/oscuro y actualiza el texto del botón correspondiente. |
| `fnThemeColor.js` | `default themeColor()` | Aplica el acento activo (`--theme-color`, `--theme-color-soft`) desde `utils/themeColors.js`. |
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
| `dialog.js` | `ModalDialog()`, `InitModalDialog()` | Crea y conecta el `<dialog>` compartido (Configuración y educación). |
| `storage.js` | getters/setters por clave + `STORAGE_KEY_*` | Acceso seguro a `localStorage` con valores por defecto y captura de errores. |
| `themeBackgrounds.js` | `BACKGROUND_THEMES`, `GRADIENT_DIRECTIONS`, `PSYCHEDELIC_SPEEDS`, `FONT_SCALE_OPTIONS` | Catálogos únicos de los temas de fondo, 7 direcciones, 3 velocidades y 3 escalas. |
| `themeColors.js` | `THEME_COLORS`, `getThemeColorDef` | Fuente única de los 6 acentos disponibles. |

**Internacionalización y enciclopedia**

| Archivo | Exporta | Responsabilidad |
| --- | --- | --- |
| `javascripts/lang/translations.config.js` | `currentLanguage`, `setCurrentLanguage()` | Estado global del idioma (`es` \| `en`) leído por todas las grillas. |
| `javascripts/lang/translations.json` | datos JSON | Claves de la UI (`page`, `introSection`, `home`, `header`, …). |
| `mis-estudios/js/tema.js` | IIFE clásica (no módulo) | Pre-pintado del tema en `mis-estudios/`: duplica la lógica de `theme-init.js` con las mismas claves. |
| `mis-estudios/js/buscador.js` | IIFE clásica (no módulo) | Filtra `.estudio-card` del término de búsqueda y gestiona contador y mensaje vacío. |

### Inventario de claves de `localStorage`

Referencia única de preferencias. Recuerda: una clave nueva debe reflejarse aquí,
en `utils/storage.js`, en `theme-init.js` y en `mis-estudios/js/tema.js`.

| Clave | Valores posibles | Escribe | Lee | Por defecto |
| --- | --- | --- | --- | --- |
| `theme-mode` | `dark` \| `light` | `fnThemeMode` (vía `utils/storage.js`) | `theme-init.js`, `mis-estudios/js/tema.js` | `dark` |
| `theme-color` | nombre de acento en `themeColors.js` (`blue`\|`red`\|…) | `fnThemeColor` | `utils/storage.js` (`getThemeColor`) | `blue` |
| `theme-color-value` | color CSS, p. ej. `hsl(210 75% 28%)` | `fnThemeColor` | `theme-init.js`, `mis-estudios/js/tema.js` | `hsl(210 75% 28%)` |
| `theme-background` | `default` \| color \| `multicolor` (`BACKGROUND_THEMES`) | `fnBackgroundTheme` | `theme-init.js`, `mis-estudios/js/tema.js` | `default` |
| `gradient-direction` | una de `GRADIENT_DIRECTIONS` | `fnBackgroundTheme` | `theme-init.js`, `mis-estudios/js/tema.js` | `topToBottom` |
| `psychedelic-speed` | `lento` \| `normal` \| `rapido` | `fnBackgroundTheme` | `theme-init.js`, `mis-estudios/js/tema.js` | `normal` |
| `font-scale` | `0.85` \| `1` \| `1.15` | `fnFontScale` | `theme-init.js`, `mis-estudios/js/tema.js` | `1` |
| `language` | `es` \| `en` | `fnChangeLanguage` | `fnChangeLanguage`, `translations.config.js` | `es` |
| `<slug>_best_v1` | número u objeto JSON (récord del juego; algunos juegos guardan `{record, bestLevel}` o un mapa por canción) | cada juego en `juegos/<slug>/` | el propio juego | — (propio de cada juego) |

Los juegos que antes usaban otra clave migran la clave antigua automáticamente (copian el valor
a la clave `<slug>_best_v1` y borran la antigua la primera vez que se abre el juego). El mapa
completo de claves actuales y antiguas está en `juegos/README.md` (sección "Canon visual
retro-arcade").

---

## Estilo de Código

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
- **Responsive**: Mobile-first con `@media (min-width: 768px)`

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
- **Scripts**: Usar `defer type="module"`, salvo `javascripts/theme-init.js`, que es un script clásico síncrono a propósito para aplicar el tema antes del primer pintado
- **SEO**: Meta tags descripción y keywords incluidos

```html
<!-- Correcto -->
<script src="./javascripts/main.js" defer type="module"></script>
<img src="./assets/image.png" alt="Descripción" loading="lazy" />
```

---

## Arquitectura

### JavaScript

- **Controladores**: Funciones export default que inicializan componentes. Punto de entrada: `javascripts/main.js`.
- **Utils**: Funciones puras exportadas nombradas.
- **DOM**: Verificar existencia antes de manipular (`if (element)`).
- **Eventos**: Usar delegation cuando sea posible.
- **Menú lateral**: `.sidebar` se compone de header, `nav.sidebar-menu` y `footer` con el botón de ajustes. Dentro de `nav.sidebar-menu` hay un `.sidebar-item--group` que contiene dos botones hermanos: la fila "Inicio" (`.sidebar-item` con icono `home` + `data-target="inicio"`) y el botón `.sidebar-expand` (chevron con `aria-expanded`/`aria-controls`) que despliega un `.sidebar-submenu` con 3 elementos (`data-target`: experiencia, estudios, proyectos; en `mis-estudios/` son enlaces `../index.html#seccion` o `../../index.html#seccion` desde `mis-estudios/estudios/*.html`). El scrollspy (`controllers/sidebar/fnSectionNav.js`) marca el item `.active` según la sección visible; si es una hija, abre el submenú y añade `.has-active` al `--group`. Al abrir el menú, `sidebar.controller.js` marca el fondo como `inert` (`.navbar`, `.main-layout`/`.main-content`, `.footer`, `.modal-dialog`) y lleva el foco al botón de cierre; al cerrarlo retira el `inert` y devuelve el foco al botón que lo abrió.
- **Enlaces externos del menú**: debajo de "Inicio" hay `<a class="sidebar-item">` para "Mis estudios" (icono `menu_book`, → `./mis-estudios/index.html`) y "Juegos" (icono `gamepad`, → `./juegos/index.html`; en esas subpáginas lleva `.active` y `aria-current="page"`, y las rutas se ajustan con `../` o `../../`). No llevan `data-target`, por lo que el scrollspy los ignora; `sidebar.controller.js` cierra el menú al pulsarlos.
- **Enciclopedia** (`mis-estudios/`): contenido estático que comparte la preferencia de tema del portafolio. Su `js/tema.js` lee las claves de `localStorage` de `utils/storage.js` y aplica modo, acento, fondo y escala antes de pintar. Sus páginas cargan también la barra, el menú lateral y `javascripts/main.js`, de modo que el modal de Configuración funciona igual que en la portada. Tiene buscador en `mis-estudios/js/buscador.js`.
- **Juegos**: `juegos/index.html` es una subpágina que reutiliza `base.css`, la barra, el sidebar y el modal; usa `.main-content` (compartido con la enciclopedia) y `stylesheets/juegos.css`. La grilla se renderiza desde `javascripts/data/juegos.json` con `controllers/juegos/` y se monta en `main.js` solo si existe `.juegos-grid`. Cada juego vive en `juegos/<slug>/index.html`, es autocontenido y se abre en una pestaña nueva (`target="_blank"` + `rel="noopener noreferrer"`). El manifiesto se valida con un patrón de `slug` y solo publica entradas con `status: "published"`. Las tarjetas muestran la portada del campo `covers` del manifiesto (ver Arquitectura CSS).
- **Rutas de assets**: los iconos que se inyectan desde JS (modal de Configuración y modo) se resuelven con `utils/assets.js` (`import.meta.url` → `assets/icons/`), para que funcionen tanto desde la raíz (`index.html`) como desde subcarpetas (`mis-estudios/` y `juegos/`).
- **Configuración**: el modal (`.modal-dialog`) se rellena desde `controllers/settings/settings.controller.js`; los controles de idioma/modo/color/fondo/dirección/velocidad y tamaño de fuente usan **delegación de eventos sobre `document`**, por lo que siguen funcionando aunque el contenido se genere dinámicamente en cada apertura. Las filas de "Dirección del degradado" y "Velocidad" son condicionales: se muestran/ocultan con `.is-hidden` según el tema de fondo elegido (dirección para temas con degradado; velocidad solo para `multicolor`). La lógica de aplicación vive en `controllers/sidebar/fnBackgroundTheme.js` (fondo, dirección y velocidad) y `fnFontScale.js`; los datos están centralizados en `utils/themeBackgrounds.js`. `applyTranslations()` (en `fnChangeLanguage.js`) actualiza el texto de `[data-lang]` y el `title`/`aria-label` de `[data-i18n-title]`/`[data-i18n-aria-label]`, de modo que los controles dinámicos cambian de idioma sin reabrir el modal.
- **Pre-pintado del tema**: para evitar el parpadeo, el modo, el acento, el fondo y el tamaño de fuente se aplican antes del primer pintado. La portada y `juegos/index.html` usan `javascripts/theme-init.js` (script clásico síncrono en `<head>`); las subpáginas de `mis-estudios/` usan `mis-estudios/js/tema.js`. Ambos leen las mismas claves de `localStorage` que `utils/storage.js` (`theme-mode`, `theme-color-value`, `theme-background`, `gradient-direction`, `psychedelic-speed`, `font-scale`) y deben mantenerse sincronizados.

### CSS

- **Sistema de diseño**: tokens definidos en la sección `:root` de `stylesheets/base.css` — neutros (`--n100…--n900`, `--dn100…--dn900`), superficies (`--color-background`, `--color-surface`, `--color-border`), texto (`--color-text`, `--color-text-secondary`), acentos en trío (`--<color>-claro/-normal/-oscuro`), tipografía (`--text-*`, `--font-*`), radios, sombras (`--shadow-sm…--shadow-xl`) y bordes (`--border-thin/-normal/-thick`).
- **Hojas CSS**: `stylesheets/base.css` contiene todo lo compartido (reset, variables, estilos globales, `.main-content`, modal, componentes, navbar y sidebar); `portada.css`, `enciclopedia.css` y `juegos.css` solo añaden lo específico de cada página. Cada HTML carga siempre `base.css` primero y después la hoja de su página, sin `@import`; un cambio compartido se hace una sola vez en `base.css`.
- **Alias de compatibilidad**: los tokens antiguos (`--color-dark`, `--color-light`, …) están definidos y apuntan al sistema nuevo.
- **Temas de color**: el acento activo se expone como `--theme-color` (variante oscura) y `--theme-color-soft` (variante clara). `controllers/sidebar/fnThemeColor.js` los sobreescribe a partir de `utils/themeColors.js` (fuente única de las 6 opciones).
- **Temas de fondo (degradados)**: el fondo de página se controla con `--page-background`, `--page-gradient`, `--page-scrim`, `--page-background-size`, `--page-background-repeat` y `--page-animation`, consumidos por `.body-container`. `utils/themeBackgrounds.js` define los 10 temas (default + 8 colores, incluido violeta, + multicolor), las 7 direcciones (4 lineales, 2 radiales y color sólido) y las 3 velocidades. El degradado usa los tokens `--<color>-oscuro` y `--neutral-background-soft`, este último redefinido en modo oscuro. El modo `multicolor` usa un arcoíris animado con `@keyframes page-rainbow` (180s lento / 30s normal / 10s rápido) que se anula con `prefers-reduced-motion`. En modo claro, `html.has-page-theme` aplica un velo neutro (`--page-scrim`) y oscurece el texto secundario para mantener el contraste.
- **Tamaño de fuente**: `html` usa `font-size: calc(16px * var(--font-scale, 1))`; el modal fija `--font-scale` en 0.85, 1 o 1.15, por lo que escala toda la tipografía basada en `rem` sin tocar los breakpoints en `px`.
- **Modo oscuro**: clase `.dark` en `body.dark` (portafolio) y `html.dark` (subpáginas como `mis-estudios/`, que la fijan antes de pintar); la sección `:root` de `base.css` admite ambos selectores y `fnThemeMode.js` actualiza los dos nodos. Redefine las variables semánticas (`--color-background`, `--color-surface`, `--color-text`, …), por lo que los componentes se adaptan solos.
- **Enciclopedia**: estilos en `stylesheets/enciclopedia.css`; conserva los nombres de clase originales y usa el acento adaptativo `--enc-accent`.
- **Juegos**: `stylesheets/juegos.css` contiene la página y las tarjetas (`.juego-card*`) con tokens de `base.css`. Cada tarjeta muestra su portada (`.juego-card__portada`) leyendo `covers` del manifiesto: rutas relativas a `juegos/index.html`, como `../assets/images/games/<slug>/cover.jpg`. Con una sola imagen es estática; con 2–3 se activa el carrusel por CSS (`--carousel`, crossfade); sin imágenes, placeholder con degradado. La guía para generar portadas es una herramienta de desarrollo en `docs/prompts/portadas-juegos.md`.
- **Modal**: `.modal-dialog` usa las variables semánticas y se adapta al modo oscuro automáticamente; el botón de cierre usa `.modal-close`; el bloqueo de scroll usa `.modal-open` en `<body>`. El `<dialog>` referencia `aria-labelledby="modal-title"`, por lo que cada contenido dinámico (Configuración y educación) debe generar un elemento con `id="modal-title"` en cada apertura.
- **Salto al contenido**: el estilo del enlace `.saltar` vive en la sección de componentes de `stylesheets/base.css` y lo comparten la portada y la enciclopedia.
- **Transiciones**: variables `--transition-normal`, `--ease-in-out`; se anulan con `prefers-reduced-motion: reduce`.

### Internacionalización

- Idioma principal de la interfaz: Español, con traducciones EN de la interfaz.
- La mayoría de los módulos usan nombres de variables y funciones en inglés. Los scripts de pre-pintado (`theme-init.js`, `mis-estudios/js/tema.js`) y la enciclopedia conservan nombres heredados en español.
- Comentarios y documentación: español.
- Configuración en `javascripts/lang/translations.config.js`; traducciones en `javascripts/lang/translations.json` (secciones: `page`, `introSection`, `home`, `header`, entre otras).

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
- Copiar el correo depende de `navigator.clipboard`; si no está disponible, solo se registra un aviso en consola.

### Preferencias y almacenamiento

- Tema, idioma, fondo, dirección, velocidad y escala se guardan en `localStorage`. Si el navegador lo bloquea, se usan los valores por defecto y no se persiste nada.
- `javascripts/theme-init.js` y `mis-estudios/js/tema.js` duplican la lectura de las claves para evitar el parpadeo. Cualquier clave de tema nueva debe añadirse en ambos y en `javascripts/utils/storage.js`.
- Los juegos usan claves propias con el patrón `<slug>_best_v1`, sin colisionar con las del sitio. Todos comparten el canon visual retro-arcade (paleta neón oscura, modal `<dialog>`, scanlines CRT) documentado en `juegos/README.md`.

### Internacionalización

- La interfaz tiene traducciones ES/EN, pero el contenido de la enciclopedia (`mis-estudios/`) y el de los juegos (`juegos/<slug>/`) está solo en español. Las tarjetas de la grilla de juegos sí se traducen desde el manifiesto.
- `applyTranslations()` busca claves en `page`, `introSection`, `home` y `header`; una clave nueva debe colocarse en una de esas secciones.
- Las cadenas que se renderizan desde JavaScript se traducen al generarse (por ejemplo, `GridProjects()` toma `viewProject` de `translations.introSection[lang]`, y `GridGames()` toma las etiquetas de `translations.page[lang]`), no vía `data-lang`.
- Al cambiar de idioma se re-renderizan la portada y la grilla de juegos (`reloadHomeContent()` de `controllers/home/fnHome.js` y `reloadGamesContent()` de `controllers/juegos/fnJuegos.js`); ambas no hacen nada si su contenedor no existe.
- Cuidar el orden entre `applyTranslations()` y las funciones que regeneran HTML (`GridWorkExperience`, `GridProjects`) al tocar idioma: las cadenas renderizadas en JS deben traducirse al generarse.

### Contenido y assets

- Varias tarjetas de la enciclopedia están marcadas como "Próximamente"; no todo el temario está desarrollado.
- La imagen del proyecto de la portada se sirve desde `assets/images/project-nextjs.jpg` (autohospedada). Las portadas de los juegos viven en `assets/images/games/<slug>/`.
- Los iconos se sirven desde `assets/`; los que se inyectan desde JavaScript usan `utils/assets.js` para funcionar en la raíz y en subcarpetas. El icono `gamepad.svg` identifica el enlace "Juegos" del menú lateral.
- **Juegos**: los juegos son estáticos y autocontenidos en `juegos/<slug>/index.html` dentro de este repositorio; no hay directorio externo de desarrollo. La guía, el canon visual y el manifiesto están en `juegos/README.md` y `javascripts/data/juegos.json`.
- El correo que copia `utils/copyEmail.js` está fijado en el código. Si cambia, hay que actualizarlo ahí y en la información de contacto.

### Deuda técnica

- No existe la clase `.modal-closed`; el bloqueo de scroll del modal se controla con `.modal-open` en `<body>` (añadir la clase invertida facilitaría la interfaz con `<dialog>`).
- Cada juego tiene una sola portada (`cover.jpg`); las portadas 2 y 3 para el carrusel aún no se han generado (la guía y el código ya aceptan hasta 3 mediante `covers`).
- No existe `updatedAt` por juego en el manifiesto y la grilla no tiene filtro por género.
- El contenido de la enciclopedia no tiene traducción al inglés.

### Rendimiento y mantenimiento

- No hay minificación, bundling ni caché personalizada; es intencional para mantener el sitio simple.
- Usar `loading="lazy"` en imágenes y evitar dependencias externas.
- Cualquier cambio en el sistema de temas debe reflejarse en `utils/storage.js`, `utils/themeBackgrounds.js`, `theme-init.js` y `mis-estudios/js/tema.js`.

---

## Reglas de mantenimiento

- **Sin frameworks ni build**: Vanilla JS/CSS únicamente; no introducir bundlers, frameworks ni backend.
- **GitHub Pages**: mantener rutas relativas y compatibilidad con despliegue estático desde `main`.
- **Performance**: usar `loading="lazy"` en imágenes.
- **Documentación**: mantener `README.md`, `AGENTS.md` (raíz y los locales de `juegos/` y `mis-estudios/`), `docs/README.md` y `juegos/README.md` sincronizados con el código. No reintroducir planes de tareas, fases ni informes de estado: la documentación describe el estado real del código.
- **Juegos**: un juego nuevo se integra copiando su carpeta a `juegos/<slug>/` siguiendo el canon visual retro-arcade (`_template/` como base, `snake/` como referencia), añadiendo su entrada a `javascripts/data/juegos.json` (con `status: "published"` solo si está probado) y documentándolo con `README-juego.md`; no se edita el juego para adaptarlo al chrome del portafolio.
- **Información personal**: no modificar los datos personales del desarrollador.
- **Commits**: no crear commits automáticamente ni ejecutar `git commit`; los commits son manuales y los realiza el desarrollador.
