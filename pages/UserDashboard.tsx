import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, FileText, Settings, User } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export const UserDashboard: React.FC = () => {
  const { user, appointments } = useApp();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome, {user.name}</h1>
          <p className="text-slate-600">Manage your health appointments and reports.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
              <div className="flex flex-col items-center pb-6 border-b border-slate-100">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                  <User size={40} className="text-slate-400" />
                </div>
                <h3 className="font-bold text-slate-900">{user.name}</h3>
                <p className="text-sm text-slate-500">{user.email}</p>
                <span className="mt-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase">
                  {user.subscription} Plan
                </span>
              </div>
              <nav className="space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg">
                  <Calendar size={18} /> Appointments
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                  <FileText size={18} /> Medical Reports
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                  <Settings size={18} /> Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Your Appointments</h2>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map(apt => (
                    <div key={apt.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            apt.type === 'doctor' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {apt.type === 'doctor' ? 'Consultation' : 'Lab Test'}
                          </span>
                          <span className="text-xs text-slate-400">ID: #{apt.id}</span>
                        </div>
                        <h3 className="font-bold text-slate-900">{apt.itemName}</h3>
                        <p className="text-sm text-slate-500">Scheduled for: {apt.date}</p>
                      </div>
                      <div className="mt-4 sm:mt-0">
                         <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                           Upcoming
                         </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <Calendar size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No upcoming appointments found.</p>
                </div>
              )}
            </div>

             {/* Recent Reports Placeholder */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900">Recent Reports</h2>
              </div>
              <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
                <p className="text-sm">No reports available for download yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
