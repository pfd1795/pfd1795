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

> La copia dentro del portafolio es estática. El directorio externo
> `/home/gris/Documentos/juegos` es la fuente de desarrollo: si un juego cambia allí, hay que
> volver a copiarlo a `juegos/<slug>/` y actualizar su `README-juego.md`.

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
  "cover": null,
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
- Si corresponde, registra la mejora en [`../docs/MEJORAS.md`](../docs/MEJORAS.md).
- Mantén sincronizados `README.md`, `AGENTS.md` y `docs/MEJORAS.md` del portafolio.

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
| `cover` | string \| null | No | Ruta a una portada futura. Hoy la grilla es tipográfica. |
| `status` | `"published"` \| `"wip"` | Sí | Solo `published` aparece en la grilla. |

Notas:

- El enlace se construye automáticamente como `./<slug>/index.html`; no guardes rutas en el JSON.
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
- [Historial de mejoras](../docs/MEJORAS.md)
