export default function sectionNav() {
  const items = Array.from(document.querySelectorAll(".sidebar-item[data-target]"));

  if (!items.length) return;

  const sections = items
    .map((item) => document.getElementById(item.dataset.target))
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) return;

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
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);

      if (visible) {
        setActive(visible.target.id);
      }
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
