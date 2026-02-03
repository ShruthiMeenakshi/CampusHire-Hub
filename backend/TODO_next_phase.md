# Next Phase TODO – Profiles & PostgreSQL

Goal: Add environment-specific profiles and configure PostgreSQL for production.

## Tasks
- Create `application-dev.yaml` (H2, show SQL, H2 console) – DONE
- Create `application-prod.yaml` (PostgreSQL via env vars) – DONE
- Set default active profile to `dev` – DONE
- Read JWT secret from env `JWT_SECRET` with dev fallback – DONE
- Document required env vars for prod – TODO
- Test dev run locally – TODO
- Prepare `docker-compose.yml` for backend + PostgreSQL – TODO

## Env Vars (prod)
- `DB_URL`: JDBC URL, e.g. `jdbc:postgresql://db:5432/campushire`
- `DB_USER`: database username
- `DB_PASSWORD`: database password
- `JWT_SECRET`: long random secret for token signing
- `JWT_EXP_MS`: token expiry in ms (default: 86400000)
- `PORT`: service port (default: 8080)

## Try Dev Locally
```powershell
cd C:\Users\SJB\Downloads\CampusHire-Hub\backend
$env:SPRING_PROFILES_ACTIVE="dev"
$env:JWT_SECRET="dev-secret-change-me"
.\mvnw.cmd spring-boot:run
```

## Try Prod Locally (with local Postgres)
```powershell
cd C:\Users\SJB\Downloads\CampusHire-Hub\backend
$env:SPRING_PROFILES_ACTIVE="prod"
$env:DB_URL="jdbc:postgresql://localhost:5432/campushire"
$env:DB_USER="postgres"
$env:DB_PASSWORD="postgres"
$env:JWT_SECRET="replace-with-strong-secret"
.\mvnw.cmd spring-boot:run
```

## Next Steps
- Add Docker configuration for Postgres and backend
- Create initial DB migration or seed script (Flyway/Liquibase optional)
- Harden security headers and logging
