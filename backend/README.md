# Backend — Carolina Romero Landing

API Spring Boot + PostgreSQL para formulario de contacto y lista de espera.

## Requisitos

- Docker Desktop
- Puertos libres: **5433** (PostgreSQL) y **8081** (API)

## Arrancar

```powershell
cd d:\Proyectos2026\dietista-landingpage
docker compose up --build
```

- Health: http://localhost:8081/api/health
- Swagger: http://localhost:8081/swagger-ui.html

## Probar la landing con API

1. En `index.html`, meta `api-base-url`:
   ```html
   <meta name="api-base-url" content="http://localhost:8081" />
   ```
2. Servir la web estática (ejemplo):
   ```powershell
   npx --yes serve . -l 5500
   ```
3. Abre http://localhost:5500

## Endpoints

| Método | Ruta | Uso |
|--------|------|-----|
| GET | `/api/health` | Estado del servicio |
| POST | `/api/leads/contact` | Formulario de contacto |
| POST | `/api/leads/waitlist` | Lista de espera de planes |

### Ejemplo contacto

```json
{
  "name": "Ana",
  "email": "ana@example.com",
  "service": "consulta-gratis",
  "message": "Hola",
  "privacyConsent": true
}
```

Campo `website` (honeypot): si tiene valor, se rechaza.

## Desarrollo local sin Docker

```powershell
cd backend
# PostgreSQL en 5433 (docker compose up postgres -d)
mvn spring-boot:run
```

## Producción

Despliega el backend en un VPS, Render o similar con PostgreSQL gestionado. Actualiza:

- `meta api-base-url` en `index.html` con la URL pública del API
- `APP_CORS_ALLOWED_ORIGINS` con `https://carol-88.github.io` y tu dominio propio

## Consultar leads (SQL)

```sql
SELECT id, lead_type, email, name, service, bioevolva_user, created_at
FROM leads
ORDER BY created_at DESC;
```
