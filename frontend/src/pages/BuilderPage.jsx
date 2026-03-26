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
  const [activeTab, setActiveTab] = useState('upload'); 
  const [viewMode, setViewMode] = useState('edit'); 
  const [resumeData, setResumeData] = useState(null);
  const [template, setTemplate] = useState('modern');
  const [themeColor, setThemeColor] = useState('#2563eb'); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!resumeData) setViewMode('edit');
  }, [resumeData]);

  const handleSelectSample = (data) => {
    setResumeData(data);
    setActiveTab('edit');
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
    <div className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 lg:h-[calc(100vh-80px)] lg:overflow-hidden bg-white relative overflow-x-hidden">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 blur-[100px] rounded-full" />
      </div>

      <TemplateSelectorModal 
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        currentTemplate={template} onSelectTemplate={setTemplate}
        themeColor={themeColor} onChangeColor={setThemeColor}
      />

      {/* Editor Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full lg:w-[55%] flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden z-10 min-h-[500px] lg:h-full"
      >
        <div className="p-4 sm:p-6 border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-md z-20">
          <div className="flex justify-between items-center mb-4">
             {activeTab === 'edit' ? (
                <button onClick={() => { setActiveTab('upload'); setResumeData(null); }} className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-400 hover:text-indigo-600">
                  <ArrowLeft className="w-3.5 h-3.5" /> Setup
                </button>
              ) : (
                <Link to="/" className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-400 hover:text-indigo-600">
                  <ArrowLeft className="w-3.5 h-3.5" /> Home
                </Link>
              )}
              {activeTab === 'edit' && (
                <div className="flex bg-slate-100 p-1 rounded-xl">
                   <button onClick={() => setViewMode('edit')} className={clsx("px-3 py-1.5 rounded-lg text-[10px] font-bold transition", viewMode === 'edit' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500")}>Editor</button>
                   <button onClick={() => setViewMode('analyze')} className={clsx("px-3 py-1.5 rounded-lg text-[10px] font-bold transition", viewMode === 'analyze' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500")}>Score</button>
                </div>
              )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {activeTab === 'upload' ? 'Resume Setup' : viewMode === 'edit' ? 'Edit Details' : 'ATS Score'}
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'upload' ? (
              <OnboardingSection onSelectSample={handleSelectSample} onStartBlank={handleStartBlank} />
            ) : viewMode === 'analyze' ? (
              <AtsAnalysisView analysis={resumeData?.analysis} />
            ) : (
              <ResumeEditor data={resumeData} onChange={setResumeData} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Preview Section */}
      <div className="w-full lg:w-[45%] flex flex-col gap-4 z-10 pb-10 lg:pb-0">
        <div className="bg-white p-3 rounded-2xl shadow-lg border border-slate-50 flex justify-between items-center">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl">
            <LayoutTemplate className="w-4 h-4" /> Design
          </button>
          
          {resumeData ? (
            <PDFDownloadLink
              document={
                template === 'modern' ? <ModernTemplate data={resumeData} themeColor={themeColor} /> :
                template === 'classic' ? <ClassicTemplate data={resumeData} themeColor={themeColor} /> :
                template === 'detailed' ? <DetailedTemplate data={resumeData} themeColor={themeColor} /> :
                <MinimalTemplate data={resumeData} themeColor={themeColor} />
              }
              fileName="SmartATS_Resume.pdf"
            >
              {({ loading }) => (
                <button disabled={loading} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md disabled:opacity-50 flex items-center gap-2">
                  <Download className="w-4 h-4" /> {loading ? '...' : 'PDF'}
                </button>
              )}
            </PDFDownloadLink>
          ) : (
            <div className="text-[10px] font-bold text-slate-300 uppercase">Preview Mode</div>
          )}
        </div>

        <div className="flex-1 min-h-[400px] lg:h-full bg-slate-100 rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden relative">
          {resumeData ? (
            <LivePreview data={resumeData} template={template} themeColor={themeColor} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white">
              <Sparkles className="w-12 h-12 text-indigo-600 mb-4 animate-pulse" />
              <h3 className="text-xl font-black text-slate-900 mb-2">Ready to start?</h3>
              <p className="text-xs text-slate-400 font-medium">Your resume preview will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
