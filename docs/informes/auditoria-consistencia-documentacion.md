# Auditoría de documentación (consistencia interna)

Alcance: `AGENTS.md` (raíz y locales de `juegos/`, `mis-estudios/` y `programas/`), `README.md`,
`docs/README.md`, `docs/INVARIANTES.md`, `docs/LIMITACIONES.md` y `docs/prompts/*`. Método:
lectura directa de los archivos, verificación de enlaces y anclas con script y recuento desde
los manifiestos. No se comparan firmas, APIs ni citas contra el código: eso corresponde a la
verificación de veracidad.

## Resultado global

- Enlaces relativos y anclas: ninguno roto en los archivos del alcance. La URL absoluta de
  producción (`https://pfd1795.github.io/pfd1795/`) responde correctamente.
- Conteos publicados verificados por lectura directa: 36 artículos publicados, 20 juegos y
  11 herramientas publicadas + 5 `wip`. Coinciden con `README.md:14-16`,
  `docs/LIMITACIONES.md:38,48`, `mis-estudios/AGENTS.md:97` y `programas/AGENTS.md:91`.
- Existen 29 archivos `<slug>.en.html` y 28 quedan fuera de `PRECACHE_URLS`, cifras coherentes
  con `README.md:20`, `docs/LIMITACIONES.md:49` y el tracker.
- No hay plazos, estimaciones, códigos de hallazgo ni trackers paralelos fuera de
  `docs/informes/`. Los documentos para personas son `README.md` y `docs/HUMANOS.md`.

## Hallazgos

### Instrucciones de actualización de artículos dirigidas a una ubicación que no publica el dato

- **Ubicación:** `docs/prompts/crear-estudios.md:629` y `docs/prompts/fichas-estudios.md:330-331`.
- **Evidencia:** ambos textos piden actualizar el número de artículos publicados y el listado de
  temas en el `AGENTS.md` de la raíz. Ese archivo no contiene ninguna de esas dos cosas: el
  conteo está en `README.md:14` y `docs/LIMITACIONES.md:38`, y el listado de temas y su conteo
  están en `mis-estudios/AGENTS.md:12-19,97`.
- **Corrección propuesta:** sustituir la referencia a la raíz por `README.md` y
  `docs/LIMITACIONES.md` para el conteo; dejar el listado de temas únicamente en
  `mis-estudios/AGENTS.md`.
- **Registro:** añadido al tracker único.

### Numeración duplicada en las reglas locales de la enciclopedia

- **Ubicación:** `mis-estudios/AGENTS.md:81` y `mis-estudios/AGENTS.md:86`.
- **Evidencia:** la regla «Sin firmas de IA» y la regla «Interacción con el usuario» llevan
  ambas el número 9. El resto de la numeración de esa sección es correlativa.
- **Corrección propuesta:** renumerar a 10 la regla «Interacción con el usuario».
- **Registro:** añadido al tracker único.

### Nota de procedencia en el índice de limitaciones

- **Ubicación:** `docs/LIMITACIONES.md:4`.
- **Evidencia:** el encabezado incluye una frase sobre el origen del archivo dentro de
  `AGENTS.md`. `AGENTS.md:36` prohíbe escribir historial en la documentación.
- **Corrección propuesta:** suprimir esa frase y conservar únicamente la descripción vigente
  del archivo.
- **Registro:** añadido al tracker único.

### Historial de trabajo cerrado dentro del tracker

- **Ubicación:** `docs/informes/trabajo-pendiente.md:3`.
- **Evidencia:** el ítem abierto de traducción incluye una lista de 29 slugs ya traducidos.
  `AGENTS.md:31` establece que al cerrar un ítem se borra y no se anexa historial.
- **Corrección propuesta:** quitar esa lista y conservar los 7 slugs pendientes junto con la
  convención de traducción.
- **Registro:** añadido al tracker único.

### Citas de línea desactualizadas en las invariantes

- **Ubicación:** `docs/INVARIANTES.md:30` y `docs/INVARIANTES.md:48`.
- **Evidencia:** ambas citan el inventario de claves de `AGENTS.md` como «~369-391»; el apartado
  real ocupa las líneas 374-396.
- **Corrección propuesta:** actualizar el rango a 374-396 o eliminar los números de línea.
- **Registro:** añadido al tracker único.

## Ya presentes en el tracker

Estos tres hallazgos ya tenían ítem abierto y no se han duplicado:

- El roster de `docs/prompts/crear-estudios.md` lista 31 de 36 artículos publicados.
- `docs/prompts/crear-estudios.md:150` contradice la convención de versiones en inglés de la
  regla 8 de `mis-estudios/AGENTS.md`.
- `docs/prompts/fichas-estudios.md:18` fija ocho temas pendientes cuando el tracker lista siete.

## Verificado como correcto

- Estructura de documentación: `docs/informes/` es el único lugar de informes y del tracker;
  no hay planes, fases ni auditorías activas fuera de esa carpeta.
- Árbol de `AGENTS.md`: incluye `docs/informes/`, `manifest.json`, `service-worker.js` y
  `favicon.svg`; la regla de mantenimiento cita los tres `AGENTS.md` locales.
- Inventario de `localStorage`: ocho claves del sitio y el patrón `<slug>_best_v1` de los juegos,
  sin claves propias de agentes.
- «Fase 1…4» de `docs/prompts/crear-videojuegos.md` describe el flujo del prompt, no fases del
  repositorio.
