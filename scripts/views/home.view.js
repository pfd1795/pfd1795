import copyEmail from "../utils/copyEmail.js";

const projects = [
  {
    id: 1,
    title: "Aplicaciones con Next.js",
    description: "Colección de aplicaciones web modernas construidas con Next.js, React y Tailwind CSS.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    link: "https://proyectos-nextjs.vercel.app/home",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"]
  }
];

function renderProjects() {
  const projectsGrid = document.querySelector(".projects-grid");

  projectsGrid.innerHTML = projects.map(project => `
        <article class="project-card">
          <div class="project-image-container">
            <img 
              src="${project.image}" 
              alt="${project.title}" 
              class="project-image"
              loading="lazy"
            >
            <div class="image-overlay"></div>
          </div>

          <div class="project-content">
            <h3 class="project-title">${project.title}</h3>

            <p class="project-description">${project.description}</p>

            <div class="project-technologies">
              ${project.technologies.map(tech => `
                <span class="tech-badge">${tech}</span>
              `).join("")}
            </div>

            <a href="${project.link}" class="project-button" target="_blank" rel="noopener noreferrer" title="Ver ${project.title}">
              <span data-lang="viewProject">Ver Proyecto</span>
              <svg class='icon' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </article>
      `).join("");
}

export default function homeView() {
  document.querySelector(".email-link").addEventListener("click", copyEmail);

  renderProjects();
}