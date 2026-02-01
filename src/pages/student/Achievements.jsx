import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/StudentLayout';
import {
  Trophy,
  Award,
  Star,
  TrendingUp,
  Target,
  Medal,
  Crown,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Download,
  Share2,
  Eye,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  Users,
  BarChart3,
  TrendingDown,
  Briefcase,
  Code,
  BookOpen,
  Languages,
  Globe,
  Heart,
  Sparkles,
  Bell,
  Mail,
  MessageSquare,
  ExternalLink,
  ArrowUpRight,
  Shield,
  Lock,
  Unlock,
  Upload,
  Image,
  FileText
} from 'lucide-react';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [filteredAchievements, setFilteredAchievements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    pending: 0,
    rejected: 0,
    points: 0,
    level: 1
  });

  // Sample achievements data
  const achievementsData = [
    {
      id: 1,
      title: 'Google CodeJam Finalist',
      description: 'Reached finals in Google CodeJam 2023 among top 1000 participants worldwide.',
      category: 'coding',
      type: 'competition',
      status: 'verified',
      date: '2023-08-15',
      issuer: 'Google',
      verificationId: 'GCJ2023-FINAL',
      points: 500,
      level: 'national',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
      attachments: ['certificate.pdf', 'scorecard.pdf'],
      skills: ['Algorithms', 'Data Structures', 'Problem Solving'],
      tags: ['Google', 'Competition', 'Coding'],
      verificationDate: '2023-08-20',
      verifiedBy: 'Placement Office',
      notes: 'Qualified for onsite round in Mountain View',
      featured: true
    },
    {
      id: 2,
      title: 'Hackathon Winner - Smart India Hackathon',
      description: '1st prize in Smart India Hackathon 2023 for developing a smart waste management system.',
      category: 'hackathon',
      type: 'competition',
      status: 'verified',
      date: '2023-03-20',
      issuer: 'Government of India',
      verificationId: 'SIH2023-WIN',
      points: 750,
      level: 'national',
      image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w-400',
      attachments: ['winner_certificate.pdf', 'project_report.pdf'],
      skills: ['IoT', 'Python', 'Hardware', 'Teamwork'],
      tags: ['Hackathon', 'Winner', 'Innovation'],
      verificationDate: '2023-03-25',
      verifiedBy: 'Department Coordinator',
      notes: 'Team leader of 6 members',
      featured: true
    },
    {
      id: 3,
      title: 'Microsoft Learn Student Ambassador',
      description: 'Selected as Microsoft Learn Student Ambassador for contributions to tech community.',
      category: 'leadership',
      type: 'recognition',
      status: 'verified',
      date: '2023-06-10',
      issuer: 'Microsoft',
      verificationId: 'MLSA-2023-045',
      points: 300,
      level: 'international',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
      attachments: ['ambassador_certificate.pdf'],
      skills: ['Community Building', 'Public Speaking', 'Technical Skills'],
      tags: ['Microsoft', 'Ambassador', 'Leadership'],
      verificationDate: '2023-06-15',
      verifiedBy: 'Microsoft Team',
      notes: 'Active for 1 year term',
      featured: false
    },
    {
      id: 4,
      title: 'Research Paper Publication - IEEE',
      description: 'Published research paper on "AI in Healthcare" in IEEE International Conference.',
      category: 'research',
      type: 'publication',
      status: 'pending',
      date: '2024-01-15',
      issuer: 'IEEE',
      verificationId: 'IEEE-ICAIHC-2024',
      points: 1000,
      level: 'international',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400',
      attachments: ['research_paper.pdf', 'acceptance_letter.pdf'],
      skills: ['Research', 'Academic Writing', 'Data Analysis'],
      tags: ['Research', 'Publication', 'IEEE'],
      verificationDate: null,
      verifiedBy: null,
      notes: 'Under review by placement cell',
      featured: false
    },
    {
      id: 5,
      title: 'TCS CodeVita Season 11',
      description: 'Ranked in top 100 in TCS CodeVita Season 11 coding competition.',
      category: 'coding',
      type: 'competition',
      status: 'verified',
      date: '2023-11-05',
      issuer: 'TCS',
      verificationId: 'TCS-CV11-TOP100',
      points: 400,
      level: 'national',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
      attachments: ['rank_certificate.pdf'],
      skills: ['Coding', 'Time Management', 'Competitive Programming'],
      tags: ['TCS', 'CodeVita', 'Coding'],
      verificationDate: '2023-11-10',
      verifiedBy: 'TPO Office',
      notes: 'Received interview opportunity',
      featured: true
    },
    {
      id: 6,
      title: 'Best Project Award - Department',
      description: 'Awarded best project for final year project "Smart Attendance System using Face Recognition".',
      category: 'project',
      type: 'award',
      status: 'verified',
      date: '2024-02-20',
      issuer: 'VCET - CSE Department',
      verificationId: 'VCET-PROJ-2024-01',
      points: 250,
      level: 'college',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      attachments: ['award_certificate.pdf', 'project_demo.mp4'],
      skills: ['Python', 'OpenCV', 'Machine Learning', 'Project Management'],
      tags: ['Project', 'Award', 'Final Year'],
      verificationDate: '2024-02-22',
      verifiedBy: 'HOD CSE',
      notes: 'Implemented in college for trial',
      featured: false
    },
    {
      id: 7,
      title: 'Gold Medal - ACM ICPC Regional',
      description: 'Gold medal in ACM ICPC Asia Regionals 2023 programming contest.',
      category: 'coding',
      type: 'competition',
      status: 'rejected',
      date: '2023-10-12',
      issuer: 'ACM',
      verificationId: 'ICPC-ASIA-2023-GOLD',
      points: 1000,
      level: 'international',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
      attachments: ['medal_certificate.pdf', 'team_photo.jpg'],
      skills: ['Team Coding', 'Algorithms', 'Competitive Programming'],
      tags: ['ACM', 'ICPC', 'Gold Medal'],
      verificationDate: '2023-10-20',
      verifiedBy: 'Placement Office',
      notes: 'Document verification pending',
      featured: false
    },
    {
      id: 8,
      title: 'Community Service - 100+ Hours',
      description: 'Completed 100+ hours of community service teaching coding to underprivileged students.',
      category: 'volunteer',
      type: 'service',
      status: 'verified',
      date: '2023-12-01',
      issuer: 'NGO - CodeForChange',
      verificationId: 'CFC-VOL-100HRS',
      points: 200,
      level: 'local',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400',
      attachments: ['service_certificate.pdf', 'feedback_letters.pdf'],
      skills: ['Teaching', 'Communication', 'Social Work'],
      tags: ['Volunteer', 'Community', 'Teaching'],
      verificationDate: '2023-12-05',
      verifiedBy: 'NGO Coordinator',
      notes: 'Weekly sessions for 6 months',
      featured: false
    }
  ];

  const categories = [
    { key: 'all', label: 'All Categories', icon: <Trophy className="w-4 h-4" /> },
    { key: 'coding', label: 'Coding', icon: <Code className="w-4 h-4" /> },
    { key: 'hackathon', label: 'Hackathon', icon: <Zap className="w-4 h-4" /> },
    { key: 'research', label: 'Research', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'project', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { key: 'leadership', label: 'Leadership', icon: <Users className="w-4 h-4" /> },
    { key: 'volunteer', label: 'Volunteer', icon: <Heart className="w-4 h-4" /> }
  ];

  const statuses = [
    { key: 'all', label: 'All Status' },
    { key: 'verified', label: 'Verified' },
    { key: 'pending', label: 'Pending' },
    { key: 'rejected', label: 'Rejected' }
  ];

  const years = ['all', '2024', '2023', '2022', '2021'];
  const sortOptions = [
    { key: 'date', label: 'Recent First' },
    { key: 'points', label: 'Points High to Low' },
    { key: 'title', label: 'Title A-Z' },
    { key: 'level', label: 'Level' }
  ];

  const levels = {
    'international': { label: 'International', color: 'bg-purple-100 text-purple-800', icon: <Globe className="w-3 h-3" /> },
    'national': { label: 'National', color: 'bg-blue-100 text-blue-800', icon: <Users className="w-3 h-3" /> },
    'college': { label: 'College', color: 'bg-green-100 text-green-800', icon: <Award className="w-3 h-3" /> },
    'local': { label: 'Local', color: 'bg-yellow-100 text-yellow-800', icon: <Target className="w-3 h-3" /> }
  };

  useEffect(() => {
    setAchievements(achievementsData);
    filterAchievements();
    calculateStats();
  }, []);

  useEffect(() => {
    filterAchievements();
  }, [searchTerm, categoryFilter, statusFilter, yearFilter, sortBy, achievements]);

  const filterAchievements = () => {
    let filtered = [...achievements];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(achievement =>
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(achievement => achievement.category === categoryFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(achievement => achievement.status === statusFilter);
    }

    // Apply year filter
    if (yearFilter !== 'all') {
      filtered = filtered.filter(achievement => achievement.date.startsWith(yearFilter));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'points':
          return b.points - a.points;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'level':
          const levelOrder = { 'international': 4, 'national': 3, 'college': 2, 'local': 1 };
          return levelOrder[b.level] - levelOrder[a.level];
        default:
          return 0;
      }
    });

    setFilteredAchievements(filtered);
  };

  const calculateStats = () => {
    const total = achievements.length;
    const verified = achievements.filter(a => a.status === 'verified').length;
    const pending = achievements.filter(a => a.status === 'pending').length;
    const rejected = achievements.filter(a => a.status === 'rejected').length;
    const points = achievements.filter(a => a.status === 'verified').reduce((sum, a) => sum + a.points, 0);
    const level = Math.floor(points / 1000) + 1;

    setStats({ total, verified, pending, rejected, points, level });
  };

  const getStatusConfig = (status) => {
    const statusConfig = {
      'verified': { 
        text: 'Verified', 
        icon: <CheckCircle className="w-4 h-4" />, 
        className: 'bg-green-100 text-green-800 border-green-200',
        badge: 'bg-green-500'
      },
      'pending': { 
        text: 'Pending', 
        icon: <Clock className="w-4 h-4" />, 
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        badge: 'bg-yellow-500'
      },
      'rejected': { 
        text: 'Rejected', 
        icon: <XCircle className="w-4 h-4" />, 
        className: 'bg-red-100 text-red-800 border-red-200',
        badge: 'bg-red-500'
      }
    };
    
    const config = statusConfig[status] || statusConfig['pending'];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const config = levels[level] || levels['local'];
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const openAchievementDetails = (achievement) => {
    setSelectedAchievement(achievement);
    setIsDetailModalOpen(true);
  };

  const handleAddAchievement = (newAchievement) => {
    const id = achievements.length + 1;
    const achievementWithId = { ...newAchievement, id, status: 'pending', featured: false };
    setAchievements([...achievements, achievementWithId]);
    setIsAddModalOpen(false);
  };

  const handleEditAchievement = (updatedAchievement) => {
    setAchievements(achievements.map(a => 
      a.id === updatedAchievement.id ? updatedAchievement : a
    ));
    setIsEditModalOpen(false);
  };

  const handleDeleteAchievement = (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      setAchievements(achievements.filter(a => a.id !== id));
    }
  };

  const handleVerificationRequest = (id) => {
    // In real app, send request to admin
    alert('Verification request sent to placement office');
  };

  const shareAchievement = (achievement) => {
    const text = `Check out my achievement: ${achievement.title} - ${achievement.description}`;
    if (navigator.share) {
      navigator.share({
        title: achievement.title,
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Achievement details copied to clipboard!');
    }
  };

  const downloadCertificate = (achievement) => {
    // In real app, download actual certificate
    alert(`Downloading certificate for: ${achievement.title}`);
  };

  return (
    <StudentLayout activePage="achievements" pageTitle="Achievements" showSearch={false}>
      {/* Page Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-yellow-100 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Achievements</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">Showcase your accomplishments and skills</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Verified Achievements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Pending Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Featured Achievements</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm min-w-[300px]">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.total}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{stats.verified}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Verified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stats.points}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">Level {stats.level}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Current Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Achievement Progress</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">Level {stats.level}</span>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Current Points: {stats.points}</span>
              <span>Next Level: {stats.level * 1000}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (stats.points % 1000) / 10)}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Medal className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{stats.level * 1000 - stats.points} points to next level</span>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
        </div>

        {/* Achievement Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Achievement Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Verified</span>
                <span className="font-medium text-green-600 dark:text-green-400">{stats.verified}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(stats.verified / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Pending</span>
                <span className="font-medium text-yellow-600 dark:text-yellow-400">{stats.pending}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(stats.pending / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Rejected</span>
                <span className="font-medium text-red-600 dark:text-red-400">{stats.rejected}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(stats.rejected / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add New Achievement</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <Download className="w-5 h-5" />
              <span className="font-medium">Export Achievements</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="font-medium">Share Profile</span>
            </button>
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
                placeholder="Search achievements by title, description, or tags..."
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
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
                Year
              </label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year === 'all' ? 'All Years' : year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option.key} value={option.key}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm('')} className="text-blue-600 hover:text-blue-800">
                  <XCircle className="w-3 h-3" />
                </button>
              </span>
            )}
            {categoryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm">
                Category: {categories.find(c => c.key === categoryFilter)?.label}
                <button onClick={() => setCategoryFilter('all')} className="text-green-600 hover:text-green-800">
                  <XCircle className="w-3 h-3" />
                </button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Status: {statuses.find(s => s.key === statusFilter)?.label}
                <button onClick={() => setStatusFilter('all')} className="text-yellow-600 hover:text-yellow-800">
                  <XCircle className="w-3 h-3" />
                </button>
              </span>
            )}
            {yearFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm">
                Year: {yearFilter}
                <button onClick={() => setYearFilter('all')} className="text-purple-600 hover:text-purple-800">
                  <XCircle className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Achievements Listing */}
      <section>
        {viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group">
                {/* Achievement Header */}
                <div className="relative">
                  <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-500 relative overflow-hidden">
                    {achievement.image ? (
                      <img 
                        src={achievement.image} 
                        alt={achievement.title}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Trophy className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                    {achievement.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      {getStatusConfig(achievement.status)}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      {getLevelBadge(achievement.level)}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-1">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{formatDate(achievement.date)}</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{achievement.points} pts</span>
                    </div>
                  </div>    
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {achievement.tags?.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-full text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">By {achievement.issuer}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openAchievementDetails(achievement)}
                        className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                      <button
                        onClick={() => shareAchievement(achievement)}
                        className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40"
                      >
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                      <button
                        onClick={() => downloadCertificate(achievement)}
                        className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40"
                      >
                        <Download className="w-4 h-4" /> Certificate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAchievements.map((achievement) => (
                <div key={achievement.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white">{achievement.title}</span>
                        {getLevelBadge(achievement.level)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {achievement.issuer} • {formatDate(achievement.date)} • {achievement.points} pts
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusConfig(achievement.status)}
                    <button
                      onClick={() => openAchievementDetails(achievement)}
                      className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button
                      onClick={() => shareAchievement(achievement)}
                      className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                    <button
                      onClick={() => downloadCertificate(achievement)}
                      className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40"
                    >
                      <Download className="w-4 h-4" /> Cert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedAchievement.title}</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">{selectedAchievement.issuer} • {formatDate(selectedAchievement.date)}</div>
              </div>
              <button onClick={() => setIsDetailModalOpen(false)} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200">Close</button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedAchievement.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedAchievement.skills?.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-full text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">{skill}</span>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => shareAchievement(selectedAchievement)} className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40"><Share2 className="w-4 h-4" /> Share</button>
              <button onClick={() => downloadCertificate(selectedAchievement)} className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40"><Download className="w-4 h-4" /> Download</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Achievement Modal */}
      {isAddModalOpen && (
        <AddAchievementModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddAchievement}
        />
      )}

      {/* Edit Achievement Modal */}
      {isEditModalOpen && selectedAchievement && (
        <EditAchievementModal
          achievement={selectedAchievement}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditAchievement}
        />
      )}
    </StudentLayout>
  );
};

// Simple Add Achievement Modal
const AddAchievementModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'coding',
    date: new Date().toISOString().slice(0,10),
    issuer: '',
    points: 100,
    level: 'local',
    tags: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, attachments: [], image: '', skills: [] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add Achievement</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          <div className="grid grid-cols-2 gap-3">
            <select name="category" value={form.category} onChange={handleChange} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              <option value="coding">Coding</option>
              <option value="hackathon">Hackathon</option>
              <option value="research">Research</option>
              <option value="project">Project</option>
              <option value="leadership">Leadership</option>
              <option value="volunteer">Volunteer</option>
            </select>
            <select name="level" value={form.level} onChange={handleChange} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              <option value="local">Local</option>
              <option value="college">College</option>
              <option value="national">National</option>
              <option value="international">International</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input name="date" type="date" value={form.date} onChange={handleChange} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
            <input name="issuer" value={form.issuer} onChange={handleChange} placeholder="Issuer" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          </div>
          <input name="points" type="number" value={form.points} onChange={handleChange} placeholder="Points" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Simple Edit Achievement Modal
const EditAchievementModal = ({ achievement, onClose, onSubmit }) => {
  const [form, setForm] = useState({ ...achievement });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Edit Achievement</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          <div className="grid grid-cols-2 gap-3">
            <select name="category" value={form.category} onChange={handleChange} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              <option value="coding">Coding</option>
              <option value="hackathon">Hackathon</option>
              <option value="research">Research</option>
              <option value="project">Project</option>
              <option value="leadership">Leadership</option>
              <option value="volunteer">Volunteer</option>
            </select>
            <select name="level" value={form.level} onChange={handleChange} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              <option value="local">Local</option>
              <option value="college">College</option>
              <option value="national">National</option>
              <option value="international">International</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input name="date" type="date" value={form.date} onChange={handleChange} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
            <input name="issuer" value={form.issuer} onChange={handleChange} placeholder="Issuer" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          </div>
          <input name="points" type="number" value={form.points} onChange={handleChange} placeholder="Points" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Achievements;
                  