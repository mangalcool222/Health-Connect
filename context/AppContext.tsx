import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Doctor, Test, Package, BlogPost, SiteConfig, User, Appointment, ChatMessage } from '../types';
import { 
  INITIAL_DOCTORS, INITIAL_TESTS, INITIAL_PACKAGES, 
  INITIAL_BLOGS, INITIAL_SITE_CONFIG, INITIAL_USER 
} from '../constants';

interface AppContextType {
  user: User | null;
  doctors: Doctor[];
  tests: Test[];
  packages: Package[];
  blogPosts: BlogPost[];
  siteConfig: SiteConfig;
  appointments: Appointment[];
  login: (email: string, role?: 'user' | 'admin') => void;
  logout: () => void;
  addAppointment: (item: Doctor | Test | Package, type: 'doctor' | 'test') => void;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  // Admin functions
  addDoctor: (doctor: Doctor) => void;
  deleteDoctor: (id: string) => void;
  addTest: (test: Test) => void;
  deleteTest: (id: string) => void;
  deleteAppointment: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [tests, setTests] = useState<Test[]>(INITIAL_TESTS);
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const login = (email: string, role: 'user' | 'admin' = 'user') => {
    setUser({ ...INITIAL_USER, email, role, name: email.split('@')[0] });
  };

  const logout = () => {
    setUser(null);
  };

  const addAppointment = (item: Doctor | Test | Package, type: 'doctor' | 'test') => {
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      itemId: item.id,
      itemName: item.name,
      date: new Date(Date.now() + 86400000 * (Math.floor(Math.random() * 7) + 1)).toISOString().split('T')[0], // Random date in next 7 days
      status: 'upcoming',
      patientName: user?.name || 'Guest'
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateSiteConfig = (config: Partial<SiteConfig>) => {
    setSiteConfig(prev => ({ ...prev, ...config }));
  };

  const addDoctor = (doctor: Doctor) => setDoctors([...doctors, doctor]);
  const deleteDoctor = (id: string) => setDoctors(doctors.filter(d => d.id !== id));
  
  const addTest = (test: Test) => setTests([...tests, test]);
  const deleteTest = (id: string) => setTests(tests.filter(t => t.id !== id));
  
  const deleteAppointment = (id: string) => setAppointments(appointments.filter(a => a.id !== id));

  return (
    <AppContext.Provider value={{
      user, doctors, tests, packages, blogPosts, siteConfig, appointments,
      login, logout, addAppointment, updateSiteConfig,
      addDoctor, deleteDoctor, addTest, deleteTest, deleteAppointment
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
