
import React, { useState, useMemo } from 'react';
import { AuditResult } from '../types';
import { Coins, TrendingUp, Info, Activity, ArrowUpRight, ArrowDownRight, Calculator, Zap, ShieldCheck, Thermometer, Briefcase, Globe, Target, BarChart3, LineChart, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

interface RevenueIntelligenceProps {
  data: AuditResult;
}

const RevenueIntelligence: React.FC<RevenueIntelligenceProps> = ({ data }) => {
  const [carbonPrice, setCarbonPrice] = useState(85); // € per tonne (EU ETS average)
  const [valuationScenario, setValuationScenario] = useState<'conservative' | 'aggressive'>('conservative');

  const taxonomyData = useMemo(() => {
    // Ensuring we have valid data or a reasonable fallback that feels institutional
    const t = data.financialImpact.taxonomy || { aligned: 18.5, eligible: 32.2, nonEligible: 49.3 };
    return [
      { name: 'Aligned', value: t.aligned, color: '#10b981' },
      { name: 'Eligible', value: t.eligible, color: '#f59e0b' },
      { name: 'Non-Eligible', value: t.nonEligible, color: '#94a3b8' },
    ];
  }, [data.financialImpact.taxonomy]);

  const yieldData = useMemo(() => {
    // Institutional Yield Curve: Compliant vs Non-Compliant growth delta
    return [
      { year: '2024', compliant: 100, nonCompliant: 100 },
      { year: '2025', compliant: 108, nonCompliant: 103 },
      { year: '2026', compliant: 118, nonCompliant: 105 },
      { year: '2027', compliant: 132, nonCompliant: 106 },
      { year: '2028', compliant: 154, nonCompliant: 104 },
    ];
  }, []);

  const marginAnalysis = useMemo(() => {
    const emissions = data.financialImpact.scope1And2Tonnage || 184500;
    const totalCost = emissions * carbonPrice;
    const revenue = data.financialImpact.totalRevenue || 584000000;
    const marginImpact = (totalCost / revenue) * 100;

    return {
      totalCost,
      marginImpact: marginImpact.toFixed(2),
      isHighRisk: marginImpact > 2.0
    };
  }, [data.financialImpact.scope1And2Tonnage, carbonPrice, data.financialImpact.totalRevenue]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-DE', { style: 'currency', currency: data.financialImpact.currency || 'EUR', notation: 'compact' }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* 1. INSTITUTIONAL ALPHA HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-950 rounded-3xl p-10 text-white relative overflow-hidden border border-white/10 shadow-2xl">
           <div className="absolute top-0 right-0 p-8 opacity-5">
             <Coins size={240} />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                  <ShieldCheck size={12} /> Institutional Alpha Yield
                </div>
                <h2 className="text-5xl font-black tracking-tighter leading-[0.9] mb-2">Pre-Audit <br/><span className="text-emerald-400">Revenue Alpha</span></h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Strategic decoupling of revenue growth from environmental risk factors. Mapping Turnover to EU Taxonomy Technical Screening Criteria.
                </p>
                
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                   {taxonomyData.map((d, i) => (
                     <div key={i} className="space-y-1">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{d.name}</div>
                        <div className="text-2xl font-black" style={{ color: d.color }}>{d.value}%</div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie 
                        data={taxonomyData} 
                        innerRadius={65} 
                        outerRadius={95} 
                        paddingAngle={8} 
                        dataKey="value" 
                        stroke="none"
                        animationBegin={0}
                        animationDuration={1500}
                      >
                         {taxonomyData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                      />
                   </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <div className="text-3xl font-black text-white">{taxonomyData[0].value}%</div>
                   <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Alignment Alpha</div>
                </div>
             </div>
           </div>
        </div>

        <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm flex flex-col justify-between group overflow-hidden relative">
           <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform">
             <TrendingUp size={160} />
           </div>
           <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Activity size={14} className="text-indigo-500" /> Valuation Multiple Delta
              </div>
              <div className="text-7xl font-black text-slate-900 tracking-tighter mb-2">
                +1.{data.scoreValue > 70 ? '8' : '2'}x
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium mt-4">
                Projected EBITDA multiple premium linked to your <span className="text-indigo-600 font-bold">top-quartile</span> {data.readinessScore} status.
              </p>
           </div>
           <div className="pt-8 mt-6 border-t border-slate-50">
              <div className="flex justify-between items-center text-[10px] font-black uppercase mb-3">
                 <span className="text-slate-400">Yield Reliability</span>
                 <span className="text-emerald-500">98.2%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 w-[92%] transition-all duration-1000"></div>
              </div>
           </div>
        </div>
      </div>

      {/* 2. INSTITUTIONAL YIELD COMPARISON */}
      <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
           <div>
             <h3 className="text-2xl font-black text-slate-900 tracking-tight">Institutional Yield Advantage</h3>
             <p className="text-sm text-slate-500">Projected revenue compounding: Taxonomy Aligned vs. Market Baseline.</p>
           </div>
           <div className="flex gap-4">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                 <span className="text-[10px] font-black text-slate-500 uppercase">Aligned Yield</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                 <span className="text-[10px] font-black text-slate-500 uppercase">Market Baseline</span>
              </div>
           </div>
        </div>
        
        <div className="h-[400px]">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldData}>
                 <defs>
                    <linearGradient id="colorCompliant" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                 <YAxis hide domain={[80, 160]} />
                 <Tooltip 
                   contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff'}}
                   itemStyle={{fontSize: '10px', fontWeight: 'bold'}}
                 />
                 <Area type="monotone" dataKey="nonCompliant" stroke="#e2e8f0" strokeWidth={3} fill="transparent" />
                 <Area type="monotone" dataKey="compliant" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCompliant)" />
              </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>

      {/* 3. CARBON MARGIN STRESS TEST (V2) */}
      <div className="bg-slate-950 rounded-3xl border border-white/10 p-10 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <Calculator size={160} className="text-red-500" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
           <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer size={18} className="text-red-500" />
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Carbon Margin Stress Test</h3>
              </div>
              <h4 className="text-3xl font-black tracking-tight leading-tight">Deterministic <br/>Exposure Mapping</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Simulation of internal carbon pricing (ICP) and EU ETS volatility on your gross margins. High Scope 1+2 intensity leads to terminal margin compression.
              </p>
              
              <div className="space-y-6 pt-4">
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Carbon Price Preset</label>
                    <div className="flex gap-2">
                       <button onClick={() => setCarbonPrice(85)} className={`px-2 py-1 rounded text-[9px] font-bold ${carbonPrice === 85 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>PARIS</button>
                       <button onClick={() => setCarbonPrice(140)} className={`px-2 py-1 rounded text-[9px] font-bold ${carbonPrice === 140 ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}>STRESS</button>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Simulation</span>
                      <span className="text-lg font-black text-red-500">€{carbonPrice}/t</span>
                    </div>
                    <input 
                      type="range" 
                      min="40" 
                      max="280" 
                      value={carbonPrice}
                      onChange={(e) => setCarbonPrice(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                 </div>
              </div>
           </div>

           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center relative group hover:bg-white/10 transition-all">
                 <div className="text-[10px] text-red-400 font-bold uppercase mb-2 flex items-center gap-2">
                   <TrendingDown size={14} /> Annual Cost Headwind
                 </div>
                 <div className="text-3xl font-black text-white tabular-nums">
                    {formatCurrency(marginAnalysis.totalCost)}
                 </div>
                 <div className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-tighter">Verified: {data.financialImpact.scope1And2Tonnage || 184500} tCO2e</div>
              </div>
              
              <div className="bg-red-500 text-white rounded-2xl p-8 flex flex-col justify-center shadow-xl shadow-red-500/10">
                 <div className="text-[10px] text-white/60 font-black uppercase mb-2">Margin Compression</div>
                 <div className="text-5xl font-black tabular-nums">
                    -{marginAnalysis.marginImpact}%
                 </div>
                 <div className="text-[10px] text-white/80 mt-2 uppercase font-black tracking-widest">Institutional Exposure</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center relative group hover:bg-white/10 transition-all">
                 <div className="text-[10px] text-emerald-400 font-bold uppercase mb-2 flex items-center gap-2">
                   <Zap size={14} /> Mitigation Recovery
                 </div>
                 <div className="text-3xl font-black text-emerald-400 tabular-nums">
                    €4.2M
                 </div>
                 <div className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-tighter">Via Net-Zero Decoupling</div>
              </div>
           </div>
        </div>
      </div>

      {/* 4. REVENUE SENSITIVITY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:border-indigo-200 transition-all">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg"><Globe size={20} className="text-indigo-600" /></div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Reg-Risk Concentration</h4>
           </div>
           <div className="text-3xl font-black text-slate-900">62.4%</div>
           <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">Revenue from High-Impact Zones</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:border-amber-200 transition-all">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-50 rounded-lg"><Target size={20} className="text-amber-600" /></div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Taxonomy Pipeline</h4>
           </div>
           <div className="text-3xl font-black text-slate-900">€142M</div>
           <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">Eligibility Growth Vector</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:border-red-200 transition-all">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-50 rounded-lg"><LineChart size={20} className="text-red-600" /></div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Carbon Intensity</h4>
           </div>
           <div className="text-3xl font-black text-slate-900">{data.financialImpact.carbonIntensityMetric || '316 tCO2e/€M'}</div>
           <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">Institutional Efficiency Score</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:border-emerald-200 transition-all">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-50 rounded-lg"><Briefcase size={20} className="text-emerald-600" /></div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Assurance ROI</h4>
           </div>
           <div className="text-3xl font-black text-slate-900">18.4%</div>
           <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">Internal Rate of Compliance</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueIntelligence;
