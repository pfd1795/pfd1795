# Ta Te Ti — 3 en Raya · Arcade Neón

## Descripción

Clásico Ta Te Ti (tres en raya) contra la CPU. Tú juegas con X y siempre
comienzas cada partida. Gana quien logre alinear tres marcas en horizontal,
vertical o diagonal.

## Mecánicas

- Tablero de 3x3 con alternancia de turnos entre jugador y CPU.
- La CPU intenta ganar si tiene línea abierta, bloquea tus amenazas y prefiere
  el centro y las esquinas, pero comete errores ocasionales para que sea
  posible vencerla.
- La línea ganadora se ilumina en amarillo al terminar la ronda.
- Si el tablero se completa sin ganador, la ronda termina en empate.
- El contador de victorias totales se conserva entre sesiones.

## Controles

- Ratón o toque: pulsar la casilla donde quieras colocar la X.
- Teclado: teclas 1 a 9 (disposición como el teclado numérico: 1 arriba a la
  izquierda, 9 abajo a la derecha).
- Enter o Espacio: iniciar, reanudar o jugar otra vez.
- P o Esc: pausar y reanudar.

## Requisitos técnicos

- HTML5, CSS3, JavaScript Vanilla y Canvas 2D.
- Sin frameworks, bibliotecas, CDNs ni recursos externos.
- Funciona sin conexión y se adapta a escritorio y móvil.

## Arquitectura

Juego de archivo único: HTML, CSS y JavaScript Vanilla dentro de `index.html`.
El tablero, las marcas, la línea ganadora y los menús de estado se dibujan con
Canvas 2D; el DOM se usa para la cabecera, el marcador y el modal de opciones.
Estados implementados: inicio, juego, pausa, victoria, derrota y empate. El
bucle principal usa `requestAnimationFrame`.

## Persistencia

`localStorage` guarda el total de victorias en la clave `ta-te-ti_best_v1` (la
clave antigua `tateti_neon_record` se migra automáticamente). Si el
almacenamiento no está disponible, el juego sigue funcionando.

## Posibles Mejoras

- Modo local para dos jugadores.
- Selección de dificultad (CPU perfecta con minimax).
- Estadísticas de empates y rachas.
- Efectos de sonido y animaciones de las marcas.