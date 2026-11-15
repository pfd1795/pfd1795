/* ==========================================================================
   buscador.js — filtrado en vivo de los programas del índice.

   Lee los atributos data-titulo, data-descripcion, data-claves y data-categoria
   de cada .programa-card, que ya están en el HTML. Si la página no tiene
   buscador (por ejemplo, una futura página de programa) no hace nada.
   También gestiona los chips de filtro por categoría (.filtro).
   ========================================================================== */

(function () {
  'use strict';

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

    var mensaje = document.getElementById('sin-resultados');

    if (campo.form) {
      campo.form.addEventListener('submit', function (evento) {
        evento.preventDefault();
      });
    }

    var tarjetas = Array.prototype.slice.call(document.querySelectorAll('.programa-card'));
    var categorias = Array.prototype.slice.call(document.querySelectorAll('.categoria'));
    var filtros = Array.prototype.slice.call(document.querySelectorAll('.filtro'));
    var total = tarjetas.length;

    var categoriaActiva = 'todas';

    function filtrar() {
      var consulta = normalizar(campo.value);
      var visibles = 0;

      tarjetas.forEach(function (tarjeta) {
        var texto = normalizar([
          tarjeta.getAttribute('data-titulo'),
          tarjeta.getAttribute('data-descripcion'),
          tarjeta.getAttribute('data-claves'),
          tarjeta.getAttribute('data-categoria')
        ].join(' '));

        var coincideTexto = consulta === '' || texto.indexOf(consulta) !== -1;
        var coincideCategoria = categoriaActiva === 'todas' ||
          tarjeta.getAttribute('data-categoria') === categoriaActiva;

        var item = tarjeta.closest('li') || tarjeta;
        var visible = coincideTexto && coincideCategoria;
        item.hidden = !visible;

        if (visible) {
          visibles += 1;
        }
      });

      categorias.forEach(function (categoria) {
        var visible = Array.prototype.some.call(
          categoria.querySelectorAll('li'),
          function (item) { return !item.hidden; }
        );
        categoria.hidden = !visible;
      });

      campo.placeholder = 'buscador programas: titulo, descripcion o palabra clave (' + visibles + ' de ' + total + ' programas)';

      if (mensaje) {
        mensaje.hidden = visibles !== 0;
      }
    }

    filtros.forEach(function (filtro) {
      filtro.addEventListener('click', function () {
        categoriaActiva = filtro.getAttribute('data-categoria') || 'todas';
        filtros.forEach(function (f) {
          f.classList.toggle('active', f === filtro);
        });
        filtrar();
      });
    });

    campo.addEventListener('input', filtrar);
    filtrar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();