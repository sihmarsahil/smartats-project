import { Link } from 'react-router-dom';
import { Target, Users, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          About <span className="text-primary-600">SmartATS</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          SmartATS is a next-generation resume intelligence platform built to bridge the gap between talented individuals and their dream careers. We believe that your skills and experience should speak louder than your formatting skills.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-8 md:p-12 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary-50 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <Target className="w-8 h-8 text-primary-500" />
            Our Mission
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Our mission is simple: to make applying for jobs frictionless and fair. Every day, thousands of highly qualified candidates are rejected by Applicant Tracking Systems (ATS) simply because their resumes cannot be easily parsed by automated software. 
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            We built SmartATS to ensure that when a recruiter looks at your resume, they see your potential. By providing smart, clean, and meticulously engineered ATS templates, we eliminate format-based rejections entirely.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
          <Zap className="w-10 h-10 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Simplicity First</h3>
          <p className="text-slate-600">
            We stripped away completely unnecessary complex design tools. By focusing on rapid parsing and easy-to-use forms, you can build a perfect resume in exactly three minutes.
          </p>
        </div>
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
          <Users className="w-10 h-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">User-Centric Design</h3>
          <p className="text-slate-600">
            Your data is yours. Custom sections, varied layouts, and robust privacy elements are all built-in. We constantly iterate based strictly on user feedback and recruiter surveys.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center bg-primary-600 rounded-2xl p-10 text-white shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to land your dream job?</h2>
        <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
          Stop struggling with Word document alignments and let SmartATS craft your perfect application document right now.
        </p>
        <Link to="/builder" className="inline-block bg-white text-primary-600 font-bold px-8 py-3 rounded-full hover:bg-slate-50 transition shadow-md">
          Build Your Resume
        </Link>
      </div>
    </div>
  );
}
