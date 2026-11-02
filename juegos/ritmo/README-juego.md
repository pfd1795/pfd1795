# Pixel Riff — Juego de ritmo arcade

## Descripción

Juego de ritmo inspirado en Guitar Hero: las notas bajan por 4 carriles y hay
que pulsarlas cuando alcanzan la línea de impacto. Toda la música se genera
en tiempo real con la Web Audio API (chiptune 8-bit): la melodía suena solo
cuando aciertas, la batería y el bajo son el acompañamiento automático.

Incluye 3 canciones de dominio público: Oda a la Alegría (Beethoven),
Estrellita (tradicional) y Für Elise (Beethoven). Sin dependencias, sin
recursos externos: HTML5 + CSS3 + JavaScript Vanilla + Canvas 2D.

## Mecánicas

- Objetivo: terminar la canción con la mayor cantidad de aciertos. Nunca
  se pierde: la canción siempre llega al final.
- Juicios: PERFECTO (±50 ms, 100 pts) y BIEN (±100 ms, 50 pts). Fuera de
  ventana = FALLO (0 pts, rompe el combo).
- Multiplicador: x1 → x2 (combo 10) → x3 (combo 20) → x4 (combo 30).
- El carril de cada nota depende de la altura del tono: graves a la
  izquierda, agudos a la derecha.
- Rango final según precisión: S (≥95%), A (≥85%), B (≥70%), C (≥50%), D.
- Récord de puntuación, precisión y rango guardados por canción.

## Controles

### Escritorio
- D F J K o flechas (← ↓ ↑ →): pulsar notas
- ESC o P: pausa / reanudar
- ENTER / ESPACIO: confirmar
- ↑ ↓: elegir canción

### Móvil
- Botones táctiles de colores (D F J K) en la parte inferior
- También se puede tocar directamente cada carril en el lienzo
- Botón ⏸ PAUSA en la barra superior

## Arquitectura

Todo el proyecto vive en `index.html` (HTML + CSS + JS). Secciones del código:

1. Constantes y utilidades
2. Canciones (datos de melodía) y generador de charts
3. AudioEngine: síntesis Web Audio (melodía, bajo, batería, efectos)
4. Persistencia en localStorage
5. Estado del juego y máquina de estados: title → select → playing →
   paused → results
6. Lienzo y renderizado Canvas 2D (480×720 lógicos, escalado con DPR)
7. Lógica: detección de aciertos con ventanas de tiempo, combos, fallos
8. HUD DOM (barra secundaria) + modal de opciones
9. Entrada: teclado, pointer events y botones táctiles multitouch
10. Bucle principal con requestAnimationFrame

La pausa usa `AudioContext.suspend()`, que congela el reloj de audio y el
juego a la vez. El acompañamiento se programa con un planificador de
anticipación (lookahead de 0,28 s) sincronizado al reloj de audio.

## Persistencia

Clave `pixelriff_records_v1` en `localStorage`: un objeto JSON con el récord
de cada canción (puntuación, precisión y rango). Sin servidores ni
almacenamiento externo.

## Estructura del proyecto

```text
proyecto/
├── index.html
├── README-juego.md
├── assets/          (sprites/, sounds/, fonts/, ui/ — reservados)
├── docs/
│   └── ideas-futuras.md
└── backups/