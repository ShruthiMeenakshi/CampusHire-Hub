import { Bell, User } from 'phosphor-react'

export default function Topbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="hidden md:block">
        <h2 className="text-xl font-semibold text-gray-900">Welcome Back</h2>
        <p className="text-sm text-gray-500">Have a great day!</p>
      </div>

      <div className="flex items-center space-x-6 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
            <User size={18} />
          </div>
          <span className="hidden md:inline text-sm font-medium text-gray-700">Profile</span>
        </button>
      </div>
    </header>
  )
}
