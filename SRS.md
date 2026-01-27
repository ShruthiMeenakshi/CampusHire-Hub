
# **Software Requirements Specification (SRS)**

## **Project: CampusHire**

---

## **1. Introduction**

### **1.1 Purpose**

The purpose of this document is to define the functional and non-functional requirements of **CampusHire**, a centralized web-based placement management system designed for colleges. The system streamlines student data management, placement tracking, analytics, and coding-platform monitoring, primarily managed by the Placement Head.

### **1.2 Scope**

CampusHire enables:

* Centralized collection and maintenance of student placement data
* Filtering and shortlisting of students for companies
* Event, drive, and reminder management
* Tracking student coding progress (e.g., LeetCode) using external APIs
* Visualization of placement statistics and company history
* Controlled role-based access for Students, Faculty, and Placement Head

The system is intended for use within a single college or across multiple departments.

### **1.3 Definitions, Acronyms, and Abbreviations**

| Term | Description                         |
| ---- | ----------------------------------- |
| SRS  | Software Requirements Specification |
| PH   | Placement Head                      |
| RBAC | Role-Based Access Control           |
| API  | Application Programming Interface   |
| KPI  | Key Performance Indicator           |

---

## **2. Overall Description**

### **2.1 Product Perspective**

CampusHire is a **web-based, role-based application** with a centralized backend database and integration with third-party APIs (e.g., LeetCode). It can be deployed as a monolithic or microservices-based system.

### **2.2 User Classes and Characteristics**

| User                       | Description                                                                       |
| -------------------------- | --------------------------------------------------------------------------------- |
| **Student**                | Final-year or eligible students who manage their profiles and view placement info |
| **Faculty**                | Department faculty who view student and placement data                            |
| **Placement Head (Admin)** | Super-admin with full access to manage students, analytics, and events            |

---

## **3. System Features and Requirements**

---

### **3.1 User Authentication & Authorization**

**Description:** Secure login with role-based access.

**Functional Requirements:**

* Users shall log in using college email or roll number
* System shall support role-based dashboards
* Placement Head shall have admin privileges

---

### **3.2 Student Profile Management**

**Description:** Maintain complete student placement-related information.

**Student Data Includes:**

* Personal details (Name, Roll No, Dept, Batch)
* Academic details (CGPA, Backlogs)
* Skills & certifications
* Resume upload (PDF)
* Internship & project details
* Placement eligibility status
* Placement Performance stats

**Functional Requirements:**

* Students shall add/update their own profiles
* Placement Head can edit or lock profiles
* System shall maintain profile update history

---

### **3.3 Student Filtering & Shortlisting**

**Description:** Advanced filtering for placement eligibility.

**Filters Include:**

* Department, CGPA, skills
* Backlogs
* LeetCode stats
* Internship experience

**Functional Requirements:**

* Placement Head shall filter students using multiple criteria
* System shall allow export of shortlisted students (Excel/PDF)

---

### **3.4 Placement Events & Drive Management**

**Description:** Manage campus drives and placement-related events.

**Functional Requirements:**

* Placement Head shall add placement drives and training events
* System shall store company name, role, package, date
* Students and faculty shall view upcoming and past events

---

### **3.5 Reminders & Notifications**

**Description:** Automated alerts for important activities.

**Functional Requirements:**

* System shall notify students of upcoming drives
* Placement Head shall schedule reminders
* Email and in-app notifications shall be supported

---

### **3.6 Coding Platform Integration (LeetCode)**

**Description:** Track coding activity using LeetCode API.

**Tracked Metrics:**

* Total problems solved
* Difficulty-wise count (Easy/Medium/Hard)
* Recent activity

**Functional Requirements:**

* Students shall link their LeetCode username
* System shall periodically fetch LeetCode stats
* Placement Head shall view stats for filtering

**Constraints:**

* Subject to LeetCode API availability and rate limits

---

### **3.7 Placement Analytics & Visualization**

**Description:** Graphical insights into placement outcomes.

**Visualizations Include:**

* Placed vs unplaced students
* Company-wise hiring stats
* Average & highest packages
* Department-wise placement trends
* Placement performance of a particular student or Department

**Functional Requirements:**

* System shall generate charts and dashboards
* Students and faculty shall have read-only access
* Placement Head shall have full analytics access

---

### **3.8 Company Tracking**

**Description:** Maintain company engagement history.

**Functional Requirements:**

* System shall list upcoming companies
* System shall maintain history of past recruiters
* Placement Head shall update drive outcomes

---

### **3.9 Audit Logs & Data Integrity (Additional Relevant Feature)**

**Description:** Track critical administrative actions.

**Functional Requirements:**

* System shall log profile edits and admin actions
* Logs shall be accessible only to Placement Head
* System shall prevent unauthorized data modification

---

## **4. External Interface Requirements**

### **4.1 User Interface**

* Web-based responsive UI
* Dashboards based on user roles
* Graphical charts and tables

### **4.2 Hardware Interface**

* Compatible with desktop and mobile browsers

### **4.3 Software Interface**

* LeetCode API integration
* Email/SMS notification service

---

## **5. Non-Functional Requirements**

### **5.1 Performance**

* System should support at least 1,000 concurrent users
* API response time < 2 seconds

### **5.2 Security**

* Passwords shall be encrypted
* Role-based access enforced
* Secure API key storage

### **5.3 Availability**

* 99% uptime during placement season

### **5.4 Scalability**

* System shall support multiple batches and departments

### **5.5 Maintainability**

* Modular architecture
* Well-documented APIs

---

## **6. Assumptions and Constraints**

* Students provide accurate data
* External APIs may change or have limits
* Internet connectivity is required

---

## **7. Future Enhancements**

* Integration with Codeforces / GitHub
* AI-based student shortlisting
* Alumni placement tracking
* Multi-college support

---

## **8. Conclusion**

CampusHire provides a comprehensive, secure, and scalable solution for campus placement management. It reduces manual effort, improves transparency, and empowers placement teams with actionable insights.

---

