import StudentLayout from '@/components/StudentLayout'

export default function StudentApplications() {
  const applications = [
    { id: 1, company: 'Google', position: 'Software Engineer', appliedDate: '2024-01-20', status: 'Under Review' },
    { id: 2, company: 'Microsoft', position: 'Cloud Engineer', appliedDate: '2024-01-18', status: 'Accepted' },
    { id: 3, company: 'Amazon', position: 'SDE II', appliedDate: '2024-01-15', status: 'Interview' },
    { id: 4, company: 'Meta', position: 'Backend Engineer', appliedDate: '2024-01-12', status: 'Rejected' },
    { id: 5, company: 'Apple', position: 'iOS Developer', appliedDate: '2024-01-10', status: 'Under Review' },
    { id: 6, company: 'Oracle', position: 'Database Engineer', appliedDate: '2024-01-08', status: 'Accepted' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      case 'Interview': return 'bg-blue-100 text-blue-800'
      case 'Under Review': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <StudentLayout activePage="applications" pageTitle="My Applications">
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow">
                <p className="text-sm text-gray-600">Total Applied: <span className="font-bold text-gray-900">{applications.length}</span></p>
              </div>
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app) => (
                <div key={app.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{app.company}</h3>
                    <p className="text-gray-600 text-sm mt-1">{app.position}</p>
                  </div>

                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-xs text-gray-500">Applied on {new Date(app.appliedDate).toLocaleDateString()}</p>
                  </div>

                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm py-2 rounded transition hover:bg-blue-50">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </StudentLayout>
  )
}
