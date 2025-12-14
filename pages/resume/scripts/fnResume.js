import { ModalDialog } from "../../../scripts/utils/dialog.js";
import translations from "./resume.json" with { type: "json" };

function renderModal(idWork = 0) {
  const selectedWork = translations.workExperience.find(work => work.id === idWork);

  if (selectedWork) {
    const techList = selectedWork.technologies.map(tech => `<li>${tech}</li>`).join("");

    const content = document.createElement("section");

    content.innerHTML = `
      <header class="modal-header">
        <h3><a href="${selectedWork.company}" title="ir a ${selectedWork.company}" target="_blank">${selectedWork.company}</a></h3>
        <h4>${selectedWork.role}</h4>
      </header>

      <hr class="modal-divider">

      <div class="modal-details">
        <p><strong data-lang="description">descripcion</strong>${selectedWork.description}</p>

        <p><strong data-lang="date">fecha</strong>${selectedWork.date}</p>

        <p><strong data-lang="workplace">trabajo</strong>${selectedWork.employmentType}</p>

        <div>
          <strong data-lang="technologies">tecnologias</strong>
          <ul class="tech-list">${techList}</ul>
        </div>
      </div>
    `;

    ModalDialog(content)
  }
}

export function renderWorkExperience() {
  const container = document.getElementById("workExperienceContainer");
  if (container) {
    container.innerHTML = "";

    translations.workExperience.forEach((work) => {
      const article = document.createElement("article");
      article.className = "card work-card";

      article.innerHTML = `
      <header>
        <h4>${work.company}</h4>
        <h5>${work.role}</h5>
      </header>

      <time datetime="${work.date}">${work.date}</time>
    `;

      article.addEventListener("click", () => renderModal(work.id));

      container.appendChild(article);
    });
  }
}

export function renderEducation() {
  const container = document.getElementById("educationContainer");
  if (container) {
    container.innerHTML = translations.educations.map(edu => `
    <article class="card education-card">
      <h4>${edu.description}</h4>
      <p>${edu.title}</p>
    </article>
  `).join("");
  }
}