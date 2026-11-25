# HUMANOS.md — Apuntes para desarrolladores humanos

> 📝 **Documento de apoyo** (no es fuente de verdad del proyecto).
> Resumen y enlaces para programadores junior que se incorporen al portafolio pfd1795.
> No se consulta ni se actualiza en planes de agentes ni en tareas automáticas; solo se edita a petición explícita.
> El detalle técnico vive en `AGENTS.md` y en `docs/`.

## 1. Qué es pfd1795

Portafolio web personal estático (HTML/CSS/JS vanilla) desplegado en GitHub Pages. Tres secciones: **Juegos** (arcade), **Mis estudios** (enciclopedia de informática), **Programas** (herramientas). URL: https://pfd1795.github.io/pfd1795/

## 2. Arquitectura

- Módulos ES6 con `import`/`export` (`js/main.js` como punto de entrada).
- Controladores por sección (`js/controllers/juegos/`, `mis-estudios/`, `programas/`).
- Manifiestos JSON: `juegos/data/juegos.json`, `mis-estudios/data/articulos.json`, `programas/data/herramientas.json`.
- Tema e idioma: `js/theme-init.js` (pre-pintado) + `js/lang/translations.json` (ES/EN).
- Buscador compartido: `js/buscador.js` (script clásico).
- Estilos: `stylesheets/base.css` (tokens + compartido) + hoja por sección.
- Detalle: [`AGENTS.md`](../AGENTS.md) § Arquitectura.

## 3. Decisiones no deducibles del código

[`docs/INVARIANTES.md`](INVARIANTES.md) — decisiones técnicas que no deben revertirse (paleta de arcoíris duplicada en `theme-init.js`, excepción `dj.html`, CV PDF sin enlazar, claves de récord `<slug>_best_v1`, canon visual retro-arcade, dimensionado de canvas).

## 4. Limitaciones verificadas

[`docs/LIMITACIONES.md`](LIMITACIONES.md) — limitaciones y deuda técnica con evidencia `archivo:línea`.

## 5. Secciones del portafolio

- **Juegos:** [`juegos/README.md`](../juegos/README.md) — canon visual, integración, dimensionado, checklist de calidad.
- **Enciclopedia:** [`mis-estudios/AGENTS.md`](../mis-estudios/AGENTS.md).
- **Programas:** [`programas/AGENTS.md`](../programas/AGENTS.md).

## 6. Cómo trabajan los agentes

Reglas completas en [`AGENTS.md`](../AGENTS.md). Resumen para el desarrollador:

- Prohibido hacer commits, push o tocar historial de git.
- Documentación técnica en `docs/` para agentes, en español; este archivo es el apunte de apoyo.
- Informes, auditorías y planes de trabajo solo en `docs/informes/`.
- Código sin comentarios (HTML, CSS, JS).
- Rutas relativas (despliegue en subruta de GitHub Pages).
- Servir por HTTP obligatorio (módulos ES y JSON bloqueados por CORS con `file://`).
- Verificación manual con checklist en navegador (sin tests ni linting).

## 7. Índice de documentación

[`docs/README.md`](README.md) — navegación completa de toda la documentación.