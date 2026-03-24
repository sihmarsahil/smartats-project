import React from 'react';
import { motion } from 'framer-motion';
import { FilePlus, Upload, Sparkles, User, Briefcase, Palette, HeartPulse, ArrowRight, Target, Zap, ShieldCheck } from 'lucide-react';
import { sampleResumes } from '../utils/sampleData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const SampleCard = ({ sample, onSelect }) => {
  const icons = {
    'Software Engineer': Briefcase,
    'Marketing Manager': Target,
    'Graphic Designer': Palette,
    'Healthcare Admin': HeartPulse
  };
  const Icon = icons[sample.name] || User;

  return (
    <motion.button
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(sample.data)}
      className="flex flex-col items-center p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all text-center group w-full"
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-6">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{sample.name}</h3>
      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Ready-to-use</p>
    </motion.button>
  );
};

export default function OnboardingSection({ onSelectSample, onStartBlank }) {
  const fileInputRef = React.useRef(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to parse resume');
      const data = await response.json();
      onSelectSample(data);
    } catch (err) {
      console.error(err);
      setError('Failed to extract data. Please try a different PDF or use a sample.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-10 py-2 max-w-4xl mx-auto"
    >
      <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileUpload} />

      {/* Top Main Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start Blank */}
        <motion.div 
          variants={itemVariants}
          onClick={onStartBlank}
          whileHover={{ y: -8 }}
          className="cursor-pointer p-8 rounded-[3.5rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group border border-white/10 h-[280px] flex flex-col justify-end"
        >
          <div className="absolute top-[-10%] right-[-5%] p-6 opacity-10 group-hover:opacity-20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
            <FilePlus className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20">
              <Zap className="w-6 h-6 text-indigo-200" />
            </div>
            <h3 className="text-3xl font-black mb-2 flex items-center gap-3">
              Start from Scratch
            </h3>
            <p className="text-indigo-100 font-medium mb-8 text-sm leading-relaxed max-w-[240px]">
              Craft a perfect, modern resume from a clean slate.
            </p>
            <div className="inline-flex items-center gap-4 font-black bg-white text-indigo-700 px-8 py-3.5 rounded-2xl w-fit shadow-xl hover:scale-105 active:scale-95 transition-all">
              Create New <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        {/* Upload Existing PDF */}
        <motion.div 
          variants={itemVariants}
          onClick={() => fileInputRef.current.click()}
          whileHover={{ y: -8 }}
          className="cursor-pointer p-8 rounded-[3.5rem] bg-white border-2 border-dashed border-slate-200 relative group overflow-hidden h-[280px] flex flex-col justify-end hover:border-indigo-400 hover:bg-slate-50 transition-all shadow-xl shadow-slate-100"
        >
          {isUploading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_20px_rgba(79,70,229,0.2)]"></div>
              <p className="text-indigo-600 font-black text-lg tracking-tight">Extracting...</p>
            </div>
          )}

          <div className="absolute top-[-10%] right-[-5%] p-6 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700">
            <Upload className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
            </div>
            <h3 className="text-3xl font-black mb-2 text-slate-900 tracking-tight">
              Upload PDF
            </h3>
            <p className="text-slate-500 font-medium mb-8 text-sm leading-relaxed max-w-[240px]">
              {error ? <span className="text-rose-500 font-bold">{error}</span> : "Let our engine extract details from your current PDF."}
            </p>
            <div className="inline-flex items-center gap-4 font-black bg-slate-900 text-white px-8 py-3.5 rounded-2xl w-fit shadow-xl hover:bg-slate-800 transition-all">
              Browse Files <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pro Stats Banner */}
      <motion.div 
        variants={itemVariants}
        className="bg-indigo-50 rounded-3xl p-6 flex items-center justify-between border border-indigo-100 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-black text-slate-900">98% Success Rate</p>
            <p className="text-xs text-slate-500 font-medium italic">Our templates are verified to pass modern ATS filters.</p>
          </div>
        </div>
        <div className="hidden sm:flex gap-6 pr-4">
          <div className="text-center">
            <p className="text-lg font-black text-indigo-600">10k+</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Users</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-indigo-600">50+</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Formats</p>
          </div>
        </div>
      </motion.div>

      {/* Sample Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Or start with a professional sample</h4>
          <div className="flex-1 h-px bg-slate-100 italic"></div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleResumes.map(sample => (
            <SampleCard key={sample.id} sample={sample} onSelect={onSelectSample} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
