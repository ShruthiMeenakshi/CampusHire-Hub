import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { MagnifyingGlass, Briefcase } from 'phosphor-react'

export default function StudentDrives() {
  const [searchInput, setSearchInput] = useState('')
  const [filterType, setFilterType] = useState('all')

  const allDrives = [
    { id: 1, company: 'Google', role: 'Software Engineer', date: 'Jan 25, 2026', ctc: '₹42L', status: 'open', applied: true },
    { id: 2, company: 'Microsoft', role: 'Cloud Engineer', date: 'Jan 28, 2026', ctc: '₹38L', status: 'open', applied: false },
    { id: 3, company: 'Amazon', role: 'SDE II', date: 'Feb 2, 2026', ctc: '₹45L', status: 'open', applied: true },
    { id: 4, company: 'Meta', role: 'Backend Engineer', date: 'Feb 5, 2026', ctc: '₹40L', status: 'upcoming', applied: false },
    { id: 5, company: 'Apple', role: 'iOS Developer', date: 'Feb 10, 2026', ctc: '₹50L', status: 'upcoming', applied: false },
    { id: 6, company: 'Oracle', role: 'Database Engineer', date: 'Dec 20, 2025', ctc: '₹32L', status: 'closed', applied: true },
  ]

  const filters = [
    { label: 'All Drives', value: 'all' },
    { label: 'Open', value: 'open' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Closed', value: 'closed' },
    { label: 'Applied', value: 'applied' },
  ]

  const filteredDrives = allDrives.filter(drive => {
    const matchesSearch = 
      drive.company.toLowerCase().includes(searchInput.toLowerCase()) ||
      drive.role.toLowerCase().includes(searchInput.toLowerCase())
    
    if (filterType === 'all') return matchesSearch
    if (filterType === 'applied') return matchesSearch && drive.applied
    return matchesSearch && drive.status === filterType
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'closed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Placement Drives</h1>
            <p className="text-gray-600">Explore and apply for upcoming placement opportunities</p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="mb-6">
              <div className="relative">
                <MagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by company or role..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterType(filter.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    filterType === filter.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Drives Grid */}
          {filteredDrives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrives.map((drive) => (
                <div key={drive.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{drive.company}</h3>
                      <p className="text-gray-600 text-sm mt-1">{drive.role}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(drive.status)}`}>
                      {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Drive Date:</span> {drive.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">CTC:</span> {drive.ctc}
                    </p>
                  </div>

                  <button className={`w-full py-2 rounded-lg font-medium transition ${
                    drive.applied
                      ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`} disabled={drive.applied}>
                    {drive.applied ? 'Already Applied' : 'Apply Now'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No drives found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
