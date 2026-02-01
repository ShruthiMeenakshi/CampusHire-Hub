import React, { useEffect, useRef } from 'react';
import StudentLayout from '../../components/StudentLayout';
import { TrendingUp, Users, Award, Target, Download } from 'lucide-react';
import Chart from 'chart.js/auto';

const Stats = () => {
  const statsChartRef = useRef(null);

  useEffect(() => {
    // Initialize charts
    if (statsChartRef.current) {
      const ctx = statsChartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Selected', 'Under Process', 'Not Applied'],
          datasets: [{
            data: [65, 20, 15],
            backgroundColor: [
              '#10B981',
              '#3B82F6',
              '#9CA3AF'
            ]
          }]
        },
        options: {
          cutout: '70%',
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
  }, []);

  return (
    <StudentLayout activePage="stats" pageTitle="Statistics">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Statistics</h1>
        <p className="text-gray-600">Track your placement journey and performance</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Success Rate</h3>
              <p className="text-2xl font-bold text-blue-600">75%</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Higher than department average (68%)</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Interviews</h3>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">3 pending, 5 completed</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Offers</h3>
              <p className="text-2xl font-bold text-purple-600">2</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Highest: ₹22 LPA</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Application Status</h3>
            <button className="flex items-center gap-2 text-sm text-blue-600">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <div className="h-64">
            <canvas ref={statsChartRef}></canvas>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Skill Analysis</h3>
          <div className="space-y-4">
            {[
              { skill: 'Data Structures', level: 85 },
              { skill: 'Algorithms', level: 78 },
              { skill: 'System Design', level: 65 },
              { skill: 'Communication', level: 90 }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.skill}</span>
                  <span className="font-medium">{item.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Stats;