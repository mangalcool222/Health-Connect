import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Beaker, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Diagnostics: React.FC = () => {
  const { tests, addAppointment, user } = useApp();
  const navigate = useNavigate();

  const handleBook = (test: any) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addAppointment(test, 'test');
    alert(`Booking confirmed for ${test.name}! Check your dashboard.`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Lab Tests & Diagnostics</h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Book certified lab tests with free home sample collection. Accurate reports delivered digitally within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.map(test => (
            <div key={test.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                 <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                   {test.category}
                 </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{test.name}</h3>
                <p className="text-slate-600 text-sm mb-4 h-10 line-clamp-2">{test.description}</p>
                
                <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{test.turnaroundTime}</span>
                  </div>
                   <div className="flex items-center gap-1">
                    <Beaker size={16} />
                    <span>Home Sample</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-500 block">Total Cost</span>
                    <span className="text-2xl font-bold text-slate-900">${test.price}</span>
                  </div>
                  <button 
                    onClick={() => handleBook(test)}
                    className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors shadow-sm"
                  >
                    Book Test
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
