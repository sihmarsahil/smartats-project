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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-sans relative overflow-hidden">
      
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
            animate={{ 
                x: [0, 100, 0], 
                y: [0, 50, 0],
                opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full" 
        />
        <motion.div 
            animate={{ 
                x: [0, -80, 0], 
                y: [0, 100, 0],
                opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full" 
        />
      </div>

      {/* Top Header Logo */}
      <div className="relative z-10 p-8 w-full max-w-[1400px] mx-auto flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center p-[1px] shadow-lg shadow-emerald-900/40">
            <div className="w-full h-full bg-[#020617] rounded-2xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-500" />
            </div>
        </div>
        <span className="text-2xl font-black text-white tracking-tighter">Smart<span className="text-emerald-500">ATS</span></span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-10 lg:py-0 gap-16 lg:gap-32 w-full max-w-[1300px] mx-auto">
        
        {/* Left Section: Value Props (Dark Styled) */}
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> Powered by Intelligence
            </div>
            <h1 className="text-[52px] lg:text-[64px] leading-[1.05] font-black text-white tracking-tight">
              Create a resume that <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">wins jobs.</span>
            </h1>
          </motion.div>

          <div className="space-y-8">
            {[
              { icon: Layout, title: 'Optimized Templates', desc: 'Recruiter-approved layouts built for speed.', color: 'text-emerald-400', border: 'border-emerald-500/20' },
              { icon: Zap, title: 'Instant Score', desc: 'Real-time feedback on your resumes effectiveness.', color: 'text-indigo-400', border: 'border-indigo-500/20' },
              { icon: Flame, title: 'Impact Visuals', desc: 'Stand out from the crowd with premium design.', color: 'text-rose-400', border: 'border-rose-500/20' }
            ].map((prop, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-center gap-5 group"
              >
                <div className={`p-4 rounded-2xl bg-white/5 border ${prop.border} backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                  <prop.icon className={`w-7 h-7 ${prop.color}`} />
                </div>
                <div>
                   <h3 className="text-lg font-black text-white mb-1 tracking-tight">{prop.title}</h3>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed">{prop.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Section: Sign In Card (Dark Glassmorphism) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full lg:w-[480px] bg-white/[0.03] backdrop-blur-[40px] rounded-[2.5rem] p-12 lg:p-14 border border-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.5)] relative overflow-hidden group/card"
        >
          {/* Internal Glow Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full group-hover/card:bg-emerald-500/20 transition-all duration-700" />
          
          <h2 className="text-3xl font-black text-white text-center mb-10 tracking-tight">
            {mode === 'signup' ? 'Create Account' : 'Sign In Now'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all font-semibold text-white placeholder:text-slate-600 text-lg shadow-inner"
                />
              </div>

              <div className="relative group">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all font-semibold text-white placeholder:text-slate-600 text-lg shadow-inner"
                />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-400 text-xs font-bold text-center bg-rose-500/10 py-3 rounded-xl border border-rose-500/20"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-black py-5 rounded-2xl shadow-2xl shadow-emerald-900/40 text-xl tracking-tight transition-all disabled:opacity-70 flex items-center justify-center group/btn"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  {mode === 'signup' ? 'Access SmartATS' : 'Login Proceed'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center space-y-4 relative z-10">
            <button className="text-slate-400 text-sm font-bold hover:text-white transition-colors">Recover Password</button>
            <p className="text-slate-400 font-bold text-sm">
              {mode === 'signup' ? 'Already using SmartATS?' : 'No account yet?'} 
              <button 
                onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                className="text-emerald-500 ml-2 hover:text-emerald-400 transition-colors underline underline-offset-4 decoration-emerald-500/30"
              >
                {mode === 'signup' ? 'Sign In Instead' : 'Create Free Profile'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer Decoration */}
      <div className="relative z-10 py-10 text-center opacity-30">
          <p className="text-[10px] text-white font-black uppercase tracking-[0.3em]">Institutional Grade Security • 256-bit Encryption</p>
      </div>
    </div>
  );
}
