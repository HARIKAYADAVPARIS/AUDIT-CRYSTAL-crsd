import React, { useState } from 'react';
import { analyzeDocument } from '../services/gemini'; // Adjust path if services is at root

/**
 * Audit Crystal: Institutional-Grade CSRD Assurance Interface
 * Sync: ISSA 5000 / Propagated Transparency Logic
 */
export default function App() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // Calling the function from your services/gemini.ts file
      const analysis = await analyzeDocument(file);
      setResult(analysis);
    } catch (error) {
      console.error("Audit failed:", error);
      setResult("Error: Unable to complete institutional pre-assurance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <header className="mb-12 border-b border-slate-700 pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-blue-400">AUDIT CRYSTAL</h1>
        <p className="text-slate-400 mt-2">Institutional-Grade CSRD Assurance & Readiness Insights</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <section className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-2xl">
          <h2 className="text-xl font-semibold mb-4 text-slate-200">Auditor Workpaper Mode</h2>
          <p className="text-sm text-slate-400 mb-6">
            Upload sustainability disclosures for multi-framework alignment (ESRS/GRI/ISSB) 
            and ISSA 5000 protocol verification.
          </p>

          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
            <span className="text-slate-300 font-medium">
              {loading ? "Analyzing Document..." : "Drop file to start CSRD Audit"}
            </span>
            <input type="file" className="hidden" onChange={handleFileUpload} disabled={loading} />
          </label>
        </section>

        {result && (
          <section className="mt-12 bg-slate-800 rounded-xl p-8 border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4 uppercase tracking-widest">Readiness Report</h3>
            <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap">
              {result}
            </div>
          </section>
        )}
      </main>

      <footer className="mt-24 text-center text-slate-500 text-xs uppercase tracking-widest">
        Audit Crystal © 2026 | Institutional Alpha Protocol
      </footer>
    </div>
  );
}
