import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/StudentLayout';
import {
  Building,
  MapPin,
  Users,
  DollarSign,
  Star,
  Search,
  Filter,
  ExternalLink,
  Briefcase,
  Calendar,
  Award,
  TrendingUp,
  Globe,
  Linkedin,
  Eye,
  Bookmark,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Download,
  Share2,
  Heart,
  BarChart3
} from 'lucide-react';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ctcFilter, setCtcFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [savedCompanies, setSavedCompanies] = useState([1, 3, 5]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Sample companies data
  const companiesData = [
    {
      id: 1,
      name: 'Google',
      logoColor: 'bg-gradient-to-br from-red-500 to-yellow-500',
      logoText: 'G',
      description: 'Multinational technology company focusing on search engine technology, online advertising, cloud computing, and AI.',
      location: 'Bangalore, Hyderabad, Gurgaon',
      avgPackage: '₹22 - 28 LPA',
      minPackage: '₹18 LPA',
      maxPackage: '₹35 LPA',
      industry: 'Technology',
      founded: 1998,
      employees: '150,000+',
      hiringStatus: 'active',
      openings: 25,
      applied: 285,
      rating: 4.8,
      website: 'https://google.com',
      linkedin: 'https://linkedin.com/company/google',
      skills: ['Algorithms', 'Data Structures', 'System Design', 'Python', 'Java', 'Go', 'Cloud'],
      roles: ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer'],
      hiringProcess: ['Online Assessment', 'Technical Interviews', 'Googleyness', 'Team Matching'],
      perks: ['Free meals', 'Gym', 'Health insurance', 'Stock options', 'Learning budget'],
      upcomingDrives: 2,
      pastDrives: 12,
      successRate: '85%'
    },
    {
      id: 2,
      name: 'Microsoft',
      logoColor: 'bg-gradient-to-br from-blue-500 to-green-500',
      logoText: 'M',
      description: 'Develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers.',
      location: 'Hyderabad, Bangalore, Noida',
      avgPackage: '₹20 - 25 LPA',
      minPackage: '₹16 LPA',
      maxPackage: '₹32 LPA',
      industry: 'Technology',
      founded: 1975,
      employees: '220,000+',
      hiringStatus: 'active',
      openings: 18,
      applied: 192,
      rating: 4.7,
      website: 'https://microsoft.com',
      linkedin: 'https://linkedin.com/company/microsoft',
      skills: ['C#', '.NET', 'Azure', 'React', 'TypeScript', 'Cloud'],
      roles: ['Software Engineer', 'Product Manager', 'Cloud Consultant', 'Data Analyst'],
      hiringProcess: ['Online Test', 'Technical Rounds', 'Manager Round', 'HR'],
      perks: ['Stock awards', 'Health benefits', 'Flexible work', 'Learning opportunities'],
      upcomingDrives: 1,
      pastDrives: 10,
      successRate: '82%'
    },
    {
      id: 3,
      name: 'Amazon',
      logoColor: 'bg-gradient-to-br from-orange-500 to-yellow-500',
      logoText: 'A',
      description: 'American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and AI.',
      location: 'Chennai, Bangalore, Hyderabad',
      avgPackage: '₹19 - 24 LPA',
      minPackage: '₹15 LPA',
      maxPackage: '₹30 LPA',
      industry: 'E-commerce & Cloud',
      founded: 1994,
      employees: '1,500,000+',
      hiringStatus: 'active',
      openings: 35,
      applied: 420,
      rating: 4.6,
      website: 'https://amazon.com',
      linkedin: 'https://linkedin.com/company/amazon',
      skills: ['AWS', 'Java', 'Spring Boot', 'Microservices', 'DynamoDB'],
      roles: ['SDE', 'Business Analyst', 'Operations Manager', 'Data Engineer'],
      hiringProcess: ['Online Assessment', 'Technical Rounds', 'Leadership Principles', 'Bar Raiser'],
      perks: ['Stock options', 'Health insurance', 'Career choice', 'Parental leave'],
      upcomingDrives: 3,
      pastDrives: 15,
      successRate: '78%'
    },
    {
      id: 4,
      name: 'TCS',
      logoColor: 'bg-gradient-to-br from-blue-500 to-blue-700',
      logoText: 'T',
      description: 'Indian multinational information technology services and consulting company headquartered in Mumbai.',
      location: 'Mumbai, Chennai, Delhi, Pune',
      avgPackage: '₹7 - 9 LPA',
      minPackage: '₹3.5 LPA',
      maxPackage: '₹12 LPA',
      industry: 'IT Services',
      founded: 1968,
      employees: '600,000+',
      hiringStatus: 'active',
      openings: 500,
      applied: 5000,
      rating: 4.2,
      website: 'https://tcs.com',
      linkedin: 'https://linkedin.com/company/tata-consultancy-services',
      skills: ['Java', '.NET', 'SQL', 'Banking Domain', 'Testing'],
      roles: ['System Analyst', 'Developer', 'Tester', 'Consultant'],
      hiringProcess: ['Aptitude', 'Technical Interview', 'HR Interview'],
      perks: ['Job security', 'Training programs', 'Global opportunities', 'Work-life balance'],
      upcomingDrives: 5,
      pastDrives: 25,
      successRate: '90%'
    },
    {
      id: 5,
      name: 'Infosys',
      logoColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
      logoText: 'I',
      description: 'Indian multinational corporation that provides business consulting, information technology, and outsourcing services.',
      location: 'Bangalore, Pune, Chennai, Mysore',
      avgPackage: '₹7.5 - 9.5 LPA',
      minPackage: '₹3.6 LPA',
      maxPackage: '₹15 LPA',
      industry: 'IT Services',
      founded: 1981,
      employees: '340,000+',
      hiringStatus: 'active',
      openings: 300,
      applied: 3200,
      rating: 4.1,
      website: 'https://infosys.com',
      linkedin: 'https://linkedin.com/company/infosys',
      skills: ['Java', 'Python', 'SQL', 'Testing', 'Agile'],
      roles: ['Business Analyst', 'Developer', 'Test Engineer', 'Consultant'],
      hiringProcess: ['Aptitude', 'Group Discussion', 'Technical Interview', 'HR'],
      perks: ['Global exposure', 'Learning programs', 'Health benefits', 'Transportation'],
      upcomingDrives: 4,
      pastDrives: 20,
      successRate: '88%'
    },
    {
      id: 6,
      name: 'Goldman Sachs',
      logoColor: 'bg-gradient-to-br from-blue-600 to-black',
      logoText: 'GS',
      description: 'Leading global investment banking, securities and investment management firm.',
      location: 'Bangalore, Mumbai, Hyderabad',
      avgPackage: '₹25 - 30 LPA',
      minPackage: '₹20 LPA',
      maxPackage: '₹40 LPA',
      industry: 'Finance',
      founded: 1869,
      employees: '40,000+',
      hiringStatus: 'upcoming',
      openings: 12,
      applied: 0,
      rating: 4.9,
      website: 'https://goldmansachs.com',
      linkedin: 'https://linkedin.com/company/goldman-sachs',
      skills: ['Financial Modeling', 'Excel', 'Analytical Skills', 'Finance', 'Python'],
      roles: ['Analyst', 'Developer', 'Quantitative Analyst', 'Risk Analyst'],
      hiringProcess: ['Aptitude', 'Technical Rounds', 'Super Day', 'HR'],
      perks: ['High compensation', 'Global opportunities', 'Learning culture', 'Networking'],
      upcomingDrives: 1,
      pastDrives: 8,
      successRate: '75%'
    },
    {
      id: 7,
      name: 'Adobe',
      logoColor: 'bg-gradient-to-br from-red-600 to-orange-500',
      logoText: 'A',
      description: 'American multinational computer software company known for its creative and multimedia software products.',
      location: 'Noida, Bangalore',
      avgPackage: '₹17 - 22 LPA',
      minPackage: '₹14 LPA',
      maxPackage: '₹28 LPA',
      industry: 'Software',
      founded: 1982,
      employees: '26,000+',
      hiringStatus: 'active',
      openings: 8,
      applied: 150,
      rating: 4.7,
      website: 'https://adobe.com',
      linkedin: 'https://linkedin.com/company/adobe',
      skills: ['JavaScript', 'React', 'Node.js', 'UI/UX', 'Creative Cloud'],
      roles: ['Software Engineer', 'UX Designer', 'Product Manager', 'Data Scientist'],
      hiringProcess: ['Online Test', 'Technical Rounds', 'Design Review', 'Culture Fit'],
      perks: ['Creative culture', 'Health benefits', 'Stock options', 'Learning resources'],
      upcomingDrives: 1,
      pastDrives: 6,
      successRate: '80%'
    },
    {
      id: 8,
      name: 'Intel',
      logoColor: 'bg-gradient-to-br from-blue-400 to-blue-800',
      logoText: 'I',
      description: 'American multinational corporation and technology company specializing in semiconductor chips.',
      location: 'Bangalore, Hyderabad',
      avgPackage: '₹15 - 20 LPA',
      minPackage: '₹12 LPA',
      maxPackage: '₹25 LPA',
      industry: 'Semiconductor',
      founded: 1968,
      employees: '121,000+',
      hiringStatus: 'active',
      openings: 15,
      applied: 120,
      rating: 4.5,
      website: 'https://intel.com',
      linkedin: 'https://linkedin.com/company/intel-corporation',
      skills: ['VLSI', 'Digital Design', 'Verilog', 'Semiconductors', 'C++'],
      roles: ['Hardware Engineer', 'Software Engineer', 'Validation Engineer', 'Architect'],
      hiringProcess: ['Technical Test', 'Technical Interviews', 'Manager Round', 'HR'],
      perks: ['Innovation culture', 'Health benefits', 'Stock options', 'Technical growth'],
      upcomingDrives: 2,
      pastDrives: 9,
      successRate: '82%'
    },
    {
      id: 9,
      name: 'Apple',
      logoColor: 'bg-gradient-to-br from-gray-700 to-gray-900',
      logoText: 'A',
      description: 'American multinational technology company specializing in consumer electronics, software, and online services.',
      location: 'Hyderabad, Bangalore',
      avgPackage: '₹24 - 28 LPA',
      minPackage: '₹20 LPA',
      maxPackage: '₹35 LPA',
      industry: 'Technology',
      founded: 1976,
      employees: '164,000+',
      hiringStatus: 'upcoming',
      openings: 10,
      applied: 0,
      rating: 4.8,
      website: 'https://apple.com',
      linkedin: 'https://linkedin.com/company/apple',
      skills: ['Swift', 'iOS SDK', 'Objective-C', 'UI/UX', 'Security'],
      roles: ['iOS Developer', 'Software Engineer', 'Product Designer', 'ML Engineer'],
      hiringProcess: ['Coding Test', 'Technical Rounds', 'System Design', 'Leadership'],
      perks: ['Product discounts', 'Health benefits', 'Stock options', 'Innovative projects'],
      upcomingDrives: 1,
      pastDrives: 5,
      successRate: '78%'
    },
    {
      id: 10,
      name: 'Meta',
      logoColor: 'bg-gradient-to-br from-blue-600 to-purple-600',
      logoText: 'M',
      description: 'Technology company that focuses on social media, virtual reality, and artificial intelligence.',
      location: 'Bangalore, Hyderabad',
      avgPackage: '₹26 - 32 LPA',
      minPackage: '₹22 LPA',
      maxPackage: '₹40 LPA',
      industry: 'Social Media',
      founded: 2004,
      employees: '86,000+',
      hiringStatus: 'upcoming',
      openings: 8,
      applied: 0,
      rating: 4.7,
      website: 'https://meta.com',
      linkedin: 'https://linkedin.com/company/meta',
      skills: ['React', 'Python', 'Machine Learning', 'GraphQL', 'Data Engineering'],
      roles: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Research Scientist'],
      hiringProcess: ['Data Science Test', 'Coding Rounds', 'System Design', 'Behavioral'],
      perks: ['Remote work', 'Health benefits', 'Stock options', 'Learning culture'],
      upcomingDrives: 1,
      pastDrives: 4,
      successRate: '76%'
    }
  ];

  const locations = [...new Set(companiesData.flatMap(c => c.location.split(', ')))];
  const industries = [...new Set(companiesData.map(c => c.industry))];
  const ctcOptions = [
    { value: '', label: 'All CTC' },
    { value: '5', label: '5+ LPA' },
    { value: '10', label: '10+ LPA' },
    { value: '20', label: '20+ LPA' },
    { value: '30', label: '30+ LPA' }
  ];

  useEffect(() => {
    setCompanies(companiesData);
    filterCompanies();
  }, []);

  useEffect(() => {
    filterCompanies();
  }, [searchTerm, ctcFilter, locationFilter, industryFilter, sortBy, companies]);

  const filterCompanies = () => {
    let filtered = [...companies];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply CTC filter
    if (ctcFilter) {
      const minCtc = parseInt(ctcFilter);
      filtered = filtered.filter(company => {
        const avgPackage = parseInt(company.avgPackage.split('₹')[1].split(' ')[0]);
        return avgPackage >= minCtc;
      });
    }

    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter(company => 
        company.location.includes(locationFilter)
      );
    }

    // Apply industry filter
    if (industryFilter) {
      filtered = filtered.filter(company => 
        company.industry === industryFilter
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'ctc':
          return parseInt(b.avgPackage.split('₹')[1].split(' ')[0]) - parseInt(a.avgPackage.split('₹')[1].split(' ')[0]);
        case 'rating':
          return b.rating - a.rating;
        case 'openings':
          return b.openings - a.openings;
        case 'successRate':
          return parseFloat(b.successRate) - parseFloat(a.successRate);
        default:
          return 0;
      }
    });

    setFilteredCompanies(filtered);
  };

  const toggleSaveCompany = (companyId) => {
    if (savedCompanies.includes(companyId)) {
      setSavedCompanies(savedCompanies.filter(id => id !== companyId));
    } else {
      setSavedCompanies([...savedCompanies, companyId]);
    }
  };

  const openCompanyDetails = (company) => {
    setSelectedCompany(company);
    setIsDetailModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { text: 'Hiring Now', icon: <CheckCircle className="w-3 h-3" />, className: 'bg-green-100 text-green-800 border-green-200' },
      'upcoming': { text: 'Upcoming', icon: <Clock className="w-3 h-3" />, className: 'bg-blue-100 text-blue-800 border-blue-200' },
      'closed': { text: 'Closed', icon: <XCircle className="w-3 h-3" />, className: 'bg-gray-100 text-gray-800 border-gray-200' }
    };
    
    const config = statusConfig[status] || statusConfig['closed'];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 text-yellow-500 fill-current" />);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }
    
    return stars;
  };

  const stats = {
    total: companies.length,
    active: companies.filter(c => c.hiringStatus === 'active').length,
    upcoming: companies.filter(c => c.hiringStatus === 'upcoming').length,
    saved: savedCompanies.length,
    avgRating: (companies.reduce((acc, c) => acc + c.rating, 0) / companies.length).toFixed(1),
    totalOpenings: companies.reduce((acc, c) => acc + c.openings, 0)
  };

  return (
    <StudentLayout activePage="companies" pageTitle="Recruiting Companies">
      {/* Page Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Recruiting Companies</h1>
              <p className="text-lg text-gray-600 mb-4">
                Explore top companies hiring from our campus. Filter by location, CTC, industry, and more.
                Save companies to track upcoming drives and opportunities.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Currently hiring</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Upcoming drives</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>High CTC packages</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm min-w-[300px]">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{stats.active}</div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stats.upcoming}</div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{stats.saved}</div>
                  <div className="text-sm text-gray-600">Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Companies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.active}</div>
            <div className="text-sm text-gray-600">Active Hiring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.upcoming}</div>
            <div className="text-sm text-gray-600">Upcoming Drives</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.saved}</div>
            <div className="text-sm text-gray-600">Saved Companies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.avgRating}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-1">{stats.totalOpenings}</div>
            <div className="text-sm text-gray-600">Total Openings</div>
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
                placeholder="Search companies by name, skills, or description..."
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">View:</span>
              </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTC Package
              </label>
              <select
                value={ctcFilter}
                onChange={(e) => setCtcFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {ctcOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="name">Name (A-Z)</option>
                <option value="ctc">CTC (High to Low)</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="openings">Openings (High to Low)</option>
                <option value="successRate">Success Rate</option>
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
            {ctcFilter && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm">
                CTC: {ctcOptions.find(o => o.value === ctcFilter)?.label}
                <button onClick={() => setCtcFilter('')} className="text-green-600 hover:text-green-800">
                  <XCircle className="w-3 h-3" />
                </button>
              </span>
            )}
            {locationFilter && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm">
                Location: {locationFilter}
                <button onClick={() => setLocationFilter('')} className="text-purple-600 hover:text-purple-800">
                  <XCircle className="w-3 h-3" />
                </button>
              </span>
            )}
            {industryFilter && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Industry: {industryFilter}
                <button onClick={() => setIndustryFilter('')} className="text-yellow-600 hover:text-yellow-800">
                  <XCircle className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Companies Listing */}
      <section>
        {filteredCompanies.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Building className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCtcFilter('');
                setLocationFilter('');
                setIndustryFilter('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <div key={company.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group">
                {/* Company Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg ${company.logoColor} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <span className="text-white font-bold text-lg">
                          {company.logoText}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{company.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">{company.industry}</span>
                          <div className="flex items-center gap-1">
                            {getRatingStars(company.rating)}
                            <span className="text-xs text-gray-500">{company.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSaveCompany(company.id)}
                        className={`p-1.5 rounded-lg ${savedCompanies.includes(company.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                      >
                        {savedCompanies.includes(company.id) ? (
                          <Heart className="w-4 h-4 fill-current" />
                        ) : (
                          <Heart className="w-4 h-4" />
                        )}
                      </button>
                      {getStatusBadge(company.hiringStatus)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{company.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {company.location.split(', ')[0]}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        {company.openings} openings
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 font-medium text-gray-900">
                      <DollarSign className="w-4 h-4" />
                      {company.avgPackage}
                    </span>
                  </div>
                </div>

                {/* Company Details */}
                <div className="p-6 bg-gray-50">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Founded:</span>
                      <span className="font-medium text-gray-900">{company.founded}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Employees:</span>
                      <span className="font-medium text-gray-900">{company.employees}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Success Rate:</span>
                      <span className="font-medium text-green-600">{company.successRate}</span>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {company.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                    {company.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{company.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => openCompanyDetails(company)}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group/view"
                    >
                      <Eye className="w-5 h-5 group-hover/view:scale-110 transition-transform" />
                      View Details
                    </button>
                    
                    <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group/link">
                      <ExternalLink className="w-5 h-5 text-gray-600 group-hover/link:text-blue-600" />
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
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Industry</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Location</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Avg CTC</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Openings</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Rating</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${company.logoColor}`}></div>
                          <div>
                            <div className="font-medium text-gray-900">{company.name}</div>
                            <div className="text-sm text-gray-500">{company.founded}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{company.industry}</td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900">{company.location.split(', ')[0]}</div>
                        <div className="text-xs text-gray-500">+{company.location.split(', ').length - 1} more</div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-900">{company.avgPackage}</td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900">{company.openings}</div>
                        <div className="text-xs text-gray-500">{company.applied} applied</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          {getRatingStars(company.rating)}
                          <span className="text-sm text-gray-600 ml-1">{company.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">{getStatusBadge(company.hiringStatus)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openCompanyDetails(company)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleSaveCompany(company.id)}
                            className={`p-2 rounded-lg ${savedCompanies.includes(company.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                            title="Save Company"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Visit Website"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Company Details Modal */}
      {isDetailModalOpen && selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Company Details</h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Company Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-xl ${selectedCompany.logoColor} flex items-center justify-center`}>
                  <span className="text-white font-bold text-2xl">
                    {selectedCompany.logoText}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedCompany.name}</h3>
                      <p className="text-gray-600">{selectedCompany.industry} • Founded {selectedCompany.founded}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(selectedCompany.hiringStatus)}
                      <button
                        onClick={() => toggleSaveCompany(selectedCompany.id)}
                        className={`p-2 rounded-lg ${savedCompanies.includes(selectedCompany.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                      >
                        {savedCompanies.includes(selectedCompany.id) ? (
                          <Heart className="w-5 h-5 fill-current" />
                        ) : (
                          <Heart className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      {getRatingStars(selectedCompany.rating)}
                      <span className="text-sm text-gray-600 ml-1">{selectedCompany.rating}/5</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{selectedCompany.employees} employees</span>
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">About</h4>
                    <p className="text-gray-600">{selectedCompany.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Location</h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      {selectedCompany.location}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Roles Hiring</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.roles.map((role, index) => (
                        <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Company Perks</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.perks.map((perk, index) => (
                        <span key={index} className="px-3 py-1.5 bg-green-50 text-green-700 text-sm rounded-lg">
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Hiring Details</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Package</span>
                        <span className="font-bold text-gray-900">{selectedCompany.avgPackage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package Range</span>
                        <span className="font-medium text-gray-900">{selectedCompany.minPackage} - {selectedCompany.maxPackage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Openings</span>
                        <span className="font-medium text-gray-900">{selectedCompany.openings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Applications Received</span>
                        <span className="font-medium text-gray-900">{selectedCompany.applied}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate</span>
                        <span className="font-medium text-green-600">{selectedCompany.successRate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1.5 bg-purple-50 text-purple-700 text-sm font-medium rounded-lg">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Hiring Process</h4>
                    <ul className="space-y-2">
                      {selectedCompany.hiringProcess.map((step, index) => (
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
              </div>

              {/* Stats & Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{selectedCompany.upcomingDrives}</div>
                  <div className="text-blue-700 font-medium">Upcoming Drives</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{selectedCompany.pastDrives}</div>
                  <div className="text-green-700 font-medium">Past Drives</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{selectedCompany.successRate}</div>
                  <div className="text-purple-700 font-medium">Placement Success Rate</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                <a
                  href={`/drives?company=${selectedCompany.name}`}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Briefcase className="w-5 h-5" />
                  View Drives
                </a>
                
                <a
                  href={selectedCompany.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Globe className="w-5 h-5" />
                  Visit Website
                </a>
                
                <a
                  href={selectedCompany.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                
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

export default Companies;