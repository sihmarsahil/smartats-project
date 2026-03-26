 import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FileText, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import AtsCheckerPage from './pages/AtsCheckerPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const isHomePage = location.pathname === '/';
  useEffect(() => {
    try {
      const unsub = onAuthStateChanged(auth, (u) => setUser(u));
      return () => unsub();
    } catch (err) {
      console.error("Auth error:", err);
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col font-sans bg-surface-50">
        <nav className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-indigo-100/50 z-50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
            <Link to="/" className="group flex items-center gap-2 flex-shrink-0">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200"
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">
                Smart<span className="text-indigo-600">ATS</span>
              </span>
            </Link>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 bg-slate-100/50 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-slate-200/50">
                <Link 
                  to="/builder" 
                  className={`relative px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-black transition-all duration-300 ${
                    location.pathname === '/builder' 
                    ? "text-indigo-600" 
                    : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {location.pathname === '/builder' && (
                    <motion.div 
                      layoutId="nav-pill" 
                      className="absolute inset-0 bg-white shadow-sm rounded-lg sm:rounded-xl z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                    <Sparkles className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${location.pathname === '/builder' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="hidden xs:inline">Builder</span>
                    <span className="xs:hidden">Build</span>
                  </span>
                </Link>
                <Link 
                  to="/ats-checker" 
                  className={`relative px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-black transition-all duration-300 ${
                    location.pathname === '/ats-checker' 
                    ? "text-indigo-600" 
                    : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {location.pathname === '/ats-checker' && (
                    <motion.div 
                      layoutId="nav-pill" 
                      className="absolute inset-0 bg-white shadow-sm rounded-lg sm:rounded-xl z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 text-center">
                    <span className="hidden xs:inline">ATS Checker</span>
                    <span className="xs:hidden">Check</span>
                  </span>
                </Link>
              </div>
              {user ? (
                <button 
                  onClick={() => signOut(auth)}
                  className="px-3 sm:px-5 py-1.5 sm:py-2 bg-slate-950 text-white text-[10px] sm:text-xs font-black rounded-lg sm:rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200 flex-shrink-0"
                >
                  LOGOUT
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="px-3 sm:px-5 py-1.5 sm:py-2 bg-indigo-600 text-white text-[10px] sm:text-xs font-black rounded-lg sm:rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex-shrink-0"
                >
                  LOGIN
                </Link>
              )}
            </div>
          </div>
        </nav>
        
        <main className="flex-1 flex flex-col relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/ats-checker" element={<AtsCheckerPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
          </Routes>
        </main>
        
        {/* Footer ONLY on Home Page */}
        {isHomePage && (
          <footer className="bg-white border-t border-surface-200 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
              <p className="font-semibold text-slate-700">Build smart, get hired faster. © 2026 SmartATS</p>
              <div className="mt-4 space-x-6">
                <Link to="/about" className="hover:text-primary-600 transition-colors">About</Link>
                <Link to="/contact" className="hover:text-primary-600 transition-colors">Contact</Link>
                <Link to="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </footer>
        )}
      </div>
  );
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-10">
          <div className="max-w-md w-full bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
            <h1 className="text-2xl font-black mb-4 text-rose-500">System Error</h1>
            <p className="text-slate-400 mb-6 font-medium">{this.state.error?.message || "An unexpected error occurred."}</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              Restart SmartATS
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}
