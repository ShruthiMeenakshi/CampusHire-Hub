import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import Login from './pages/Login'
import Signup from './pages/Signup'
import StudentDashboard from './pages/student/Dashboard'
import StudentDrives from './pages/student/Drives'
import StudentProfile from './pages/student/Profile'
import StudentEvent from './pages/student/Events'
import StudentApplications from './pages/student/Applications'
import StudentStats from './pages/student/Stats'
import StudentCompanies from './pages/student/companies'
import StudentEvents from './pages/student/Events'
import StudentSettings from './pages/student/Settings'
import StudentAchievements from './pages/student/Achievements'
import StudentMessages from './pages/student/Messages'
import PODashboard from './pages/po/Dashboard'
import POEvents from './pages/po/Events'

function App() {
  return (
    <Routes>

      {/* Auth Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student Routes */}
      <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/drives" element={<StudentDrives />} />
      <Route path="/student/profile" element={<StudentProfile />} />
      <Route path="/student/companies" element={<StudentCompanies />} />
      <Route path="/student/applications" element={<StudentApplications />} />
      <Route path="/student/stats" element={<StudentStats />} />
      <Route path="/student/events" element={<StudentEvents />} />
      <Route path="/student/settings" element={<StudentSettings />} />
      <Route path="/student/achievements" element={<StudentAchievements />} />
      <Route path="/student/messages" element={<StudentMessages />} />

      {/* PO Routes */}
      <Route path="/po" element={<Navigate to="/po/dashboard" replace />} />
      <Route path="/po/dashboard" element={<PODashboard />} />
      <Route path="/po/events" element={<POEvents />} />

    </Routes>
  )
}

export default App
