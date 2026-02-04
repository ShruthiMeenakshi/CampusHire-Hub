# CampusHire Hub - React + Tailwind CSS

A modern placement management system built with React and Tailwind CSS.

## Features

- **Student Portal**: Dashboard, placement drives, applications, profile management
- **PO Portal**: Event management, placement analytics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Analytics**: Charts and statistics for placements
- **Modern UI**: Clean, intuitive interface with Tailwind CSS

## Project Structure

```
src/
├── components/          # Reusable components (Sidebar, Topbar)
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── student/        # Student portal pages
│   └── po/             # Placement Officer portal pages
├── styles/             # Global styles
├── App.jsx             # Main app with routing
└── main.jsx            # Entry point
```

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Technologies Used

- **React 18**: Modern UI library
- **React Router v6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool
- **Chart.js**: Data visualization
- **Phosphor Icons**: Icon library

## Pages

### Public Pages
- **Login** - Student/PO login
- **Signup** - New user registration

### Student Portal
- **Dashboard** - KPIs, charts, upcoming drives, applications
- **Drives** - Browse and apply for placement drives
- **Profile** - Manage student information
- **Applications** - Track application status
- **Statistics** - Placement analytics

### PO Portal
- **Dashboard** - Placement statistics and analytics
- **Events** - Manage recruitment events

## Styling

This project uses **Tailwind CSS** for all styling. No additional CSS files are needed. Tailwind utilities provide:
- Responsive design utilities
- Custom color palette
- Component patterns
- Hover and focus states

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Default Colors

- Primary: #3B82F6 (Blue)
- Secondary: #10B981 (Green)
- Danger: #EF4444 (Red)
- Warning: #F59E0B (Amber)

## License

MIT

