const navLinks = document.querySelectorAll(".nav-link");

function setActivePage(page) {
  navLinks.forEach(link => {
    const htmlLink = link;
    if (htmlLink.dataset.page === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  localStorage.setItem("current-page", page);
}

export default function NavbarController() {
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      // e.preventDefault();
      const htmlLink = link;
      const page = htmlLink.dataset.page || 'home';
      setActivePage(page);
      // closeMenu();
    });
  });

  document.querySelector(".logo-link")?.addEventListener("click", () => {
    setActivePage("home");
  });

  const savedPage = localStorage.getItem("current-page") || "home";

  setActivePage(savedPage);
};