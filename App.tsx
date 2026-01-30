import React, { useState } from 'react';
import { analyzeDocument } from './services/gemini'; // Correct root-level path
import LandingPage from './components/LandingPage';
import AnalysisTerminal from './components/AnalysisTerminal';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAudit = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const report = await analyzeDocument(file);
      setResult(report);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <nav className="p-4 border-b border-white/10">
        <h1 className="text-blue-500 font-bold">AUDIT CRYSTAL | Institutional Alpha</h1>
      </nav>
      <main className="p-8">
        <AnalysisTerminal onUpload={handleAudit} isAnalyzing={isAnalyzing} result={result} />
      </main>
    </div>
  );
}

export default App;
