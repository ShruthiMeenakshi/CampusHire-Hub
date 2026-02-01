import React, { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 font-inter">

      {/* HEADER */}
      <header
        className="fixed w-full z-50 glass border-b border-gray-800"
        style={{ height: "80px" }}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur opacity-70 rounded-lg"></div>
                <img
                  src="/media/vcetLogo.jpg"
                  alt="VCET Logo"
                  className="w-12 h-12 rounded-lg object-cover relative z-10 border border-gray-700"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-tight">
                  Velammal College of Engineering and Technology
                </h1>
                <p className="text-xs text-gray-400">Madurai, Tamil Nadu</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              {["home","academics","departments","admissions","placements","campus"].map((item)=>(
                <a
                  key={item}
                  href={`#${item}`}
                  className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  {item.charAt(0).toUpperCase()+item.slice(1)}
                </a>
              ))}
            </nav>

            {/* Buttons */}
            <div className="flex items-center space-x-3">
              <a
                href="#admissions"
                className="hidden md:inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg transition-shadow"
              >
                Apply Now
              </a>

              <a
                href="/login"
                className="px-4 py-2 rounded-lg border border-gray-700 hover:border-primary transition-colors"
              >
                Login
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main id="home" className="pt-32 pb-20 relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-gray-700/50 mb-6">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-300">
                Welcome to VCET
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
              <span className="block text-white">
                Empowering
                <span className="gradient-text ml-2">Engineers</span>
              </span>
              <span className="block text-white mt-2">
                and
                <span className="gradient-text ml-2">Innovators</span>
              </span>
            </h1>

            <span className="block text-white text-2xl md:text-3xl lg:text-4xl font-normal mt-2 opacity-90 mb-10">
              Shaping the Future of Technology
            </span>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-10">
              VCET fosters a culture of learning, research, and industry collaboration —
              preparing students to build solutions that matter in today's dynamic world.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href="#admissions"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover-lift"
              >
                Explore Admissions
              </a>

              <a
                href="#departments"
                className="px-8 py-4 rounded-xl border-2 border-gray-700 hover:border-primary hover-lift"
              >
                View Departments
              </a>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
                <img
                  src="/media/vcetLogo.jpg"
                  alt="VCET Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  Velammal College of Engineering and Technology
                </h3>
                <p className="text-gray-400 text-sm">Madurai, Tamil Nadu</p>
              </div>
            </div>

            <div className="text-center md:text-right mt-6 md:mt-0">
              <p className="text-gray-400">
                © <span id="year"></span> VCET. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Accredited by AICTE | Affiliated to Anna University
              </p>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
