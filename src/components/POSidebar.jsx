import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Plus } from 'phosphor-react'

export default function POSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    { label: 'Dashboard', href: '/po/dashboard' },
    { label: 'Events', href: '/po/events' },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </button>

      <aside
        className={`fixed md:relative w-64 h-screen bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">CampusHire</h1>
          <p className="text-xs text-gray-500 mt-1">PO Portal</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
