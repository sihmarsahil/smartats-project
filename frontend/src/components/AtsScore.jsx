import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export default function AtsScore({ data }) {
  if (!data) return null;
  
  let score = 0;
  let tips = [];
  
  if (data.personalInfo?.fullName && data.personalInfo?.email) {
    score += 15;
  } else {
    tips.push("Add full name and email address.");
  }
  
  if (data.summary && data.summary.trim().length > 50) {
    score += 15;
  } else {
    tips.push("Expand your professional summary (at least 50 chars).");
  }
  
  if (data.experience && data.experience.length > 0) {
    score += 25;
    const hasDescriptions = data.experience.some(exp => exp.description && exp.description.length > 20);
    if (!hasDescriptions) {
      score -= 10;
      tips.push("Add detailed bullet points to your experience.");
    }
  } else {
    tips.push("Add at least one work experience.");
  }
  
  if (data.education && data.education.length > 0) {
    score += 10;
  } else {
    tips.push("Include your educational background.");
  }

  if (data.projects && data.projects.length > 0) {
    score += 10;
  } else {
    tips.push("Add projects to showcase practical skills.");
  }
  
  if ((data.certificates && data.certificates.length > 0) || (data.achievements && data.achievements.length > 0)) {
    score += 5;
  } else {
    tips.push("Include certificates or achievements to stand out.");
  }
  
  if (data.skills && data.skills.length >= 5) {
    score += 20;
  } else {
    tips.push("List at least 5 key skills to pass ATS keyword filters.");
  }

  const getScoreColor = () => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-300";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-5 w-full mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          ATS Resume Score
        </h3>
        <div className={`px-3 py-1 text-sm rounded-full font-bold border ${getScoreColor()}`}>
          {score} / 100
        </div>
      </div>
      
      {score < 100 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">How to improve</p>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {score >= 80 && tips.length === 0 && (
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 p-2 rounded-lg mt-3">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Your resume is highly optimized for ATS platforms!</span>
        </div>
      )}
    </div>
  );
}
