import React, { useEffect } from 'react';
import * as Icons from 'lucide-react';

const Home = () => {
  useEffect(() => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close mobile menu if open
          const mobileNav = document.getElementById('mobileNav');
          if (mobileNav) {
            mobileNav.classList.add('hidden');
          }
        }
      });
    });

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a, #mobileNav a');

    const handleScroll = () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('text-white', 'bg-gray-800');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('text-white', 'bg-gray-800');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
      mobileNav.classList.toggle('hidden');
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 font-inter">
      {/* Header */}
      <header className="fixed w-full z-50 glass border-b border-gray-800" style={{ height: '80px' }}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 blur opacity-70 rounded-lg"></div>
                <img 
                  src="/media/vcetLogo.jpg" 
                  alt="VCET Logo"
                  className="w-12 h-12 rounded-lg object-cover relative z-10 border border-gray-700" 
                />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-tight">Velammal College of Engineering and Technology</h1>
                <p className="text-xs text-gray-400">Madurai, Tamil Nadu</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <a href="#home" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                Home
              </a>
              <a href="#academics" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                Academics
              </a>
              <a href="#departments" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                Departments
              </a>
              <a href="#admissions" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                Admissions
              </a>
              <a href="#placements" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                Placements
              </a>
              <a href="#campus" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                Campus
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <a href="#admissions" className="hidden md:inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:shadow-lg transition-shadow">
                Apply Now
              </a>
              <a href="/login" className="px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                Login
              </a>
              <button 
                id="menuBtn" 
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg border border-gray-700 hover:border-gray-600"
              >
                <Icons.Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div id="mobileNav" className="lg:hidden absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 hidden animate-slide-up">
          <div className="container mx-auto px-4 py-4">
            <div className="grid gap-2">
              <a href="#home" className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">Home</a>
              <a href="#academics" className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">Academics</a>
              <a href="#departments" className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">Departments</a>
              <a href="#admissions" className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">Admissions</a>
              <a href="#placements" className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">Placements</a>
              <a href="#campus" className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">Campus Life</a>
              <a href="#contact" className="px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main id="home" className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/30 via-transparent to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-emerald-500/30 via-purple-500/20 to-transparent rounded-full translate-x-1/3 translate-y-1/3 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHJlY3Qgd2lkdGg9IjMiIGhlaWdodD0iMyIgeD0iMCIgeT0iMCIgcng9IjEiLz48cmVjdCB3aWR0aD0iMyIgaGVpZ2h0PSIzIiB4PSIyMCIgeT0iMCIgcng9IjEiLz48cmVjdCB3aWR0aD0iMyIgaGVpZ2h0PSIzIiB4PSI0MCIgeT0iMCIgcng9IjEiLz48cmVjdCB3aWR0aD0iMyIgaGVpZ2h0PSIzIiB4PSIwIiB5PSIyMCIgcng9IjEiLz48cmVjdCB3aWR0aD0iMyIgaGVpZ2h0PSIzIiB4PSIyMCIgeT0iMjAiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjMiIGhlaWdodD0iMyIgeD0iNDAiIHk9IjIwIiByeD0iMSIvPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjMiIHg9IjAiIHk9IjQwIiByeD0iMSIvPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjMiIHg9IjIwIiB5PSI0MCIgcng9IjEiLz48cmVjdCB3aWR0aD0iMyIgaGVpZ2h0PSIzIiB4PSI0MCIgeT0iNDAiIHJ4PSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Welcome Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-gray-700/50 mb-6 animate-slide-up">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-300">Welcome to VCET</span>
              </div>

              {/* Main Heading */}
              <div className="relative mb-8">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 via-transparent to-emerald-500/5 blur-xl rounded-3xl -z-10"></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
                  <span className="block text-white">
                    Empowering
                    <span className="gradient-text bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 bg-clip-text text-transparent bg-300% animate-gradient ml-2">
                      Engineers
                    </span>
                  </span>
                  <span className="block text-white mt-2">
                    and
                    <span className="gradient-text bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent bg-300% animate-gradient delay-1000 ml-2">
                      Innovators
                    </span>
                  </span>
                </h1>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full opacity-30 mt-2 max-w-xl"></div>
              </div>

              {/* Tagline */}
              <h2 className="block text-white text-2xl md:text-3xl lg:text-4xl font-normal mt-2 opacity-90 mb-10">
                Shaping the Future of Technology
              </h2>

              {/* Description */}
              <div className="max-w-3xl mb-10">
                <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  VCET fosters a culture of learning, research, and industry collaboration—
                  preparing students to build solutions that matter in today's dynamic world.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-16 animate-slide-up">
                <a href="#admissions" className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-2xl shadow-blue-500/30 hover:shadow-3xl hover:shadow-blue-500/40 transition-all duration-300 hover-lift">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center gap-2">
                    Explore Admissions
                    <Icons.ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>

                <a href="#departments" className="group px-8 py-4 rounded-xl border-2 border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white transition-all duration-300 hover-lift backdrop-blur-sm">
                  <span className="relative flex items-center gap-2">
                    View Departments
                    <Icons.ChevronDown className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  </span>
                </a>

                <a href="#campus" className="group px-8 py-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-300 hover-lift border border-gray-700/50">
                  <span className="relative flex items-center gap-2">
                    Virtual Tour
                    <Icons.Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </span>
                </a>
              </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: <Icons.BookOpen className="w-6 h-6 text-blue-500" />,
                  title: "Academic Excellence",
                  description: "Outcome-based curriculum with modern labs and mentor-led learning.",
                  color: "from-blue-500/20 to-blue-500/20"
                },
                {
                  icon: <Icons.Briefcase className="w-6 h-6 text-emerald-500" />,
                  title: "Industry Careers",
                  description: "Strong placement support with internships and industry partnerships.",
                  color: "from-emerald-500/20 to-emerald-500/20"
                },
                {
                  icon: <Icons.FlaskConical className="w-6 h-6 text-purple-500" />,
                  title: "Research Innovation",
                  description: "Innovation-focused research centers with industry collaborations.",
                  color: "from-purple-500/20 to-purple-500/20"
                }
              ].map((card, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative glass p-6 rounded-2xl backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover-lift">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-white">{card.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-12 pt-8 border-t border-gray-700/30">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: "100+", label: "Expert Faculty" },
                  { number: "2000+", label: "Students" },
                  { number: "50+", label: "Industry Partners" },
                  { number: "95%", label: "Placement Rate" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Academics Section */}
      <section id="academics" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mb-4"></span>
            <h2 className="text-4xl font-bold mb-4">Academics</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive engineering education designed for tomorrow's challenges</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Icons.BookOpen className="w-8 h-8 text-blue-500" />,
                title: "Undergraduate Programs",
                description: "Core engineering disciplines with hands-on projects, modern labs, and industry-relevant curriculum.",
                color: "text-blue-500"
              },
              {
                icon: <Icons.GraduationCap className="w-8 h-8 text-emerald-500" />,
                title: "Postgraduate Programs",
                description: "Advanced coursework and research opportunities with dedicated faculty mentorship and guidance.",
                color: "text-emerald-500"
              },
              {
                icon: <Icons.FlaskConical className="w-8 h-8 text-purple-500" />,
                title: "Research & Innovation",
                description: "Centers of excellence, high-impact publications, and industry-focused innovation initiatives.",
                color: "text-purple-500"
              }
            ].map((item, index) => (
              <div key={index} className="glass p-8 rounded-2xl hover-lift">
                <div className={item.color + " mb-4"}>{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mb-4"></span>
            <h2 className="text-4xl font-bold mb-4">Departments</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Specialized engineering departments with state-of-the-art facilities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: "CSE", name: "Computer Science & Engineering", desc: "AI, Machine Learning, Software Systems, Data Science", color: "blue" },
              { code: "ECE", name: "Electronics & Communication", desc: "VLSI Design, Embedded Systems, Communication Networks", color: "green" },
              { code: "EEE", name: "Electrical & Electronics", desc: "Power Systems, Automation, Renewable Energy", color: "yellow" },
              { code: "ME", name: "Mechanical Engineering", desc: "Design, Manufacturing, Thermal Engineering", color: "red" },
              { code: "CE", name: "Civil Engineering", desc: "Structures, Environmental Engineering, Urban Planning", color: "indigo" },
              { code: "IT", name: "Information Technology", desc: "Cybersecurity, Web Technologies, Cloud Computing", color: "pink" },
              { code: "S&H", name: "Science & Humanities", desc: "Mathematics, Physics, Chemistry, Communication Skills", color: "teal" },
              { code: "MBA", name: "Management Studies", desc: "Business Administration, Leadership, Entrepreneurship", color: "orange" }
            ].map((dept, index) => (
              <div key={index} className="glass p-6 rounded-xl hover-lift group">
                <div className={`w-10 h-10 rounded-lg bg-${dept.color}-500/10 group-hover:bg-${dept.color}-500/20 transition-colors mb-4 flex items-center justify-center`}>
                  <span className={`text-${dept.color}-500 font-bold`}>{dept.code}</span>
                </div>
                <h4 className="font-bold text-lg mb-2">{dept.name}</h4>
                <p className="text-gray-400 text-sm">{dept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mb-4"></span>
            <h2 className="text-4xl font-bold mb-4">Admissions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Start your engineering journey with us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                number: "01",
                title: "Eligibility & Process",
                description: "Merit-based admissions with transparent counseling and guidance for all applicants.",
                items: ["TNEA Counseling", "Direct Admission", "Management Quota"]
              },
              {
                number: "02",
                title: "Scholarships",
                description: "Financial support for merit and need-based applicants subject to eligibility criteria.",
                items: ["Merit Scholarships", "Sports Quota", "Fee Concessions"]
              },
              {
                number: "03",
                title: "How to Apply",
                description: "Review program details and submit your application through our online portal.",
                cta: "Start Application"
              }
            ].map((step, index) => (
              <div key={index} className={`glass p-8 rounded-2xl hover-lift ${index === 2 ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/20' : ''}`}>
                <div className={`text-4xl font-bold ${index === 2 ? 'text-blue-500' : index === 0 ? 'text-blue-500' : 'text-emerald-500'} mb-4`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 mb-6">{step.description}</p>
                {step.items ? (
                  <ul className="space-y-2 text-gray-400">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="w-4 h-4 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <a href="/login" className="inline-block w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-center hover:shadow-xl transition-all">
                      {step.cta}
                    </a>
                    <p className="text-gray-500 text-sm text-center mt-4">Applications for 2024 are now open</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placements Section */}
      <section id="placements" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mb-4"></span>
            <h2 className="text-4xl font-bold mb-4">Placements & Careers</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Building bridges between education and industry</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Icons.Trophy className="w-8 h-8 text-blue-500" />,
                title: "Career Readiness",
                description: "Comprehensive training in aptitude, coding, communication, and interview skills.",
                color: "blue"
              },
              {
                icon: <Icons.Users className="w-8 h-8 text-emerald-500" />,
                title: "Industry Connect",
                description: "Regular internships, live projects, and partnerships with leading companies.",
                color: "green"
              },
              {
                icon: <Icons.Briefcase className="w-8 h-8 text-purple-500" />,
                title: "Alumni Network",
                description: "Strong mentorship and guidance from successful alumni across various domains.",
                color: "purple"
              }
            ].map((item, index) => (
              <div key={index} className="glass p-8 rounded-2xl hover-lift">
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section id="campus" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mb-4"></span>
            <h2 className="text-4xl font-bold mb-4">Campus Life</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Where learning meets living</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Icons.Users className="w-16 h-16 text-blue-500" />,
                title: "Clubs & Activities",
                description: "Technical clubs, hackathons, arts, sports, and cultural activities for holistic development.",
                gradient: "from-blue-500/20 to-purple-500/20"
              },
              {
                icon: <Icons.Building className="w-16 h-16 text-emerald-500" />,
                title: "Facilities",
                description: "Modern libraries, advanced labs, smart classrooms, hostels, and sports infrastructure.",
                gradient: "from-emerald-500/20 to-teal-500/20"
              },
              {
                icon: <Icons.Shield className="w-16 h-16 text-orange-500" />,
                title: "Community",
                description: "Inclusive campus culture that supports growth, wellbeing, and lifelong friendships.",
                gradient: "from-orange-500/20 to-red-500/20"
              }
            ].map((item, index) => (
              <div key={index} className="glass p-8 rounded-2xl hover-lift">
                <div className={`aspect-video rounded-xl bg-gradient-to-br ${item.gradient} mb-6 flex items-center justify-center`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mb-4"></span>
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Get in touch with us for more information</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Icons.MapPin className="w-8 h-8 text-blue-500" />,
                title: "Address",
                content: "Velammal College of Engineering and Technology<br />Madurai, Tamil Nadu, India",
                color: "blue"
              },
              {
                icon: <Icons.Mail className="w-8 h-8 text-emerald-500" />,
                title: "Email",
                content: "info@vcet.example.edu<br />admissions@vcet.example.edu",
                color: "green"
              },
              {
                icon: <Icons.Phone className="w-8 h-8 text-purple-500" />,
                title: "Phone",
                content: "+91-0000-000000<br />+91-0000-000001",
                color: "purple"
              }
            ].map((contact, index) => (
              <div key={index} className="glass p-8 rounded-2xl hover-lift text-center">
                <div className={`w-16 h-16 rounded-2xl bg-${contact.color}-500/10 flex items-center justify-center mx-auto mb-6`}>
                  {contact.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{contact.title}</h3>
                <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: contact.content }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
                  <img src="/media/vcetLogo.jpg" alt="VCET Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Velammal College of Engineering and Technology</h3>
                  <p className="text-gray-400 text-sm">Madurai, Tamil Nadu</p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">© <span id="year"></span> VCET. All rights reserved.</p>
              <p className="text-gray-500 text-sm">Accredited by AICTE | Affiliated to Anna University</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;