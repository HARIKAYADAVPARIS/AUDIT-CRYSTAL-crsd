
import React, { useState, useCallback } from 'react';
import { Upload, FileText, Link as LinkIcon, AlertTriangle, ShieldCheck, Lock } from 'lucide-react';

interface FileUploadProps {
  onAnalyze: (file: File | null, url: string | null) => void;
  isLoading: boolean;
}

const MAX_FILE_SIZE_MB = 20;
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
      setError("Please upload a valid PDF file.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max size is ${MAX_FILE_SIZE_MB}MB.`);
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
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative">
      <div className="absolute top-0 right-0 bg-slate-900 text-[10px] font-black text-amber-400 px-3 py-1 rounded-bl-xl border-b border-l border-slate-800 flex items-center gap-1.5 z-10 uppercase tracking-widest">
        <Lock size={12} /> Encrypted Analysis
      </div>

      <div className="flex border-b border-slate-100">
        <button
          className={`flex-1 py-5 text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'upload' ? 'bg-amber-50 text-slate-900 border-b-2 border-amber-500' : 'text-slate-400 hover:text-slate-600 bg-slate-50/50'
          }`}
          onClick={() => { setActiveTab('upload'); setError(null); }}
        >
          <Upload size={18} /> Upload PDF
        </button>
        <button
          className={`flex-1 py-5 text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'url' ? 'bg-amber-50 text-slate-900 border-b-2 border-amber-500' : 'text-slate-400 hover:text-slate-600 bg-slate-50/50'
          }`}
          onClick={() => { setActiveTab('url'); setError(null); }}
        >
          <LinkIcon size={18} /> Direct URL
        </button>
      </div>

      <div className="p-10">
        {activeTab === 'upload' ? (
          <div className="space-y-6">
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                dragActive ? 'border-amber-400 bg-amber-50' : error ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
              }`}
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            >
              <input type="file" accept=".pdf" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="flex flex-col items-center gap-4">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border shadow-sm transition-all ${
                  error ? 'bg-red-100 text-red-500 border-red-200' : 'bg-white text-slate-400 border-slate-100'
                }`}>
                  {selectedFile ? <FileText size={40} className="text-amber-500" /> : <Upload size={40} />}
                </div>
                <div>
                  {selectedFile ? (
                    <p className="text-lg font-bold text-slate-800">{selectedFile.name}</p>
                  ) : (
                    <>
                      <p className="text-xl font-bold text-slate-800">Drop CSRD Report</p>
                      <p className="text-slate-400 mt-1 font-medium">Click to browse or drag and drop</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {error && (
              <div className="flex items-center gap-3 text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                <AlertTriangle size={18} />
                <span className="font-bold">{error}</span>
              </div>
            )}
            
            <div className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs text-slate-600">
              <ShieldCheck size={16} className="mt-0.5 text-emerald-600 flex-shrink-0" />
              <p>
                <strong>Trust Protocol:</strong> Analysis is ephemeral. Your report is never stored on disk or used for training.
              </p>
            </div>
          </div>
        ) : (
          <div className="py-8 space-y-4">
            <label className="block text-sm font-black text-slate-700 uppercase tracking-widest">Report Location</label>
            <input
              type="text" value={url} onChange={(e) => setUrl(e.target.value)}
              placeholder="https://company.com/annual-report-2024.pdf"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none shadow-sm text-slate-800 font-medium"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading || (activeTab === 'upload' && !selectedFile) || (activeTab === 'url' && !url) || !!error}
          className={`w-full py-4 px-6 mt-8 rounded-xl text-white font-black tracking-widest shadow-xl transition-all uppercase ${
            isLoading || (activeTab === 'upload' && !selectedFile) || (activeTab === 'url' && !url) || !!error
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-slate-900 hover:bg-slate-800 transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? "Analyzing..." : "Generate Audit Crystal Report"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
