import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  User,
  Filter,
  ChevronDown,
  Sun,
  Moon,
  LogOut,
  Settings,
  HelpCircle,
  Mail,
  Calendar,
  Clock,
  Menu,
  X,
  ChevronRight,
  Check,
  Globe,
  Shield
} from 'lucide-react';

const Topbar = ({
  pageTitle = 'Dashboard',
  showSearch = true,
  onMenuClick,
  sidebarCollapsed = false
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    {
      id: 1,
      title: 'New Drive Added',
      description: 'Google is hiring Software Engineers',
      time: '2 minutes ago',
      read: false,
      type: 'drive'
    },
    {
      id: 2,
      title: 'Application Status Updated',
      description: 'Your application at Amazon is now in review',
      time: '1 hour ago',
      read: false,
      type: 'application'
    },
    {
      id: 3,
      title: 'Upcoming Interview',
      description: 'Microsoft interview scheduled for tomorrow',
      time: '3 hours ago',
      read: true,
      type: 'interview'
    },
    {
      id: 4,
      title: 'Resume Review Available',
      description: 'Get your resume reviewed by industry experts',
      time: '1 day ago',
      read: true,
      type: 'reminder'
    }
  ]);

  const [user] = useState({
    name: 'Student',
    department: 'Student',
    year: '4th Year',
    cgpa: '8.45',
    avatarColor: 'from-blue-500 to-blue-600'
  });

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('theme-light');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('theme-light');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('theme-light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('theme-light');
      localStorage.setItem('theme', 'light');
    }
  };

  // Mark notification as read
  const markAsRead = (id) => {
    // In real app, update in backend
    console.log(`Marked notification ${id} as read`);
  };

  // Mark all as read
  const markAllAsRead = () => {
    console.log('Marked all notifications as read');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
      setSearchQuery('');
      setShowSearchBar(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      console.log('Logging out...');
      // Implement logout logic
    }
  };

  // Unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className={`sticky top-0 z-50 transition-colors duration-200 ${darkMode
          ? 'bg-slate-950 border-blue-900 text-white'
          : 'bg-white border-gray-200 text-gray-900'
        } border-b px-6 py-4 shadow-sm`}>
        <div className="flex items-center justify-between">
          {/* Left Section - Title & Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className={`p-2 rounded-lg lg:hidden transition-colors ${darkMode
                  ? 'hover:bg-gray-800 text-white hover:text-gray-200'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
            >
              {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>

            {/* Page Title */}
            <div>
              <h2 className="text-lg font-semibold">{pageTitle}</h2>
              <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-500'}`}>
                Welcome back, {user.name.split(' ')[0]}! 👋
              </p>
            </div>
          </div>

          {/* Center Section - Search (Desktop) */}
          {showSearch && (
            <div className="hidden md:flex items-center gap-4 flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative flex-1">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-400'
                  }`} />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${darkMode
                      ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } border`}
                  placeholder="Search drives, companies, or resources..."
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </form>
              <button className={`px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors ${darkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}>
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          )}

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Button */}
            <button
              onClick={() => setShowSearchBar(!showSearchBar)}
              className={`p-2 rounded-lg md:hidden transition-colors ${darkMode
                  ? 'hover:bg-gray-800 text-white hover:text-gray-200'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors group ${darkMode
                  ? 'hover:bg-gray-800 text-white hover:text-gray-200'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg transition-colors relative ${darkMode
                    ? 'hover:bg-gray-800 text-white hover:text-gray-200'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className={`absolute right-0 mt-2 w-96 rounded-xl shadow-xl z-50 ${darkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                    } border`}>
                    <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Notifications</h3>
                        <button
                          onClick={markAllAsRead}
                          className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                        >
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b transition-colors cursor-pointer ${darkMode
                                ? 'border-gray-700 hover:bg-gray-750'
                                : 'border-gray-100 hover:bg-gray-50'
                              } ${!notification.read ? (darkMode ? 'bg-gray-750' : 'bg-blue-50') : ''}`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${notification.type === 'drive' ? (darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600') :
                                  notification.type === 'application' ? (darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600') :
                                    notification.type === 'interview' ? (darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600') :
                                      (darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600')
                                }`}>
                                {notification.type === 'drive' && <Briefcase className="w-4 h-4" />}
                                {notification.type === 'application' && <Mail className="w-4 h-4" />}
                                {notification.type === 'interview' && <Calendar className="w-4 h-4" />}
                                {notification.type === 'reminder' && <Clock className="w-4 h-4" />}
                              </div>
                              <div className="flex-1">
                                <h4 className={`font-medium mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                  {notification.title}
                                </h4>
                                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {notification.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                    {notification.time}
                                  </span>
                                  {!notification.read && (
                                    <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-500'
                                      }`}></span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'
                            }`} />
                          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                            No notifications yet
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                      <a
                        href="/notifications"
                        className={`block text-center font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                          }`}
                      >
                        View all notifications
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${darkMode
                    ? 'hover:bg-gray-800'
                    : 'hover:bg-gray-100'
                  }`}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${user.avatarColor}`}></div>
                <div className="hidden md:block text-left">
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user.name.split(' ')[0]}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-white' : 'text-gray-500'}`}>
                    {user.department}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''
                  } ${darkMode ? 'text-white' : 'text-gray-500'}`} />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl z-50 ${darkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                    } border`}>
                    {/* Profile Info */}
                    <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${user.avatarColor}`}></div>
                        <div>
                          <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            {user.name}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {user.department} • {user.year}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className={`p-2 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                          <div className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            {user.cgpa}
                          </div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            CGPA
                          </div>
                        </div>
                        <div className={`p-2 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                          <div className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            85%
                          </div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Profile Complete
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <a
                        href="/profile"
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${darkMode
                            ? 'hover:bg-gray-700 text-gray-300 hover:text-gray-100'
                            : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                          }`}
                      >
                        <User className="w-5 h-5" />
                        My Profile
                      </a>
                      <a
                        href="/settings"
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${darkMode
                            ? 'hover:bg-gray-700 text-gray-300 hover:text-gray-100'
                            : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                          }`}
                      >
                        <Settings className="w-5 h-5" />
                        Settings
                      </a>
                      <a
                        href="/help"
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${darkMode
                            ? 'hover:bg-gray-700 text-gray-300 hover:text-gray-100'
                            : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                          }`}
                      >
                        <HelpCircle className="w-5 h-5" />
                        Help & Support
                      </a>
                      <a
                        href="/privacy"
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${darkMode
                            ? 'hover:bg-gray-700 text-gray-300 hover:text-gray-100'
                            : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                          }`}
                      >
                        <Shield className="w-5 h-5" />
                        Privacy & Terms
                      </a>
                    </div>

                    {/* Footer */}
                    <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                      <button
                        onClick={handleLogout}
                        className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-medium transition-colors ${darkMode
                            ? 'bg-red-900/30 text-red-400 hover:bg-red-800/40 hover:text-red-300'
                            : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700'
                          }`}
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearchBar && (
          <div className="mt-4 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${darkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } border`}
                placeholder="Search drives, companies, or resources..."
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Click outside handlers */}
      <style jsx global>{`
        /* Custom scrollbar for dark mode */
        .dark ::-webkit-scrollbar {
          width: 8px;
        }
        
        .dark ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        .dark ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 4px;
        }
        
        .dark ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }

        /* Smooth transitions */
        * {
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }
      `}</style>
    </>
  );
};

// Add missing icon imports
const Briefcase = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default Topbar;