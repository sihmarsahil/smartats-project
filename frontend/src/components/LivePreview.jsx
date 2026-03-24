import { PDFViewer } from '@react-pdf/renderer';
import MinimalTemplate from '../templates/MinimalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import DetailedTemplate from '../templates/DetailedTemplate';

export default function LivePreview({ data, template = 'minimal', themeColor = '#0f172a' }) {
  if (!data) return null;
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-slate-800 text-slate-300 text-xs px-4 py-2 font-medium flex justify-between items-center rounded-t-xl hidden md:flex">
        <span>Live ATS Preview</span>
        <span className="text-slate-500">Auto-updating</span>
      </div>
      <div className="flex-1 bg-slate-200">
        <PDFViewer width="100%" height="100%" className="border-none rounded-b-xl" showToolbar={false}>
          {template === 'modern' ? <ModernTemplate data={data} themeColor={themeColor} /> : 
           template === 'classic' ? <ClassicTemplate data={data} themeColor={themeColor} /> : 
           template === 'detailed' ? <DetailedTemplate data={data} themeColor={themeColor} /> : 
           <MinimalTemplate data={data} themeColor={themeColor} />}
        </PDFViewer>
      </div>
    </div>
  );
}
