# CampusHire Backend – Curl Test Guide

Base URL: http://localhost:8080

Note: Replace placeholders like <TOKEN> as needed. Use single quotes for JSON in PowerShell.

## Auth

### Register (any role)
curl -X POST "http://localhost:8080/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "rollNo": "",
    "password": "Admin@123",
    "role": "PLACEMENT_HEAD",
    "fullName": "Placement Admin",
    "department": "Training & Placement"
  }'

### Login (email or rollNo)
curl -X POST "http://localhost:8080/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@example.com",
    "password": "Admin@123"
  }'

Response: { "token": "<JWT>" }

## Student Profile (requires JWT)

### Get my profile
curl -X GET "http://localhost:8080/api/student/profile" \
  -H "Authorization: Bearer <JWT>"

### Update my profile
curl -X PUT "http://localhost:8080/api/student/profile" \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "batch": "2026",
    "cgpa": 8.2,
    "backlogs": 0,
    "skills": "Java, Spring, SQL",
    "certifications": "AWS Cloud Practitioner",
    "internships": "Acme Inc – 2 months",
    "projects": "Placement Portal",
    "resumeUrl": "https://example.com/resume.pdf",
    "eligible": true
  }'

### Upload my resume (multipart)
curl -X POST "http://localhost:8080/api/student/resume" \
  -H "Authorization: Bearer <JWT>" \
  -F "file=@C:/Path/To/resume.pdf"

## Placement Events

### List events (public)
curl -X GET "http://localhost:8080/api/events"

### Create event (PLACEMENT_HEAD only)
curl -X POST "http://localhost:8080/api/events" \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "TechCorp",
    "role": "Software Engineer",
    "packageLPA": 10.5,
    "eventDate": "2026-02-15",
    "details": "On-campus drive"
  }'

### Update event (PLACEMENT_HEAD only)
curl -X PUT "http://localhost:8080/api/events/1" \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "TechCorp",
    "role": "Backend Engineer",
    "packageLPA": 11.0,
    "eventDate": "2026-02-16",
    "details": "Updated details"
  }'

### Delete event (PLACEMENT_HEAD only)
curl -X DELETE "http://localhost:8080/api/events/1" \
  -H "Authorization: Bearer <JWT>"

### Upcoming events (public)
curl -X GET "http://localhost:8080/api/events/upcoming"

### Past events (public)
curl -X GET "http://localhost:8080/api/events/past"

### Update drive status (PLACEMENT_HEAD only)
curl -X PUT "http://localhost:8080/api/events/1/status?status=COMPLETED" \
  -H "Authorization: Bearer <JWT>"

DriveStatus values: UPCOMING, COMPLETED

### Add eligible students to an event (PLACEMENT_HEAD only)
curl -X POST "http://localhost:8080/api/events/1/eligible" \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '[1,2,3]'

### List eligible students for an event (FACULTY/PLACEMENT_HEAD)
curl -X GET "http://localhost:8080/api/events/1/eligible" \
  -H "Authorization: Bearer <JWT>"

## Admin – Student Filtering (PLACEMENT_HEAD only)

### Filter students by params
curl -X GET "http://localhost:8080/api/admin/students?department=CSE&minCgpa=8.0&maxBacklogs=0&skillContains=spring" \
  -H "Authorization: Bearer <JWT>"

### List all students (admin)
curl -X GET "http://localhost:8080/api/admin/students/all" \
  -H "Authorization: Bearer <JWT>"

### Lock/unlock a student profile
curl -X PUT "http://localhost:8080/api/admin/students/1/lock?locked=true" \
  -H "Authorization: Bearer <JWT>"

### Export filtered students as CSV
curl -X GET "http://localhost:8080/api/admin/students/export?department=CSE&minCgpa=8.0&maxBacklogs=0&skillContains=spring&internshipContains=Acme" \
  -H "Authorization: Bearer <JWT>" \
  -H "Accept: text/csv"

## Faculty – Read-only access

### List students (FACULTY/PLACEMENT_HEAD)
curl -X GET "http://localhost:8080/api/faculty/students" \
  -H "Authorization: Bearer <JWT>"

### Get student by ID (FACULTY/PLACEMENT_HEAD)
curl -X GET "http://localhost:8080/api/faculty/students/1" \
  -H "Authorization: Bearer <JWT>"

## Analytics – Summary (FACULTY/PLACEMENT_HEAD)

curl -X GET "http://localhost:8080/api/analytics/summary" \
  -H "Authorization: Bearer <JWT>"

### Placements overview
curl -X GET "http://localhost:8080/api/analytics/placements" \
  -H "Authorization: Bearer <JWT>"

### Company-wise hiring stats
curl -X GET "http://localhost:8080/api/analytics/company-stats" \
  -H "Authorization: Bearer <JWT>"

### Department-wise stats
curl -X GET "http://localhost:8080/api/analytics/department-stats" \
  -H "Authorization: Bearer <JWT>"

Note: For accurate analytics, `StudentProfile` includes fields `placed` (Boolean), `placedCompany` (String), and `placedPackageLPA` (Double). Update these via the student update API or admin tools as needed.

## Shortlists (PLACEMENT_HEAD only)

### Create a shortlist with student IDs
curl -X POST "http://localhost:8080/api/admin/shortlists" \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CSE High CGPA",
    "studentIds": [1,2,3]
  }'

### List shortlists
curl -X GET "http://localhost:8080/api/admin/shortlists" \
  -H "Authorization: Bearer <JWT>"

### Add students to a shortlist
curl -X POST "http://localhost:8080/api/admin/shortlists/1/students" \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '[4,5,6]'

### Remove a student from a shortlist
curl -X DELETE "http://localhost:8080/api/admin/shortlists/1/students/4" \
  -H "Authorization: Bearer <JWT>"

### Export shortlist as CSV
curl -X GET "http://localhost:8080/api/admin/shortlists/1/export" \
  -H "Authorization: Bearer <JWT>" \
  -H "Accept: text/csv"

## Companies

### List companies (public)
curl -X GET "http://localhost:8080/api/companies"

### Create company (PLACEMENT_HEAD only)
curl -X POST "http://localhost:8080/api/companies" \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TechCorp",
    "website": "https://techcorp.example",
    "details": "Leading tech firm"
  }'

### Update company (PLACEMENT_HEAD only)
curl -X PUT "http://localhost:8080/api/companies/1" \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TechCorp",
    "website": "https://techcorp.example/updated",
    "details": "Updated details"
  }'

### Delete company (PLACEMENT_HEAD only)
curl -X DELETE "http://localhost:8080/api/companies/1" \
  -H "Authorization: Bearer <JWT>"

### Company events (visit history) (public)
curl -X GET "http://localhost:8080/api/companies/1/events"

Note: When creating events, `companyName` is used to link to an existing company by name if found.

## H2 Console (dev)
Open in browser: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:campushire
