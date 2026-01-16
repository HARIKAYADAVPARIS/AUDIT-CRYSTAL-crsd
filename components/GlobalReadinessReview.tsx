
import React from 'react';
import { AuditResult, SubsidiaryData } from '../types';
import { Globe, ShieldAlert, CheckCircle2, AlertTriangle, TrendingUp, Building2, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface GlobalReadinessReviewProps {
  data: AuditResult;
}

const GlobalReadinessReview: React.FC<GlobalReadinessReviewProps> = ({ data }) => {
  const subsidiaries = data.subsidiaries || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'text-emerald-500';
      case 'In Progress': return 'text-amber-500';
      case 'At Risk': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant': return <CheckCircle2 size={16} />;
      case 'In Progress': return <TrendingUp size={16} />;
      case 'At Risk': return <ShieldAlert size={16} />;
      default: return <Building2 size={16} />;
    }
  };

  const aggregateStats = {
    totalEntities: subsidiaries.length,
    averageScore: subsidiaries.length > 0 ? Math.round(subsidiaries.reduce((acc, s) => acc + s.readinessScore, 0) / subsidiaries.length) : 0,
    atRisk: subsidiaries.filter(s => s.status === 'At Risk').length,
    compliant: subsidiaries.filter(s => s.status === 'Compliant').length
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Aggregation Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Subsidiaries</div>
          <div className="text-4xl font-black text-slate-900">{aggregateStats.totalEntities}</div>
          <div className="text-[10px] text-slate-500 mt-1">Global Entities Tracked</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Group Avg Score</div>
          <div className="text-4xl font-black text-emerald-600">{aggregateStats.averageScore}%</div>
          <div className="text-[10px] text-slate-500 mt-1">Readiness Benchmark</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">At Risk Units</div>
          <div className="text-4xl font-black text-red-500">{aggregateStats.atRisk}</div>
          <div className="text-[10px] text-slate-500 mt-1">Require Immediate Fix</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Consolidated Compliance</div>
          <div className="text-4xl font-black text-indigo-600">{Math.round((aggregateStats.compliant / aggregateStats.totalEntities) * 100) || 0}%</div>
          <div className="text-[10px] text-slate-500 mt-1">Audit-Ready Ratio</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subsidiary Score Comparison */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Entity Performance Breakdown</h3>
              <p className="text-sm text-slate-500">Readiness comparison across mapped regions.</p>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subsidiaries} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                  width={120}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as SubsidiaryData;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs">
                          <p className="font-bold mb-1">{data.name}</p>
                          <p className="text-slate-400">Score: <span className="text-white">{data.readinessScore}%</span></p>
                          <p className="text-slate-400">Region: <span className="text-white">{data.region}</span></p>
                          <p className="text-red-400 mt-1">Gap: {data.topGap}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="readinessScore" radius={[0, 4, 4, 0]} barSize={32}>
                  {subsidiaries.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.readinessScore >= 80 ? '#10b981' : entry.readinessScore >= 50 ? '#f59e0b' : '#ef4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Compliance Feed */}
        <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Globe size={200} />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <MapPin className="text-amber-400" size={18} />
              Regional Risk Register
            </h3>
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {subsidiaries.length > 0 ? subsidiaries.map((s, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${s.status === 'Compliant' ? 'bg-emerald-500' : s.status === 'In Progress' ? 'bg-amber-500' : 'bg-red-500 animate-pulse'}`}></div>
                    <div>
                      <div className="text-sm font-bold">{s.name}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase">{s.region}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-black flex items-center gap-1 justify-end ${getStatusColor(s.status)}`}>
                      {getStatusIcon(s.status)}
                      {s.readinessScore}%
                    </div>
                    <div className="text-[10px] text-red-400 font-medium truncate w-32">{s.topGap}</div>
                  </div>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-600">
                  <Building2 size={48} className="mb-4 opacity-20" />
                  <p className="text-sm font-bold">No subsidiary entities detected in current report.</p>
                </div>
              )}
            </div>
            <button className="mt-8 w-full py-3 bg-white text-slate-950 rounded-xl font-bold text-sm hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10">
              <Globe size={16} /> DOWNLOAD CONSOLIDATED BRIEF
            </button>
          </div>
        </div>
      </div>

      {/* Global Regulatory Matrix */}
      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Regional Regulatory Interoperability</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="space-y-3">
             <div className="text-xs font-black text-indigo-600 uppercase">European Union (ESRS)</div>
             <p className="text-xs text-slate-500 leading-relaxed">Full adoption required for all group entities by 2025. Limited assurance mandatory.</p>
             <div className="h-1 bg-indigo-100 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-600 w-[95%]"></div>
             </div>
           </div>
           <div className="space-y-3">
             <div className="text-xs font-black text-emerald-600 uppercase">USA (SEC / California)</div>
             <p className="text-xs text-slate-500 leading-relaxed">Climate Disclosure rules pending. California SB 253/261 alignment recommended for US entities.</p>
             <div className="h-1 bg-emerald-100 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-600 w-[40%]"></div>
             </div>
           </div>
           <div className="space-y-3">
             <div className="text-xs font-black text-amber-600 uppercase">Global (ISSB)</div>
             <p className="text-xs text-slate-500 leading-relaxed">S1 and S2 standards provides baseline for cross-jurisdictional financial materiality.</p>
             <div className="h-1 bg-amber-100 rounded-full overflow-hidden">
               <div className="h-full bg-amber-600 w-[75%]"></div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalReadinessReview;
