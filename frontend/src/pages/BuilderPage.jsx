import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, LayoutTemplate, Sparkles, ShieldCheck, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import { sampleResumes } from '../utils/sampleData';
import ResumeEditor from '../components/ResumeEditor';
import LivePreview from '../components/LivePreview';
import OnboardingSection from '../components/OnboardingSection';
import AtsAnalysisView from '../components/AtsAnalysisView';
import MinimalTemplate from '../templates/MinimalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import DetailedTemplate from '../templates/DetailedTemplate';
import TemplateSelectorModal from '../components/TemplateSelectorModal';

export default function BuilderPage() {
  const PRESET_COLORS = ['#2563eb', '#0f172a', '#16a34a', '#dc2626', '#9333ea', '#ea580c', '#0891b2', '#BE185D'];

  const [activeTab, setActiveTab] = useState('upload'); 
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'analyze'
  const [resumeData, setResumeData] = useState(null);
  const [template, setTemplate] = useState('modern');
  const [themeColor, setThemeColor] = useState('#2563eb'); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync viewMode if resumeData is cleared
  useEffect(() => {
    if (!resumeData) {
      setViewMode('edit');
    }
  }, [resumeData]);

  const handleSelectSample = (data) => {
    setResumeData(data);
    setActiveTab('edit');
    // If it has analysis, maybe start in analyze mode? No, edit is better.
    setViewMode('edit');
  };

  const handleStartBlank = () => {
    setResumeData({
      personalInfo: { fullName: '', email: '', phone: '', title: '', linkedin: '', github: '' },
      summary: '',
      skills: [],
      experience: [],
      education: [],
      projects: [],
      certificates: [],
      achievements: []
    });
    setActiveTab('edit');
    setViewMode('edit');
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 overflow-hidden h-[calc(100vh-80px)] bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      
      {/* Premium Animated Blobs Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-300/40 to-purple-300/40 blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-bl from-blue-300/30 to-indigo-400/30 blur-[120px]"
        />
      </div>

      <TemplateSelectorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        currentTemplate={template}
        onSelectTemplate={setTemplate}
        themeColor={themeColor}
        onChangeColor={setThemeColor}
      />

      {/* Left Sidebar - Editor / Onboarding */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
        className="w-full lg:w-[55%] flex flex-col bg-white/70 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white/80 overflow-hidden h-full z-10 ring-1 ring-slate-900/5"
      >
        <div className="p-5 md:p-6 border-b border-indigo-100/50 flex flex-col gap-3 bg-white/50 backdrop-blur-md sticky top-0 z-20">
          {activeTab === 'edit' ? (
            <button 
              onClick={() => { setActiveTab('upload'); setResumeData(null); }}
              className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-indigo-600 w-fit transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Setup
            </button>
          ) : (
            <Link to="/" className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-indigo-600 w-fit transition">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          )}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {activeTab === 'upload' ? '1. Resume Setup' : viewMode === 'edit' ? '2. Edit Details' : 'ATS Analysis'}
            </h2>
            
            {activeTab === 'edit' && resumeData && (
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button 
                  onClick={() => setViewMode('edit')}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition",
                    viewMode === 'edit' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Edit3 className="w-3.5 h-3.5" /> Editor
                </button>
                <button 
                  onClick={() => setViewMode('analyze')}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition",
                    viewMode === 'analyze' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> ATS Score
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-transparent custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'upload' ? (
              <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <OnboardingSection 
                  onSelectSample={handleSelectSample} 
                  onStartBlank={handleStartBlank} 
                />
              </motion.div>
            ) : viewMode === 'analyze' && resumeData?.analysis ? (
              <motion.div key="analysis" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <AtsAnalysisView analysis={resumeData.analysis} />
              </motion.div>
            ) : (
              resumeData && (
                <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ResumeEditor data={resumeData} onChange={setResumeData} />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Sidebar - Preview & Export */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.2, delay: 0.1 }}
        className="w-full lg:w-[45%] flex flex-col gap-5 h-full z-10"
      >
        {/* Top Controls Toolbar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-white p-4 flex justify-between items-center ring-1 ring-slate-900/5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm rounded-xl transition-colors group"
            >
              <LayoutTemplate className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Change Design
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Download Button */}
            {resumeData ? (
              <PDFDownloadLink
                document={
                  template === 'modern' ? <ModernTemplate data={resumeData} themeColor={themeColor} /> :
                  template === 'classic' ? <ClassicTemplate data={resumeData} themeColor={themeColor} /> :
                  template === 'detailed' ? <DetailedTemplate data={resumeData} themeColor={themeColor} /> :
                  <MinimalTemplate data={resumeData} themeColor={themeColor} />
                }
                fileName={`SmartATS_${template}_Resume.pdf`}
              >
                {({ loading }) => (
                  <button 
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition shadow-sm disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    {loading ? 'Generating...' : 'Download PDF'}
                  </button>
                )}
              </PDFDownloadLink>
            ) : (
              <button 
                disabled
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-400 text-sm font-medium rounded-lg cursor-not-allowed"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            )}
          </div>
        </div>

        {/* Live Preview Pane */}
        <div className="flex-1 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white/80 overflow-hidden relative ring-1 ring-slate-900/5">
          {resumeData ? (
            <LivePreview data={resumeData} template={template} themeColor={themeColor} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-600 mb-8 shadow-xl shadow-indigo-100"
              >
                <Sparkles className="w-12 h-12" />
              </motion.div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                Craft Your <br />
                <span className="text-indigo-600">Career Story</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium mb-10 max-w-sm">
                Choose a template or upload your resume to see the magic happen. Your dream job starts here.
              </p>
              
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-xl font-black text-indigo-600 mb-1">98%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ATS Verified</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-xl font-black text-indigo-600 mb-1">Instantly</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score Ready</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
