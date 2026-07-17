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
| 1 | **Cal.eu (prioridad nº 1)** | ✅ Hecho | [cal.eu/carolinaromero](https://cal.eu/carolinaromero) — embed en `js/main.js` (`calLink` + `calOrigin`) |
| 2 | **Tally (prioridad nº 2)** | ⏳ Pendiente | Mejora la preparación de la cita. Pegar URL en `questionnaireUrl`. |
| 3 | **NIF/NIE en legales** | ⏳ Cuando proceda | Sustituir el placeholder en `legal/aviso-legal.html` y `legal/privacidad.html`. |
| 4 | **Dirección fiscal completa** | ⏳ Parcial | Teruel indicado; dirección exacta en documentación de contratación / cuando tengas alta. |
| 5 | **Alta como autónoma** | ⏳ Según volumen | Según asesoría fiscal: cuando ingresos justifiquen cuota + gestor (o SMI). Obligatorio antes de facturar de forma habitual. |
| 6 | **Dominio propio** | ⏳ Opcional | Ej. `carolinaromero.com` — sustituir URL de GitHub en SEO y legales. |

**¿Por qué Cal.com antes que Tally?**  
La consulta gratis de 30 min es el producto que ofreces ahora y todos los CTAs llevan a `#reserva`. Sin calendario (o WhatsApp, que ya está como fallback), el embudo se corta. Tally mejora el cribado, pero las primeras clientas pueden gestionar la anamnesis por WhatsApp/email.

---

## Contenido y confianza

| # | Tarea | Estado | Notas |
|---|--------|--------|--------|
| 7 | **Foto profesional** | ⏳ Pendiente | Hero y “Sobre mí”; ahora solo logo. |
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

Eventos de pago (49 € / 179 €): crear en borrador; cobro online (Stripe) solo cuando tu asesor/a lo indique tras el alta.

### Tally — cuestionario previo (después de Cal)

1. Registrarse en [tally.so](https://tally.so) con `carolinaromero.dietista@proton.me`.
2. Crear formulario: datos personales, objetivo, hábitos, salud (cribado), interés en grupo WhatsApp, RGPD.
3. Al final: enlace de vuelta a `#reserva` o mensaje de “cita confirmada”.
4. Copiar enlace público → `js/main.js`:

```javascript
questionnaireUrl: "https://tally.so/r/XXXXXX",
```

---

## Fiscal y legal (post-asesoría)

- [ ] Confirmar con gestor/a el **umbral** concreto para alta RETA + Hacienda en tu caso.
- [ ] Epígrafe IAE **839** (asesoría nutricional) — confirmar.
- [ ] Seguro de responsabilidad civil profesional (recomendado antes de cobrar).
- [ ] Facturación: VeriFactu / software o gestoría cuando cobres.
- [ ] Actualizar términos si cambian precios o condiciones del grupo WhatsApp.

---

## Fase futura (no urgente)

| Tarea | Descripción |
|--------|-------------|
| **Reseñas con login** | Solo clientas verificadas; requiere backend. |
| **Google Business Profile** | Cuando tengas clientas y reseñas en Google. |
| **Google Search Console** | Registrar la URL y enviar `sitemap.xml`. |
| **Blog / SEO** | Artículos sobre hábitos, menús semanales, etc. |
| **Checkout online** | Solo con alta y criterio fiscal claro. |

---

## Archivos clave del proyecto

| Archivo | Para qué |
|---------|----------|
| `js/main.js` | URL Tally, embed Cal.com, email, WhatsApp |
| `data/testimonials.json` | Opiniones publicadas en la web |
| `index.html` | Contenido principal |
| `legal/aviso-legal.html` | NIF, domicilio, URL web |
| `deploy-github-pages.ps1` | Publicar en GitHub Pages |
| `images/logo.png` | Logo (original en `logo-original.png`) |

---

## Checklist “¿puedo empezar ya?”

- [x] Consulta gratis visible y con CTA claro (WhatsApp hasta tener Cal.com)
- [x] Copy sin bloquear por “falta alta de autónoma”
- [x] Lista de interés con fallback mailto (sin Docker en producción)
- [x] Cal.eu configurado ([cal.eu/carolinaromero](https://cal.eu/carolinaromero))
- [ ] Tally (recomendado) en `questionnaireUrl`
- [ ] NIF en legales cuando proceda
- [ ] Alta de autónoma + quitar fricción de cobro cuando toque facturar

---

*Cuando completes un ítem, márcalo aquí o pídele al asistente que actualice la web.*
