

---

# **Backend TODO – CampusHire**

This document tracks all backend development tasks for the CampusHire project.
Tech Stack: **Spring Boot · PostgreSQL · Docker · JWT Security**

---

## ✅ Phase 1: Project Setup & Configuration

* [ ] Create Spring Boot project
* [ ] Configure Maven dependencies

  * Spring Web
  * Spring Security
  * Spring Data JPA
  * PostgreSQL Driver
  * Validation (Jakarta)
  * Lombok
* [ ] Setup application profiles (`dev`, `prod`)
* [ ] Configure PostgreSQL connection
* [ ] Enable JPA & Hibernate
* [ ] Create base package structure
* [ ] Setup global exception handling
* [ ] Configure logging

---

## 🔐 Phase 2: Authentication & Authorization (RBAC)

* [ ] Design User entity (Student / Faculty / Placement Head)
* [ ] Implement JWT-based authentication
* [ ] Password encryption (BCrypt)
* [ ] Role-Based Access Control
* [ ] Login API
* [ ] Logout / Token invalidation
* [ ] Secure APIs with Spring Security filters
* [ ] Access control per role

---

## 👨‍🎓 Phase 3: Student Management Module

* [ ] Design Student entity
* [ ] Create DTOs (Request / Response)
* [ ] Student registration API
* [ ] Update student profile API
* [ ] Resume upload support
* [ ] Profile lock functionality (Admin only)
* [ ] Fetch student details API
* [ ] Fetch all students (Admin)
* [ ] Input validation

---

## 👩‍🏫 Phase 4: Faculty Module

* [ ] Faculty entity & repository
* [ ] Faculty login
* [ ] View student profiles (read-only)
* [ ] View placement statistics
* [ ] View placement events

---

## 🧑‍💼 Phase 5: Placement Head (Admin) Module

* [ ] Placement Head entity
* [ ] Admin-only API restrictions
* [ ] Filter students by:

  * CGPA
  * Skills
  * Department
  * LeetCode stats
* [ ] Shortlist students API
* [ ] Export shortlist (Excel / CSV)
* [ ] Lock / unlock student profiles

---

## 📅 Phase 6: Placement Events & Company Module

* [ ] PlacementEvent entity
* [ ] Company entity
* [ ] Add placement drive API
* [ ] Update drive status (Upcoming / Completed)
* [ ] Fetch upcoming drives
* [ ] Fetch past drives
* [ ] Company visit history
* [ ] Student eligibility mapping

---

## ⏰ Phase 7: Notifications & Reminders

* [ ] Notification entity
* [ ] Create reminder API
* [ ] Schedule reminders (cron jobs)
* [ ] In-app notifications
* [ ] Email notification integration
* [ ] Role-based notifications

---

## 🧠 Phase 8: LeetCode Integration

* [ ] Store LeetCode username in Student profile
* [ ] Design LeetCodeStats entity
* [ ] Integrate LeetCode API
* [ ] Fetch coding stats
* [ ] Handle API rate limits
* [ ] Schedule periodic sync
* [ ] Expose stats for filtering
* [ ] Error handling for API failures

---

## 📊 Phase 9: Analytics & Reports

* [ ] Placement statistics service
* [ ] Placed vs unplaced metrics
* [ ] Company-wise hiring stats
* [ ] Department-wise placement stats
* [ ] Average & highest package calculation
* [ ] Dashboard APIs
* [ ] Performance optimization (indexes)

---

## 🧾 Phase 10: Audit Logs & Monitoring

* [ ] AuditLog entity
* [ ] Log admin actions
* [ ] Store timestamped events
* [ ] Secure audit log APIs
* [ ] Read-only access for admin

---

## 🐳 Phase 11: Docker & Deployment

* [ ] Create backend Dockerfile
* [ ] Configure docker-compose
* [ ] Environment variable support
* [ ] Health check endpoint
* [ ] Container startup validation

---

## 🧪 Phase 12: Testing & Quality

* [ ] Unit tests (Services)
* [ ] Integration tests (Controllers)
* [ ] Security tests
* [ ] API validation tests
* [ ] Exception flow testing

---

## 📄 Phase 13: Documentation

* [ ] Swagger / OpenAPI setup
* [ ] API documentation
* [ ] Sample request/response
* [ ] Postman collection
* [ ] Backend README updates

---

## 🚀 Phase 14: Production Readiness

* [ ] Performance tuning
* [ ] DB indexing
* [ ] API rate limiting
* [ ] Backup strategy
* [ ] Monitoring & logs

---

## ✔️ Completion Criteria

* All APIs secured and tested
* Docker setup runs without errors
* PostgreSQL schema finalized
* Role-based access enforced
* Backend ready for frontend integration

---

