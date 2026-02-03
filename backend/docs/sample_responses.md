# Sample Requests & Responses

## Auth/Login

Request:
```json
{
  "username": "admin@example.com",
  "password": "Admin@123"
}
```

Response:
```json
{
  "token": "<JWT>"
}
```

## Student/Update Profile

Request:
```json
{
  "batch": "2026",
  "cgpa": 8.5,
  "backlogs": 0,
  "skills": "Java, Spring",
  "internships": "Acme",
  "projects": "Portal",
  "eligible": true,
  "placed": true,
  "placedCompany": "TechCorp",
  "placedPackageLPA": 10.5
}
```

Response:
```json
{
  "id": 1,
  "user": { "id": 1, "email": "student@example.com", "department": "CSE" },
  "batch": "2026",
  "cgpa": 8.5,
  "backlogs": 0,
  "skills": "Java, Spring",
  "internships": "Acme",
  "projects": "Portal",
  "resumeUrl": null,
  "eligible": true,
  "locked": false,
  "placed": true,
  "placedCompany": "TechCorp",
  "placedPackageLPA": 10.5
}
```

## Analytics/Placements

Response:
```json
{
  "totalStudents": 120,
  "placed": 90,
  "unplaced": 30,
  "placedPercentage": 75.0
}
```
