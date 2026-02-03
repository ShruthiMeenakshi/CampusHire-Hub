# Services Documentation

Service classes for business logic and data access:

- **StudentService**: Handles student CRUD and business logic
- **UserService**: Handles user CRUD
- **CompanyService**: Handles company CRUD
- **PlacementDriveService**: Handles placement drive CRUD
- **ShortlistService**: Handles shortlist CRUD
- **NotificationService**: Handles notification CRUD
- **AuditLogService**: Handles audit log CRUD
- **LeetCodeStatsService**: Handles LeetCode stats CRUD
- **RoleService**: Handles role CRUD (enum, limited use)
- **ShortlistStatusService**: Handles shortlist status CRUD (enum, limited use)

Services inject repositories and are used by controllers for endpoint logic.