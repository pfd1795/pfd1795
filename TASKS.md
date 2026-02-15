# Plan de Mejoras - Portafolio Web

**Fecha:** 2026-02-14  
**Objetivo:** Corregir errores y mejorar calidad del código vanilla existente sin agregar nuevas funcionalidades

---

## Fase 1: Corrección de Bugs Críticos (JavaScript)

### T1: Mover queries dentro de funciones en fnThemeMode.js
**Prioridad:** Alta  
**Archivo:** `javascripts/controllers/sidebar/fnThemeMode.js`  
**Problema:** Los queries ejecutan fuera de la función, causando errores si el DOM no está listo

**Acciones:**
- [ ] Mover `modeToggle`, `modeText`, `modeIcon` dentro de la función `themeMode()`
- [ ] Inicializar variables dentro del scope de la función, no a nivel de módulo
- [ ] Verificar que no se rompa la funcionalidad del toggle de modo oscuro

---

### T2: Mover queries dentro de funciones en fnThemeColor.js
**Prioridad:** Alta  
**Archivo:** `javascripts/controllers/sidebar/fnThemeColor.js`  
**Problema:** `colorOptions` se ejecuta al importar el módulo

**Acciones:**
- [ ] Mover `colorOptions` dentro de `themeColor()`
- [ ] Inicializar `savedColor` y `savedColorValue` dentro de la función
- [ ] Mantener la funcionalidad de persistencia de color

---

### T3: Mover queries dentro de funciones en sidebar.controller.js
**Prioridad:** Alta  
**Archivo:** `javascripts/controllers/sidebar/sidebar.controller.js`  
**Problema:** `overlay` y `sidebar` se ejecutan fuera del controlador

**Acciones:**
- [ ] Mover queries de `overlay` y `sidebar` dentro de `SidebarController()`
- [ ] Pasar elementos como parámetros a `openMenu()` y `closeMenu()` o usar closure
- [ ] Verificar que el sidebar funcione correctamente

---

### T4: Refactorizar dialog.js
**Prioridad:** Alta  
**Archivo:** `javascripts/utils/dialog.js`  
**Problemas:**
- Side effect en línea 49: `document.addEventListener('DOMContentLoaded', InitModalDialog)`
- Uso de `document.body.style` directo en lugar de clases CSS
- Doble manejo de tecla Escape (línea 46 y en sidebar.controller.js)

**Acciones:**
- [ ] Eliminar el `DOMContentLoaded` - dejar que el caller maneje la inicialización
- [ ] Crear clases CSS `.modal-open` y `.modal-closed` para controlar `overflow`
- [ ] Refactorizar `CloseModalDialog()` para usar clases en lugar de inline styles
- [ ] Consolidar el manejo de tecla Escape

---

## Fase 2: Mejora de Arquitectura

### T5: Eliminar código muerto
**Prioridad:** Media  
**Archivo:** `javascripts/controllers/sidebar/fnChangeLanguage.js`  
**Problema:** Archivo completamente comentado pero presente en el proyecto

**Acciones:**
- [ ] Eliminar el archivo `fnChangeLanguage.js`
- [ ] Actualizar import comentado en `sidebar.controller.js` (línea 2)
- [ ] Limpiar código comentado en `sidebar.controller.js` (línea 38)

---

### T6: Crear constantes centralizadas para localStorage keys
**Prioridad:** Media  
**Archivo:** Nuevo `javascripts/utils/storage.js`  
**Problema:** Keys de localStorage dispersas y hardcoded en múltiples archivos

**Acciones:**
- [ ] Crear archivo `storage.js` con constantes:
  - `STORAGE_KEY_THEME_MODE = 'theme-mode'`
  - `STORAGE_KEY_THEME_COLOR = 'theme-color'`
  - `STORAGE_KEY_THEME_COLOR_VALUE = 'theme-color-value'`
- [ ] Crear funciones helper: `getStorageItem()`, `setStorageItem()`
- [ ] Actualizar `fnThemeMode.js` para usar las constantes
- [ ] Actualizar `fnThemeColor.js` para usar las constantes

---

### T7: Extraer strings hardcoded a translations.json
**Prioridad:** Media  
**Archivo:** `javascripts/controllers/home/fnHome.js`  
**Problema:** Texto en español embebido (líneas 12-15, 113-121)

**Acciones:**
- [ ] Identificar todos los strings hardcoded:
  - "Mi Trayectoria en el Mundo de la Tecnología"
  - "Selecciona una experiencia laboral..."
  - "Descripción:"
  - "Duración:"
  - "Modalidad:"
  - "Tecnologías Utilizadas:"
  - "Descripción:" (en ModalEducation)
  - "Habilidades Adquiridas:"
- [ ] Agregar keys a `translations.json` bajo sección `home`
- [ ] Actualizar `fnHome.js` para usar `currentLanguage` y `translations`

---

### T8: Implementar validación consistente de elementos DOM
**Prioridad:** Media  
**Archivos:** Todos los controladores  
**Problema:** Validación inconsistente (algunos usan `?.`, otros no validan)

**Acciones:**
- [ ] Revisar todos los archivos JavaScript
- [ ] Agregar validación consistente: `if (!element) return;` o optional chaining
- [ ] Priorizar elementos críticos que pueden no existir en el DOM

---

## Fase 3: Mejoras CSS/HTML

### T9: Eliminar media query vacío
**Prioridad:** Baja  
**Archivo:** `stylesheets/pages/home/zone-studies-courses.css`  
**Problema:** Líneas 46-48 tienen media query sin contenido

**Acciones:**
- [ ] Eliminar bloque vacío:
  ```css
  @media (min-width: 768px) {
    
  }
  ```

---

### T10: Reemplazar float por flexbox
**Prioridad:** Baja  
**Archivo:** `stylesheets/pages/home/zone-presentation.css`  
**Problema:** Uso de `float: right` (línea 55) es antipattern moderno

**Acciones:**
- [ ] Reemplazar `float: right` por `display: flex` en el contenedor padre
- [ ] Ajustar layout de `.intro-content` para usar flexbox
- [ ] Mantener el orden visual (imagen a la derecha en mobile, izquierda en desktop)

---

### T11: Agregar atributos ARIA faltantes
**Prioridad:** Media  
**Archivos:** `index.html`, `stylesheets/ui/sidebar.css`  
**Problema:** Faltan atributos de accesibilidad

**Acciones:**
- [ ] Agregar `role="switch"` y `aria-checked` al toggle de modo oscuro
- [ ] Agregar `aria-label` a botones de selección de color
- [ ] Agregar `aria-expanded` al botón de menú
- [ ] Verificar que el modal tenga `aria-modal="true"`

---

### T12: Corregir inconsistencias de unidades CSS
**Prioridad:** Baja  
**Archivos:** Varios archivos CSS  
**Problema:** Mezcla de `px`, `rem`, `em` sin convención clara

**Acciones:**
- [ ] Revisar `zone-presentation.css` - usa valores fijos (2.5rem, 1.5rem, etc.)
- [ ] Reemplazar valores fijos por variables del sistema (`var(--text-*)`)
- [ ] Estándar: usar `rem` para texto, `em` para componentes, `px` para breakpoints

---

## Fase 4: Optimización y Limpieza

### T13: Consolidar lógica de localStorage
**Prioridad:** Baja  
**Archivo:** `javascripts/utils/storage.js` (creado en T6)  
**Problema:** Acceso a localStorage disperso

**Acciones:**
- [ ] Crear funciones helper en `storage.js`:
  - `getThemeMode()`, `setThemeMode(mode)`
  - `getThemeColor()`, `setThemeColor(color, value)`
- [ ] Refactorizar `fnThemeMode.js` para usar helpers
- [ ] Refactorizar `fnThemeColor.js` para usar helpers

---

### T14: Agregar manejo de errores para elementos faltantes
**Prioridad:** Media  
**Archivos:** Todos los controladores  
**Problema:** Si un elemento no existe, el código falla silenciosamente o lanza error

**Acciones:**
- [ ] Agregar `try-catch` en funciones críticas
- [ ] Agregar mensajes de error informativos en consola (solo en desarrollo)
- [ ] Implementar graceful degradation

---

### T15: Revisar y estandarizar nombres de variables
**Prioridad:** Baja  
**Archivos:** Todos los JavaScript  
**Problema:** Inconsistencia en naming (camelCase vs otros)

**Acciones:**
- [ ] Revisar nombres de funciones exportadas
- [ ] Asegurar camelCase consistente
- [ ] Verificar que los nombres sean descriptivos
- [ ] Actualizar AGENTS.md si hay cambios en convenciones

---

## Resumen de Prioridades

| Fase | Tareas | Prioridad |
|------|--------|-----------|
| Fase 1 | T1-T4 | Alta |
| Fase 2 | T5-T8 | Media |
| Fase 3 | T9-T12 | Baja/Media |
| Fase 4 | T13-T15 | Baja |

**Total:** 15 tareas

---

## Notas de Implementación

1. **Orden de ejecución:** Seguir el orden de las fases (1 → 4)
2. **Testing:** Verificar cada cambio antes de pasar al siguiente
3. **Sin nuevas features:** Solo correcciones y mejoras del código existente
4. **Vanilla JS:** No agregar frameworks ni librerías
5. **Documentación:** Actualizar AGENTS.md si hay cambios significativos en patrones
