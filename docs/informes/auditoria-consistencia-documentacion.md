# Auditoría de documentación (consistencia interna)

Alcance: `AGENTS.md` (raíz y locales de `juegos/`, `mis-estudios/`, `programas/`), `README.md`,
`docs/README.md` y `docs/prompts/*`. Método: lectura directa y verificación de enlaces y anclas
con script; conteos verificados contra los manifiestos.

## Resultado global

- Enlaces relativos y anclas: todos válidos en los archivos del alcance.
- Conteos publicados verificados: 28 artículos (28/28), 20 juegos (20/20), 11 herramientas
  publicadas + 5 `wip` (16). Coinciden con la documentación.
- Sin fechas, plazos, estimaciones ni códigos de hallazgo.
- Documentación en español; el único documento para personas es `README.md`; no hay trackers
  paralelos salvo el caso del hallazgo 1.

## Hallazgos

### 1. `fichas-estudios.md` mezcla herramienta con lista de pendientes y estados obsoletos

- **Ubicación:** `docs/prompts/fichas-estudios.md:18-42` (descripción en `docs/README.md:35-37`).
- **Evidencia:** dice que de los «siete temas que el manifiesto anunciaba como Próximamente» hay
  «cinco ya publicados» y marca los temas 6 y 7 (`editores-ides-depuracion`,
  `empaquetado-despliegue`) como «Próximamente». El manifiesto tiene 28 `published` y 0 `wip`:
  los siete están publicados. Los ocho temas «Nuevo» son una lista de trabajo pendiente fuera de
  `docs/informes/`, lo que contradice `AGENTS.md:29-31` y `AGENTS.md:9`. La columna «Estado en
  el manifiesto» es historial de progreso.
- **Corrección propuesta:** quitar la columna de estado y la sección «Orden de publicación
  recomendado»; dejar solo las fichas como herramienta. Trasladar los ocho temas pendientes a
  `docs/informes/trabajo-pendiente.md` y ajustar `docs/README.md:35-37`.

### 2. El roster de `crear-estudios.md` está incompleto (26 de 28)

- **Ubicación:** `docs/prompts/crear-estudios.md:173-204`.
- **Evidencia:** faltan `editores-ides-depuracion.html` y `empaquetado-despliegue.html`, ambos
  `published` y con archivo existente. El prompt ordena «Solo puedes enlazar a estos desde Ver
  también» (`:206`), así que un agente no puede enlazar dos artículos ya publicados. La causa:
  el paso de integración (`:623`) pide actualizar los conteos en los `AGENTS.md`, pero no el
  roster.
- **Corrección propuesta:** añadir las dos filas y agregar al bloque de integración el paso de
  mantener el roster actualizado.

### 3. La enumeración de artículos de `mis-estudios/AGENTS.md` tiene 27, no 28

- **Ubicación:** `mis-estudios/AGENTS.md:12-21`.
- **Evidencia:** la lista entre paréntesis omite «Empaquetado y despliegue», aunque la misma
  sección afirma 28 publicados (`:81`) y el manifiesto lo confirma.
- **Corrección propuesta:** añadir «Empaquetado y despliegue» a la enumeración.

### 4. `CACHE_NAME` incrustado y desactualizado en los prompts

- **Ubicación:** `docs/prompts/crear-estudios.md:621` y `docs/prompts/fichas-estudios.md:350-351`.
- **Evidencia:** ambos dicen «actualmente v6: v6 → v7»; `service-worker.js:5` usa
  `'pwa-cache-v19'`. Es estado incrustado que caduca en cada publicación.
- **Corrección propuesta:** sustituirlo por una instrucción relativa («sube `CACHE_NAME` un nivel
  respecto al valor actual»), en línea con `AGENTS.md:480`.

### 5. El árbol de `docs/` en `AGENTS.md` omite `informes/`

- **Ubicación:** `AGENTS.md:219-221`.
- **Evidencia:** el árbol solo muestra `README.md` y `prompts/`; `docs/README.md:45-52`
  documenta `docs/informes/` y el tracker existe.
- **Corrección propuesta:** añadir `informes/` al árbol.

### 6. Las reglas de mantenimiento omiten `programas/AGENTS.md`

- **Ubicación:** `AGENTS.md:638`.
- **Evidencia:** la lista de documentación a mantener cita «los locales de `juegos/` y
  `mis-estudios/`», pero existe y está documentado `programas/AGENTS.md` (`AGENTS.md:9`,
  `docs/README.md:19`).
- **Corrección propuesta:** añadir `programas/` a esa lista.

### 7. (Menor) Árboles de estructura incompletos respecto a la PWA

- **Ubicación:** `AGENTS.md:216-265` y `README.md:40-50`.
- **Evidencia:** ninguno lista `manifest.json`, `service-worker.js` ni `favicon.svg`, aunque
  `AGENTS.md:480` los documenta como parte del sitio y `README.md:20` anuncia la PWA.
- **Corrección propuesta:** añadirlos a los árboles o indicar que el árbol es parcial.

### 8. (Menor) Redacción de `docs/README.md:48`

- **Evidencia:** dice que `docs/informes/` «se crea la primera vez que haga falta; no hay informes
  activos por defecto», pero la carpeta ya existe con el tracker vacío.
- **Corrección propuesta:** reescribir como «existe con el tracker vacío; los informes se añaden
  cuando se generan».

## Observaciones no accionables

- `docs/prompts/portadas-juegos.md` incluye ejemplos para 15 de los 20 juegos. El documento se
  declara independiente del repositorio, así que no es una inconsistencia; si se quiere usar como
  banco de portadas, faltan `card-match`, `dodge-arena`, `neon-maze`, `neon-rally` y `tetris`.
- `docs/prompts/crear-videojuegos.md` usa «Fase 1…4» como flujo de trabajo del prompt; no es un
  plan de proyecto ni incumple la regla.
- `docs/informes/trabajo-pendiente.md` contiene solo el título: correcto como tracker vacío.

## Cierre

No se han aplicado correcciones: la auditoría solo entrega el informe y los ítems accionables.
Cada corrección es un cambio acotado y debe verificarse por separado.