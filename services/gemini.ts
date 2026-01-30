import React, { useState } from 'react';
import { Shield, BarChart, Globe, Lock } from 'lucide-react';
import AnalysisTerminal from './components/AnalysisTerminal';

function App() {
  const [isTerminalActive, setIsTerminalActive] = useState(false);

  if (!isTerminalActive) {
    return (
      <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
        <header className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-7xl font-black mb-6 tracking-tighter">AUDIT CRYSTAL</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">
            Institutional Alpha for 2026 CSRD Compliance. Readiness scores verified against ISSA 5000.
          </p>
          <button 
            onClick={() => setIsTerminalActive(true)}
            className="bg-blue-600 px-10 py-5 rounded-full font-bold hover:bg-blue-500 transition-all"
          >
            Launch Workpaper Mode
          </button>
        </header>

        <section className="container mx-auto px-6 grid md:grid-cols-3 gap-10 py-20 border-t border-white/5">
          <div>
            <Shield className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">ISSA 5000 Protocol</h3>
            <p className="text-slate-400">Supporting the transition from Limited to Reasonable assurance workflows.</p>
          </div>
          <div>
            <Globe className="text-emerald-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Interoperability Matrix</h3>
            <p className="text-slate-400">Single-disclosure mapping across global frameworks like ESRS and GRI.</p>
          </div>
          <div>
            <BarChart className="text-purple-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Propagated Transparency</h3>
            <p className="text-slate-400">Automated "best-to-worst" intervals for missing supplier data.</p>
          </div>
        </section>

        <footer className="py-10 text-center text-[10px] text-slate-700 uppercase tracking-widest">
          Disclaimer: Not a licensed accounting firm. Statutory assurance not provided.
        </footer>
      </div>
    );
  }

  return <AnalysisTerminal />;
}

export default App;
