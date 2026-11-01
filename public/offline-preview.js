// Small interactions for the generated, file://-compatible previews.
(() => {
  const menu = document.querySelector(".menu-button");
  const nav = document.getElementById("primary-navigation");
  function closeMenu(returnFocus = false) {
    nav?.classList.remove("primary-nav--open");
    menu?.setAttribute("aria-expanded", "false");
    menu?.setAttribute("aria-label", "Open navigation");
    if (returnFocus) menu?.focus();
  }
  menu?.addEventListener("click", () => {
    const open = nav?.classList.toggle("primary-nav--open");
    menu.setAttribute("aria-expanded", String(Boolean(open)));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    if (open) nav.querySelector("a")?.focus();
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", event => {
    if (!nav?.classList.contains("primary-nav--open")) return;
    if (event.key === "Escape") closeMenu(true);
    const first = nav.querySelector("a");
    if (event.key === "Tab" && event.shiftKey && document.activeElement === first) { event.preventDefault(); menu.focus(); }
    else if (event.key === "Tab" && !event.shiftKey && document.activeElement === menu) { event.preventDefault(); first?.focus(); }
  });
  document.addEventListener("pointerdown", event => { if (!event.target.closest(".site-header")) closeMenu(); });
  matchMedia("(min-width: 981px)").addEventListener("change", event => { if (event.matches) closeMenu(); });
  document.querySelectorAll("[data-project-filter]").forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.projectFilter;
    document.querySelectorAll("[data-project-filter]").forEach(item => {
      const active = item === button;
      item.classList.toggle("filter-btn--active", active);
      item.setAttribute("aria-pressed", String(active));
      item.textContent = item.dataset.projectFilter + (active ? " ↗" : "");
    });
    document.querySelectorAll("[data-project-category]").forEach(card => { card.hidden = filter !== "All" && card.dataset.projectCategory !== filter; });
  }));
  const form = document.getElementById("project-enquiry");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Website project enquiry — ${data.get("projectType") || "Civil construction"}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject type: ${data.get("projectType")}\n\nMessage:\n${data.get("message")}`);
    let status = form.querySelector('[role="status"]');
    if (!status) { status = document.createElement("p"); status.className = "form-status"; status.setAttribute("role", "status"); form.append(status); }
    status.textContent = "Your email application should open with a pre-filled message. This website does not send or store enquiries itself.";
    location.href = `mailto:${form.dataset.recipient}?subject=${subject}&body=${body}`;
  });
})();
