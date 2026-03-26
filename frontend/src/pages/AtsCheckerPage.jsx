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
      const response = await fetch('https://smartats-backend-sl6i.onrender.com/api/upload', {
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
    <div className="flex-1 w-full min-h-[calc(100vh-80px)] relative bg-white overflow-x-hidden overflow-y-auto">

      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-gradient-to-bl from-emerald-100/50 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-[60%] h-[40%] bg-gradient-to-tr from-indigo-100/50 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">

        {/* Navigation */}
        <div className="mb-8 sm:mb-12">
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              <div className="text-center lg:text-left">
                <span className="text-indigo-600 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-3 block">Resume Checker</span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                  Is your resume <br className="hidden sm:block" />
                  <span className="text-slate-400">good enough?</span>
                </h1>
                <p className="text-sm sm:text-xl text-slate-500 font-medium leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                  A smart AI checker doing 16 crucial checks to ensure your resume gets interview callbacks.
                </p>

                {/* Upload Box */}
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="group relative border-2 border-dashed border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/40 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 transition-all cursor-pointer text-center"
                >
                  <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileUpload} />
                  <p className="text-slate-600 font-semibold mb-4 text-sm sm:text-base">
                    Drop your resume here or choose a file. <br />
                    <span className="text-slate-400 text-[10px] sm:text-sm font-medium">PDF only. Max 5MB size.</span>
                  </p>

                  <button className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 bg-emerald-500 text-white font-black rounded-xl sm:rounded-2xl shadow-lg transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                    Upload Resume <Upload className="w-4 h-4" />
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                    <Lock className="w-3 h-3" /> Privacy guaranteed
                  </div>
                </div>
              </div>

              {/* Illustration - Hidden on mobile/tablet */}
              <div className="hidden lg:block">
                <div className="relative p-4 max-w-[500px] mx-auto">
                  <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full" />
                  <img src={checkerHero} alt="Scanner" className="w-full h-auto drop-shadow-2xl rounded-[3rem] relative z-10" />
                </div>
              </div>
            </motion.div>
          ) : isAnalyzing ? (
            <motion.div key="loading" className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
              <div className="w-12 h-12 sm:w-20 sm:h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6" />
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-2">Scanning your resume...</h2>
              <p className="text-slate-400 font-medium text-xs sm:text-base">Running 16 crucial ATS checks against benchmarks.</p>
            </motion.div>
          ) : (
            <motion.div key="results" className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-10">
              
              {/* Score Column */}
              <div className="lg:col-span-4 order-1">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl text-center">
                  <h3 className="text-sm sm:text-lg font-bold text-slate-800 mb-6">Resume Score</h3>
                  <div className="relative w-28 h-28 sm:w-40 sm:h-40 mx-auto flex items-center justify-center mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                      <motion.circle
                        cx="50%" cy="50%" r="40%" fill="transparent" stroke="#10b981" strokeWidth="8"
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: "251.2" }}
                        animate={{ strokeDashoffset: 251.2 * (1 - analysisResult.score / 100) }}
                        transition={{ duration: 1.5 }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl sm:text-4xl font-black text-slate-900">{analysisResult.score}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">/ 100</span>
                    </div>
                  </div>
                  <button onClick={resetChecker} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition text-xs sm:text-sm">
                    <RefreshCcw className="w-4 h-4" /> Try Another
                  </button>
                </div>
              </div>

              {/* Details Column */}
              <div className="lg:col-span-8 order-2">
                <div className="bg-slate-50/50 rounded-3xl p-5 sm:p-8 border border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-widest">Analysis Report</h2>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {analysisResult.feedback.critical.concat(analysisResult.feedback.improvements).map((issue, i) => (
                      <div key={i} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                        {i < 2 ? <XCircle className="w-4 h-4 text-rose-500 mt-0.5" /> : <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />}
                        <p className="font-bold text-slate-800 text-[11px] sm:text-sm">{issue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
