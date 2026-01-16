
import React, { useState } from 'react';
import { Play, Film, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { AuditResult } from '../types';
import { generateBoardVideo } from '../services/gemini';

interface BoardVideoProps {
  data: AuditResult;
}

const BoardVideo: React.FC<BoardVideoProps> = ({ data }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const url = await generateBoardVideo(data);
      setVideoUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate video. Paid API key with Veo permissions required.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-950 rounded-3xl border border-slate-800 p-10 text-white relative overflow-hidden group shadow-2xl">
      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={14} className="animate-pulse" /> Veo 3.1 Cinematic Protocol
          </div>
          <h3 className="text-4xl font-black tracking-tighter leading-none">
            Executive Briefing <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Video Generator</span>
          </h3>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            Convert your data into a cinematic presentation for the Board. Perfect for ESG committee briefings and investor relations.
          </p>
          
          <div className="flex flex-col gap-4 pt-4">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-2 text-xs text-red-400">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="h-14 bg-white text-slate-950 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-amber-400 transition-all shadow-xl disabled:opacity-50 uppercase tracking-widest text-xs"
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Play size={20} />}
              {isGenerating ? "Rendering Briefing..." : "Generate Briefing Video"}
            </button>
          </div>
        </div>

        <div className="w-full md:w-[480px] aspect-video bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex items-center justify-center relative shadow-inner">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4 text-center">
               <Film size={48} className="text-amber-500 animate-pulse" />
               <p className="text-xs font-black text-white uppercase tracking-widest">Veo Processing...</p>
            </div>
          ) : videoUrl ? (
            <video src={videoUrl} className="w-full h-full object-cover" controls autoPlay />
          ) : (
            <div className="flex flex-col items-center gap-4 opacity-20 grayscale">
               <Film size={80} />
               <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Protocol</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardVideo;
