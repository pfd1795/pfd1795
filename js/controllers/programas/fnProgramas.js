/* ==========================================================================
   fnProgramas.js — genera la grilla de programas y herramientas desde su
   manifiesto (programas/data/herramientas.json).

   El esquema es el mismo que el de juegos.json y articulos.json: raíz con
   `version`, `categories` (id + label {es}) e `items` (slug, title,
   description, keywords, category, icon, technologies, status). Las URLs de
   las herramientas no van en el manifiesto: se construyen como
   `herramientas/<slug>.html` y abren en pestaña nueva.

   También genera los chips de filtro (.filtro) a partir de las categorías.
   El contenido es solo en español (regla de la sección), así que el render
   usa el idioma actual con fallback a `es`. Solo se muestran las entradas
   con slug válido; un error al editar el manifiesto no rompe la página.
   ========================================================================== */

import data from '../../../programas/data/herramientas.json' with { type: 'json' };
import { currentLanguage } from '../../lang/translations.config.js';
import { ICONS_URL } from '../../utils/assets.js';

const SLUG_PATTERN = /^[a-z0-9-]+$/;
const ESTADO_WIP = 'Próximamente';
const NOTA_PESTANA = 'Se abre en una pestaña nueva';

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

function filtrarPublicados() {
  return (data.items ?? []).filter((item) => {
    if (item.status !== 'published') return true;

    if (!SLUG_PATTERN.test(item.slug ?? '')) {
      console.warn(`[programas] Slug inválido: "${item.slug}"`);
      return false;
    }

    return true;
  });
}

function Card(item, lang, etiquetaCategoria) {
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
          title="${esc(title)} — ${NOTA_PESTANA}">
          <span>Abrir</span>
          <img src="${ICONS_URL}arrow_right.svg" alt="" />
        </a>
        <p class="programa-card__nota">${NOTA_PESTANA}</p>
      `
      : `<p class="programa-card__estado">${ESTADO_WIP}</p>`}
  `;

  return div;
}

function ChipsFiltro(categorias, lang) {
  const chips = document.createElement('div');

  chips.className = 'filtros';
  chips.setAttribute('role', 'group');
  chips.setAttribute('aria-label', 'Filtrar por categoría');
  chips.innerHTML = `
    <button class="filtro active" type="button" data-categoria="todas">Todas</button>
    ${categorias.map((categoria) => `
      <button class="filtro" type="button" data-categoria="${esc(categoria.id)}">${esc(getText(categoria.label, lang))}</button>
    `).join('')}
  `;

  return chips;
}

function Categoria(categoria, items, lang) {
  const label = getText(categoria.label, lang);
  const section = document.createElement('section');

  section.className = 'categoria';
  section.setAttribute('aria-labelledby', categoria.id);
  section.innerHTML = `
    <h2 id="${esc(categoria.id)}">${esc(label)}</h2>
    <ul class="lista-programas"></ul>
  `;

  const lista = section.querySelector('ul');

  items
    .filter((item) => item.category === categoria.id)
    .forEach((item) => lista.appendChild(Card(item, lang, label)));

  return section;
}

export function GridProgramas() {
  const grid = document.querySelector('.programas-grid');

  if (!grid) return;

  const lang = currentLanguage;
  const items = filtrarPublicados();
  const categorias = data.categories ?? [];

  grid.innerHTML = '';
  grid.appendChild(ChipsFiltro(categorias, lang));
  categorias.forEach((categoria) => grid.appendChild(Categoria(categoria, items, lang)));
}
