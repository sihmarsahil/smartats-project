import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutTemplate, Edit3, Download, CheckCircle, Sparkles, FileText } from 'lucide-react';

const steps = [
  {
    icon: LayoutTemplate,
    title: 'Choose Template',
    description: 'Select from our library of professional, ATS-optimized layouts designed by recruiters.',
  },
  {
    icon: Edit3,
    title: 'Edit & Personalize',
    description: 'Fill in your details, showcase your experience, and tailor your skills in minutes.',
  },
  {
    icon: Download,
    title: 'Download PDF',
    description: 'Get a perfectly formatted, machine-readable PDF instantly with one click.',
  },
];

export default function HomePage() {
  return (
    <div className="flex-1 w-full relative bg-white overflow-hidden font-sans">
      {/* Background Split - Responsive adjustment */}
      <div 
        className="absolute top-0 right-0 w-full lg:w-[45%] h-1/2 lg:h-full bg-[#f4f7f9] -z-10"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 90%)' }}
      ></div>
      
      <div className="hidden lg:block absolute top-0 right-0 w-[45%] h-full bg-[#f4f7f9] -z-10"
        style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
      ></div>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-16 pt-8 pb-12 lg:pt-32 lg:pb-32 relative z-10 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Typography & CTA */}
        <div className="w-full lg:w-[55%] lg:pr-16 text-center lg:text-left order-2 lg:order-1">
          <motion.h3 
            className="text-sm sm:text-lg md:text-2xl font-bold text-[#1a2b53] mb-3 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🚀 Trusted by 500+ Job Seekers .
          </motion.h3>
          
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-black text-[#0f172a] leading-[1.1] mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            SmartATS. The Best <br className="hidden sm:block" /> Resume Maker Online.
          </motion.h1>
          
          <motion.p 
            className="text-sm sm:text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Whether you want to build a new resume or improve an existing one, let SmartATS help you stand out to recruiters and land your dream job.
          </motion.p>
          
          <div className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-4">
            <Link 
              to="/builder" 
              className="w-full xs:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-[#ffc559] rounded-full hover:bg-[#f6b744] transition-all"
            >
              Create new resume
            </Link>
            
            <Link 
              to="/ats-checker" 
              className="w-full xs:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-[#1a2b53] bg-white border-2 border-[#1a2b53] rounded-full hover:bg-[#1a2b53] hover:text-white transition-all"
            >
              Improve my resume
            </Link>
          </div>
        </div>

        {/* Right Section (Sahil's Branded Resume Mockup) */}
        <div className="w-full lg:w-[45%] relative flex justify-center lg:justify-end items-center order-1 lg:order-2">
          
          <div className="absolute w-40 h-40 sm:w-64 sm:h-64 bg-[#bdf0d4] rounded-full blur-3xl opacity-30 -z-10"></div>

          {/* The Hero Resume Mock - CUSTOMIZED WITH SAHIL'S INFO */}
          <motion.div 
            className="relative w-[280px] xs:w-[320px] sm:w-[380px] lg:w-[420px] aspect-[1/1.4] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
             {/* Left Sidebar (Red) */}
             <div className="absolute top-0 left-0 w-[30%] h-full bg-[#8c2a1e]"></div>
             
             <div className="relative z-10 p-4 sm:p-6 flex h-full">
                {/* Left Column Mock */}
                <div className="w-[30%] h-full flex flex-col items-center pt-8 pr-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#ffc559] bg-slate-300 overflow-hidden mb-6 flex-shrink-0 relative -ml-8 sm:-ml-12 shadow-lg">
                    <img 
                      src="/assets/sahil_new.jpg" 
                      alt="Sahil Sihmar" 
                      className="w-full h-full object-cover" 
                      onError={(e) => e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400"}
                    />
                  </div>
                  <div className="w-12 h-1 bg-white/30 rounded-full mb-3 -ml-4"></div>
                  <div className="w-8 h-1 bg-white/20 rounded-full mb-8 -ml-4"></div>
                </div>
                
                {/* Right Column Content - BRANDED */}
                <div className="w-[70%] pl-4 sm:pl-6 pt-6">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#8c2a1e] mb-1">Sahil Sihmar</h2>
                  <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">Software Engineer</h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="w-full flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#8c2a1e] rounded-full"></div><div className="h-1 bg-slate-100 rounded-full w-full"></div></div>
                    <div className="w-full flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#8c2a1e] rounded-full"></div><div className="h-1 bg-slate-100 rounded-full w-3/4"></div></div>
                  </div>
                  
                  <p className="text-[8px] text-slate-400 mb-6 leading-relaxed">Passionate developer building modern web solutions and AI-driven tools. Specializing in React, Node.js, and scaling seamless user experiences.</p>
                  
                  <div className="h-3 bg-[#8c2a1e]/10 w-1/4 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><div className="h-1 bg-slate-200 w-16 rounded-full"></div><div className="flex gap-0.5"><div className="w-1 h-1 bg-[#8c2a1e] rounded-full"></div><div className="w-1 h-1 bg-[#8c2a1e] rounded-full"></div><div className="w-1 h-1 bg-[#8c2a1e] rounded-full"></div></div></div>
                    <div className="flex justify-between items-center"><div className="h-1 bg-slate-200 w-20 rounded-full"></div><div className="flex gap-0.5"><div className="w-1 h-1 bg-[#8c2a1e] rounded-full"></div><div className="w-1 h-1 bg-[#8c2a1e] rounded-full"></div><div className="w-1 h-1 bg-slate-200 rounded-full"></div></div></div>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Rest of the sections remain same for consistency */}
      <section className="bg-white border-t border-slate-50 py-16 lg:py-24 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">How It Works</h2>
            <p className="mt-3 text-sm sm:text-xl text-slate-500">Get hired in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 text-center bg-[#f4f7f9] relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a2b53] mb-8">Why Use SmartATS?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {['Optimized for ATS bots', 'Professional typography', 'Clean, minimalistic design', 'Free to use & download'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-800 font-bold text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
