import React from 'react';
import { Gem, ArrowRight, ShieldCheck, Zap, Globe, BarChart3, CheckCircle2, Lock, FileText, Linkedin, Twitter, Instagram, Github, Mail, Fingerprint, Code2, Network, SearchCheck, Building2, Server, Scale, Gavel, Calendar, AlertCircle } from 'lucide-react';

interface LandingPageProps {
  onStart: (useSample?: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="p-1.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Gem className="text-white" size={20} />
            </div>
            <span className="font-bold text-lg tracking-wide uppercase text-slate-100">Audit Crystal</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Solutions</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <button 
              onClick={() => onStart()}
              className="px-5 py-2 bg-white text-slate-950 rounded-full font-bold hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]"
            >
              Start Free Audit
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            First to use AI for CSRD
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            The Gold Standard in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              CSRD Reporting.
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            We make complex sustainability data easy for investors to understand. 
            The first platform to use advanced AI for instant, crystal-clear audit intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={() => onStart()}
              className="h-14 px-8 bg-amber-500 hover:bg-amber-400 text-slate-950 text-base font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:transform hover:-translate-y-0.5"
            >
              Start Pre-Audit Check <ArrowRight size={18} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => onStart(true)}
              className="h-14 px-8 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white text-base font-medium rounded-lg transition-all flex items-center justify-center gap-2 group"
            >
              <FileText size={16} className="text-slate-500 group-hover:text-amber-400 transition-colors" /> Try Sample Report
            </button>
          </div>

          <div className="pt-6 flex items-center gap-8 text-slate-500 text-xs font-medium uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Globe size={16} /> EU Regulated
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} /> ISO 27001 Ready
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} /> 10x Faster
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 hidden lg:block">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-1 shadow-2xl ring-1 ring-white/10">
            <div className="bg-slate-950 rounded-xl overflow-hidden">
              <div className="h-10 border-b border-slate-800 flex items-center px-4 gap-2 bg-slate-900/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="ml-4 px-3 py-1 bg-slate-800 rounded text-[10px] text-slate-500 font-mono w-48 truncate">
                  audit-crystal-platform.secure
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Readiness Score</div>
                    <div className="text-4xl font-bold text-white flex items-end gap-2">
                      78<span className="text-lg text-emerald-400 mb-1">/100</span>
                    </div>
                  </div>
                  <div className="p-2 bg-slate-800 rounded-lg">
                    <BarChart3 className="text-amber-400" size={24} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Double Materiality</span>
                      <span className="text-emerald-400">92%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[92%] bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Value Chain</span>
                      <span className="text-amber-400">64%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[64%] bg-amber-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Governance</span>
                      <span className="text-slate-500">Pending</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-700 rounded-full animate-pulse" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  AI Analysis Complete (1.2s)
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-xl font-bold text-slate-300"><Building2 size={24} /> ACME Corp</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-300"><Globe size={24} /> GlobalLogistics</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-300"><Server size={24} /> TechData</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-300"><ShieldCheck size={24} /> SecureBank</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/20">
              Why we win against general AI
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Built for Audit Assurance, <br/>Not Just Conversation.</h2>
            <p className="text-slate-400">
              Most AI tools hallucinate. Audit Crystal uses a proprietary "evidence-lock" engine designed specifically for the rigorous demands of EU Auditors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Fingerprint className="text-amber-500 w-20 h-20" />
              </div>
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <SearchCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Zero-Hallucination Engine</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Our <span className="text-amber-400 font-semibold">Evidence Lock™</span> technology forces the AI to cite the exact page and paragraph for every claim. If the data isn't in your PDF, we flag it as missing—we never guess.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <CheckCircle2 size={12} className="text-emerald-500" /> Auditor Approved
              </div>
            </div>

            <div className="group bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Code2 className="text-amber-500 w-20 h-20" />
              </div>
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ESEF/XBRL Pre-Tagging</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Don't wait for filing day. Our engine predicts mandatory digital tags for ESEF compliance, allowing your technical team to preview the digital structure early.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <CheckCircle2 size={12} className="text-emerald-500" /> ESEF Compliant
              </div>
            </div>

            <div className="group bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Network className="text-amber-500 w-20 h-20" />
              </div>
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Network size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Scope 3 Extrapolation</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Missing supplier data? We use industry-averaged proxy data to estimate your upstream Scope 3 emissions, giving you a defensible baseline.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <CheckCircle2 size={12} className="text-emerald-500" /> GHG Protocol Aligned
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Investment-Grade Intelligence</h2>
            <p className="text-slate-400">
              Choose the level of assurance your organization needs. From initial gap detection to limited assurance readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
              <div className="text-lg font-bold text-white mb-2">Basic Scan</div>
              <div className="text-3xl font-extrabold text-white mb-4">
                €0 <span className="text-base font-normal text-slate-500">/ trial</span>
              </div>
              <p className="text-slate-400 text-sm mb-8">Instant preliminary assessment to identify obvious compliance gaps.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-slate-500" /> Single PDF Analysis (Max 10MB)</li>
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-slate-500" /> High-Level Readiness Score</li>
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-slate-500" /> Standard Executive Summary</li>
                <li className="flex items-center gap-3 text-sm text-slate-300"><Lock size={16} className="text-slate-700" /> No Evidence Mapping</li>
              </ul>
              <button 
                onClick={() => onStart()}
                className="w-full py-3 rounded-lg border border-slate-700 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                Start Free Scan
              </button>
            </div>

            <div className="bg-gradient-to-b from-slate-900 to-slate-900 border border-amber-500 rounded-2xl p-8 transform scale-105 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-b-lg uppercase">Most Popular</div>
              <div className="text-lg font-bold text-white mb-2 mt-2">Professional</div>
              <div className="text-3xl font-extrabold text-white mb-4">
                €450 <span className="text-base font-normal text-slate-500">/ report</span>
              </div>
              <p className="text-slate-400 text-sm mb-8">Full Gap Analysis with AI-drafted remediation policies.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-amber-500" /> <strong>Smart-Fix</strong> Policy Drafting</li>
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-amber-500" /> <strong>Auditor Workpaper</strong> Export</li>
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-amber-500" /> <strong>CFO</strong> Financial Risk Brief</li>
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-amber-500" /> <strong>Evidence-Lock™</strong> Citations</li>
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-amber-500" /> Double Materiality Matrix</li>
              </ul>
              <button 
                onClick={() => onStart()}
                className="w-full py-3 rounded-lg bg-amber-500 text-slate-900 font-bold hover:bg-amber-400 transition-colors shadow-lg"
              >
                Get Professional Audit
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
              <div className="text-lg font-bold text-white mb-2">Audit Partners</div>
              <div className="text-3xl font-extrabold text-white mb-4">Custom</div>
              <p className="text-slate-400 text-sm mb-8">For assurance firms and conglomerates.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-slate-500" /> <strong>Multi-Entity</strong> Group Dashboard</li>
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-slate-500" /> Cross-Border Consolidation</li>
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-slate-500" /> White-Label Report Engine</li>
                <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-slate-500" /> Dedicated API Access</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-slate-700 text-white font-semibold hover:bg-slate-800 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="security" className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Gem className="text-amber-500" size={20} />
              <span className="font-bold text-lg text-white">Audit Crystal</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm mb-6">
              The only AI platform designated for Limited Assurance readiness assessments under CSRD delegated acts.
            </p>
            <div className="flex items-center gap-4 text-slate-500">
              <a href="#" className="hover:text-amber-400 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-amber-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-amber-400 transition-colors"><Github size={20} /></a>
              <a href="https://instagram.com/auditcrystal1" target="_blank" className="hover:text-amber-400 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-amber-400 transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-amber-400">Methodology</a></li>
              <li><a href="#" className="hover:text-amber-400">Security Specs</a></li>
              <li><a href="#" className="hover:text-amber-400">API Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-amber-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 text-center text-slate-600 text-xs">
          © 2024 Audit Crystal AI. All rights reserved. Server location: Frankfurt, DE (AWS eu-central-1).
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;