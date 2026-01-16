import React from 'react';
import { Clock, AlertCircle, Calendar, ShieldCheck, ArrowRight, Gavel } from 'lucide-react';

const RegulatoryBriefing: React.FC = () => {
  const milestones = [
    {
      date: "Jan 2024",
      group: "Group 1: NFRD Entities",
      desc: "Large public-interest companies (>500 employees) must report on 2024 data.",
      status: "Past"
    },
    {
      date: "Jan 2025",
      group: "Group 2: All Large Cos",
      desc: "Mandatory for all companies meeting 2/3 criteria (e.g., >250 staff, €50M revenue).",
      status: "Active",
      highlight: true
    },
    {
      date: "Jan 2026",
      group: "Group 3: Listed SMEs",
      desc: "Entry level requirements begin for listed SMEs across the Eurozone.",
      status: "Upcoming"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden print:break-inside-avoid">
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel: The Mandate */}
        <div className="lg:w-2/5 bg-slate-900 p-8 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Gavel size={160} />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-wider mb-4 border border-red-500/20">
              <ShieldCheck size={12} /> Legal Requirement
            </div>
            <h3 className="text-2xl font-bold mb-4">Regulatory Briefing: <br/><span className="text-amber-400">2025 Mandate</span></h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Under the Corporate Sustainability Reporting Directive (CSRD), <span className="text-white font-semibold">"Limited Assurance"</span> is no longer optional. 
              Non-compliance results in fines up to 5% of global turnover and market exclusion.
            </p>
            <button className="text-xs font-bold text-amber-400 flex items-center gap-1 hover:underline group">
              View Full Timeline <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Panel: The Timeline */}
        <div className="lg:w-3/5 p-8 bg-slate-50/50">
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${
                  m.highlight ? 'bg-amber-400 text-slate-900' : 'bg-slate-200 text-slate-500'
                }`}>
                  {m.highlight ? <AlertCircle size={18} /> : <Calendar size={18} />}
                </div>
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900">{m.date}</div>
                    <time className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      m.status === 'Past' ? 'bg-slate-100 text-slate-500' :
                      m.status === 'Active' ? 'bg-red-100 text-red-600' :
                      'bg-indigo-100 text-indigo-600'
                    }`}>{m.status.toUpperCase()}</time>
                  </div>
                  <div className="text-xs font-bold text-indigo-600 mb-1">{m.group}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryBriefing;