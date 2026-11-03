# Prompt: portadas (covers) para la grilla de juegos

Documento de referencia para generar las **3 portadas** de cada juego de la colección
`juegos/` del portafolio **pfd1795**. Diseñado para que un agente IA generador de
imágenes (o un diseñador) produzca los assets de forma consistente y reproducible.

> **Estado actual:** la grilla ya consume el campo `covers` (array de 3 rutas) de
> `javascripts/data/juegos.json` y muestra un carrusel con transición crossfade.
> Mientras no existan las imágenes, la tarjeta muestra un placeholder con degradado.

---

## 1. Especificación técnica

| Parámetro | Valor |
|---|---|
| Dimensiones | **1280 × 720 px** (relación 16:9) |
| Formato | **WebP** (calidad ~85) o **JPG** (calidad ~90). PNG solo si no hay alternativa |
| Cantidad por juego | **1 portada mínima** (estática). Se pueden añadir hasta 3 para activar el carrusel |
| Texto en la imagen | **Ninguno** (el título ya aparece en la tarjeta) |
| Logos/marcas | Ninguno |
| UI/capturas de pantalla | No (ilustración, no screenshot) |
| Fondo | Oscuro (negro/gris muy oscuro), sin transparencia |
| Peso objetivo | ≤ 250 KB por imagen |

### Convención de nombres y rutas

Con una sola portada (caso actual):
```
assets/images/games/<slug>/cover.jpg
```

Con 2 o 3 portadas (carrusel):
```
assets/images/games/<slug>/cover-1.jpg
assets/images/games/<slug>/cover-2.jpg
assets/images/games/<slug>/cover-3.jpg
```

El `<slug>` es el mismo del manifiesto (`juegos.json`), en kebab-case
(ej. `space-invaders`, `neon-racer`). Las rutas se guardan en el manifiesto
como rutas relativas a la página `juegos/index.html`. Con una sola imagen:

```json
"covers": [
  "../assets/images/games/<slug>/cover.jpg"
]
```

Con tres imágenes:

```json
"covers": [
  "../assets/images/games/<slug>/cover-1.jpg",
  "../assets/images/games/<slug>/cover-2.jpg",
  "../assets/images/games/<slug>/cover-3.jpg"
]
```

---

## 2. Estilo visual (obligatorio)

- **Estética:** retro arcade oscuro, **pixel art** (bloques visibles, paleta limitada,
  sin suavizado/anti-aliasing excesivo).
- **Fondo:** negro o gris muy oscuro (#0a0a0f – #1a1a2e), con sutil patrón de
  scanlines o grilla pixelada opcional.
- **Paleta de acentos:** cian eléctrico, magenta, verde neón, ámbar; coherente con
  el tema del portafolio (claro/oscuro). Alto contraste.
- **Composición:** una escena icónica del gameplay, sujeto centrado, legible a
  tamaño de tarjeta (la imagen se muestra en ~300–400 px de ancho en la grilla).
- **Iluminación:** brillo neón, glow suave, sombras duras (pixeladas).
- **Sin texto, sin logos, sin marcas de agua, sin UI.**

### Variación entre las portadas del mismo juego

Si se generan 3 portadas, deben representar **el mismo juego** con **escenas/ángulos
distintos**, para que el carrusel cuente una micro-historia visual. Si solo se
genera 1, usar la portada **hero** (escena principal icónica).

1. **Portada 1 (hero):** escena principal icónica del juego (el momento más
   reconocible).
2. **Portada 2 (acción):** gameplay en movimiento (enemigo, obstáculo, combo,
   velocidad).
3. **Portada 3 (detalle/atmósfera):** primer plano de un elemento característico o
   escena de ambiente (menú, nivel, efecto visual).

---

## 3. Prompt maestro (plantilla)

Usar este prompt como base y sustituir `{...}` por los valores de cada juego.
Añadir la variación específica al final.

```
Pixel art illustration, 16:9, 1280x720, retro arcade dark style.
Scene: {DESCRIPCION_ESCENA}.
Game genre: {GENERO}. Subject: {SUJETO_PRINCIPAL}.
Dark background (#0a0a0f to #1a1a2e), neon accents in cyan, magenta, electric green and amber.
Visible pixels, limited palette, hard shadows, subtle scanlines, high contrast.
No text, no logos, no UI, no watermarks, no photorealism.
Centered composition, readable at small size, cinematic neon lighting, arcade cabinet aesthetic.
```

**Modificadores por portada:**
- Portada 1: `hero shot, iconic moment, centered subject, calm but striking.`
- Portada 2: `action shot, motion blur pixels, dynamic pose, high energy.`
- Portada 3: `close-up detail, atmospheric, moody lighting, environmental focus.`

---

## 4. Prompts por juego

Cada bloque incluye el **sujeto** y las **3 escenas** (una por portada). El agente
generador debe combinar el prompt maestro (sección 3) con la escena indicada.

### snake — Snake Retro (Arcade · habilidad)
- **Sujeto:** serpiente neón sobre cuadrícula oscura.
- P1 (hero): serpiente verde neón en espiral comiendo una manzana brillante en una cuadrícula oscura.
- P2 (acción): serpiente larga esquivando su propia cola, estela de luz, manzana en movimiento.
- P3 (detalle): primer plano de la cabeza de la serpiente con ojos pixelados y brillo neón.

### space-invaders — Space Invaders Retro (Shooter · arcade)
- **Sujeto:** formación de aliens y nave del jugador.
- P1 (hero): fila de aliens pixelados sobre fondo estrellado oscuro, nave del jugador abajo.
- P2 (acción): disparo láser impactando un alien con explosión de píxeles.
- P3 (detalle): primer plano de un alien con ojos rojos brillantes y búnker destructible.

### ajedrez — Ajedrez Arcade (Tablero · IA)
- **Sujeto:** tablero y piezas con estética neón.
- P1 (hero): tablero de ajedrez en perspectiva isométrica, piezas neón cian vs magenta.
- P2 (acción): rey capturado, explosión de píxeles, piezas en combate.
- P3 (detalle): primer plano del rey y la reina con brillo metálico pixelado.

### damas — Damas Arcade (Tablero · IA)
- **Sujeto:** tablero de damas y fichas.
- P1 (hero): tablero de damas clásico con fichas rojas y negras neón.
- P2 (acción): captura en cadena, fichas volando en píxeles.
- P3 (detalle): primer plano de una dama coronada con corona pixelada brillante.

### dungeon-crawler — Neon Depths (Acción · mazmorras)
- **Sujeto:** héroe en mazmorra oscura.
- P1 (hero): héroe con espada en una mazmorra top-down, antorchas neón.
- P2 (acción): combate contra un guardián, destellos de magia.
- P3 (detalle): primer plano de una puerta de mazmorra con runas luminosas.

### neon-racer — Neon Racer (Carreras · arcade)
- **Sujeto:** auto en autopista de tres carriles.
- P1 (hero): auto neón en autopista nocturna con líneas de velocidad.
- P2 (acción): esquivando tráfico, estela de luz, velocidad extrema.
- P3 (detalle): primer plano del auto con faros brillantes y asfalto pixelado.

### plataformas — Neon Ninja (Plataformas · acción)
- **Sujeto:** ninja con shurikens.
- P1 (hero): ninja saltando entre plataformas con shuriken en mano.
- P2 (acción): lanzamiento de shuriken contra enemigo, estela.
- P3 (detalle): primer plano del ninja con máscara y ojos brillantes.

### tower-defense — Neon Defense (Estrategia · torres)
- **Sujeto:** torres y enemigos.
- P1 (hero): torres de defensa rodeadas de enemigos en oleada.
- P2 (acción): disparo de torre láser contra enemigo, explosión.
- P3 (detalle): primer plano de una torre con cañón giratorio y brillo.

### match-3 — Dulce Explosión (Puzzle · match-3)
- **Sujeto:** caramelos y explosiones.
- P1 (hero): tablero de caramelos coloridos con combo en cadena.
- P2 (acción): explosión de caramelos especiales, partículas.
- P3 (detalle): primer plano de un caramelo especial brillante.

### arkanoid — Rompebloques Neón (Arcade · habilidad)
- **Sujeto:** pala, bola y ladrillos.
- P1 (hero): pala neón y bola rebotando entre ladrillos coloridos.
- P2 (acción): multibola, ladrillos rompiéndose en píxeles.
- P3 (detalle): primer plano de la pala con efecto de poder (láser).

### ritmo — Pixel Riff (Ritmo · música)
- **Sujeto:** notas y pista de ritmo.
- P1 (hero): pista de ritmo con notas cayendo y teclas iluminadas.
- P2 (acción): combo de notas acertadas, explosión de luz.
- P3 (detalle): primer plano de una nota musical pixelada con brillo.

### pong — Pong Neón (Arcade · deporte)
- **Sujeto:** paletas y bola.
- P1 (hero): dos paletas neón y bola en cancha oscura.
- P2 (acción): bola en movimiento rápido, estela de luz.
- P3 (detalle): primer plano de la bola con efecto de impacto.

### piedras-papel-tijeras — Piedra, Papel o Tijeras (Casual · arcade)
- **Sujeto:** manos y símbolos.
- P1 (hero): tres símbolos (piedra, papel, tijeras) en neón.
- P2 (acción): enfrentamiento de dos manos, chispa de victoria.
- P3 (detalle): primer plano de un puño pixelado con brillo.

### pool — Pixel Pool 8 (Billar · física)
- **Sujeto:** mesa de billar y bolas.
- P1 (hero): mesa de billar top-down con bolas ordenadas.
- P2 (acción): bola en movimiento, colisión, estela.
- P3 (detalle): primer plano de la bola 8 con brillo.

### ta-te-ti — Ta Te Ti (Tablero · casual)
- **Sujeto:** tablero 3×3.
- P1 (hero): tablero 3×3 con X y O neón.
- P2 (acción): línea ganadora iluminada.
- P3 (detalle): primer plano de una marca X con efecto de victoria.

---

## 5. Flujo de generación (agente IA)

1. Leer este documento y `juegos/README.md`.
2. Para cada juego publicado en `juegos.json` (`status: "published"`):
   - Generar al menos 1 imagen (idealmente 3) siguiendo el prompt maestro + escena + modificador.
   - Guardar como `cover.jpg` (o `cover-1.jpg`/`cover-2.jpg`/`cover-3.jpg`) en
     `assets/images/games/<slug>/`.
3. Verificar dimensiones (1280×720) y peso (≤ 250 KB).
4. Si una imagen no cumple, regenerar solo esa.
5. (Opcional) Comprimir con `cwebp`/`sharp` si supera el peso.

---

## 6. Integración (ya implementada en la grilla)

La grilla (`javascripts/controllers/juegos/fnJuegos.js`) lee `game.covers` y
renderiza un carrusel CSS-only (crossfade, ~12 s por ciclo, 3 imágenes) en cada
tarjeta. Si `covers` está vacío o falta, se muestra un placeholder con degradado.

Para activar las portadas de un juego:
1. Depositar las 3 imágenes en `assets/images/games/<slug>/`.
2. Asegurar que `juegos.json` tenga el campo `covers` con las 3 rutas
   (ya actualizado en el manifiesto).
3. Probar por HTTP (`python -m http.server 8000`) y verificar que las imágenes
   cargan y el carrusel anima.

---

## 7. Checklist de calidad

- [ ] Al menos 1 imagen por juego (`cover.jpg`), o 3 (`cover-1/2/3.jpg`) si se usa carrusel.
- [ ] Dimensiones 1280×720.
- [ ] Estética pixel art retro arcade oscuro.
- [ ] Sin texto, logos ni UI.
- [ ] Paleta coherente (fondo oscuro + acentos neón).
- [ ] Legible a tamaño de tarjeta.
- [ ] Peso ≤ 250 KB.
- [ ] Rutas en `juegos.json` correctas.
- [ ] Prueba por HTTP sin errores de consola.

---

## 8. Correcciones futuras

- Si se añade un juego nuevo, añadir su bloque en la sección 4 y generar sus
  3 portadas antes de publicar (`status: "published"`).
- Si se cambia el estilo global, actualizar la sección 2 y regenerar todas las
  portadas para mantener consistencia.
- Si se cambia la relación de aspecto, actualizar también el CSS
  (`.juego-card__portada` en `stylesheets/juegos.css`) y la sección 1.
