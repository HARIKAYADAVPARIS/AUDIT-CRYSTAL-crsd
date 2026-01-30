
import React, { useState, useMemo } from 'react';
import { AuditResult } from '../types';
import { TrendingUp, ShieldAlert, Zap, ArrowUpRight, CheckCircle2, DollarSign, Activity, Play, Pause, Loader2, Volume2, Info, ChevronRight, BarChart3, Target, Sparkles, TrendingDown, Thermometer, CloudLightning, Sun, Waves, Calculator, Sliders, Edit3, Save } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Cell, BarChart, Bar } from 'recharts';
// Fixed: use decode instead of decodeBase64
import { generateBriefingAudio, decodeAudioData, decode } from '../services/gemini';

interface CFOExecutiveBriefProps {
  data: AuditResult;
}

const CFOExecutiveBrief: React.FC<CFOExecutiveBriefProps> = ({ data }) => {
  const [isBriefingLoading, setIsBriefingLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);
  const [isWorkbenchOpen, setIsWorkbenchOpen] = useState(false);
  
  // Auditor Overrides
  const [manualRevenue, setManualRevenue] = useState<number>(data.financialImpact.totalRevenue || 0);
  const [manualRiskPercent, setManualRiskPercent] = useState<number>(data.financialImpact.revenueAtRiskPercentage || 0);

  // State for ROI Simulator
  const [activeRemediations, setActiveRemediations] = useState<number[]>([]);
  
  // State for Climate Stress Test (0: 1.5C, 1: 2.0C, 2: 4.0C)
  const [scenarioIdx, setScenarioIdx] = useState(0);

  // Deterministic Engine Calculations
  const calculatedRiskAmount = useMemo(() => {
    return (manualRevenue * (manualRiskPercent / 100));
  }, [manualRevenue, manualRiskPercent]);

  const handlePlayBriefing = async () => {
    if (isPlaying && audioSource) {
      audioSource.stop();
      setIsPlaying(false);
      return;
    }
    setIsBriefingLoading(true);
    try {
      const audioContent = `CFO Briefing for ${data.companyName}. Current revenue at risk is estimated at ${formatCurrency(calculatedRiskAmount)}. Cost of capital impact is ${data.financialImpact.costOfCapitalImpactBps} basis points.`;
      const base64Audio = await generateBriefingAudio(audioContent);
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      // Fixed: use decode instead of decodeBase64
      const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx);
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.onended = () => setIsPlaying(false);
      source.start();
      setAudioSource(source);
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsBriefingLoading(false);
    }
  };

  const simulatedResults = useMemo(() => {
    const scoreBoost = activeRemediations.reduce((acc, idx) => acc + (data.roadmap[idx]?.impactOnScore || 0), 0);
    const bpsReduction = activeRemediations.length * 8; 
    
    return {
      score: Math.min(100, data.scoreValue + scoreBoost),
      bps: Math.max(0, data.financialImpact.costOfCapitalImpactBps - bpsReduction),
      valuationRecovery: activeRemediations.length * 1.5 
    };
  }, [activeRemediations, data.scoreValue, data.roadmap, data.financialImpact.costOfCapitalImpactBps]);

  const climateImpact = useMemo(() => {
    const scenarios = data.financialImpact.climateScenarios || [
      { temp: '1.5°C', riskLevel: 'Low', revenueImpactMultiplier: 1.0, valuationImpactMultiplier: 1.0, keyRiskDriver: "Transition costs" },
      { temp: '2.0°C', riskLevel: 'Moderate', revenueImpactMultiplier: 1.15, valuationImpactMultiplier: 1.08, keyRiskDriver: "Resource scarcity" },
      { temp: '4.0°C', riskLevel: 'Catastrophic', revenueImpactMultiplier: 1.4, valuationImpactMultiplier: 1.25, keyRiskDriver: "Supply chain collapse" }
    ];
    return scenarios[scenarioIdx];
  }, [scenarioIdx, data.financialImpact.climateScenarios]);

  const toggleRemediation = (idx: number) => {
    setActiveRemediations(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const formatCurrency = (val: number | undefined) => {
    if (!val) return '—';
    return new Intl.NumberFormat('en-DE', { style: 'currency', currency: data.financialImpact.currency || 'EUR', notation: 'compact' }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. FINANCIAL ALPHA HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-slate-950 rounded-2xl p-8 text-white relative overflow-hidden border border-white/10 shadow-2xl">
           <div className="absolute top-0 right-0 p-8 opacity-5">
             <DollarSign size={240} />
           </div>
           
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
             <div className="space-y-2 flex-1">
               <div className="flex items-center gap-3 mb-2">
                 <h3 className="text-amber-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                   <Calculator size={14} className="animate-pulse" /> Deterministic Risk Engine
                 </h3>
                 <span className="text-[9px] font-black bg-white/10 px-2 py-0.5 rounded text-slate-400 uppercase tracking-tighter">Verified Extraction</span>
               </div>
               
               <div className="text-6xl font-black tracking-tighter flex flex-col">
                 <div className="flex items-baseline gap-2">
                   {formatCurrency(calculatedRiskAmount)}
                   <span className="text-sm text-slate-500 font-medium uppercase tracking-widest">Total Exposure</span>
                 </div>
                 
                 <div className="flex items-center gap-4 mt-4">
                    <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
                      <ArrowUpRight size={12} className="text-amber-500" />
                      Revenue: {formatCurrency(manualRevenue)}
                    </div>
                    <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
                      <ShieldAlert size={12} className="text-amber-500" />
                      Risk Weight: <span className="text-amber-400">{manualRiskPercent.toFixed(1)}%</span>
                    </div>
                    <button 
                      onClick={() => setIsWorkbenchOpen(!isWorkbenchOpen)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${
                        isWorkbenchOpen ? 'bg-amber-500 text-slate-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <Sliders size={12} /> {isWorkbenchOpen ? 'Close Workbench' : 'Auditor Override'}
                    </button>
                 </div>
               </div>

               {isWorkbenchOpen && (
                 <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl animate-in slide-in-from-top-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase">Adjust Total Revenue ({data.financialImpact.currency})</label>
                          <input 
                            type="number"
                            value={manualRevenue}
                            onChange={(e) => setManualRevenue(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-sm font-bold text-white outline-none focus:border-amber-500"
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase">Adjust Risk Factor (%)</label>
                          <div className="flex items-center gap-4">
                            <input 
                              type="range"
                              min="0"
                              max="20"
                              step="0.1"
                              value={manualRiskPercent}
                              onChange={(e) => setManualRiskPercent(Number(e.target.value))}
                              className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                            <span className="text-sm font-black text-amber-400 w-12">{manualRiskPercent}%</span>
                          </div>
                       </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-4 italic">*Changes update risk projections and CFO briefing content in real-time.</p>
                 </div>
               )}

               <p className="text-slate-400 text-sm max-lg leading-relaxed pt-6">
                 Aggregate financial liability identified across ESRS domains. Current profile creates a <span className="text-red-400 font-bold">-{data.financialImpact.marketValuationRisk}</span> market valuation discount based on {manualRiskPercent}% terminal risk.
               </p>
             </div>

             <div className="flex flex-col gap-4 w-full md:w-auto">
               <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                 <div className="text-xs text-slate-500 font-bold uppercase mb-1">Cost of Capital Impact</div>
                 <div className="text-5xl font-black text-red-400 tabular-nums">
                   +{data.financialImpact.costOfCapitalImpactBps}
                   <span className="text-xs font-bold uppercase text-slate-500 ml-1">bps</span>
                 </div>
                 <div className="mt-2 text-[10px] text-red-300 bg-red-950/30 px-2 py-1 rounded inline-flex items-center gap-1 border border-red-900/50 uppercase font-black">
                   <ShieldAlert size={10} /> Significant Risk Premium
                 </div>
               </div>
               
               <button 
                 onClick={handlePlayBriefing}
                 className="w-full h-12 bg-white text-slate-950 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-amber-400 transition-all shadow-xl group border border-white/10"
               >
                 {isBriefingLoading ? <Loader2 size={20} className="animate-spin" /> : isPlaying ? <Pause size={20} /> : <Volume2 size={20} />}
                 {isPlaying ? "STOP BRIEFING" : "GENERATE CFO VOICE MEMO"}
               </button>
             </div>
           </div>
        </div>

        {/* Climate Resilience */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-white/5 flex flex-col justify-between text-white shadow-xl">
           <div>
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
               <Thermometer size={14} className="text-red-400" /> Climate Resilience
             </h3>
             <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/10 mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Scenario</span>
                  <span className="text-2xl font-black text-amber-400">{climateImpact.temp}</span>
                </div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                   <Sun size={32} className={climateImpact.riskLevel === 'Catastrophic' ? 'text-red-500 animate-pulse' : 'text-amber-400'} />
                </div>
             </div>
             <div className="space-y-1">
               <div className="text-[10px] text-slate-500 font-bold uppercase">Risk Level</div>
               <div className={`text-xs font-black uppercase ${
                 climateImpact.riskLevel === 'Catastrophic' ? 'text-red-500' : 'text-orange-400'
               }`}>
                 {climateImpact.riskLevel} Profile
               </div>
             </div>
           </div>
           
           <div className="mt-6 flex flex-col gap-2">
              <input 
                type="range" 
                min="0" 
                max="2" 
                step="1" 
                value={scenarioIdx}
                onChange={(e) => setScenarioIdx(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase px-1">
                <span>1.5C</span>
                <span>2.0C</span>
                <span>4.0C</span>
              </div>
           </div>
        </div>
      </div>

      {/* 2. REMEDIATION ROI SIMULATOR */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-inner overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Zap size={300} className="text-indigo-600" />
        </div>

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-12">
          <div className="xl:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Remediation ROI Simulator</h2>
                <p className="text-slate-500 text-sm">Select audit steps to see projected financial recovery.</p>
              </div>
              <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold border border-slate-800 flex items-center gap-2">
                {activeRemediations.length} Steps Selected
              </div>
            </div>

            <div className="space-y-3">
              {data.roadmap.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleRemediation(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                    activeRemediations.includes(idx)
                      ? 'bg-indigo-600 border-indigo-700 shadow-lg shadow-indigo-200'
                      : 'bg-white border-slate-200 hover:border-indigo-400 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      activeRemediations.includes(idx) ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${activeRemediations.includes(idx) ? 'text-white' : 'text-slate-800'}`}>
                        {step.action}
                      </div>
                      <div className={`text-[10px] font-medium uppercase tracking-wider ${activeRemediations.includes(idx) ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {step.phase} • {step.impactOnScore} pts impact
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-black px-2 py-1 rounded ${
                      activeRemediations.includes(idx) ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {step.financialSavingEstimate}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      activeRemediations.includes(idx) ? 'bg-white border-white' : 'border-slate-200'
                    }`}>
                      {activeRemediations.includes(idx) && <CheckCircle2 size={16} className="text-indigo-600" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="xl:col-span-5">
            <div className="sticky top-24 bg-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-slate-800 space-y-8">
              <h3 className="text-amber-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <BarChart3 size={14} /> Live Projections
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Simulated Score</div>
                  <div className="text-5xl font-black tabular-nums transition-all duration-500 text-white">
                    {simulatedResults.score}
                    <span className="text-xs text-slate-600 ml-1">/100</span>
                  </div>
                  <div className={`text-[10px] font-bold transition-all ${simulatedResults.score > data.scoreValue ? 'text-emerald-400' : 'text-slate-600'}`}>
                    +{simulatedResults.score - data.scoreValue} pts improvement
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">BPS Recovery</div>
                  <div className="text-5xl font-black tabular-nums transition-all duration-500 text-emerald-400">
                    -{activeRemediations.length * 8}
                    <span className="text-xs text-slate-600 ml-1">bps</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase">Saving Potential</div>
                </div>
              </div>

              <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6 space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-red-200">Adjusted Risk Factor</span>
                    <span className="text-xs font-black px-2 py-0.5 bg-red-500 text-white rounded uppercase">{climateImpact.temp} Stress</span>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                       <span className="text-[10px] text-slate-500 font-bold uppercase">Stressed Exposure</span>
                       <span className="text-2xl font-black text-red-400">
                         {formatCurrency(calculatedRiskAmount * climateImpact.revenueImpactMultiplier)}
                       </span>
                    </div>
                    <div className="flex-1">
                       <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: `${(climateImpact.revenueImpactMultiplier - 0.8) * 100}%` }}></div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300">Valuation Recovery Potential</span>
                  <span className="text-sm font-black text-emerald-400">+{simulatedResults.valuationRecovery}% Recovery</span>
                </div>
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-1">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-emerald-400 to-amber-400 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(100, (simulatedResults.valuationRecovery / 10) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-4">
                <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-start gap-4">
                  <div className="p-2 bg-indigo-500 rounded-xl">
                    <ShieldAlert size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-indigo-400">Auditor Insight</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      Current remediation path reduces {climateImpact.temp} scenario volatility by {activeRemediations.length * 5}bps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CFOExecutiveBrief;
