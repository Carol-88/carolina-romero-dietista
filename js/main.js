const CONFIG = {
  name: "Carolina Romero",
  email: "hola@carolinaromero.com",
  phone: "+34 600 000 000",
  whatsapp: "34600000000",
};

const SERVICE_LABELS = {
  recomposicion: "Recomposición corporal",
  alimentacion: "Alimentación saludable",
  web: "Páginas web para negocios",
};

const form = document.getElementById("contact-form");
const success = document.getElementById("form-success");

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
      `[${CONFIG.name}] Consulta — ${serviceLabel}`,
    );
    const body = encodeURIComponent(
      `Hola Carolina,\n\nMe interesa: ${serviceLabel}\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje:\n${message}`,
    );

    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;

    form.classList.add("hidden");
    success.classList.add("visible");
  });
}

const params = new URLSearchParams(window.location.search);
const serviceParam = params.get("servicio");
if (serviceParam && form) {
  const select = form.querySelector('[name="service"]');
  if (select && SERVICE_LABELS[serviceParam]) {
    select.value = serviceParam;
  }
}
