import React from 'react';
import { Clock, AlertCircle, Calendar, ShieldCheck, ArrowRight, Gavel, Scale, Globe } from 'lucide-react';

const RegulatoryBriefing: React.FC = () => {
  const milestones = [
    {
      date: "Dec 2024",
      group: "IAASB: ISSA 5000",
      desc: "Finalization of the global standard for sustainability assurance, covering limited and reasonable assurance.",
      status: "Past",
      icon: <ShieldCheck size={18} />
    },
    {
      date: "Jan 2025",
      group: "CSRD Phase 2",
      desc: "Mandatory for all large companies (250+ employees). Limited assurance now a hard requirement.",
      status: "Active",
      highlight: true,
      icon: <AlertCircle size={18} />
    },
    {
      date: "2026-2027",
      group: "Reasonable Assurance",
      desc: "Phased transition from 'Limited' to 'Reasonable' assurance for CSRD disclosures begins.",
      status: "Upcoming",
      icon: <Calendar size={18} />
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
              <ShieldCheck size={12} /> ISSA 5000 Compliant
            </div>
            <h3 className="text-2xl font-bold mb-4">Assurance: <br/><span className="text-amber-400">ISSA 5000 Protocol</span></h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Audit Crystal is pre-aligned with the IAASB’s <span className="text-white font-semibold">ISSA 5000</span>, the general requirement standard for sustainability assurance. We facilitate both limited and reasonable assurance workflows.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
               <span className="text-[9px] font-black text-slate-500 uppercase px-2 py-1 bg-white/5 rounded border border-white/5">Interoperable with ISSB</span>
               <span className="text-[9px] font-black text-slate-500 uppercase px-2 py-1 bg-white/5 rounded border border-white/5">IOSCO Coordinated</span>
            </div>
            <button className="text-xs font-bold text-amber-400 flex items-center gap-1 hover:underline group">
              View Assurance Roadmap <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
                  {m.icon}
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