# CampusHire Backend

Spring Boot backend for CampusHire.

## Quick Start

1. Build:
   - Windows PowerShell:
     ```powershell
     Push-Location "c:\Users\SJB\Downloads\CampusHire-Hub\backend"
     .\mvnw.cmd -DskipTests package
     Pop-Location
     ```

2. Run (dev, H2):
   ```powershell
   java -jar target/campushire-0.0.1-SNAPSHOT.jar
   ```

3. Healthcheck:
   - `http://localhost:8080/actuator/health`

## Swagger / OpenAPI

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

Note: JWT-secured APIs require an `Authorization: Bearer <JWT>` header.
Login via `/api/auth/login` and paste the token into Swagger UI Authorize dialog.

## Profiles

- `dev` (default): In-memory H2
- `prod`: PostgreSQL via environment variables (`DB_URL`, `DB_USER`, `DB_PASSWORD`)

## Modules

- Auth & Security (JWT)
- Student Profiles & Resume Uploads
- Placement Events & Companies
- Admin Filters & Shortlists (CSV export)
- Faculty Read-only Access
- Analytics (summary, placements, company & department stats)

## Docs & Tools

- Curl examples: see `backend/test_api.md`
- Postman: `backend/docs/campushire.postman_collection.json`
- Sample responses: `backend/docs/sample_responses.md`

## Docker

See the root `docker-compose.yml` and `backend/Dockerfile`. Configure env vars and run `docker compose up`.
