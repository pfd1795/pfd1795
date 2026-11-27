import gamesData from '../../../juegos/data/juegos.json' with { type: 'json' };
import translations from '../../lang/translations.json' with { type: 'json' };
import { currentLanguage } from '../../lang/translations.config.js';
import { ICONS_URL } from '../../utils/assets.js';

const SLUG_PATTERN = /^[a-z0-9-]+$/;

/* Escapa el texto del manifiesto para inyectarlo como HTML o atributo. */
function esc(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function getText(value, lang) {
  if (typeof value === 'string') return value;

  return value?.[lang] ?? value?.es ?? '';
}

function genreKey(game) {
  const genre = game.genre;

  return typeof genre === 'string' ? genre : (genre?.es ?? '');
}

/* Solo se publican entradas con un slug seguro y estado "published". Así un
   error al editar el manifiesto no rompe la página ni genera rutas extrañas. */
function getPublishedGames() {
  return (gamesData.items ?? []).filter((game) => {
    if (!SLUG_PATTERN.test(game.slug ?? '')) {
      console.warn(`[juegos] Slug inválido: "${game.slug}"`);
      return false;
    }

    return game.status === 'published';
  });
}

function CardGame(game, lang, texts) {
  const article = document.createElement('article');
  const title = getText(game.title, lang);
  const genre = getText(game.genre, lang);
  const description = getText(game.description, lang);
  const technologies = Array.isArray(game.technologies) ? game.technologies : [];
  const cover = typeof game.cover === 'string' ? game.cover.trim() : '';

  article.className = 'juego-card';
  article.setAttribute('data-titulo', title);
  article.setAttribute('data-descripcion', description);
  article.setAttribute('data-claves', [...technologies, genre].filter(Boolean).join(' '));
  article.setAttribute('data-categoria', genreKey(game));

  article.innerHTML = `
    <div class="juego-card__encabezado">
      <h2 class="juego-card__titulo">${esc(title)}</h2>

      <a class="btn juego-card__jugar" href="./${esc(game.slug)}/index.html" title="${esc(title)}">
        <span>${esc(texts.playGame)}</span>
        <img src="${ICONS_URL}arrow_right.svg" alt="" />
      </a>
    </div>

    <div class="juego-card__portada${cover ? '' : ' juego-card__portada--placeholder'}" aria-hidden="true">
      ${cover
        ? `<img class="juego-card__portada-img" src="${esc(cover)}" alt="" loading="lazy" decoding="async" />`
        : ''}
    </div>
  `;

  return article;
}

export function GridGames() {
  const grid = document.querySelector('.juegos-grid');

  if (!grid) return;

  const lang = currentLanguage;
  const texts = translations.page[lang];
  const games = getPublishedGames();

  grid.innerHTML = '';

  if (!games.length) {
    grid.innerHTML = `<p class="juegos-vacio">${texts.gamesEmpty}</p>`;
    return;
  }

  games.forEach((game) => {
    grid.appendChild(CardGame(game, lang, texts));
  });
}

export function reloadGamesContent() {
  GridGames();
}
