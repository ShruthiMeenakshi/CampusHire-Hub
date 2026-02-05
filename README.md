

---

# **CampusHire – Campus Placement Management System**

CampusHire is a full-stack web application that helps colleges manage their campus placement process in a simple, organized, and transparent way. It replaces manual spreadsheets and scattered tools with a centralized platform for students, faculty, and the placement head.

---

## **🚀 Features Overview**

### 👨‍🎓 Student

* Create and update placement profile
* Upload resume and skill details
* Link LeetCode username
* View placement drives and company details
* Track placement statistics (read-only)

### 👩‍🏫 Faculty

* View student profiles (read-only)
* Monitor placement progress and statistics
* View upcoming and past placement drives

### 🧑‍💼 Placement Head (Admin)

* Full admin access (RBAC)
* Filter and shortlist students based on:

  * CGPA
  * Skills
  * Department
  * LeetCode performance
* Add placement drives, events, and training sessions
* Send reminders and notifications
* Track company visit history
* View analytics dashboards
* Maintain audit logs for critical actions

---

## **🧱 System Architecture**

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2ATLuTKSGiH8H6yRWCb1pIKQ.jpeg)

![Image](https://cdn.prod.website-files.com/67ec482dfa06d8122041af15/684a925fe73251c83a771ffd_38bb8e0c729e726e9cd8bafb3457497c3e4b34e2.jpeg)

![Image](https://davidhettler.net/assets/images/setup-2021.png)

### **Architecture Overview**

CampusHire follows a **layered full-stack architecture**:

```
[ React + Tailwind CSS ]
          |
          | REST APIs (JWT Secured)
          |
[ Spring Boot Backend ]
          |
          | JPA / Hibernate
          |
[ PostgreSQL Database ]
          |
[ External Services ]
   - LeetCode API
   - Email / Notification Service
```

### **Key Points**

* Frontend and backend are completely decoupled
* Backend exposes REST APIs secured using JWT
* PostgreSQL handles all persistent data
* Docker is used for containerization and easy deployment
* External APIs are handled only by the backend for security

---

## **📊 High-Level Component Diagram**

![Image](https://www.researchgate.net/publication/383741924/figure/fig1/AS%3A11431281275914604%401725456586992/System-Component-Diagram-Figure-2-illustrates-the-system-component-diagram-The-first.ppm)

![Image](https://i.sstatic.net/1YhfI.png)

![Image](https://martinfowler.com/articles/modularizing-react-apps/evolution-5.png)

### **Components**

* **Frontend**

  * Authentication pages
  * Role-based dashboards
  * Data visualization (charts & tables)
* **Backend**

  * Auth Service (JWT, RBAC)
  * Student Management
  * Placement & Event Management
  * Analytics Module
  * LeetCode Integration Module
* **Database**

  * Students
  * Placement Events
  * Company Records
  * LeetCode Stats
  * Audit Logs

---

## **🛠️ Tech Stack**

### **Frontend**

* **React**
* **Tailwind CSS**
* Axios (API calls)
* Chart libraries (for analytics dashboards)

### **Backend**

* **Spring Boot**
* Spring Security (JWT + RBAC)
* Spring Data JPA
* RESTful APIs

### **Database**

* **PostgreSQL**

### **DevOps / Deployment**

* **Docker**
* Docker Compose (multi-container setup)

### **External Integration**

* **LeetCode API** (coding performance tracking)

---

## **📁 Project Structure**

```
CampusHire/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── tailwind.config.js
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── security/
│   └── CampusHireApplication.java
│
├── docker-compose.yml
└── README.md
```

---

## **🔐 Security**

* JWT-based authentication
* Role-Based Access Control (Student / Faculty / Placement Head)
* Password encryption
* Backend-only API integrations
* Audit logs for admin actions

---

## **📈 Analytics & Visualization**

* Placement success rate
* Company-wise hiring statistics
* Department-wise placement trends
* Average and highest packages
* Placed vs unplaced students

---

## **🐳 Docker Setup (Example)**

```bash
docker-compose up --build
```

Services:

* React frontend
* Spring Boot backend
* PostgreSQL database

---

## **📌 Future Enhancements**

* Codeforces & GitHub integration
* AI-based student shortlisting
* Alumni placement tracking
* Multi-college support
* Mobile app version

---

## **🤝 Contribution**

This project is built as a learning-focused full-stack application.
Contributions, improvements, and feature suggestions are welcome.

---

## **📄 License**

This project is intended for academic and learning purposes.

---

