# Portafolio web de Pablo Diaz

Portafolio personal, enciclopedia de informática y colección de juegos arcade desarrollados con **HTML, CSS y JavaScript vanilla**, sin frameworks ni build step. El sitio es estático y se publica en GitHub Pages.

**Producción:** https://pfd1795.github.io/pfd1795/

## Características

- Portada con grillas de experiencia, estudios y proyectos generadas desde `scripts/lang/translations.json`.
- Menú lateral con navegación por secciones, submenú desplegable y scrollspy.
- Pie de página con las tecnologías que construyeron el sitio, la firma de los agentes de IA que colaboraron y los créditos de los iconos.
- Modal de configuración con idioma (ES/EN), tamaño de fuente, modo claro/oscuro, color de acento (seis colores en dos filas de tres, junto a la etiqueta), tema de fondo (diez opciones en tres columnas, junto a la etiqueta), dirección del degradado (siete iconos en tres columnas, junto a la etiqueta) y velocidad.
- Preferencias de tema persistidas en `localStorage` y aplicadas antes del primer pintado; el idioma se restaura al cargar la página.
- Enciclopedia de informática en `pages/my-studies/`, con buscador y 42 artículos publicados; la grilla se genera desde `pages/my-studies/data/articulos.json`.
- Colección de 20 juegos arcade en `pages/my-games/`, con buscador y una grilla generada desde `pages/my-games/data/juegos.json`.
- Sección de programas y herramientas en `pages/my-programs/`, con buscador y grilla generada desde `pages/my-programs/data/herramientas.json` y tarjetas de herramientas propias (web, Linux, Windows, CLI, DevOps).
- Cada juego es una página autocontenida con Canvas 2D, controles táctiles y récord en `localStorage`; se abre en la misma pestaña y se vuelve a la grilla con «Atrás». La guía para agregar juegos está en [`pages/my-games/README.md`](./pages/my-games/README.md).
- La enciclopedia comparte el tema, las traducciones de la interfaz y el modal de configuración con el portafolio.
- Accesibilidad: salto al contenido, tarjetas de estudios operables por teclado, foco gestionado en el menú lateral y avisos anunciados a lectores de pantalla.
- Aplicación instalable (PWA): el sitio puede instalarse como app y funciona offline gracias a un Service Worker que precachea el sitio publicado, incluidas las versiones en inglés de los artículos.

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
├── manifest.json           # Manifiesto PWA
├── service-worker.js       # Caché para funcionamiento offline
├── favicon.svg             # Icono del sitio
├── docs/                   # Documentación organizada (índice y herramientas de desarrollo)
├── pages/                  # Secciones del sitio
│   ├── my-studies/         # Enciclopedia de informática (<slug>/index.html, data/articulos.json, mis-estudios.css)
│   ├── my-games/           # Grilla y juegos arcade (data/juegos.json, juegos.css; ver pages/my-games/README.md)
│   └── my-programs/        # Programas y herramientas (<slug>/index.html, data/herramientas.json, programas.css)
├── scripts/                     # Módulos ES6, theme-init, buscador y controladores de la interfaz
├── stylesheets/            # CSS compartido: base.css y portada.css
├── assets/                 # Imágenes, iconos y CV
└── .github/workflows/      # Despliegue en GitHub Pages
```

La guía técnica detallada, las convenciones y las limitaciones conocidas están en [`AGENTS.md`](./AGENTS.md).

La documentación organizada del proyecto está en [`docs/README.md`](./docs/README.md). Los apuntes de onboarding para desarrolladores humanos están en [`docs/HUMANOS.md`](./docs/HUMANOS.md) (bajo demanda).

## Juegos

La página [`pages/my-games/index.html`](./pages/my-games/index.html) muestra una grilla con los juegos publicados. Cada tarjeta abre el
juego en la misma pestaña; los juegos son páginas independientes para no mezclar su Canvas y sus
controles con el chrome del portafolio. Se vuelve a la grilla con el botón «Atrás» del navegador.

Para agregar un juego nuevo, sigue la guía [`pages/my-games/README.md`](./pages/my-games/README.md). El resumen es:

1. Copiar la carpeta a `pages/my-games/<slug>/`.
2. Renombrar su documentación a `README-juego.md`.
3. Añadir la entrada en `pages/my-games/data/juegos.json`.
4. Probar por HTTP y actualizar la documentación.

## Despliegue

GitHub Actions publica en GitHub Pages en cada push a `main` (`.github/workflows/static.yml`). La acción
prepara una copia filtrada del sitio: publica HTML, CSS, JS, iconos e imágenes (incluidos los juegos y la
enciclopedia) y excluye el material interno (CV en `assets/files/`, documentación y plantilla de juegos).

## Limitaciones

- Sitio completamente estático: sin backend, API, autenticación ni base de datos.
- Sin tests automatizados, linting ni build; la única automatización es el despliegue.
- Requiere un servidor HTTP local para funcionar.
- Pensado para navegadores modernos (módulos ES, CSS nesting, `<dialog>`).
- La interfaz está traducida a español e inglés; los juegos y el contenido de la enciclopedia están en español, con versiones en inglés opcionales artículo por artículo (`index.en.html`). Las cadenas de UI y las grillas de juegos y programas se traducen ES/EN; los títulos y descripciones de artículos y herramientas no se traducen.
- Varias herramientas de la sección Programas están marcadas como "Próximamente".

Las limitaciones técnicas verificadas están en [`docs/LIMITACIONES.md`](./docs/LIMITACIONES.md). Las tareas abiertas se siguen en [`docs/informes/trabajo-pendiente.md`](./docs/informes/trabajo-pendiente.md).

## Contacto

- **Portafolio:** https://pfd1795.github.io/pfd1795/
- **LinkedIn:** https://www.linkedin.com/in/pfd-dev/
- **GitHub:** https://github.com/pfd1795
- **Email:** pfd1795@gmail.com

## Uso

El código es libre, aunque la información personal del autor está protegida y no puede utilizarse para fines externos.
