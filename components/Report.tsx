
import React, { useState } from 'react';
import { AuditResult, ReadinessStatus, DisclosureStatus } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, FileText, Sparkles, ShieldCheck, Clock, Download, Briefcase, LayoutDashboard, Building2, Globe, Scale, Linkedin, Copy, Share2, Presentation, ChevronRight, Activity, PenLine, Trophy } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import TopicHeatmap from './TopicHeatmap';
import AuditChat from './AuditChat';
import MaterialityMatrix from './MaterialityMatrix';
import ProcessChecklist from './ProcessChecklist';
import CFOExecutiveBrief from './CFOExecutiveBrief';
import SolutionMarketplace from './SolutionMarketplace';
import EvidenceViewer from './EvidenceViewer';
import SchemaViewer from './SchemaViewer';
import RegulatoryBriefing from './RegulatoryBriefing';
import PolicyDraftModal from './PolicyDraftModal';
import PeerIntelligence from './PeerIntelligence';
import BoardVideo from './BoardVideo';
import GlobalReadinessReview from './GlobalReadinessReview';
import { generateESRSPolicy } from '../services/gemini';

interface ReportProps {
  data: AuditResult;
  pdfUrl?: string | null;
  onReset: () => void;
}

const Report: React.FC<ReportProps> = ({ data, pdfUrl, onReset }) => {
  const [expandedDisclosure, setExpandedDisclosure] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'standard' | 'cfo' | 'group' | 'boardroom'>('standard');
  const [showEvidence, setShowEvidence] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Policy Architect State
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isPolicyLoading, setIsPolicyLoading] = useState(false);
  const [activeGap, setActiveGap] = useState<{code: string, desc: string} | null>(null);
  const [policyDraft, setPolicyDraft] = useState("");

  const handleDraftPolicy = async (gap: DisclosureStatus) => {
    setActiveGap({ code: gap.code, desc: gap.description });
    setIsPolicyModalOpen(true);
    setIsPolicyLoading(true);
    try {
      const draft = await generateESRSPolicy(gap.code, gap.description, data);
      setPolicyDraft(draft);
    } catch (err) {
      console.error(err);
      setPolicyDraft("Failed to generate policy. Please check your connection.");
    } finally {
      setIsPolicyLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return '#22c55e';
    if (score >= 40) return '#eab308';
    return '#ef4444';
  };

  const getStatusBadge = (status: ReadinessStatus) => {
    switch (status) {
      case ReadinessStatus.READY:
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1"><CheckCircle2 size={14} /> Ready</span>;
      case ReadinessStatus.PARTIALLY_READY:
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold flex items-center gap-1"><AlertTriangle size={14} /> Partially Ready</span>;
      case ReadinessStatus.NOT_READY:
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-1"><XCircle size={14} /> Not Ready</span>;
    }
  };

  const shareText = `🚀 The first Auditor-Grade AI for CSRD is here.\n\nI just audited ${data.companyName} using Audit Crystal, and we achieved a readiness score of ${data.scoreValue}/100. Their Evidence-Lock™ engine provides zero-hallucination citations directly for the CFO. Check out your score at [Link].\n\n#CSRD #AuditTech #AI #Sustainability #CFO`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const pieData = [{ name: 'Completed', value: data.scoreValue }, { name: 'Gap', value: 100 - data.scoreValue }];
  const normalizedRadarData = [
    { subject: 'Materiality', A: (data.scoreBreakdown.doubleMateriality / 25) * 100 },
    { subject: 'Value Chain', A: (data.scoreBreakdown.valueChain / 15) * 100 },
    { subject: 'Data', A: (data.scoreBreakdown.dataGranularity / 20) * 100 },
    { subject: 'Strategy', A: (data.scoreBreakdown.strategyGovernance / 20) * 100 },
    { subject: 'Frameworks', A: (data.scoreBreakdown.frameworkAlignment / 20) * 100 },
  ];

  if (viewMode === 'boardroom') {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in zoom-in duration-500 bg-slate-950 p-12 rounded-3xl border border-slate-800 shadow-2xl min-h-[80vh] flex flex-col justify-center">
        <div className="flex justify-between items-start mb-16">
          <div>
            <div className="flex items-center gap-3 text-amber-400 font-bold uppercase tracking-widest text-xs mb-4">
              <Presentation size={20} /> Executive Committee Briefing
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter">
              CSRD Readiness: <span className="text-amber-500">{data.companyName}</span>
            </h1>
          </div>
          <button 
            onClick={() => setViewMode('standard')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10"
          >
            Exit Boardroom Mode
          </button>
        </div>

        <BoardVideo data={data} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-4">The Verdict</h3>
              <div className="flex items-center gap-6">
                <div className="text-8xl font-black text-white">{data.scoreValue}<span className="text-3xl text-slate-500">/100</span></div>
                <div>{getStatusBadge(data.readinessScore)}</div>
              </div>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-amber-400 font-bold uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
                <Activity size={14} /> 3 Primary Risks
              </h3>
              <div className="space-y-4">
                {data.mandatoryDisclosures.slice(0, 3).map((d, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-200">
                    <ChevronRight className="text-amber-500" size={16} />
                    <span className="font-medium">{d.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-12 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
              <ShieldCheck size={400} />
            </div>
            <h3 className="text-white text-3xl font-bold mb-2">Cost of Inaction</h3>
            <div className="text-6xl font-black text-amber-500 mb-4">{data.financialImpact.estimatedRevenueAtRisk}</div>
            <p className="text-slate-400 text-center max-w-sm">Projected annual liability and market valuation risk under CSRD non-compliance.</p>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
           <button 
             onClick={() => window.print()}
             className="px-8 py-4 bg-amber-500 text-slate-950 font-black rounded-full hover:bg-amber-400 transition-all flex items-center gap-3 text-lg"
           >
             <Download size={24} /> Download Official Board Deck
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 print:pb-0 print:animate-none">
      
      {isPolicyModalOpen && activeGap && (
        <PolicyDraftModal 
          gapCode={activeGap.code}
          gapDescription={activeGap.desc}
          policyContent={policyDraft}
          isLoading={isPolicyLoading}
          onClose={() => setIsPolicyModalOpen(false)}
        />
      )}

      {showShareModal && (
        <div className="fixed inset-0 z-[70] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Share2 size={20} className="text-amber-500" />
                Share Audit Success
              </h3>
              <button onClick={() => setShowShareModal(false)}><XCircle className="text-slate-400" /></button>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-slate-700 whitespace-pre-wrap font-mono leading-relaxed">{shareText}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold"
              >
                {copied ? <CheckCircle2 className="text-emerald-500" size={18} /> : <Copy size={18} />}
                {copied ? "Copied!" : "Copy Post Content"}
              </button>
              <button 
                onClick={handleLinkedInShare}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0077b5] text-white rounded-xl hover:bg-[#005582] transition-colors text-sm font-bold"
              >
                <Linkedin size={18} />
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>
      )}

      {showEvidence && <EvidenceViewer data={data} pdfUrl={pdfUrl} onClose={() => setShowEvidence(false)} />}
      {showMethodology && (
        <div className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <Scale className="text-amber-500" size={20} />
                <h3 className="font-bold text-slate-900">Scoring Methodology & Protocol</h3>
              </div>
              <button onClick={() => setShowMethodology(false)}><XCircle className="text-slate-500" /></button>
            </div>
            <div className="p-6 overflow-y-auto bg-slate-950"><SchemaViewer /></div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="text-amber-500" />
            Audit Crystal Report: {data.companyName}
          </h2>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
             <Clock size={12} />
             <span>Analysis generated: {new Date(data.timestamp).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-end md:items-center print:hidden">
          <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
            <button onClick={() => setViewMode('standard')} className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 ${viewMode === 'standard' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}><LayoutDashboard size={14} />Standard</button>
            <button onClick={() => setViewMode('cfo')} className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 ${viewMode === 'cfo' ? 'bg-slate-900 text-amber-400' : 'text-slate-500 hover:bg-slate-50'}`}><Briefcase size={14} />CFO</button>
            <button onClick={() => setViewMode('boardroom')} className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 ${(viewMode as any) === 'boardroom' ? 'bg-slate-950 text-amber-400 ring-2 ring-amber-400/50' : 'text-slate-500 hover:bg-slate-50'}`}><Presentation size={14} />Board</button>
            <button onClick={() => setViewMode('group')} className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 ${viewMode === 'group' ? 'bg-slate-900 text-emerald-400' : 'text-slate-500 hover:bg-slate-50'}`}><Building2 size={14} />Group</button>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setShowShareModal(true)} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2 text-sm"><Share2 size={16} />Share</button>
            <button onClick={() => setShowMethodology(true)} className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg"><Scale size={16} /></button>
            <button onClick={() => window.print()} className="px-3 py-2 text-sm font-medium bg-white text-slate-700 border border-slate-200 rounded-lg"><Download size={16} /></button>
            <button onClick={onReset} className="px-4 py-2 text-sm text-slate-600 font-bold hover:bg-slate-100 rounded-lg">New</button>
          </div>
        </div>
      </div>

      {viewMode === 'group' ? (
        <GlobalReadinessReview data={data} />
      ) : viewMode === 'cfo' ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CFOExecutiveBrief data={data} />
            </div>
            <div>
              <PeerIntelligence companyName={data.companyName} userScore={data.scoreValue} />
            </div>
          </div>
          <BoardVideo data={data} />
          <SolutionMarketplace data={data} />
          <RegulatoryBriefing />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Readiness Score</h3>
              <div className="h-32 w-32 relative mb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={40} outerRadius={60} startAngle={90} endAngle={-270} dataKey="value">
                      <Cell fill={getScoreColor(data.scoreValue)} /><Cell fill="#f1f5f9" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-3xl font-bold text-slate-800">{data.scoreValue}</span></div>
              </div>
              {getStatusBadge(data.readinessScore)}
            </div>

            <div className="md:col-span-1 bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">Score Composition</h3>
              <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={normalizedRadarData}>
                    <PolarGrid stroke="#e2e8f0" /><PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <Radar name="Score" dataKey="A" stroke="#f59e0b" fill="#fcd34d" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Executive Summary</h3>
              <p className="text-slate-700 text-sm leading-relaxed flex-1 report-scroll overflow-y-auto max-h-[160px] pr-2">{data.executiveSummary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
             <div className="lg:col-span-3">
                <RegulatoryBriefing />
             </div>
             <div>
                <div className="bg-slate-900 rounded-xl p-6 text-white h-full border border-slate-800 flex flex-col justify-center text-center">
                   <Trophy size={48} className="text-amber-400 mx-auto mb-4" />
                   <h4 className="font-bold text-lg mb-2">Peer Position</h4>
                   <p className="text-slate-400 text-xs mb-4">You are scoring higher than 64% of industry competitors.</p>
                   <button 
                     onClick={() => setViewMode('cfo')}
                     className="mt-auto py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-all"
                   >
                     View Peer Intel
                   </button>
                </div>
             </div>
          </div>
          
          <ProcessChecklist data={data} />
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"><TopicHeatmap topics={data.esrsTopics} /></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MaterialityMatrix topics={data.doubleMaterialityMatrix} />
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><ShieldCheck className="text-indigo-600" size={20} /><h3 className="font-bold text-slate-800">Gap Analysis & Smart Fix</h3></div>
                <Sparkles className="text-indigo-400" size={16} />
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto report-scroll pr-2 max-h-[400px]">
                {data.mandatoryDisclosures.map((item, idx) => (
                  <div key={idx} className={`rounded-lg border p-3 ${expandedDisclosure === idx ? 'bg-slate-50 border-indigo-200' : 'bg-white border-slate-100'}`}>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3 cursor-pointer" onClick={() => setExpandedDisclosure(expandedDisclosure === idx ? null : idx)}>
                        <div className={`mt-0.5 ${item.status === 'Present' ? 'text-green-500' : 'text-red-500'}`}>
                          {item.status === 'Present' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-800 text-sm">{item.code}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${item.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.status}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                      
                      {expandedDisclosure === idx && item.status === 'Missing' && (
                        <div className="pt-2 border-t border-slate-100 animate-in slide-in-from-top-1">
                          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                             <h5 className="text-[10px] font-bold text-amber-800 uppercase mb-2 flex items-center gap-1">
                               <Sparkles size={10} /> Remediation AI Recommendation
                             </h5>
                             <p className="text-xs text-slate-700 mb-3">{item.fixRecommendation}</p>
                             <button 
                               onClick={(e) => { e.stopPropagation(); handleDraftPolicy(item); }}
                               className="w-full py-2 bg-slate-900 text-amber-400 text-[10px] font-bold rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                             >
                               <PenLine size={12} /> DRAFT FULL POLICY WITH AI
                             </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <AuditChat auditResult={data} />
    </div>
  );
};

export default Report;
