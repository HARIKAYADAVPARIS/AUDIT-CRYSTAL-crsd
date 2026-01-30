import React, { useState } from 'react';
import { analyzeDocument } from './services/gemini';
import LandingPage from './components/LandingPage';
import AnalysisTerminal from './components/AnalysisTerminal';

/**
 * AUDIT CRYSTAL - Institutional Alpha v1.0
 * Goal: Forbes 40 Under 40 Readiness
 */
function App() {
  const [active, setActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const startAudit = async (file: File) => {
    setAnalyzing(true);
    try {
      const data = await analyzeDocument(file);
      setReport(data);
    } catch (err) {
      console.error("Audit processing error", err);
    } finally {
      setAnalyzing(false);
    }
  };

  if (!active) {
    return <LandingPage onStart={() => setActive(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <nav className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0">
        <h1 className="font-black tracking-tighter text-xl text-blue-500">AUDIT CRYSTAL</h1>
        <div className="text-[10px] uppercase tracking-widest text-slate-500">ISSA 5000 Protocol Enabled</div>
      </nav>

      <main className="container mx-auto p-6">
        <AnalysisTerminal 
          onUpload={startAudit} 
          isAnalyzing={analyzing} 
          result={report} 
        />
      </main>
    </div>
  );
}

export default App;
