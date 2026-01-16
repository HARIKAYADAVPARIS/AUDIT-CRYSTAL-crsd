
import React, { useState, useEffect } from 'react';
import { Search, Trophy, TrendingUp, AlertCircle, ExternalLink, RefreshCw, Loader2, Sparkles, Target } from 'lucide-react';
import { fetchPeerIntelligence } from '../services/gemini';

interface PeerIntel {
  name: string;
  readinessScore: number;
  keyGap: string;
  reportUrl: string;
}

interface PeerIntelligenceProps {
  companyName: string;
  userScore: number;
}

const PeerIntelligence: React.FC<PeerIntelligenceProps> = ({ companyName, userScore }) => {
  const [peers, setPeers] = useState<PeerIntel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadIntel = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPeerIntelligence(companyName);
      setPeers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadIntel();
  }, [companyName]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
      <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Trophy className="text-amber-400" size={20} />
            Live Competitive Intelligence
          </h3>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">
            Powered by Gemini Search Grounding
          </p>
        </div>
        <button 
          onClick={loadIntel}
          disabled={isLoading}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
        </button>
      </div>

      <div className="p-6">
        {isLoading && peers.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <Loader2 size={32} className="animate-spin text-amber-500" />
            <p className="text-sm font-medium animate-pulse">Scanning competitor reports and ESG disclosures...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* User Rank Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-black text-slate-950 text-xl shadow-lg border-4 border-white">
                  YOU
                </div>
                <div>
                  <div className="font-black text-slate-900">{companyName}</div>
                  <div className="text-[10px] font-bold text-amber-600 uppercase">Current Readiness Position</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-slate-900">{userScore}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase">Score</div>
              </div>
            </div>

            {/* Peer List */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Market Landscape</h4>
              {peers.map((peer, idx) => (
                <div key={idx} className="group p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      peer.readinessScore > userScore ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                        {peer.name}
                        {peer.readinessScore < userScore && (
                          <span className="text-[8px] bg-emerald-500 text-white px-1 py-0.5 rounded font-black">BEATING</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <AlertCircle size={10} className="text-amber-500" />
                        Main Gap: {peer.keyGap}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-black text-slate-700">{peer.readinessScore}</div>
                    </div>
                    <a 
                      href={peer.reportUrl} 
                      target="_blank" 
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg flex items-start gap-3">
               <Sparkles size={16} className="text-indigo-500 mt-0.5" />
               <p className="text-[10px] text-indigo-700 leading-relaxed font-medium">
                 <strong className="uppercase">Strategic Insight:</strong> Your competitors are struggling with <strong>Value Chain Transparency</strong>. Focusing on this will differentiate you to institutional investors who use PWC or Pulsora for generic reporting.
               </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerIntelligence;
