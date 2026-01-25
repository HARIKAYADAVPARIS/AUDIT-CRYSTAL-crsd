
import React from 'react';
import { Gem, ArrowRight, ShieldCheck, Zap, Globe, BarChart3, CheckCircle2, Lock, FileText, Linkedin, Twitter, Instagram, Mail, Fingerprint, Code2, Network, SearchCheck, Building2, Server, Quote, Sparkles, Gavel, AlertCircle, TrendingUp, Layers, Cpu, Microscope, DatabaseZap, Scale, Shield, Compass, Target } from 'lucide-react';

interface LandingPageProps {
  onStart: (useSample?: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-gold-500/30 overflow-x-hidden">
      
      {/* Editorial Gradients - Institutional Deep Night */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] bg-indigo-950/20 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-950/10 rounded-full blur-[140px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-slate-950/40 backdrop-blur-2xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="p-1.5 bg-gradient-to-br from-gold-400 to-gold-600 rounded shadow-[0_0_20px_rgba(198,141,65,0.4)] group-hover:scale-105 transition-transform">
              <Gem className="text-white" size={20} />
            </div>
            <span className="font-serif italic text-2xl tracking-tight text-white">Audit Crystal</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <a href="#protocol" className="hover:text-gold-400 transition-colors">The Protocol</a>
            <a href="#advantage" className="hover:text-gold-400 transition-colors">The Advantage</a>
            <a href="#pricing" className="hover:text-gold-400 transition-colors">Investment</a>
            <button 
              onClick={() => onStart()}
              className="px-6 py-2.5 bg-white text-slate-950 rounded font-black hover:bg-gold-400 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.1)] active:scale-95"
            >
              Initiate Audit
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-40 grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded border border-gold-500/20 bg-gold-500/5 text-gold-400 text-[10px] font-black uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> PRE-AUDIT PROTOCOL MMXXVI
          </div>

          <h1 className="text-7xl lg:text-8xl font-serif leading-[0.95] tracking-tighter text-white">
            Pre-Audit <br />
            <span className="italic text-gold-400">Assurance.</span> <br />
            Global Compliance.
          </h1>
          
          <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-light">
            Don't wait for the auditors to find the gaps. Audit Crystal delivers deterministic, standardized CSRD pre-assurance for global boardrooms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <button 
              onClick={() => onStart()}
              className="h-16 px-10 bg-gold-500 hover:bg-gold-400 text-slate-950 text-xs font-black uppercase tracking-widest rounded transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(198,141,65,0.3)] hover:-translate-y-1"
            >
              Launch Pre-Audit Vault <ArrowRight size={16} strokeWidth={3} />
            </button>
            <button 
              onClick={() => onStart(true)}
              className="h-16 px-10 bg-transparent border border-white/10 hover:border-gold-500/50 text-white text-xs font-black uppercase tracking-widest rounded transition-all flex items-center justify-center gap-3 group"
            >
              <FileText size={16} className="text-slate-500 group-hover:text-gold-400" /> Executive Sample
            </button>
          </div>

          <div className="pt-10 flex items-center gap-12 text-slate-600 text-[10px] font-black uppercase tracking-[0.25em]">
             <span className="flex items-center gap-2 border-b border-transparent hover:border-gold-500 transition-all cursor-default"><Globe size={14} /> Global Hub Residency</span>
             <span className="flex items-center gap-2 border-b border-transparent hover:border-gold-500 transition-all cursor-default"><ShieldCheck size={14} /> ISO 27001 Default</span>
             <span className="flex items-center gap-2 border-b border-transparent hover:border-gold-500 transition-all cursor-default"><Lock size={14} /> Institutional Privacy</span>
          </div>
        </div>

        {/* Hero Visual - High-End Terminal */}
        <div className="relative animate-in fade-in slide-in-from-right-12 duration-1000 delay-300 hidden lg:block">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] opacity-40"></div>
          
          <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-sm p-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)] transform hover:rotate-1 transition-transform duration-700">
             <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                </div>
                <div className="font-serif italic text-gold-500/80 text-sm">Case: Global_Industrial_Group</div>
             </div>
             
             <div className="space-y-10">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Compliance IQ</div>
                        <div className="text-7xl font-serif text-white leading-none">
                            94<span className="text-2xl text-gold-400 font-sans ml-1">%</span>
                        </div>
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] font-black uppercase text-emerald-500 mb-1">Status: Pre-Audit Verified</div>
                       <Shield size={40} className="text-gold-500 ml-auto" />
                    </div>
                </div>

                <div className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-400">Assurance Confidence</span>
                            <span className="text-gold-400">92%</span>
                        </div>
                        <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full w-[92%] bg-gold-400"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-400">Standardized Framework Alignment</span>
                            <span className="text-slate-200">88%</span>
                        </div>
                        <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full w-[88%] bg-white/40"></div>
                        </div>
                    </div>
                </div>
                
                <div className="pt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      Global_Compliance_Node_Active
                    </div>
                    <span>Latency: 0.8s</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* The Protocol - Value Prop */}
      <section id="protocol" className="py-24 border-y border-white/5 bg-white/5 relative z-20">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
              <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.5em]">The Institutional Standard</div>
              <h2 className="text-5xl font-serif text-white tracking-tight leading-none italic">Assurance, not just aggregation.</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-12">
                  <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10"><Fingerprint size={20} className="text-gold-500" /></div>
                      <h4 className="text-sm font-black uppercase tracking-widest">Evidence-First</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Deterministic proof for every claim. Every finding is linked to source documentation for frictionless auditor verification.</p>
                  </div>
                  <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10"><Lock size={20} className="text-gold-500" /></div>
                      <h4 className="text-sm font-black uppercase tracking-widest">Discreet & Secure</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Zero AI training on your sensitive corporate ledger. ISO 27001 default for institutional privacy.</p>
                  </div>
                  <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10"><Scale size={20} className="text-gold-500" /></div>
                      <h4 className="text-sm font-black uppercase tracking-widest">Legal Precision</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Built for global CSRD interoperability. Deterministic logic eliminates AI hallucinations in high-stakes reporting.</p>
                  </div>
                  <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10"><Target size={20} className="text-gold-500" /></div>
                      <h4 className="text-sm font-black uppercase tracking-widest">Sub-Second IQ</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Map 1,200+ ESRS data points instantly. While traditional audits take weeks, we take seconds.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* The Advantage Section */}
      <section id="advantage" className="py-40 relative z-10 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.4em]">Strategic Comparison</div>
              <h2 className="text-6xl font-serif text-white leading-none tracking-tight">The industry <span className="italic text-gold-400">checkmate.</span></h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Platforms like Workiva or Normative are data management tools. Audit Crystal is an **Assurance Engine**. We don't just store data; we cross-examine it to ensure it survives official assurance cycles.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 bg-white/5 rounded border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold-500/50 transition-colors">
                    <CheckCircle2 size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-white mb-1">Standardized Pre-Audit Validation</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">We provide deterministic validation. If a disclosure is present, we show exactly where. If it's missing, we draft remediation policies instantly.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 bg-white/5 rounded border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold-500/50 transition-colors">
                    <CheckCircle2 size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-white mb-1">Boardroom-Grade Summary</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Automated CFO voice briefings and Executive Committee videos translate "Scope 3" into "Margin Risk."</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gold-500/10 blur-[100px] opacity-20"></div>
              <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-10 relative shadow-2xl backdrop-blur-3xl">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white">Pre-Assurance Matrix</h3>
                  <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase text-gold-500 border border-white/5">Updated Live</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-xl">
                    <span className="text-xs font-bold text-slate-400">ISSA 5000 Alignment</span>
                    <span className="text-xs font-black text-emerald-500">OPTIMAL</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-xl">
                    <span className="text-xs font-bold text-slate-400">Standardized ESRS Gap Mapping</span>
                    <span className="text-xs font-black text-emerald-500">100% COMPLETE</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-xl">
                    <span className="text-xs font-bold text-slate-400">Assurance Confidence</span>
                    <span className="text-xs font-black text-gold-500">HIGH (98.4%)</span>
                  </div>
                  <div className="pt-6">
                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Pre-Audit Risk Exposure</div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 w-[22%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="pricing" className="py-40 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.3em] mb-4">Institutional Tiers</div>
            <h2 className="text-5xl font-serif text-white mb-6">Assurance Rigor. <br/><span className="italic">Transparent Terms.</span></h2>
            <p className="text-slate-500 font-light text-xl leading-relaxed">Assurance-grade analysis scaled for your current reporting cycle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="bg-slate-900/50 border border-white/5 p-12 rounded-sm flex flex-col h-full hover:border-gold-500/30 transition-colors">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Preliminary</h4>
              <h3 className="text-2xl font-serif text-white mb-6">Readiness Scan</h3>
              <div className="text-5xl font-serif text-white mb-10">€0 <span className="text-lg text-slate-600">/ trial</span></div>
              <ul className="space-y-4 mb-12 flex-1">
                <li className="flex gap-3 text-sm text-slate-500"><CheckCircle2 size={16} className="text-gold-500 shrink-0" /> High-Level Gap Mapping</li>
                <li className="flex gap-3 text-sm text-slate-500"><CheckCircle2 size={16} className="text-gold-500 shrink-0" /> Readiness Benchmarking</li>
                <li className="flex gap-3 text-sm text-slate-600 italic"><Lock size={16} className="shrink-0" /> Limited Data Mapping</li>
              </ul>
              <button onClick={() => onStart()} className="w-full py-4 border border-white/10 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-colors">Launch Free Scan</button>
            </div>

            <div className="bg-gold-500 border border-gold-600 p-12 rounded-sm flex flex-col h-full shadow-[0_30px_100px_rgba(198,141,65,0.25)] transform scale-105 relative z-20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-950 text-gold-500 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-b-sm">Professional Audit</div>
              <h4 className="text-xs font-black text-slate-950 uppercase tracking-widest mb-2">Pre-Assurance Ready</h4>
              <h3 className="text-2xl font-serif text-slate-950 mb-6">Institutional Grade</h3>
              <div className="text-5xl font-serif text-slate-950 mb-10">€450 <span className="text-lg text-slate-800">/ report</span></div>
              <ul className="space-y-4 mb-12 flex-1">
                <li className="flex gap-3 text-sm text-slate-950 font-medium"><CheckCircle2 size={16} className="shrink-0" /> Full Deterministic Mapping</li>
                <li className="flex gap-3 text-sm text-slate-950 font-medium"><CheckCircle2 size={16} className="shrink-0" /> AI Policy Architect Drafting</li>
                <li className="flex gap-3 text-sm text-slate-950 font-medium"><CheckCircle2 size={16} className="shrink-0" /> CFO Financial Risk Workbench</li>
                <li className="flex gap-3 text-sm text-slate-950 font-medium"><CheckCircle2 size={16} className="shrink-0" /> Veo Boardroom Video Brief</li>
              </ul>
              <button onClick={() => onStart()} className="w-full py-4 bg-slate-950 text-gold-500 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-2xl">Initiate Institutional Audit</button>
            </div>

            <div className="bg-slate-900/50 border border-white/5 p-12 rounded-sm flex flex-col h-full hover:border-gold-500/30 transition-colors">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Portfolio</h4>
              <h3 className="text-2xl font-serif text-white mb-6">Group Protocol</h3>
              <div className="text-5xl font-serif text-white mb-10">Custom</div>
              <ul className="space-y-4 mb-12 flex-1">
                <li className="flex gap-3 text-sm text-slate-500"><CheckCircle2 size={16} className="text-gold-500 shrink-0" /> Multi-Entity Consolidation</li>
                <li className="flex gap-3 text-sm text-slate-500"><CheckCircle2 size={16} className="text-gold-500 shrink-0" /> API Access (ESEF/XBRL)</li>
                <li className="flex gap-3 text-sm text-slate-500"><CheckCircle2 size={16} className="text-gold-500 shrink-0" /> Dedicated Trust Partner</li>
              </ul>
              <button className="w-full py-4 border border-white/10 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-colors">Contact Advisory</button>
            </div>
          </div>
        </div>
      </section>

      {/* Visionary Footer Quote */}
      <section className="py-40 bg-slate-950 relative overflow-hidden border-t border-white/5">
         <div className="max-w-5xl mx-auto px-6 text-center">
            <Quote className="mx-auto text-gold-500/20 mb-12" size={80} />
            <p className="text-4xl lg:text-5xl font-serif italic text-slate-200 leading-snug">
               "In the CSRD era, <span className="text-gold-400 text-6xl">clarity is the ultimate luxury.</span> Audit Crystal is for those who refuse to leave official assurance to chance."
            </p>
            <div className="mt-12 flex flex-col items-center">
               <div className="w-16 h-16 bg-slate-900 rounded-full mb-4 border border-white/10 overflow-hidden grayscale">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150" alt="Founder" className="w-full h-full object-cover" />
               </div>
               <div className="text-[10px] font-black uppercase text-gold-500 tracking-[0.3em]">Institutional Trust Office</div>
            </div>
         </div>
      </section>

      {/* Footer Editorial */}
      <footer id="security" className="py-32 border-t border-white/5 bg-slate-950 relative z-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <Gem className="text-gold-500" size={24} />
              <span className="font-serif italic text-2xl text-white">Audit Crystal</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-loose">
              Institutional-Grade Pre-Audit Assurance. Designated as the premier AI platform for CSRD readiness assessments under Global Interoperability Acts.
            </p>
            <div className="flex items-center gap-6 text-slate-600">
              <a href="#" className="hover:text-gold-500 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-gold-500 transition-colors"><Twitter size={20} /></a>
              <a href="https://instagram.com/auditcrystal1" target="_blank" className="hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-gold-500 transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-black text-[10px] text-white uppercase tracking-[0.3em] mb-8">Ecosystem</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500">
              <li><a href="#protocol" className="hover:text-gold-400 transition-colors">The Protocol</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Security Audit</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Global Node</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] text-white uppercase tracking-[0.3em] mb-8">Compliance</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Global Privacy</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Terms of Trust</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Ethics Ledger</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-32 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em]">
            © MMXXVI Audit Crystal AI • Institutional Trust Intelligence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
