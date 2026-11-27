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

function getGenres(games) {
  const seen = new Set();

  return games.reduce((genres, game) => {
    const key = genreKey(game);

    if (!key || seen.has(key)) return genres;

    seen.add(key);
    genres.push({ key, label: game.genre });

    return genres;
  }, []);
}

function ChipsFiltro(generos, lang, texts) {
  const chips = document.createElement('div');

  chips.className = 'filtros';
  chips.setAttribute('role', 'group');
  chips.setAttribute('aria-label', texts.filterByCategory);
  chips.innerHTML = `
    <button class="filtro active" type="button" data-categoria="todas" aria-pressed="true">${esc(texts.allCategories)}</button>
    ${generos.map((genero) => `
      <button class="filtro" type="button" data-categoria="${esc(genero.key)}" aria-pressed="false">${esc(getText(genero.label, lang))}</button>
    `).join('')}
  `;

  return chips;
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
  const controls = getText(game.controls, lang);
  const technologies = Array.isArray(game.technologies) ? game.technologies : [];
  const cover = typeof game.cover === 'string' ? game.cover.trim() : '';

  article.className = 'juego-card';
  article.setAttribute('data-titulo', title);
  article.setAttribute('data-descripcion', description);
  article.setAttribute('data-claves', [...technologies, genre].filter(Boolean).join(' '));
  article.setAttribute('data-categoria', genreKey(game));

  article.innerHTML = `
    <div class="juego-card__portada${cover ? '' : ' juego-card__portada--placeholder'}" aria-hidden="true">
      ${cover
        ? `<img class="juego-card__portada-img" src="${esc(cover)}" alt="" loading="lazy" decoding="async" />`
        : ''}
    </div>

    <header class="juego-card__cabecera">
      <span class="juego-card__genero">${esc(genre)}</span>
      ${game.year ? `<span class="juego-card__anio">${esc(game.year)}</span>` : ''}
    </header>

    <h2 class="juego-card__titulo">${esc(title)}</h2>

    <p class="juego-card__descripcion">${esc(description)}</p>

    ${technologies.length ? `
      <ul class="juego-card__tecnologias" aria-label="${esc(texts.technologiesLabel)}">
        ${technologies.map((tech) => `<li class="juego-card__tecnologia">${esc(tech)}</li>`).join('')}
      </ul>
    ` : ''}

    ${controls ? `<p class="juego-card__controles"><strong>${esc(texts.controlsLabel)}:</strong> ${esc(controls)}</p>` : ''}

    <a class="btn juego-card__jugar" href="./${esc(game.slug)}/index.html" target="_blank" rel="noopener noreferrer"
      title="${esc(title)} — ${esc(texts.openInNewTab)}">
      <span>${esc(texts.playGame)}</span>
      <img src="${ICONS_URL}arrow_right.svg" alt="" />
    </a>

    <p class="juego-card__nota">${esc(texts.openInNewTab)}</p>
  `;

  return article;
}

/* La introducción toma el número de juegos del manifiesto para que la cifra
   nunca quede desactualizada al publicar una entrada nueva. */
function updateGamesIntro(lang, count) {
  const intro = document.querySelector('.juegos-intro');

  if (!intro) return;

  const plantilla = translations.page[lang]?.gamesIntro ?? translations.page.es.gamesIntro;
  intro.textContent = plantilla.replace('{count}', String(count));
}

export function GridGames() {
  const grid = document.querySelector('.juegos-grid');

  if (!grid) return;

  const lang = currentLanguage;
  const texts = translations.page[lang];
  const games = getPublishedGames();
  const contenedorFiltros = document.getElementById('filtros-juegos');
  const categoriaActiva = contenedorFiltros?.querySelector('.filtro.active')?.getAttribute('data-categoria') ?? 'todas';

  updateGamesIntro(lang, games.length);
  grid.innerHTML = '';

  if (contenedorFiltros) {
    contenedorFiltros.innerHTML = '';
    contenedorFiltros.appendChild(ChipsFiltro(getGenres(games), lang, texts));
  }

  if (!games.length) {
    grid.innerHTML = `<p class="juegos-vacio">${texts.gamesEmpty}</p>`;
    return;
  }

  games.forEach((game) => {
    grid.appendChild(CardGame(game, lang, texts));
  });

  if (categoriaActiva !== 'todas' && contenedorFiltros) {
    const chipActivo = Array.from(contenedorFiltros.querySelectorAll('.filtro'))
      .find((chip) => chip.getAttribute('data-categoria') === categoriaActiva);

    (chipActivo ?? contenedorFiltros.querySelector('.filtro'))?.click();
  }
}

export function reloadGamesContent() {
  GridGames();
}
