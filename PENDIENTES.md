# Pendientes — Web Carolina Romero (dietista)

**Última actualización:** julio 2026  
**Web actual:** https://carol-88.github.io/carolina-romero-dietista/  
**Email:** carolinaromero.dietista@proton.me

---

**Repositorio GitHub:** `carolina-romero-dietista` (renombrado desde `carolina-romero-landing`).

**Marco fiscal (asesoría julio 2026):** puedes empezar a trabajar (consultas gratis y captación) sin alta de autónoma hasta que el volumen de ingresos justifique la cuota de autónomo + gestoría, o en su defecto el SMI. **Cuando vayas a cobrar de forma habitual**, confirma con tu asesor/a el momento exacto del alta. La web ya está orientada a **consulta gratis abierta**; los planes de pago se formalizan con propuesta escrita (no checkout online).

---

## Backend propio (Docker + PostgreSQL)

| # | Tarea | Estado | Notas |
|---|--------|--------|--------|
| B1 | **API Spring Boot** | ✅ Hecho | `backend/` — contacto y lista de espera |
| B2 | **Docker Compose** | ✅ Hecho | `docker compose up` — API :8081, Postgres :5433 |
| B3 | **Desplegar API en producción** | ⏳ Pendiente | Render, VPS, etc. + URL en `meta api-base-url` |
| B4 | **Exportar leads** | ⏳ Manual | SQL en `backend/README.md` |

Sin API en GitHub Pages: contacto y lista de interés usan **mailto** + WhatsApp.

---

## Para empezar a dar asesorías (orden recomendado)

| # | Tarea | Estado | Notas |
|---|--------|--------|--------|
| 1 | **Cal.eu + preguntas de reserva** | ✅ Hecho | [cal.eu/carolinaromero](https://cal.eu/carolinaromero) — slot + cuestionario en el mismo flujo; email de Cal con respuestas |
| 2 | **NIF/NIE en legales** | ⏳ Cuando proceda | Sustituir el placeholder en `legal/aviso-legal.html` y `legal/privacidad.html`. |
| 3 | **Dirección fiscal completa** | ⏳ Parcial | Teruel indicado; dirección exacta en documentación de contratación / cuando tengas alta. |
| 4 | **Alta como autónoma** | ⏳ Según volumen | Según asesoría fiscal: cuando ingresos justifiquen cuota + gestor (o SMI). Obligatorio antes de facturar de forma habitual. |
| 5 | **Dominio propio** | ⏳ Opcional | Ej. `carolinaromero.com` — sustituir URL de GitHub en SEO y legales. |

El cuestionario previo va integrado en Cal.eu (booking questions). **No hace falta Tally.**

---

## Contenido y confianza

| # | Tarea | Estado | Notas |
|---|--------|--------|--------|
| 7 | **Foto profesional** | ⏳ Pendiente | Hero y “Sobre mí”: **placeholder** hasta tener la foto. |
| 8 | **Testimonios reales** | ⏳ Pendiente | Con consentimiento por escrito. Añadir en `data/testimonials.json`. |
| 9 | **Título definitivo CFGS** | ⏳ En trámite | Certificado provisional; actualizar copy cuando llegue el físico. |

### Formato `data/testimonials.json`

```json
[
  {
    "name": "María G.",
    "context": "Grupo de hábitos 2026",
    "text": "Texto del testimonio con sus palabras.",
    "published": true
  }
]
```

---

## Herramientas externas (paso a paso)

### Cal.eu — reservas ✅

Perfil activo: [https://cal.eu/carolinaromero](https://cal.eu/carolinaromero)

Configuración en `js/main.js`:

```javascript
calLink: "carolinaromero",
calOrigin: "https://cal.eu",
calEmbedScript: "https://app.cal.eu/embed/embed.js",
```

Si creas un evento con slug propio (ej. `carolinaromero/consulta-gratis`), cambia `calLink` a ese path.

Las **preguntas de reserva** (hábitos, objetivo, teléfono, etc.) están configuradas en el propio evento de Cal.eu: al confirmar la cita llegan en el email de notificación.

Eventos de pago (49 € / 179 €): crear en borrador; cobro online (Stripe) solo cuando tu asesor/a lo indique tras el alta.

---

## Fiscal y legal (post-asesoría)

- [ ] Confirmar con gestor/a el **umbral** concreto para alta RETA + Hacienda en tu caso.
- [ ] Epígrafe IAE **839** (asesoría nutricional) — confirmar.
- [ ] Seguro de responsabilidad civil profesional (recomendado antes de cobrar).
- [ ] Facturación: VeriFactu / software o gestoría cuando cobres.
- [ ] Actualizar términos si cambian precios o condiciones del grupo WhatsApp.

---

## Mejora web y conversión (marzo 2026)

**Contexto:** feedback curso SEPE (analítica web) + primer cliente real. Objetivo: más clientes cualificados y copy alineado con el servicio que ya entregas.

**Filosofía de servicio (para copy):** plan 360 (alimentación + movimiento + descanso). No acompañamiento de por vida: enseñar a elegir mejor y mantener la salud en el tiempo.

### P0 — Alinear copy con el servicio real (urgente)

| # | Tarea | Archivos | Detalle |
|---|--------|----------|---------|
| W1 | **Reescribir plan Cita única (49 €)** | ✅ Hecho | `index.html`, `legal/terminos.html`, FAQ, Schema.org |
| W2 | **Definir y reflejar Plan trimestral** | ✅ Validado | Estructura trimestral confirmada; sin cambios. |
| W3 | **Consulta gratuita (30 min)** | ✅ Hecho | `#reserva` + FAQ + copy detallado |
| W4 | **CTA post-consulta** | ✅ Hecho | Hero, planes, reserva, contacto |
| W5 | **Tabla comparativa** | ✅ Hecho | 2 sem, 2 menús, 360, WhatsApp |

### P1 — Estructura y conversión (feedback SEPE)

| # | Tarea | Archivos | Detalle |
|---|--------|----------|---------|
| W6 | **Reordenar secciones** | ✅ Hecho | Hero → Qué incluye → Para quién → Planes → Sobre mí → FAQ → Reserva → Contacto (+ BioEvolva/grupo/casos al final) |
| W7 | **Hero: menos texto, más persuasión** | ✅ Hecho | Tono tú, 2 CTAs, disclaimer abajo, placeholder foto |
| W8 | **Sustituir «Cómo funciona» por «Qué incluye»** | ✅ Hecho | Grid 6 beneficios con iconos |
| W9 | **Tono: menos 1ª persona en venta** | ✅ Hecho | Hero/planes/beneficios en 2ª persona |
| W10 | **Header: contacto más visible** | ✅ Hecho | Botón Contacto + Consulta gratis |
| W11 | **Lista de interés** | ⏳ Revisar | Sigue activa; valorar más adelante |

### P2 — Confianza y prueba social

| # | Tarea | Archivos | Detalle |
|---|--------|----------|---------|
| W12 | **Foto profesional** | ⏳ Placeholder | Hueco en hero y Sobre mí hasta tener la foto |
| W13 | **Testimonio primer cliente** | ⏳ Pendiente | Cuando dé consentimiento |
| W14 | **Bloque «Mi enfoque»** | ✅ Hecho | En `#sobre-mi` con historia personal |

### P3 — Analítica y captación

| # | Tarea | Detalle |
|---|--------|---------|
| W15 | **Google Search Console** | Registrar URL, enviar `sitemap.xml`. |
| W16 | **Eventos de conversión** | Medir clics `#reserva`, `#contacto`, WhatsApp, Cal.eu (GA4 o similar si lo añades). |
| W17 | **LinkedIn / redes** | Usar `images/linkedin-cover.png`; post con enlace a consulta gratis. |
| W18 | **Cal.eu** | Confirmar preguntas alineadas con la llamada gratis (objetivo, obstáculos, etc.). |

### P4 — Operativa (primer cliente y siguientes)

| # | Tarea | Detalle |
|---|--------|---------|
| W19 | **Plantilla entrega cita única** | Checklist interno: 2 menús, tips compra, resumen email, ventana WhatsApp 2 sem. |
| W20 | **Panel / CRM clientas** | Perfiles, objetivos, progresos, adherencia (ver fase futura). |
| W21 | **Alta autónoma + factura** | Cuando cobres de forma habitual; NIF en legales. |

### Orden de ejecución recomendado

1. **W1, W3, W5** — la web no debe contradecir lo que vendes al primer cliente.  
2. **W6, W7, W8** — estructura y conversión.  
3. **W12, W14, W13** — confianza.  
4. **W15–W18** — medir y captar.

### Copy de referencia (Cita única — borrador)

> Tras la consulta gratuita, **elige cómo quieres tu plan de 2 semanas**: videollamada de 1 h conmigo o cuestionario completo y resumen por email. Incluye **2 opciones de menú**, pautas de organización y compra, y **WhatsApp en horario laboral** para dudas, motivación y seguimiento de adherencia. Trabajamos **alimentación, movimiento y descanso** para que aprendas a mantener tus hábitos sin depender de mí a largo plazo.

---

## Fase futura (no urgente)

| Tarea | Descripción |
|--------|-------------|
| **Panel / CRM de clientas** | **Prioridad mañana (18 jul 2026).** Web aparte o panel admin: perfiles, objetivos, progresos, seguimiento de asesorías. Decidir stack (¿ampliar el backend Spring actual?). |
| **Reseñas con login** | Solo clientas verificadas; requiere backend. |
| **Google Business Profile** | Cuando tengas clientas y reseñas en Google. |
| **Google Search Console** | Registrar la URL y enviar `sitemap.xml`. |
| **Blog / SEO** | Artículos sobre hábitos, menús semanales, etc. |
| **Checkout online** | Solo con alta y criterio fiscal claro. |

---

## Archivos clave del proyecto

| Archivo | Para qué |
|---------|----------|
| `js/main.js` | Embed Cal.eu, email, WhatsApp |
| `data/testimonials.json` | Opiniones publicadas en la web |
| `index.html` | Contenido principal |
| `legal/aviso-legal.html` | NIF, domicilio, URL web |
| `deploy-github-pages.ps1` | Publicar en GitHub Pages |
| `images/logo.png` | Logo (original en `logo-original.png`) |

---

## Checklist “¿puedo empezar ya?”

- [x] Consulta gratis visible y con CTA claro
- [x] Copy sin bloquear por “falta alta de autónoma”
- [x] Lista de interés con fallback mailto (sin Docker en producción)
- [x] Cal.eu con preguntas de reserva ([cal.eu/carolinaromero](https://cal.eu/carolinaromero))
- [ ] NIF en legales cuando proceda
- [ ] Alta de autónoma + quitar fricción de cobro cuando toque facturar

---

*Cuando completes un ítem, márcalo aquí o pídele al asistente que actualice la web.*
