import React from 'react';
import { Newspaper, ArrowRight, Quote, Lightbulb, GraduationCap, Globe, Zap, Layers, RefreshCcw, Box } from 'lucide-react';

const ThoughtLeadership: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Editorial Sidebar */}
      <div className="lg:w-1/3 bg-[#fdfbf7] p-8 border-r border-slate-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6">
            <GraduationCap size={16} /> Intelligence Brief
          </div>
          <h3 className="font-serif italic text-3xl text-slate-900 leading-tight mb-6">
            Sustainability as a <span className="text-indigo-600 underline decoration-indigo-200">Competitive Edge</span>
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Strategic analysis of the HEC Paris S&O paper: Moving from administrative burden to market-driven influence.
          </p>
        </div>
        
        <div className="space-y-4">
           <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Source Analysis</div>
              <div className="font-bold text-slate-800 text-xs">HEC Paris S&O Center</div>
              <div className="text-[10px] text-slate-500">Jan 2026 • Policy Brief 42</div>
           </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="lg:w-2/3 p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-2">
              <Box size={20} />
            </div>
            <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest">Distributed Reporting</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Firms report only on their operations. Upstream emissions and labor data are pulled automatically from suppliers’ digital scorecards, drastically reducing manual entry.
            </p>
          </div>
          <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-2">
              <RefreshCcw size={20} />
            </div>
            <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest">Propagated Transparency</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Missing data is flagged and replaced by best-to-worst case intervals. This "penalty by default" motivates suppliers to disclose to avoid negative reputational impacts.
            </p>
          </div>
        </div>

        <div className="p-6 bg-[#fdfbf7] rounded-2xl border border-slate-100 relative italic">
          <Quote className="absolute -top-3 -left-3 text-indigo-200" size={40} />
          <p className="text-slate-700 text-sm leading-relaxed font-serif relative z-10">
            "A shift from firm-level to product-level sustainability reporting, delivered through digital scorecards, creates a level global playing field and turns transparency into a strategic market advantage."
          </p>
          <div className="mt-4 text-[10px] font-bold text-slate-400 uppercase">— Prof. Brian Hill, HEC Paris</div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex gap-4">
             <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-tighter">#ProductPassports</span>
             <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-tighter">#SmartDisclosure</span>
          </div>
          <button className="text-xs font-black text-indigo-600 flex items-center gap-2 hover:gap-3 transition-all">
            FULL POLICY PAPER <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThoughtLeadership;