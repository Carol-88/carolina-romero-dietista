const CONFIG = {
  name: "Carolina Romero",
  email: "carolinaromero.dietista@proton.me",
  phone: "+34 695 504 249",
  whatsapp: "34695504249",
  /** API propia (Docker). Vacío = solo mailto. Producción: meta api-base-url en index.html */
  apiBaseUrl: document.querySelector('meta[name="api-base-url"]')?.content?.trim() || "",
  questionnaireUrl: "",
  /** Perfil Cal.eu — https://cal.eu/carolinaromero */
  calLink: "carolinaromero",
  calOrigin: "https://cal.eu",
  calEmbedScript: "https://app.cal.eu/embed/embed.js",
};

const SERVICE_LABELS = {
  "consulta-gratis": "Consulta gratuita (30 min)",
  "cita-unica": "Cita única (49 €)",
  trimestral: "Plan trimestral (179 €)",
  otro: "Otra consulta",
};

const WAITLIST_PLAN_LABELS = {
  "cita-unica": "Cita única (49 €)",
  trimestral: "Plan trimestral (179 €)",
};

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    source: params.get("source") || undefined,
  };
}

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
  const contactForm = document.getElementById("contact-form");
  const waitlistForm = document.getElementById("waitlist-form");

  const map = {
    recomposicion: "trimestral",
    alimentacion: "trimestral",
    web: "otro",
  };
  const value = SERVICE_LABELS[serviceParam] ? serviceParam : map[serviceParam];

  if (contactForm && value) {
    const select = contactForm.querySelector('[name="service"]');
    if (select?.querySelector(`option[value="${value}"]`)) {
      select.value = value;
    }
  }

  if (waitlistForm && (value === "cita-unica" || value === "trimestral")) {
    const planSelect = waitlistForm.querySelector('[name="plan"]');
    if (planSelect) planSelect.value = value;
  }
}

function apiAvailable() {
  return Boolean(CONFIG.apiBaseUrl);
}

async function postJson(path, body) {
  const res = await fetch(`${CONFIG.apiBaseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    const detail = payload?.detail || payload?.title || "No se pudo enviar. Inténtalo de nuevo.";
    throw new Error(detail);
  }

  return payload;
}

function readBioevolvaFields(form) {
  const isUser = form.querySelector('[name="bioevolva_user"]')?.checked === true;
  const bioEmail = form.querySelector('[name="bioevolva_email"]')?.value?.trim() || "";
  return { bioevolvaUser: isUser, bioevolvaEmail: isUser ? bioEmail : undefined };
}

function trackingPayload() {
  const utm = getUtmParams();
  return {
    source: utm.source || document.referrer || "landing",
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
  };
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

function ensureCalStub() {
  if (window.Cal) return;

  (function (C, A, L) {
    const p = function (a, ar) {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
  })(window, CONFIG.calEmbedScript, "init");
}

function initCalEmbed() {
  const container = document.getElementById("cal-embed");
  if (!container || !CONFIG.calLink) return;

  const inlineId = "cal-inline";
  container.classList.remove("cal-placeholder");
  container.classList.add("cal-embed-active");
  container.innerHTML = `<div id="${inlineId}" class="cal-inline"></div>`;

  try {
    ensureCalStub();
    window.Cal("init", { origin: CONFIG.calOrigin });
    window.Cal("inline", {
      elementOrSelector: `#${inlineId}`,
      calLink: CONFIG.calLink,
      config: {
        layout: "month_view",
        theme: "light",
      },
    });
    window.Cal("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  } catch {
    container.classList.add("cal-placeholder");
    container.classList.remove("cal-embed-active");
    container.innerHTML = `
      <p class="cal-placeholder-title">Reservar consulta gratis</p>
      <p>El calendario no se pudo cargar aquí. Ábrelo en una pestaña nueva.</p>
      <a class="btn btn-rose btn-full" href="${CONFIG.calOrigin}/${CONFIG.calLink}" target="_blank" rel="noopener noreferrer">
        Abrir calendario Cal.eu
      </a>
      <p class="cal-placeholder-hint">
        O reserva por
        <a href="https://wa.me/${CONFIG.whatsapp}" data-whatsapp-link target="_blank" rel="noopener noreferrer">WhatsApp</a>.
      </p>
    `;
    initWhatsappLinks();
  }
}

function submitWaitlistViaMailto(form) {
  const data = new FormData(form);
  const email = data.get("email");
  const plan = data.get("plan");
  const planLabel = WAITLIST_PLAN_LABELS[plan] || plan;
  const bio = readBioevolvaFields(form);
  const bioLine = bio.bioevolvaUser
    ? `\nBioEvolva: sí (${bio.bioevolvaEmail || email})`
    : "\nBioEvolva: no";

  const subject = encodeURIComponent(`[${CONFIG.name}] Lista de interés — ${planLabel}`);
  const body = encodeURIComponent(
    `Hola Carolina,\n\nQuiero apuntarme a la lista de interés.\n\nEmail: ${email}\nPlan: ${planLabel}${bioLine}\n`,
  );

  window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
}

function showFormSuccess(formId, successId) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  form?.classList.add("hidden");
  success?.classList.add("visible");
}

async function submitContactViaApi(form) {
  const data = new FormData(form);
  const bio = readBioevolvaFields(form);

  await postJson("/api/leads/contact", {
    name: data.get("name"),
    email: data.get("email"),
    phone: data.get("phone") || undefined,
    service: data.get("service"),
    message: data.get("message"),
    bioevolvaUser: bio.bioevolvaUser,
    bioevolvaEmail: bio.bioevolvaEmail,
    privacyConsent: true,
    website: data.get("website") || "",
    ...trackingPayload(),
  });
}

function submitContactViaMailto(form) {
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const phone = data.get("phone") || "No indicado";
  const service = data.get("service");
  const message = data.get("message");
  const bio = readBioevolvaFields(form);
  const serviceLabel = SERVICE_LABELS[service] || service;

  const bioLine = bio.bioevolvaUser
    ? `\nBioEvolva: sí (${bio.bioevolvaEmail || email})`
    : "\nBioEvolva: no";

  const subject = encodeURIComponent(`[${CONFIG.name}] ${serviceLabel}`);
  const body = encodeURIComponent(
    `Hola Carolina,\n\nInterés: ${serviceLabel}\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}${bioLine}\n\nMensaje:\n${message}`,
  );

  window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const errorEl = document.getElementById("contact-form-error");
  if (!form) return;

  initBioevolvaToggle(form, "bioevolva-fields");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (errorEl) errorEl.hidden = true;

    try {
      if (apiAvailable()) {
        await submitContactViaApi(form);
        showFormSuccess("contact-form", "form-success");
      } else {
        submitContactViaMailto(form);
        showFormSuccess("contact-form", "form-success");
        const success = document.getElementById("form-success");
        const title = success?.querySelector("h3");
        const text = success?.querySelector("p");
        if (title) title.textContent = "Mensaje preparado";
        if (text) {
          text.innerHTML =
            'Se abrirá tu correo. Si no, escribe a <a href="mailto:carolinaromero.dietista@proton.me">carolinaromero.dietista@proton.me</a>.';
        }
      }
    } catch (err) {
      if (errorEl) {
        errorEl.textContent = err.message || "Error al enviar.";
        errorEl.hidden = false;
      }
    }
  });
}

function initWaitlistForm() {
  const form = document.getElementById("waitlist-form");
  const errorEl = document.getElementById("waitlist-form-error");
  if (!form) return;

  initBioevolvaToggle(form, "waitlist-bioevolva-fields");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (errorEl) errorEl.hidden = true;

    const data = new FormData(form);
    const bio = readBioevolvaFields(form);

    try {
      if (apiAvailable()) {
        await postJson("/api/leads/waitlist", {
          email: data.get("email"),
          plan: data.get("plan"),
          bioevolvaUser: bio.bioevolvaUser,
          bioevolvaEmail: bio.bioevolvaEmail,
          privacyConsent: true,
          website: data.get("website") || "",
          ...trackingPayload(),
        });
        showFormSuccess("waitlist-form", "waitlist-success");
      } else {
        submitWaitlistViaMailto(form);
        showFormSuccess("waitlist-form", "waitlist-success");
        const success = document.getElementById("waitlist-success");
        const title = success?.querySelector("h3");
        const text = success?.querySelector("p");
        if (title) title.textContent = "Mensaje preparado";
        if (text) {
          text.innerHTML =
            'Se abrirá tu correo. Si no, escríbeme por <a href="https://wa.me/34695504249" target="_blank" rel="noopener noreferrer">WhatsApp</a> o a <a href="mailto:carolinaromero.dietista@proton.me">carolinaromero.dietista@proton.me</a>.';
        }
      }
    } catch (err) {
      if (errorEl) {
        errorEl.textContent = err.message || "Error al apuntarte.";
        errorEl.hidden = false;
      }
    }
  });
}

function initBioevolvaToggle(form, fieldsId) {
  const checkbox = form.querySelector('[name="bioevolva_user"]');
  const fields = document.getElementById(fieldsId);
  if (!checkbox || !fields) return;

  const sync = () => {
    fields.hidden = !checkbox.checked;
    const emailInput = fields.querySelector('[name="bioevolva_email"]');
    if (emailInput) emailInput.required = checkbox.checked;
  };

  checkbox.addEventListener("change", sync);
  sync();
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

function initWhatsappLinks() {
  const params = new URLSearchParams(window.location.search);
  const servicio = params.get("servicio") || getServiceParam();
  let text = "Hola Carolina, me interesa la consulta informativa gratuita.";

  if (servicio === "trimestral" || servicio === "recomposicion") {
    text = "Hola Carolina, me interesa el plan trimestral.";
  } else if (servicio === "cita-unica") {
    text = "Hola Carolina, me interesa la cita única.";
  } else if (params.get("utm_source") === "bioevolva") {
    text = "Hola Carolina, vengo desde BioEvolva y me interesa la asesoría.";
  }

  const encoded = encodeURIComponent(text);
  document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
    el.href = `https://wa.me/${CONFIG.whatsapp}?text=${encoded}`;
  });
}

async function loadTestimonials() {
  const section = document.getElementById("opiniones");
  const grid = document.getElementById("testimonials-grid");
  const empty = document.getElementById("testimonials-empty");
  const casos = document.getElementById("casos-tipo");
  if (!grid) return;

  try {
    const res = await fetch("data/testimonials.json");
    if (!res.ok) throw new Error("No testimonials");
    const items = await res.json();
    const published = items.filter((t) => t.published !== false && !t.text?.includes("sustituir"));

    if (!published.length) {
      if (section) section.hidden = true;
      if (casos) casos.hidden = false;
      if (empty) empty.hidden = true;
      return;
    }

    if (section) section.hidden = false;
    if (casos) casos.hidden = true;
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
    if (section) section.hidden = true;
    if (casos) casos.hidden = false;
    if (empty) empty.hidden = true;
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
  initWaitlistForm();
  initNav();
  initWhatsappLinks();
  loadTestimonials();
  applyServiceParam();
  window.addEventListener("hashchange", applyServiceParam);
});
