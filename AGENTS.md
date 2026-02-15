# AGENTS.md - Guía para Agentes de Código

## Descripción del Proyecto

Portafolio web personal desarrollado con HTML, CSS y JavaScript vanilla. Sitio estático desplegado en GitHub Pages.

**URL de producción:** https://pfd1795.github.io/pfd1795/

---

## Comandos

### Desarrollo Local

No requiere build. Para ejecutar localmente:

```bash
# Opción 1: Abrir directamente
open index.html

# Opción 2: Servidor local simple
python -m http.server 8000
npx serve .
```

### Despliegue

Automático via GitHub Actions en push a `main` (`.github/workflows/static.yml`).

---

## Estructura del Proyecto

```
├── index.html              # Entrada principal
├── javascripts/            # Módulos ES6
│   ├── main.js            # Punto de entrada
│   ├── controllers/       # Controladores de UI
│   ├── utils/             # Utilidades
│   └── lang/              # Internacionalización
├── stylesheets/           # CSS
│   ├── style.css          # Estilos globales
│   ├── root.css           # Variables CSS
│   ├── reset.css          # Reset de estilos
│   ├── components/        # Componentes
│   ├── pages/             # Estilos por página
│   └── ui/                # Componentes UI
└── assets/                # Imágenes e iconos
```

---

## Estilo de Código

### JavaScript

- **Módulos ES6**: Usar `import`/`export` (type="module")
- **Comillas**: Simples para strings (`'texto'`)
- **Punto y coma**: Siempre al final de sentencias
- **Indentación**: 2 espacios
- **Funciones**: Preferir arrow functions para callbacks
- **Variables**: Usar `const`, `let` solo cuando sea necesario
- **Nullish**: Usar optional chaining (`?.`) para elementos DOM

```javascript
// Correcto
import { fn } from './utils.js';

const element = document.querySelector('.class');
element?.addEventListener('click', () => {
  console.log('clicked');
});
```

### CSS

- **Metodología**: BEM-like (`.block-element--modifier`)
- **Variables**: Usar sistema de diseño en `root.css`
- **Nesting**: Permitido (CSS moderno nativo)
- **Comentarios**: Secciones con `/* ===== Nombre ===== */`
- **Unidades**: `rem` para texto, `em` para componentes, `px` para breakpoints
- **Responsive**: Mobile-first con `@media (min-width: 768px)`

```css
/* Correcto */
.my-component {
  padding: var(--space-4);
  font-size: var(--text-base);
  
  @media (min-width: 768px) {
    padding: var(--space-8);
  }
  
  &.active {
    background: var(--theme-color);
  }
}
```

### HTML

- **Comillas**: Dobles para atributos (`"value"`)
- **Idioma**: Atributo `lang="es"` en `<html>`
- **Accesibilidad**: Alt text en imágenes, atributos `title` en links
- **Scripts**: Usar `defer type="module"`
- **SEO**: Meta tags descripción y keywords incluidos

```html
<!-- Correcto -->
<script src="./javascripts/main.js" defer type="module"></script>
<img src="./assets/image.png" alt="Descripción" loading="lazy" />
```

---

## Patrones de Diseño

### JavaScript

- **Controladores**: Funciones export default que inicializan componentes
- **Utils**: Funciones puras exportadas nombradas
- **DOM**: Verificar existencia antes de manipular (`if (element)`)
- **Eventos**: Usar delegation cuando sea posible

### CSS

- **Temas**: Variables `--theme-color` cambia dinámicamente
- **Modo oscuro**: Clase `.dark` en body-container
- **Transiciones**: Usar variables `--transition-normal`, `--ease-in-out`

---

## Internacionalización

- Idioma principal: Español (UI)
- Código: Inglés
- Configuración en `javascripts/lang/translations.config.js`
- Traducciones en `javascripts/lang/translations.json`

---

## Consideraciones

- **Sin frameworks**: Vanilla JS/CSS únicamente
- **Sin build step**: Archivos servidos directamente
- **GitHub Pages**: Despliegue automático desde rama `main`
- **Performance**: Usar `loading="lazy"` en imágenes
- **Compatibilidad**: CSS nesting requiere navegadores modernos

---

## Notas Importantes

- No modificar la información personal del desarrollador
- Mantener compatibilidad con GitHub Pages (rutas relativas)
- El sitio es completamente estático (sin backend)
