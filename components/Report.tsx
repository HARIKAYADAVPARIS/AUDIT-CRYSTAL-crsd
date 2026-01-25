
import React, { useState } from 'react';
import { AuditResult, ReadinessStatus, DisclosureStatus } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, FileText, Sparkles, ShieldCheck, Clock, Download, Briefcase, LayoutDashboard, Building2, Globe, Scale, Linkedin, Copy, Share2, Presentation, ChevronRight, Activity, PenLine, Trophy, SearchCheck, Layers, Gem, TrendingUp, Coins, ChevronDown, FileJson, FileType, Printer, FileDown, Target, Info } from 'lucide-react';
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
import FrameworkIntelligence from './FrameworkIntelligence';
import RevenueIntelligence from './RevenueIntelligence';
import ThoughtLeadership from './ThoughtLeadership';
import { generateESRSPolicy } from '../services/gemini';

interface ReportProps {
  data: AuditResult;
  pdfUrl?: string | null;
  onReset: () => void;
}

const Report: React.FC<ReportProps> = ({ data, pdfUrl, onReset }) => {
  const [viewMode, setViewMode] = useState<'standard' | 'cfo' | 'group' | 'boardroom' | 'assurance' | 'revenue'>('assurance');
  const [showEvidence, setShowEvidence] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
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
      setPolicyDraft("Failed to generate policy draft.");
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

  const shareText = `🚀 Auditor-Grade AI for CSRD.\n\nI just audited ${data.companyName} using Audit Crystal. Readiness score: ${data.scoreValue}/100. #CSRD #AuditTech`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleDownloadJSON = () => {
    const filename = `AuditCrystal_${data.companyName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const handlePrintPDF = () => {
    window.print();
    setShowExportMenu(false);
  };

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
      case 'ESRS': return <Scale size={18} className="text-amber-500" />;
      case 'GRI': return <Globe size={18} className="text-emerald-500" />;
      case 'SASB': return <Target size={18} className="text-indigo-500" />;
      case 'TCFD': return <ShieldCheck size={18} className="text-orange-500" />;
      case 'ISSB': return <Layers size={18} className="text-blue-500" />;
      default: return <Info size={18} />;
    }
  };

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
          <button onClick={() => setViewMode('assurance')} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10">Exit Boardroom</button>
        </div>
        <BoardVideo data={data} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 print:pb-0">
      
      {isPolicyModalOpen && activeGap && (
        <PolicyDraftModal gapCode={activeGap.code} gapDescription={activeGap.desc} policyContent={policyDraft} isLoading={isPolicyLoading} onClose={() => setIsPolicyModalOpen(false)} />
      )}

      {showShareModal && (
        <div className="fixed inset-0 z-[70] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><Share2 size={20} className="text-amber-500" /> Share Audit</h3>
            <div className="bg-slate-50 p-4 rounded-xl mb-6 text-sm font-mono">{shareText}</div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleCopy} className="py-3 border border-slate-200 rounded-xl font-bold">{copied ? "Copied!" : "Copy"}</button>
              <button onClick={handleLinkedInShare} className="py-3 bg-[#0077b5] text-white rounded-xl font-bold">LinkedIn</button>
            </div>
          </div>
        </div>
      )}

      {showEvidence && <EvidenceViewer data={data} pdfUrl={pdfUrl} onClose={() => setShowEvidence(false)} />}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3"><Gem className="text-amber-500" /> Audit Crystal: {data.companyName}</h2>
          <div className="text-[10px] text-slate-400 mt-1 font-black uppercase tracking-widest flex gap-4">
             <span className="flex items-center gap-1"><Clock size={12} /> {new Date(data.timestamp).toLocaleDateString()}</span>
             <span className="flex items-center gap-1 text-emerald-600"><ShieldCheck size={12} /> Auditor Verified</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-end md:items-center">
          <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm ring-1 ring-slate-100 flex-wrap">
            <button onClick={() => setViewMode('assurance')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'assurance' ? 'bg-slate-900 text-amber-400' : 'text-slate-500 hover:bg-slate-50'}`}><Layers size={14} />Assurance</button>
            <button onClick={() => setViewMode('revenue')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'revenue' ? 'bg-slate-900 text-emerald-400' : 'text-slate-500 hover:bg-slate-50'}`}><Coins size={14} />Revenue Alpha</button>
            <button onClick={() => setViewMode('standard')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'standard' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}><LayoutDashboard size={14} />Board</button>
            <button onClick={() => setViewMode('cfo')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'cfo' ? 'bg-slate-900 text-indigo-400' : 'text-slate-500 hover:bg-slate-50'}`}><Briefcase size={14} />Workbench</button>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrintPDF}
              className="px-5 py-2.5 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2 text-[10px] uppercase tracking-widest"
              title="Download full report as PDF"
            >
              <FileDown size={14} className="text-amber-400" /> Download PDF
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all shadow-lg flex items-center gap-2 text-[10px] uppercase tracking-widest"
              >
                <Download size={14} className="text-indigo-600" /> Export <ChevronDown size={14} />
              </button>
              
              {showExportMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[80] overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <button 
                    onClick={handlePrintPDF}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100"
                  >
                    <FileType size={18} className="text-red-500" />
                    <div>
                      <div className="text-xs font-black text-slate-900 uppercase">Assurance Report</div>
                      <div className="text-[10px] text-slate-500 font-bold">PDF Format</div>
                    </div>
                  </button>
                  <button 
                    onClick={handleDownloadJSON}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3"
                  >
                    <FileJson size={18} className="text-indigo-500" />
                    <div>
                      <div className="text-xs font-black text-slate-900 uppercase">XBRL-Ready Logic</div>
                      <div className="text-[10px] text-slate-500 font-bold">JSON Data Object</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
            
            <button onClick={() => setShowShareModal(true)} className="px-5 py-2.5 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2 text-[10px] uppercase tracking-widest"><Share2 size={14} />Share</button>
          </div>
        </div>
      </div>

      {viewMode === 'assurance' ? (
        <div className="space-y-6">
          <FrameworkIntelligence data={data} onShowEvidence={() => setShowEvidence(true)} />
          <RegulatoryBriefing />
          <ThoughtLeadership />
        </div>
      ) : viewMode === 'revenue' ? (
        <RevenueIntelligence data={data} />
      ) : viewMode === 'group' ? (
        <GlobalReadinessReview data={data} />
      ) : viewMode === 'cfo' ? (
        <CFOExecutiveBrief data={data} />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Position</h3>
              <div className="h-32 w-32 relative mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={[{value: data.scoreValue}, {value: 100-data.scoreValue}]} innerRadius={40} outerRadius={60} startAngle={90} endAngle={-270} dataKey="value"><Cell fill={getScoreColor(data.scoreValue)} /><Cell fill="#f1f5f9" /></Pie></PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center font-black text-4xl">{data.scoreValue}</div>
              </div>
              {getStatusBadge(data.readinessScore)}
            </div>
            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Executive Brief</h3>
               <p className="text-slate-700 text-sm leading-relaxed font-medium italic">"{data.executiveSummary}"</p>
               
               <div className="mt-8 pt-8 border-t border-slate-100">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Standardized Compliance IQ</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {data.detailedFrameworks?.map((fw, idx) => (
                      <div key={idx} className="space-y-2 group">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-1.5">
                              {getFrameworkIcon(fw.name)}
                              <span className="text-[10px] font-black text-slate-800">{fw.name}</span>
                           </div>
                           <span className={`text-[9px] font-black ${getStatusColor(fw.status)}`}>{fw.status}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <div 
                             className={`h-full transition-all duration-1000 ${
                               fw.alignmentScore >= 80 ? 'bg-emerald-500' : fw.alignmentScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                             }`}
                             style={{ width: `${fw.alignmentScore}%` }}
                           />
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-slate-900">{fw.alignmentScore}%</span>
                           {fw.missingCriticals?.length > 0 ? (
                             <span className="text-[8px] font-black text-red-400 uppercase">{fw.missingCriticals.length} Gaps</span>
                           ) : (
                             <span className="text-[8px] font-black text-emerald-500 uppercase">Synced</span>
                           )}
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PeerIntelligence companyName={data.companyName} userScore={data.scoreValue} />
            <div className="flex flex-col gap-6">
               <ThoughtLeadership />
               <ProcessChecklist data={data} />
            </div>
          </div>
        </div>
      )}
      <AuditChat auditResult={data} />
    </div>
  );
};

export default Report;
