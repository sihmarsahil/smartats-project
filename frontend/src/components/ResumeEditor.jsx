import { Plus, Trash2, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', bounce: 0.3, duration: 0.8 }
  }
};

export default function ResumeEditor({ data, onChange }) {
  const [showExtended, setShowExtended] = useState(false);
  const [skillsText, setSkillsText] = useState((data.skills || []).join(', '));
  
  useEffect(() => {
    const currentArray = (data.skills || []).join(', ');
    if (currentArray && !skillsText) {
      setSkillsText(currentArray);
    }
  }, [data.skills]);

  const updateNestedField = (section, index, field, value) => {
    const newList = [...data[section]];
    newList[index] = { ...newList[index], [field]: value };
    onChange({ ...data, [section]: newList });
  };

  const handleDateChange = (section, index, field, value) => {
    if (value !== '' && !/^present$/i.test(value) && !/^[0-9/.\-\s]+$/.test(value)) {
      alert("Please use numeric format (e.g. 2023) or 'Present'.");
      return; 
    }
    updateNestedField(section, index, field, value);
  };

  const addField = (section, defaultObj) => {
    const newList = data[section] ? [...data[section]] : [];
    onChange({ ...data, [section]: [...newList, defaultObj] });
  };

  const removeField = (section, index) => {
    const newList = [...data[section]];
    newList.splice(index, 1);
    onChange({ ...data, [section]: newList });
  };

  const handleSkillsChange = (e) => {
    setSkillsText(e.target.value);
    const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s);
    onChange({ ...data, skills: skillsArray });
  };

  const updateArrayFieldString = (section, index, value) => {
    const newList = [...data[section]];
    newList[index] = value;
    onChange({ ...data, [section]: newList });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, photoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 sm:space-y-8 pb-20">
      
      {/* Profile Photo - Responsive Stack */}
      <motion.section variants={itemVariants} className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden cursor-pointer">
          {data.photoUrl ? <img src={data.photoUrl} className="w-full h-full object-cover" /> : <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300" />}
          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handlePhotoUpload} />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Profile Photo</h3>
          <p className="text-xs text-slate-400 mt-1">Upload a professional photo (Optional)</p>
          {data.photoUrl && <button className="text-red-500 text-xs mt-2 font-bold" onClick={() => onChange({ ...data, photoUrl: '' })}>Remove</button>}
        </div>
      </motion.section>

      {/* Personal Info - Responsive Grid */}
      <motion.section variants={itemVariants} className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 mb-4 border-b pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['fullName', 'title', 'email', 'phone'].map((field) => (
            <div key={field}>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input 
                type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                value={data.personalInfo?.[field] || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, [field]: e.target.value}})}
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Social Links - Responsive Layout */}
      <motion.section variants={itemVariants} className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 mb-4 border-b pb-2">Links & Profiles</h3>
        <div className="space-y-3">
          {['linkedin', 'github', 'leetcode'].map((platform) => (
            <div key={platform} className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <input 
                placeholder={`${platform} ID`} className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                value={data.personalInfo?.[`${platform}Name`] || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, [`${platform}Name`]: e.target.value}})}
              />
              <input 
                placeholder={`${platform} URL`} className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                value={data.personalInfo?.[platform] || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, [platform]: e.target.value}})}
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Experience - Mobile Optimized */}
      <motion.section variants={itemVariants} className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-black text-slate-900">Experience</h3>
          <button onClick={() => addField('experience', { title: '', company: '', startDate: '', endDate: '', description: '' })} className="text-indigo-600 font-bold text-xs flex items-center gap-1"><Plus className="w-3 h-3"/> Add Role</button>
        </div>
        <div className="space-y-4">
          {(data.experience || []).map((exp, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative">
              <button onClick={() => removeField('experience', index)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
              <div className="grid grid-cols-1 gap-3 pr-6">
                <input placeholder="Job Title" className="px-3 py-2 rounded-lg border border-slate-200 text-sm" value={exp.title} onChange={(e) => updateNestedField('experience', index, 'title', e.target.value)} />
                <input placeholder="Company" className="px-3 py-2 rounded-lg border border-slate-200 text-sm" value={exp.company} onChange={(e) => updateNestedField('experience', index, 'company', e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                   <input placeholder="Start" className="px-3 py-2 rounded-lg border border-slate-200 text-xs" value={exp.startDate} onChange={(e) => handleDateChange('experience', index, 'startDate', e.target.value)} />
                   <input placeholder="End" className="px-3 py-2 rounded-lg border border-slate-200 text-xs" value={exp.endDate} onChange={(e) => handleDateChange('experience', index, 'endDate', e.target.value)} />
                </div>
                <textarea placeholder="Bullet points..." rows="3" className="px-3 py-2 rounded-lg border border-slate-200 text-sm" value={exp.description} onChange={(e) => updateNestedField('experience', index, 'description', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Skills - Responsive Textarea */}
      <motion.section variants={itemVariants} className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 mb-2">Skills</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase mb-3">Comma separated</p>
        <textarea 
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          value={skillsText} onChange={handleSkillsChange} rows="3"
        />
      </motion.section>

    </motion.div>
  );
}
