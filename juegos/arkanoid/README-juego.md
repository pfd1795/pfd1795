# Rompebloques Neón — Arkanoid Arcade

## Descripción

Arkanoid (rompebloques) con estética retro arcade oscura y neón. Controlas una
pala, lanzas una bola y destruyes los ladrillos de 5 niveles de dificultad
creciente, recogiendo cápsulas de poder que caen de los ladrillos rotos.
Cada nivel acelera la bola y complica los tableros con ladrillos plateados
(resistentes) y dorados (indestructibles).

## Mecánicas

- Pala en la parte inferior; la bola rebota en muros, ladrillos y pala.
- El ángulo de rebote depende del punto de impacto en la pala.
- La bola se acelera ligeramente con cada rebote en la pala (con tope).
- Ladrillos: normal (1 golpe, 10 pts), plateado (2 golpes, 20 pts),
  dorado (indestructible, solo decora y bloquea).
- Nivel superado al destruir todos los ladrillos no dorados: +500 puntos.
- Cápsulas de poder (caen al azar ~13%):
  - E: pala grande (12 s) · M: multibola (x3) · S: cámara lenta (8 s)
  - L: láser con disparo automático (10 s) · +: vida extra · −: pala pequeña (trampa).
- 3 vidas por partida; perder la bola resta una vida y reinicia los efectos.
- 5 niveles con patrones distintos; victoria al superar el nivel 5.
- Sin movimientos válidos no aplica: aquí nunca hay bloqueo, la bola siempre vuelve.

## Controles

### Escritorio

- Flechas ← → o A/D: mover la pala (también sigue al ratón).
- ESPACIO o clic: lanzar la bola.
- ESC o P: pausa. Enter en pantallas de inicio/fin: acción principal.

### Móvil

- Arrastrar el dedo: mover la pala.
- Tocar la pantalla: lanzar la bola.
- Toques en botones de overlay (JUGAR, REANUDAR, etc.).

## Arquitectura

Proyecto de archivo único: todo (HTML, CSS, JS) vive en `index.html`,
sin dependencias ni conexión. Estructura del repositorio preparada para crecer:

    proyecto/
    ├── index.html
    ├── README-juego.md
    ├── assets/
    │   ├── sprites/
    │   ├── sounds/
    │   ├── fonts/
    │   └── ui/
    ├── docs/
    │   └── ideas-futuras.md
    └── backups/

El script se organiza en secciones: configuración (dimensiones lógicas 480×640,
paleta, niveles como mapas de texto, cápsulas), utilidades, persistencia,
estado global, nivel y entidades, física de la bola (substeps anti-túnel,
colisión círculo-rectángulo, ángulo según impacto en la pala, normalización
anti-rebotes horizontales), cápsulas y láser, flujo de partida (estados
inicio/jugando/pausa/fin/victoria), efectos (partículas, popups, shake),
renderizado (Canvas 2D con DOM solo para cabecera, HUD y modal), entrada
(puntero + teclado) y bucle principal con `requestAnimationFrame`.

## Persistencia

`localStorage` (con try/catch por si está bloqueado):

- `arkanoid_best_v1`: objeto JSON `{ record, bestLevel }` con el récord de
  puntuación y el nivel máximo alcanzado. Las claves antiguas `ark_record` y
  `ark_bestlevel` se migran automáticamente a esta clave la primera vez que se
  abre el juego.

Se guarda al terminar partidas, superar niveles, cambiar de pestaña y cerrar.

## Posibles Mejoras

- Música y efectos de sonido (opciones ya previstas en el modal).
- Selección de dificultad y temas visuales.
- Más niveles y editor de tableros.
- Jefe final tipo Doh con vida propia.
- Ladrillos con disparos enemigos y pala imán (captura de bola).
- Modo contrarreloj y tableros con obstáculos móviles.