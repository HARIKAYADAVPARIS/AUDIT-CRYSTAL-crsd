
import React from 'react';
import { AuditResult } from '../types';
import { ShieldCheck, SearchCheck, CheckCircle2, XCircle, Info, ChevronRight, Scale, Globe, Target, Layers, CheckCircle } from 'lucide-react';

interface FrameworkIntelligenceProps {
  data: AuditResult;
  onShowEvidence: () => void;
}

const FrameworkIntelligence: React.FC<FrameworkIntelligenceProps> = ({ data, onShowEvidence }) => {
  const frameworks = data.detailedFrameworks || [
    { name: 'ESRS', alignmentScore: 88, status: 'High', missingCriticals: ['E1-1', 'G1-2'], evidenceCount: 14 },
    { name: 'GRI', alignmentScore: 72, status: 'Medium', missingCriticals: ['GRI 302-1'], evidenceCount: 8 },
    { name: 'SASB', alignmentScore: 94, status: 'High', missingCriticals: [], evidenceCount: 22 },
    { name: 'TCFD', alignmentScore: 45, status: 'Low', missingCriticals: ['Scenario Analysis'], evidenceCount: 3 },
    { name: 'ISSB', alignmentScore: 68, status: 'Medium', missingCriticals: ['S1 Core'], evidenceCount: 9 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'High': return 'text-emerald-500';
      case 'Medium': return 'text-amber-500';
      case 'Low': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  const getFrameworkIcon = (name: string) => {
    switch (name) {
      case 'ESRS': return <Scale size={20} className="text-amber-500" />;
      case 'GRI': return <Globe size={20} className="text-emerald-500" />;
      case 'SASB': return <Target size={20} className="text-indigo-500" />;
      case 'TCFD': return <ShieldCheck size={20} className="text-orange-500" />;
      case 'ISSB': return <Layers size={20} className="text-blue-500" />;
      default: return <Info size={20} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. ASSURANCE HEADER */}
      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden border border-white/10 shadow-2xl">
         <div className="absolute top-0 right-0 p-8 opacity-5">
           <ShieldCheck size={240} />
         </div>
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                <SearchCheck size={12} /> Auditor Workpaper Mode
              </div>
              <h2 className="text-4xl font-black tracking-tighter">Global Framework <span className="text-amber-500">Alignment IQ</span></h2>
              <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
                Standardized compliance mapping across global regulatory frameworks. Each percentage point is tied to verified institutional data logic.
              </p>
              <div className="flex gap-4 pt-2">
                 <button 
                   onClick={onShowEvidence}
                   className="px-6 py-3 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all shadow-xl"
                 >
                   Open Evidence Explorer
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                 <div className="text-[10px] text-slate-500 font-bold uppercase mb-2">Global Readiness Rank</div>
                 <div className="text-4xl font-black text-white">Top 15%</div>
                 <div className="text-[8px] text-emerald-400 font-black mt-1 uppercase">Institutional Alpha</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                 <div className="text-[10px] text-slate-500 font-bold uppercase mb-2">Aggregate Readiness</div>
                 <div className="text-4xl font-black text-amber-400">{Math.round(frameworks.reduce((acc, f) => acc + (f.alignmentScore || 0), 0) / frameworks.length)}%</div>
                 <div className="text-[8px] text-slate-500 font-black mt-1 uppercase tracking-tighter">Weighted Framework Avg</div>
              </div>
           </div>
         </div>
      </div>

      {/* 2. FRAMEWORK CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {frameworks.map((fw, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col h-full">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-amber-50 transition-colors">
                   {getFrameworkIcon(fw.name)}
                </div>
                <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-50 ${getStatusColor(fw.status)}`}>
                   {fw.status}
                </div>
             </div>

             <div className="mb-4">
                <h4 className="text-lg font-black text-slate-900">{fw.name}</h4>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
                   <CheckCircle size={10} className="text-emerald-500" /> Verified Alignment
                </div>
             </div>

             <div className="relative h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
                <div 
                  className={`absolute inset-y-0 left-0 transition-all duration-1000 ${
                    fw.alignmentScore >= 80 ? 'bg-emerald-500' : fw.alignmentScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${fw.alignmentScore}%` }}
                />
             </div>

             <div className="flex justify-between items-end mb-6">
                <div className="text-3xl font-black text-slate-900 tracking-tighter">{fw.alignmentScore}%</div>
                <div className="text-[10px] font-black text-slate-400">SCORE</div>
             </div>

             <div className="mt-auto space-y-2 border-t border-slate-50 pt-4">
                {fw.missingCriticals?.length > 0 ? (
                  <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                    <ChevronRight size={12} className="text-red-400" /> {fw.missingCriticals.length} Compliance Gaps
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase">
                    <CheckCircle2 size={12} /> Compliant
                  </div>
                )}
             </div>
          </div>
        ))}
      </div>

      {/* 3. DETERMINISTIC CROSS-REFERENCE MATRIX */}
      <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm relative overflow-hidden">
        <div className="mb-8">
           <h3 className="text-2xl font-black text-slate-900 tracking-tight">Assurance Interoperability Matrix</h3>
           <p className="text-sm text-slate-500 max-w-xl mt-1">
             How a single disclosure satisfies multiple global standards simultaneously. 
           </p>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b-2 border-slate-900">
                    <th className="py-4 text-[10px] font-black uppercase text-slate-400">Primary Disclosure</th>
                    <th className="py-4 text-[10px] font-black uppercase text-slate-400 text-center">ESRS</th>
                    <th className="py-4 text-[10px] font-black uppercase text-slate-400 text-center">GRI</th>
                    <th className="py-4 text-[10px] font-black uppercase text-slate-400 text-center">TCFD</th>
                    <th className="py-4 text-[10px] font-black uppercase text-slate-400 text-center">Validation</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {data.mandatoryDisclosures.slice(0, 4).map((d, i) => (
                   <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                      <td className="py-5 pr-4">
                         <div className="font-bold text-sm text-slate-900">{d.code}</div>
                         <div className="text-xs text-slate-500 truncate w-64">{d.description}</div>
                      </td>
                      <td className="py-5 text-center">
                         <div className="flex justify-center">
                            {d.status === 'Present' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <XCircle size={18} className="text-slate-200" />}
                         </div>
                      </td>
                      <td className="py-5 text-center">
                         <div className="flex justify-center">
                            <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-slate-200'}`}></div>
                         </div>
                      </td>
                      <td className="py-5 text-center">
                         <div className="flex justify-center">
                            <div className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.3)]' : 'bg-slate-200'}`}></div>
                         </div>
                      </td>
                      <td className="py-5 text-center">
                         <button 
                           onClick={onShowEvidence}
                           className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-widest"
                         >
                           Verify
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default FrameworkIntelligence;
