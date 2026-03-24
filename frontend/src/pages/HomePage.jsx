import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutTemplate, Edit3, Download, CheckCircle, Sparkles } from 'lucide-react';

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
      {/* Background Split - mimicking the diagonal cut */}
      <div 
        className="absolute top-0 right-0 w-full lg:w-[45%] h-full bg-[#f4f7f9] -z-10"
        style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
      ></div>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-24 lg:pt-32 lg:pb-32 relative z-10 flex flex-col lg:flex-row items-center">
        
        {/* Left Typography & CTA */}
        <div className="w-full lg:w-[55%] lg:pr-16 text-left mb-16 lg:mb-0">
          <motion.h3 
            className="text-xl md:text-2xl font-bold text-[#1a2b53] mb-4 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Fast. Easy. Effective.
          </motion.h3>
          
          <motion.h1 
            className="text-[44px] md:text-[64px] font-black text-[#0f172a] leading-[1.1] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            SmartATS. The Best Resume Maker Online.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you want to build a new resume from scratch or improve an existing one, let SmartATS help you present your work life, personality, and skills on a resume that stands out.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full sm:w-auto"
            >
              <Link 
                to="/builder" 
                className="inline-flex w-full items-center justify-center px-10 py-4 text-lg font-bold text-slate-900 bg-[#ffc559] rounded-full hover:bg-[#f6b744] hover:shadow-lg transition-all"
              >
                Create new resume
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full sm:w-auto"
            >
              <Link 
                to="/ats-checker" 
                className="inline-flex w-full items-center justify-center px-10 py-4 text-lg font-bold text-[#1a2b53] bg-transparent border-2 border-[#1a2b53] rounded-full hover:bg-[#1a2b53] hover:text-white transition-all shadow-sm"
              >
                Improve my resume
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Floating Resume & Abstract Shapes */}
        <div className="w-full lg:w-[45%] relative flex justify-center lg:justify-end items-center mt-10 lg:mt-0">
          
          {/* Abstract Shape: Mint Dotted Quarter Circle */}
          <motion.div 
            className="absolute top-[-30px] right-[10%] w-48 h-48 bg-[#bdf0d4] rounded-tr-full rounded-br-full -z-10"
            style={{ backgroundImage: 'radial-gradient(#8bceaa 2px, transparent 2px)', backgroundSize: '16px 16px' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.div>

          {/* Abstract Shape: Red outlined triangle */}
          <motion.div 
            className="absolute bottom-[25%] right-[-20px] w-8 h-8 border-2 border-[#ff6b6b] rotate-45 z-20"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 45 }}
            transition={{ duration: 1, delay: 0.6 }}
          ></motion.div>

          {/* Abstract Shape: Light Blue Triangle */}
          <motion.div 
            className="absolute bottom-[10%] right-[10%] w-16 h-16 bg-[#caddf6] z-0"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          ></motion.div>

          {/* Abstract Shape: Blue Squiggles */}
          <motion.svg width="60" height="60" viewBox="0 0 60 60" className="absolute bottom-1/3 left-0 -translate-x-12 z-20" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: -48 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <path d="M0 10 Q 5 0, 10 10 T 20 10 T 30 10 T 40 10 T 50 10" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round"/>
            <path d="M0 25 Q 5 15, 10 25 T 20 25 T 30 25 T 40 25 T 50 25" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round"/>
            <path d="M0 40 Q 5 30, 10 40 T 20 40 T 30 40 T 40 40 T 50 40" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round"/>
          </motion.svg>

          {/* The Hero Resume Mock */}
          <motion.div 
            className="relative w-full max-w-[420px] aspect-[1/1.4] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden z-10"
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            whileHover={{ y: -5, rotate: 1, shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
          >
            {/* Split color inside resume */}
            <div className="absolute top-0 left-0 w-[30%] h-full bg-[#963721]"></div>
            
            {/* Mock Content */}
            <div className="relative z-10 p-6 flex h-full">
              {/* Left Column Mock */}
              <div className="w-[30%] h-full flex flex-col items-center pt-8">
                <div className="w-24 h-24 rounded-full border-4 border-[#ffc559] bg-slate-300 overflow-hidden mb-6 flex-shrink-0 relative -ml-12 shadow-lg">
                  <img src="/assets/sahil_new.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-1.5 bg-white/30 rounded-full mb-3 -ml-6"></div>
                <div className="w-12 h-1 bg-white/20 rounded-full mb-8 -ml-6"></div>
                
                <div className="w-16 h-1.5 bg-white/30 rounded-full mb-3 -ml-6"></div>
                <div className="flex flex-col gap-2 w-full pl-2">
                  <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                </div>
              </div>
              
              {/* Right Column Mock */}
              <div className="w-[70%] h-full pl-6 pt-6">
                <h2 className="text-3xl font-bold text-[#8c2a1e] mb-1">Sahil Sihmar</h2>
                <h3 className="text-sm font-medium text-slate-500 mb-6">Software Engineer</h3>
                
                <div className="flex flex-col gap-2 mb-6">
                  <div className="w-full flex items-center gap-2"><div className="w-3 h-3 bg-[#8c2a1e] rounded-full"></div><div className="h-1.5 bg-slate-200 rounded-full w-full"></div></div>
                  <div className="w-full flex items-center gap-2"><div className="w-3 h-3 bg-[#8c2a1e] rounded-full"></div><div className="h-1.5 bg-slate-200 rounded-full w-3/4"></div></div>
                  <div className="w-full flex items-center gap-2"><div className="w-3 h-3 bg-[#8c2a1e] rounded-full"></div><div className="h-1.5 bg-slate-200 rounded-full w-4/5"></div></div>
                </div>
                
                <p className="text-[8px] text-slate-400 mb-6 leading-relaxed">Highly motivated software engineer with experience developing diverse tech solutions. Specializes in building modern web applications, scalable APIs, and driving seamless user experiences. Passionate about AI integration and automation.</p>
                
                <div className="mb-4 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#8c2a1e] flex-shrink-0"></div>
                  <h4 className="font-bold text-[#8c2a1e] text-xs uppercase tracking-wide">Skills</h4>
                </div>
                
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex justify-between items-center"><div className="h-1.5 bg-slate-200 w-24 rounded-full"></div><div className="flex gap-0.5"><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div></div></div>
                  <div className="flex justify-between items-center"><div className="h-1.5 bg-slate-200 w-20 rounded-full"></div><div className="flex gap-0.5"><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div></div></div>
                  <div className="flex justify-between items-center"><div className="h-1.5 bg-slate-200 w-16 rounded-full"></div><div className="flex gap-0.5"><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-[#8c2a1e] rounded-full"></div><div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div></div></div>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#8c2a1e] flex-shrink-0"></div>
                  <h4 className="font-bold text-[#8c2a1e] text-xs uppercase tracking-wide">Work History</h4>
                </div>
                <div className="pl-6 border-l-2 border-slate-100 flex flex-col gap-4">
                  <div>
                    <div className="h-2 bg-slate-300 w-20 rounded-full mb-1 border-white"></div>
                    <div className="h-1 bg-slate-200 w-32 rounded-full mb-2"></div>
                    <div className="h-1 bg-slate-100 w-full rounded-full mb-1"></div>
                    <div className="h-1 bg-slate-100 w-5/6 rounded-full"></div>
                  </div>
                  <div>
                    <div className="h-2 bg-slate-300 w-16 rounded-full mb-1"></div>
                    <div className="h-1 bg-slate-200 w-28 rounded-full mb-2"></div>
                    <div className="h-1 bg-slate-100 w-full rounded-full mb-1"></div>
                    <div className="h-1 bg-slate-100 w-4/5 rounded-full"></div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-white border-t border-slate-100 py-24 relative z-10 w-full">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-slate-900 tracking-tight"
            >
              How It Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-xl text-slate-500 font-medium"
            >
              From an old document to a hired candidate in three simple steps.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 text-center relative z-10 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary-100">
                  <step.icon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-500 text-[17px] leading-relaxed font-medium">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 text-center bg-[#f4f7f9] relative z-10 overflow-hidden w-full">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-[#1a2b53] mb-12 tracking-tight"
          >
            Why Use SmartATS?
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left mx-auto max-w-2xl">
            {['Optimized for ATS bots', 'Professional typography', 'Clean, minimalistic design', 'Free to use & download'].map((item, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-200"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="p-2 bg-[#dcfce7] rounded-full">
                  <CheckCircle className="w-6 h-6 text-[#16a34a] flex-shrink-0" />
                </div>
                <span className="text-slate-800 font-bold text-[17px]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
