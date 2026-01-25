
import React, { useState, useCallback } from 'react';
import { Upload, FileText, Link as LinkIcon, AlertTriangle, ShieldCheck, Lock, Sparkles, Shield, Cpu, LockKeyhole } from 'lucide-react';

interface FileUploadProps {
  onAnalyze: (file: File | null, url: string | null) => void;
  isLoading: boolean;
}

const MAX_FILE_SIZE_MB = 40;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const FileUpload: React.FC<FileUploadProps> = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const validateAndSetFile = (file: File) => {
    setError(null);
    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF document.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`Document exceeds ${MAX_FILE_SIZE_MB}MB institutional limit.`);
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) validateAndSetFile(e.dataTransfer.files[0]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) validateAndSetFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (activeTab === 'upload' && selectedFile) onAnalyze(selectedFile, null);
    else if (activeTab === 'url' && url) onAnalyze(null, url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-950 rounded-sm shadow-[0_50px_120px_rgba(0,0,0,0.6)] border border-white/5 overflow-hidden relative group">
      
      {/* Institutional Security Badge */}
      <div className="absolute top-0 right-0 bg-gold-500 text-[10px] font-black text-slate-950 px-6 py-2.5 rounded-bl-sm flex items-center gap-3 z-10 uppercase tracking-widest">
        <LockKeyhole size={12} strokeWidth={3} /> Institutional Encrypted
      </div>

      <div className="flex border-b border-white/5">
        <button
          className={`flex-1 py-8 text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 ${
            activeTab === 'upload' ? 'bg-white/5 text-white border-b-2 border-gold-500' : 'text-slate-600 hover:text-slate-400'
          }`}
          onClick={() => { setActiveTab('upload'); setError(null); }}
        >
          <Upload size={16} /> Local Ingestion
        </button>
        <button
          className={`flex-1 py-8 text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 ${
            activeTab === 'url' ? 'bg-white/5 text-white border-b-2 border-gold-500' : 'text-slate-600 hover:text-slate-400'
          }`}
          onClick={() => { setActiveTab('url'); setError(null); }}
        >
          <LinkIcon size={16} /> Cloud Endpoint
        </button>
      </div>

      <div className="p-16">
        {activeTab === 'upload' ? (
          <div className="space-y-12">
            <div
              className={`relative border border-white/10 rounded-sm p-20 text-center transition-all duration-700 ${
                dragActive ? 'bg-gold-500/5 border-gold-400/30 scale-[1.01]' : error ? 'bg-red-500/5 border-red-500/30' : 'bg-white/[0.02] border-white/5 hover:border-white/20'
              }`}
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            >
              <input type="file" accept=".pdf" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="flex flex-col items-center gap-8">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center border transition-all duration-700 ${
                  error ? 'text-red-500 border-red-500/30' : 'text-slate-700 border-white/5 group-hover:border-white/20'
                }`}>
                  {selectedFile ? <FileText size={48} className="text-gold-500" /> : <Upload size={48} />}
                </div>
                <div>
                  {selectedFile ? (
                    <div className="space-y-2">
                       <p className="text-2xl font-serif italic text-white tracking-tighter">"{selectedFile.name}"</p>
                       <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Document Ingested Successfully</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-3xl font-serif text-white tracking-tighter">Enter Audit Vault</p>
                      <p className="text-slate-600 mt-4 text-[9px] font-black uppercase tracking-[0.5em]">Drag Document to Protocol Entry</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {error && (
              <div className="flex items-center gap-4 text-[10px] text-red-400 bg-red-400/5 p-6 border border-red-400/20 font-black uppercase tracking-[0.3em] rounded-sm">
                <AlertTriangle size={18} />
                {error}
              </div>
            )}
            
            <div className="flex items-start gap-6 p-8 bg-white/[0.02] border border-white/5 rounded-sm text-[11px] text-slate-500 leading-relaxed font-light">
              <ShieldCheck size={20} className="mt-0.5 text-gold-500 flex-shrink-0" />
              <p>
                <strong className="text-white uppercase tracking-widest mr-2 font-black">Audit Protocol:</strong> Your document is parsed ephemerally. Analysis is performed using deterministic institutional-grade AI logic. Zero training conducted on client data.
              </p>
            </div>
          </div>
        ) : (
          <div className="py-20 space-y-8">
            <label className="block text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">Institutional Intelligence URI</label>
            <input
              type="text" value={url} onChange={(e) => setUrl(e.target.value)}
              placeholder="https://institutional.com/report-2024.pdf"
              className="w-full px-10 py-6 bg-white/5 border border-white/5 rounded-sm focus:border-gold-500 outline-none text-white font-serif text-3xl tracking-tighter italic transition-all placeholder:text-slate-900"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading || (activeTab === 'upload' && !selectedFile) || (activeTab === 'url' && !url) || !!error}
          className={`w-full py-8 px-12 mt-12 rounded-sm font-black text-[10px] uppercase tracking-[0.6em] shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-700 ${
            isLoading || (activeTab === 'upload' && !selectedFile) || (activeTab === 'url' && !url) || !!error
              ? 'bg-slate-900 text-slate-700 cursor-not-allowed opacity-40'
              : 'bg-white text-slate-950 hover:bg-gold-500 hover:shadow-gold-500/10 hover:-translate-y-1'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-4">
              <Cpu size={16} className="animate-spin" /> EXECUTING PRE-AUDIT PROTOCOL...
            </span>
          ) : "INITIATE DETERMINISTIC AUDIT"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
