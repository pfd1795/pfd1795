/* ==========================================================================
   copiar.js — botón «Copiar» en los bloques de código de los estudios.

   Recorre los <pre><code> de la página, coloca un botón sobre cada uno y
   copia su contenido con navigator.clipboard (con respaldo para navegadores
   antiguos). Antes de copiar quita la sangría común del HTML para que el
   texto copiado sea útil tal cual. Si la página no tiene bloques de código
   no hace nada. No carga datos externos.
   ========================================================================== */

(function () {
  'use strict';

  /* Los bloques llevan la sangría del HTML que los contiene; se computa la
     línea menos indentada y se elimina de todas para copiar el código limpio. */
  function quitarSangria(texto) {
    var lineas = texto.replace(/\r\n/g, '\n').replace(/\s+$/, '').split('\n');
    var sangrias = lineas
      .filter(function (linea) { return linea.trim(); })
      .map(function (linea) { return linea.match(/^[ \t]*/)[0].length; });
    if (!sangrias.length) {
      return lineas.join('\n');
    }
    var sangria = Math.min.apply(null, sangrias);
    if (sangria === 0) {
      return lineas.join('\n');
    }
    return lineas.map(function (linea) {
      return linea.slice(sangria);
    }).join('\n');
  }

  function copiar(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(texto).then(function () {
        return true;
      }, function () {
        return copiarRespaldo(texto);
      });
    }
    return Promise.resolve(copiarRespaldo(texto));
  }

  /* Respaldo clásico para cuando navigator.clipboard no existe o falla. */
  function copiarRespaldo(texto) {
    var area = document.createElement('textarea');
    area.value = texto;
    area.setAttribute('readonly', '');
    area.style.position = 'absolute';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (error) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  function iniciar() {
    var bloques = document.querySelectorAll('main pre > code');
    if (!bloques.length) {
      return;
    }

    Array.prototype.forEach.call(bloques, function (codigo) {
      var pre = codigo.parentElement;
      var boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'btn-copiar';
      boton.textContent = 'Copiar';

      var aviso = document.createElement('span');
      aviso.setAttribute('aria-live', 'polite');
      aviso.className = 'copiar__aviso';
      boton.appendChild(aviso);

      boton.addEventListener('click', function () {
        var ok = copiar(quitarSangria(codigo.textContent));
        Promise.resolve(ok).then(function (exito) {
          var texto = exito ? 'Copiado' : 'No se pudo copiar';
          aviso.textContent = texto;
          window.setTimeout(function () {
            aviso.textContent = '';
          }, 2000);
        });
      });

      pre.style.position = 'relative';
      pre.appendChild(boton);
    });
  }

  if (document.readyState !== 'loading') {
    iniciar();
  } else {
    document.addEventListener('DOMContentLoaded', iniciar);
  }
})();
