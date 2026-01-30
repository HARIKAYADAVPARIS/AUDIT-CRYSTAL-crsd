import React, { useState } from 'react';
import { analyzeDocument } from './services/gemini'; // Matches root services folder
import LandingPage from './components/LandingPage';
import AnalysisTerminal from './components/AnalysisTerminal';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  const processFile = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeDocument(file);
      setAuditResult(result);
    } catch (error) {
      console.error("Audit failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isStarted) return <LandingPage onStart={() => setIsStarted(true)} />;

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <nav className="p-6 border-b border-white/5 flex justify-between items-center">
        <span className="font-bold tracking-tighter text-xl text-blue-500">AUDIT CRYSTAL</span>
        <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">
          INSTITUTIONAL ALPHA
        </span>
      </nav>
      <main className="container mx-auto py-12 px-6">
        <AnalysisTerminal onUpload={processFile} isAnalyzing={isAnalyzing} result={auditResult} />
      </main>
    </div>
  );
}

export default App;
