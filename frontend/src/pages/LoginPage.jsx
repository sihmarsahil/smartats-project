import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, Loader2, Zap, Layout, Flame, Shield, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [mode, setMode] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-600/20 blur-[80px] sm:blur-[150px] rounded-full" 
        />
      </div>

      {/* Top Header Logo */}
      <div className="relative z-10 p-5 sm:p-8 w-full max-w-[1400px] mx-auto flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center p-[1px]">
            <div className="w-full h-full bg-[#020617] rounded-xl flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
            </div>
        </div>
        <span className="text-xl sm:text-2xl font-black text-white tracking-tighter">Smart<span className="text-emerald-500">ATS</span></span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-5 sm:px-10 lg:px-20 py-6 sm:py-10 lg:py-0 gap-10 lg:gap-24 w-full max-w-[1300px] mx-auto">
        
        {/* Left Section: Value Props */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 sm:space-y-6 mb-6 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> Powered by Intelligence
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-[60px] leading-[1.1] font-black text-white tracking-tight">
              Create a resume that <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">wins jobs.</span>
            </h1>
          </motion.div>

          {/* Hidden on small mobile to save space, shown from sm up */}
          <div className="hidden sm:flex flex-col space-y-6">
            {[
              { icon: Layout, title: 'Optimized Templates', color: 'text-emerald-400' },
              { icon: Zap, title: 'Instant Score', color: 'text-indigo-400' }
            ].map((prop, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <prop.icon className={`w-5 h-5 ${prop.color}`} />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{prop.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Sign In Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[440px] lg:max-w-[480px] bg-white/[0.03] backdrop-blur-3xl rounded-[2rem] p-8 sm:p-10 lg:p-12 border border-white/[0.08] shadow-2xl relative overflow-hidden"
        >
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8 tracking-tight">
            {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 sm:py-5 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500/50 transition-all font-semibold text-white placeholder:text-slate-600 text-base shadow-inner"
              />
              <input 
                type="password" 
                placeholder="Password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 sm:py-5 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500/50 transition-all font-semibold text-white placeholder:text-slate-600 text-base shadow-inner"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-400 text-[10px] font-bold text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-emerald-500 to-indigo-600 text-white font-black py-4 sm:py-5 rounded-xl shadow-xl text-lg transition-all flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === 'signup' ? 'Access SmartATS' : 'Login Proceed')}
            </motion.button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center space-y-3 relative z-10">
            <p className="text-slate-400 font-bold text-xs sm:text-sm">
              {mode === 'signup' ? 'Already a user?' : 'New here?'} 
              <button 
                onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                className="text-emerald-500 ml-2 hover:underline decoration-emerald-500/30"
              >
                {mode === 'signup' ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer Decoration */}
      <div className="relative z-10 py-8 text-center opacity-30">
          <p className="text-[8px] text-white font-black uppercase tracking-widest">Institutional Grade Security</p>
      </div>
    </div>
  );
}
