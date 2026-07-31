import React, { useState } from 'react';
import { Search, Copy, Check, Clock, FileText } from 'lucide-react';
import { TranscriptItem } from '../types/video';

interface TranscriptViewProps {
  transcript: TranscriptItem[];
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({ transcript }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTranscript = transcript.filter((t) =>
    t.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyFull = () => {
    const text = transcript.map((t) => `[${t.timestamp}] ${t.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLine = (t: TranscriptItem) => {
    navigator.clipboard.writeText(`[${t.timestamp}] ${t.text}`);
    setCopiedId(t.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl mb-10">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-500/20 text-brand-400 rounded-2xl border border-brand-500/30">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Full Video Transcript</h3>
            <p className="text-xs text-slate-400">Searchable audio transcription with exact timestamps</p>
          </div>
        </div>

        <button
          onClick={handleCopyFull}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-brand-400" />}
          <span>{copied ? 'Copied Full Transcript!' : 'Copy Transcript'}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search transcript text..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-brand-500"
        />
      </div>

      {/* Transcript Stream */}
      <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
        {filteredTranscript.length > 0 ? (
          filteredTranscript.map((t) => (
            <div
              key={t.id}
              onClick={() => handleCopyLine(t)}
              className="group flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/80 cursor-pointer transition"
            >
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-brand-500/10 text-brand-400 text-[11px] font-mono font-bold shrink-0">
                <Clock className="w-3 h-3" />
                {t.timestamp}
              </span>
              <p className="text-xs text-slate-200 leading-relaxed flex-1">{t.text}</p>
              <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-white transition">
                {copiedId === t.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-500 text-center py-8">No transcript lines match your search.</p>
        )}
      </div>
    </div>
  );
};
