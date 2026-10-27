# AGENTS.md - Guía para Agentes de Código

## Descripción del Proyecto

Portafolio web personal desarrollado con HTML, CSS y JavaScript vanilla. Sitio estático desplegado en GitHub Pages.

**URL de producción:** https://pfd1795.github.io/pfd1795/

**Documentación vigente:** `README.md` (introducción y ejecución para personas), `AGENTS.md` (arquitectura, convenciones y limitaciones para agentes) y `MEJORAS.md` (historial de mejoras implementadas y roadmap de pendientes). No hay fases, auditorías ni informes activos; el "roadmap" de `MEJORAS.md` recoge solo pendientes conocidos y debe mantenerse sincronizado con el código.

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

---

## Estructura del Proyecto

```
├── README.md               # Introducción y ejecución para personas
├── AGENTS.md               # Guía técnica para agentes
├── index.html              # Entrada principal
├── mis-estudios/           # Enciclopedia de informática (contenido educativo)
├── javascripts/            # Módulos ES6
│   ├── main.js            # Punto de entrada
│   ├── controllers/       # Controladores de UI
│   │   ├── home/          # Grillas y modales de contenido (experiencia, estudios, proyectos)
│   │   ├── sidebar/       # Menú lateral: tema, idioma, scrollspy
│   │   └── settings/      # Modal de configuración
│   ├── utils/             # Utilidades
│   └── lang/              # Internacionalización
├── stylesheets/           # CSS
│   ├── style.css          # Estilos globales
│   ├── root.css           # Variables CSS
│   ├── reset.css          # Reset de estilos
│   ├── enciclopedia.css   # Estilos de la enciclopedia (mis-estudios/)
│   ├── components/        # Componentes
│   ├── pages/             # Estilos por página
│   └── ui/                # Componentes UI
└── assets/                # Imágenes e iconos
```

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
- **Variables**: Usar sistema de diseño en `root.css`
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

## Patrones de Diseño

### JavaScript

- **Controladores**: Funciones export default que inicializan componentes
- **Utils**: Funciones puras exportadas nombradas
- **DOM**: Verificar existencia antes de manipular (`if (element)`)
- **Eventos**: Usar delegation cuando sea posible
- **Menú lateral**: `.sidebar` se compone de header, `nav.sidebar-menu` y `footer` con el botón de ajustes. Dentro de `nav.sidebar-menu` hay un `.sidebar-item--group` que contiene dos botones hermanos: la fila "Inicio" (`.sidebar-item` con icono `home` + `data-target="inicio"`, que navega) y el botón `.sidebar-expand` (chevron con `aria-expanded`/`aria-controls`, fondo y borde neutros) que despliega un `.sidebar-submenu` con 3 elementos (`.sidebar-subitem` con icono; `data-target` en la portada: experiencia, estudios, proyectos). En la portada esos elementos son `<button data-target>` y hacen scroll suave antes de cerrar el menú; en `mis-estudios/` son enlaces que navegan a la sección equivalente del portafolio. El scrollspy (`controllers/sidebar/fnSectionNav.js`) marca el item `.active` según la sección visible; si es una hija, abre el submenú y añade `.has-active` al `--group` (indicador tenue en la fila padre). Al abrir el menú, `sidebar.controller.js` marca el fondo como `inert` (`.navbar`, `.main-layout`/`.main-content`, `.footer` y `.modal-dialog`) y lleva el foco al botón de cierre; al cerrarlo retira el `inert` y devuelve el foco al botón de abrir si estaba dentro del menú.
- **"Mis estudios" (enlace externo)**: debajo de la fila "Inicio" y fuera del `--group` hay un `<a class="sidebar-item" href="./mis-estudios/index.html">` (icono `menu_book`) que navega a la enciclopedia. No lleva chevron ni `data-target`, por lo que el scrollspy lo ignora; `sidebar.controller.js` cierra el menú al pulsarlo. La enciclopedia (`mis-estudios/`) es contenido estático que **comparte la preferencia de tema** del portafolio: su `js/tema.js` lee las claves `theme-mode`, `theme-color-value`, `theme-background`, `gradient-direction`, `psychedelic-speed` y `font-scale` de `localStorage` (las mismas de `utils/storage.js`) y aplica `.dark` en `<html>`, el acento derivado, el fondo/degradado y la escala tipográfica antes de pintar. Sus páginas cargan también la barra y el menú laterales del portafolio junto con `javascripts/main.js`, de modo que el modal de Configuración (idioma, modo, color, tema de fondo, dirección, velocidad y tamaño de fuente) funciona igual que en la portada; en la enciclopedia los items del menú son enlaces en lugar de botones `data-target`: `../index.html#seccion` desde `mis-estudios/index.html` y `../../index.html#seccion` desde `mis-estudios/estudios/*.html`.
- **Rutas de assets**: los iconos que se inyectan desde JS (modal de Configuración y modo) se resuelven con `utils/assets.js` (`import.meta.url` → `assets/icons/`), para que funcionen tanto desde la raíz (`index.html`) como desde subcarpetas (`mis-estudios/`).
- **Configuración**: el modal (`.modal-dialog`) se rellena desde `controllers/settings/settings.controller.js`; los controles de idioma/modo/color/fondo/dirección/velocidad y tamaño de fuente usan **delegación de eventos sobre `document`**, por lo que siguen funcionando aunque el contenido se genere dinámicamente en cada apertura. Las filas de "Dirección del degradado" y "Velocidad" son condicionales: se muestran/ocultan con `.is-hidden` según el tema de fondo elegido (dirección para temas con degradado; velocidad solo para `multicolor`). La lógica de aplicación vive en `controllers/sidebar/fnBackgroundTheme.js` (fondo, dirección y velocidad) y `fnFontScale.js`; los datos de temas/direcciones/velocidades/escalas están centralizados en `utils/themeBackgrounds.js`. `applyTranslations()` actualiza el texto de `[data-lang]` y también el `title`/`aria-label` de `[data-i18n-title]`/`[data-i18n-aria-label]`, de modo que los controles generados dinámicamente cambian de idioma sin reabrir el modal.
- **Pre-pintado del tema**: para evitar el parpadeo, el modo, el acento, el fondo y el tamaño de fuente se aplican antes del primer pintado. La portada usa `javascripts/theme-init.js` (script clásico síncrono en `<head>`); las subpáginas de `mis-estudios/` usan `mis-estudios/js/tema.js`. Ambos leen las mismas claves de `localStorage` que `utils/storage.js` y deben mantenerse sincronizados. El modal guarda además `theme-background`, `gradient-direction`, `psychedelic-speed` y `font-scale`.

### CSS

- **Sistema de diseño**: tokens en `stylesheets/root.css` — neutros (`--n100…--n900`, `--dn100…--dn900`), superficies (`--color-background`, `--color-surface`, `--color-border`), texto (`--color-text`, `--color-text-secondary`), acentos en trío (`--<color>-claro/-normal/-oscuro`), tipografía (`--text-*`, `--font-*`), radios, sombras (`--shadow-sm…--shadow-xl`) y bordes (`--border-thin/-normal/-thick`).
- **Alias de compatibilidad**: los tokens antiguos (`--color-dark`, `--color-light`, …) siguen definidos y apuntan al sistema nuevo.
- **Temas**: el acento activo se expone como `--theme-color` (variante oscura) y `--theme-color-soft` (variante clara). `controllers/sidebar/fnThemeColor.js` los sobreescribe a partir de `utils/themeColors.js` (fuente única de las 6 opciones).
- **Temas de fondo (degradados)**: el fondo de página se controla con `--page-background`, `--page-gradient`, `--page-scrim`, `--page-background-size`, `--page-background-repeat` y `--page-animation`, consumidos por `.body-container`. `utils/themeBackgrounds.js` define los 10 temas (default + 8 colores, incluido violeta, + multicolor), las 7 direcciones (4 lineales, 2 radiales y color sólido) y las 3 velocidades. El degradado usa los tokens `--<color>-oscuro` y `--neutral-background-soft`, este último redefinido en modo oscuro para que el fondo se adapte solo. El modo `multicolor` usa un arcoíris animado con `@keyframes page-rainbow`; las duraciones son 180s (lento), 30s (normal) y 10s (rápido), y se anula con `prefers-reduced-motion`. En modo claro, `html.has-page-theme` aplica un velo neutro (`--page-scrim`) y oscurece el texto secundario para mantener el contraste sobre fondos saturados. Los controladores `fnBackgroundTheme.js` y `fnFontScale.js` escuchan el evento `storage` para mantener los anillos de selección y `aria-pressed` sincronizados entre pestañas, sin reescribir `localStorage`.
- **Tamaño de fuente**: `html` usa `font-size: calc(16px * var(--font-scale, 1))`; el modal fija `--font-scale` en 0.85, 1 o 1.15, por lo que escala toda la tipografía basada en `rem` sin tocar los breakpoints en `px`.
- **Modo oscuro**: clase `.dark` en `body.dark` (portafolio) y también en `html.dark` (subpáginas como `mis-estudios/`, que la fijan antes de pintar); `root.css` admite ambos selectores y `fnThemeMode.js` actualiza los dos nodos para que el tema quede sincronizado. Redefine las variables semánticas (`--color-background`, `--color-surface`, `--color-text`, …), por lo que los componentes se adaptan solos.
- **Enciclopedia**: `stylesheets/enciclopedia.css` adapta `mis-estudios/` al sistema del portafolio (se carga junto a `style.css`, `ui/navbar.css`, `ui/sidebar.css` y `components/index.css`). Conserva los nombres de clase originales de la enciclopedia y usa un acento adaptativo `--enc-accent` (variante oscura en modo claro y clara en modo oscuro).
- **Modal**: `.modal-dialog` usa las variables semánticas y se adapta al modo oscuro automáticamente; el botón de cierre usa `.modal-close`. El dialog referencia `aria-labelledby="modal-title"`, por lo que cada contenido dinámico (Configuración y educación) debe generar un elemento con `id="modal-title"` en cada apertura.
- **Salto al contenido**: el estilo del enlace `.saltar` vive en `components/index.css` y lo comparten la portada y la enciclopedia.
- **Transiciones**: variables `--transition-normal`, `--ease-in-out`; se anulan con `prefers-reduced-motion: reduce`.

---

## Internacionalización

- Idioma principal de la interfaz: Español.
- La mayoría de los módulos usan nombres de variables y funciones en inglés. Los scripts de pre-pintado (`theme-init.js`, `mis-estudios/js/tema.js`) y la enciclopedia conservan nombres heredados en español.
- Comentarios y documentación: español. Contenido principal: español, con traducciones EN de la interfaz.
- Configuración en `javascripts/lang/translations.config.js`.
- Traducciones en `javascripts/lang/translations.json`.

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

### Internacionalización

- La interfaz tiene traducciones ES/EN, pero el contenido de la enciclopedia (`mis-estudios/`) está solo en español.
- `applyTranslations()` busca claves en `page`, `introSection`, `home` y `header`; una clave nueva debe colocarse en una de esas secciones.
- Las cadenas que se renderizan desde JavaScript se traducen al generarse (por ejemplo, `GridProjects()` toma `viewProject` de `translations.introSection[lang]`), no vía `data-lang`.

### Contenido y assets

- Varias tarjetas de la enciclopedia están marcadas como "Próximamente"; no todo el temario está desarrollado.
- La imagen del proyecto de la portada se sirve desde `assets/images/project-nextjs.jpg` (autohospedada).
- Los iconos se sirven desde `assets/`; los que se inyectan desde JavaScript usan `utils/assets.js` para funcionar en la raíz y en subcarpetas.
- El correo que copia `utils/copyEmail.js` está fijado en el código. Si cambia, hay que actualizarlo ahí y en la información de contacto.

### Deuda técnica y accesibilidad

- No existe la clase `.modal-closed`; el bloqueo de scroll del modal se controla con `.modal-open` en `<body>`.
- Cuidar el orden entre `applyTranslations()` y las funciones que regeneran HTML (`GridWorkExperience`, `GridProjects`) al tocar idioma: las cadenas renderizadas en JS deben traducirse al generarse.

### Rendimiento y mantenimiento

- No hay minificación, bundling ni caché personalizada; es intencional para mantener el sitio simple.
- Usar `loading="lazy"` en imágenes y evitar dependencias externas.
- Cualquier cambio en el sistema de temas debe reflejarse en `utils/storage.js`, `utils/themeBackgrounds.js`, `theme-init.js` y `mis-estudios/js/tema.js`.

---

## Reglas de mantenimiento

- **Sin frameworks ni build**: Vanilla JS/CSS únicamente; no introducir bundlers, frameworks ni backend.
- **GitHub Pages**: mantener rutas relativas y compatibilidad con despliegue estático desde `main`.
- **Performance**: usar `loading="lazy"` en imágenes.
- **Documentación**: mantener `README.md`, `AGENTS.md` y `MEJORAS.md` sincronizados con el código; no reintroducir planes de tareas o fases obsoletas. Una mejora que se completa debe pasarse de "pendientes" a "implementadas" en `MEJORAS.md` en el mismo cambio.
- **Información personal**: no modificar los datos personales del desarrollador.
