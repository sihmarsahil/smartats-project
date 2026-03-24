export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-slate-500">Last updated: March 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-600 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-surface-200">
        <h2 className="text-2xl font-bold text-slate-900 mt-0 mb-4">1. Introduction</h2>
        <p className="mb-6">
          Welcome to SmartATS. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Data We Collect</h2>
        <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier, marital status, title, date of birth and gender.</li>
          <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
          <li><strong>Professional Data:</strong> includes your employment history, educational background, skills, and portfolio links uploaded via your resume.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Data</h2>
        <p className="mb-4">
          The core function of SmartATS is to process your resume. When you upload a document, our automated systems instantly parse the text to map it to our structured builder. 
        </p>
        <p className="mb-6 font-medium text-slate-800 bg-slate-50 p-4 border-l-4 border-primary-500 rounded-r-lg">
          Important: We do not permanently store your uploaded resumes or the data generated after your session ends. Your data remains completely private and is only held in memory during your active session.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
        <p className="mb-6">
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact Us</h2>
        <p className="mb-0">
          If you have any questions about this privacy policy or our privacy practices, please contact us at: <br/>
          <strong className="text-slate-800">Email:</strong> sahilsihmar0077@gmail.com <br/>
          <strong className="text-slate-800">Phone:</strong> +91 8053152323
        </p>
      </div>
    </div>
  );
}
