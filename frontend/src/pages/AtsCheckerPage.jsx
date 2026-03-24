import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Lock, ShieldCheck, CheckCircle2, XCircle, AlertCircle, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AtsAnalysisView from '../components/AtsAnalysisView';
import checkerHero from '../assets/checker-hero.png';

export default function AtsCheckerPage() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', uploadedFile);

    try {
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to analyze resume');

      const data = await response.json();
      setAnalysisResult(data.analysis);
    } catch (err) {
      console.error(err);
      setError('Something went wrong during analysis. Please try a standard PDF.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetChecker = () => {
    setFile(null);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] relative bg-white overflow-y-auto custom-scrollbar">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-emerald-100/50 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-indigo-100/50 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {!analysisResult && !isAnalyzing ? (
            <motion.div 
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left Column: Copy */}
              <div>
                <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-4 block">Resume Checker</span>
                <h1 className="text-6xl font-black text-slate-900 leading-[1.1] mb-8">
                  Is your resume <br /> 
                  <span className="text-slate-400">good enough?</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-lg">
                  A free and fast smart resume checker doing 16 crucial checks to ensure your resume is ready to perform and get you interview callbacks.
                </p>

                {/* Upload Box */}
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="group relative border-2 border-dashed border-emerald-200 bg-emerald-50/10 hover:bg-emerald-50/30 hover:border-emerald-400 rounded-[2.5rem] p-12 transition-all cursor-pointer text-center"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".pdf"
                    onChange={handleFileUpload} 
                  />
                  <p className="text-slate-600 font-semibold mb-6">
                    Drop your resume here or choose a file. <br />
                    <span className="text-slate-400 text-sm font-medium">PDF only. Max 5MB file size.</span>
                  </p>
                  
                  <button className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 transition-all inline-flex items-center gap-3">
                    Upload Your Resume <Upload className="w-5 h-5" />
                  </button>

                  <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-sm font-bold">
                    <Lock className="w-4 h-4" /> Privacy guaranteed
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Hero Illustration */}
              <div className="hidden lg:block">
                <motion.div 
                  initial={{ rotate: -2, opacity: 0, scale: 0.9 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1, y: [0, -20, 0] }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    opacity: { duration: 1 },
                    scale: { duration: 1 }
                  }}
                  className="relative p-4"
                >
                  <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full" />
                  <img 
                    src={checkerHero} 
                    alt="Premium ATS Scanner" 
                    className="w-full h-auto drop-shadow-[0_45px_90px_rgba(16,185,129,0.2)] rounded-[4rem] relative z-10 border border-white/40 shadow-2xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          ) : isAnalyzing ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[400px] text-center"
            >
              <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-8" />
              <h2 className="text-3xl font-black text-slate-900 mb-4">Scanning your resume...</h2>
              <p className="text-slate-500 font-medium">Running 16 crucial ATS checks against local benchmarks.</p>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Left Side: Score & Core Checks (lg:col-span-4) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 text-center">
                  <h3 className="text-lg font-bold text-slate-800 mb-8">Resume Score</h3>
                  <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="72" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                      <motion.circle
                        cx="80" cy="80" r="72" fill="transparent" stroke="#10b981" strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 72}
                        initial={{ strokeDashoffset: 2 * Math.PI * 72 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 72 * (1 - analysisResult.score / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-slate-900">{analysisResult.score}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">/ 100</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-500 mb-8">{analysisResult.feedback.critical.length} issues found</p>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CONTENT</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">GOOD</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">STYLE</span>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">WEAK</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">FORMAT</span>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">POOR</span>
                    </div>
                  </div>

                  <button 
                    onClick={resetChecker}
                    className="w-full mt-8 py-4 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition"
                  >
                    <RefreshCcw className="w-4 h-4" /> Try Another
                  </button>
                </div>
              </div>

              {/* Right Side: Detailed Analysis (lg:col-span-8) */}
              <div className="lg:col-span-8">
                <div className="bg-slate-50/50 rounded-[3rem] p-8 border border-slate-100">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Detailed Checks</h2>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">ATS PARSE RATE & IMPACT</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Content Section */}
                    {analysisResult.feedback.critical.concat(analysisResult.feedback.improvements).map((issue, i) => (
                      <div key={i} className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="mt-1">
                          {i < 2 ? <XCircle className="w-5 h-5 text-rose-500" /> : <AlertCircle className="w-5 h-5 text-amber-500" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm mb-1">{issue}</h4>
                          <p className="text-xs text-slate-400 font-medium">Impact: High Review Likelihood</p>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                    
                    {analysisResult.feedback.good.map((item, i) => (
                      <div key={`good-${i}`} className="flex gap-4 p-5 bg-white/50 rounded-3xl border border-dashed border-emerald-100 relative opacity-80">
                        <div className="mt-1">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm mb-1">{item}</h4>
                          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Verified Pass</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-center rounded-2xl font-bold text-sm"
          >
            {error}
          </motion.div>
        )}

      </div>
    </div>
  );
}

