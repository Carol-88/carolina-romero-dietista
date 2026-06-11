const CONFIG = {
  name: "Carolina Romero",
  email: "asesoria.carolinaromero@protonmail.com",
  phone: "+34 695 504 249",
  whatsapp: "34695504249",
};

const SERVICE_LABELS = {
  recomposicion: "Recomposición corporal",
  alimentacion: "Alimentación saludable",
  web: "Páginas web para negocios",
};

const form = document.getElementById("contact-form");
const success = document.getElementById("form-success");

function getServiceParam() {
  const fromSearch = new URLSearchParams(window.location.search).get("servicio");
  if (fromSearch) return fromSearch;

  const hash = window.location.hash;
  if (hash.includes("?")) {
    const query = hash.split("?")[1];
    return new URLSearchParams(query).get("servicio");
  }

  return null;
}

function applyServiceParam() {
  const serviceParam = getServiceParam();
  if (!serviceParam || !form) return;

  const select = form.querySelector('[name="service"]');
  if (select && SERVICE_LABELS[serviceParam]) {
    select.value = serviceParam;
  }
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const phone = data.get("phone") || "No indicado";
    const service = data.get("service");
    const message = data.get("message");
    const serviceLabel = SERVICE_LABELS[service] || service;

    const subject = encodeURIComponent(
      `[${CONFIG.name}] Consulta informativa — ${serviceLabel}`,
    );
    const body = encodeURIComponent(
      `Hola Carolina,\n\nMe interesa (consulta informativa, sin contratación): ${serviceLabel}\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje:\n${message}`,
    );

    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;

    form.classList.add("hidden");
    success.classList.add("visible");
  });
}

applyServiceParam();
window.addEventListener("hashchange", applyServiceParam);

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
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
