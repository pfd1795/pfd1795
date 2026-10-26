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

---

## Mejoras pendientes (roadmap)

Pendientes conocidos, sin orden de prioridad salvo indicación contraria. Marcar `[x]` al completarse y
mover la entrada a la sección correspondiente de [Mejoras implementadas](#mejoras-implementadas).

### Internacionalización

- [ ] **Botón "Ver Proyecto" en español al cambiar a inglés.** En `fnChangeLanguage.js`, `applyTranslations()`
      se ejecuta antes de `reloadHomeContent()` y las tarjetas se regeneran después, perdiendo la traducción.
- [ ] **Aviso "¡Correo copiado!" no traducido.** La clave `copyNotification` existe en `translations.json`,
      pero el elemento de `index.html` no lleva `data-lang`.
- [ ] **Traducir la enciclopedia.** El contenido de `mis-estudios/` está solo en español.
- [ ] **Conectar textos hardcodeados** al sistema de traducciones: el `title` "Copiar correo"
      (`.email-link` en `index.html`), el `aria-label`/`title` "Cerrar ventana (Esc)" y el `title`
      "Cerrar ventana" del botón de cierre del modal.

### Arquitectura y ejecución

- [ ] **Favicon roto en GitHub Pages.** `index.html` usa `href="/favicon.svg"`, que en el sitio de proyecto
      apunta a `https://pfd1795.github.io/favicon.svg` (404) en lugar de `./favicon.svg`.

### Deuda técnica y accesibilidad

- [ ] **Etiqueta accesible de los modales de educación.** Usan `aria-labelledby="modal-title"`, pero ese `id`
      solo lo genera el modal de Configuración; los modales de educación quedan sin etiqueta.
- [ ] **Refactor del bloqueo de scroll del modal.** No existe la clase `.modal-closed`; hoy se controla con
      `.modal-open` en `<body>`. Añadir la clase invertida facilitaría la interfaz con `<dialog>`.
- [ ] **Quitar el media query vacío**. `.main-layout` en `stylesheets/style.css` tiene
      `@media (min-width: 768px) {}` vacío.

### Contenido

- [ ] **Completar el temario de la enciclopedia.** Varias tarjetas están marcadas como "Próximamente".
- [ ] **Imagen del proyecto autohospedada.** La de la portada se carga desde Unsplash; sin conexión no se muestra.

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
- [ ] **Revisar idioma del `title`/`aria-label` hardcodeados** (se trabajan junto con los de
      internacionalización anteriores).

---

*Última actualización de la sección de implementadas: octubre 2026.*
