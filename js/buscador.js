/* ==========================================================================
   buscador.js — filtrado en vivo de las tarjetas de las grillas del sitio.

   Script clásico (no módulo, se carga con `defer` desde <head>). Es único
   para todas las secciones y se configura por data-attributes del input
   #buscador de cada página:

     - data-buscador-tarjetas    → selector de las tarjetas de la grilla
                                   (p. ej. ".estudio-card" o ".programa-card").
     - data-buscador-placeholder → texto del placeholder con los contadores;
                                   {visibles} y {total} se sustituyen al
                                   filtrar (p. ej. "... (N de M estudios)").

   Busca en los atributos data-titulo, data-descripcion, data-claves y
   data-categoria de cada tarjeta (los que falten se ignoran). Si la página
   define chips .filtro con data-categoria, filtra además por categoría vía
   delegación sobre document, así sobreviven a los re-renders de la grilla.
   Usa #sin-resultados como mensaje vacío. Un MutationObserver re-cuenta
   cuando la grilla se renderiza dinámicamente desde su manifiesto JSON.
   Si la página no tiene #buscador, no hace nada.
   ========================================================================== */

(function () {
  'use strict';

  var SELECTOR_FILTRO = '.filtro';
  var SELECTOR_CATEGORIA = '.categoria';

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

    var selectorTarjetas = campo.getAttribute('data-buscador-tarjetas') || '.estudio-card';
    var textoPlaceholder = campo.getAttribute('data-buscador-placeholder') ||
      'buscador: titulo, descripcion o palabra clave ({visibles} de {total})';
    var mensaje = document.getElementById('sin-resultados');

    /* Evita que pulsar Intro recargue la página con ?q=... en la URL. */
    if (campo.form) {
      campo.form.addEventListener('submit', function (evento) {
        evento.preventDefault();
      });
    }

    var categoriaActiva = 'todas';

    function filtrar() {
      var consulta = normalizar(campo.value);
      var tarjetas = Array.prototype.slice.call(document.querySelectorAll(selectorTarjetas));
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

        /* Se oculta el <li> contenedor para que no quede hueco en la rejilla. */
        var item = tarjeta.closest('li') || tarjeta;
        var visible = coincideTexto && coincideCategoria;
        item.hidden = !visible;

        if (visible) {
          visibles += 1;
        }
      });

      /* Una categoría sin tarjetas visibles se oculta entera (título incluido).
         Se mide por las tarjetas que la contienen (no por sus <li>), así
         funciona tanto con tarjetas envueltas en <li> como directas. */
      Array.prototype.forEach.call(document.querySelectorAll(SELECTOR_CATEGORIA), function (categoria) {
        var visible = Array.prototype.some.call(
          categoria.querySelectorAll(selectorTarjetas),
          function (tarjeta) {
            var item = tarjeta.closest('li') || tarjeta;

            return !item.hidden;
          }
        );
        categoria.hidden = !visible;
      });

      campo.placeholder = textoPlaceholder
        .replace('{visibles}', String(visibles))
        .replace('{total}', String(tarjetas.length));

      if (mensaje) {
        mensaje.hidden = visibles !== 0;
      }
    }

    /* Chips de categoría por delegación sobre document: los listeners siguen
       funcionando aunque la grilla (y sus chips) se re-rendericen. */
    document.addEventListener('click', function (evento) {
      if (!(evento.target instanceof Element)) {
        return;
      }

      var filtro = evento.target.closest(SELECTOR_FILTRO);
      if (!filtro) {
        return;
      }

      categoriaActiva = filtro.getAttribute('data-categoria') || 'todas';
      Array.prototype.forEach.call(document.querySelectorAll(SELECTOR_FILTRO), function (f) {
        var activo = f === filtro;

        f.classList.toggle('active', activo);
        f.setAttribute('aria-pressed', String(activo));
      });
      filtrar();
    });

    campo.addEventListener('input', filtrar);

    /* Las grillas renderizadas desde manifiestos rellenan el DOM después de
       DOMContentLoaded; el observer dispara el primer conteo correcto. */
    if (window.MutationObserver) {
      var debounceTimer = null;
      new MutationObserver(function () {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(filtrar, 50);
      }).observe(document.body, { childList: true, subtree: true });
    }

    filtrar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
