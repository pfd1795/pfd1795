import { ModalDialog } from '../../utils/dialog.js';
import { currentLanguage } from '../../lang/translations.config.js';
import translations from '../../lang/translations.json' with { type: 'json' };

export function GridWorkExperience() {
  const container = document.querySelector('.grid-works');

  if (!container) return;

  const lang = currentLanguage;
  const homeTexts = translations.home[lang];

  container.innerHTML = '';
  container.classList.remove('grid-works--expanded');
  container.style.removeProperty('--works-collapsed');

  const collapseCard = (card) => {
    card.classList.remove('expanded');
    card.querySelector('.card-work__header')?.setAttribute('aria-expanded', 'false');
  };

  /* Reparte las tarjetas en dos columnas cuando hay una abierta: la expandida
     ocupa su columna (la conserva) y las demás se apilan en la otra, de modo
     que ninguna quede por encima ni por debajo de ella. */
  const applyLayout = (expandedCard) => {
    const cards = Array.from(container.querySelectorAll('.card-work'));

    cards.forEach((card) => {
      card.classList.remove('card-work--left', 'card-work--right', 'card-work--expanded');
    });

    if (!expandedCard) {
      container.classList.remove('grid-works--expanded');
      container.style.removeProperty('--works-collapsed');
      return;
    }

    const expandedSide = cards.indexOf(expandedCard) % 2 === 0 ? 'left' : 'right';
    const otherSide = expandedSide === 'left' ? 'right' : 'left';

    container.classList.add('grid-works--expanded');
    container.style.setProperty('--works-collapsed', String(cards.length - 1));

    cards.forEach((card) => {
      if (card === expandedCard) {
        card.classList.add('card-work--expanded', `card-work--${expandedSide}`);
      } else {
        card.classList.add(`card-work--${otherSide}`);
      }
    });
  };

  translations.workExperience.forEach((work) => {
    const article = document.createElement('article');
    article.className = 'card-work';

    const panelId = `work-panel-${work.id}`;
    const techList = work.technologies.map((tech) => `<li>${tech}</li>`).join('');

    article.innerHTML = `
      <button class="card-work__header" type="button" aria-expanded="false" aria-controls="${panelId}">
        <span class="card-work__company">${work.company}</span>
        <span class="card-work__role">${work.role[lang]}</span>
      </button>

      <div class="card-work__details" id="${panelId}">
        <div class="card-work__clip">
          <div class="card-work__body">
            <p><strong>${homeTexts.descriptionLabel}</strong> ${work.description[lang]}</p>

            <p><strong>${homeTexts.employmentTypeLabel}</strong> ${work.employmentType[lang]}</p>

            <div>
              <strong>${homeTexts.technologiesLabel}</strong>
              <ul class="tech-list">${techList}</ul>
            </div>

            <a class="card-work__link" href="${work.link}" title="${work.company}" target="_blank" rel="noopener noreferrer">${homeTexts.visitWebsiteLabel}</a>
          </div>
        </div>
      </div>
    `;

    const header = article.querySelector('.card-work__header');

    /* Acordeón: al abrir una tarjeta se cierra la que estuviera abierta. */
    header.addEventListener('click', () => {
      const isOpen = article.classList.contains('expanded');

      container.querySelectorAll('.card-work.expanded').forEach(collapseCard);

      if (isOpen) {
        applyLayout(null);
      } else {
        article.classList.add('expanded');
        header.setAttribute('aria-expanded', 'true');
        applyLayout(article);
      }
    });

    container.appendChild(article);
  });
}


function ModalEducation(idEducation = 0) {
  const selectedEducation = translations.educations.find(edu => edu.id === idEducation);

  if (selectedEducation) {
    const skillsList = selectedEducation.skills.map(skill => `<li>${skill}</li>`).join(", ");
    const lang = currentLanguage;
    const homeTexts = translations.home[lang];

    const content = document.createElement('section');

    content.innerHTML = `
      <header class="modal-header">
        <h2>${selectedEducation.title[lang]}</h2>
        <h3>
          <a href="${selectedEducation.link}" title="${selectedEducation.title[lang]}" target="_blank">
            ${selectedEducation.institution}
          </a>
        </h3>
      </header>

      <hr class="divider">

      <section>
        <div>      
          <h4>${homeTexts.descriptionLabel}</h4>
          <p>${selectedEducation.description[lang]}</p>
        </div>

        <div>
          <h4>${homeTexts.skillsLabel}</h4>
          <ul>${skillsList}</ul>
        </div>
      </section>
    `;

    ModalDialog(content);
  }
}

export function GridEducation() {
  const container = document.getElementById('educationContainer');

  if (container) {
    container.innerHTML = '';

    const lang = currentLanguage;

    translations.educations.forEach((edu) => {
      const article = document.createElement('article');
      article.className = 'card-studies';

      article.innerHTML = `
        <h4>${edu.title[lang]}</h4>
        <p>${edu.institution}</p>
      `;

      article.addEventListener('click', () => ModalEducation(edu.id));

      container.appendChild(article);
    });
  }
}

export function GridProjects() {
  const projectsGrid = document.querySelector('.grid-projects');

  if (projectsGrid) {
    const lang = currentLanguage;

    projectsGrid.innerHTML = translations.projects.map(project => `
      <article class="project-card">
        <div class="project-image-container">
          <figure>
            <img src="${project.image}" alt="${project.title[lang]}" class="project-image" loading="lazy" />
          </figure>
          <div class="image-overlay"></div>
        </div>

        <div class="project-content">
          <h3 class="project-title">${project.title[lang]}</h3>

          <p class="project-description">${project.description[lang]}</p>

          <div class="project-technologies">
            ${project.technologies.map(tech => `
              <span class="tech-badge">${tech}</span>
            `).join('')}
          </div>

          <a href="${project.link}" class="project-button" target="_blank" rel="noopener noreferrer" title="${project.title[lang]}">
            <span data-lang="viewProject">Ver Proyecto</span>
            <img src="./assets/icons/arrow_right.svg" alt="">
          </a>
        </div>
      </article>
    `).join('');
  }
}

export function reloadHomeContent() {
  GridWorkExperience();
  GridEducation();
  GridProjects();
}
