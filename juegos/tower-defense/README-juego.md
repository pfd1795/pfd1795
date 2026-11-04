# Neon Defense

## Descripción

Tower defense clásico con estética neón sobre tema oscuro, desarrollado íntegramente con HTML5, CSS3 y JavaScript Vanilla. Toda la jugabilidad ocurre en un `<canvas>` de 640×480 con rejilla de 16×12 casillas de 40 px y sprites pixel art pre-renderizados; el DOM solo se usa para la cabecera, el HUD, la barra de construcción, el panel de torre y el modal de opciones.

## Mecánicas

- Los enemigos recorren un camino serpenteante desde el portal verde (entrada) hasta el rojo (salida). Cada enemigo que escapa resta vidas: 1 los normales/rápidos, 2 los tanques y 5 los jefes. Con 0 vidas, Game Over.
- 4 tipos de torres con rol distinto:
  - **Láser** (50): disparo rápido y barato, buen uso general.
  - **Cañón** (80): proyectil con explosión que daña en área.
  - **Tesla** (110): rayo en cadena que salta hasta 3 enemigos.
  - **Sniper** (120): daño enorme y alcance de toda la mitad del mapa.
- Cada torre mejora hasta **nivel 3** (+60% daño, +12% alcance, +15% cadencia por nivel) y puede **venderse** recuperando el 70% de lo invertido.
- **20 oleadas** con dificultad creciente: más enemigos, aparición de rápidos (oleada 3), tanques (oleada 5) y jefes (oleadas 10 y 20). La vida de los enemigos escala un 26% por oleada.
- Economía: 220 créditos iniciales; cada muerte paga un botín (8-160 según tipo) y cada oleada superada da un bonus creciente. Las torres apuntan siempre al enemigo más adelantado ("first").
- Victoria al superar la oleada 20, con bonus de 50 puntos por vida restante.

## Controles

### Escritorio

- Clic: colocar torre / seleccionar torre · Clic derecho o Esc: cancelar
- 1-4: elegir tipo de torre
- U: mejorar la torre seleccionada · V: venderla
- Enter: iniciar la siguiente oleada
- Espacio o P: pausa / reanudar

### Móvil

- Toca un tipo de torre en la barra inferior y luego una casilla libre
- Toca una torre construida para ver su panel (mejorar / vender)
- Botones ▶ Oleada, ❚❚ (pausa) y ×1/×2 (velocidad) siempre en pantalla

## Arquitectura

Archivo único `index.html` con tres bloques:

- CSS: variables de tema neón, layout Flexbox, barra de construcción con colores por torre, panel de torre superpuesto y modal.
- HTML: barra superior (título + Opciones), HUD (créditos, vidas, oleada, puntuación, récord, estado), canvas, panel de torre, barra de control y modal.
- JavaScript (IIFE en modo estricto):
  - Estados: START, PLAYING, PAUSED, OVER y WIN.
  - Camino definido por waypoints en coordenadas de casilla; de ahí se derivan las casillas bloqueadas, la polyline de flujo animado y el recorrido de los enemigos.
  - Torres con datos declarativos (`TOWER_TYPES`), estadísticas calculadas por nivel, targeting "first" y tres modos de disparo: rayo instantáneo, cadena de Tesla y proyectil teledirigido con explosión en área.
  - Oleadas generadas por composición (`buildWave`) con escalado de vida y velocidad por oleada.
  - Efectos: beams con degradado de vida, anillos de explosión, partículas, popups de créditos y banner de oleada superada.
  - Bucle con `requestAnimationFrame`, `dt` limitado y multiplicador de velocidad ×1/×2.

## Persistencia

- `localStorage` con clave `tower-defense_best_v1` guarda el récord de puntuación
  (la clave antigua `tower_best_v1` se migra automáticamente).
- Acceso envuelto en try/catch para navegadores con almacenamiento bloqueado.
- Sin servidores ni almacenamiento externo.

## Posibles Mejoras

- Música y efectos de sonido con Web Audio API.
-Selector de dificultad y mapas alternativos con caminos distintos.
- Enemigos voladores que ignoren el camino y torres antiaéreas.
- Ralentización, veneno y otros efectos de estado.
- Habilidades globales: bombardeo aéreo, refuerzos de créditos.
- Semillas de oleada infinitas tras la 20 (modo endlesss).
- Modo PWA para jugar sin conexión.

## Estructura del proyecto

```text
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
```