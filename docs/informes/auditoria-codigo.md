# Auditoría del código del proyecto

Alcance: HTML, CSS, JavaScript y manifiestos JSON del portafolio, incluidas las páginas de juego y
las herramientas de `programas/`. Método: lectura directa y `grep -n` antes de cada afirmación,
servido HTTP en `http://127.0.0.1:8129` y carga de las 101 páginas con Chrome headless por CDP para
revisar consola, red, búsqueda, filtros, idioma y preferencias. No se han aplicado correcciones.

## Resultado global

- Las 101 páginas cargan sin errores de consola ni respuestas HTTP con estado 4xx/5xx.
- Los 29 archivos JavaScript pasan `node --check`; los JSON son válidos; no hay variables CSS usadas
  sin definir; no hay rutas absolutas ni `target="_blank"` sin `rel="noopener noreferrer"`; las 101
  páginas tienen un único `<h1>` y no se detectan `id=""` en las páginas inspeccionadas.
- Conteos verificados contra los manifiestos: 20 juegos `published`, 36 artículos `published`,
  11 herramientas `published` y 5 `wip`. Las entradas `published` tienen archivo y portada
  existentes; el precache del Service Worker cubre las 75 URLs HTML listadas.
- Las claves i18n están completas en ES y EN (104 por idioma). Las 7 traducciones de artículos
  pendientes coinciden con las del tracker y no hay versiones EN huérfanas.
- Verificación funcional por CDP: búsqueda por título, descripción, tecnología y género en juegos;
  filtros por género y categoría; re-render ES/EN de portada, juegos y programas; apertura del modal
  de Configuración; persistencia del modo; y pre-pintado del tema en artículo y herramienta.

## Hallazgo

### El idioma no se reaplica cuando otra pestaña vacía `localStorage`

- **Ubicación:** `js/controllers/sidebar/fnChangeLanguage.js:125-130`.
- **Evidencia:** el listener de `storage` descarta cualquier evento cuyo `event.key` no sea
  `language`. `localStorage.clear()` emite un evento con `key === null` y `newValue === null`, por lo
  que la rama retorna sin llamar a `changeLanguage()`. Con `language = "en"` activo, al vaciar
  `localStorage` y despachar ese evento, `document.documentElement.lang` sigue siendo `en` y el
  segmento EN permanece activo mientras `localStorage.getItem("language")` devuelve `null`.
  `fnThemeMode.js:64`, `fnFontScale.js:40`, `fnBackgroundTheme.js:117,126,135` y
  `fnThemeColor.js:71-73` sí aceptan `null` y leen el valor con el getter correspondiente. Además,
  `changeLanguage()` llama siempre a `setLanguage()` (`fnChangeLanguage.js:90`), de modo que
  reaplicar desde `storage` reescribiría la clave que acaba de cambiar otra pestaña, en contra de la
  convención documentada en `AGENTS.md:328`.
- **Impacto:** tras un borrado de `localStorage` en otra pestaña, el idioma de la interfaz queda
  desincronizado del valor por defecto (`es`), y el resto de preferencias sí vuelven a su valor por
  defecto. La convención de `AGENTS.md:328` no se cumple para este controlador.
- **Corrección sugerida:** aceptar `event.key === STORAGE_KEY_LANGUAGE || event.key === null`,
  obtener el idioma con `getLanguage()` en lugar de `event.newValue`, y hacer que `changeLanguage()`
  reciba una opción para no persistir (equivalente a `{ persist: false }` de `fnThemeMode.js:70`)
  cuando la reaplicación provenga de `storage`. Actualizar el segmento activo con el idioma resuelto.

## Observaciones no accionables

- Las referencias locales ausentes detectadas en
  `programas/herramientas/generador-favicons.html:451,511-512` están dentro de ejemplos de código
  generados por la herramienta; no son recursos cargados por la página.
- Los comentarios heredados en JS/CSS y las escalas de tokens CSS sin consumo directo son estado
  tolerado por `AGENTS.md`; no se proponen cambios.
- `ajedrez`, `damas`, `match-3` y `arkanoid` no usan `renderScale` ni `--game-max`; la convención de
  dimensionado de `AGENTS.md` se aplica solo a los juegos listados, todos conformes.
- El contenido de `mis-estudios/data/articulos.json` es solo en español por diseño de la sección; la
  ausencia del campo `en` en título y descripción no es un hallazgo.
- Las firmas de modelos de `index.html` están todas en la sección "Agentes de IA" del footer de la
  portada, el único lugar permitido.

## Cierre

El informe entrega hallazgos y correcciones propuestas. El único ítem accionable se registra por
separado en `docs/informes/trabajo-pendiente.md`; no se han modificado archivos de código ni creado
commits.
