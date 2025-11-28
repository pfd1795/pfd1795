const translations = {
  es: {
    cv: "Currículum Vitae",
    profession1: "Programador",
    profession2: "Desarrollador Web",
    profession3: "Educador",
    fullnameTitle: "Nombre",
    fullname: "Pablo Diaz",
    nationalityTitle: "Nacionalidad",
    nationality: "Argentina",
    mailTitle: "Mail",
    mailName: "pfd1795@gmail.com",
    linkedinTitle: "linkedin",
    linkedinName: "pfd-dev",
    githubTitle: "GitHub",
    githubName: "pfd1795",
    webSiteTitle: "Web",
    webSiteName: "pfd1795.github.io/",
    greeting1: "¡Hola, soy Pablo!",
    greetingResume: "Ofrezco mis servicios para diversos entornos laborales, destacando mis habilidades en el uso de distintos softwares de gestión, mantenimiento de equipos tecnológicos, atención al público, trabajo en equipo, presentación y respeto.",
    experienceTitle: "Experiencia Laboral",
    studiesTitle: "Estudios | Cursos",
    description: "Descripción del Trabajo",
    date: "Duración",
    workplace: "Lugar de Trabajo",
    technologies: "Tecnologías Utilizadas",
    copyNotification: "¡Correo copiado!"
  },
  en: {
    cv: "Curriculum Vitae",
    profession1: "Programmer",
    profession2: "Web Developer",
    profession3: "Teacher",
    fullnameTitle: "Name",
    fullname: "Pablo Diaz",
    nationalityTitle: "Nationality",
    nationality: "Argentina",
    mailTitle: "Mail",
    mailName: "pfd1795@gmail.com",
    linkedinTitle: "linkedin",
    linkedinName: "pfd-dev",
    githubTitle: "GitHub",
    githubName: "pfd1795",
    webSiteTitle: "Web",
    webSiteName: "pfd1795.github.io/",
    greeting1: "Hello, I'm Pablo!",
    greetingResume: "I offer my services for various work environments, highlighting my skills in using different management software, maintaining technological equipment, customer service, teamwork, presentation and respect.",
    experienceTitle: "Work Experience",
    studiesTitle: "Studies | Courses",
    description: "Job Description",
    date: "Duration",
    workplace: "Workplace",
    technologies: "Technologies Used",
    copyNotification: "Email copied!"
  }
};

const workExperience = [
  {
    company: "Neoland",
    date: "en actividad (2025)",
    description: "Desempeño la labor de docente en el bootcamp de Desarrollo Web, utilizando las tecnologias mas demandadas en la industria. Gracias Neoland por abrirme las puertas a nuevos desafíos, fortalecer mis habilidades pedagógicas y permitirme compartir mis conocimientos con futuros desarrolladores.",
    duration: "en actividad (2025)",
    employmentType: "Remoto",
    link: "https://neoland.es/",
    role: "Profesor Bootcamp Desarrollo Web Full Stack",
    technologies: ["Algoritmos", "HTML", "CSS", "JavaScript", "React", "Angular", "Node.js", "ExpressJS", "MongoDB", "Git", "GitHub"]
  },
  {
    company: "Vortex-IT",
    date: "2 años",
    description: "colaboré en el diseño y desarrollo de interfaces de usuario y productos en promoción, adquiriendo experiencia en arquitecturas de proyectos escalables. Implementé funcionalidades de internacionalización, autenticación, manejo de cámaras y escáneres QR, geolocalización.",
    duration: "2021 - 2023 (2 años)",
    employmentType: "Remoto",
    link: "https://vortex-it.com/",
    role: "Desarrollador Frontend Aplicaciones Web y Móviles",
    technologies: ["HTML", "CSS", "JavaScript", "React", "React Native", "Node.js", "MongoDB", "Postman", "Material UI", "Tailwind CSS", "Figma", "i18n", "GitLab"]
  },
  {
    company: "Ministerio de Educación de la Nación Argentina",
    date: "1 año 6 meses",
    description: "Desarrollo de sistemas web accesible diseñado para gestionar usuarios con diversos roles y necesidades específicas. Durante este tiempo, adquirí mi primera experiencia en el uso de tecnologías orientadas a arquitecturas robustas, documentación y despliegues de la aplicación.",
    duration: "2020 - 2021 (1 año y 6 meses)",
    employmentType: "Presencial y remoto",
    link: "https://sime.educaciontuc.gov.ar/",
    role: "Desarrollador de Páginas Web",
    technologies: ["HTML", "CSS", "JavaScript", "C#", "ASP.NET", "SQL Server", "Bootstrap", "jQuery", "GitLab"]
  },
  {
    company: "Universidad Nacional de Argentina",
    date: "4 años",
    description: "Colaboré como auxiliar docente en la asignatura de Laboratorio de Programación. Esta materia se enfoca en enseñar los fundamentos de la creación de páginas web accesibles y los principios básicos de la programación. Asistí en la planificación y dictado de clases, corrección de exámenes y proyectos estudiantiles. Este período me permitió fortalecer mis habilidades técnicas y mi capacidad para trabajar en equipo en entornos académicos.",
    duration: "2017 - 2021 (4 años)",
    employmentType: "Presencial y remoto",
    link: "https://www.facet.unt.edu.ar/",
    role: "Auxiliar Docente Programación Web",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap", "WordPress", "XAMPP", "NVDA", "Trello"]
  }
];

const educations = [
  { description: "Microsoft Learn", title: "Microsoft" },
  { description: "Grow Google", title: "Google" },
  { description: "Inglés", title: "Centro Universitario de Idiomas" },
  { description: "Argentina Programa 4.0", title: "CESSI Argentina" },
  { description: "Programador Web MERN Stack", title: "Rolling Code School" },
  { description: "Inglés", title: "Universidad Tecnológica Nacional" }
];

export {
  translations,
  workExperience,
  educations
}
