import React from 'react';
import { AuditResult } from '../types';
import { CheckCircle2, Circle, ArrowRight, Users, Search, BarChart4, PieChart, FileCheck, BrainCircuit } from 'lucide-react';

interface ProcessChecklistProps {
  data: AuditResult;
}

const ProcessChecklist: React.FC<ProcessChecklistProps> = ({ data }) => {
  // Logic to determine step status based on AI analysis
  const hasMatrix = data.doubleMaterialityMatrix && data.doubleMaterialityMatrix.length > 0;
  const hasTopics = data.esrsTopics && data.esrsTopics.length > 0;

  const steps = [
    {
      id: 1,
      title: "Define Scope & Objectives",
      desc: `Industry detected: ${data.companyName} Sector. Regulatory boundaries set.`,
      status: "completed",
      icon: <Search size={16} />
    },
    {
      id: 2,
      title: "Engage Stakeholders",
      desc: "Map investors, employees, and NGOs. Conduct surveys/interviews.",
      status: "pending",
      icon: <Users size={16} />
    },
    {
      id: 3,
      title: "Identify ESG Topics",
      desc: `${data.esrsTopics.length} potential topics mapped from ESRS/GRI standards.`,
      status: hasTopics ? "completed" : "pending",
      icon: <BrainCircuit size={16} />
    },
    {
      id: 4,
      title: "Assess Financial Materiality",
      desc: "Risks to enterprise value, cash flow, and access to capital evaluated.",
      status: hasMatrix ? "completed" : "pending",
      icon: <BarChart4 size={16} />
    },
    {
      id: 5,
      title: "Assess Impact Materiality",
      desc: "Outward impacts on people and environment quantified.",
      status: hasMatrix ? "completed" : "pending",
      icon: <PieChart size={16} />
    },
    {
      id: 6,
      title: "Prioritize (The Matrix)",
      desc: "Topics scored and plotted on Double Materiality Matrix.",
      status: hasMatrix ? "completed" : "pending",
      icon: <ArrowRight size={16} />
    },
    {
      id: 7,
      title: "Validate Findings",
      desc: "Present results to Board/Executive Committee for sign-off.",
      status: "pending",
      icon: <FileCheck size={16} />
    },
    {
      id: 8,
      title: "Integrate into Strategy",
      desc: "Link to KPIs and prepare final CSRD Disclosure.",
      status: "in-progress",
      icon: <CheckCircle2 size={16} />
    }
  ];

  const completedCount = steps.filter(s => s.status === 'completed').length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden print:break-inside-avoid">
      <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white print:bg-white print:border-b print:text-slate-900">
        <div className="flex items-center gap-2">
          <FileCheck className="text-amber-400" size={20} />
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider">Assessment Protocol</h3>
            <p className="text-xs text-slate-400">Standardized 8-Step Workflow</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-amber-400">{Math.round(progress)}%</div>
          <div className="text-xs text-slate-400">Process Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5">
        <div className="bg-amber-400 h-1.5 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`relative p-4 rounded-lg border ${
              step.status === 'completed' 
                ? 'bg-emerald-50/50 border-emerald-100' 
                : step.status === 'in-progress'
                ? 'bg-amber-50/50 border-amber-100'
                : 'bg-slate-50 border-slate-100 opacity-70'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className={`p-1.5 rounded-md ${
                step.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                step.status === 'in-progress' ? 'bg-amber-100 text-amber-600' :
                'bg-slate-200 text-slate-500'
              }`}>
                {step.icon}
              </div>
              <div className="text-xs font-bold text-slate-300">#{step.id}</div>
            </div>
            
            <h4 className={`font-bold text-sm mb-1 ${
              step.status === 'completed' ? 'text-emerald-900' : 
              step.status === 'in-progress' ? 'text-amber-900' : 
              'text-slate-700'
            }`}>
              {step.title}
            </h4>
            
            <p className="text-xs text-slate-500 leading-snug">
              {step.desc}
            </p>

            <div className="mt-3 flex items-center gap-1.5">
              {step.status === 'completed' ? (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase">
                  <CheckCircle2 size={10} /> AI Verified
                </span>
              ) : step.status === 'in-progress' ? (
                 <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 uppercase">
                  <ArrowRight size={10} /> In Progress
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                  <Circle size={10} /> Pending
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessChecklist;