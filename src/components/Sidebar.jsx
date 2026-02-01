import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Briefcase,
  FileText,
  Building,
  Mail,
  User,
  Settings,
  LogOut,
  Bell,
  Users,
  Calendar,
  Award,
  BarChart3
} from 'lucide-react';

const Sidebar = ({ activePage = 'dashboard', collapsed = false, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored auth tokens or user data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.clear();
    
    // Redirect to login page
    navigate('/login');
  };
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '/student/dashboard', key: 'dashboard' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Drives', path: '/student/drives', key: 'drives' },
    { icon: <FileText className="w-5 h-5" />, label: 'Applications', path: '/student/applications', key: 'applications' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Performance', path: '/student/stats', key: 'stats' },
    { icon: <Building className="w-5 h-5" />, label: 'Companies', path: '/student/companies', key: 'companies' },
    { icon: <Mail className="w-5 h-5" />, label: 'Messages', path: '/student/messages', key: 'messages' },
    { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/student/profile', key: 'profile' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Events', path: '/student/events', key: 'events' },
    { icon: <Award className="w-5 h-5" />, label: 'Achievements', path: '/student/achievements', key: 'achievements' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-50 dark:bg-slate-900 dark:border-blue-800">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">CH</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">CampusHire Hub</h1>
            <p className="text-sm text-gray-500">Placement Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activePage === item.key
                  ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-800 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-blue-100 dark:hover:bg-blue-800'
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          {/* Bottom Section */}
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-blue-800">
            <Link
              to="/student/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 dark:text-blue-100 dark:hover:bg-blue-800"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 dark:text-blue-100 dark:hover:bg-blue-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;