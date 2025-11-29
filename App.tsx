import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Diagnostics } from './pages/Diagnostics';
import { Doctors } from './pages/Doctors';
import { SymptomChecker } from './pages/SymptomChecker';
import { Packages } from './pages/Packages';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/subscription" element={<Packages />} /> {/* Reusing Packages for Simplicity */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
