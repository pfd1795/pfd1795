/* ==========================================================================
   assets.js — Rutas absolutas a los assets del proyecto.

   Resuelve la carpeta de iconos a partir de la ubicación de este módulo
   (import.meta.url), de modo que las URLs funcionan igual desde la raíz
   del portafolio (index.html) que desde sus subcarpetas (mis-estudios/),
   en local (file://) y en GitHub Pages.
   ========================================================================== */

export const ICONS_URL = new URL('../../assets/icons/', import.meta.url).href;
