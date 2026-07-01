# Pendientes — Web Carolina Romero (dietista)

**Última actualización:** mayo 2026  
**Web actual:** https://carol-88.github.io/carolina-romero-dietista/  
**Email:** asesoria.carolinaromero@protonmail.com

---

**Repositorio GitHub:** `carolina-romero-dietista` (renombrado desde `carolina-romero-landing`).

---

## Backend propio (Docker + PostgreSQL)

| # | Tarea | Estado | Notas |
|---|--------|--------|--------|
| B1 | **API Spring Boot** | ✅ Hecho | `backend/` — contacto y lista de espera |
| B2 | **Docker Compose** | ✅ Hecho | `docker compose up` — API :8081, Postgres :5433 |
| B3 | **Desplegar API en producción** | ⏳ Pendiente | Render, VPS, etc. + URL en `meta api-base-url` |
| B4 | **Exportar leads** | ⏳ Manual | SQL en `backend/README.md` |

---

## Prioridad alta (antes de cobrar clientes)

| # | Tarea | Estado | Notas |
|---|--------|--------|--------|
| 1 | **Alta como autónoma** | ⏳ Pendiente | Tras asesoría fiscal. Obligatorio antes de facturar 49 € / 179 €. |
| 2 | **NIF/NIE en aviso legal** | ⏳ Pendiente | `legal/aviso-legal.html` y `legal/privacidad.html` — campo `[COMPLETAR]`. |
| 3 | **Dirección fiscal completa** | ⏳ Parcial | Teruel indicado; falta dirección exacta cuando tengas autónoma. |
| 4 | **Cuestionario Tally** | ⏳ Pendiente | Crear en [tally.so](https://tally.so) y pegar URL en `js/main.js` → `questionnaireUrl`. |
| 5 | **Cal.com** | ⏳ Pendiente | Cuenta con Protonmail; evento consulta gratis 30 min; horario 9–13 y 15–19 h. Pegar embed en `js/main.js` → `calEmbedHtml`. |
| 6 | **Dominio propio barato** | ⏳ Pendiente | Ej. `carolinaromero.com` — sustituir URL de GitHub en SEO y legales. |

---

## Contenido y confianza

| # | Tarea | Estado | Notas |
|---|--------|--------|--------|
| 7 | **Foto profesional** | ⏳ Pendiente | Hero y “Sobre mí”; ahora solo logo. |
| 8 | **Testimonios reales** | ⏳ Pendiente | Con consentimiento por escrito. Añadir en `data/testimonials.json` (ver formato abajo). |
| 9 | **Título definitivo CFGS** | ⏳ En trámite | Ya tienes certificado provisional; actualizar copy cuando llegue el físico. |

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

### Tally — cuestionario previo

1. Registrarse en [tally.so](https://tally.so) con Protonmail.
2. Crear formulario con bloques: datos personales, objetivo, hábitos, salud (cribado), interés en grupo WhatsApp, RGPD.
3. Al final del formulario: enlace a la sección **Reserva** de la web (o a Cal.com cuando esté).
4. Copiar enlace público → `js/main.js`:

```javascript
questionnaireUrl: "https://tally.so/r/XXXXXX",
```

### Cal.com — reservas

1. [cal.com](https://cal.com) → registro con `asesoria.carolinaromero@protonmail.com`.
2. Conectar Google Calendar.
3. Crear evento **Consulta informativa gratuita** — 30 min, 0 €.
4. Disponibilidad: Lun–Vie, 9:00–13:00 y 15:00–19:00 (hora peninsular).
5. Evento → **Embed** → copiar HTML → `js/main.js`:

```javascript
calEmbedHtml: `<div>...</div>`,
```

6. Eventos de pago (49 € / 179 €): crear en borrador; activar Stripe **solo** con autónoma.

---

## Fiscal y legal (post-asesoría)

- [ ] Epígrafe IAE **839** (asesoría nutricional) — confirmar con gestor/a.
- [ ] Seguro de responsabilidad civil profesional (recomendado antes de cobrar).
- [ ] Facturación: VeriFactu / software o gestoría.
- [ ] Actualizar términos si cambian precios o condiciones del grupo WhatsApp.

---

## Fase futura (no urgente)

| Tarea | Descripción |
|--------|-------------|
| **Reseñas con login** | Solo clientas verificadas; requiere Supabase o similar (backend). |
| **Google Business Profile** | Cuando tengas clientas y reseñas en Google. |
| **Google Search Console** | Registrar la URL y enviar `sitemap.xml`. |
| **Blog / SEO** | Artículos sobre hábitos, menús semanales, etc. |
| **Renombrar carpeta local** | Opcional: `dietista-landingpage` → otro nombre en tu PC. |

---

## Archivos clave del proyecto

| Archivo | Para qué |
|---------|----------|
| `js/main.js` | URL Tally, embed Cal.com, email, WhatsApp |
| `data/testimonials.json` | Opiniones publicadas en la web |
| `index.html` | Contenido principal |
| `legal/aviso-legal.html` | NIF, domicilio, URL web |
| `deploy-github-pages.ps1` | Publicar en GitHub Pages |
| `images/logo.png` | Logo sin texto “desarrollo web” (original en `logo-original.png`) |

---

## Checklist rápido “¿puedo cobrar ya?”

- [ ] Autónoma dada de alta (Hacienda + Seguridad Social)
- [ ] NIF y domicilio en la web
- [ ] Seguro RC (recomendado)
- [ ] Cal.com con cobro o factura manual acordada
- [ ] Quitar badge “Próximamente” de los planes en `index.html`
- [ ] Actualizar aviso de la barra superior (ya no solo informativa)

---

*Cuando completes un ítem, márcalo aquí o pídele al asistente que actualice la web.*
