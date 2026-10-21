document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }));
  }

  const themeButton = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("gdsc-theme");
  if (savedTheme === "dark") document.body.classList.add("dark");
  if (themeButton) themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("gdsc-theme", document.body.classList.contains("dark") ? "dark" : "light");
  });

  const dialog = document.getElementById("eventDialog");
  const title = document.getElementById("dialogTitle");
  const description = document.getElementById("dialogDescription");
  const closeButton = document.querySelector(".dialog-close");
  const toast = document.querySelector(".toast");
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }
  document.querySelectorAll(".register-btn, .know-btn").forEach(button => {
    button.addEventListener("click", () => {
      const eventName = button.dataset.event || "Community Event";
      if (title) title.textContent = eventName;
      if (description) description.textContent = button.classList.contains("register-btn")
        ? "Register your interest in this community event. Add your details below to see the confirmation."
        : "Flutter Forward explored the latest Flutter updates and developer tools. This event card is a sample entry based on the supplied design.";
      const action = document.getElementById("dialogAction");
      if (action) action.textContent = button.classList.contains("register-btn") ? "Submit registration" : "Send me event updates";
      if (dialog && typeof dialog.showModal === "function") dialog.showModal();
      else showToast(eventName + " selected");
    });
  });
  if (closeButton && dialog) closeButton.addEventListener("click", () => dialog.close());
  if (dialog) dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  const form = document.getElementById("registrationForm");
  if (form) form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = document.getElementById("visitorName").value.trim();
    const eventName = title ? title.textContent : "the event";
    showToast(`Thanks, ${name}! Your interest in ${eventName} has been recorded for this demo.`);
    form.reset();
    if (dialog) dialog.close();
  });

  // Mark the navigation item that corresponds to the visible section.
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => observer.observe(section));
  }
});
