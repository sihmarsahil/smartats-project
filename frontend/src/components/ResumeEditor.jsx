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
  
  // Sync skills text when data.skills changes externally
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
    // Allow numbers, spaces, slashes, dashes, and the word 'present' (case insensitive)
    // If it contains invalid string characters, alert and don't update
    if (value !== '' && !/^present$/i.test(value) && !/^[0-9/.\-\s]+$/.test(value)) {
      alert("Wrong input: Please input in numeric format (e.g. 2023 or 05/2023) or type 'Present'.");
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
        onChange({ ...data, photoUrl: reader.result }); // Base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-24"
    >
      {/* Profile Photo */}
      <motion.section variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-6 ring-1 ring-slate-900/5 group">
        <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden cursor-pointer hover:bg-slate-100 transition">
          {data.photoUrl ? (
            <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 text-slate-400" />
          )}
          <input 
            type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handlePhotoUpload} title="Upload Photo (Optional)"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Profile Photo (Optional)</h3>
          <p className="text-sm text-slate-500 mt-1">Click to upload a passport-sized or square photo.</p>
          {data.photoUrl && (
            <button className="text-red-500 text-sm mt-2 font-medium hover:text-red-700" onClick={() => onChange({ ...data, photoUrl: '' })}>
              Remove Photo
            </button>
          )}
        </div>
      </motion.section>

      {/* Personal Info */}
      <motion.section variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5">
        <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={data.personalInfo?.fullName || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, fullName: e.target.value}})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Professional Title</label>
            <input 
              type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={data.personalInfo?.title || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, title: e.target.value}})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={data.personalInfo?.email || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, email: e.target.value}})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <input 
              type="tel" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={data.personalInfo?.phone || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, phone: e.target.value}})}
            />
          </div>
        </div>

        <h4 className="font-semibold text-slate-800 mt-6 mb-3">Links & Profiles</h4>
        <div className="grid grid-cols-1 gap-4">
          {/* LinkedIn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">LinkedIn Display Name</label>
              <input 
                type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 text-sm"
                value={data.personalInfo?.linkedinName || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, linkedinName: e.target.value}})}
                placeholder="e.g. sahilsihmar"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Full Link URL</label>
              <input 
                type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 text-sm"
                value={data.personalInfo?.linkedin || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, linkedin: e.target.value}})}
                placeholder="https://linkedin.com/in/sahilsihmar"
              />
            </div>
          </div>
          {/* GitHub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">GitHub Display Name</label>
              <input 
                type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 text-sm"
                value={data.personalInfo?.githubName || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, githubName: e.target.value}})}
                placeholder="e.g. SahilCodes"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Full Link URL</label>
              <input 
                type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 text-sm"
                value={data.personalInfo?.github || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, github: e.target.value}})}
                placeholder="https://github.com/sahilsihmar"
              />
            </div>
          </div>
          {/* LeetCode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">LeetCode Display Name</label>
              <input 
                type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 text-sm"
                value={data.personalInfo?.leetcodeName || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, leetcodeName: e.target.value}})}
                placeholder="e.g. sahil_lc"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Full Link URL</label>
              <input 
                type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 text-sm"
                value={data.personalInfo?.leetcode || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, leetcode: e.target.value}})}
                placeholder="https://leetcode.com/u/sahilsihmar"
              />
            </div>
          </div>
          {/* HackerRank */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">HackerRank Name</label>
              <input 
                type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 text-sm"
                value={data.personalInfo?.hackerrankName || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, hackerrankName: e.target.value}})}
                placeholder="e.g. sahil_hr"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Full Link URL</label>
              <input 
                type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 text-sm"
                value={data.personalInfo?.hackerrank || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, hackerrank: e.target.value}})}
                placeholder="https://hackerrank.com/sahilsihmar"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Extended Details (For Detailed Template) */}
      <motion.section variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowExtended(!showExtended)}
        >
          <div>
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2">Extended Details (Biodata)</h3>
            <p className="text-xs text-slate-500 mt-1">Address, Father's Name, DOB, Hobbies, Strengths (Used in Detailed Template)</p>
          </div>
          {showExtended ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
        
        {showExtended && (
          <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Permanent Address</label>
              <textarea 
                rows="3" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={data.personalInfo?.address || ''} onChange={(e) => onChange({...data, personalInfo: {...data.personalInfo, address: e.target.value}})}
                placeholder="House No, Ward No, District, State, Pincode"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Father's Name</label>
                <input 
                  type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={data.extended?.fatherName || ''} onChange={(e) => onChange({...data, extended: {...(data.extended || {}), fatherName: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date of Birth</label>
                <input 
                  type="text" placeholder="e.g. 26-July-1998" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={data.extended?.dob || ''} onChange={(e) => onChange({...data, extended: {...(data.extended || {}), dob: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Marital Status</label>
                <input 
                  type="text" placeholder="e.g. Unmarried" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={data.extended?.maritalStatus || ''} onChange={(e) => onChange({...data, extended: {...(data.extended || {}), maritalStatus: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Known Languages</label>
                <input 
                  type="text" placeholder="e.g. English, Hindi, Punjabi" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={data.extended?.languages || ''} onChange={(e) => onChange({...data, extended: {...(data.extended || {}), languages: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Nationality</label>
                <input 
                  type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={data.extended?.nationality || 'Indian'} onChange={(e) => onChange({...data, extended: {...(data.extended || {}), nationality: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Gender</label>
                <input 
                  type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={data.extended?.gender || ''} onChange={(e) => onChange({...data, extended: {...(data.extended || {}), gender: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Religion</label>
                <input 
                  type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={data.extended?.religion || ''} onChange={(e) => onChange({...data, extended: {...(data.extended || {}), religion: e.target.value}})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-800">Strengths</h4>
                <button 
                  className="text-primary-600 hover:text-primary-800 flex items-center text-xs font-medium"
                  onClick={() => addField('strengths', '')}
                >
                  <Plus className="w-3 h-3 mr-1"/> Add Strength
                </button>
              </div>
              {(data.strengths || []).map((strength, index) => (
                <div key={index} className="flex gap-2">
                  <input 
                    type="text" className="flex-1 px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500 text-sm"
                    value={strength} onChange={(e) => updateArrayFieldString('strengths', index, e.target.value)}
                    placeholder="e.g. Adaptive, Sincere and Result Oriented."
                  />
                  <button onClick={() => removeField('strengths', index)} className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 rounded border border-slate-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <div className="flex justify-between items-center mt-6">
                <h4 className="text-sm font-bold text-slate-800">Hobbies and Interests</h4>
                <button 
                  className="text-primary-600 hover:text-primary-800 flex items-center text-xs font-medium"
                  onClick={() => addField('hobbies', '')}
                >
                  <Plus className="w-3 h-3 mr-1"/> Add Hobby
                </button>
              </div>
              {(data.hobbies || []).map((hobby, index) => (
                <div key={index} className="flex gap-2">
                  <input 
                    type="text" className="flex-1 px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500 text-sm"
                    value={hobby} onChange={(e) => updateArrayFieldString('hobbies', index, e.target.value)}
                    placeholder="e.g. Reading Books, Listening Music"
                  />
                  <button onClick={() => removeField('hobbies', index)} className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 rounded border border-slate-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input 
                  type="checkbox" 
                  checked={data.extended?.includeDeclaration !== false}
                  onChange={(e) => onChange({...data, extended: {...(data.extended || {}), includeDeclaration: e.target.checked}})}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                Include Declaration & Signature Section
              </label>
            </div>
          </div>
        )}
      </motion.section>

      {/* Summary */}
      <motion.section variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5">
        <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Professional Summary</h3>
        <textarea 
          rows="4" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={data.summary || ''} onChange={(e) => onChange({...data, summary: e.target.value})}
          placeholder="A brief summary of your professional background..."
        ></textarea>
      </motion.section>

      {/* Experience */}
      <motion.section variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-bold text-slate-900">Experience</h3>
          <button 
            className="text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium"
            onClick={() => addField('experience', { title: '', company: '', startDate: '', endDate: '', description: '' })}
          >
            <Plus className="w-4 h-4 mr-1"/> Add Role
          </button>
        </div>
        
        <div className="space-y-6">
          {(data.experience || []).map((exp, index) => (
            <div key={index} className="relative p-4 bg-slate-50 border border-slate-100 rounded-lg">
              <button onClick={() => removeField('experience', index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Job Title</label>
                  <input 
                    type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                    value={exp.title} onChange={(e) => updateNestedField('experience', index, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Company</label>
                  <input 
                    type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                    value={exp.company} onChange={(e) => updateNestedField('experience', index, 'company', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Start Date (Numeric/Year)</label>
                    <input 
                      type="text" placeholder="e.g. 2021 or 05/2021" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                      value={exp.startDate} onChange={(e) => handleDateChange('experience', index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">End Date</label>
                    <input 
                      type="text" placeholder="e.g. 2023 or Present" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                      value={exp.endDate} onChange={(e) => handleDateChange('experience', index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</label>
                <textarea 
                  rows="3" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={exp.description} onChange={(e) => updateNestedField('experience', index, 'description', e.target.value)}
                  placeholder="Use bullet points (•) for impact statements"
                ></textarea>
              </div>
            </div>
          ))}
          {(!data.experience || data.experience.length === 0) && <p className="text-sm text-slate-500 italic">No experience added yet.</p>}
        </div>
      </motion.section>

      {/* Education */}
      <motion.section variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-bold text-slate-900">Education</h3>
          <button 
            className="text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium"
            onClick={() => addField('education', { degree: '', school: '', startDate: '', endDate: '' })}
          >
            <Plus className="w-4 h-4 mr-1"/> Add Education
          </button>
        </div>
        
        <div className="space-y-4">
          {(data.education || []).map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative p-4 bg-slate-50 border border-slate-100 rounded-lg">
              <button onClick={() => removeField('education', index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="col-span-1 pr-6">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Degree / Certificate</label>
                <input 
                  type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={edu.degree} onChange={(e) => updateNestedField('education', index, 'degree', e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">School / University</label>
                <input 
                  type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={edu.school} onChange={(e) => updateNestedField('education', index, 'school', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 md:col-span-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Start Date (Numeric)</label>
                  <input 
                    type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500" placeholder="e.g. 2018"
                    value={edu.startDate} onChange={(e) => handleDateChange('education', index, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">End Date (Numeric)</label>
                  <input 
                    type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500" placeholder="e.g. 2022"
                    value={edu.endDate} onChange={(e) => handleDateChange('education', index, 'endDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          {(!data.education || data.education.length === 0) && <p className="text-sm text-slate-500 italic">No education added.</p>}
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-bold text-slate-900">Projects</h3>
          <button 
            className="text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium"
            onClick={() => addField('projects', { title: '', link: '', description: '' })}
          >
            <Plus className="w-4 h-4 mr-1"/> Add Project
          </button>
        </div>
        <div className="space-y-4">
          {(data.projects || []).map((proj, index) => (
            <div key={index} className="relative p-4 bg-slate-50 border border-slate-100 rounded-lg">
              <button onClick={() => removeField('projects', index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 pr-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Project Title</label>
                  <input 
                    type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                    value={proj.title} onChange={(e) => updateNestedField('projects', index, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Link (Optional)</label>
                  <input 
                    type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                    value={proj.link} onChange={(e) => updateNestedField('projects', index, 'link', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</label>
                <textarea 
                  rows="2" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={proj.description} onChange={(e) => updateNestedField('projects', index, 'description', e.target.value)}
                ></textarea>
              </div>
            </div>
          ))}
          {(!data.projects || data.projects.length === 0) && <p className="text-sm text-slate-500 italic">No projects added.</p>}
        </div>
      </motion.section>

      {/* Certificates */}
      <motion.section variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-bold text-slate-900">Certificates</h3>
          <button 
            className="text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium"
            onClick={() => addField('certificates', { name: '', issuer: '', date: '' })}
          >
            <Plus className="w-4 h-4 mr-1"/> Add Certificate
          </button>
        </div>
        <div className="space-y-4">
          {(data.certificates || []).map((cert, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 relative p-4 bg-slate-50 border border-slate-100 rounded-lg">
              <button onClick={() => removeField('certificates', index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="pr-6">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Certificate Name</label>
                <input 
                  type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={cert.name} onChange={(e) => updateNestedField('certificates', index, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Issuer</label>
                <input 
                  type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={cert.issuer} onChange={(e) => updateNestedField('certificates', index, 'issuer', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date (Numeric)</label>
                <input 
                  type="text" placeholder="e.g. 2022" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={cert.date} onChange={(e) => handleDateChange('certificates', index, 'date', e.target.value)}
                />
              </div>
            </div>
          ))}
          {(!data.certificates || data.certificates.length === 0) && <p className="text-sm text-slate-500 italic">No certificates added.</p>}
        </div>
      </motion.section>

      {/* Achievements */}
      <motion.section variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-bold text-slate-900">Achievements</h3>
          <button 
            className="text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium"
            onClick={() => addField('achievements', '')}
          >
            <Plus className="w-4 h-4 mr-1"/> Add Achievement
          </button>
        </div>
        <div className="space-y-3">
          {(data.achievements || []).map((achivement, index) => (
            <div key={index} className="flex gap-2">
              <input 
                type="text" className="flex-1 px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                value={achivement} onChange={(e) => updateArrayFieldString('achievements', index, e.target.value)}
                placeholder="e.g. Employee of the month, Hackathon winner, etc."
              />
              <button onClick={() => removeField('achievements', index)} className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 rounded border border-slate-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {(!data.achievements || data.achievements.length === 0) && <p className="text-sm text-slate-500 italic">No achievements added.</p>}
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5">
        <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Skills</h3>
        <p className="text-xs text-slate-500 mb-2">Separate skills with commas (e.g. React, Node.js, Python)</p>
        <textarea 
          rows="3" 
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={skillsText}
          onChange={handleSkillsChange}
        ></textarea>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {(data.skills || []).map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-surface-100 text-slate-700 text-sm rounded-full border border-surface-200">
              {skill}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Custom Sections */}
      <motion.section variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-slate-900/5 pb-12">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Custom Portions</h3>
            <p className="text-xs text-slate-500 mt-1">Add custom sections with your own headings.</p>
          </div>
          <button 
            className="text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium"
            onClick={() => addField('customSections', { title: 'New Portion', description: 'Portion details go here...' })}
          >
            <Plus className="w-4 h-4 mr-1"/> Add Portion
          </button>
        </div>
        
        <div className="space-y-6">
          {(data.customSections || []).map((section, index) => (
            <div key={index} className="relative p-4 bg-slate-50 border border-slate-100 rounded-lg">
              <button onClick={() => removeField('customSections', index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="pr-6 mb-3">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Portion Name / Heading</label>
                <input 
                  type="text" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={section.title} onChange={(e) => updateNestedField('customSections', index, 'title', e.target.value)}
                  placeholder="e.g. Publications, Volunteer Work, Languages"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Details</label>
                <textarea 
                  rows="3" className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500"
                  value={section.description} onChange={(e) => updateNestedField('customSections', index, 'description', e.target.value)}
                  placeholder="Enter the details for this custom portion"
                ></textarea>
              </div>
            </div>
          ))}
          {(!data.customSections || data.customSections.length === 0) && <p className="text-sm text-slate-500 italic">No custom portions added.</p>}
        </div>
      </motion.section>
    </motion.div>
  );
}
