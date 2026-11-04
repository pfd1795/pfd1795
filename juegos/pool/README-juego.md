# Pixel Pool 8 — Billar arcade

## Descripción

Billar 8-ball arcade en vista superior: hundir las 15 bolas con un número
limitado de tiros. La raqueta se genera aleatoriamente en cada partida
(la bola 8 siempre en el centro). Física de colisiones elásticas, bandas
con rebote y 6 troneras. Sin dependencias: HTML5 + CSS3 + JavaScript
Vanilla + Canvas 2D, funciona offline en escritorio y móvil.

## Mecánicas

- Objetivo: embocar las 15 bolas. La bola 8 debe caer SIEMPRE la última.
- Condición de derrota: quedarse sin tiros, o hundir la bola 8 antes
  de despejar el resto (GAME OVER con el motivo).
- Condición de victoria: despejar la mesa con la 8 al final (¡VICTORIA!).
- Tiros: se empieza con 25 (máximo acumulable 35). Cada bola embocada
  regala +1 tiro.
- Puntuación: 100 × posición del combo (1ª bola del tiro = 100,
  2ª = 200, 3ª = 300...). Bonus final de victoria: tiros restantes × 50.
- Falta: embocar la blanca resta 100 puntos y se repone en su punto.
- Récord de puntuación guardado en localStorage.

## Controles

### Escritorio
- Ratón: pulsar, arrastrar (estilo tirachinas: se dispara en dirección
  contraria al arrastre) y soltar para golpear. La potencia depende de
  la distancia de arrastre.
- ESC o P: pausa / reanudar
- ENTER / ESPACIO: confirmar · ESC en resultados: menú

### Móvil
- Arrastrar con el dedo sobre el lienzo y soltar
- Tocar la pantalla para continuar en pausa
- Botón ⏸ PAUSA en la barra superior

## Arquitectura

Todo el proyecto vive en `index.html` (HTML + CSS + JS). Secciones:

1. Constantes (mesa, troneras, física, reglas) y utilidades
2. Estado del juego y máquina de estados: title → playing → paused →
   victory / gameover
3. Persistencia en localStorage
4. AudioEngine: síntesis Web Audio (choque de bolas, banda, tronera,
   golpe de taco, menú)
5. Bolas y raqueta aleatoria (la 8 fija en el centro de la 3ª fila)
6. Física: sub-pasos adaptativos (evitan el efecto túnel), fricción
   exponencial + lineal, colisiones elásticas de masas iguales, rebote
   en bandas con zonas de tronera desactivadas, captura por distancia
   y red de seguridad anti-escape
7. Lógica de tiro y reglas: combos, faltas, reposición de la blanca,
   bonus, fin de partida
8. Apuntado tipo tirachinas con guía: raycast contra bolas y bandas,
   bola fantasma, dirección de la bola objetivo, taco y medidor
9. Renderizado Canvas 2D (480×720 lógicos, escalado con DPR)
10. HUD DOM + modal de opciones · Entrada unificada con Pointer Events
11. Bucle principal con requestAnimationFrame

La pausa congela la simulación (no hay audio programado, así que no
hace falta suspender el AudioContext).

## Persistencia

Clave `pool_best_v1` en `localStorage`: `{ "best": puntuación }`. La clave
antigua `pixelpool_records_v1` se migra automáticamente la primera vez que se
abre el juego. Sin servidores ni almacenamiento externo.

## Estructura del proyecto

```text
proyecto/
├── index.html
├── README-juego.md
├── assets/          (sprites/, sounds/, fonts/, ui/ — reservados)
├── docs/
│   └── ideas-futuras.md
└── backups/