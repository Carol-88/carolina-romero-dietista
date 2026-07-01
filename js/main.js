const CONFIG = {
  name: "Carolina Romero",
  email: "asesoria.carolinaromero@protonmail.com",
  phone: "+34 695 504 249",
  whatsapp: "34695504249",
  /** Pegar URL de Tally al crear el formulario: https://tally.so/r/xxxxx */
  questionnaireUrl: "",
  /** Pegar HTML embed de Cal.com cuando esté listo (o dejar vacío) */
  calEmbedHtml: "",
};

const SERVICE_LABELS = {
  "consulta-gratis": "Consulta gratuita (30 min)",
  "cita-unica": "Cita única — lista de espera",
  trimestral: "Plan trimestral — lista de espera",
  otro: "Otra consulta",
};

function getServiceParam() {
  const fromSearch = new URLSearchParams(window.location.search).get("servicio");
  if (fromSearch) return fromSearch;

  const hash = window.location.hash;
  if (hash.includes("?")) {
    return new URLSearchParams(hash.split("?")[1]).get("servicio");
  }

  return null;
}

function applyServiceParam() {
  const serviceParam = getServiceParam();
  const form = document.getElementById("contact-form");
  if (!serviceParam || !form) return;

  const select = form.querySelector('[name="service"]');
  const map = {
    recomposicion: "trimestral",
    alimentacion: "trimestral",
    web: "otro",
  };
  const value = SERVICE_LABELS[serviceParam] ? serviceParam : map[serviceParam];
  if (value && select?.querySelector(`option[value="${value}"]`)) {
    select.value = value;
  }
}

function initQuestionnaireLink() {
  const link = document.getElementById("questionnaire-link");
  const pending = document.getElementById("questionnaire-pending");
  if (!link) return;

  if (CONFIG.questionnaireUrl) {
    link.href = CONFIG.questionnaireUrl;
    link.removeAttribute("aria-disabled");
    if (pending) pending.hidden = true;
  } else {
    link.href = "#";
    link.setAttribute("aria-disabled", "true");
    link.classList.add("btn-disabled");
    link.addEventListener("click", (e) => e.preventDefault());
    if (pending) pending.hidden = false;
  }
}

function initCalEmbed() {
  const container = document.getElementById("cal-embed");
  if (!container || !CONFIG.calEmbedHtml) return;

  container.innerHTML = CONFIG.calEmbedHtml;
  container.classList.remove("cal-placeholder");
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const phone = data.get("phone") || "No indicado";
    const service = data.get("service");
    const message = data.get("message");
    const serviceLabel = SERVICE_LABELS[service] || service;

    const subject = encodeURIComponent(`[${CONFIG.name}] ${serviceLabel}`);
    const body = encodeURIComponent(
      `Hola Carolina,\n\nInterés: ${serviceLabel}\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje:\n${message}`,
    );

    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    form.classList.add("hidden");
    success?.classList.add("visible");
  });
}

function initNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!navToggle || !nav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú");
      document.body.classList.remove("nav-open");
    });
  });
}

async function loadTestimonials() {
  const grid = document.getElementById("testimonials-grid");
  const empty = document.getElementById("testimonials-empty");
  if (!grid) return;

  try {
    const res = await fetch("data/testimonials.json");
    if (!res.ok) throw new Error("No testimonials");
    const items = await res.json();
    const published = items.filter((t) => t.published !== false && !t.text?.includes("sustituir"));

    if (!published.length) {
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;
    grid.innerHTML = published
      .map(
        (t) => `
      <blockquote class="testimonial-card">
        <p class="testimonial-text">"${escapeHtml(t.text)}"</p>
        <footer>
          <cite class="testimonial-author">${escapeHtml(t.name)}</cite>
          ${t.context ? `<span class="testimonial-context">${escapeHtml(t.context)}</span>` : ""}
        </footer>
      </blockquote>`,
      )
      .join("");
  } catch {
    if (empty) empty.hidden = false;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", () => {
  initQuestionnaireLink();
  initCalEmbed();
  initContactForm();
  initNav();
  loadTestimonials();
  applyServiceParam();
  window.addEventListener("hashchange", applyServiceParam);
});
