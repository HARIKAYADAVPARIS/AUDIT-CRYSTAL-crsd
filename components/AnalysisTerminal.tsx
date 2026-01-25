
import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Leaf, Shield, BarChart3, Scale, Zap, Loader2, Globe, Cpu, Lock, ShieldCheck } from 'lucide-react';

interface AnalysisTerminalProps {
  streamText: string;
}

const LOG_MESSAGES = [
  "VAULT_AUTH_SUCCESS...",
  "PARSING_INSTITUTIONAL_CORPORATE_LEDGER...",
  "MAPPING_ESRS_DISCLOSURE_MATRIX...",
  "DETERMINISTIC_CITATION_LOCK_ACTIVE...",
  "SEARCHING_GRI_AL_ALIGNMENT...",
  "VALIDATING_METRIC_GRANULARITY...",
  "CALCULATING_DOUBLE_MATERIALITY...",
  "XBRL_PRE_TAGGING_SYNTHESIS...",
  "CFO_EXECUTIVE_BRIEF_GENERATION...",
  "AUDIT_CRYSTAL_READY."
];

const AnalysisTerminal: React.FC<AnalysisTerminalProps> = ({ streamText }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [activeLogs, setActiveLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeLogs.length < LOG_MESSAGES.length) {
        setActiveLogs(prev => [...prev, LOG_MESSAGES[prev.length]]);
      }
    }, 450);
    return () => clearInterval(interval);
  }, [activeLogs]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamText, activeLogs]);

  const formatStreamDisplay = (text: string) => {
    const maxLength = 2500;
    if (text.length <= maxLength) return text;
    return "..." + text.slice(-maxLength);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 animate-in fade-in zoom-in duration-1000">
      <div className="bg-slate-950 rounded-sm overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.8)] border border-white/5 font-mono text-[10px] ring-1 ring-white/5">
        {/* Terminal Header */}
        <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center justify-between backdrop-blur-3xl">
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
            </div>
            <span className="text-[9px] text-slate-500 font-black tracking-[0.4em] uppercase flex items-center gap-3">
              <Cpu size={12} className="text-gold-500" />
              Pre_Audit_Assurance_Protocol_v4.1
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-1.5 bg-white text-slate-950 text-[8px] font-black rounded-sm uppercase tracking-widest">
              <Zap size={10} fill="currentColor" /> Deterministic_Assurance
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-12 h-[550px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent bg-slate-950/50 relative flex flex-col gap-4">
           {/* AI Streamed Logic */}
           <div className="space-y-2 opacity-50">
             {activeLogs.map((log, i) => (
               <div key={i} className="text-slate-600 flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
                 <span className="text-gold-500/20 font-black tracking-widest">[{new Date().toLocaleTimeString([], {hour12: false, hour: '2-digit', minute:'2-digit', second: '2-digit'})}]</span>
                 <span className="text-slate-500 font-bold">{`> ${log}`}</span>
               </div>
             ))}
           </div>

           <div className="mt-12 pt-12 border-t border-white/5">
             <div className="text-gold-500/40 font-black mb-6 uppercase tracking-[0.5em] flex items-center gap-3">
               <Lock size={12} strokeWidth={3} /> Assurance_Stream
             </div>
             <pre className="text-slate-400 whitespace-pre-wrap break-all leading-loose opacity-90 font-mono tracking-tight">
               {formatStreamDisplay(streamText)}
               <span className="animate-pulse inline-block w-2.5 h-4 bg-gold-500/30 ml-2 align-middle"></span>
             </pre>
           </div>
           
           <div ref={bottomRef} />
        </div>
        
        {/* Footer */}
        <div className="bg-white/5 px-8 py-5 border-t border-white/5 flex justify-between items-center text-[9px] text-slate-700 font-black tracking-[0.5em] uppercase">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-3 text-gold-500">
              <Loader2 size={12} className="animate-spin" /> CRYSTALLIZING_METRICS
            </span>
            <span className="text-slate-800">|</span>
            <span>ENCRYPTION: AES-256</span>
          </div>
          <div className="flex items-center gap-3 opacity-30">
            <ShieldCheck size={12} />
            GLOBAL_RESIDENCY_LOCKED
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisTerminal;
