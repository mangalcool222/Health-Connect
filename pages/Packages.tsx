import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, ShieldPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Packages: React.FC = () => {
  const { packages, addAppointment, user } = useApp();
  const navigate = useNavigate();

  const handleBook = (pkg: any) => {
     if (!user) {
      navigate('/login');
      return;
    }
    addAppointment(pkg, 'test');
    alert('Package booked successfully!');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900">Comprehensive Health Packages</h1>
          <p className="mt-4 text-slate-600">Holistic checkups designed for every age and lifestyle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">
              <div className="md:w-2/5 h-64 md:h-auto relative">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {pkg.discount}% OFF
                </div>
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <ShieldPlus size={20} />
                    <span className="text-xs font-bold uppercase tracking-wider">Health Package</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{pkg.name}</h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-slate-700">Includes {pkg.testsIncluded.length} Tests:</p>
                    <ul className="space-y-1">
                      {pkg.testsIncluded.map((test, i) => (
                        <li key={i} className="text-sm text-slate-500 flex items-center gap-2">
                          <Check size={14} className="text-secondary" /> {test}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-sm text-slate-400 line-through">${Math.round(pkg.price * (1 + pkg.discount/100))}</span>
                    <span className="text-3xl font-bold text-slate-900 ml-2">${pkg.price}</span>
                  </div>
                  <button 
                    onClick={() => handleBook(pkg)}
                    className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
