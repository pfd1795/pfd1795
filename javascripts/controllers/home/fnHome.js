import { ModalDialog } from '../../utils/dialog.js';
import { currentLanguage } from '../../lang/translations.config.js';
import translations from '../../lang/translations.json' with { type: 'json' };

function CardWorkCover(idWork = 0) {
  const worksCover = document.querySelector('.works-cover');

  if (!worksCover) return;

  const lang = currentLanguage;
  const homeTexts = translations.home[lang];

  if (idWork === 0) {
    worksCover.innerHTML = `
      <div class="works-cover-content default-message">
        <h3>${homeTexts.workExperienceDefaultTitle}</h3>
        <p>${homeTexts.workExperienceDefaultText}</p>
      </div>
    `;
    return;
  }

  const selectedWork = translations.workExperience.find(work => work.id === idWork);

  if (selectedWork) {
    const techList = selectedWork.technologies.map(tech => `<li>${tech}</li>`).join("");

    worksCover.innerHTML = `
      <div class="works-cover-content">
        <header class="works-detail-header">
          <h3><a href="${selectedWork.link}" title="${selectedWork.company}" target="_blank" rel="noopener noreferrer">${selectedWork.company}</a></h3>
          <h4>${selectedWork.role[lang]}</h4>
        </header>

        <hr class="divider">

        <div class="works-detail-body">
          <p><strong>${homeTexts.descriptionLabel}</strong> ${selectedWork.description[lang]}</p>

          <p><strong>${homeTexts.durationLabel}</strong> ${selectedWork.date[lang]}</p>

          <p><strong>${homeTexts.employmentTypeLabel}</strong> ${selectedWork.employmentType[lang]}</p>

          <div>
            <strong>${homeTexts.technologiesLabel}</strong>
            <ul class="tech-list">${techList}</ul>
          </div>
        </div>
      </div>
    `;
  }
}

export function GridWorkExperience() {
  const container = document.querySelector('.grid-works');

  if (container) {
    container.innerHTML = '';

    CardWorkCover(0);

    const lang = currentLanguage;

    translations.workExperience.forEach((work) => {
      const article = document.createElement('article');
      article.className = 'card-work';

      article.innerHTML = `
        <header>
          <h4>${work.company}</h4>
          <h5>${work.role[lang]}</h5>
        </header>

        <time>${work.date[lang]}</time>
      `;

      article.addEventListener('click', () => {
        container.querySelectorAll('.card-work').forEach((card) => {
          card.classList.remove('active');
        });

        article.classList.add('active');

        CardWorkCover(work.id);
      });

      container.appendChild(article);
    });
  }
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
