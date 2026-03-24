import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, ArrowRight } from 'lucide-react';

export default function AtsAnalysisView({ analysis }) {
  if (!analysis) return null;

  const { score, feedback, instructions } = analysis;

  const getScoreColor = (s) => {
    if (s >= 80) return '#10b981'; // Emerald 500
    if (s >= 50) return '#f59e0b'; // Amber 500
    return '#ef4444'; // Red 500
  };

  const getScoreLabel = (s) => {
    if (s >= 80) return 'Strong';
    if (s >= 50) return 'Good';
    return 'Needs Work';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Score Header */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow-xl flex flex-col items-center text-center">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96" cy="96" r="88"
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth="12"
            />
            <motion.circle
              cx="96" cy="96" r="88"
              fill="transparent"
              stroke={getScoreColor(score)}
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 88}
              initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - score / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-slate-900"
            >
              {score}
            </motion.span>
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">ATS Score</span>
          </div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-slate-900">Your Resume is {getScoreLabel(score)}!</h2>
          <p className="text-slate-500 mt-2 max-w-md">
            We've analyzed your resume against {score}% of typical industry ATS standards. Follow the instructions below to hit 100%.
          </p>
        </div>
      </div>

      {/* Actionable Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Must Fix */}
        {feedback.critical.length > 0 && (
          <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
            <div className="flex items-center gap-2 mb-4 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold uppercase text-xs tracking-widest">Must Fix Critical Issues</h3>
            </div>
            <ul className="space-y-3">
              {feedback.critical.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-red-800">
                  <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Should Improve */}
        {feedback.improvements.length > 0 && (
          <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
            <div className="flex items-center gap-2 mb-4 text-amber-600">
              <Info className="w-5 h-5" />
              <h3 className="font-bold uppercase text-xs tracking-widest">Optimizations Needed</h3>
            </div>
            <ul className="space-y-3">
              {feedback.improvements.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-amber-800">
                  <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Step by Step Guide */}
      <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-primary-400" />
          Step-by-Step Improvement Plan
        </h3>
        <div className="space-y-4">
          {instructions.map((inst, i) => {
            const isCritical = inst.includes('CRITICAL');
            const isImprovement = inst.includes('Improvement');
            const isProTip = inst.includes('Pro Tip');
            const isStrength = inst.includes('Strength');

            let bgColor = "bg-white/5";
            let borderColor = "border-white/10";
            let iconColor = "text-white/50";
            let label = "";

            if (isCritical) {
              bgColor = "bg-red-500/10";
              borderColor = "border-red-500/20";
              iconColor = "text-red-400";
              label = "CRITICAL";
            } else if (isImprovement) {
              bgColor = "bg-amber-500/10";
              borderColor = "border-amber-500/20";
              iconColor = "text-amber-400";
              label = "IMPROVEMENT";
            } else if (isProTip) {
              bgColor = "bg-indigo-500/15";
              borderColor = "border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]";
              iconColor = "text-indigo-300";
              label = "EXPERT PRO TIP";
            } else if (isStrength) {
              bgColor = "bg-emerald-500/10";
              borderColor = "border-emerald-500/20";
              iconColor = "text-emerald-400";
              label = "STRENGTH";
            }

            return (
              <motion.div 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                className={`flex items-start gap-4 p-5 ${bgColor} rounded-[1.5rem] border ${borderColor} transition-all hover:scale-[1.01]`}
              >
                <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${iconColor} bg-current shadow-[0_0_10px_currentColor]`} />
                <div>
                  {label && (
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${iconColor} mb-1 block`}>
                      {label}
                    </span>
                  )}
                  <p className="text-slate-100 text-sm font-medium leading-relaxed">
                    {inst.replace(/^[❌⚠️💡✅]\s*(CRITICAL Fix:|Improvement:|Pro Tip:|Strength:)?\s*/i, '')}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Good Points */}
      {feedback.good.length > 0 && (
        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
          <div className="flex items-center gap-2 mb-4 text-emerald-600">
            <CheckCircle className="w-5 h-5" />
            <h3 className="font-bold uppercase text-xs tracking-widest">What you did well</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {feedback.good.map((item, i) => (
              <span key={i} className="px-3 py-1 bg-white rounded-full border border-emerald-100 text-xs text-emerald-700 font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
