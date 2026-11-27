# Juegos del portafolio

Colección de juegos arcade integrados en el portafolio de **pfd1795**. Todos están hechos con
HTML5, CSS3 y JavaScript vanilla, se renderizan en `<canvas>` y funcionan sin dependencias,
CDNs ni conexión a Internet.

La página [`index.html`](./index.html) muestra una grilla con todos los juegos publicados y
reutiliza la barra, el menú lateral y el modal de configuración del portafolio.

---

## Estructura esperada

```text
pages/my-games/
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
  (`neon-space-invaders`, `neon-racer`). Es el identificador que se usa en el manifiesto.
- El juego debe ser un **único `index.html`** con su HTML, CSS y JavaScript embebidos, salvo que
  se acuerde lo contrario.
- No debe cargar recursos externos, CDNs, fuentes remotas ni APIs.
- Los assets opcionales (sprites, sonidos) deben vivir dentro de la misma carpeta.

> Los juegos son estáticos y autocontenidos: todo el código vive en `pages/my-games/<slug>/index.html`
> dentro de este repositorio; no hay directorio externo de desarrollo.

---

## Cómo agregar un juego

### 1. Copiar la carpeta

```bash
cd /ruta/al/portafolio/pfd1795
cp -r /ruta/al/juego pages/my-games/mi-juego
```

Si el juego trae un `readme.md` o `readme-*.md`, renómbralo a `README-juego.md`:

```bash
mv pages/my-games/mi-juego/readme.md pages/my-games/mi-juego/README-juego.md
```

### 2. Comprobar que es autocontenido

```bash
grep -nE '(src|href)=' pages/my-games/mi-juego/index.html
```

No deben aparecer rutas a recursos externos (`http://`, `https://`, `//cdn...`). Las únicas
rutas aceptables son `data:` o archivos dentro de la propia carpeta.

### 3. Añadir la entrada al manifiesto

Edita [`data/juegos.json`](./data/juegos.json) y agrega un objeto:

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
  "cover": "./mi-juego/cover.jpg",
  "status": "published",
  "updatedAt": null
}
```

Al publicar o modificar un juego, escribe en `updatedAt` la fecha ISO del cambio (`YYYY-MM-DD`); usa `null` solo cuando no haya una fecha registrada.

### 4. Servir el sitio y probar

```bash
cd /ruta/al/portafolio/pfd1795
python3 -m http.server 8000
```

Abre `http://localhost:8000/pages/my-games/` y comprueba:

- La tarjeta aparece en la grilla.
- El botón **Jugar** abre `pages/my-games/<slug>/index.html` en la misma pestaña; «Atrás» devuelve a la grilla.
- El juego funciona con teclado y en móvil.
- No hay errores en la consola ni peticiones 404.
- El récord se guarda al recargar.

### 5. Actualizar la documentación

- Añade el juego a la tabla de catálogo de este README (sección siguiente).
- Añade la portada del juego al manifiesto en el campo `cover` (ruta relativa a `pages/my-games/index.html`, por ejemplo `./<slug>/cover.jpg`).
- Mantén sincronizados `README.md`, `AGENTS.md` y `pages/my-games/README.md` del portafolio.

---

## Manifiesto `data/juegos.json`

Es la **única fuente de verdad** de la grilla. La página no contiene tarjetas escritas a mano.

| Campo | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `slug` | string | Sí | Nombre de la carpeta. Solo `a-z`, `0-9` y `-`. |
| `title` | `{ es, en }` | Sí | Título visible en la tarjeta. |
| `description` | `{ es, en }` | Sí | Descripción corta (1–2 frases); no se muestra en la grilla, se usa como metadato del buscador. |
| `genre` | `{ es, en }` | Sí | Género y categoría; no se muestra en la grilla, se usa como metadato del buscador. |
| `year` | number | No | Año de publicación; no se renderiza en la grilla. |
| `technologies` | string[] | No | Tecnologías; no se muestran, se usan como metadato del buscador. |
| `controls` | `{ es, en }` | No | Resumen de controles; no se renderiza en la grilla. |
| `cover` | string | No | Ruta relativa a la portada (`./<slug>/cover.jpg`). Si falta o está vacía, la tarjeta muestra un placeholder con degradado. |
| `status` | `"published"` \| `"wip"` | Sí | Solo `published` aparece en la grilla. |
| `updatedAt` | `string` \| `null` | Sí | Fecha ISO `YYYY-MM-DD` del último cambio; `null` si no hay fecha registrada. |

Notas:

- El archivo tiene una clave raíz `version` (formato del manifiesto) y el array `items`; no los elimines. Es el mismo esquema que usan `pages/my-studies/data/articulos.json` y `pages/my-programs/data/herramientas.json` (que añaden un array `categories` para agrupar las tarjetas).
- El enlace para jugar se construye automáticamente como `./<slug>/index.html`; no guardes la URL del juego en el JSON (la ruta del campo `cover` sí va en el JSON).
- Si un `slug` no cumple el patrón o falta `status`, el juego se omite y se registra un aviso en
  la consola. La página sigue funcionando.
- Los textos deben existir en español e inglés. Si falta un idioma, se usa el español.

---

## Catálogo actual

| Juego | Carpeta | Género | Estado |
| --- | --- | --- | --- |
| Snake Retro | [`neon-snake/`](./neon-snake) | Arcade · habilidad | Publicado |
| Space Invaders Retro | [`neon-space-invaders/`](./neon-space-invaders) | Shooter · arcade | Publicado |
| Ajedrez Arcade | [`neon-chess/`](./neon-chess) | Tablero · IA | Publicado |
| Damas Arcade | [`neon-checkers/`](./neon-checkers) | Tablero · IA | Publicado |
| Neon Depths | [`neon-dungeon-crawler/`](./neon-dungeon-crawler) | Acción · mazmorras | Publicado |
| Neon Racer | [`neon-racer/`](./neon-racer) | Carreras · arcade | Publicado |
| Neon Ninja | [`neon-platformer/`](./neon-platformer) | Plataformas · acción | Publicado |
| Neon Defense | [`neon-tower-defense/`](./neon-tower-defense) | Estrategia · torres | Publicado |
| Dulce Explosión | [`neon-match-3/`](./neon-match-3) | Puzzle · match-3 | Publicado |
| Rompebloques Neón | [`neon-arkanoid/`](./neon-arkanoid) | Arcade · habilidad | Publicado |
| Pixel Riff | [`neon-rhythm/`](./neon-rhythm) | Ritmo · música | Publicado |
| Pong Neón | [`neon-pong/`](./neon-pong) | Arcade · deporte | Publicado |
| Piedra, Papel o Tijeras | [`neon-rock-paper-scissors/`](./neon-rock-paper-scissors) | Casual · arcade | Publicado |
| Pixel Pool 8 | [`neon-pool/`](./neon-pool) | Billar · física | Publicado |
| Ta Te Ti | [`neon-tic-tac-toe/`](./neon-tic-tac-toe) | Tablero · casual | Publicado |
| Card Match | [`neon-card-match/`](./neon-card-match) | Puzzle · memoria | Publicado |
| Dodge Arena | [`neon-dodge-arena/`](./neon-dodge-arena) | Acción · supervivencia | Publicado |
| Neon Maze | [`neon-maze/`](./neon-maze) | Aventura · laberinto | Publicado |
| Neon Retro Rally | [`neon-rally/`](./neon-rally) | Carreras · arcade | Publicado |
| Tetris | [`neon-tetris/`](./neon-tetris) | Puzzle · clásico | Publicado |

---

## Checklist de calidad para un juego nuevo

- [ ] Todo el código está en un único `index.html` (salvo assets propios).
- [ ] La jugabilidad se renderiza en `<canvas>`; el DOM solo se usa para HUD, botones y modales.
- [ ] El `<canvas>` tiene `aria-label` descriptivo (p. ej. "Tablero de ajedrez",
      "Escenario del juego de ritmo").
- [ ] Incluye `<meta name="description">` con el nombre del juego y su género.
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
- [ ] La entrada del manifiesto tiene `updatedAt` con la fecha ISO del cambio (o `null` si no hay fecha registrada).
- [ ] Sigue el canon visual retro-arcade (sección siguiente): paleta neón oscura, modal de
      opciones con `<dialog>`, scanlines CRT y clave de récord `<slug>_best_v1`.
- [ ] Usa el dimensionado del canon (sección "Dimensionado del canvas"): regla de `width: min()`
      con `--game-max`/`--game-chrome` y buffer nítido con `renderScale`.

---

## Canon visual retro-arcade

Todos los juegos comparten el mismo aspecto: pixel-art neón sobre fondo oscuro, tipografía
`"Courier New", monospace` y el mismo "chrome" (barra superior, HUD, estados y modal). Un juego
nuevo debe copiarlo de [`_template/index.html`](./_template/index.html) o de
[`neon-snake/index.html`](./neon-snake/index.html) (referencia canónica).

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
referencia es [`_template/index.html`](./_template/index.html); lo siguen neon-card-match,
neon-dodge-arena, neon-dungeon-crawler, neon-maze, neon-racer, neon-rally, neon-platformer,
neon-snake, neon-space-invaders, neon-tetris y neon-tower-defense.

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
    calc(max(0px, 100dvh - var(--game-chrome)) * W / H)     /* alto disponible real */
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
| neon-snake | `neon-snake_best_v1` | `snake_best_v1` |
| neon-space-invaders | `neon-space-invaders_best_v1` | `invaders_best_v1`, `space-invaders_best_v1` |
| neon-chess | `neon-chess_best_v1` | `ajedrez-arcade-v1`, `ajedrez_best_v1` |
| neon-checkers | `neon-checkers_best_v1` | `damas-arcade-v1`, `damas_best_v1` |
| neon-dungeon-crawler | `neon-dungeon-crawler_best_v1` | `dungeon_best_v1`, `dungeon-crawler_best_v1` |
| neon-racer | `neon-racer_best_v1` | `racer_best_v1` |
| neon-platformer | `neon-platformer_best_v1` | `ninja_best_v1`, `plataformas_best_v1` |
| neon-tower-defense | `neon-tower-defense_best_v1` | `tower_best_v1`, `tower-defense_best_v1` |
| neon-match-3 | `neon-match-3_best_v1` | `de_record` + `de_bestlevel` (fusionados en un JSON), `match-3_best_v1` |
| neon-arkanoid | `neon-arkanoid_best_v1` | `ark_record` + `ark_bestlevel` (fusionados en un JSON), `arkanoid_best_v1` |
| neon-rhythm | `neon-rhythm_best_v1` | `pixelriff_records_v1`, `ritmo_best_v1` |
| neon-pong | `neon-pong_best_v1` | `pong_neon_best`, `pong_best_v1` |
| neon-rock-paper-scissors | `neon-rock-paper-scissors_best_v1` | `ppt_neon_record`, `piedras-papel-tijeras_best_v1` |
| neon-pool | `neon-pool_best_v1` | `pixelpool_records_v1`, `pool_best_v1` |
| neon-tic-tac-toe | `neon-tic-tac-toe_best_v1` | `tateti_neon_record`, `ta-te-ti_best_v1` |
| neon-card-match | `neon-card-match_best_v1` | `card-match_best_v1` |
| neon-dodge-arena | `neon-dodge-arena_best_v1` | `dodge-arena_best_v1` |
| neon-maze | `neon-maze_best_v1` | — |
| neon-rally | `neon-rally_best_v1` | — |
| neon-tetris | `neon-tetris_best_v1` | `tetris_best_v1` |

Además del récord, un juego puede guardar preferencias propias con el patrón `<slug>_…_v1`
(p. ej. `neon-snake_settings_v1` o `neon-maze_sfx_v1`). Son claves privadas de cada juego, no
deben borrarse al limpiar el inventario de `localStorage` del sitio.

---

## Usar la plantilla

`_template/` contiene un esqueleto funcional que ya cumple el estándar: barra superior, HUD,
canvas, estados, controles táctiles, modal de opciones y récord persistente.

```bash
cp -r pages/my-games/_template pages/my-games/mi-juego
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
| La grilla está vacía | El manifiesto no tiene entradas `published` o el `slug` es inválido | Revisa `data/juegos.json` y la consola. |
| El botón Jugar da 404 | La carpeta no coincide con el `slug` | Renombra la carpeta o corrige el `slug`. |
| El juego no carga | Se abrió con `file://` | Sirve el sitio por HTTP (`python3 -m http.server`). |
| El juego se ve roto | Rutas relativas incorrectas o recursos externos | Usa rutas dentro de `pages/my-games/<slug>/` y evita CDNs. |
| El récord de otro juego aparece | Clave de `localStorage` repetida | Usa una clave única por juego. |
| No cambia de idioma | Faltan claves ES/EN en el manifiesto | Completa `title`, `description`, `genre` y `controls`. |

---

## Referencias

- [README del portafolio](../../README.md)
- [Guía técnica para agentes](../../AGENTS.md)
- [Índice de la documentación](../../docs/README.md)
