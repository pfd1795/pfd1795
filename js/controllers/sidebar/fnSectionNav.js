export default function sectionNav() {
  const items = Array.from(document.querySelectorAll(".sidebar-item[data-target]"));

  if (!items.length) return;

  const sections = items
    .map((item) => document.getElementById(item.dataset.target))
    .filter(Boolean);

  if (!sections.length) return;

  const group = document.querySelector(".sidebar-item--group");
  const submenu = document.querySelector(".sidebar-submenu");
  const expand = document.querySelector(".sidebar-expand");

  const setActive = (id) => {
    items.forEach((item) => {
      item.classList.toggle("active", item.dataset.target === id);
    });

    const activeItem = items.find((item) => item.dataset.target === id);
    const isChildActive = Boolean(activeItem?.closest(".sidebar-submenu"));

    group?.classList.toggle("has-active", isChildActive);

    if (isChildActive && submenu) {
      submenu.classList.add("is-open");
      expand?.setAttribute("aria-expanded", "true");
    } else {
      submenu?.classList.remove("is-open");
      expand?.setAttribute("aria-expanded", "false");
    }
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const marcarPorPosicion = () => {
    const puntoMedio = window.innerHeight / 2;
    let candidata = null;

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= puntoMedio) {
        candidata = section;
      }
    });

    if (candidata) {
      setActive(candidata.id);
    }
  };

  let pendiente = false;

  window.addEventListener("scroll", () => {
    if (pendiente) return;

    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      marcarPorPosicion();
    });
  }, { passive: true });

  marcarPorPosicion();
}
