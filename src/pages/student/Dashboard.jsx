import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { CheckCircle, Briefcase, Users, TrendUp } from 'phosphor-react'

import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function StudentDashboard() {
  const chartTrendRef = useRef(null)
  const chartDeptRef = useRef(null)
  const trendChartInstance = useRef(null)
  const deptChartInstance = useRef(null)

  useEffect(() => {
    // Placement Trend Chart
    if (chartTrendRef.current) {
      if (trendChartInstance.current) trendChartInstance.current.destroy()
      const ctx = chartTrendRef.current.getContext('2d')
      trendChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Placements',
            data: [65, 89, 72, 95, 110, 130],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }
      })
    }

    // Department-wise Placement Chart
    if (chartDeptRef.current) {
      if (deptChartInstance.current) deptChartInstance.current.destroy()
      const ctx = chartDeptRef.current.getContext('2d')
      deptChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['CSE', 'ECE', 'Mechanical', 'Civil'],
          datasets: [{
            data: [45, 35, 15, 5],
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      })
    }

    return () => {
      if (trendChartInstance.current) trendChartInstance.current.destroy()
      if (deptChartInstance.current) deptChartInstance.current.destroy()
    }
  }, [])

  const kpis = [
    { icon: CheckCircle, label: 'Students Placed', value: 245, trend: '+12%', color: 'from-green-400 to-green-600' },
    { icon: Briefcase, label: 'Ongoing Drives', value: 12, trend: '+2', color: 'from-blue-400 to-blue-600' },
    { icon: ChartLineUp, label: 'Highest CTC', value: '₹42L', trend: '+15%', color: 'from-purple-400 to-purple-600' },
    { icon: Buildings, label: 'Hiring Companies', value: 28, trend: '+4', color: 'from-orange-400 to-orange-600' },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-0">
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
                      <p className="text-green-600 text-sm font-medium mt-1">{kpi.trend}</p>
                    </div>
                    <div className={`bg-gradient-to-br ${kpi.color} p-3 rounded-lg text-white`}>
                      <Icon size={24} weight="fill" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Trend Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Placement Trend</h3>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                  <Download size={18} />
                  <span className="text-sm font-medium">Export</span>
                </button>
              </div>
              <canvas ref={chartTrendRef} height="140"></canvas>
            </div>

            {/* Department Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Department-wise Placement</h3>
              <canvas ref={chartDeptRef} height="140"></canvas>
            </div>
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Drives */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Drives</h3>
                <Link to="/student/drives" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">CTC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { company: 'TCS', role: 'SDE', date: 'Jan 25', ctc: '8.5L' },
                      { company: 'Infosys', role: 'Analyst', date: 'Jan 28', ctc: '7.2L' },
                      { company: 'Wipro', role: 'Engineer', date: 'Feb 2', ctc: '6.8L' },
                    ].map((row) => (
                      <tr key={row.company} className="hover:bg-gray-50">
                        <td className="py-3 px-4">{row.company}</td>
                        <td className="py-3 px-4">{row.role}</td>
                        <td className="py-3 px-4">{row.date}</td>
                        <td className="py-3 px-4 font-medium">₹{row.ctc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* My Applications */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
                <Link to="/student/applications" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { company: 'Google', status: 'Under Review', days: '2 days ago' },
                  { company: 'Microsoft', status: 'Accepted', days: '5 days ago' },
                  { company: 'Amazon', status: 'Rejected', days: '1 week ago' },
                ].map((app) => (
                  <div key={app.company} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900">{app.company}</p>
                      <p className="text-xs text-gray-500">{app.days}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
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
