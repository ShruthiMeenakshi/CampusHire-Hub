import React, { useEffect, useRef, useState } from 'react';
import StudentLayout from '../../components/StudentLayout';
import {
  CheckCircle,
  Briefcase,
  TrendingUp,
  Building,
  Download,
  ChevronRight,
  Calendar,
  Clock,
  ArrowUpRight,
  Users,
  FileText,
  Mail,
  Trophy,
  Shield,
  Home,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  Eye,
  ExternalLink
} from 'lucide-react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const trendChartRef = useRef(null);
  const deptChartRef = useRef(null);
  let trendChartInstance = null;
  let deptChartInstance = null;

  const defaultUser = { name: 'Student' };
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : defaultUser;
    } catch (e) {
      return defaultUser;
    }
  });

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'user') {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : defaultUser);
        } catch (err) {
          setUser(defaultUser);
        }
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Sample data
  const dashboardData = {
    kpis: {
      placed: { value: 287, trend: "+12%" },
      drives: { value: 8, trend: "+2" },
      ctc: { value: "₹18.5L", trend: "+3%" },
      companies: { value: 42, trend: "+5" }
    },
    upcomingDrives: [
      {
        id: 1,
        company: "Google",
        logoColor: "from-red-500 to-yellow-500",
        role: "Software Engineer",
        date: "2024-03-15",
        ctc: "₹22L",
        status: "Upcoming",
        deadline: "2024-03-10"
      },
      {
        id: 2,
        company: "Microsoft",
        logoColor: "from-blue-500 to-green-500",
        role: "Product Manager",
        date: "2024-03-18",
        ctc: "₹20L",
        status: "Upcoming",
        deadline: "2024-03-12"
      },
      {
        id: 3,
        company: "Amazon",
        logoColor: "from-orange-500 to-yellow-500",
        role: "SDE 1",
        date: "2024-03-20",
        ctc: "₹19L",
        status: "Open",
        deadline: "2024-03-15"
      },
      {
        id: 4,
        company: "TCS",
        logoColor: "from-blue-500 to-blue-700",
        role: "System Analyst",
        date: "2024-03-22",
        ctc: "₹8L",
        status: "Open",
        deadline: "2024-03-18"
      },
      {
        id: 5,
        company: "Infosys",
        logoColor: "from-purple-500 to-pink-500",
        role: "Business Analyst",
        date: "2024-03-25",
        ctc: "₹7.5L",
        status: "Open",
        deadline: "2024-03-20"
      }
    ],
    myApplications: [
      {
        id: 1,
        company: "Amazon",
        logoColor: "from-orange-500 to-yellow-500",
        role: "SDE Intern",
        stage: "Final Round",
        updated: "2 days ago",
        status: "in-progress"
      },
      {
        id: 2,
        company: "Microsoft",
        logoColor: "from-blue-500 to-green-500",
        role: "Product Intern",
        stage: "Technical Round",
        updated: "1 week ago",
        status: "in-progress"
      },
      {
        id: 3,
        company: "Google",
        logoColor: "from-red-500 to-yellow-500",
        role: "STEP Intern",
        stage: "Applied",
        updated: "2 weeks ago",
        status: "pending"
      },
      {
        id: 4,
        company: "Goldman Sachs",
        logoColor: "from-blue-600 to-black",
        role: "Analyst",
        stage: "Assessment",
        updated: "3 days ago",
        status: "in-progress"
      }
    ],
    announcements: [
      {
        id: 1,
        title: "Resume Review Workshop",
        time: "2 hours ago",
        priority: "high",
        content: "Get your resume reviewed by industry experts. Sign up before Friday."
      },
      {
        id: 2,
        title: "Mock Interview Schedule Released",
        time: "1 day ago",
        priority: "medium",
        content: "Mock interviews for final year students are now open for registration."
      },
      {
        id: 3,
        title: "Placement Portal Maintenance",
        time: "2 days ago",
        priority: "low",
        content: "The portal will be unavailable on Sunday, 12th March from 2 AM to 6 AM."
      },
      {
        id: 4,
        title: "New Company Registrations",
        time: "3 days ago",
        priority: "medium",
        content: "5 new companies have registered for campus placements this week."
      }
    ],
    events: [
      {
        id: 1,
        title: "Google Info Session",
        date: "Mar 12, 2024",
        time: "3:00 PM",
        location: "Auditorium",
        type: "info-session"
      },
      {
        id: 2,
        title: "Coding Contest: CodeRush",
        date: "Mar 15, 2024",
        time: "10:00 AM",
        location: "Computer Lab",
        type: "contest"
      },
      {
        id: 3,
        title: "Group Discussion Practice",
        date: "Mar 18, 2024",
        time: "2:00 PM",
        location: "Seminar Hall",
        type: "workshop"
      },
      {
        id: 4,
        title: "Placement Orientation",
        date: "Mar 20, 2024",
        time: "11:00 AM",
        location: "Main Hall",
        type: "orientation"
      }
    ]
  };

  useEffect(() => {
    // Initialize charts
    initCharts();

    // Cleanup
    return () => {
      if (trendChartInstance) trendChartInstance.destroy();
      if (deptChartInstance) deptChartInstance.destroy();
    };
  }, []);

  const initCharts = () => {
    // Placement Trend Chart
    const trendCtx = trendChartRef.current?.getContext('2d');
    if (trendCtx) {
      trendChartInstance = new Chart(trendCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Students Placed',
            data: [45, 60, 75, 55, 80, 90, 85, 95, 100, 110, 120, 130],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              titleColor: '#1f2937',
              bodyColor: '#4b5563',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              cornerRadius: 8,
              padding: 12,
              boxPadding: 6
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0,0,0,0.05)',
                drawBorder: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 11
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 11
                }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });
    }

    // Department-wise Chart
    const deptCtx = deptChartRef.current?.getContext('2d');
    if (deptCtx) {
      deptChartInstance = new Chart(deptCtx, {
        type: 'bar',
        data: {
          labels: ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'IT'],
          datasets: [{
            label: 'Placement %',
            data: [92, 85, 78, 82, 76, 88],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)'
            ],
            borderColor: [
              '#3b82f6',
              '#10b981',
              '#f59e0b',
              '#ef4444',
              '#8b5cf6',
              '#ec4899'
            ],
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              titleColor: '#1f2937',
              bodyColor: '#4b5563',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              cornerRadius: 8,
              padding: 12,
              boxPadding: 6,
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.parsed.y}%`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: 'rgba(0,0,0,0.05)',
                drawBorder: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 11
                },
                callback: function (value) {
                  return value + '%';
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 11
                }
              }
            }
          }
        }
      });
    }
  };

  const renderStatusBadge = (status) => {
    const statusConfig = {
      'Upcoming': { color: 'bg-blue-100 text-blue-800', icon: <Clock className="w-3 h-3" /> },
      'Open': { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3" /> },
      'Closed': { color: 'bg-gray-100 text-gray-800', icon: null }
    };

    const config = statusConfig[status] || statusConfig['Closed'];

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {status}
      </span>
    );
  };

  const renderStageBadge = (stage, status) => {
    const stageConfig = {
      'Applied': { color: 'bg-blue-100 text-blue-800' },
      'Assessment': { color: 'bg-yellow-100 text-yellow-800' },
      'Technical Round': { color: 'bg-purple-100 text-purple-800' },
      'Final Round': { color: 'bg-green-100 text-green-800' },
      'Selected': { color: 'bg-emerald-100 text-emerald-800' },
      'Rejected': { color: 'bg-red-100 text-red-800' }
    };

    const config = stageConfig[stage] || stageConfig['Applied'];

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {stage}
      </span>
    );
  };

  const renderPriorityBadge = (priority) => {
    const priorityConfig = {
      'high': { color: 'bg-red-100 text-red-800', text: 'Important' },
      'medium': { color: 'bg-yellow-100 text-yellow-800', text: 'Update' },
      'low': { color: 'bg-gray-100 text-gray-800', text: 'Info' }
    };

    const config = priorityConfig[priority] || priorityConfig['low'];

    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const renderEventIcon = (type) => {
    const iconConfig = {
      'info-session': { icon: <Users className="w-5 h-5 text-blue-600" />, color: 'bg-blue-50' },
      'contest': { icon: <Trophy className="w-5 h-5 text-yellow-600" />, color: 'bg-yellow-50' },
      'workshop': { icon: <Briefcase className="w-5 h-5 text-purple-600" />, color: 'bg-purple-50' },
      'orientation': { icon: <Home className="w-5 h-5 text-green-600" />, color: 'bg-green-50' }
    };

    const config = iconConfig[type] || iconConfig['info-session'];

    return (
      <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center`}>
        {config.icon}
      </div>
    );
  };

  const handleDownloadChart = () => {
    const link = document.createElement('a');
    link.download = 'placement-trend.png';
    link.href = trendChartRef.current?.toDataURL('image/png');
    link.click();
  };

  return (
    <StudentLayout activePage="dashboard" pageTitle="Dashboard">
      {/* Welcome Banner */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name ? user.name.split(' ')[0] : 'Student'}! 👋</h1>
              <p className="text-gray-600">
                Track your placement progress, upcoming drives, and application status.
                <span className="font-medium text-blue-600"> 3 new opportunities</span> have been added this week.
              </p>
            </div>
            <button className="px-6 py-3 bg-white border border-blue-200 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2 whitespace-nowrap">
              <Eye className="w-5 h-5" />
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" aria-label="Placement KPIs">
        {[
          {
            icon: <CheckCircle className="w-6 h-6 text-green-500" />,
            title: "Students Placed",
            value: dashboardData.kpis.placed.value,
            trend: dashboardData.kpis.placed.trend,
            trendClass: "text-green-600 bg-green-50",
            iconBg: "bg-green-50",
            description: "This academic year"
          },
          {
            icon: <Briefcase className="w-6 h-6 text-blue-500" />,
            title: "Ongoing Drives",
            value: dashboardData.kpis.drives.value,
            trend: `+${dashboardData.kpis.drives.trend}`,
            trendClass: "text-blue-600 bg-blue-50",
            iconBg: "bg-blue-50",
            description: "Active placements"
          },
          {
            icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
            title: "Highest CTC",
            value: dashboardData.kpis.ctc.value,
            trend: dashboardData.kpis.ctc.trend,
            trendClass: "text-purple-600 bg-purple-50",
            iconBg: "bg-purple-50",
            description: "Average package"
          },
          {
            icon: <Building className="w-6 h-6 text-orange-500" />,
            title: "Hiring Companies",
            value: dashboardData.kpis.companies.value,
            trend: `+${dashboardData.kpis.companies.trend}`,
            trendClass: "text-orange-600 bg-orange-50",
            iconBg: "bg-orange-50",
            description: "Registered this year"
          }
        ].map((kpi, index) => (
          <article key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${kpi.iconBg}`}>
                {kpi.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                    <p className="text-xs text-gray-500">{kpi.description}</p>
                  </div>
                  <p className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${kpi.trendClass}`}>
                    <ArrowUpRight className="w-3 h-3" />
                    {kpi.trend}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Placement Trend Chart */}
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Placement Trend</h3>
                <p className="text-sm text-gray-600">Monthly placement statistics for 2024</p>
              </div>
              <button
                onClick={handleDownloadChart}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-300"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
          <div className="p-6 pt-4">
            <div className="h-[300px]">
              <canvas id="chartTrend" ref={trendChartRef}></canvas>
            </div>
          </div>
        </article>

        {/* Department-wise Chart */}
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Department-wise Placement</h3>
                <p className="text-sm text-gray-600">Placement percentage by department</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Current Year</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 pt-4">
            <div className="h-[300px]">
              <canvas id="chartDept" ref={deptChartRef}></canvas>
            </div>
          </div>
        </article>
      </section>

      {/* Tables Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Upcoming Drives Table */}
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Drives</h3>
              <a href="/drives" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                View all
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                  <th className="pb-3 px-6 font-medium">Company</th>
                  <th className="pb-3 px-6 font-medium">Role</th>
                  <th className="pb-3 px-6 font-medium">Date</th>
                  <th className="pb-3 px-6 font-medium">CTC</th>
                  <th className="pb-3 px-6 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dashboardData.upcomingDrives.map((drive) => (
                  <tr key={drive.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${drive.logoColor}`}></div>
                        <span className="font-medium text-gray-900">{drive.company}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{drive.role}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-gray-900">{drive.date}</span>
                        <span className="text-xs text-gray-500">Deadline: {drive.deadline}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">{drive.ctc}</td>
                    <td className="py-4 px-6">{renderStatusBadge(drive.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {/* My Applications Table */}
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
              <a href="/applications" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                View all
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                  <th className="pb-3 px-6 font-medium">Company</th>
                  <th className="pb-3 px-6 font-medium">Role</th>
                  <th className="pb-3 px-6 font-medium">Stage</th>
                  <th className="pb-3 px-6 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dashboardData.myApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${app.logoColor}`}></div>
                        <span className="font-medium text-gray-900">{app.company}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{app.role}</td>
                    <td className="py-4 px-6">{renderStageBadge(app.stage, app.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-gray-900">{app.updated}</span>
                        <span className="text-xs text-gray-500">Click for details</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      {/* Lists Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Announcements</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {dashboardData.announcements.map((announcement) => (
                <li key={announcement.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-2 h-2 rounded-full ${announcement.priority === 'high' ? 'bg-red-500' :
                          announcement.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900">{announcement.title}</p>
                        {renderPriorityBadge(announcement.priority)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                      <span className="text-xs text-gray-500">{announcement.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Upcoming Events */}
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              <a href="/events" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                View all
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {dashboardData.events.map((event) => (
                <li key={event.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    {renderEventIcon(event.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {event.date}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </span>
                        <span className="text-xs text-gray-500">{event.location}</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* Quick Stats Footer */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">4.2</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">92%</div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">24h</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">98%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact placement cell at <span className="text-blue-600">placement@vcet.edu</span>
          </p>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Dashboard;