import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, Plus, Trash2, Save, Activity, Stethoscope } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    user, doctors, tests, siteConfig, 
    updateSiteConfig, addDoctor, deleteDoctor, addTest, deleteTest 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'tests' | 'settings'>('overview');

  // Local state forms
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', price: 100 });
  const [newTest, setNewTest] = useState({ name: '', category: '', price: 50 });
  const [configForm, setConfigForm] = useState(siteConfig);

  if (!user || user.role !== 'admin') return <Navigate to="/login" />;

  const handleConfigSave = () => {
    updateSiteConfig(configForm);
    alert('Site configuration updated successfully!');
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    addDoctor({
      id: Date.now().toString(),
      ...newDoctor,
      experience: 5,
      rating: 5.0,
      image: `https://picsum.photos/200/200?random=${Date.now()}`,
      available: true
    });
    setNewDoctor({ name: '', specialty: '', price: 100 });
  };

  const handleAddTest = (e: React.FormEvent) => {
    e.preventDefault();
    addTest({
      id: Date.now().toString(),
      ...newTest,
      turnaroundTime: '24 Hours',
      description: 'New test description placeholder.',
      image: `https://picsum.photos/400/300?random=${Date.now()}`
    });
    setNewTest({ name: '', category: '', price: 50 });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden lg:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="text-primary" /> Admin Panel
          </h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('doctors')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'doctors' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <Stethoscope size={18} /> Doctors
          </button>
           <button 
            onClick={() => setActiveTab('tests')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'tests' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <FileText size={18} /> Diagnostics
          </button>
           <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <Settings size={18} /> Site Config
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-8 capitalize">{activeTab} Dashboard</h1>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-slate-500 text-sm font-medium">Total Doctors</h3>
              <p className="text-3xl font-bold text-slate-900 mt-2">{doctors.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-slate-500 text-sm font-medium">Available Tests</h3>
              <p className="text-3xl font-bold text-slate-900 mt-2">{tests.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-slate-500 text-sm font-medium">Pending Appointments</h3>
              <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
            </div>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Add New Doctor</h3>
              <form onSubmit={handleAddDoctor} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
                  <input type="text" required value={newDoctor.name} onChange={e => setNewDoctor({...newDoctor, name: e.target.value})} className="w-full p-2 border rounded-md" placeholder="Dr. Name" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Specialty</label>
                  <input type="text" required value={newDoctor.specialty} onChange={e => setNewDoctor({...newDoctor, specialty: e.target.value})} className="w-full p-2 border rounded-md" placeholder="Cardiologist" />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Price ($)</label>
                  <input type="number" required value={newDoctor.price} onChange={e => setNewDoctor({...newDoctor, price: parseInt(e.target.value)})} className="w-full p-2 border rounded-md" />
                </div>
                <button type="submit" className="bg-primary text-white p-2 rounded-md hover:bg-sky-600"><Plus size={20} /></button>
              </form>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Specialty</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {doctors.map(doc => (
                    <tr key={doc.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{doc.name}</td>
                      <td className="px-6 py-4 text-slate-500">{doc.specialty}</td>
                      <td className="px-6 py-4 text-slate-500">${doc.price}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => deleteDoctor(doc.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
           <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Add New Test</h3>
              <form onSubmit={handleAddTest} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Test Name</label>
                  <input type="text" required value={newTest.name} onChange={e => setNewTest({...newTest, name: e.target.value})} className="w-full p-2 border rounded-md" placeholder="Test Name" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
                  <input type="text" required value={newTest.category} onChange={e => setNewTest({...newTest, category: e.target.value})} className="w-full p-2 border rounded-md" placeholder="e.g., Blood" />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Price ($)</label>
                  <input type="number" required value={newTest.price} onChange={e => setNewTest({...newTest, price: parseInt(e.target.value)})} className="w-full p-2 border rounded-md" />
                </div>
                <button type="submit" className="bg-primary text-white p-2 rounded-md hover:bg-sky-600"><Plus size={20} /></button>
              </form>
            </div>
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tests.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{t.name}</td>
                      <td className="px-6 py-4 text-slate-500">{t.category}</td>
                      <td className="px-6 py-4 text-slate-500">${t.price}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => deleteTest(t.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6 pb-4 border-b">Website Content Configuration</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hero Title</label>
                <input 
                  type="text" 
                  value={configForm.heroTitle}
                  onChange={e => setConfigForm({...configForm, heroTitle: e.target.value})}
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hero Subtitle</label>
                <textarea 
                  value={configForm.heroSubtitle}
                  onChange={e => setConfigForm({...configForm, heroSubtitle: e.target.value})}
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 h-24"
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hero Image URL</label>
                <input 
                  type="text" 
                  value={configForm.heroImage}
                  onChange={e => setConfigForm({...configForm, heroImage: e.target.value})}
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50"
                />
              </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                    <input 
                      type="text" 
                      value={configForm.contactEmail}
                      onChange={e => setConfigForm({...configForm, contactEmail: e.target.value})}
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
                    <input 
                      type="text" 
                      value={configForm.contactPhone}
                      onChange={e => setConfigForm({...configForm, contactPhone: e.target.value})}
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
               </div>

              <div className="pt-4">
                <button 
                  onClick={handleConfigSave}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
