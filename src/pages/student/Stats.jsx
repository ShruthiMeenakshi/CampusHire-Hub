import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { useRef, useEffect } from 'react'
import Chart from 'chart.js/auto'

export default function StudentStats() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      const ctx = chartRef.current.getContext('2d')
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Applied', 'Interviews', 'Offers', 'Accepted'],
          datasets: [{
            label: 'Application Status',
            data: [45, 18, 8, 3],
            backgroundColor: ['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6'],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          }
        }
      })
    }

    return () => {
      if (chartInstance.current) chartInstance.current.destroy()
    }
  }, [])

  const stats = [
    { label: 'Total Applied', value: 45, color: 'text-blue-600' },
    { label: 'Interviews', value: 18, color: 'text-amber-600' },
    { label: 'Offers', value: 8, color: 'text-green-600' },
    { label: 'Accepted', value: 3, color: 'text-purple-600' },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Statistics & Analytics</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
                  <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Progress</h2>
              <canvas ref={chartRef} height="300"></canvas>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
