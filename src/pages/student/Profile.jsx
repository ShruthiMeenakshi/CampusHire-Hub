import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/StudentLayout';
import {
  Save,
  RefreshCw,
  Eye,
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  Briefcase,
  Globe,
  Github,
  Linkedin,
  FileText,
  Code,
  Star,
  Upload,
  Download,
  CheckCircle,
  Edit,
  Trash2,
  Plus,
  X
} from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    department: '',
    program: '',
    year: '',
    cgpa: '',
    skills: [],
    resumeUrl: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    leetcodeUrl: '',
    about: '',
    dob: '',
    gender: '',
    address: ''
  });

  const [education, setEducation] = useState([]);

  const [projects, setProjects] = useState([]);

  const [certifications, setCertifications] = useState([]);

  const [achievements, setAchievements] = useState([]);

  const [skillsInput, setSkillsInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [resumeFile, setResumeFile] = useState(null);

  const departments = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE'];
  const programs = ['B.Tech', 'M.Tech', 'MCA', 'MBA'];
  const years = ['1', '2', '3', '4'];

  useEffect(() => {
    // Load profile data from localStorage or API
    const savedProfile = localStorage.getItem('studentProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    // Pull email captured during login and apply to profile
    const authEmail = localStorage.getItem('ch_email');
    if (authEmail) {
      setProfile(prev => ({
        ...prev,
        email: authEmail
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkillsInput(value);
    if (value.includes(',')) {
      const newSkills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
      setProfile(prev => ({
        ...prev,
        skills: [...new Set([...prev.skills, ...newSkills])]
      }));
      setSkillsInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      // In real app, upload to server and get URL
      alert(`Resume "${file.name}" uploaded successfully!`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('studentProfile', JSON.stringify(profile));
    // Show success message
    alert('Profile saved successfully!');
    setIsEditing(false);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      const savedProfile = localStorage.getItem('studentProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    }
  };

  const addEducation = () => {
    const newEducation = {
      id: education.length + 1,
      degree: '',
      institution: '',
      year: '',
      cgpa: ''
    };
    setEducation([...education, newEducation]);
  };

  const addProject = () => {
    const newProject = {
      id: projects.length + 1,
      title: '',
      description: '',
      tech: [],
      link: ''
    };
    setProjects([...projects, newProject]);
  };

  const addCertification = () => {
    const newCert = {
      id: certifications.length + 1,
      name: '',
      issuer: '',
      date: ''
    };
    setCertifications([...certifications, newCert]);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { id: 'academic', label: 'Academic Info', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills & Projects', icon: <Code className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> }
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="e.g., Priya Sharma"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student ID *
          </label>
          <input
            type="text"
            name="studentId"
            value={profile.studentId}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="e.g., VCET2023CSE123"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="e.g., priya@vcet.edu"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="e.g., 9876543210"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter your complete address"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          About Yourself
        </label>
        <textarea
          name="about"
          value={profile.about}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Tell us about your interests, career goals, etc."
        />
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department *
          </label>
          <select
            name="department"
            value={profile.department}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          >
            <option value="">Select department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program *
          </label>
          <select
            name="program"
            value={profile.program}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          >
            <option value="">Select program</option>
            {programs.map(prog => (
              <option key={prog} value={prog}>{prog}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year *
          </label>
          <select
            name="year"
            value={profile.year}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          >
            <option value="">Select year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CGPA *
          </label>
          <div className="relative">
            <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              name="cgpa"
              value={profile.cgpa}
              onChange={handleInputChange}
              min="0"
              max="10"
              step="0.01"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="e.g., 8.45"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Education History</h4>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        </div>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = education.map(item => 
                      item.id === edu.id ? { ...item, degree: e.target.value } : item
                    );
                    setEducation(updated);
                  }}
                  className="px-3 py-2 border border-gray-300 text-black rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Degree"
                />
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => {
                    const updated = education.map(item => 
                      item.id === edu.id ? { ...item, institution: e.target.value } : item
                    );
                    setEducation(updated);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Institution"
                />
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => {
                    const updated = education.map(item => 
                      item.id === edu.id ? { ...item, year: e.target.value } : item
                    );
                    setEducation(updated);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Year"
                />
                <input
                  type="text"
                  value={edu.cgpa || edu.percentage}
                  onChange={(e) => {
                    const updated = education.map(item => 
                      item.id === edu.id ? { ...item, cgpa: e.target.value } : item
                    );
                    setEducation(updated);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="CGPA/Percentage"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Certifications</h4>
          <button
            onClick={addCertification}
            className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        </div>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{cert.name}</div>
                <div className="text-sm text-gray-600">{cert.issuer} • {cert.date}</div>
              </div>
              <button
                onClick={() => setCertifications(certifications.filter(c => c.id !== cert.id))}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Achievements</h4>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center gap-3 bg-yellow-50 rounded-lg p-4">
              <Award className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{achievement.title}</div>
                <div className="text-sm text-gray-600">{achievement.description} • {achievement.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSkillsProjects = () => (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skills *
        </label>
        <div className="mb-3">
          <input
            type="text"
            value={skillsInput}
            onChange={handleSkillsChange}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Add skills separated by commas (e.g., Java, Python, React)"
          />
          <p className="text-sm text-gray-500 mt-1">Press comma or enter to add multiple skills</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Projects</h4>
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => {
                    const updated = projects.map(p => 
                      p.id === project.id ? { ...p, title: e.target.value } : p
                    );
                    setProjects(updated);
                  }}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Project Title"
                />
                <textarea
                  value={project.description}
                  onChange={(e) => {
                    const updated = projects.map(p => 
                      p.id === project.id ? { ...p, description: e.target.value } : p
                    );
                    setProjects(updated);
                  }}
                  rows="2"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Project Description"
                />
                <input
                  type="text"
                  value={project.link}
                  onChange={(e) => {
                    const updated = projects.map(p => 
                      p.id === project.id ? { ...p, link: e.target.value } : p
                    );
                    setProjects(updated);
                  }}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Project URL"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-8">
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Upload Resume</h4>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag & drop your resume here, or</p>
          <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
            Browse Files
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-500 mt-4">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
          {resumeFile && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="font-medium">{resumeFile.name}</span>
                </div>
                <span className="text-sm text-green-600">Uploaded</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume URL
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              name="resumeUrl"
              value={profile.resumeUrl}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="e.g., https://drive.google.com/..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Portfolio URL
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              name="portfolioUrl"
              value={profile.portfolioUrl}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="e.g., https://priya.dev"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn URL
          </label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              name="linkedinUrl"
              value={profile.linkedinUrl}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="e.g., https://linkedin.com/in/yourhandle"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub URL
          </label>
          <div className="relative">
            <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              name="githubUrl"
              value={profile.githubUrl}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="e.g., https://github.com/yourhandle"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LeetCode URL
          </label>
          <div className="relative">
            <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              name="leetcodeUrl"
              value={profile.leetcodeUrl}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="e.g., https://leetcode.com/yourhandle"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <StudentLayout activePage="profile" pageTitle="Student Profile">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {profile.fullName.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.fullName}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {profile.department} • {profile.program} • Year {profile.year}
                  </span>
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    CGPA: {profile.cgpa}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                  isEditing 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isEditing ? (
                  <>
                    <Eye className="w-5 h-5" />
                    View Mode
                  </>
                ) : (
                  <>
                    <Edit className="w-5 h-5" />
                    Edit Profile
                  </>
                )}
              </button>
              {isEditing && (
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8">
          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'academic' && renderAcademicInfo()}
          {activeTab === 'skills' && renderSkillsProjects()}
          {activeTab === 'documents' && renderDocuments()}

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex items-center gap-4 pt-8 mt-8 border-t border-gray-200">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Profile
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Profile Summary */}
      {!isEditing && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Quick Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Profile Completion</span>
                <span className="font-medium text-green-600">85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Skills Listed</span>
                <span className="font-medium text-blue-600">{profile.skills.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Projects</span>
                <span className="font-medium text-purple-600">{projects.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Certifications</span>
                <span className="font-medium text-yellow-600">{certifications.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Social Links</h4>
            <div className="space-y-3">
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-700 hover:text-blue-800">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn Profile
                </a>
              )}
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
                  <Github className="w-5 h-5" />
                  GitHub Profile
                </a>
              )}
              {profile.portfolioUrl && (
                <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-700 hover:text-green-800">
                  <Globe className="w-5 h-5" />
                  Portfolio Website
                </a>
              )}
              {profile.leetcodeUrl && (
                <a href={profile.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-orange-700 hover:text-orange-800">
                  <Code className="w-5 h-5" />
                  LeetCode Profile
                </a>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Profile Tips</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Keep your skills updated regularly
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Add recent projects with proper descriptions
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Upload your latest resume in PDF format
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Complete all profile sections for better visibility
              </li>
            </ul>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default Profile;