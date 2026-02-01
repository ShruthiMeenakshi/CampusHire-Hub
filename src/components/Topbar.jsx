import React, { useState } from 'react';
import { Search, Bell, User, Filter, ChevronDown } from 'lucide-react';

const Topbar = ({ pageTitle = 'Placement Drives', showSearch = true }) => {
  const [user] = useState({
    name: 'John Doe',
    department: 'Computer Science',
    avatarColor: 'from-blue-500 to-blue-600'
  });

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">{pageTitle}</h2>
          
          {showSearch && (
            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="search" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${user.avatarColor}`}></div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.department}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </div>
        </div>
      </div>
      
      {/* Mobile Search */}
      {showSearch && (
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="search" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;