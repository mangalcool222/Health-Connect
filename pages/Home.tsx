import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Calendar, ShieldCheck, UserCheck } from 'lucide-react';

export const Home: React.FC = () => {
  const { siteConfig, doctors, tests, blogPosts } = useApp();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-sky-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 text-center lg:text-left z-10">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {siteConfig.heroTitle}
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
              {siteConfig.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/doctors" className="inline-flex justify-center items-center px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-sky-600 hover:scale-105 transition-all duration-300">
                Book Appointment
              </Link>
              <Link to="/diagnostics" className="inline-flex justify-center items-center px-8 py-4 bg-white text-primary border border-slate-200 font-semibold rounded-full shadow-md hover:bg-slate-50 hover:scale-105 transition-all duration-300">
                Book Lab Test
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
            <img 
              src={siteConfig.heroImage} 
              alt="Medical Professionals" 
              className="relative rounded-3xl shadow-2xl w-full object-cover h-[400px] lg:h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose HealthConnect?</h2>
            <p className="mt-4 text-slate-600">Comprehensive care designed around your needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <UserCheck size={32} />, title: "Expert Doctors", desc: "Consult with top specialists from home." },
              { icon: <Activity size={32} />, title: "Accurate Labs", desc: "NABL certified labs with home collection." },
              { icon: <ShieldCheck size={32} />, title: "Secure Data", desc: "Your health records are HIPAA compliant." },
              { icon: <Calendar size={32} />, title: "Easy Booking", desc: "Instant confirmation for all services." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-slate-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tests Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Popular Diagnostics</h2>
              <p className="mt-2 text-slate-600">Most booked lab tests this month.</p>
            </div>
            <Link to="/diagnostics" className="hidden md:flex items-center text-primary font-medium hover:underline">
              View all tests <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {tests.slice(0, 4).map(test => (
              <div key={test.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                <div className="h-40 bg-slate-100 rounded-lg mb-4 overflow-hidden">
                  <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{test.category}</div>
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{test.name}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{test.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-slate-900">${test.price}</span>
                  <Link to="/diagnostics" className="text-sm font-semibold text-primary hover:text-sky-600">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Blog Section */}
       <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Latest Health Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map(post => (
              <div key={post.id} className="group cursor-pointer">
                <div className="rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-xs font-medium text-slate-500 mb-2">{post.date}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
