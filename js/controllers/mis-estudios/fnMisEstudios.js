/* ==========================================================================
   fnMisEstudios.js — genera la grilla de artículos de la enciclopedia desde
   su manifiesto (mis-estudios/data/articulos.json).

   El esquema es el mismo que el de juegos.json y herramientas.json: raíz
   con `version`, `categories` (id + label {es}) e `items` (slug, title,
   description, keywords, category, status). Las URLs de los artículos no
   van en el manifiesto: se construyen como `articulos/<slug>.html`.

   El contenido del manifiesto es solo en español (regla de la sección), pero
   la etiqueta de UI `comingSoon` se toma de `translations.page[lang]`. Solo se
   muestran las entradas con slug válido; un error al editar el manifiesto no
   rompe la página.
   ========================================================================== */

import data from '../../../mis-estudios/data/articulos.json' with { type: 'json' };
import translations from '../../lang/translations.json' with { type: 'json' };
import { currentLanguage } from '../../lang/translations.config.js';

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
      console.warn(`[mis-estudios] Slug inválido: "${item.slug}"`);
      return false;
    }

    return true;
  });
}

function Card(item, lang) {
  const title = getText(item.title, lang);
  const description = getText(item.description, lang);
  const keywords = item.keywords ?? '';
  const comingSoon = translations.page[lang]?.comingSoon ?? translations.page.es.comingSoon;
  const li = document.createElement('li');

  if (item.status === 'published') {
    li.innerHTML = `
      <article class="estudio-card"
               data-titulo="${esc(title)}"
               data-descripcion="${esc(description)}"
               data-claves="${esc(keywords)}"
               data-categoria="${esc(item.category ?? '')}">
        <h3 class="estudio-card__titulo"><a href="articulos/${esc(item.slug)}.html">${esc(title)}</a></h3>
        <p class="estudio-card__descripcion">${esc(description)}</p>
      </article>
    `;
  } else {
    li.innerHTML = `
      <div class="estudio-card"
           data-titulo="${esc(title)}"
           data-descripcion="${esc(description)}"
           data-claves="${esc(keywords)}"
           data-categoria="${esc(item.category ?? '')}">
        <h3 class="estudio-card__titulo">${esc(title)}</h3>
        <p class="estudio-card__descripcion">${esc(description)}</p>
        <p class="estudio-card__estado">${comingSoon}</p>
      </div>
    `;
  }

  return li;
}

function Categoria(categoria, items, lang) {
  const label = getText(categoria.label, lang);
  const section = document.createElement('section');

  section.className = 'categoria';
  section.setAttribute('aria-labelledby', categoria.id);
  section.innerHTML = `
    <h2 id="${esc(categoria.id)}">${esc(label)}</h2>
    <ul class="lista-estudios"></ul>
  `;

  const lista = section.querySelector('ul');

  items
    .filter((item) => item.category === categoria.id)
    .forEach((item) => lista.appendChild(Card(item, lang)));

  return section;
}

export function GridEstudios() {
  const grid = document.querySelector('.estudios-grid');

  if (!grid) return;

  const lang = currentLanguage;
  const items = filtrarItemsValidos();
  const categorias = data.categories ?? [];

  grid.innerHTML = '';
  categorias.forEach((categoria) => grid.appendChild(Categoria(categoria, items, lang)));
}
