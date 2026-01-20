# CampusHire-Hub
Web APP SAAS Product for placement

## Dashboard Overview
This project includes a professional placement dashboard with:
- Overview KPIs: Students Placed, Ongoing Drives, Highest CTC, Hiring Companies
- Charts: Placement Trend (line) and Department-wise Placement (bar)
- Tables: Upcoming Drives and Recent Applications
- Lists: Announcements and Upcoming Events
- Reusable includes for Topbar and Sidebar

## Quick Start
For the includes to load correctly, run a local server (fetching HTML includes is blocked from file://).

### Option 1: VS Code Live Server
1. Install the "Live Server" extension in VS Code.
2. Right-click `index.html` → "Open with Live Server".

### Option 2: Python HTTP server
Run from the project root:

```bash
python -m http.server 5500
```

Then open: http://localhost:5500/index.html

## Structure
- `index.html` — Dashboard shell
- `includes/topbar.html`, `includes/sidebar.html` — Reusable UI sections
- `assets/styles/dashboard.css` — Layout and component styling
- `assets/js/dashboard.js` — Includes loader, sample data, charts

## Customization
- Replace sample data in `assets/js/dashboard.js` with your API.
- Adjust colors and spacing via CSS variables in `assets/styles/dashboard.css`.
- Add routes/links in `includes/sidebar.html` per your modules.

## Notes
- Charts use Chart.js via CDN. If needed, pin versions or bundle locally.
- Icons use Phosphor Icons (CDN).
