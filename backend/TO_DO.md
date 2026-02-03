
---

# Backend TODO – CampusHire

Tech Stack: Spring Boot · PostgreSQL · Docker · JWT Security

---

## ✅ Phase 1: Project Setup & Configuration
- [x] Create Spring Boot project
- [x] Configure Maven dependencies (Web, Security, Data JPA, Validation, Lombok, Actuator)
- [x] Add JWT libs (jjwt-api/impl/jackson)
- [x] Add H2 for dev
- [x] Enable JPA & Hibernate
- [x] Create base package structure
- [x] Dev application config (H2, JPA, H2 console, server port, JWT)
- [x] Setup application profiles (`dev`, `prod`)
- [x] Configure PostgreSQL connection (prod via env)
- [x] Setup global exception handling
- [ ] Configure logging

---

## 🔐 Phase 2: Authentication & Authorization (RBAC)
- [x] Design `User` + `Role` (Student / Faculty / Placement Head)
- [x] Implement JWT-based authentication
- [x] Password encryption (BCrypt)
- [x] Role-Based Access Control (method + URL level)
- [x] Login API
- [ ] Logout / Token invalidation (optional)
- [x] Secure APIs with JWT filter
- [x] Access control per role

---

## 👨‍🎓 Phase 3: Student Management Module
- [x] Design `StudentProfile` entity linked to `User`
- [x] Create DTOs (Request)
- [x] Fetch self profile API (`GET /api/student/profile`)
- [x] Update student profile API (`PUT /api/student/profile`)
- [x] Student registration API (via `/api/auth/register` with `role=STUDENT`)
- [x] Fetch all students (Admin)
- [x] Resume upload support (`POST /api/student/resume`)
- [x] Profile lock functionality (Admin only)
- [ ] Input validation refinement

---

## 👩‍🏫 Phase 4: Faculty Module
- [x] Faculty login (via role)
- [x] View student profiles (read-only) (`GET /api/faculty/students`, `GET /api/faculty/students/{id}`)
- [x] View placement statistics (`GET /api/analytics/summary`)
- [x] View placement events (public list)

---

## 🧑‍💼 Phase 5: Placement Head (Admin) Module
- [x] Admin-only API restrictions (method-level)
- [x] Initial student filtering endpoint (dept, CGPA, backlogs, skills)
- [x] Extend filtering (internships contains)
- [x] Export shortlist (CSV)
- [x] Shortlist students API (persisted)
- [x] Lock / unlock student profiles

### Shortlist Management
- [x] Define `Shortlist` entity (ManyToMany with `StudentProfile`)
- [x] Create shortlist (`POST /api/admin/shortlists`)
- [x] List shortlists (`GET /api/admin/shortlists`)
- [x] Add/remove students (`POST /api/admin/shortlists/{id}/students`, `DELETE /api/admin/shortlists/{id}/students/{studentId}`)
- [x] Export shortlist CSV (`GET /api/admin/shortlists/{id}/export`)
- [x] Delete shortlist (`DELETE /api/admin/shortlists/{id}`)

---

## 📅 Phase 6: Placement Events & Company Module
- [x] `PlacementEvent` entity
- [x] Add placement event APIs (CRUD)
 - [x] `Company` entity
 - [x] Update drive status (Upcoming / Completed)
 - [x] Fetch upcoming / past drives
 - [x] Company visit history
 - [x] Student eligibility mapping


---

## 📊 Phase 7: Analytics & Reports
 - [x] Placement statistics service
 - [x] Placed vs unplaced metrics
 - [x] Company-wise hiring stats
 - [x] Department-wise placement stats
 - [x] Average & highest package calculation
 - [x] Dashboard APIs
 - [x] Performance optimization (basic fields added; indexes can be refined)

---

## 🧾 Phase 8: Audit Logs & Monitoring
- [x] `AuditLog` entity
- [ ] Log admin actions (service integration)
- [ ] Store timestamped events
- [ ] Secure audit log APIs
- [ ] Read-only access for admin

---

## 🐳 Phase 9: Docker & Deployment
- [x] Create backend Dockerfile (multi-stage build)
- [x] Configure docker-compose (backend + Postgres)
- [x] Environment variable support (DB_URL/USER/PASSWORD, JWT_SECRET)
- [x] Health check endpoint (`/actuator/health` permitted)
- [x] Container startup validation (compose healthcheck)

---

## 🧪 Phase 10: Testing & Quality
- [ ] Unit tests (Services)
- [ ] Integration tests (Controllers)
- [ ] Security tests
- [ ] API validation tests
- [ ] Exception flow testing

---

## 📄 Phase 11: Documentation
 - [x] Swagger / OpenAPI setup
 - [x] API documentation seed (curl in `backend/test_api.md`)
 - [x] Sample request/response
 - [x] Postman collection
 - [x] Backend README updates

---

## 🚀 Phase 12: Production Readiness
- [ ] Performance tuning
- [ ] DB indexing
- [ ] API rate limiting
- [ ] Backup strategy
- [ ] Monitoring & logs

---

## ✔️ Completion Criteria
- All APIs secured and tested
- Docker setup runs without errors
- PostgreSQL schema finalized
- Role-based access enforced
- Backend ready for frontend integration

