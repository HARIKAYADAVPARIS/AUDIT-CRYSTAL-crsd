import React from 'react';
import { AuditResult } from '../types';
import { Zap, ExternalLink, ShieldCheck, Database, Globe, CheckCircle2 } from 'lucide-react';

interface SolutionMarketplaceProps {
  data: AuditResult;
}

const SolutionMarketplace: React.FC<SolutionMarketplaceProps> = ({ data }) => {
  // Logic: Recommend solutions based on low scores (< 60)
  const recommendations = [];

  // 1. Data Granularity Gap -> Carbon Accounting Software
  if (data.scoreBreakdown.dataGranularity < 60) {
    recommendations.push({
      category: "Carbon Accounting Cloud",
      icon: <Database className="text-blue-500" size={24} />,
      partner: "GreenLedger AI",
      description: "Automate data collection to fix your low 'Data Granularity' score.",
      matchReason: "Detected manual data gaps",
      cta: "Book Demo"
    });
  }

  // 2. Value Chain Gap -> Supply Chain Intelligence
  if (data.scoreBreakdown.valueChain < 60) {
    recommendations.push({
      category: "Supply Chain Audit",
      icon: <Globe className="text-emerald-500" size={24} />,
      partner: "ChainScout Global",
      description: "Map Tier-N suppliers instantly to satisfy ESRS S2/E1 requirements.",
      matchReason: "Low visibility in upstream value chain",
      cta: "Get Quote"
    });
  }

  // 3. Governance/Strategy Gap -> ESG Consulting
  if (data.scoreBreakdown.strategyGovernance < 60) {
    recommendations.push({
      category: "ESG Advisory",
      icon: <ShieldCheck className="text-purple-500" size={24} />,
      partner: "Stratosphere Consulting",
      description: "Board-level governance structuring and double materiality workshops.",
      matchReason: "Governance score requires improvement",
      cta: "Contact Expert"
    });
  }

  // 4. Fallback / General Recommendation
  if (recommendations.length === 0) {
     recommendations.push({
      category: "Assurance Provider",
      icon: <CheckCircle2 className="text-amber-500" size={24} />,
      partner: "AuditGuard Assurance",
      description: "Get your high readiness score independently verified for investors.",
      matchReason: "Ready for limited assurance",
      cta: "Schedule Audit"
    });
  }

  return (
    <div className="bg-slate-900 rounded-xl p-8 border border-slate-800 text-white relative overflow-hidden print:break-inside-avoid print:bg-white print:text-slate-900 print:border-slate-300">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-8 opacity-5 print:hidden">
        <Zap size={200} />
      </div>

      <div className="relative z-10 mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2 print:text-slate-900">
          <Zap className="text-amber-400" fill="currentColor" />
          Recommended Remediation Ecosystem
        </h3>
        <p className="text-slate-400 max-w-2xl print:text-slate-600">
          Based on your specific compliance gaps, we have curated these verified solution partners to accelerate your roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {recommendations.slice(0, 3).map((rec, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group flex flex-col print:bg-slate-50 print:border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-700 print:bg-white print:border-slate-200">
                {rec.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 px-2 py-1 rounded border border-amber-500/20 print:bg-amber-50 print:text-amber-700 print:border-amber-200">
                {rec.matchReason}
              </span>
            </div>
            
            <div className="mb-1 text-xs text-slate-400 font-bold uppercase print:text-slate-500">{rec.category}</div>
            <h4 className="text-lg font-bold text-white mb-2 print:text-slate-900">{rec.partner}</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-1 print:text-slate-700">
              {rec.description}
            </p>
            
            <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 text-sm group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] print:hidden">
              {rec.cta} <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
         <p className="text-xs text-slate-500">
           *Audit Crystal partners are vetted for CSRD compliance capabilities.
         </p>
      </div>
    </div>
  );
};

export default SolutionMarketplace;