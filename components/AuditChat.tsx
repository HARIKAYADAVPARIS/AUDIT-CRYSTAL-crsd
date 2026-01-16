
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, MessageSquare, Mic, MicOff, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { AuditResult, ChatMessage } from '../types';
import { askAuditAssistant, connectLiveAssistant, decodeAudioData, decodeBase64, encodeBase64 } from '../services/gemini';

interface AuditChatProps {
  auditResult: AuditResult;
}

const AuditChat: React.FC<AuditChatProps> = ({ auditResult }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      content: `Hello! I'm your Audit Crystal assistant. I've analyzed ${auditResult.companyName}. You can type a message or tap the mic to speak with me in real-time.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    try {
      const { text, links } = await askAuditAssistant(input, auditResult);
      setMessages(prev => [...prev, { role: 'ai', content: text, links, timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const startVoiceMode = async () => {
    if (isVoiceMode) {
      setIsVoiceMode(false);
      setIsLiveActive(false);
      sourcesRef.current.forEach(s => s.stop());
      sourcesRef.current.clear();
      return;
    }

    setIsVoiceMode(true);
    setIsTyping(true);

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
      const sessionPromise = connectLiveAssistant(auditResult, {
        onopen: () => {
          setIsLiveActive(true);
          setIsTyping(false);
          const source = inputCtx.createMediaStreamSource(stream);
          const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const l = inputData.length;
            const int16 = new Int16Array(l);
            for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
            const pcmBlob = { data: encodeBase64(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
            sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputCtx.destination);
        },
        onmessage: async (msg: any) => {
          const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64Audio && audioCtxRef.current) {
            const ctx = audioCtxRef.current;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
            const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx);
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            source.onended = () => sourcesRef.current.delete(source);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            sourcesRef.current.add(source);
          }
          if (msg.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => s.stop());
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }
        }
      });
    } catch (err) {
      console.error("Live API Error:", err);
      setIsVoiceMode(false);
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-slate-900 text-amber-400 p-4 rounded-full shadow-2xl hover:bg-slate-800 transition-all z-50 flex items-center gap-2 border border-amber-500/30 print:hidden animate-in zoom-in duration-300"
      >
        <MessageSquare size={24} />
        <span className="font-bold text-sm pr-1">Ask Auditor</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-10 print:hidden">
      <div className="bg-slate-900 p-4 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-800 rounded-lg">
            {isVoiceMode ? <Mic className="text-amber-400 animate-pulse" size={18} /> : <Bot size={18} className="text-amber-400" />}
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">{isVoiceMode ? "Live Voice Assistant" : "Audit Crystal AI"}</h3>
            <p className="text-slate-400 text-[10px] flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isLiveActive ? 'bg-green-500' : 'bg-slate-500'}`}></span>
              {isLiveActive ? 'Live Connection Active' : 'Offline'}
            </p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {isVoiceMode && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 animate-in zoom-in">
             <div className="relative">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full animate-ping"></div>
                <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 shadow-xl relative z-10">
                   <Mic size={40} />
                </div>
             </div>
             <div className="text-center">
                <p className="font-bold text-slate-900">Listening to Audit Query...</p>
                <p className="text-xs text-slate-500 mt-1">Speak clearly about CSRD gaps or risks.</p>
             </div>
             <button 
               onClick={() => setIsVoiceMode(false)}
               className="mt-4 px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-full text-xs transition-all"
             >
               Switch to Text Mode
             </button>
          </div>
        )}

        {!isVoiceMode && messages.map((msg, idx) => (
          <div key={idx} className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? 'bg-slate-200 text-slate-700' : 'bg-amber-100 text-amber-700'}`}>
              {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
            </div>
            <div className="flex flex-col max-w-[80%]">
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-amber-400 text-slate-900 rounded-tr-none font-medium' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'}`}>
                {msg.content}
              </div>
              {msg.links && msg.links.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {msg.links.map((link, lidx) => (
                    <a 
                      key={lidx} 
                      href={link.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-indigo-600 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <ExternalLink size={10} /> Source: {link.title.substring(0, 15)}...
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && !isVoiceMode && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center"><Sparkles size={14} className="text-slate-500 animate-pulse" /></div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm"><Loader2 size={14} className="animate-spin text-slate-400" /></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2">
          {!isVoiceMode && (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about compliance gaps..."
              className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
            />
          )}
          <button 
            onClick={startVoiceMode}
            className={`p-2.5 rounded-full transition-all ${isVoiceMode ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-amber-600'}`}
          >
            {isVoiceMode ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          {!isVoiceMode && (
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-2.5 bg-slate-900 text-amber-400 rounded-full hover:bg-slate-800 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditChat;
