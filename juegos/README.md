# Juegos del portafolio

Colección de juegos arcade integrados en el portafolio de **pfd1795**. Todos están hechos con
HTML5, CSS3 y JavaScript vanilla, se renderizan en `<canvas>` y funcionan sin dependencias,
CDNs ni conexión a Internet.

La página [`index.html`](./index.html) muestra una grilla con todos los juegos publicados y
reutiliza la barra, el menú lateral y el modal de configuración del portafolio.

---

## Estructura esperada

```text
juegos/
├── index.html              # Grilla de juegos (chrome del portafolio)
├── README.md               # Esta guía
├── _template/              # Plantilla para juegos nuevos (no aparece en la grilla)
│   ├── index.html
│   └── README-juego.md
└── <slug>/                 # Una carpeta por juego
    ├── index.html          # Juego completo y autocontenido
    └── README-juego.md     # Documentación del juego
```

Reglas de la carpeta de un juego:

- El `slug` de la carpeta debe estar en **kebab-case** y solo usar minúsculas, números y guiones
  (`space-invaders`, `neon-racer`). Es el identificador que se usa en el manifiesto.
- El juego debe ser un **único `index.html`** con su HTML, CSS y JavaScript embebidos, salvo que
  se acuerde lo contrario.
- No debe cargar recursos externos, CDNs, fuentes remotas ni APIs.
- Los assets opcionales (sprites, sonidos) deben vivir dentro de la misma carpeta.

> Los juegos son estáticos y autocontenidos: todo el código vive en `juegos/<slug>/index.html`
> dentro de este repositorio; no hay directorio externo de desarrollo.

---

## Cómo agregar un juego

### 1. Copiar la carpeta

```bash
cd /ruta/al/portafolio/pfd1795
cp -r /ruta/al/juego juegos/mi-juego
```

Si el juego trae un `readme.md` o `readme-*.md`, renómbralo a `README-juego.md`:

```bash
mv juegos/mi-juego/readme.md juegos/mi-juego/README-juego.md
```

### 2. Comprobar que es autocontenido

```bash
grep -nE '(src|href)=' juegos/mi-juego/index.html
```

No deben aparecer rutas a recursos externos (`http://`, `https://`, `//cdn...`). Las únicas
rutas aceptables son `data:` o archivos dentro de la propia carpeta.

### 3. Añadir la entrada al manifiesto

Edita [`javascripts/data/juegos.json`](../javascripts/data/juegos.json) y agrega un objeto:

```json
{
  "slug": "mi-juego",
  "title": {
    "es": "Mi Juego",
    "en": "My Game"
  },
  "description": {
    "es": "Descripción breve en una o dos frases.",
    "en": "Short description in one or two sentences."
  },
  "genre": {
    "es": "Arcade · habilidad",
    "en": "Arcade · skill"
  },
  "year": 2026,
  "technologies": ["HTML5", "CSS3", "JavaScript", "Canvas 2D"],
  "controls": {
    "es": "Flechas / WASD · botones táctiles",
    "en": "Arrows / WASD · touch buttons"
  },
  "covers": ["../assets/images/games/mi-juego/cover.jpg"],
  "status": "published"
}
```

### 4. Servir el sitio y probar

```bash
cd /ruta/al/portafolio/pfd1795
python3 -m http.server 8000
```

Abre `http://localhost:8000/juegos/` y comprueba:

- La tarjeta aparece en la grilla.
- El botón **Jugar** abre `juegos/<slug>/index.html` en una pestaña nueva.
- El juego funciona con teclado y en móvil.
- No hay errores en la consola ni peticiones 404.
- El récord se guarda al recargar.

### 5. Actualizar la documentación

- Añade el juego a la tabla de catálogo de este README (sección siguiente).
- Genera su portada y añádela al manifiesto (ver `docs/prompts/portadas-juegos.md`, herramienta de desarrollo).
- Mantén sincronizados `README.md`, `AGENTS.md` y `juegos/README.md` del portafolio.

---

## Manifiesto `javascripts/data/juegos.json`

Es la **única fuente de verdad** de la grilla. La página no contiene tarjetas escritas a mano.

| Campo | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `slug` | string | Sí | Nombre de la carpeta. Solo `a-z`, `0-9` y `-`. |
| `title` | `{ es, en }` | Sí | Título visible en la tarjeta. |
| `description` | `{ es, en }` | Sí | Descripción corta (1–2 frases). |
| `genre` | `{ es, en }` | Sí | Género y categoría. |
| `year` | number | No | Año de publicación; se muestra en la cabecera. |
| `technologies` | string[] | No | Chips de tecnologías. |
| `controls` | `{ es, en }` | No | Resumen de controles. |
| `covers` | string[] | No | Rutas relativas a las portadas (`../assets/images/games/<slug>/cover.jpg`). Con una imagen la tarjeta la muestra estática; con 2–3 activa un carrusel por CSS; sin imágenes o con el campo ausente, placeholder con degradado. |
| `status` | `"published"` \| `"wip"` | Sí | Solo `published` aparece en la grilla. |

Notas:

- El archivo tiene una clave raíz `version` (formato del manifiesto) y el array `games`; no los elimines.
- El enlace para jugar se construye automáticamente como `./<slug>/index.html`; no guardes la URL del juego en el JSON (las rutas del campo `covers` sí van en el JSON).
- Si un `slug` no cumple el patrón o falta `status`, el juego se omite y se registra un aviso en
  la consola. La página sigue funcionando.
- Los textos deben existir en español e inglés. Si falta un idioma, se usa el español.

---

## Catálogo actual

| Juego | Carpeta | Género | Estado |
| --- | --- | --- | --- |
| Snake Retro | [`snake/`](./snake/) | Arcade · habilidad | Publicado |
| Space Invaders Retro | [`space-invaders/`](./space-invaders/) | Shooter · arcade | Publicado |
| Ajedrez Arcade | [`ajedrez/`](./ajedrez/) | Tablero · IA | Publicado |
| Damas Arcade | [`damas/`](./damas/) | Tablero · IA | Publicado |
| Neon Depths | [`dungeon-crawler/`](./dungeon-crawler/) | Acción · mazmorras | Publicado |
| Neon Racer | [`neon-racer/`](./neon-racer/) | Carreras · arcade | Publicado |
| Neon Ninja | [`plataformas/`](./plataformas/) | Plataformas · acción | Publicado |
| Neon Defense | [`tower-defense/`](./tower-defense/) | Estrategia · torres | Publicado |
| Dulce Explosión | [`match-3/`](./match-3/) | Puzzle · match-3 | Publicado |
| Rompebloques Neón | [`arkanoid/`](./arkanoid/) | Arcade · habilidad | Publicado |
| Pixel Riff | [`ritmo/`](./ritmo/) | Ritmo · música | Publicado |
| Pong Neón | [`pong/`](./pong/) | Arcade · deporte | Publicado |
| Piedra, Papel o Tijeras | [`piedras-papel-tijeras/`](./piedras-papel-tijeras/) | Casual · arcade | Publicado |
| Pixel Pool 8 | [`pool/`](./pool/) | Billar · física | Publicado |
| Ta Te Ti | [`ta-te-ti/`](./ta-te-ti/) | Tablero · casual | Publicado |

---

## Checklist de calidad para un juego nuevo

- [ ] Todo el código está en un único `index.html` (salvo assets propios).
- [ ] La jugabilidad se renderiza en `<canvas>`; el DOM solo se usa para HUD, botones y modales.
- [ ] Incluye pantalla de inicio, estados de jugando, pausa, reanudar y Game Over.
- [ ] Incluye botón **Opciones** con un modal (las opciones no implementadas se marcan como
      "Próximamente").
- [ ] Muestra la sección de controles reales, tanto de escritorio como de móvil.
- [ ] Tiene controles táctiles utilizables en pantallas pequeñas.
- [ ] Guarda el récord en `localStorage` con una clave única (`<juego>_best_v1`).
- [ ] No usa frameworks, librerías, CDNs ni recursos remotos.
- [ ] No rompe otras páginas del portafolio ni colisiona con claves de `localStorage`.
- [ ] Tiene su `README-juego.md` con descripción, mecánicas, controles, arquitectura,
      persistencia y posibles mejoras.
- [ ] Está añadido al manifiesto y probado por HTTP.
- [ ] Sigue el canon visual retro-arcade (sección siguiente): paleta neón oscura, modal de
      opciones con `<dialog>`, scanlines CRT y clave de récord `<slug>_best_v1`.
- [ ] Usa el dimensionado del canon (sección "Dimensionado del canvas"): regla de `width: min()`
      con `--game-max`/`--game-chrome` y buffer nítido con `renderScale`.

---

## Canon visual retro-arcade

Todos los juegos comparten el mismo aspecto: pixel-art neón sobre fondo oscuro, tipografía
`"Courier New", monospace` y el mismo "chrome" (barra superior, HUD, estados y modal). Un juego
nuevo debe copiarlo de [`_template/index.html`](./_template/index.html) o de
[`snake/index.html`](./snake/index.html) (referencia canónica).

### Paleta (familia A)

Definida como variables CSS en `:root` de cada juego:

| Variable | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#0d0221` | Fondo de página |
| `--panel` | `#1a1033` | Paneles, topbar y modal |
| `--text` | `#eaeaea` | Texto principal |
| `--muted` | `#9b8fb8` | Texto secundario |
| `--neon-green` | `#39ff14` | Título `h1` y acentos positivos |
| `--neon-pink` | `#ff2a6d` | Pausa / salir / peligro |
| `--neon-cyan` | `#05d9e8` | Botones y títulos del modal |
| `--neon-yellow` | `#ffd60a` | Reiniciar / avisos |
| `--neon-purple` | `#b967ff` | Bordes del modal y líneas |

- El `h1` usa siempre `color:var(--neon-green)` con `text-shadow:0 0 8px rgba(57,255,20,0.8)`.
- Los botones usan el estilo cian transparente (`background:transparent`, borde y texto cian,
  hover con `rgba(5,217,232,0.12)` + glow). Los botones semánticos (pausa=reinit,
  reanudar=verde, reiniciar=amarillo, salir/rosa, cerrar/apagado) mantienen su color propio
  apuntando a los neones canon.
- Los colores de dibujo dentro del `<canvas>` usan los mismos valores neón; el arte propio de
  cada juego (tablero de ajedrez, tapete del billar, degradados de ladrillos) se conserva.

### Dimensionado del canvas (marco común)

El escenario comparte un mismo criterio de tamaño: un **marco máximo de 900×900 px CSS**, que
respeta la proporción lógica de cada juego y renderiza el buffer a la resolución visible. La
referencia es [`_template/index.html`](./_template/index.html); los juegos de marco pequeño
(actualmente snake, space-invaders, neon-racer, plataformas, dungeon-crawler y tower-defense)
lo siguen.

- Variables en `:root` de cada juego:
  - `--game-max: 900px` — tope de ancho **y** de alto del marco.
  - `--game-chrome` — altura reservada para topbar, HUD y controles; tiene un valor de
    escritorio y otro mayor dentro del media query táctil/móvil
    `(hover: none) and (pointer: coarse), (max-width: 600px)`.
- Regla de tamaño del canvas:

```css
canvas {
  width: min(
    calc(100vw - 16px),                             /* móvil: todo el ancho útil */
    var(--game-max),                                /* tope de ancho */
    calc(var(--game-max) * W / H),                  /* tope de alto = 900px */
    calc((100dvh - var(--game-chrome)) * W / H)     /* alto disponible real */
  );
  aspect-ratio: W / H;
}
```

- Buffer nítido y adaptable: en la carga y en `resize` se recalcula
  `let renderScale = Math.max(1, cssWidth / W) * Math.min(devicePixelRatio, 2)` y
  `canvas.width/height = Math.round(W/H * renderScale)`; en el `draw()` se usa
  `ctx.setTransform(renderScale, 0, 0, renderScale, 0, 0)`. Así el buffer iguala el tamaño
  visible × DPR en escritorio y no baja de la resolución lógica en móvil.
- No se cambia la resolución lógica ni la lógica del juego para ajustar el tamaño: solo el
  dimensionado (CSS + `renderScale`). Ajustar el marco es cambiar `--game-max` y la reserva
  `--game-chrome` de cada juego.

### Modal de opciones

Nativo `<dialog id="options" aria-labelledby="options-title">`:

- Se abre con `showModal()` y se cierra con `close()`, con el botón ✕, con ESC (nativo) y con
  clic en el backdrop (`if (e.target === dialog) dialog.close()`).
- Las opciones no implementadas (Música, Efectos de sonido, Dificultad, Temas visuales) se
  muestran como "Próximamente".
- El guard de teclado del juego es `if (optionsDialog.open) return;`.

### Scanlines CRT

Overlay sutil global: `<div class="scanlines" aria-hidden="true"></div>` justo antes de
`</body>`, con `position:fixed;inset:0;pointer-events:none;z-index:5` y un
`repeating-linear-gradient` de líneas horizontales.

### Claves de récord

Cada juego guarda su récord en `localStorage` con la clave `<slug>_best_v1`. Los juegos que
antes usaban otra clave la migran automáticamente (copian el valor a la clave nueva y borran la
antigua la primera vez que se abre el juego), así que ningún jugador pierde su récord:

| Juego | Clave actual | Clave(s) antigua(s) migrada(s) |
| --- | --- | --- |
| snake | `snake_best_v1` | — |
| space-invaders | `space-invaders_best_v1` | `invaders_best_v1` |
| ajedrez | `ajedrez_best_v1` | `ajedrez-arcade-v1` |
| damas | `damas_best_v1` | `damas-arcade-v1` |
| dungeon-crawler | `dungeon-crawler_best_v1` | `dungeon_best_v1` |
| neon-racer | `neon-racer_best_v1` | `racer_best_v1` |
| plataformas | `plataformas_best_v1` | `ninja_best_v1` |
| tower-defense | `tower-defense_best_v1` | `tower_best_v1` |
| match-3 | `match-3_best_v1` | `de_record` + `de_bestlevel` (fusionados en un JSON) |
| arkanoid | `arkanoid_best_v1` | `ark_record` + `ark_bestlevel` (fusionados en un JSON) |
| ritmo | `ritmo_best_v1` | `pixelriff_records_v1` |
| pong | `pong_best_v1` | `pong_neon_best` |
| piedras-papel-tijeras | `piedras-papel-tijeras_best_v1` | `ppt_neon_record` |
| pool | `pool_best_v1` | `pixelpool_records_v1` |
| ta-te-ti | `ta-te-ti_best_v1` | `tateti_neon_record` |

---

## Usar la plantilla

`_template/` contiene un esqueleto funcional que ya cumple el estándar: barra superior, HUD,
canvas, estados, controles táctiles, modal de opciones y récord persistente.

```bash
cp -r juegos/_template juegos/mi-juego
```

Después:

1. Cambia el título, los colores y la lógica de juego en `index.html`.
2. Sustituye el contenido de `README-juego.md`.
3. Añade la entrada al manifiesto.

La carpeta empieza con `_` para dejar claro que no es un juego publicable; no la añadas al
manifiesto.

---

## Solución de problemas

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| La grilla está vacía | El manifiesto no tiene entradas `published` o el `slug` es inválido | Revisa `javascripts/data/juegos.json` y la consola. |
| El botón Jugar da 404 | La carpeta no coincide con el `slug` | Renombra la carpeta o corrige el `slug`. |
| El juego no carga | Se abrió con `file://` | Sirve el sitio por HTTP (`python3 -m http.server`). |
| El juego se ve roto | Rutas relativas incorrectas o recursos externos | Usa rutas dentro de `juegos/<slug>/` y evita CDNs. |
| El récord de otro juego aparece | Clave de `localStorage` repetida | Usa una clave única por juego. |
| No cambia de idioma | Faltan claves ES/EN en el manifiesto | Completa `title`, `description`, `genre` y `controls`. |

---

## Referencias

- [README del portafolio](../README.md)
- [Guía técnica para agentes](../AGENTS.md)
- [Índice de la documentación](../docs/README.md)
