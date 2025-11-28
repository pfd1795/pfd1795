import { translations, workExperience, educations } from "../lang/page-resume.js";
import copyEmail from "../utils/copyEmail.js";

let currentLanguage = "es";

function openModal(work) {
  const modal = document.querySelector(".modal-overlay");
  const modalBody = document.querySelector(".modal-body");

  const techList = work.technologies.map(tech => `<li>${tech}</li>`).join("");

  modalBody.innerHTML = `
        <section>
          <header class="modal-header">
            <h3><a href="${work.link}" title="ir a ${work.company}" target="_blank">${work.company}</a></h3>
            <h4>${work.role}</h4>
          </header>

          <hr class="modal-divider">

          <div class="modal-details">
            <p><strong data-lang="description">${translations[currentLanguage].description}</strong>${work.description}</p>

            <p><strong data-lang="date">${translations[currentLanguage].date}</strong>${work.date}</p>

            <p><strong data-lang="workplace">${translations[currentLanguage].workplace}</strong>${work.employmentType}</p>

            <div>
              <strong data-lang="technologies">${translations[currentLanguage].technologies}</strong>
              <ul class="tech-list">${techList}</ul>
            </div>
          </div>
        </section>
      `;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    document.querySelector(".modal-content").focus();
  }, 100);
}

function closeModal(event) {
  if (event && event.target !== event.currentTarget) return;

  const modal = document.querySelector(".modal-overlay");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function renderWorkExperience() {
  const container = document.getElementById("workExperienceContainer");
  container.innerHTML = "";

  workExperience.forEach((work, index) => {
    const article = document.createElement("article");
    article.className = "card work-card";

    article.innerHTML = `
      <header>
        <h4>${work.company}</h4>
        <h5>${work.role}</h5>
      </header>
      <time datetime="${work.date}">${work.date}</time>
    `;

    article.addEventListener("click", () => openModal(work));
    container.appendChild(article);
  });
}

function renderEducation() {
  const container = document.getElementById("educationContainer");

  container.innerHTML = educations.map(edu => `
        <article class="card education-card">
          <h4>${edu.description}</h4>
          <p>${edu.title}</p>
        </article>
      `).join("");
}

export default function resumeView() {
  renderWorkExperience();

  renderEducation();

  document.querySelector(".email-link").addEventListener("click", copyEmail);

  document.querySelector(".modal-content .btn").addEventListener("click", closeModal);

  document.querySelector(".modal-overlay").addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}