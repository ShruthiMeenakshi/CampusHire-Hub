import POSidebar from '@/components/POSidebar'
import Topbar from '@/components/Topbar'
import { CheckCircle, Briefcase, Users, TrendUp } from 'phosphor-react'
import { useRef, useEffect } from 'react'
import Chart from 'chart.js/auto'

export default function PODashboard() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      const ctx = chartRef.current.getContext('2d')
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
          datasets: [{
            label: 'Registrations',
            data: [125, 210, 315, 450, 580],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      })
    }

    return () => {
      if (chartInstance.current) chartInstance.current.destroy()
    }
  }, [])

  const kpis = [
    { icon: CheckCircle, label: 'Total Placements', value: 245, color: 'from-green-400 to-green-600' },
    { icon: Briefcase, label: 'Active Drives', value: 12, color: 'from-blue-400 to-blue-600' },
    { icon: Users, label: 'Registered Students', value: 580, color: 'from-purple-400 to-purple-600' },
    { icon: TrendUp, label: 'Average CTC', value: '₹28L', color: 'from-orange-400 to-orange-600' },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <POSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi) => {
              const Icon = kpi.icon
              return (
                <div key={kpi.label} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{kpi.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                    </div>
                    <div className={`bg-gradient-to-br ${kpi.color} p-3 rounded-lg text-white`}>
                      <Icon size={24} weight="fill" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Registration Trend</h3>
            <canvas ref={chartRef} height="300"></canvas>
          </div>

          {/* Recent Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {[
                  { name: 'Google Campus Drive', date: 'Jan 25, 2026' },
                  { name: 'Microsoft Recruitment', date: 'Jan 28, 2026' },
                  { name: 'Amazon Selection Process', date: 'Feb 2, 2026' },
                ].map((event) => (
                  <div key={event.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900">{event.name}</p>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                    <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm font-medium hover:bg-blue-200 transition">
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Companies</h3>
              <div className="space-y-4">
                {[
                  { name: 'Google', students: 145 },
                  { name: 'Microsoft', students: 128 },
                  { name: 'Amazon', students: 112 },
                ].map((company) => (
                  <div key={company.name} className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{company.name}</p>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {company.students} students
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
