import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/StudentLayout';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Filter,
  Search,
  CalendarDays,
  Bell,
  ExternalLink,
  Download,
  Share2,
  Bookmark,
  Eye,
  Plus,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle,
  AlertCircle,
  Star,
  User,
  Video,
  FileText,
  Globe,
  Mail,
  Phone,
  Pin
} from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', or 'calendar'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [savedEvents, setSavedEvents] = useState([1, 3, 5]);
  const [registeredEvents, setRegisteredEvents] = useState([2, 4]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month'); // 'month', 'week', 'day'

  // Sample events data
  const eventsData = [
    {
      id: 1,
      title: 'Google Info Session',
      description: 'Learn about career opportunities at Google and their hiring process. Meet with recruiters and current employees.',
      date: '2024-03-15',
      time: '3:00 PM - 5:00 PM',
      location: 'Auditorium, Block A',
      category: 'info-session',
      type: 'workshop',
      organizer: 'Google Recruitment Team',
      capacity: 200,
      registered: 185,
      status: 'upcoming',
      imageColor: 'from-red-500 to-yellow-500',
      speakers: [
        { name: 'Rajesh Kumar', role: 'Senior Software Engineer', company: 'Google' },
        { name: 'Priya Sharma', role: 'University Recruiter', company: 'Google' }
      ],
      requirements: 'Open to all years, Dress code: Business Casual',
      materials: ['Presentation slides', 'Q&A session', 'Networking opportunity'],
      contact: 'recruitment@google.com',
      registrationDeadline: '2024-03-14',
      recordingLink: null,
      tags: ['Google', 'Career', 'Networking']
    },
    {
      id: 2,
      title: 'Coding Contest: CodeRush',
      description: 'Annual coding competition with prizes for top performers. Solve algorithmic challenges in 3 hours.',
      date: '2024-03-18',
      time: '10:00 AM - 1:00 PM',
      location: 'Computer Lab, Block C',
      category: 'contest',
      type: 'competition',
      organizer: 'Coding Club',
      capacity: 100,
      registered: 92,
      status: 'upcoming',
      imageColor: 'from-blue-500 to-purple-500',
      speakers: [
        { name: 'Prof. Arvind Singh', role: 'Contest Coordinator', company: 'VCET' },
        { name: 'Ananya Patel', role: 'Tech Lead', company: 'Amazon' }
      ],
      requirements: 'Basic programming knowledge, Laptop required',
      materials: ['Problem statements', 'Leaderboard', 'Prizes'],
      contact: 'codingclub@vcet.edu',
      registrationDeadline: '2024-03-17',
      recordingLink: null,
      tags: ['Coding', 'Competition', 'Prizes']
    },
    {
      id: 3,
      title: 'Group Discussion Practice',
      description: 'Practice group discussions for placement interviews with industry experts providing feedback.',
      date: '2024-03-20',
      time: '2:00 PM - 4:00 PM',
      location: 'Seminar Hall, Block B',
      category: 'workshop',
      type: 'training',
      organizer: 'Placement Cell',
      capacity: 50,
      registered: 45,
      status: 'upcoming',
      imageColor: 'from-green-500 to-teal-500',
      speakers: [
        { name: 'Dr. Meera Nair', role: 'Communication Expert', company: 'Career Solutions' },
        { name: 'Karan Malhotra', role: 'HR Manager', company: 'TCS' }
      ],
      requirements: 'Final year students, Registration required',
      materials: ['GD topics', 'Feedback forms', 'Tips booklet'],
      contact: 'placement@vcet.edu',
      registrationDeadline: '2024-03-19',
      recordingLink: null,
      tags: ['Interview', 'Soft Skills', 'Practice']
    },
    {
      id: 4,
      title: 'Resume Building Workshop',
      description: 'Learn to create effective resumes that stand out. Get personalized feedback on your resume.',
      date: '2024-03-12',
      time: '11:00 AM - 1:00 PM',
      location: 'Conference Room, Placement Cell',
      category: 'workshop',
      type: 'training',
      organizer: 'Career Services',
      capacity: 60,
      registered: 60,
      status: 'ongoing',
      imageColor: 'from-orange-500 to-red-500',
      speakers: [
        { name: 'Sanjay Verma', role: 'Career Coach', company: 'CareerBoost' },
        { name: 'Neha Gupta', role: 'Talent Acquisition', company: 'Infosys' }
      ],
      requirements: 'Bring your current resume',
      materials: ['Resume templates', 'Sample resumes', 'Checklist'],
      contact: 'career@vcet.edu',
      registrationDeadline: '2024-03-11',
      recordingLink: null,
      tags: ['Resume', 'Career', 'Workshop']
    },
    {
      id: 5,
      title: 'Mock Interviews by Industry Experts',
      description: 'Practice interviews with real HR managers and get constructive feedback on your performance.',
      date: '2024-03-22',
      time: '9:00 AM - 5:00 PM',
      location: 'Interview Rooms, Placement Office',
      category: 'interview',
      type: 'practice',
      organizer: 'Placement Cell',
      capacity: 40,
      registered: 32,
      status: 'upcoming',
      imageColor: 'from-purple-500 to-pink-500',
      speakers: [
        { name: 'Vikram Joshi', role: 'HR Director', company: 'Microsoft' },
        { name: 'Pooja Reddy', role: 'Technical Lead', company: 'Adobe' }
      ],
      requirements: 'Slot booking required, Dress formally',
      materials: ['Interview questions', 'Feedback report', 'Improvement tips'],
      contact: 'mockinterviews@vcet.edu',
      registrationDeadline: '2024-03-21',
      recordingLink: null,
      tags: ['Interview', 'Practice', 'Feedback']
    },
    {
      id: 6,
      title: 'Startup Founder Talk',
      description: 'Interaction with successful startup founders sharing their journey and insights for aspiring entrepreneurs.',
      date: '2024-03-08',
      time: '4:00 PM - 6:00 PM',
      location: 'Innovation Center',
      category: 'talk',
      type: 'seminar',
      organizer: 'Entrepreneurship Cell',
      capacity: 150,
      registered: 150,
      status: 'completed',
      imageColor: 'from-indigo-500 to-blue-500',
      speakers: [
        { name: 'Rahul Mehta', role: 'Founder & CEO', company: 'TechStart Inc.' },
        { name: 'Sneha Kapoor', role: 'Co-founder', company: 'EduTech Solutions' }
      ],
      requirements: 'Open to all',
      materials: ['Recording available', 'Presentation slides', 'Q&A transcript'],
      contact: 'e-cell@vcet.edu',
      registrationDeadline: '2024-03-07',
      recordingLink: 'https://vcet.edu/recordings/startup-talk',
      tags: ['Startup', 'Entrepreneurship', 'Inspiration']
    },
    {
      id: 7,
      title: 'AI & ML Workshop',
      description: 'Hands-on workshop on machine learning models and AI applications with practical coding sessions.',
      date: '2024-03-25',
      time: '10:00 AM - 4:00 PM',
      location: 'AI Lab, Block D',
      category: 'workshop',
      type: 'technical',
      organizer: 'AI Club',
      capacity: 30,
      registered: 28,
      status: 'upcoming',
      imageColor: 'from-gray-700 to-gray-900',
      speakers: [
        { name: 'Dr. Anil Kumar', role: 'AI Researcher', company: 'IIT Madras' },
        { name: 'Rohit Sharma', role: 'ML Engineer', company: 'NVIDIA' }
      ],
      requirements: 'Python knowledge, Laptop with Python installed',
      materials: ['Code samples', 'Datasets', 'Jupyter notebooks'],
      contact: 'aiclub@vcet.edu',
      registrationDeadline: '2024-03-24',
      recordingLink: null,
      tags: ['AI', 'Machine Learning', 'Workshop']
    },
    {
      id: 8,
      title: 'Placement Orientation 2024',
      description: 'Official orientation for final year students about placement process, rules, and preparation strategy.',
      date: '2024-03-05',
      time: '2:00 PM - 4:00 PM',
      location: 'Main Hall',
      category: 'orientation',
      type: 'info-session',
      organizer: 'Placement Office',
      capacity: 500,
      registered: 480,
      status: 'completed',
      imageColor: 'from-yellow-500 to-orange-500',
      speakers: [
        { name: 'Dr. S. Rajan', role: 'Placement Director', company: 'VCET' },
        { name: 'Meena Iyer', role: 'TPO', company: 'VCET' }
      ],
      requirements: 'Final year students only',
      materials: ['Placement brochure', 'Process guide', 'Important dates'],
      contact: 'tpo@vcet.edu',
      registrationDeadline: '2024-03-04',
      recordingLink: 'https://vcet.edu/recordings/orientation-2024',
      tags: ['Orientation', 'Placement', 'Final Year']
    }
  ];

  const categories = [
    { key: 'all', label: 'All Events', icon: <Calendar className="w-4 h-4" /> },
    { key: 'info-session', label: 'Info Sessions', icon: <Briefcase className="w-4 h-4" /> },
    { key: 'workshop', label: 'Workshops', icon: <Users className="w-4 h-4" /> },
    { key: 'contest', label: 'Contests', icon: <Award className="w-4 h-4" /> },
    { key: 'interview', label: 'Mock Interviews', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'talk', label: 'Guest Talks', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'orientation', label: 'Orientations', icon: <CalendarDays className="w-4 h-4" /> }
  ];

  const statuses = [
    { key: 'all', label: 'All Status' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'ongoing', label: 'Ongoing' },
    { key: 'completed', label: 'Completed' }
  ];

  const dateFilters = [
    { key: 'all', label: 'All Dates' },
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past', label: 'Past Events' }
  ];

  useEffect(() => {
    setEvents(eventsData);
    filterEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchTerm, categoryFilter, statusFilter, dateFilter, events]);

  const filterEvents = () => {
    let filtered = [...events];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    // Apply date filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateFilter === 'today') {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate.getTime() === today.getTime();
      });
    } else if (dateFilter === 'week') {
      const weekEnd = new Date(today);
      weekEnd.setDate(weekEnd.getDate() + 7);
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= weekEnd;
      });
    } else if (dateFilter === 'month') {
      const monthEnd = new Date(today);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= monthEnd;
      });
    } else if (dateFilter === 'upcoming') {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
      });
    } else if (dateFilter === 'past') {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate < today;
      });
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    setFilteredEvents(filtered);
  };

  const toggleSaveEvent = (eventId) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(savedEvents.filter(id => id !== eventId));
    } else {
      setSavedEvents([...savedEvents, eventId]);
    }
  };

  const registerForEvent = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
      // Show success message
      const event = events.find(e => e.id === eventId);
      alert(`Successfully registered for "${event?.title}"!`);
    }
  };

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const openRegistrationModal = (event) => {
    setSelectedEvent(event);
    setIsRegisterModalOpen(true);
  };

  const getStatusConfig = (status) => {
    const statusConfig = {
      'upcoming': { 
        text: 'Upcoming', 
        icon: <Clock className="w-3 h-3" />, 
        className: 'bg-blue-100 text-blue-800 border-blue-200' 
      },
      'ongoing': { 
        text: 'Ongoing', 
        icon: <AlertCircle className="w-3 h-3" />, 
        className: 'bg-green-100 text-green-800 border-green-200' 
      },
      'completed': { 
        text: 'Completed', 
        icon: <CheckCircle className="w-3 h-3" />, 
        className: 'bg-gray-100 text-gray-800 border-gray-200' 
      }
    };
    
    const config = statusConfig[status] || statusConfig['completed'];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const getCategoryConfig = (category) => {
    const categoryConfig = {
      'info-session': { icon: <Briefcase className="w-4 h-4" />, color: 'bg-blue-50 text-blue-700' },
      'workshop': { icon: <Users className="w-4 h-4" />, color: 'bg-green-50 text-green-700' },
      'contest': { icon: <Award className="w-4 h-4" />, color: 'bg-purple-50 text-purple-700' },
      'interview': { icon: <GraduationCap className="w-4 h-4" />, color: 'bg-yellow-50 text-yellow-700' },
      'talk': { icon: <TrendingUp className="w-4 h-4" />, color: 'bg-indigo-50 text-indigo-700' },
      'orientation': { icon: <CalendarDays className="w-4 h-4" />, color: 'bg-orange-50 text-orange-700' }
    };
    
    return categoryConfig[category] || categoryConfig['info-session'];
  };

  const getTimeRemaining = (date, status) => {
    if (status === 'completed') return 'Event completed';
    if (status === 'ongoing') return 'Happening now';
    
    const now = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past event';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks`;
    return `${Math.floor(diffDays / 30)} months`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    ongoing: events.filter(e => e.status === 'ongoing').length,
    completed: events.filter(e => e.status === 'completed').length,
    registered: registeredEvents.length,
    saved: savedEvents.length
  };

  const calendarDays = generateCalendarDays(currentDate, calendarView, events);

  return (
    <StudentLayout activePage="events" pageTitle="Events" showSearch={false}>
      {/* Page Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-blue-100 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Campus Events</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Stay updated with workshops, info sessions, contests, and placement activities.
                Register for events to enhance your skills and career prospects.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Upcoming Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Ongoing Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Registration Open</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm min-w-[300px]">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.total}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stats.upcoming}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{stats.registered}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">{stats.saved}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <section className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Search events by title, description, or tags..."
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View:</span>
              </div>
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-2 ${viewMode === 'calendar' ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                >
                  Calendar
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {categories.map(category => (
                  <option key={category.key} value={category.key}>{category.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {statuses.map(status => (
                  <option key={status.key} value={status.key}>{status.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {dateFilters.map(date => (
                  <option key={date.key} value={date.key}>{date.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm('')} className="text-blue-600 hover:text-blue-800">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {categoryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm">
                Category: {categories.find(c => c.key === categoryFilter)?.label}
                <button onClick={() => setCategoryFilter('all')} className="text-green-600 hover:text-green-800">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm">
                Status: {statuses.find(s => s.key === statusFilter)?.label}
                <button onClick={() => setStatusFilter('all')} className="text-purple-600 hover:text-purple-800">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {dateFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Date: {dateFilters.find(d => d.key === dateFilter)?.label}
                <button onClick={() => setDateFilter('all')} className="text-yellow-600 hover:text-yellow-800">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section>
        {viewMode === 'calendar' ? (
          // Calendar View
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setCurrentDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setCurrentDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-gray-600 dark:text-gray-400 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-24 p-2 border rounded-lg ${
                    day.isToday
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                      : 'border-gray-200 dark:border-gray-700'
                  } ${day.isCurrentMonth ? '' : 'bg-gray-50 dark:bg-gray-900/30 text-gray-400'}`}
                >
                  <div className="font-medium text-gray-900 dark:text-white mb-1">{day.date.getDate()}</div>
                  {day.events.map(event => (
                    <div
                      key={event.id}
                      className="text-xs p-1 mb-1 rounded truncate cursor-pointer hover:opacity-90"
                      style={{ 
                        backgroundColor: event.category === 'info-session' ? '#dbeafe' : 
                                       event.category === 'workshop' ? '#dcfce7' :
                                       event.category === 'contest' ? '#f3e8ff' :
                                       event.category === 'interview' ? '#fef3c7' :
                                       event.category === 'talk' ? '#e0e7ff' : '#ffedd5'
                      }}
                      onClick={() => openEventDetails(event)}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group">
                {/* Event Header */}
                <div className={`h-2 bg-gradient-to-r ${event.imageColor}`}></div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusConfig(event.status)}
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          getCategoryConfig(event.category).color
                        }`}>
                          {getCategoryConfig(event.category).icon}
                          {event.type}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                        {event.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleSaveEvent(event.id)}
                      className={`p-2 rounded-lg ${
                        savedEvents.includes(event.id) 
                          ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                      }`}
                    >
                      {savedEvents.includes(event.id) ? (
                        <Star className="w-5 h-5 fill-current" />
                      ) : (
                        <Star className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {getTimeRemaining(event.date, event.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.registered}/{event.capacity} registered</span>
                    </div>
                    <div className="text-green-600 dark:text-green-400 font-medium">
                      {Math.round((event.registered / event.capacity) * 100)}% full
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {event.status === 'completed' ? (
                      <button
                        onClick={() => openEventDetails(event)}
                        className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-5 h-5" />
                        View Recording
                      </button>
                    ) : registeredEvents.includes(event.id) ? (
                      <button
                        disabled
                        className="flex-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 py-3 rounded-lg font-medium flex items-center justify-center gap-2 cursor-default"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Registered
                      </button>
                    ) : event.registered >= event.capacity ? (
                      <button
                        disabled
                        className="flex-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 py-3 rounded-lg font-medium cursor-default"
                      >
                        Full
                      </button>
                    ) : (
                      <button
                        onClick={() => openRegistrationModal(event)}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-5 h-5" />
                        Register Now
                      </button>
                    )}
                    
                    <button 
                      onClick={() => openEventDetails(event)}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">Event</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">Date & Time</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">Location</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${event.imageColor}`}></div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{event.title}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{event.organizer}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900 dark:text-white">{formatDate(event.date)}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{event.time}</div>
                      </td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{event.location}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          {getStatusConfig(event.status)}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {event.registered}/{event.capacity} spots
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEventDetails(event)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {event.status !== 'completed' && !registeredEvents.includes(event.id) && event.registered < event.capacity && (
                            <button
                              onClick={() => openRegistrationModal(event)}
                              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                            >
                              Register
                            </button>
                          )}
                          {registeredEvents.includes(event.id) && (
                            <span className="px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-sm rounded-lg">
                              Registered
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No events found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setStatusFilter('all');
                setDateFilter('all');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stats.upcoming}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{stats.ongoing}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ongoing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-1">{stats.completed}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">{stats.registered}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Registered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">{stats.saved}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {isDetailModalOpen && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setIsDetailModalOpen(false)}
          isRegistered={registeredEvents.includes(selectedEvent.id)}
          isSaved={savedEvents.includes(selectedEvent.id)}
          onToggleSave={() => toggleSaveEvent(selectedEvent.id)}
          onRegister={() => {
            registerForEvent(selectedEvent.id);
            setIsDetailModalOpen(false);
          }}
        />
      )}

      {/* Registration Modal */}
      {isRegisterModalOpen && selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          onClose={() => setIsRegisterModalOpen(false)}
          onRegister={() => {
            registerForEvent(selectedEvent.id);
            setIsRegisterModalOpen(false);
          }}
        />
      )}
    </StudentLayout>
  );
};

// Event Details Modal Component
const EventDetailsModal = ({ event, onClose, isRegistered, isSaved, onToggleSave, onRegister }) => {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Event Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Event Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {getStatusConfig(event.status)}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    getCategoryConfig(event.category).color
                  }`}>
                    {getCategoryConfig(event.category).icon}
                    {event.type}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleSave}
                  className={`p-2 rounded-lg ${
                    isSaved 
                      ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                      : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                  }`}
                >
                  {isSaved ? (
                    <Star className="w-5 h-5 fill-current" />
                  ) : (
                    <Star className="w-5 h-5" />
                  )}
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Date</div>
                  <div className="font-medium text-gray-900 dark:text-white">{formatDate(event.date)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Time</div>
                  <div className="font-medium text-gray-900 dark:text-white">{event.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                  <div className="font-medium text-gray-900 dark:text-white">{event.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <Users className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Capacity</div>
                  <div className="font-medium text-gray-900 dark:text-white">{event.registered}/{event.capacity}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex overflow-x-auto">
              {['details', 'speakers', 'materials', 'contact'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
                >
                  {tab === 'details' && <FileText className="w-4 h-4" />}
                  {tab === 'speakers' && <User className="w-4 h-4" />}
                  {tab === 'materials' && <Download className="w-4 h-4" />}
                  {tab === 'contact' && <Mail className="w-4 h-4" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements</h4>
                  <p className="text-gray-600 dark:text-gray-300">{event.requirements}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {event.recordingLink && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recording</h4>
                    <a
                      href={event.recordingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Video className="w-5 h-5" />
                      Watch recording
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'speakers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {speaker.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{speaker.name}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{speaker.role}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{speaker.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-4">
                {event.materials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{material}</span>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Organizer</h4>
                  <p className="text-gray-900 dark:text-white">{event.organizer}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a href={`mailto:${event.contact}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                        {event.contact}
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Registration Deadline</h4>
                  <p className="text-gray-600 dark:text-gray-300">{formatDate(event.registrationDeadline)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            {event.status === 'completed' ? (
              event.recordingLink ? (
                <a
                  href={event.recordingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  Watch Recording
                </a>
              ) : null
            ) : isRegistered ? (
              <button
                disabled
                className="px-6 py-3 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg font-semibold flex items-center gap-2 cursor-default"
              >
                <CheckCircle className="w-5 h-5" />
                Already Registered
              </button>
            ) : event.registered >= event.capacity ? (
              <button
                disabled
                className="px-6 py-3 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-lg font-semibold cursor-default"
              >
                Event Full
              </button>
            ) : (
              <button
                onClick={onRegister}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Register Now
              </button>
            )}
            
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Set Reminder
            </button>
            
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Registration Modal Component
const RegistrationModal = ({ event, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    year: '',
    questions: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Register for Event</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{event.title}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="ME">ME</option>
                  <option value="CE">CE</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Questions for Speakers (Optional)
              </label>
              <textarea
                value={formData.questions}
                onChange={(e) => setFormData({...formData, questions: e.target.value})}
                rows="3"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Any specific questions you'd like to ask..."
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Confirm Registration
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper function to generate calendar days
const generateCalendarDays = (date, view, eventsList) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  const days = [];
  const startingDay = firstDay.getDay();
  
  // Previous month's days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDay - 1; i >= 0; i--) {
    const dayDate = new Date(year, month - 1, prevMonthLastDay - i);
    days.push({
      date: dayDate,
      isCurrentMonth: false,
      isToday: false,
      events: []
    });
  }
  
  // Current month's days
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(year, month, i);
    const isToday = dayDate.getTime() === today.getTime();
    
    // Filter events for this day
    const dayEvents = (eventsList || []).filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === i && 
             eventDate.getMonth() === month && 
             eventDate.getFullYear() === year;
    });
    
    days.push({
      date: dayDate,
      isCurrentMonth: true,
      isToday: isToday,
      events: dayEvents
    });
  }
  
  // Next month's days
  const totalCells = 42; // 6 weeks
  const nextMonthDays = totalCells - days.length;
  for (let i = 1; i <= nextMonthDays; i++) {
    const dayDate = new Date(year, month + 1, i);
    days.push({
      date: dayDate,
      isCurrentMonth: false,
      isToday: false,
      events: []
    });
  }
  
  return days;
};

export default Events;