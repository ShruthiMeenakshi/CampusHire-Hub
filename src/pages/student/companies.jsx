import React, { useState } from 'react';
import StudentLayout from '../components/StudentLayout';
import { Building, MapPin, Users, DollarSign, Star, Search, Filter } from 'lucide-react';

const Companies = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Google',
      logoColor: 'bg-gradient-to-br from-red-500 to-yellow-500',
      location: 'Bangalore, India',
      openings: 12,
      avgPackage: '₹22 LPA',
      rating: 4.8
    },
    // ... more companies
  ]);

  return (
    <StudentLayout activePage="companies" pageTitle="Companies">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Companies</h1>
        <p className="text-gray-600">Browse companies hiring from our campus</p>
      </div>
      
      {/* Company listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-lg ${company.logoColor} flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{company.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{company.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {company.location}
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 text-yellow-800 px-2 py-1 rounded">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">{company.rating}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Open Positions</div>
                <div className="font-semibold text-gray-900">{company.openings}</div>
              </div>
              <div>
                <div className="text-gray-500">Avg Package</div>
                <div className="font-semibold text-gray-900">{company.avgPackage}</div>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </StudentLayout>
  );
};

export default Companies;