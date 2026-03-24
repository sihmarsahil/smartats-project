import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import clsx from 'clsx';

const TEMPLATES = [
  { id: 'minimal', name: 'Minimal ATS', description: 'Clean, parseable, text-focused.' },
  { id: 'modern', name: 'Modern Professional', description: 'Contemporary layout with distinct sections.' },
  { id: 'classic', name: 'Classic Executive', description: 'Traditional serif styling for experienced roles.' },
  { id: 'detailed', name: 'Detailed Biodata', description: 'Extensive fields for traditional resumes.' },
];

const COLORS = ['#2563eb', '#0f172a', '#16a34a', '#dc2626', '#9333ea', '#ea580c', '#0891b2', '#BE185D'];

// Mini CSS wireframes representing each template's rough layout
const TemplateWireframe = ({ type, color }) => {
  if (type === 'minimal') {
    return (
      <div className="w-full h-full p-3 flex flex-col gap-2">
        <div className="w-1/2 h-4 rounded" style={{ backgroundColor: color }}></div>
        <div className="w-1/3 h-2 bg-slate-200 rounded mb-2"></div>
        <div className="w-full h-1 border-b" style={{ borderColor: color }}></div>
        <div className="w-1/4 h-2 bg-slate-300 rounded mt-1"></div>
        <div className="w-full h-1.5 bg-slate-100 rounded"></div>
        <div className="w-5/6 h-1.5 bg-slate-100 rounded"></div>
        <div className="w-1/4 h-2 bg-slate-300 rounded mt-1"></div>
        <div className="w-full h-1.5 bg-slate-100 rounded"></div>
      </div>
    );
  }
  if (type === 'modern') {
    return (
      <div className="w-full h-full p-3 flex flex-col gap-2">
        <div className="flex gap-2 items-center mb-1">
          <div className="w-full flex-1">
            <div className="w-3/4 h-4 rounded mb-1" style={{ backgroundColor: color }}></div>
            <div className="w-1/2 h-2 bg-slate-200 rounded"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200"></div>
        </div>
        <div className="w-1/3 h-2 rounded mb-1" style={{ backgroundColor: color }}></div>
        <div className="w-full h-1.5 bg-slate-100 rounded"></div>
        <div className="w-5/6 h-1.5 bg-slate-100 rounded"></div>
      </div>
    );
  }
  if (type === 'classic') {
    return (
      <div className="w-full h-full p-3 flex flex-col gap-1 items-center">
        <div className="w-8 h-8 rounded-full bg-slate-200 absolute top-3 left-3"></div>
        <div className="w-1/2 h-3 rounded" style={{ backgroundColor: color }}></div>
        <div className="w-1/3 h-1.5 bg-slate-200 rounded"></div>
        <div className="w-4/5 h-px bg-slate-300 my-1"></div>
        <div className="w-full flex flex-col gap-1 mt-2 items-start">
          <div className="w-1/4 h-2 rounded" style={{ backgroundColor: color }}></div>
          <div className="w-full h-1 bg-slate-100 rounded"></div>
          <div className="w-full h-1 bg-slate-100 rounded"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2">
      <div className="w-full h-4 rounded flex justify-center border" style={{ borderColor: color }}>
         <div className="w-1/2 h-2 mt-1 rounded" style={{ backgroundColor: color }}></div>
      </div>
      <div className="flex gap-2">
        <div className="w-6 h-8 border border-slate-300"></div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="w-1/2 h-1.5 bg-slate-200"></div>
          <div className="w-3/4 h-1.5 bg-slate-200"></div>
        </div>
      </div>
      <div className="w-full h-1 border-b" style={{ borderColor: color }}></div>
      <div className="w-full h-1.5 bg-slate-100 mt-1"></div>
    </div>
  );
};

export default function TemplateSelectorModal({ 
  isOpen, 
  onClose, 
  currentTemplate, 
  onSelectTemplate, 
  themeColor, 
  onChangeColor 
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Select Template & Theme</h2>
              <p className="text-slate-500 text-sm mt-1">Choose a design that best fits your industry and personality.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Grid Layout */}
          <div className="p-6 md:p-8 overflow-y-auto bg-slate-50 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {TEMPLATES.map((tmpl) => {
                const isActive = currentTemplate === tmpl.id;
                
                return (
                  <div key={tmpl.id} className="flex flex-col gap-4">
                    {/* Card Preview */}
                    <button
                      onClick={() => onSelectTemplate(tmpl.id)}
                      className={clsx(
                        "group relative aspect-[1/1.4] rounded-xl overflow-hidden bg-white shadow-sm border-2 transition-all duration-300 hover:shadow-xl focus:outline-none flex flex-col",
                        isActive ? "border-primary-500 ring-4 ring-primary-50" : "border-transparent hover:border-slate-200"
                      )}
                    >
                      {/* Wireframe UI rendering */}
                      <div className="absolute inset-0 bg-slate-50 flex items-center justify-center m-2 rounded-lg border border-slate-100 overflow-hidden relative">
                         <TemplateWireframe type={tmpl.id} color={isActive ? themeColor : '#cbd5e1'} />
                      </div>

                      {/* Selection Overlay */}
                      {isActive && (
                        <div className="absolute top-4 right-4 bg-primary-500 text-white p-1 rounded-full shadow-lg">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </button>

                    {/* Metadata & Controls */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{tmpl.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{tmpl.description}</p>
                      
                      {/* Color Dots matching the screenshot format */}
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {COLORS.map(color => (
                          <button
                            key={color}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTemplate(tmpl.id);
                              onChangeColor(color);
                            }}
                            className={clsx(
                              "w-6 h-6 rounded-full transition-transform focus:outline-none border-2",
                              (isActive && themeColor === color) 
                                ? "scale-110 shadow-sm border-white ring-2" 
                                : "border-transparent hover:scale-110"
                            )}
                            style={{ 
                              backgroundColor: color,
                              ...(isActive && themeColor === color ? { ringColor: color } : {})
                            }}
                            title={`Set to ${color}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
