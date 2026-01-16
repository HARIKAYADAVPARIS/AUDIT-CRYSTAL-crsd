import React, { useState } from 'react';
import { AuditResult } from '../types';
import { X, ExternalLink, FileText, Quote, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface EvidenceViewerProps {
  data: AuditResult;
  pdfUrl?: string | null;
  onClose: () => void;
}

const EvidenceViewer: React.FC<EvidenceViewerProps> = ({ data, pdfUrl, onClose }) => {
  const [selectedDisclosureId, setSelectedDisclosureId] = useState<number>(0);

  // Filter to items that have evidence or are missing
  const auditItems = data.mandatoryDisclosures;

  const currentItem = auditItems[selectedDisclosureId];

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[95vw] h-[90vh] rounded-2xl shadow-2xl flex overflow-hidden animate-in zoom-in duration-300">
        
        {/* LEFT: Findings List */}
        <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50">
          <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText size={18} className="text-amber-500" />
                Audit Evidence
              </h3>
              <p className="text-xs text-slate-500">Verify findings against source</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {auditItems.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedDisclosureId(idx)}
                className={`p-3 rounded-lg cursor-pointer transition-all border ${
                  selectedDisclosureId === idx 
                    ? 'bg-white border-amber-400 shadow-md ring-1 ring-amber-100' 
                    : 'bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-xs text-slate-700">{item.code}</span>
                  {item.status === 'Present' 
                    ? <CheckCircle2 size={14} className="text-emerald-500" />
                    : <AlertTriangle size={14} className="text-red-500" />
                  }
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
                {item.evidence && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-indigo-600 font-medium">
                    <Quote size={10} /> Has Citation
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE: Detail View */}
        <div className="w-1/3 border-r border-slate-200 flex flex-col bg-white p-6 overflow-y-auto">
           <h2 className="text-xl font-bold text-slate-900 mb-2">{currentItem.code}</h2>
           <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold w-fit mb-6 ${
             currentItem.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
           }`}>
             {currentItem.status.toUpperCase()}
           </div>

           <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Requirement</h4>
           <p className="text-sm text-slate-700 mb-8 leading-relaxed">
             {currentItem.description}
           </p>

           <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
             <Quote size={14} /> 
             Source Evidence
           </h4>
           {currentItem.evidence ? (
             <div className="bg-slate-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6">
               <p className="text-sm text-slate-800 italic font-serif leading-relaxed">
                 "{currentItem.evidence.quote}"
               </p>
               {currentItem.evidence.page && (
                 <div className="mt-2 text-xs text-slate-500 font-bold text-right">
                   Page {currentItem.evidence.page}
                 </div>
               )}
             </div>
           ) : (
             <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-500 italic mb-6">
               No direct citation text extracted. This finding may be inferred from general context or absence of data.
             </div>
           )}

           {currentItem.fixRecommendation && (
             <>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Remediation Draft</h4>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
                  <p className="text-sm text-slate-700">{currentItem.fixRecommendation}</p>
                </div>
             </>
           )}
        </div>

        {/* RIGHT: PDF Viewer */}
        <div className="w-1/3 bg-slate-800 flex flex-col relative">
          <div className="absolute top-0 right-0 p-4 z-10">
            <button 
              onClick={onClose}
              className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {pdfUrl ? (
            <iframe 
              src={`${pdfUrl}#page=${currentItem.evidence?.page || 1}`} 
              className="w-full h-full"
              title="PDF Source"
            />
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
               <FileText size={48} className="mb-4 opacity-50" />
               <p>Source document preview not available in this mode.</p>
               {/* If it was a URL analysis, we show this state */}
               <a 
                 href="#" 
                 className="mt-4 flex items-center gap-2 text-amber-400 hover:text-amber-300"
               >
                 Open Original URL <ExternalLink size={14} />
               </a>
             </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default EvidenceViewer;