# Mejoras del Portafolio

Registro de las mejoras implementadas y planificadas para el portafolio web de Pablo Diaz.

- **Registro de lo realizado** → sección [Mejoras implementadas](#mejoras-implementadas)
- **Pendientes e ideas futuras** → sección [Mejoras pendientes (roadmap)](#mejoras-pendientes-roadmap)
- **Estado y cuidado de la documentación** → sección [Mejoras de la documentación](#mejoras-de-la-documentacion)

> Este documento funciona como **historial de mejoras** y **roadmap**. No es un informe de estado
> activo: el estado real siempre está en el código. Toda mejora que se complete debe moverse de
> "pendientes" a "implementadas" aquí, y a la inversa si se retrocede.

---

## Mejoras implementadas

Todo lo que figura aquí está **ya realizado** en `main`. Cada entrada indica el área y una breve
descripción.

### Portada y enciclopedia

| Área | Mejora |
| --- | --- |
| **Enciclopedia** (`mis-estudios/`) | Nueva sección educativa estática de informática: `index.html` con buscador y 6 temas desarrollados (HTML, CSS, JavaScript, Git, redes y terminal), más tarjetas "Próximamente". |
| **Buscador** | `mis-estudios/js/buscador.js` filtra los temas de la enciclopedia en vivo. |
| **Enlace de navegación** | El menú lateral agrega la fila "Mis estudios" (`menu_book`) que navega a la enciclopedia, con su submenú de secciones. |
| **Imagen del proyecto autohospedada** | La imagen de la portada se sirve desde `assets/images/project-nextjs.jpg` (antes se cargaba desde Unsplash). |
| **Favicon corregido** | `index.html` usa `./favicon.svg` relativo; el `href="/favicon.svg"` absoluto daba 404 en el sitio de proyecto de GitHub Pages. |
| **Metadatos sociales** | Open Graph, Twitter Card y `theme-color` en la portada y en el índice de la enciclopedia. |

### Sistema de temas

| Área | Mejora |
| --- | --- |
| **Paleta de acentos** | 6 colores de acento centralizados en `utils/themeColors.js`, aplicados como `--theme-color` (oscuro) y `--theme-color-soft` (claro) por `fnThemeColor.js`. |
| **Temas de fondo** | `utils/themeBackgrounds.js` define 10 temas (default + 8 colores incluido violeta + `multicolor`), 7 direcciones de degradado (4 lineales, 2 radiales y color sólido) y 3 velocidades para el arcoíris animado. Consumidos por `.body-container` vía `--page-*`. |
| **Tamaño de fuente** | `fnFontScale.js` escala toda la tipografía `rem` con `--font-scale` (0.85 / 1 / 1.15). |
| **Pre-pintado (sin parpadeo)** | `theme-init.js` (portada) y `mis-estudios/js/tema.js` (enciclopedia) aplican modo, acento, fondo y escala antes del primer pintado. |
| **Sincronización entre pestañas** | `fnBackgroundTheme.js` y `fnFontScale.js` escuchan el evento `storage` para mantener selecciones y `aria-pressed` sincronizados sin reescribir `localStorage`. |
| **Accesibilidad de movimiento** | El arcoíris `multicolor` se anula con `prefers-reduced-motion: reduce`. |
| **Contraste en fondos saturados** | En modo claro, `html.has-page-theme` aplica el velo `--page-scrim` y oscurece el texto secundario. |

### Internacionalización

| Área | Mejora |
| --- | --- |
| **Idioma ES/EN** | Modal de configuración con interruptor de idioma; traducciones en `translations.json`. |
| **Refresco sin reabrir** | `applyTranslations()` actualiza `[data-lang]` y los `title`/`aria-label` de `[data-i18n-title]`/`[data-i18n-aria-label]`, por lo que los controles dinámicos cambian de idioma en vivo. |
| **"Ver Proyecto" traducido** | `GridProjects()` renderiza el botón desde `translations.introSection[lang].viewProject`, sin depender del orden entre `applyTranslations()` y `reloadHomeContent()`. |
| **Aviso "¡Correo copiado!" traducido** | El elemento lleva `data-lang="copyNotification"` (la clave ya existía en `translations.json`). |
| **Textos del chrome traducibles** | Los `title`/`aria-label` hardcodeados en español (menú, secciones, configuración, cierre del modal, logo, copiar correo y salto al contenido) usan claves del sistema de traducciones en los 8 HTML. |

### Menú lateral y configuración

| Área | Mejora |
| --- | --- |
| **Submenú y scrollspy** | `.sidebar-item--group` con submenú desplegable (`aria-expanded`/`aria-controls`); `fnSectionNav.js` marca el item activo y abre el submenú en las secciones hijas (`has-active`). |
| **Modal de Configuración** | `settings.controller.js` genera dinámicamente los controles de idioma, modo, color, fondo, dirección, velocidad y tamaño de fuente, con delegación de eventos sobre `document`. Filas condicionales de dirección y velocidad según el tema de fondo. |
| **Rutas de assets** | `utils/assets.js` resuelve los iconos inyectados desde JS tanto desde la raíz como desde subcarpetas (enciclopedia). |

### Diseño y componentes

| Área | Mejora |
| --- | --- |
| **Sistema de diseño** | `root.css` define tokens semánticos (neutros, superficies, texto, acentos en trío, tipografía, radios, sombras y bordes), con alias para los tokens antiguos. |
| **Modo oscuro** | Clase `.dark` soportada en `body.dark` (portafolio) y `html.dark` (enciclopedia); `fnThemeMode.js` sincroniza ambos nodos. |
| **Enciclopedia adaptada** | `enciclopedia.css` integra `mis-estudios/` al sistema del portafolio conservando sus clases y usando el acento adaptativo `--enc-accent`. |
| **Modal** | `.modal-dialog` usa las variables semánticas y se adapta al modo oscuro automáticamente; control del scroll vía `.modal-open`. |

### Accesibilidad

| Área | Mejora |
| --- | --- |
| **Tarjetas de estudios accesibles** | Las tarjetas de "Estudios \| Cursos" son `<button>` con `aria-haspopup="dialog"` (antes `<article>` solo clicables con ratón). |
| **Botón de copiar correo** | El icono de correo es un `<button>` con `aria-label`; el aviso usa `role="status"`/`aria-live="polite"`. |
| **Salto al contenido** | Enlace `.saltar` en los 8 HTML; el estilo vive en `components/index.css` (antes solo en `enciclopedia.css`). |
| **Iconos sociales nombrados** | Los enlaces de LinkedIn/GitHub llevan `aria-label` y sus SVG `aria-hidden="true"`. |
| **Foco del menú lateral** | Al abrir el drawer, el fondo queda `inert` y el foco entra en el menú; al cerrar, vuelve al botón que lo abrió. |
| **Etiqueta de los modales de educación** | El contenido genera `id="modal-title"`, que es lo que referencia el `aria-labelledby` del `<dialog>`. |
| **Enlaces externos seguros** | Todos los `target="_blank"` llevan `rel="noopener noreferrer"`. |

---

## Mejoras pendientes (roadmap)

Pendientes conocidos, sin orden de prioridad salvo indicación contraria. Marcar `[x]` al completarse y
mover la entrada a la sección correspondiente de [Mejoras implementadas](#mejoras-implementadas).

### Internacionalización

- [ ] **Traducir la enciclopedia.** El contenido de `mis-estudios/` está solo en español.

### Deuda técnica y accesibilidad

- [ ] **Refactor del bloqueo de scroll del modal.** No existe la clase `.modal-closed`; hoy se controla con
      `.modal-open` en `<body>`. Añadir la clase invertida facilitaría la interfaz con `<dialog>`.

### Contenido

- [ ] **Completar el temario de la enciclopedia.** Varias tarjetas están marcadas como "Próximamente".

### Ideas de mejora futura (no priorizadas)

- [ ] Minimización/bundling opcional para producción (hoy es intencional que no lo haya).
- [ ] Tests automatizados básicos y linting.
- [ ] Cambiar el correo de la información de contacto sin duplicarlo: `utils/copyEmail.js` lo tiene
      fijado en el código y hay que actualizarlo a la vez en la información de contacto.

---

## Mejoras de la documentación

Trabajo realizado y por hacer sobre la propia documentación del repositorio.

- [x] **Consolidar la documentación.** Se unificó el contenido de `TASKS.md` (eliminado) en `README.md` y
      `AGENTS.md`, evitando planes de tareas obsoletos.
- [x] **Agents.** `AGENTS.md` documenta arquitectura, convenciones de código, patrones de diseño,
      internacionalización, limitaciones conocidas y reglas de mantenimiento.
- [x] **Personas.** `README.md` cubre características, ejecución local, estructura, despliegue, limitaciones
      y contacto.
- [ ] **Mantener `MEJORAS.md` sincronizado.** Como cualquier otro doc del repo: una mejora que se complete
      se mueve de "pendientes" a "implementadas" en el mismo cambio de código; nunca dejarla estancada.
- [x] **Revisar idioma del `title`/`aria-label` hardcodeados.** Conectados al sistema de traducciones
      en los 8 HTML.

---

*Última actualización de la sección de implementadas: octubre 2026.*
