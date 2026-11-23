/* ==========================================================================
   fnProgramas.js — genera la grilla de programas y herramientas desde su
   manifiesto (programas/data/herramientas.json).

   El esquema es el mismo que el de juegos.json y articulos.json: raíz con
   `version`, `categories` (id + label {es}) e `items` (slug, title,
   description, keywords, category, icon, technologies, status). Las URLs de
   las herramientas no van en el manifiesto: se construyen como
   `herramientas/<slug>.html` y abren en pestaña nueva.

   También genera los chips de filtro (.filtro) a partir de las categorías.
   El contenido del manifiesto es solo en español (regla de la sección), pero
   las etiquetas de UI se toman de `translations.page[lang]`. Solo se muestran
   las entradas con slug válido; un error al editar el manifiesto no rompe la
   página.
   ========================================================================== */

import data from '../../../programas/data/herramientas.json' with { type: 'json' };
import translations from '../../lang/translations.json' with { type: 'json' };
import { currentLanguage } from '../../lang/translations.config.js';
import { ICONS_URL } from '../../utils/assets.js';

const SLUG_PATTERN = /^[a-z0-9-]+$/;

function getText(value, lang) {
  if (typeof value === 'string') return value;

  return value?.[lang] ?? value?.es ?? '';
}

/* Escapa el texto del manifiesto para inyectarlo como HTML o atributo. */
function esc(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function filtrarItemsValidos() {
  return (data.items ?? []).filter((item) => {
    if (!SLUG_PATTERN.test(item.slug ?? '')) {
      console.warn(`[programas] Slug inválido: "${item.slug}"`);
      return false;
    }

    return true;
  });
}

function Card(item, lang, texts, etiquetaCategoria) {
  const title = getText(item.title, lang);
  const description = getText(item.description, lang);
  const keywords = item.keywords ?? '';
  const technologies = Array.isArray(item.technologies) ? item.technologies : [];
  const icon = item.icon ?? 'code.svg';
  const div = document.createElement('div');

  div.className = 'programa-card';
  div.setAttribute('data-titulo', title);
  div.setAttribute('data-descripcion', description);
  div.setAttribute('data-claves', keywords);
  div.setAttribute('data-categoria', item.category ?? '');

  div.innerHTML = `
    <div class="programa-card__cabecera">
      <img class="programa-card__icono" src="${ICONS_URL}${esc(icon)}" alt="" />
      <h3 class="programa-card__titulo">${esc(title)}</h3>
    </div>

    <p class="programa-card__descripcion">${esc(description)}</p>

    <div class="programa-card__meta">
      <span class="programa-card__categoria">${esc(etiquetaCategoria)}</span>
      ${technologies.length ? `
        <div class="programa-card__tech">
          ${technologies.map((tech) => `<span>${esc(tech)}</span>`).join('')}
        </div>
      ` : ''}
    </div>

    ${item.status === 'published'
      ? `
        <a class="btn programa-card__abrir" href="./herramientas/${esc(item.slug)}.html" target="_blank" rel="noopener noreferrer"
          title="${esc(title)} — ${esc(texts.openInNewTab)}">
          <span>${esc(texts.openTool)}</span>
          <img src="${ICONS_URL}arrow_right.svg" alt="" />
        </a>
        <p class="programa-card__nota">${esc(texts.openInNewTab)}</p>
      `
      : `<p class="programa-card__estado">${esc(texts.comingSoon)}</p>`}
  `;

  return div;
}

function ChipsFiltro(categorias, lang, texts) {
  const chips = document.createElement('div');

  chips.className = 'filtros';
  chips.setAttribute('role', 'group');
  chips.setAttribute('aria-label', texts.filterByCategory);
  chips.innerHTML = `
    <button class="filtro active" type="button" data-categoria="todas" aria-pressed="true">${esc(texts.allCategories)}</button>
    ${categorias.map((categoria) => `
      <button class="filtro" type="button" data-categoria="${esc(categoria.id)}" aria-pressed="false">${esc(getText(categoria.label, lang))}</button>
    `).join('')}
  `;

  return chips;
}

function Categoria(categoria, items, lang, texts) {
  const label = getText(categoria.label, lang);
  const section = document.createElement('section');

  section.className = 'categoria';
  section.setAttribute('aria-labelledby', categoria.id);
  section.innerHTML = `
    <h2 id="${esc(categoria.id)}">${esc(label)}</h2>
    <ul class="lista-programas"></ul>
  `;

  const lista = section.querySelector('ul');

  /* Cada tarjeta va envuelta en <li>: los hijos válidos de una lista son
     siempre <li>, y el buscador (buscador.js) oculta/muestra por <li>. */
  items
    .filter((item) => item.category === categoria.id)
    .forEach((item) => {
      const li = document.createElement('li');

      li.appendChild(Card(item, lang, texts, label));
      lista.appendChild(li);
    });

  return section;
}

export function GridProgramas() {
  const grid = document.querySelector('.programas-grid');

  if (!grid) return;

  const lang = currentLanguage;
  const texts = translations.page[lang] ?? translations.page.es;
  const items = filtrarItemsValidos();
  const categorias = data.categories ?? [];
  const categoriaActiva = grid.querySelector('.filtro.active')?.getAttribute('data-categoria') ?? 'todas';

  grid.innerHTML = '';
  grid.appendChild(ChipsFiltro(categorias, lang, texts));
  categorias.forEach((categoria) => grid.appendChild(Categoria(categoria, items, lang, texts)));

  if (categoriaActiva !== 'todas') {
    const chipActivo = Array.from(grid.querySelectorAll('.filtro'))
      .find((chip) => chip.getAttribute('data-categoria') === categoriaActiva);

    (chipActivo ?? grid.querySelector('.filtro'))?.click();
  }
}

export function reloadProgramasContent() {
  GridProgramas();
}
