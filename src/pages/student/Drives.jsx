import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/StudentLayout';
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Search,
  Filter,
  Users,
  GraduationCap,
  Award,
  ExternalLink,
  Eye,
  Bookmark,
  Share2,
  Download,
  ArrowUpDown,
  Star,
  Tag,
  Check,
  X
} from 'lucide-react';

const Drives = () => {
  const [drives, setDrives] = useState([]);
  const [filteredDrives, setFilteredDrives] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [appliedDrives, setAppliedDrives] = useState([1, 3, 5]);
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [savedDrives, setSavedDrives] = useState([2, 4]);

  // Sample drives data
  const drivesData = [
    {
      id: 1,
      company: 'Google',
      logoColor: 'bg-gradient-to-br from-red-500 to-yellow-500',
      role: 'Software Engineer',
      location: 'Bangalore, India',
      date: '2024-03-15',
      time: '10:00 AM',
      ctc: '₹22 - 25 LPA',
      status: 'open',
      description: 'Looking for software engineers with strong problem-solving skills and experience in algorithms, data structures, and system design.',
      eligibility: 'CGPA ≥ 8.0, No backlogs, 2024 Batch',
      deadline: '2024-03-10',
      jobType: 'Full-time',
      experience: 'Fresher',
      skills: ['Algorithms', 'Data Structures', 'System Design', 'Python', 'Java'],
      process: ['Online Test', 'Technical Rounds', 'HR Interview'],
      openings: 15,
      appliedCount: 285,
      companyInfo: 'Google is a multinational technology company focusing on search engine technology, online advertising, cloud computing, and AI.'
    },
    {
      id: 2,
      company: 'Microsoft',
      logoColor: 'bg-gradient-to-br from-blue-500 to-green-500',
      role: 'Product Manager',
      location: 'Hyderabad, India',
      date: '2024-03-18',
      time: '2:00 PM',
      ctc: '₹20 - 22 LPA',
      status: 'open',
      description: 'Product management role focusing on cloud services and enterprise solutions. Opportunity to work on Azure services.',
      eligibility: 'Any branch, CGPA ≥ 7.5, 2024 Batch',
      deadline: '2024-03-12',
      jobType: 'Full-time',
      experience: 'Fresher',
      skills: ['Product Management', 'Cloud Computing', 'Agile', 'Analytics'],
      process: ['Aptitude Test', 'Case Study', 'Product Round', 'HR'],
      openings: 8,
      appliedCount: 192,
      companyInfo: 'Microsoft develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers.'
    },
    {
      id: 3,
      company: 'Amazon',
      logoColor: 'bg-gradient-to-br from-orange-500 to-yellow-500',
      role: 'SDE 1',
      location: 'Chennai, India',
      date: '2024-03-20',
      time: '9:00 AM',
      ctc: '₹19 - 21 LPA',
      status: 'upcoming',
      description: 'Entry-level software development engineer position working on AWS services and e-commerce platforms.',
      eligibility: 'CSE/IT, CGPA ≥ 8.0, 2024 Batch',
      deadline: '2024-03-15',
      jobType: 'Full-time',
      experience: 'Fresher',
      skills: ['AWS', 'Java', 'Spring Boot', 'Microservices'],
      process: ['Online Assessment', 'Technical Rounds', 'Leadership Principles'],
      openings: 25,
      appliedCount: 0,
      companyInfo: 'Amazon is an American multinational technology company focusing on e-commerce, cloud computing, and AI.'
    },
    {
      id: 4,
      company: 'TCS',
      logoColor: 'bg-gradient-to-br from-blue-500 to-blue-700',
      role: 'System Analyst',
      location: 'Mumbai, India',
      date: '2024-03-22',
      time: '11:00 AM',
      ctc: '₹7 - 9 LPA',
      status: 'open',
      description: 'System analyst role for banking domain projects involving requirement analysis and solution design.',
      eligibility: 'Any branch, CGPA ≥ 7.0, 2024 Batch',
      deadline: '2024-03-18',
      jobType: 'Full-time',
      experience: 'Fresher',
      skills: ['SQL', 'Banking Domain', 'Requirements Analysis', 'UML'],
      process: ['Aptitude', 'Technical Interview', 'HR'],
      openings: 50,
      appliedCount: 450,
      companyInfo: 'TCS is an Indian multinational information technology services and consulting company.'
    },
    {
      id: 5,
      company: 'Infosys',
      logoColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
      role: 'Business Analyst',
      location: 'Pune, India',
      date: '2024-03-25',
      time: '3:00 PM',
      ctc: '₹7.5 - 8.5 LPA',
      status: 'upcoming',
      description: 'Business analysis role for digital transformation projects involving client interaction and process improvement.',
      eligibility: 'Any branch, Good communication skills, 2024 Batch',
      deadline: '2024-03-20',
      jobType: 'Full-time',
      experience: 'Fresher',
      skills: ['Business Analysis', 'Process Modeling', 'Communication', 'Agile'],
      process: ['Aptitude', 'Group Discussion', 'Interview'],
      openings: 40,
      appliedCount: 0,
      companyInfo: 'Infosys is an Indian multinational corporation providing business consulting, information technology, and outsourcing services.'
    },
    {
      id: 6,
      company: 'Goldman Sachs',
      logoColor: 'bg-gradient-to-br from-blue-600 to-black',
      role: 'Analyst',
      location: 'Bangalore, India',
      date: '2024-03-28',
      time: '1:00 PM',
      ctc: '₹25 - 28 LPA',
      status: 'upcoming',
      description: 'Financial analyst role in investment banking division focusing on financial modeling and analysis.',
      eligibility: 'Finance background preferred, CGPA ≥ 8.5, 2024 Batch',
      deadline: '2024-03-22',
      jobType: 'Full-time',
      experience: 'Fresher',
      skills: ['Financial Modeling', 'Excel', 'Analytical Skills', 'Finance'],
      process: ['Aptitude', 'Technical Rounds', 'Super Day'],
      openings: 10,
      appliedCount: 0,
      companyInfo: 'Goldman Sachs is a leading global investment banking, securities, and investment management firm.'
    },
    {
      id: 7,
      company: 'Adobe',
      logoColor: 'bg-gradient-to-br from-red-600 to-orange-500',
      role: 'UX Designer',
      location: 'Noida, India',
      date: '2024-02-28',
      time: '10:00 AM',
      ctc: '₹17 - 20 LPA',
      status: 'closed',
      description: 'User experience designer for creative cloud products focusing on user research and interface design.',
      eligibility: 'Design background, Portfolio required, 2024 Batch',
      deadline: '2024-02-20',
      jobType: 'Full-time',
      experience: 'Fresher',
      skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
      process: ['Portfolio Review', 'Design Challenge', 'Interviews'],
      openings: 5,
      appliedCount: 120,
      companyInfo: 'Adobe is an American multinational computer software company known for its creative and multimedia software products.'
    },
    {
      id: 8,
      company: 'Intel',
      logoColor: 'bg-gradient-to-br from-blue-400 to-blue-800',
      role: 'Hardware Engineer',
      location: 'Bengaluru, India',
      date: '2024-02-25',
      time: '9:30 AM',
      ctc: '₹15 - 18 LPA',
      status: 'closed',
      description: 'Hardware engineering role for processor design and validation with focus on semiconductor technology.',
      eligibility: 'ECE/EEE, CGPA ≥ 8.0, 2024 Batch',
      deadline: '2024-02-18',
      jobType: 'Full-time',
      experience: 'Fresher',
      skills: ['VLSI', 'Digital Design', 'Verilog', 'Semiconductors'],
      process: ['Technical Test', 'Technical Rounds', 'HR'],
      openings: 12,
      appliedCount: 95,
      companyInfo: 'Intel is an American multinational corporation and technology company specializing in semiconductor chips.'
    },
    {
      id: 9,
      company: 'Apple',
      logoColor: 'bg-gradient-to-br from-gray-700 to-gray-900',
      role: 'iOS Developer',
      location: 'Hyderabad, India',
      date: '2024-04-05',
      time: '11:00 AM',
      ctc: '₹24 - 27 LPA',
      status: 'open',
      description: 'iOS development role focusing on mobile applications for Apple ecosystem with Swift and UIKit.',
      eligibility: 'CSE/IT, CGPA ≥ 8.5, 2024 Batch',
      deadline: '2024-03-30',
      jobType: 'Full-time',
      experience: 'Fresher',
      skills: ['Swift', 'iOS SDK', 'UIKit', 'Xcode'],
      process: ['Coding Test', 'Technical Rounds', 'System Design'],
      openings: 8,
      appliedCount: 210,
      companyInfo: 'Apple is an American multinational technology company specializing in consumer electronics, software, and online services.'
    },
    {
      id: 10,
      company: 'Meta',
      logoColor: 'bg-gradient-to-br from-blue-600 to-purple-600',
      role: 'Data Scientist',
      location: 'Bangalore, India',
      date: '2024-04-10',
      time: '2:30 PM',
      ctc: '₹26 - 30 LPA',
      status: 'upcoming',
      description: 'Data science role focusing on machine learning models for social media analytics and user behavior.',
      eligibility: 'CSE/IT/Maths, CGPA ≥ 8.8, 2024 Batch',
      deadline: '2024-04-05',
      jobType: 'Full-time',
      experience: 'Fresher',
      skills: ['Machine Learning', 'Python', 'SQL', 'Statistics'],
      process: ['Data Science Test', 'Case Studies', 'Technical Rounds'],
      openings: 6,
      appliedCount: 0,
      companyInfo: 'Meta is a technology company that focuses on social media, virtual reality, and artificial intelligence.'
    }
  ];

  useEffect(() => {
    setDrives(drivesData);
    filterDrives();
  }, []);

  useEffect(() => {
    filterDrives();
  }, [searchTerm, activeFilter, sortBy, drives]);

  const filterDrives = () => {
    let filtered = [...drives];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(drive =>
        drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drive.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drive.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'applied') {
        filtered = filtered.filter(drive => appliedDrives.includes(drive.id));
      } else if (activeFilter === 'saved') {
        filtered = filtered.filter(drive => savedDrives.includes(drive.id));
      } else {
        filtered = filtered.filter(drive => drive.status === activeFilter);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'ctc':
          return parseFloat(b.ctc.split('₹')[1].split(' ')[0]) - parseFloat(a.ctc.split('₹')[1].split(' ')[0]);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        default:
          return 0;
      }
    });

    setFilteredDrives(filtered);
  };

  const handleApply = (driveId) => {
    if (!appliedDrives.includes(driveId)) {
      setAppliedDrives([...appliedDrives, driveId]);
      // Show success message
      const company = drives.find(d => d.id === driveId)?.company;
      alert(`Successfully applied to ${company}!`);
    }
  };

  const toggleSaveDrive = (driveId) => {
    if (savedDrives.includes(driveId)) {
      setSavedDrives(savedDrives.filter(id => id !== driveId));
    } else {
      setSavedDrives([...savedDrives, driveId]);
    }
  };

  const openDriveDetails = (drive) => {
    setSelectedDrive(drive);
    setIsDetailModalOpen(true);
  };

  const getStatusConfig = (status, isApplied) => {
    if (isApplied) {
      return {
        text: 'Applied',
        icon: <CheckCircle className="w-4 h-4" />,
        className: 'bg-green-100 text-green-800 border-green-200'
      };
    }

    switch (status) {
      case 'open':
        return {
          text: 'Open',
          icon: <CheckCircle className="w-4 h-4" />,
          className: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'upcoming':
        return {
          text: 'Upcoming',
          icon: <Clock className="w-4 h-4" />,
          className: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'closed':
        return {
          text: 'Closed',
          icon: <XCircle className="w-4 h-4" />,
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
      default:
        return {
          text: 'Unknown',
          icon: <AlertCircle className="w-4 h-4" />,
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const getStatusBadge = (drive) => {
    const isApplied = appliedDrives.includes(drive.id);
    const config = getStatusConfig(drive.status, isApplied);
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${config.className}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Deadline passed';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const filters = [
    { key: 'all', label: 'All Drives', count: drives.length },
    { key: 'open', label: 'Open', count: drives.filter(d => d.status === 'open').length },
    { key: 'upcoming', label: 'Upcoming', count: drives.filter(d => d.status === 'upcoming').length },
    { key: 'closed', label: 'Closed', count: drives.filter(d => d.status === 'closed').length },
    { key: 'applied', label: 'Applied', count: appliedDrives.length },
    { key: 'saved', label: 'Saved', count: savedDrives.length }
  ];

  const sortOptions = [
    { key: 'date', label: 'Date' },
    { key: 'ctc', label: 'CTC' },
    { key: 'company', label: 'Company' },
    { key: 'deadline', label: 'Deadline' }
  ];

  const stats = {
    total: drives.length,
    open: drives.filter(d => d.status === 'open').length,
    upcoming: drives.filter(d => d.status === 'upcoming').length,
    applied: appliedDrives.length,
    saved: savedDrives.length
  };

  return (
    <StudentLayout activePage="drives" pageTitle="Placement Drives">
      {/* Page Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Placement Drives</h1>
              <p className="text-lg text-gray-600 mb-4">
                Explore and apply for upcoming placement opportunities from top companies.
                Filter by status, search for specific roles, and track your applications.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Open for applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Upcoming drives</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span>Closed drives</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{stats.open}</div>
                  <div className="text-sm text-gray-600">Open</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stats.upcoming}</div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{stats.applied}</div>
                  <div className="text-sm text-gray-600">Applied</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <section className="mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Search by company, role, or skills..."
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option.key} value={option.key}>{option.label}</option>
                ))}
              </select>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeFilter === filter.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.key ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Drives Listing */}
      <section>
        {filteredDrives.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No drives found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrives.map((drive) => (
              <div key={drive.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group">
                {/* Drive Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg ${drive.logoColor} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <span className="text-white font-bold text-lg">
                          {drive.company.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{drive.company}</h3>
                        <p className="text-sm text-gray-600">{drive.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSaveDrive(drive.id)}
                        className={`p-1.5 rounded-lg ${savedDrives.includes(drive.id) ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'}`}
                      >
                        {savedDrives.includes(drive.id) ? (
                          <Award className="w-4 h-4 fill-current" />
                        ) : (
                          <Award className="w-4 h-4" />
                        )}
                      </button>
                      {getStatusBadge(drive)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{drive.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {drive.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {drive.date}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 font-medium text-gray-900">
                      <DollarSign className="w-4 h-4" />
                      {drive.ctc}
                    </span>
                  </div>
                </div>

                {/* Drive Details */}
                <div className="p-6 bg-gray-50">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Eligibility:</span>
                      <span className="font-medium text-gray-900 text-right">{drive.eligibility}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Drive Time:</span>
                      <span className="font-medium text-gray-900">{drive.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Deadline:</span>
                      <div className="text-right">
                        <span className="font-medium text-gray-900">{drive.deadline}</span>
                        <div className={`text-xs ${getTimeRemaining(drive.deadline).includes('passed') ? 'text-red-600' : 'text-green-600'}`}>
                          {getTimeRemaining(drive.deadline)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {drive.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                    {drive.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{drive.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {drive.status === 'open' && !appliedDrives.includes(drive.id) ? (
                      <button
                        onClick={() => handleApply(drive.id)}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group/apply"
                      >
                        <CheckCircle className="w-5 h-5 group-hover/apply:scale-110 transition-transform" />
                        Apply Now
                      </button>
                    ) : appliedDrives.includes(drive.id) ? (
                      <button
                        disabled
                        className="flex-1 bg-green-100 text-green-800 py-3 rounded-lg font-medium flex items-center justify-center gap-2 cursor-default"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Applied
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-lg font-medium cursor-default"
                      >
                        Applications Closed
                      </button>
                    )}
                    
                    <button 
                      onClick={() => openDriveDetails(drive)}
                      className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group/view"
                    >
                      <Eye className="w-5 h-5 text-gray-600 group-hover/view:text-blue-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Company</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Location</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">CTC</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDrives.map((drive) => (
                    <tr key={drive.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${drive.logoColor}`}></div>
                          <div>
                            <div className="font-medium text-gray-900">{drive.company}</div>
                            <div className="text-sm text-gray-500">{drive.jobType}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{drive.role}</div>
                        <div className="text-sm text-gray-500">{drive.experience}</div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{drive.location}</td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900">{drive.date}</div>
                        <div className="text-xs text-gray-500">{drive.time}</div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-900">{drive.ctc}</td>
                      <td className="py-4 px-6">{getStatusBadge(drive)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openDriveDetails(drive)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {drive.status === 'open' && !appliedDrives.includes(drive.id) ? (
                            <button
                              onClick={() => handleApply(drive.id)}
                              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                            >
                              Apply
                            </button>
                          ) : appliedDrives.includes(drive.id) ? (
                            <span className="px-3 py-1.5 bg-green-100 text-green-800 text-sm rounded-lg">
                              Applied
                            </span>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Drives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.open}</div>
              <div className="text-sm text-gray-600">Open Drives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stats.upcoming}</div>
              <div className="text-sm text-gray-600">Upcoming Drives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.applied}</div>
              <div className="text-sm text-gray-600">Your Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.saved}</div>
              <div className="text-sm text-gray-600">Saved Drives</div>
            </div>
          </div>
        </div>
      </section>

      {/* Drive Details Modal */}
      {isDetailModalOpen && selectedDrive && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Drive Details</h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Company Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-xl ${selectedDrive.logoColor} flex items-center justify-center`}>
                  <span className="text-white font-bold text-2xl">
                    {selectedDrive.company.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedDrive.company}</h3>
                  <p className="text-lg text-gray-600">{selectedDrive.role}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedDrive.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedDrive.date} at {selectedDrive.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {selectedDrive.ctc}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedDrive)}
                  <button
                    onClick={() => toggleSaveDrive(selectedDrive.id)}
                    className={`p-2 rounded-lg ${savedDrives.includes(selectedDrive.id) ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'}`}
                  >
                    {savedDrives.includes(selectedDrive.id) ? (
                      <Award className="w-5 h-5 fill-current" />
                    ) : (
                      <Award className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                    <p className="text-gray-600">{selectedDrive.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Company Information</h4>
                    <p className="text-gray-600">{selectedDrive.companyInfo}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Selection Process</h4>
                    <ul className="space-y-2">
                      {selectedDrive.process.map((step, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 text-xs font-medium">{index + 1}</span>
                          </div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="mb-3">
                        <div className="text-sm text-gray-500 mb-1">Eligibility Criteria</div>
                        <div className="font-medium text-gray-900">{selectedDrive.eligibility}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-sm text-gray-500 mb-1">Job Type</div>
                        <div className="font-medium text-gray-900">{selectedDrive.jobType}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-sm text-gray-500 mb-1">Experience</div>
                        <div className="font-medium text-gray-900">{selectedDrive.experience}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Application Deadline</div>
                        <div className="font-medium text-gray-900">{selectedDrive.deadline}</div>
                        <div className={`text-sm mt-1 ${getTimeRemaining(selectedDrive.deadline).includes('passed') ? 'text-red-600' : 'text-green-600'}`}>
                          {getTimeRemaining(selectedDrive.deadline)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDrive.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Drive Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-blue-600">{selectedDrive.openings}</div>
                        <div className="text-sm text-blue-700">Open Positions</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-green-600">{selectedDrive.appliedCount}</div>
                        <div className="text-sm text-green-700">Applications</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                {selectedDrive.status === 'open' && !appliedDrives.includes(selectedDrive.id) ? (
                  <button
                    onClick={() => {
                      handleApply(selectedDrive.id);
                      setIsDetailModalOpen(false);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Apply Now
                  </button>
                ) : appliedDrives.includes(selectedDrive.id) ? (
                  <button
                    disabled
                    className="flex-1 bg-green-100 text-green-800 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Already Applied
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-lg font-semibold"
                  >
                    Applications Closed
                  </button>
                )}
                
                <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Save Details
                </button>
                
                <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default Drives;