
import React, { useEffect, useRef } from 'react';
import { Terminal, Leaf, Shield, BarChart3, Scale, Zap } from 'lucide-react';

interface AnalysisTerminalProps {
  streamText: string;
}

const AnalysisTerminal: React.FC<AnalysisTerminalProps> = ({ streamText }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamText]);

  // Visual formatting for the terminal
  const formatStreamDisplay = (text: string) => {
    // Show only the most recent chunk of progress to keep it readable
    const maxLength = 1500;
    if (text.length <= maxLength) return text;
    return "..." + text.slice(-maxLength);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-in fade-in zoom-in duration-500">
      <div className="bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 font-mono">
        {/* Terminal Header */}
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-amber-500" />
            <span className="text-xs text-slate-400 font-medium tracking-tight">AUDIT_CRYSTAL_CORE // GEMINI_FLASH_TURBO</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black text-amber-500 animate-pulse">
              <Zap size={10} fill="currentColor" /> TURBO MODE
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-emerald-600"></div>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="bg-slate-900/50 px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] border-b border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400">
            <Leaf size={12} /> 
            <span className="uppercase font-bold">Parsing_ESG_Data</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400">
            <Shield size={12} /> 
            <span className="uppercase font-bold">ESRS_Validation</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-400">
            <BarChart3 size={12} /> 
            <span className="uppercase font-bold">Risk_Accounting</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Scale size={12} /> 
            <span className="uppercase font-bold">Double_Materiality</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent bg-slate-950 text-xs relative">
           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <Leaf size={120} />
           </div>

           <pre className="text-emerald-500/90 whitespace-pre-wrap break-all font-mono leading-relaxed overflow-x-hidden">
             <span className="text-slate-500">{`> initializing_turbo_protocol...\n> loading_regulatory_standards: [ESRS_E1, ESRS_S1, ESRS_G1]\n> establishing_high_speed_stream... OK.\n> analyzing_financial_materiality... IN_PROGRESS.\n\n`}</span>
             {formatStreamDisplay(streamText)}
             <span className="animate-pulse inline-block w-2 h-4 bg-amber-500 ml-1 align-middle"></span>
           </pre>
           <div ref={bottomRef} />
        </div>
        
        {/* Footer */}
        <div className="bg-slate-900 px-4 py-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-bold">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
            MODE: LATENCY_OPTIMIZED
          </span>
          <span>PROVIDER: GOOGLE_FLASH_3</span>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col items-center gap-2 animate-pulse">
        <p className="text-slate-500 text-sm font-medium">
          Accelerating CSRD Analysis via Flash-3 Engine...
        </p>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-amber-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisTerminal;
