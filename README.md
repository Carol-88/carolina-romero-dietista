# Carolina Romero — Landing de asesoría en dietética

Web profesional de **Carolina Romero** (Técnica Superior en Dietética): asesoría en alimentación y hábitos online desde Teruel para toda España.

| | |
|---|---|
| **Web publicada** | https://carol-88.github.io/carolina-romero-dietista/ |
| **Repositorio** | [Carol-88/carolina-romero-dietista](https://github.com/Carol-88/carolina-romero-dietista) |
| **Email** | asesoria.carolinaromero@protonmail.com |
| **WhatsApp** | +34 695 504 249 |
| **App relacionada** | [BioEvolva](https://bioevolva.es) (10 % dto. en asesoría para usuarias con cuenta) |

---

## Qué incluye el proyecto

- **Frontend estático** — HTML, CSS y JavaScript vanilla (sin React). Ideal para SEO y GitHub Pages.
- **Backend propio** — Spring Boot + PostgreSQL + Docker (formulario de contacto y lista de espera).
- **Páginas legales** — Aviso legal, privacidad, cookies y términos en `legal/`.
- **Integraciones previstas** — Tally (cuestionario), Cal.com (reservas). Ver configuración más abajo.

---

## Estructura del repositorio

```
dietista-landingpage/
├── index.html              # Landing principal
├── css/styles.css          # Estilos
├── js/main.js              # Lógica: menú, formularios, API, testimonios
├── data/testimonials.json  # Opiniones (JSON manual)
├── images/                 # Logo, favicons, og-card.png
├── legal/                  # Páginas legales
├── backend/                # API Spring Boot (Java 21)
├── docker-compose.yml      # PostgreSQL + API en local
├── deploy-github-pages.ps1 # Publicar frontend en GitHub Pages
├── PENDIENTES.md           # Checklist operativa (Tally, autónoma, etc.)
└── .env.example            # Variables de referencia
```

---

## Requisitos

### Solo ver la web estática

- Navegador moderno.
- Opcional: [Node.js](https://nodejs.org/) para `npx serve` en local.

### Stack completo (formularios → base de datos)

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Puertos libres: **5433** (PostgreSQL) y **8081** (API)
- Para desarrollo del backend sin Docker: Java 21 + Maven

---

## Arranque rápido

### 1. Solo frontend (sin API)

Abre `index.html` en el navegador o sirve la carpeta:

```powershell
cd d:\Proyectos2026\dietista-landingpage
npx --yes serve . -l 5500
```

Abre http://localhost:5500

**Comportamiento sin API:**

- El **formulario de contacto** abre el cliente de correo (`mailto`).
- La **lista de espera** muestra aviso de que necesita el servidor.

### 2. Frontend + backend (recomendado en desarrollo)

**Terminal 1 — Docker:**

```powershell
cd d:\Proyectos2026\dietista-landingpage
docker compose up --build
```

| Servicio | URL |
|----------|-----|
| API health | http://localhost:8081/api/health |
| Swagger | http://localhost:8081/swagger-ui.html |
| PostgreSQL | `localhost:5433` (user/pass/db: `dietista`) |

**Terminal 2 — Activar API en la web:**

En `index.html`, descomenta o rellena el meta tag:

```html
<meta name="api-base-url" content="http://localhost:8081" />
```

> En producción (GitHub Pages) deja este meta **vacío** hasta tener el API desplegado en un servidor público. Si está vacío, el contacto vuelve a `mailto`.

**Terminal 3 — Servir la web:**

```powershell
npx --yes serve . -l 5500
```

Prueba contacto y lista de espera en http://localhost:5500

### 3. Parar Docker

```powershell
docker compose down
```

Datos de PostgreSQL se conservan en el volumen `dietista-postgres-data`.

---

## Configuración del frontend

### API (`index.html`)

```html
<meta name="api-base-url" content="" />
```

| Valor | Efecto |
|-------|--------|
| Vacío | Contacto por `mailto`; lista de espera requiere API |
| `http://localhost:8081` | Desarrollo local con Docker |
| `https://api.tudominio.com` | Producción |

### Integraciones (`js/main.js`)

```javascript
const CONFIG = {
  questionnaireUrl: "",  // Tally: https://tally.so/r/xxxxx
  calEmbedHtml: "",      // HTML embed de Cal.com
  // email, whatsapp: ya configurados
};
```

Tras cambiar `js/main.js`, incrementa la versión en `index.html` si hace falta bust de caché:

```html
<script src="js/main.js?v=6" defer></script>
```

### Testimonios (`data/testimonials.json`)

```json
[
  {
    "name": "María G.",
    "context": "Grupo de hábitos 2026",
    "text": "Texto con sus palabras.",
    "published": true
  }
]
```

Si no hay testimonios publicados, la web muestra **casos tipo** anonimizados.

### Enlaces profundos

| URL | Efecto |
|-----|--------|
| `?servicio=trimestral` | Preselecciona plan trimestral en formularios |
| `?servicio=cita-unica` | Preselecciona cita única |
| `?utm_source=bioevolva` | Mensaje de WhatsApp adaptado |

---

## API backend

Documentación detallada en [`backend/README.md`](backend/README.md).

### Endpoints públicos

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/health` | Estado del servicio |
| `POST` | `/api/leads/contact` | Formulario de contacto |
| `POST` | `/api/leads/waitlist` | Lista de espera de planes |

Ambos POST incluyen honeypot (`website`), consentimiento RGPD y campos opcionales BioEvolva / UTM.

### Consultar leads en PostgreSQL

```powershell
docker exec -it dietista-postgres psql -U dietista -d dietista
```

```sql
SELECT id, lead_type, email, name, service, bioevolva_user, created_at
FROM leads
ORDER BY created_at DESC;
```

### Variables de entorno (backend)

Copia `backend/.env.example` → `backend/.env` si desarrollas sin Docker Compose.

| Variable | Descripción |
|----------|-------------|
| `SPRING_DATASOURCE_URL` | JDBC PostgreSQL |
| `SPRING_DATASOURCE_USERNAME` / `PASSWORD` | Credenciales BD |
| `APP_CORS_ALLOWED_ORIGINS` | Orígenes permitidos (CSV), p. ej. `https://carol-88.github.io` |

### Desarrollo backend sin Docker

```powershell
docker compose up postgres -d
cd backend
mvn spring-boot:run
```

---

## Publicar en GitHub Pages

### Opción A — Git push (habitual)

```powershell
git add .
git commit -m "Actualizar web"
git push origin main
```

GitHub Pages publica la rama `main` en unos minutos.

### Opción B — Script PowerShell

```powershell
.\deploy-github-pages.ps1
```

Requisito: `gh auth login`. El script hace commit de archivos estáticos y push al repo `carolina-romero-dietista`.

**Nota:** GitHub Pages solo sirve el **frontend estático**. El backend hay que desplegarlo aparte (Render, VPS, Railway, etc.).

---

## Producción: checklist

1. **Frontend** en GitHub Pages o dominio propio apuntando al mismo contenido.
2. **Backend** en servidor con PostgreSQL gestionado.
3. **`meta api-base-url`** en `index.html` con la URL pública del API.
4. **`APP_CORS_ALLOWED_ORIGINS`** incluyendo la URL de la web.
5. Completar pendientes en [`PENDIENTES.md`](PENDIENTES.md): Tally, Cal.com, NIF en legales, autónoma, etc.

---

## Planes y precios (orientativos)

| Plan | Precio | BioEvolva (−10 %) |
|------|--------|-------------------|
| Consulta informativa | Gratis (30 min) | — |
| Cita única (1 h) | 49 € | 44 € |
| Plan trimestral (12 sem) | 179 € | 161 € |
| Seguimiento suelto | 42 € | 38 € |

Los planes de pago llevan badge **«Próximamente»** hasta formalizar la actividad como autónoma.

---

## SEO y recursos

- `robots.txt` y `sitemap.xml` en la raíz.
- Open Graph: `images/og-card.png`
- Schema.org en `index.html` (Person, ProfessionalService, FAQPage, Offer)
- Canonical y meta tags apuntan a la URL de GitHub Pages (actualizar al tener dominio propio)

---

## Solución de problemas

| Problema | Qué revisar |
|----------|-------------|
| Lista de espera no envía | ¿`docker compose up`? ¿`api-base-url` configurado? ¿CORS incluye tu origen? |
| Contacto solo abre el correo | `api-base-url` vacío → comportamiento esperado |
| Puerto 8081 ocupado | Cambia el mapeo en `docker-compose.yml` (`8082:8080`) |
| Puerto 5433 ocupado | Cambia `5433:5432` en compose y la URL JDBC en local |
| Estilos viejos en la web publicada | Recarga forzada (Ctrl+F5); revisa `?v=` en `styles.css` |
| CORS error en consola | Añade tu URL a `APP_CORS_ALLOWED_ORIGINS` y reinicia el backend |

---

## Relación con BioEvolva

- Landing de asesoría personalizada ↔ app [bioevolva.es](https://bioevolva.es).
- Usuarias con cuenta en BioEvolva: **10 % de descuento** en todos los planes (indicar email de registro al contactar).
- El backend de esta landing es **independiente** del de BioEvolva (`menu-app-front`).

---

## Licencia y contacto

© Carolina Romero. Contenido y diseño de la asesoría.

Para dudas técnicas del repo: revisar `PENDIENTES.md` y abrir issue en GitHub. Para consultas de negocio: asesoria.carolinaromero@protonmail.com
