import gamesData from '../../data/juegos.json' with { type: 'json' };
import translations from '../../lang/translations.json' with { type: 'json' };
import { currentLanguage } from '../../lang/translations.config.js';
import { ICONS_URL } from '../../utils/assets.js';

const SLUG_PATTERN = /^[a-z0-9-]+$/;

function getText(value, lang) {
  if (typeof value === 'string') return value;

  return value?.[lang] ?? value?.es ?? '';
}

/* Solo se publican entradas con un slug seguro y estado "published". Así un
   error al editar el manifiesto no rompe la página ni genera rutas extrañas. */
function getPublishedGames() {
  return (gamesData.games ?? []).filter((game) => {
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
  const controls = getText(game.controls, lang);
  const technologies = Array.isArray(game.technologies) ? game.technologies : [];

  article.className = 'juego-card';

  article.innerHTML = `
    <header class="juego-card__cabecera">
      <span class="juego-card__genero">${genre}</span>
      ${game.year ? `<span class="juego-card__anio">${game.year}</span>` : ''}
    </header>

    <h2 class="juego-card__titulo">${title}</h2>

    <p class="juego-card__descripcion">${description}</p>

    ${technologies.length ? `
      <ul class="juego-card__tecnologias" aria-label="${texts.technologiesLabel}">
        ${technologies.map((tech) => `<li class="juego-card__tecnologia">${tech}</li>`).join('')}
      </ul>
    ` : ''}

    ${controls ? `<p class="juego-card__controles"><strong>${texts.controlsLabel}:</strong> ${controls}</p>` : ''}

    <a class="btn juego-card__jugar" href="./${game.slug}/index.html" target="_blank" rel="noopener noreferrer"
      title="${title} — ${texts.openInNewTab}">
      <span>${texts.playGame}</span>
      <img src="${ICONS_URL}arrow_right.svg" alt="" />
    </a>

    <p class="juego-card__nota">${texts.openInNewTab}</p>
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
