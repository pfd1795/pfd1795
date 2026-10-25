# Portafolio web de Pablo Diaz

Portafolio personal y enciclopedia de informática desarrollados con **HTML, CSS y JavaScript vanilla**, sin frameworks ni build step. El sitio es estático y se publica en GitHub Pages.

**Producción:** https://pfd1795.github.io/pfd1795/

## Características

- Portada con grillas de experiencia, estudios y proyectos generadas desde `javascripts/lang/translations.json`.
- Menú lateral con navegación por secciones, submenú desplegable y scrollspy.
- Modal de configuración con idioma (ES/EN), modo claro/oscuro, color de acento, tema de fondo, dirección del degradado, velocidad y tamaño de fuente.
- Preferencias de tema persistidas en `localStorage` y aplicadas antes del primer pintado; el idioma se restaura al cargar la página.
- Enciclopedia de informática en `mis-estudios/`, con buscador y contenido educativo estático.
- La enciclopedia comparte el tema, las traducciones de la interfaz y el modal de configuración con el portafolio.

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
├── mis-estudios/           # Enciclopedia de informática
├── javascripts/            # Módulos ES6 y lógica de la interfaz
├── stylesheets/            # Estilos y sistema de diseño
├── assets/                 # Imágenes, iconos y CV
└── .github/workflows/      # Despliegue en GitHub Pages
```

La guía técnica detallada, las convenciones y las limitaciones conocidas están en [`AGENTS.md`](./AGENTS.md).

## Despliegue

GitHub Actions publica el contenido del repositorio en GitHub Pages en cada push a `main` (`.github/workflows/static.yml`). No requiere configuración adicional.

## Limitaciones

- Sitio completamente estático: sin backend, API, autenticación ni base de datos.
- Sin tests automatizados, linting ni build; la única automatización es el despliegue.
- Requiere un servidor HTTP local para funcionar.
- Pensado para navegadores modernos (módulos ES, CSS nesting, `<dialog>`, `IntersectionObserver`).
- La interfaz está traducida a español e inglés, pero el contenido de la enciclopedia solo está en español y algunas cadenas aún no están conectadas al sistema de traducciones.
- Varias secciones de la enciclopedia están marcadas como “Próximamente”.
- La imagen del proyecto de la portada se carga desde Unsplash.

Los detalles técnicos y la deuda pendiente se documentan en [`AGENTS.md`](./AGENTS.md#limitaciones-y-problemas-conocidos).

## Contacto

- **Portafolio:** https://pfd1795.github.io/pfd1795/
- **LinkedIn:** https://www.linkedin.com/in/pfd-dev/
- **GitHub:** https://github.com/pfd1795
- **Email:** pfd1795@gmail.com

## Uso

El código es libre, aunque la información personal del autor está protegida y no puede utilizarse para fines externos.
