import { useState } from 'react'
import POSidebar from '@/components/POSidebar'
import Topbar from '@/components/Topbar'
import { Plus, X } from 'phosphor-react'

export default function POEvents() {
  const [events, setEvents] = useState([
    { id: 1, name: 'Google Campus Drive', date: '2026-01-25', description: 'Online recruitment for SDE position', url: 'https://google.com/careers' },
    { id: 2, name: 'Microsoft Internship Program', date: '2026-01-28', description: 'Internship opportunities for 2nd and 3rd year students', url: 'https://microsoft.com/careers' },
    { id: 3, name: 'Amazon Selection Process', date: '2026-02-02', description: 'Full-time position for B.Tech graduates', url: 'https://amazon.com/careers' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', date: '', description: '', url: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEvents([...events, { id: events.length + 1, ...formData }])
    setFormData({ name: '', date: '', description: '', url: '' })
    setShowModal(false)
  }

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <POSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Plus size={20} />
              <span>Add Event</span>
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{event.name}</h3>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-3">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-gray-700 text-sm mb-4">{event.description}</p>

                <div className="pt-4 border-t border-gray-200">
                  <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View Details →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Add Event Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Add New Event</h2>
                  <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration URL</label>
                    <input
                      type="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      Add Event
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
