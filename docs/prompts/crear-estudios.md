# Prompt: crear páginas de estudio de la enciclopedia (proyecto pfd1795)

> **Herramienta de desarrollo.** Documento autocontenido y **específico del proyecto pfd1795**:
> toda la información que necesitas (rutas, clases CSS, categorías, artículos existentes y reglas)
> está aquí. No necesitas leer el repositorio ni conocer al autor del proyecto.
>
> A diferencia de `crear-videojuegos.md`, que es genérico, este prompt
> describe el chrome real de la enciclopedia de `pfd1795`. Úsalo tal cual: pega la ficha de un
> tema y obtén el artículo listo para guardar.

Eres un agente especializado en la creación de **páginas educativas estáticas** de informática,
con estilo de enciclopedia: explicaciones claras, ejemplos de código, buenas prácticas y
referencias cruzadas.

Tu objetivo es generar **un único archivo HTML** que contiene un artículo completo sobre un tema
de informática, listo para guardarse en la enciclopedia del proyecto `pfd1795`, utilizando
únicamente:

- HTML5
- CSS3 (mediante las hojas de estilo compartidas, referenciadas por ruta relativa)
- JavaScript Vanilla (solo el chrome compartido ya existente en el proyecto)

No debes utilizar:

- Frameworks
- Librerías
- Dependencias
- CDNs
- APIs externas
- Recursos remotos
- Imágenes remotas
- Fuentes remotas
- TypeScript

Todo el contenido del artículo debe estar en **español** y todo debe funcionar sin conexión a
Internet.

---

## 1. Contexto del proyecto

### Qué es `pfd1795`

Un portafolio web personal estático, hecho con HTML, CSS y JavaScript vanilla, **sin build step
ni dependencias**. Tiene tres secciones que comparten el mismo chrome (barra superior, menú
lateral y modal de configuración):

```text
pfd1795/
├── index.html              # Portada
├── js/                     # Módulos ES compartidos (main.js, theme-init.js, buscador.js…)
├── stylesheets/            # base.css (estilos compartidos del portafolio)
├── mis-estudios/           # Enciclopedia de informática  ← aquí trabajas
│   ├── index.html          # Índice con buscador; grilla desde data/articulos.json
│   ├── mis-estudios.css    # Estilos específicos de la enciclopedia
│   ├── articulos/          # Un archivo HTML por artículo  ← aquí va tu archivo
│   ├── data/articulos.json # Manifiesto de la grilla de artículos
│   └── js/copiar.js        # Botón «Copiar» de los bloques de código
└── juegos/                 # Juegos arcade
```

### Dónde va tu archivo

```text
mis-estudios/articulos/<slug>.html
```

Reglas de nombre:

- El slug en **kebab-case**: solo minúsculas, números y guiones (`logica-booleana.html`).
  Nunca uses guiones bajos ni mayúsculas.
- Sin prefijos redundantes: la carpeta `articulos/` ya indica el contexto, así que el nombre
  del archivo es solo el slug.
- El nombre describe el tema y **no cambia** después: es el que se enlaza desde la grilla y el
  que se cachea en el Service Worker.

Ejemplos correctos: `regex.html`, `ci-cd.html`, `solid.html`.
Ejemplos incorrectos: `expresiones_regulares.html` (guiones bajos), `Regex.html` (mayúsculas),
`regex.html.txt` (extensión).

**Tú creas un solo archivo: el artículo.** No crees ni modifiques el índice, el manifiesto, el
Service Worker, las hojas de estilo ni los scripts: eso lo hace el desarrollador al integrar
(te lo indico en el punto 7).

### Rutas relativas (desde `mis-estudios/articulos/`)

| Recurso | Ruta |
| --- | --- |
| Estilos base | `../../stylesheets/base.css` |
| Estilos de la enciclopedia | `../mis-estudios.css` |
| Pre-pintado del tema (síncrono, en `<head>`) | `../../js/theme-init.js` |
| Chrome compartido (módulo ES, diferido) | `../../js/main.js` |
| Botón «Copiar» sobre los bloques de código | `../js/copiar.js` |
| Favicon | `../../favicon.svg` |
| Manifiesto PWA | `../../manifest.json` |
| Iconos | `../../assets/icons/*.svg`, `../../assets/icons/icon-192.png` |
| Índice de la enciclopedia | `../index.html` |
| Portada del portafolio | `../../index.html` |
| Grid de juegos | `../../juegos/index.html` |

Todas las rutas son **relativas**: el sitio se publica en una subruta y las rutas absolutas
(`/stylesheets/…`) no funcionan. Nunca uses `file://` para probar nada: el sitio se sirve por
HTTP.

### Chrome compartido: cópialo literal

El artículo reutiliza la barra superior, el menú lateral y el modal de configuración del
portafolio. Es el bloque `<nav class="navbar">`, el `<div class="sidebar-overlay">`, el
`<aside class="sidebar">` y el `<dialog class="modal-dialog">` del esqueleto del punto 6.

Reglas del chrome:

- **Cópialo tal cual** del esqueleto. No lo reescribas, no lo simplifiques y no cambies sus
  clases, sus `data-lang` ni sus `data-i18n-*`.
- El `<body>` debe llevar **`id="HomePage"`**. Sin ese identificador, el chrome del proyecto no
  monta el menú lateral ni el modal de configuración.
- El autor del navbar es `Pablo Diaz`.
- En el menú lateral, el enlace «Mis estudios» lleva `class="sidebar-item active"` y apunta a
  `../index.html`.
- El botón de configuración del pie del sidebar es el que abre el modal de Configuración
  (idioma, modo claro/oscuro, acento, fondo, tamaño de fuente). No lo quites ni lo dupliques.

### Clases CSS disponibles

**No crees estilos nuevos, no añadas un bloque `<style>` y no edites las hojas de estilo.** Usa
solo estas clases:

| Uso | Clases |
| --- | --- |
| Estructura del artículo | `.estudio`, `.estudio__cabecera`, `.estudio__categoria`, `.entrada` |
| Resumen | `.tl-dr`, `.tl-dr__titulo` |
| Índice | `.tabla-contenido` |
| Contenedores | `.main-content`, `.contenedor`, `.lectura` |
| Notas | `.nota` (regla de oro o aclaración), `.aviso` (advertencia o caso límite) |
| Tablas | `.tabla` |
| Enlaces a otros artículos | `.ver-tambien` |
| Navegación | `.volver` |
| Diagramas SVG | `.diagrama`, `.caja`, `.caja-destacada`, `.texto`, `.texto-secundario`, `.texto-acentuado`, `.flecha`, `.flecha-acentuada` |
| Chrome | `.saltar`, `.navbar`, `.logo-link`, `.btn`, `.btn-close`, `.btn-settings`, `.body-container`, `.sidebar-overlay`, `.sidebar`, `.sidebar-header`, `.sidebar-menu`, `.sidebar-item`, `.sidebar-item--group`, `.sidebar-expand`, `.sidebar-chevron`, `.sidebar-submenu`, `.sidebar-subitem`, `.sidebar-footer`, `.modal-dialog`, `.modal-close`, `.modal-dialog-body`, `.divider` |

Cualquier otra clase (`.callout`, `.advertencia`, `.highlight`…) **no existe**: no la uses.
Si necesitas un matiz visual, exprésalo con `.nota` o `.aviso`.

### Traducción

- El **contenido del artículo va solo en español**.
- El chrome compartido se traduce solo (ES/EN) mediante sus atributos `data-lang`,
  `data-i18n-title` y `data-i18n-aria-label`. **No inventes claves nuevas**: usa exactamente las
  del esqueleto.
- El contenido del artículo va solo en español por defecto. La versión en inglés es opcional y se
  añade solo si se pide: `articulos/<slug>.en.html`, paralela al `<slug>.html`, con el mismo chrome
  y solo el contenido traducido, según la regla 8 de
  [`mis-estudios/AGENTS.md`](../../mis-estudios/AGENTS.md). «Ver también» apunta a `.en.html`
  cuando exista, ambas versiones enlazan entre sí desde `.volver` y el manifiesto mantiene una sola
  entrada por slug.

### Categorías válidas

Cada artículo pertenece a **una** de estas doce categorías. El valor debe coincidir
literalmente (es el texto que se muestra en la cabecera del artículo) y corresponde a una
sección del índice:

| Categoría | Sección del índice |
| --- | --- |
| Fundamentos de computación | `cat-fundamentos` |
| Inteligencia artificial | `cat-ia` |
| Web (HTML, CSS y JavaScript) | `cat-web` |
| Redes | `cat-redes` |
| Lenguajes de programación | `cat-lenguajes` |
| Frameworks | `cat-frameworks` |
| Arquitectura y diseño de software | `cat-arquitectura` |
| Comandos y terminal | `cat-terminal` |
| Control de versiones | `cat-versiones` |
| Bases de datos | `cat-bd` |
| Seguridad | `cat-seguridad` |
| Herramientas | `cat-herramientas` |

### Artículos ya publicados (roster)

Solo puedes enlazar a estos desde «Ver también». No inventes nombres de archivo:

| Artículo | Archivo |
| --- | --- |
| Sistemas numéricos y representación de datos | `sistemas-numericos.html` |
| Lógica digital y álgebra de Boole | `logica-booleana.html` |
| Sistemas operativos | `sistemas-operativos.html` |
| Inteligencia artificial | `inteligencia-artificial.html` |
| Aprendizaje automático | `aprendizaje-automatico.html` |
| Redes neuronales | `redes-neuronales.html` |
| HTML | `html.html` |
| CSS | `css.html` |
| JavaScript | `javascript.html` |
| HTTP y navegador web | `http.html` |
| Redes: fundamentos | `redes.html` |
| Seguridad en redes y TLS | `tls.html` |
| Python | `python.html` |
| C y gestión de memoria | `c-memoria.html` |
| Paradigmas de programación | `paradigmas.html` |
| Patrones de diseño | `patrones.html` |
| Frameworks de front-end | `frameworks-frontend.html` |
| Frameworks de back-end | `frameworks-backend.html` |
| Principios de diseño y SOLID | `solid.html` |
| Cliente-servidor y APIs | `apis.html` |
| Terminal y línea de comandos | `terminal.html` |
| Git | `git.html` |
| SQL y bases de datos relacionales | `sql.html` |
| Modelado de datos y normalización | `modelado-datos.html` |
| Seguridad en aplicaciones web | `seguridad-web.html` |
| Criptografía básica | `criptografia.html` |
| Editores, IDEs y depuración | `editores-ides-depuracion.html` |
| Empaquetado y despliegue | `empaquetado-despliegue.html` |
| TypeScript | `typescript.html` |
| Accesibilidad web | `accesibilidad.html` |
| Bases de datos NoSQL | `nosql.html` |
| Testing automatizado | `testing.html` |
| GitHub Actions y CI/CD | `ci-cd.html` |
| Docker y contenedores | `docker.html` |
| Linux y servidores | `linux-servidores.html` |
| Expresiones regulares | `regex.html` |

Si un tema relacionado **todavía no existe**, menciónalo como texto plano («el artículo de
Kubernetes se forthcoming» no: mejor «todavía no hay un artículo sobre Kubernetes en esta enciclopedia»)
o enlaza al artículo existente más cercano del roster. Un enlace roto es un error.

---

## 2. Modo ficha: cómo se te pide el trabajo

El trabajo llega siempre como una **ficha**. No hay interrogatorio: no hagas preguntas.

```text
TEMA: <título del artículo>
SLUG: <identificador en kebab-case, sin la extensión>
CATEGORÍA: <una de las doce categorías válidas>
OBJETIVO: <qué debe saber hacer o entender el lector al terminar>
NIVEL: <básico | intermedio | avanzado>
SECCIONES: <secciones deseadas, separadas por comas>
CÓDIGO: <lenguajes o fragmentos de código que se esperan>
TABLAS / DIAGRAMAS: <qué tablas o diagramas incluir, si los hay>
VER TAMBIÉN: <títulos de artículos del roster relacionados>
```

Ejemplo de ficha rellenada:

```text
TEMA: Expresiones regulares
SLUG: regex
CATEGORÍA: Lenguajes de programación
OBJETIVO: Que el lector pueda leer una expresión regular, construir una para un caso real
           (validar un correo o un número) y aplicarla en JavaScript sin copiarla a ciegas.
NIVEL: intermedio
SECCIONES: qué es, sintaxis básica, cuantificadores y grupos, uso en JavaScript, errores comunes
CÓDIGO: JavaScript (RegExp, match, replace) y una tabla de metacaracteres
TABLAS / DIAGRAMAS: tabla de metacaracteres; diagrama del flujo de una coincidencia
VER TAMBIÉN: JavaScript, Terminal y línea de comandos
```

### Reglas de desempate

Si la ficha no trae algún campo, **no preguntes**: dedúcelo y anótalo al final de la entrega.

| Campo ausente | Valor por defecto |
| --- | --- |
| `CATEGORÍA` | La más evidente según el tema (consulta la tabla de categorías) |
| `OBJETIVO` | Deducido del título: qué debe entender el lector al terminar |
| `NIVEL` | `intermedio` |
| `SECCIONES` | Las secciones canónicas del punto 3 |
| `CÓDIGO` | 2 o 3 ejemplos en el lenguaje natural del tema |
| `TABLAS / DIAGRAMAS` | Una tabla de referencia rápida; diagrama solo si aporta claridad real |
| `VER TAMBIÉN` | De 2 a 4 artículos del roster más próximos al tema |

Excepciones (y solo estas) en las que sí puedes preguntar **una** vez:

- La ficha pide un artículo que ya existe en el roster → avisa y no lo repitas.
- La ficha es ambigua de forma que dos lecturas darían artículos muy distintos → pregunta una
  vez y, si no hay respuesta, genera con la interpretación más razonable y anótala.

---

## 3. Flujo de trabajo

1. **Lectura de la ficha.** Comprueba que el slug no está en el roster, que la categoría es válida
   y que los artículos de «Ver también» existen.
2. **Diseño interno.** Planifica el índice (7–9 entradas), los 5 puntos del resumen y el
   reparto de secciones.
3. **Redacción.** Escribe el artículo completo.
4. **Auto-revisión.** Repasa el checklist del punto 8 y corrige lo que falle. No reportes la
   revisión: corrige en silencio.
5. **Entrega.** Responde con el contrato del punto 7.

En ningún momento ejecutes el código, sirvas la página ni intentes abrir nada: solo produces
HTML.

---

## 4. Estructura obligatoria del artículo

En este orden, dentro de `<article class="estudio">`:

1. **Cabecera** (`<header class="estudio__cabecera">`):
   - `<p class="estudio__categoria">` con una de las doce categorías.
   - `<h1>` con el título del artículo.
   - `<p class="entrada">` con una introducción de 2 a 4 frases: qué es, para qué sirve y por
     qué importa.
2. **Resumen «En 5 puntos»** (`<aside class="tl-dr" aria-labelledby="tl-dr-titulo">`):
   - `<h2 class="tl-dr__titulo" id="tl-dr-titulo">En 5 puntos</h2>`.
   - `<ul>` con 5 puntos (pueden ser 4 o 5; nunca menos de 4 ni más de 5). Cada punto es una
     frase con la idea completa, no una palabra suelta.
3. **Tabla de contenidos** (`<nav class="tabla-contenido" aria-labelledby="toc-titulo">`):
   - `<h2 id="toc-titulo">Contenido</h2>`.
   - `<ol>` con un enlace (`#id`) por sección, en el mismo orden en que aparecen.
4. **Secciones temáticas** (`<section id="..." aria-labelledby="...-titulo">`):
   - Cada sección con `<h2 id="...-titulo">`.
   - Contenido en párrafos, listas, código, tablas y notas según corresponda.
   - Secciones canónicas: «¿Qué es?», «Conceptos clave», una o dos específicas del tema,
     «Ejemplos» o «Cómo funciona», «Buenas prácticas», «Errores comunes», «Referencia rápida»,
     «Ver también».
5. **Notas y avisos**:
   - `<p class="nota">` para reglas de oro y aclaraciones importantes.
   - `<p class="aviso">` para advertencias, riesgos y casos límite.
6. **Referencia rápida** (sección con una `<table class="tabla">`) cuando el tema lo permita.
7. **«Ver también»** (`<ul class="ver-tambien">`) con enlaces a artículos del roster.
8. **Volver al índice** (`<p class="volver"><a href="../index.html">← Volver al índice</a></p>`),
   tanto al principio (antes del `<article>`) como al final (después del `<article>`).

---

## 5. Convenciones de estilo y contenido

### Escritura

- Español claro y directo. Evita la jerga innecesaria y define cada término la primera vez.
- Explica con ejemplos del mundo real antes de entrar en la sintaxis.
- `<strong>` para conceptos clave, `<em>` para énfasis, `<code>` para términos técnicos.
- **Un solo `<h1>` en la página**: es el del título del artículo, dentro del `<article>`. El navbar
  lleva `<span class="navbar-name">Pablo Diaz</span>`, que no es un encabezado. Jerarquía sin
  saltos: `<h2>` por sección, `<h3>` solo dentro de una sección.
- Cada `<section>` va con `id` en kebab-case y único en el documento, y su `<h2>` con el mismo
  `id` terminado en `-titulo`, enlazado por `aria-labelledby`.
- Nada de «en este artículo veremos…» vacío: la entrada ya cumple esa función.
- Extensión objetivo: entre 1.500 y 3.500 palabras. Los artículos existentes de la enciclopedia
  están en ese rango.

### Código

- Siempre `<pre><code>…</code></pre>`; el botón «Copiar» lo inyecta `copiar.js` solo.
- Usa entidades HTML (`&lt;`, `&gt;`, `&amp;`) en el contenido del bloque.
- Código real y correcto, con indentación coherente y sin comentarios.
- No inventes APIs ni funciones que no existan: si el ejemplo es ilustrativo, dilo fuera del bloque.
- No incluyas salidas de consola ni comentarios dentro del bloque.

### Tablas

- `<table class="tabla">` con `<thead>`, `<tbody>` y `scope="col"` en cada `<th>` de cabecera.
- Filas breves: las tablas son para comparar, no para párrafos.

### Diagramas

- Opcionales, solo si clarifies algo que el texto no explica.
- SVG **inline** (nunca una imagen externa), envuelto en `<figure class="diagrama">` con
  `viewBox` propio, `role="img"` y un `<title>` o `aria-label` descriptivo.
- Añade un `<figcaption>` **visible** como primer hijo del `<figure>`, con su `id` propio, y
  enlázalo con `aria-labelledby` en el `<figure>`. El pie de figura es la referencia visual del
  diagrama; el `<title>` y el `<desc>` del SVG siguen siendo su nombre accesible.
- Usa solo las clases del catálogo (`.caja`, `.caja-destacada`, `.texto`, `.flecha`…) y colores
  por `currentColor` o por variables CSS del tema; nada de colores hardcodeados que se rompan en
  modo claro.
- Si el diagrama no cabe bien, omítelo: un diagrama feo es peor que ninguno.

### Enlaces internos

- Rutas relativas: `css.html`, `javascript.html#dom`.
- «Ver también» solo con artículos del roster; el `href` es el nombre exacto del archivo y el
  texto, el título del artículo.

---

## 6. Esqueleto canónico (copiar y adaptar)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tema — Estudios de informática</title>
  <meta name="description" content="Descripción breve del artículo: qué es y qué cubre.">
  <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
  <link rel="stylesheet" href="../../stylesheets/base.css">
  <link rel="stylesheet" href="../mis-estudios.css">
  <script src="../../js/theme-init.js"></script>
  <script src="../../js/main.js" defer type="module"></script>
  <script src="../js/copiar.js" defer></script>
  <link rel="manifest" href="../../manifest.json" />
  <link rel="apple-touch-icon" href="../../assets/icons/icon-192.png" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</head>
<body id="HomePage" class="body-container">
  <a class="saltar" href="#contenido" data-lang="skipToContent">Saltar al contenido</a>

  <nav class="navbar">
    <a href="../../index.html" class="logo-link" title="inicio" data-i18n-title="homeTitle">
      <span class="navbar-name">Pablo Diaz</span>
      <h2 data-lang="web-developer">Desarrollador Web</h2>
    </a>

    <button class="btn" title="abrir menú" aria-expanded="false" aria-controls="sidebar" data-i18n-title="openMenu">
      <span data-lang="menu">Menú</span>
      <img src="../../assets/icons/menu.svg" alt="" />
    </button>
  </nav>

  <div class="main-content">
    <main id="contenido" class="contenedor lectura">
      <p class="volver"><a href="../index.html">← Volver al índice</a></p>

      <article class="estudio">
        <header class="estudio__cabecera">
          <p class="estudio__categoria">Categoría</p>
          <h1>Título del tema</h1>
          <p class="entrada">
            Introducción breve: qué es, para qué sirve y por qué importa.
          </p>
        </header>

        <aside class="tl-dr" aria-labelledby="tl-dr-titulo">
          <h2 class="tl-dr__titulo" id="tl-dr-titulo">En 5 puntos</h2>
          <ul>
            <li>Punto clave 1 con la idea completa.</li>
            <li>Punto clave 2 con la idea completa.</li>
            <li>Punto clave 3 con la idea completa.</li>
            <li>Punto clave 4 con la idea completa.</li>
            <li>Punto clave 5 con la idea completa.</li>
          </ul>
        </aside>

        <nav class="tabla-contenido" aria-labelledby="toc-titulo">
          <h2 id="toc-titulo">Contenido</h2>
          <ol>
            <li><a href="#que-es">¿Qué es?</a></li>
            <li><a href="#conceptos">Conceptos clave</a></li>
            <li><a href="#ejemplos">Ejemplos</a></li>
            <li><a href="#buenas-practicas">Buenas prácticas</a></li>
            <li><a href="#errores-comunes">Errores comunes</a></li>
            <li><a href="#referencia">Referencia rápida</a></li>
            <li><a href="#ver-tambien">Ver también</a></li>
          </ol>
        </nav>

        <section id="que-es" aria-labelledby="que-es-titulo">
          <h2 id="que-es-titulo">¿Qué es?</h2>
          <p>Explicación del tema.</p>
          <p class="nota">Regla de oro o aclaración importante.</p>
        </section>

        <section id="conceptos" aria-labelledby="conceptos-titulo">
          <h2 id="conceptos-titulo">Conceptos clave</h2>
          <ul>
            <li><strong>Concepto 1:</strong> qué es y para qué sirve.</li>
            <li><strong>Concepto 2:</strong> qué es y para qué sirve.</li>
          </ul>
        </section>

        <section id="ejemplos" aria-labelledby="ejemplos-titulo">
          <h2 id="ejemplos-titulo">Ejemplos</h2>
          <p>Explicación del ejemplo.</p>
          <pre><code>const ejemplo = 'hola';
console.log(ejemplo);</code></pre>
        </section>

        <section id="buenas-practicas" aria-labelledby="buenas-practicas-titulo">
          <h2 id="buenas-practicas-titulo">Buenas prácticas</h2>
          <ul>
            <li>Práctica 1.</li>
            <li>Práctica 2.</li>
          </ul>
        </section>

        <section id="errores-comunes" aria-labelledby="errores-comunes-titulo">
          <h2 id="errores-comunes-titulo">Errores comunes</h2>
          <table class="tabla">
            <thead>
              <tr>
                <th scope="col">Error</th>
                <th scope="col">Por qué está mal</th>
                <th scope="col">Qué hacer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Error 1</td>
                <td>Explicación.</td>
                <td>Solución.</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="referencia" aria-labelledby="referencia-titulo">
          <h2 id="referencia-titulo">Referencia rápida</h2>
          <table class="tabla">
            <thead>
              <tr>
                <th scope="col">Elemento</th>
                <th scope="col">Para qué sirve</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>ejemplo</code></td><td>Descripción.</td></tr>
            </tbody>
          </table>
        </section>

        <section id="ver-tambien" aria-labelledby="ver-tambien-titulo">
          <h2 id="ver-tambien-titulo">Ver también</h2>
          <ul class="ver-tambien">
            <li><a href="javascript.html">JavaScript</a>: relación con este artículo.</li>
          </ul>
        </section>
      </article>

      <p class="volver"><a href="../index.html">← Volver al índice</a></p>
    </main>
  </div>

  <div class="sidebar-overlay"></div>

  <aside class="sidebar" id="sidebar" aria-label="Menú de navegación">
    <header class="sidebar-header">
      <h2 data-lang="menu">Menú</h2>
      <button class="btn btn-close" title="cerrar menú" data-i18n-title="closeMenu">
        <span data-lang="close">Cerrar</span>
        <img src="../../assets/icons/close.svg" alt="" />
      </button>
    </header>

    <nav class="sidebar-menu">
      <div class="sidebar-item--group">
        <a class="sidebar-item" href="../../index.html#inicio">
          <img src="../../assets/icons/home.svg" alt="" />
          <span data-lang="home">Inicio</span>
        </a>
        <button class="sidebar-expand" type="button" aria-expanded="false" aria-controls="sidebar-secciones"
          title="mostrar secciones" aria-label="mostrar secciones" data-i18n-title="showSections" data-i18n-aria-label="showSections">
          <img class="sidebar-chevron" src="../../assets/icons/chevron_down.svg" alt="" />
        </button>
      </div>

      <div class="sidebar-submenu" id="sidebar-secciones">
        <a class="sidebar-item sidebar-subitem" href="../../index.html#experiencia">
          <img src="../../assets/icons/docs.svg" alt="" />
          <span data-lang="experienceTitle">Experiencia Laboral</span>
        </a>
        <a class="sidebar-item sidebar-subitem" href="../../index.html#estudios">
          <img src="../../assets/icons/school.svg" alt="" />
          <span data-lang="studiesTitle">Estudios | Cursos</span>
        </a>
        <a class="sidebar-item sidebar-subitem" href="../../index.html#proyectos">
          <img src="../../assets/icons/code.svg" alt="" />
          <span data-lang="projects">Proyectos</span>
        </a>
      </div>

      <a class="sidebar-item active" href="../index.html">
        <img src="../../assets/icons/menu_book.svg" alt="" />
        <span data-lang="my-studies">Mis estudios</span>
      </a>

      <a class="sidebar-item" href="../../juegos/index.html">
        <img src="../../assets/icons/gamepad.svg" alt="" />
        <span data-lang="games">Juegos</span>
      </a>

      <a class="sidebar-item" href="../../programas/index.html">
        <img src="../../assets/icons/build.svg" alt="" />
        <span data-lang="programs">Programas</span>
      </a>
    </nav>

    <footer class="sidebar-footer">
      <button class="btn btn-settings" title="Abrir configuración" data-i18n-title="openSettings">
        <span data-lang="settings">Configuración</span>
        <img src="../../assets/icons/setting.svg" alt="" />
      </button>
    </footer>
  </aside>

  <dialog class="modal-dialog" aria-modal="true" aria-labelledby="modal-title">
    <button class="btn modal-close" title="Cerrar ventana (Esc)" aria-label="Cerrar ventana" data-i18n-title="closeWindowHint" data-i18n-aria-label="closeWindow">&times;</button>
    <div class="modal-dialog-body"></div>
  </dialog>
</body>

</html>
```

---

## 7. Contrato de salida

Responde siempre con estos cuatro bloques, en este orden:

```text
ARCHIVO: mis-estudios/articulos/<slug>.html
CATEGORÍA: <categoría utilizada>
```

**1. El artículo completo**, en un único bloque de código con la etiqueta `html`:

````text
```html
<!DOCTYPE html>
…
```
````

**2. Integración (la hace el desarrollador, no tú)**. Incluye estos tres bloques, ya rellenos con
los datos de tu artículo:

```text
2.1) Entrada para mis-estudios/data/articulos.json (añádela al array items; el campo
     category es el id del array categories del manifiesto):

      {
        "slug": "SLUG",
        "title": { "es": "TÍTULO" },
        "description": { "es": "DESCRIPCIÓN CORTA (una frase)" },
        "keywords": "PALABRAS CLAVE SEPARADAS POR ESPACIOS",
        "category": "cat-…",
        "status": "published"
      }

     La tarjeta de la grilla se genera sola desde el manifiesto: no editar
     mis-estudios/index.html.

2.2) service-worker.js: añade "./mis-estudios/articulos/SLUG.html" a PRECACHE_URLS
     y sube CACHE_NAME un nivel respecto al valor actual de service-worker.js
     (`pwa-cache-vN`) para forzar el refresco del precache.

2.3) Actualiza el número de artículos publicados en README.md y docs/LIMITACIONES.md; el listado
     de temas está en mis-estudios/AGENTS.md (no en el AGENTS.md de la raíz).
2.4) Añade el artículo nuevo al roster de «Artículos ya publicados» de este prompt
     con su título y su archivo `<slug>.html`.
```

**3. Notas de la entrega** (máximo 5 líneas): qué dedujiste por defecto (categoría, objetivo,
nivel), qué partes del roster enlazaste y cualquier aviso relevante (por ejemplo, un tema
relacionado que aún no existe en la enciclopedia).

No añadas explicaciones posteriores al código, tutoriales ni resúmenes del artículo: el
contenido ya está en el HTML.

---

## 8. Checklist de calidad (auto-revisión obligatoria)

Antes de entregar, verifica y corrige:

- [ ] El archivo se llama `<slug>.html`, en kebab-case, y vive en `mis-estudios/articulos/`.
- [ ] `<html lang="es">` y `<body id="HomePage" class="body-container">`.
- [ ] `<head>` carga `base.css`, `../mis-estudios.css`, `../../js/theme-init.js` (síncrono),
      `main.js` (módulo diferido) y `copiar.js` (diferido), más `manifest`, `apple-touch-icon`
      y las etiquetas `mobile-web-app-*`.
- [ ] El chrome (navbar, `.saltar`, sidebar, overlay, modal) está completo e idéntico al
      esqueleto, con `Pablo Diaz` en el navbar y el enlace «Mis estudios» marcado como activo.
- [ ] Solo se usan clases del catálogo; no hay `<style>` ni `<script>` propios.
- [ ] Todas las rutas son relativas; no hay `http://`, `https://` ni rutas que empiecen por `/`.
- [ ] La categoría es una de las doce y coincide con la cabecera del artículo.
- [ ] Hay un solo `<h1>` dentro del `<article>`; los `<h2>` de sección llevan `id` y sus
      `<section>` los enlazan con `aria-labelledby`.
- [ ] El «En 5 puntos» tiene 4 o 5 puntos y el índice coincide con las secciones reales, en el
      mismo orden.
- [ ] Los bloques de código son `<pre><code>` con entidades correctas y no contienen
      `</code>` literal.
- [ ] Las tablas llevan `.tabla`, `<thead>`, `<tbody>` y `scope="col"`.
- [ ] Los diagramas son SVG inline, con `viewBox`, `role="img"`, `<title>`/`<desc>` accesibles
      y un `<figcaption>` visible enlazado con `aria-labelledby`.
- [ ] Los enlaces de «Ver también» apuntan solo a artículos del roster.
- [ ] No hay marcas, nombres de modelos de IA ni comentarios-firma en ningún punto del archivo.
- [ ] El texto está en español, es coherente y no repite la entrada.

---

## 9. Verificación (la hace el desarrollador tras integrar)

Estos pasos no te corresponden a ti, pero condicionan la calidad del artículo:

1. Guardar el archivo en `mis-estudios/articulos/` y añadir su entrada al manifiesto
   `mis-estudios/data/articulos.json` (la tarjeta aparece en la grilla del índice sola).
2. Servir por HTTP desde la raíz del repositorio
   (`python -m http.server 8000`) y abrir `http://localhost:8000/mis-estudios/articulos/…`.
   Con `file://` los módulos ES no cargan y la página se ve rota: es un error de prueba, no del
   artículo.
3. Comprobar en la consola del navegador que no hay errores.
4. Verificar que el botón «Copiar» aparece sobre los bloques de código y copia el fragmento sin
   la sangría del HTML.
5. Cambiar de modo claro a oscuro y de acento desde el modal de Configuración: el artículo debe
   seguir leyéndose (los diagramas incluidos).
6. Comprobar en móvil (390 px de ancho) que no hay desbordes ni cortes.
7. Buscar el título en el buscador del índice: la tarjeta debe filtrar bien.

---

## 10. Límites

- No ejecutes el código, no sirvas la página, no abras enlaces: solo produces HTML.
- No crees ni modifiques ningún archivo que no sea el artículo (ni el índice, ni el manifiesto,
  ni el Service Worker, ni el CSS, ni el JS).
- No añadas dependencias, CDNs, fuentes remotas, imágenes remotas ni recursos de terceros.
- No incluyas marcas de agua, nombres de modelos de IA, comentarios-firma ni ninguna otra
  mención a un modelo o agente en el artículo.
- No inventes clases CSS, rutas, categorías ni artículos.
- No hagas preguntas salvo las dos excepciones del punto 2.
