import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Video, MessageSquare, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Doctors: React.FC = () => {
  const { doctors, addAppointment, user } = useApp();
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const specialties = ['All', ...Array.from(new Set(doctors.map(d => d.specialty)))];

  const filteredDoctors = filter === 'All' ? doctors : doctors.filter(d => d.specialty === filter);

  const handleBook = (doctor: any) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addAppointment(doctor, 'doctor');
    alert(`Appointment request sent to ${doctor.name}! Check your dashboard.`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Consult Top Doctors</h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Connect with specialist doctors via video, chat, or voice call. Instant prescription and digital health records.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {specialties.map(spec => (
            <button
              key={spec}
              onClick={() => setFilter(spec)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === spec 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover border-2 border-slate-100" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{doctor.name}</h3>
                  <p className="text-primary font-medium text-sm">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mt-1 text-amber-400 text-sm">
                    <Star size={14} fill="currentColor" />
                    <span className="font-bold text-slate-700">{doctor.rating}</span>
                    <span className="text-slate-400 font-normal">({doctor.experience} yrs exp)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mb-6">
                <span className="flex-1 flex justify-center items-center py-2 bg-slate-50 rounded-lg text-slate-500 text-xs gap-1">
                  <Video size={14} /> Video
                </span>
                <span className="flex-1 flex justify-center items-center py-2 bg-slate-50 rounded-lg text-slate-500 text-xs gap-1">
                  <MessageSquare size={14} /> Chat
                </span>
                <span className="flex-1 flex justify-center items-center py-2 bg-slate-50 rounded-lg text-slate-500 text-xs gap-1">
                  <Phone size={14} /> Call
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <span className="text-xs text-slate-500 block">Consultation Fee</span>
                  <span className="text-xl font-bold text-slate-900">${doctor.price}</span>
                </div>
                <button 
                  onClick={() => handleBook(doctor)}
                  className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors shadow-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
