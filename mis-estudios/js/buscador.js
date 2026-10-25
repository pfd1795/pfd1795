/* ==========================================================================
   buscador.js — filtrado en vivo de los estudios del índice.

   No carga datos externos: lee los atributos data-titulo, data-descripcion y
   data-claves de cada .estudio-card, que ya están en el HTML. Si la página no
   tiene buscador (por ejemplo, una página de estudio) no hace nada.
   ========================================================================== */

(function () {
  'use strict';

  /* Pasa a minúsculas y quita tildes para que "aplicacion" encuentre "aplicación". */
  function normalizar(texto) {
    return (texto || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function iniciar() {
    var campo = document.getElementById('buscador');
    if (!campo) {
      return;
    }

    var contador = document.getElementById('contador');
    var mensaje = document.getElementById('sin-resultados');

    /* Evita que pulsar Intro recargue la página con ?q=... en la URL. */
    if (campo.form) {
      campo.form.addEventListener('submit', function (evento) {
        evento.preventDefault();
      });
    }

    var tarjetas = Array.prototype.slice.call(document.querySelectorAll('.estudio-card'));
    var categorias = Array.prototype.slice.call(document.querySelectorAll('.categoria'));
    var total = tarjetas.length;

    function filtrar() {
      var consulta = normalizar(campo.value);
      var visibles = 0;

      tarjetas.forEach(function (tarjeta) {
        var texto = normalizar([
          tarjeta.getAttribute('data-titulo'),
          tarjeta.getAttribute('data-descripcion'),
          tarjeta.getAttribute('data-claves')
        ].join(' '));

        var coincide = consulta === '' || texto.indexOf(consulta) !== -1;

        /* Se oculta el <li> contenedor para que no quede hueco en la rejilla. */
        var item = tarjeta.closest('li') || tarjeta;
        item.hidden = !coincide;

        if (coincide) {
          visibles += 1;
        }
      });

      /* Una categoría sin estudios visibles se oculta entera (título incluido). */
      categorias.forEach(function (categoria) {
        var visible = Array.prototype.some.call(
          categoria.querySelectorAll('li'),
          function (item) { return !item.hidden; }
        );
        categoria.hidden = !visible;
      });

      if (contador) {
        contador.textContent = 'Mostrando ' + visibles + ' de ' + total + ' estudios.';
      }

      if (mensaje) {
        mensaje.hidden = visibles !== 0;
      }
    }

    campo.addEventListener('input', filtrar);
    filtrar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
