import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import AnalysisTerminal from './components/AnalysisTerminal';
import { Shield, Globe, BarChart3, Lock, CheckCircle, AlertTriangle } from 'lucide-react';

function App() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
        <HeroSection onStart={() => setShowApp(true)} />
        
        {/* Institutional Features Grid */}
        <section className="py-24 bg-slate-900/50 border-y border-white/5">
          <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
            <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all">
              <Shield className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-4">ISSA 5000 Protocol</h3>
              <p className="text-slate-400 leading-relaxed">
                Pre-aligned with the IAASB global baseline for sustainability assurance, supporting both limited and reasonable assurance workflows[cite: 55, 57].
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all">
              <Globe className="w-12 h-12 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-4">Interoperability IQ</h3>
              <p className="text-slate-400 leading-relaxed">
                Single-disclosure mapping satisfying ESRS, GRI, TCFD, and ISSB standards simultaneously through our alignment matrix[cite: 39, 40].
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all">
              <BarChart3 className="w-12 h-12 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-4">Propagated Transparency</h3>
              <p className="text-slate-400 leading-relaxed">
                Missing value-chain data is automatically flagged and replaced by best-to-worst case intervals to motivate disclosure[cite: 76, 77].
              </p>
            </div>
          </div>
        </section>

        {/* Regulatory Timeline Segment */}
        <section className="py-24 container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-16">2026 Regulatory Roadmap</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-80">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-emerald-500 rounded-full mb-4 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <p className="font-bold text-white">Jan 2025</p>
              <p className="text-sm">Limited Assurance Mandatory [cite: 58, 60]</p>
            </div>
            <div className="h-px bg-white/10 flex-1 hidden md:block" />
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mb-4 animate-pulse" />
              <p className="font-bold text-white">2026-2027</p>
              <p className="text-sm">Reasonable Assurance Transition [cite: 67, 68]</p>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-white/10 text-center">
          <div className="flex justify-center gap-6 mb-6 grayscale opacity-50">
             <span className="text-xs font-black tracking-widest">ESRS</span>
             <span className="text-xs font-black tracking-widest">GRI</span>
             <span className="text-xs font-black tracking-widest">ISSB</span>
          </div>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-2">Audit Crystal Institutional Alpha [cite: 19]</p>
          <p className="text-slate-600 text-[10px] max-w-xl mx-auto px-4">
            Disclaimer: AI-driven pre-assurance only. Not a licensed accounting firm. No statutory assurance provided.
          </p>
        </footer>
      </div>
    );
  }

  return <AnalysisTerminal />;
}

export default App;

