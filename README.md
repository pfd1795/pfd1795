# Portafolio web de Pablo Diaz

Portafolio personal, enciclopedia de informática y colección de juegos arcade desarrollados con **HTML, CSS y JavaScript vanilla**, sin frameworks ni build step. El sitio es estático y se publica en GitHub Pages.

**Producción:** https://pfd1795.github.io/pfd1795/

## Características

- Portada con grillas de experiencia, estudios y proyectos generadas desde `javascripts/lang/translations.json`.
- Menú lateral con navegación por secciones, submenú desplegable y scrollspy.
- Modal de configuración con idioma (ES/EN), modo claro/oscuro, color de acento, tema de fondo, dirección del degradado, velocidad y tamaño de fuente.
- Preferencias de tema persistidas en `localStorage` y aplicadas antes del primer pintado; el idioma se restaura al cargar la página.
- Enciclopedia de informática en `mis-estudios/`, con buscador y 21 artículos publicados (varios temarios siguen "Próximamente").
- Colección de 20 juegos arcade en `juegos/`, con una grilla generada desde `javascripts/data/juegos.json`.
- Cada juego es una página autocontenida con Canvas 2D, controles táctiles y récord en `localStorage`; se abre en una pestaña nueva.- La guía para agregar juegos está en [`juegos/README.md`](./juegos/README.md).
- La enciclopedia comparte el tema, las traducciones de la interfaz y el modal de configuración con el portafolio.
- Accesibilidad: salto al contenido, tarjetas de estudios operables por teclado, foco gestionado en el menú lateral y avisos anunciados a lectores de pantalla.
- Aplicación instalable (PWA): el sitio puede instalarse como app y funciona offline gracias a un Service Worker que precachea todo el contenido.

## Ejecución local

No hay que instalar dependencias ni ejecutar un build. Sirve el directorio por HTTP:

```bash
# Opción 1
python -m http.server 8000

# Opción 2
npx serve .
```

Luego abre `http://localhost:8000/`.

> **Importante:** no abras `index.html` directamente con `file://`. Los módulos ES y la importación de JSON quedan bloqueados por CORS y la página no se renderiza correctamente.

## Estructura

```text
├── index.html              # Portada
├── docs/                   # Documentación organizada (índice y herramientas de desarrollo)
├── mis-estudios/           # Enciclopedia de informática
├── juegos/                 # Grilla y juegos arcade (ver juegos/README.md)
├── javascripts/            # Módulos ES6 y lógica de la interfaz
├── stylesheets/            # CSS: base compartida + estilos de cada página
├── assets/                 # Imágenes, iconos y CV
└── .github/workflows/      # Despliegue en GitHub Pages
```

La guía técnica detallada, las convenciones y las limitaciones conocidas están en [`AGENTS.md`](./AGENTS.md).

La documentación organizada del proyecto está en [`docs/README.md`](./docs/README.md).

## Juegos

La página [`juegos/index.html`](./juegos/index.html) muestra una grilla con los juegos publicados. Cada tarjeta abre el
juego en una pestaña nueva; los juegos son páginas independientes para no mezclar su Canvas y sus
controles con el chrome del portafolio.

Para agregar un juego nuevo, sigue la guía [`juegos/README.md`](./juegos/README.md). El resumen es:

1. Copiar la carpeta a `juegos/<slug>/`.
2. Renombrar su documentación a `README-juego.md`.
3. Añadir la entrada en `javascripts/data/juegos.json`.
4. Probar por HTTP y actualizar la documentación.

## Despliegue

GitHub Actions publica en GitHub Pages en cada push a `main` (`.github/workflows/static.yml`). La acción
prepara una copia filtrada del sitio: publica HTML, CSS, JS, iconos e imágenes (incluidos los juegos y la
enciclopedia) y excluye el material interno (CV en `assets/files/`, documentación y plantilla de juegos).

## Limitaciones

- Sitio completamente estático: sin backend, API, autenticación ni base de datos.
- Sin tests automatizados, linting ni build; la única automatización es el despliegue.
- Requiere un servidor HTTP local para funcionar.
- Pensado para navegadores modernos (módulos ES, CSS nesting, `<dialog>`, `IntersectionObserver`).
- La interfaz está traducida a español e inglés; el contenido de la enciclopedia y de los juegos solo está en español, mientras que las tarjetas de la grilla se traducen ES/EN.
- Varias secciones de la enciclopedia están marcadas como "Próximamente".

Los detalles técnicos y la deuda pendiente se documentan en [`AGENTS.md`](./AGENTS.md#limitaciones-y-problemas-conocidos).

## Contacto

- **Portafolio:** https://pfd1795.github.io/pfd1795/
- **LinkedIn:** https://www.linkedin.com/in/pfd-dev/
- **GitHub:** https://github.com/pfd1795
- **Email:** pfd1795@gmail.com

## Uso

El código es libre, aunque la información personal del autor está protegida y no puede utilizarse para fines externos.
