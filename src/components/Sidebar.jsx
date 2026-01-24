import { useState } from 'react'
import { List, X, House, Briefcase, FileText, BarChart3, SignOut } from 'phosphor-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Dashboard', href: '/student/dashboard', icon: House },
    { label: 'Drives', href: '/student/drives', icon: Briefcase },
    { label: 'My Applications', href: '/student/applications', icon: FileText },
    { label: 'Statistics', href: '/student/stats', icon: BarChart3 },
  ]

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <List size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">CampusHire</h1>
          <p className="text-xs text-gray-500 mt-1">Placement Hub</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition">
            <SignOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
