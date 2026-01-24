# CampusHire Hub – Project Documentation

## 1. Project Overview

**CampusHire Hub** is a web-based placement management portal designed to streamline campus recruitment activities for students, placement coordinators, and placement officers. The system centralizes placement drives, student profiles, applications, and placement officer into a single, user-friendly dashboard.

### Objectives:

- Digitize and simplify campus placement processes
- Provide real-time visibility of placement drives and applications
- Enable data-driven decision-making for placement teams
- Improve student preparedness and engagement

## 2. Technology Stack

- **HTML5**
- **Tailwind CSS**
- **Vanilla JavaScript**
- **React**
- **Springboot**

### Storage (Current Phase)

- Browser localStorage (for prototyping)

### Architecture (Future-Ready)

- Modular frontend structure
- Backend-ready (can integrate with REST APIs)

## 3. User Roles & Modules

### 3.1 Student Module

The Student Module is the core user-facing component, allowing students to view opportunities, manage profiles, and track applications.

**Features Implemented:**

#### a) Authentication Pages

- Login page
- Sign-up / registration page
- Form validation

#### b) Dashboard

- View all active placement drives
- Quick stats on applications and placements
- Recent notifications and announcements

#### c) Drives Module

- Browse all available placement drives
- Filter by company, date, and eligibility criteria
- View drive details (company info, JD, date/time, location)
- Register for drives

#### d) Applications Module

- Track submitted applications
- View application status (pending, shortlisted, rejected, interview scheduled)
- Upload/manage application documents

#### e) Profile Module

- View and edit student profile (name, roll number, branch, etc.)
- Upload resume and portfolio
- Add skills and academic information
- View profile completion percentage

#### f) Statistics Module

- Personal placement statistics
- Interview success rate
- Applications submitted vs. shortlisted ratio
- Skills gap analysis

#### g) Events Module

- View upcoming campus events, webinars, and workshops
- Register for events
- Calendar view of placements and events

### 3.2 Placement Coordinator Module (Future Phase)

Expected features:

- Manage multiple drives
- View and approve student registrations
- Track drive progress
- Generate reports

### 3.3 Placement Officer Module

Expected features:

- Dashboard for all drives and analytics
- Company management
- Bulk student registration
- Advanced filtering and reporting

## 4. Project Structure

```
CampusHire-Hub/
├── login.html
├── signup.html
├── README.md
├── assets/
│   └── styles/
│       ├── login.css
│       └── signup.css
├── media/
├── PO/
│   ├── events.html
│   └── index.html
└── student/
    ├── drives.html
    ├── index.html
    ├── my-applications.html
    ├── profile-view.html
    ├── profile.html
    ├── stats.html
    ├── assets/
    │   ├── js/
    │   │   ├── applications.js
    │   │   ├── dashboard.js
    │   │   ├── drives.js
    │   │   ├── events.js
    │   │   ├── profile-view.js
    │   │   ├── profile.js
    │   │   └── stats.js
    │   └── styles/
    │       ├── application.css
    │       ├── dashboard.css
    │       ├── drives.css
    │       ├── profile.css
    │       └── stats.css
    └── includes/
        ├── sidebar.html
        └── topbar.html
```

## 5. Quick Start

For the includes to load correctly, run a local server (fetching HTML includes is blocked from `file://`).

### Option 1: VS Code Live Server

1. Install the "Live Server" extension in VS Code.
2. Right-click `index.html` → "Open with Live Server".

### Option 2: Python HTTP server

Run from the project root:

```bash
python -m http.server 5500
```

Then open: http://localhost:5500/student/index.html

## 6. Customization

- Replace sample data in the respective JavaScript files with your API.
- Adjust colors and spacing via CSS in the `assets/styles/` directory.
- Add routes/links in `includes/sidebar.html` per your modules.

## 7. Notes

- The project uses Tailwind CSS and Vanilla JavaScript.
- Future phases will integrate React for enhanced UI and Springboot for backend.
- Icons use Phosphor Icons or custom SVGs.
