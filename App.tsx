import React, { useState } from 'react';
import { Shield, Globe, BarChart3, ArrowRight } from 'lucide-react';
import AnalysisTerminal from './components/AnalysisTerminal';

function App() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200">
        {/* Institutional Hero */}
        <header className="py-24 px-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/10 blur-[120px]" />
          <h1 className="text-6xl font-black text-white mb-6">Audit Crystal</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Institutional-Grade CSRD Pre-Assurance for the 2026 Reasonable Assurance transition.
          </p>
          <button 
            onClick={() => setShowApp(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 mx-auto transition-transform active:scale-95"
          >
            Enter Workpaper Mode <ArrowRight size={20} />
          </button>
        </header>

        {/* 2026 Compliance Grid */}
        <section className="py-20 container mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
            <Shield className="text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">ISSA 5000 Readiness</h3>
            <p className="text-sm text-slate-400">Alignment with IAASB standards for limited and reasonable assurance workflows.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
            <Globe className="text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Interoperability Matrix</h3>
            <p className="text-sm text-slate-400">Mapping disclosures across ESRS, GRI, and ISSB simultaneously.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
            <BarChart3 className="text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Propagated Transparency</h3>
            <p className="text-sm text-slate-400">Automated 'Penalty by Default' logic for missing value chain data.</p>
          </div>
        </section>

        <footer className="py-10 text-center border-t border-white/5">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">
            Audit Crystal AI Pre-Assurance | Not a licensed accounting firm.
          </p>
        </footer>
      </div>
    );
  }

  return <AnalysisTerminal />;
}

export default App;
