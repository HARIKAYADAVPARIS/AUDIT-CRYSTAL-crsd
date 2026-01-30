import React, { useState } from 'react';
import { analyzeDocument } from './services/gemini';
import LandingPage from './components/LandingPage';
import AnalysisTerminal from './components/AnalysisTerminal';

/**
 * AUDIT CRYSTAL - Main Application Entry
 * Focus: CSRD Readiness & Institutional Alpha
 */
function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    try {
      // Logic sync: Page 3 - Propagated Transparency
      const result = await analyzeDocument(file);
      setAuditResult(result);
    } catch (error) {
      console.error("Audit Engine Failure:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <nav className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black">AC</div>
          <span className="font-bold tracking-tighter text-xl uppercase">Audit Crystal</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20 font-bold uppercase tracking-widest">
            Institutional Alpha v1.0
          </span>
        </div>
      </nav>

      <main className="container mx-auto py-12 px-6">
        <AnalysisTerminal 
          onUpload={handleFileUpload} 
          isAnalyzing={isAnalyzing} 
          result={auditResult} 
        />
      </main>

      <footer className="py-12 border-t border-white/5 opacity-40 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em]">
          Not a licensed accounting firm • Pre-Assurance Insights • ISSA 5000 Protocol
        </p>
      </footer>
    </div>
  );
}

export default App;
