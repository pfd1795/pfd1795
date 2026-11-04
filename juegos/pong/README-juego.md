# Pong Neón

## Descripción

Juego arcade Pong para un jugador contra una CPU. El objetivo es devolver la
pelota con la pala y ser el primero en alcanzar 7 puntos.

## Mecánicas

- La pelota rebota en los bordes superior e inferior y en ambas palas.
- El ángulo de rebote depende del lugar donde la pelota golpea la pala.
- La pelota aumenta su velocidad gradualmente durante el intercambio.
- La CPU sigue la pelota con velocidad limitada.
- La partida termina cuando el jugador o la CPU llega a 7 puntos.
- El récord del jugador se conserva localmente.

## Controles

### Escritorio

- W / S o ↑ / ↓: mover la pala del jugador.
- Ratón: mover la pala siguiendo el cursor.
- Espacio o Enter: iniciar, lanzar o volver a jugar.
- P o Esc: pausar o reanudar.

### Móvil

- Arrastra el dedo verticalmente por el tablero para mover la pala.
- Toca la pantalla para iniciar o lanzar.

## Arquitectura

Juego de archivo único: HTML, CSS y JavaScript Vanilla dentro de `index.html`.
La partida se dibuja con Canvas 2D. El DOM se utiliza para la cabecera, el
marcador, el botón de opciones y su ventana modal.

Estados implementados: inicio, juego, pausa, derrota y victoria. El bucle
principal usa `requestAnimationFrame`; la física y los controles están
implementados en JavaScript sin dependencias externas.

## Persistencia

`localStorage` guarda el récord en la clave `pong_best_v1` (la clave antigua
`pong_neon_best` se migra automáticamente). Si el almacenamiento no está
disponible, la partida sigue funcionando.

## Posibles Mejoras

- Modo local para dos jugadores.
- Selección de dificultad y velocidad.
- Efectos de sonido y música.
- Más diseños de cancha y opciones visuales.