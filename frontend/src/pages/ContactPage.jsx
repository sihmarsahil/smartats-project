import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Info */}
          <div className="p-8 md:p-12 bg-slate-50 border-r border-surface-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-primary-600 mt-1 mr-4" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Phone</h4>
                  <a href="tel:+918053152323" className="mt-1 text-slate-600 hover:text-primary-600 text-lg">+91 8053152323</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-primary-600 mt-1 mr-4" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Email</h4>
                  <a href="mailto:sahilsihmar0077@gmail.com" className="mt-1 text-slate-600 hover:text-primary-600 text-lg">sahilsihmar0077@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-primary-600 mt-1 mr-4" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Location</h4>
                  <p className="mt-1 text-slate-600 text-lg">India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form placeholder (Visual only) */}
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! We will contact you soon."); }}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="john@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea rows="4" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="How can we help?" required></textarea>
              </div>
              <button className="w-full bg-primary-600 text-white font-medium py-3 rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2">
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
