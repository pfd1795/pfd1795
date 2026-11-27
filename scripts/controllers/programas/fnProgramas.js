import data from '../../../pages/my-programs/data/herramientas.json' with { type: 'json' };
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

function Card(item, lang, texts) {
  const title = getText(item.title, lang);
  const description = getText(item.description, lang);
  const keywords = item.keywords ?? '';
  const technologies = Array.isArray(item.technologies) ? item.technologies : [];
  const icon = item.icon ?? 'code.svg';
  const div = document.createElement('div');

  div.className = 'programa-card';
  div.setAttribute('data-titulo', title);
  div.setAttribute('data-descripcion', description);
  div.setAttribute('data-claves', [keywords, ...technologies].filter(Boolean).join(' '));
  div.setAttribute('data-categoria', item.category ?? '');

  div.innerHTML = `
    <div class="programa-card__cabecera">
      <img class="programa-card__icono" src="${ICONS_URL}${esc(icon)}" alt="" />
      <h3 class="programa-card__titulo">${esc(title)}</h3>
    </div>

    <p class="programa-card__descripcion">${esc(description)}</p>

    ${item.status === 'published'
      ? `<a class="btn programa-card__abrir" href="./${esc(item.slug)}/index.html" title="${esc(title)}">${esc(texts.openTool)}</a>`
      : `<p class="programa-card__estado">${esc(texts.comingSoon)}</p>`}
  `;

  return div;
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

      li.appendChild(Card(item, lang, texts));
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

  grid.innerHTML = '';
  categorias.forEach((categoria) => grid.appendChild(Categoria(categoria, items, lang, texts)));
}

export function reloadProgramasContent() {
  GridProgramas();
}
