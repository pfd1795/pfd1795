/* ==========================================================================
   tema.js — aplica el tema guardado antes del primer pintado (subpáginas).

   La enciclopedia comparte las preferencias del portafolio guardadas en
   localStorage con las mismas claves que javascripts/utils/storage.js:
     - "theme-mode"         → "dark" | "light"   (por defecto "dark")
     - "theme-color-value"  → variante oscura del acento, p. ej. "hsl(210 75% 28%)"
     - "theme-background"   → tema de fondo (default | blue | ... | multicolor)
     - "gradient-direction" → dirección del degradado
     - "psychedelic-speed"  → velocidad del modo multicolor
     - "font-scale"         → escala tipográfica (0.85 | 1 | 1.15)

   Se carga de forma síncrona en <head> para aplicar la clase y las variables
   antes de pintar y evitar el parpadeo. No incluye controles propios: el tema
   se cambia desde el modal de Configuración del portafolio (la propia página
   también carga javascripts/main.js, que gestiona los controles). Si el tema
   se cambia en otra pestaña del mismo sitio, se refleja aquí (evento
   "storage"). La portada usa javascripts/theme-init.js con la misma lógica.
   ========================================================================== */

(function () {
  'use strict';

  var CLAVE_MODO = 'theme-mode';
  var CLAVE_ACENTO = 'theme-color-value';
  var CLAVE_FONDO = 'theme-background';
  var CLAVE_DIRECCION = 'gradient-direction';
  var CLAVE_VELOCIDAD = 'psychedelic-speed';
  var CLAVE_ESCALA = 'font-scale';

  var MODO_POR_DEFECTO = 'dark';
  var FONDO_POR_DEFECTO = 'default';
  var DIRECCION_POR_DEFECTO = 'topToBottom';
  var VELOCIDAD_POR_DEFECTO = 'normal';
  var ESCALA_POR_DEFECTO = 1;

  var TEMAS = ['default', 'blue', 'red', 'green', 'amber', 'cyan', 'pink', 'violet', 'orange', 'multicolor'];
  var DIRECCIONES = ['topToBottom', 'bottomToTop', 'leftToRight', 'rightToLeft', 'inside', 'outside', 'solid'];
  var DURACIONES = { lento: '180s', normal: '30s', rapido: '10s' };
  var ESCALAS = [0.85, 1, 1.15];

  var ARCOIRIS = 'linear-gradient(90deg, var(--red-normal), var(--amber-normal), ' +
    'var(--green-normal), var(--cyan-normal), var(--blue-normal), ' +
    'var(--violet-normal), var(--pink-normal), var(--red-normal))';

  var raiz = document.documentElement;

  function leer(clave) {
    try {
      return window.localStorage.getItem(clave);
    } catch (error) {
      /* localStorage puede estar bloqueado (modo privado, file://, etc.). */
      return null;
    }
  }

  function esColorValido(valor) {
    return Boolean(valor) && Boolean(window.CSS) && CSS.supports('color', valor);
  }

  /* Deriva la variante clara del acento a partir de la oscura guardada
     (misma saturación, luminosidad al 70%, como la variante "soft" del
     portafolio). Si el formato no coincide, devuelve el valor sin cambios. */
  function aclarar(valor) {
    return valor.replace(
      /hsl\(\s*([\d.]+)\s+([\d.]+)%\s+[\d.]+%\s*\)/i,
      'hsl($1 $2% 70%)'
    );
  }

  function aplicarModo() {
    /* Modo claro/oscuro: se fija en <html> para que esté listo antes de
       pintar; root.css admite tanto `html.dark` como `body.dark`. */
    var modo = leer(CLAVE_MODO) || MODO_POR_DEFECTO;

    raiz.classList.toggle('dark', modo !== 'light');
    raiz.classList.toggle('light', modo === 'light');
  }

  function aplicarAcento() {
    /* Acento: variables inline en <html>. Sin valor válido se recuperan los
       defaults definidos en stylesheets/root.css. */
    var acento = leer(CLAVE_ACENTO);

    if (!esColorValido(acento)) {
      raiz.style.removeProperty('--theme-color');
      raiz.style.removeProperty('--theme-color-soft');
      return;
    }

    raiz.style.setProperty('--theme-color', acento);

    var acentoClaro = aclarar(acento);

    if (acentoClaro !== acento && esColorValido(acentoClaro)) {
      raiz.style.setProperty('--theme-color-soft', acentoClaro);
    } else {
      raiz.style.removeProperty('--theme-color-soft');
    }
  }

  function construirDegradado(tema, direccion) {
    var inicio = 'var(--' + tema + '-oscuro)';
    var fin = 'var(--neutral-background-soft)';

    if (direccion === 'bottomToTop') return 'linear-gradient(0deg, ' + inicio + ', ' + fin + ')';
    if (direccion === 'leftToRight') return 'linear-gradient(90deg, ' + inicio + ', ' + fin + ')';
    if (direccion === 'rightToLeft') return 'linear-gradient(270deg, ' + inicio + ', ' + fin + ')';
    if (direccion === 'inside') return 'radial-gradient(circle at center, ' + fin + ', ' + inicio + ')';
    if (direccion === 'outside') return 'radial-gradient(circle at center, ' + inicio + ', ' + fin + ')';
    if (direccion === 'solid') return 'none';

    return 'linear-gradient(180deg, ' + inicio + ', ' + fin + ')';
  }

  function aplicarFondo() {
    var tema = leer(CLAVE_FONDO) || FONDO_POR_DEFECTO;

    if (TEMAS.indexOf(tema) === -1) tema = FONDO_POR_DEFECTO;

    var direccion = leer(CLAVE_DIRECCION) || DIRECCION_POR_DEFECTO;

    if (DIRECCIONES.indexOf(direccion) === -1) direccion = DIRECCION_POR_DEFECTO;

    var velocidad = leer(CLAVE_VELOCIDAD) || VELOCIDAD_POR_DEFECTO;
    var duracion = DURACIONES[velocidad] || DURACIONES[VELOCIDAD_POR_DEFECTO];
    var estilo = raiz.style;

    raiz.classList.toggle('has-page-theme', tema !== 'default');

    if (tema === 'default') {
      estilo.setProperty('--page-background', 'var(--color-background)');
      estilo.setProperty('--page-gradient', 'none');
      estilo.setProperty('--page-background-size', 'cover');
      estilo.setProperty('--page-background-repeat', 'no-repeat');
      estilo.setProperty('--page-animation', 'none');
      return;
    }

    if (tema === 'multicolor') {
      estilo.setProperty('--page-background', 'var(--dn100)');
      estilo.setProperty('--page-gradient', ARCOIRIS);
      estilo.setProperty('--page-background-size', '400% 100%');
      estilo.setProperty('--page-background-repeat', 'repeat-x');
      estilo.setProperty('--page-animation', 'page-rainbow ' + duracion + ' linear infinite');
      return;
    }

    estilo.setProperty('--page-background', 'var(--bg-theme-' + tema + ')');
    estilo.setProperty('--page-gradient', construirDegradado(tema, direccion));
    estilo.setProperty('--page-background-size', 'cover');
    estilo.setProperty('--page-background-repeat', 'no-repeat');
    estilo.setProperty('--page-animation', 'none');
  }

  function aplicarEscala() {
    var valor = parseFloat(leer(CLAVE_ESCALA));

    if (ESCALAS.indexOf(valor) === -1) valor = ESCALA_POR_DEFECTO;

    raiz.style.setProperty('--font-scale', String(valor));
  }

  aplicarModo();
  aplicarAcento();
  aplicarFondo();
  aplicarEscala();

  /* Refleja los cambios de tema/acento/fondo/fuente hechos en otra pestaña. */
  window.addEventListener('storage', function (evento) {
    if (evento.key === CLAVE_MODO) aplicarModo();
    if (evento.key === CLAVE_ACENTO) aplicarAcento();
    if (evento.key === CLAVE_FONDO || evento.key === CLAVE_DIRECCION || evento.key === CLAVE_VELOCIDAD) {
      aplicarFondo();
    }
    if (evento.key === CLAVE_ESCALA) aplicarEscala();
  });
})();
