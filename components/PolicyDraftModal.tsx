
import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Download, FileText, Sparkles, Loader2, ShieldCheck, Gem } from 'lucide-react';

interface PolicyDraftModalProps {
  gapCode: string;
  gapDescription: string;
  policyContent: string;
  isLoading: boolean;
  onClose: () => void;
}

const PolicyDraftModal: React.FC<PolicyDraftModalProps> = ({ 
  gapCode, 
  gapDescription, 
  policyContent, 
  isLoading, 
  onClose 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(policyContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-300 border border-slate-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-400/20 rounded-xl">
              <Sparkles size={24} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                ESRS Policy Architect: <span className="text-amber-400">{gapCode}</span>
              </h2>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">
                AI-Driven Remediation Draft
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-12 bg-slate-50 flex justify-center">
          <div className="w-full max-w-2xl bg-white shadow-xl border border-slate-200 rounded-sm min-h-[1000px] p-16 relative">
            
            {/* Watermark */}
            <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none transform rotate-12 select-none">
              <Gem size={300} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
              <span className="text-9xl font-black transform -rotate-45 uppercase">Verified Audit Crystal</span>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 py-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping"></div>
                  <Loader2 size={48} className="text-indigo-600 animate-spin relative" />
                </div>
                <p className="text-slate-500 font-bold animate-pulse">Drafting board-ready policy for {gapCode}...</p>
                <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-600 animate-progress-indefinite"></div>
                </div>
              </div>
            ) : (
              <div className="prose prose-slate max-w-none relative z-10">
                <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-8">
                  <div className="text-2xl font-black uppercase tracking-tighter text-slate-900">Corporate Policy</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase text-right">
                    Ref: ESRS-{gapCode}<br/>
                    Status: AI-DRAFT_01
                  </div>
                </div>
                
                <div className="whitespace-pre-wrap font-serif text-slate-800 leading-relaxed text-sm">
                  {policyContent}
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-end">
                  <div className="space-y-4">
                     <div className="w-48 h-px bg-slate-300"></div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase">Executive Approval Signature</div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    <ShieldCheck size={14} /> 100% ESRS COMPLIANCE ALIGNMENT
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-slate-200 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
             <InfoBanner />
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleCopy}
              disabled={isLoading}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                copied 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50'
              }`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied to Clipboard' : 'Copy Text'}
            </button>
            <button 
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-amber-400 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg disabled:opacity-50"
            >
              <Download size={18} />
              Export to .DOCX
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoBanner = () => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-lg text-indigo-700">
    <FileText size={16} />
    <span className="text-[10px] font-bold uppercase tracking-wider">Draft generated using Gemini 3 Pro Reasoning</span>
  </div>
);

export default PolicyDraftModal;
