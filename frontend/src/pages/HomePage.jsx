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
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 90%)' }} // Mobile friendly clip
      ></div>
      
      {/* Desktop specific clip-path logic using a media query style div or just simplified for both */}
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
            Fast. Easy. Effective.
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
            Build a professional resume in minutes. SmartATS helps you showcase your skills on a layout that recruiters (and bots) love.
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

        {/* Right Section (Resume Mockup) - Order 1 on Mobile to show it first */}
        <div className="w-full lg:w-[45%] relative flex justify-center lg:justify-end items-center order-1 lg:order-2">
          
          {/* Abstract background shapes - Simplified for mobile */}
          <div className="absolute w-40 h-40 sm:w-64 sm:h-64 bg-[#bdf0d4] rounded-full blur-3xl opacity-30 -z-10"></div>

          {/* The Hero Resume Mock - Responsive sizing */}
          <motion.div 
            className="relative w-[260px] xs:w-[320px] sm:w-[380px] lg:w-[420px] aspect-[1/1.4] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
             {/* Resume internal content remains mostly same but using flex-shrink/grow */}
             <div className="absolute top-0 left-0 w-[28%] h-full bg-[#963721]"></div>
             <div className="relative z-10 p-4 sm:p-6 flex h-full">
                <div className="w-[28%] flex flex-col items-center pt-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-200 border-2 border-[#ffc559] mb-4 overflow-hidden shadow-md">
                     <div className="w-full h-full bg-slate-300"></div>
                  </div>
                  <div className="w-10 h-1 bg-white/20 rounded mb-2"></div>
                  <div className="w-8 h-1 bg-white/10 rounded"></div>
                </div>
                <div className="w-[72%] pl-4 sm:pl-6 pt-4">
                  <div className="h-4 sm:h-6 bg-[#8c2a1e]/20 w-3/4 rounded mb-2"></div>
                  <div className="h-2 sm:h-3 bg-slate-100 w-1/2 rounded mb-6"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                    <div className="h-1.5 bg-slate-100 rounded w-5/6"></div>
                  </div>
                  <div className="h-3 bg-[#8c2a1e]/10 w-1/4 rounded mb-3"></div>
                  <div className="space-y-3">
                    <div className="h-1 bg-slate-100 rounded w-full"></div>
                    <div className="h-1 bg-slate-100 rounded w-full"></div>
                    <div className="h-1 bg-slate-100 rounded w-full"></div>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section - Responsive Grid */}
      <section className="bg-white border-t border-slate-50 py-16 lg:py-24 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">How It Works</h2>
            <p className="mt-3 text-sm sm:text-xl text-slate-500">Get hired in three simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-6 h-6 sm:w-10 sm:h-10 text-indigo-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-4">{step.title}</h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Responsive Grid */}
      <section className="py-16 lg:py-24 text-center bg-[#f4f7f9] relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1a2b53] mb-8 sm:mb-12">Why Use SmartATS?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {['Optimized for ATS bots', 'Professional typography', 'Clean, minimalistic design', 'Free to use & download'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-800 font-bold text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
