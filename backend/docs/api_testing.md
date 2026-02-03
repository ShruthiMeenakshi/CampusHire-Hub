# API Testing Guide

This document provides sample curl commands to test all major endpoints and features of the CampusHire backend.

---

## Student Endpoints

- List all students:
  curl -X GET http://localhost:8080/api/students

- Get student by ID:
  curl -X GET http://localhost:8080/api/students/1

- Create student:
  curl -X POST http://localhost:8080/api/students -H "Content-Type: application/json" -d '{"rollNumber":"123","firstName":"John","lastName":"Doe"}'

- Update student:
  curl -X PUT http://localhost:8080/api/students/1 -H "Content-Type: application/json" -d '{"firstName":"Jane"}'

- Delete student:
  curl -X DELETE http://localhost:8080/api/students/1

---

## User Endpoints

- List all users:
  curl -X GET http://localhost:8080/api/users

- Create user:
  curl -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d '{"email":"user@college.edu"}'

---

## Company Endpoints

- List all companies:
  curl -X GET http://localhost:8080/api/companies

- Create company:
  curl -X POST http://localhost:8080/api/companies -H "Content-Type: application/json" -d '{"name":"TechCorp"}'

---

## Placement Drive Endpoints

- List all drives:
  curl -X GET http://localhost:8080/api/placementdrives

- Create drive:
  curl -X POST http://localhost:8080/api/placementdrives -H "Content-Type: application/json" -d '{"company":"TechCorp"}'

---

## Shortlist Endpoints

- List all shortlists:
  curl -X GET http://localhost:8080/api/shortlists

---

## Notification Endpoints

- List all notifications:
  curl -X GET http://localhost:8080/api/notifications

---

## Audit Log Endpoints

- List all audit logs:
  curl -X GET http://localhost:8080/api/auditlogs

---

## LeetCode Stats Endpoints

- List all LeetCode stats:
  curl -X GET http://localhost:8080/api/leetcode-stats

---

## Role & Shortlist Status Endpoints

- List all roles:
  curl -X GET http://localhost:8080/api/roles

- List all shortlist statuses:
  curl -X GET http://localhost:8080/api/shortlist-statuses

---

## Notes
- Replace IDs and JSON bodies with actual data as needed.
- Ensure the backend server is running on port 8080.
- Add authentication headers if security is implemented.
