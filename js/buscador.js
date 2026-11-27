/* ==========================================================================
   buscador.js — filtrado en vivo de las tarjetas de las grillas del sitio.

   Script clásico (no módulo, se carga con `defer` desde <head>). Es único
   para todas las secciones y se configura por data-attributes del input
   #buscador de cada página:

     - data-buscador-tarjetas    → selector de las tarjetas de la grilla
                                   (p. ej. ".estudio-card" o ".programa-card").
     - data-buscador-placeholder → texto del placeholder (p. ej. "Buscar estudios").

   Busca en los atributos data-titulo, data-descripcion, data-claves y
   data-categoria de cada tarjeta (los que falten se ignoran). Usa
   #sin-resultados como mensaje vacío. Un MutationObserver vuelve a filtrar
   cuando la grilla se renderiza dinámicamente desde su manifiesto JSON.
   Si la página no tiene #buscador, no hace nada.
   ========================================================================== */

(function () {
  'use strict';

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
    var mensaje = document.getElementById('sin-resultados');

    /* Evita que pulsar Intro recargue la página con ?q=... en la URL. */
    if (campo.form) {
      campo.form.addEventListener('submit', function (evento) {
        evento.preventDefault();
      });
    }

    /* La grilla se llena desde el manifiesto después de DOMContentLoaded. Se
       observa solo su contenedor, derivado del prefijo del selector de
       tarjetas, para no reaccionar a cambios ajenos a la grilla. */
    function contenedorDeTarjetas() {
      var raiz = campo.closest('main') || document.documentElement;
      var prefijo = selectorTarjetas.replace(/^\./, '').replace(/-card$/, '');
      var grids = Array.prototype.slice.call(raiz.querySelectorAll('[class$="-grid"]'));

      return grids.find(function (grid) {
        return grid.className.indexOf(prefijo) !== -1;
      }) || raiz;
    }

    function filtrar() {
      var consulta = normalizar(campo.value);
      var tarjetas = Array.prototype.slice.call(document.querySelectorAll(selectorTarjetas));

      /* Grilla aún vacía: es carga del manifiesto, no "sin resultados". */
      if (tarjetas.length === 0) {
        if (mensaje) {
          mensaje.hidden = true;
        }
        return;
      }

      tarjetas.forEach(function (tarjeta) {
        var texto = normalizar([
          tarjeta.getAttribute('data-titulo'),
          tarjeta.getAttribute('data-descripcion'),
          tarjeta.getAttribute('data-claves'),
          tarjeta.getAttribute('data-categoria')
        ].join(' '));

        var visible = consulta === '' || texto.indexOf(consulta) !== -1;

        /* Se oculta el <li> contenedor para que no quede hueco en la rejilla. */
        var item = tarjeta.closest('li') || tarjeta;
        item.hidden = !visible;
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

      var visibles = tarjetas.filter(function (tarjeta) {
        var item = tarjeta.closest('li') || tarjeta;

        return !item.hidden;
      }).length;

      if (mensaje) {
        mensaje.hidden = visibles !== 0;
      }
    }

    campo.addEventListener('input', filtrar);

    document.addEventListener('site:languagechange', function () {
      campo.placeholder = campo.getAttribute('data-buscador-placeholder') || campo.placeholder;
      filtrar();
    });

    /* Las grillas renderizadas desde manifiestos rellenan el DOM después de
       DOMContentLoaded; el observer dispara el primer filtrado. */
    if (window.MutationObserver) {
      var debounceTimer = null;
      new MutationObserver(function () {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(filtrar, 50);
      }).observe(contenedorDeTarjetas(), { childList: true, subtree: true });
    }

    filtrar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
