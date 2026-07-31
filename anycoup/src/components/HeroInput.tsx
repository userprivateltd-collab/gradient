import React, { useState } from 'react';
import { Search, Youtube, Instagram, Sparkles, PlayCircle, ArrowRight, Zap } from 'lucide-react';
import { detectPlatform, PRESET_ANALYSES } from '../services/analyzerService';
import { VideoPlatform, VideoAnalysis } from '../types/video';

interface HeroInputProps {
  onAnalyze: (url: string) => void;
  onSelectPreset: (preset: VideoAnalysis) => void;
  isLoading: boolean;
}

export const HeroInput: React.FC<HeroInputProps> = ({ onAnalyze, onSelectPreset, isLoading }) => {
  const [url, setUrl] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState<VideoPlatform>('unknown');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrl(val);
    setDetectedPlatform(detectPlatform(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-6 animate-pulse-slow">
        <Zap className="w-3.5 h-3.5 text-neon-cyan" />
        <span>Instant AI Multimodal Video Extraction</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
        Paste Any Reel, TikTok or Short. <br />
        Get <span className="gradient-text-purple">Instant AI Intelligence.</span>
      </h1>

      <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
        Automatically extracts transcripts, websites, tools, apps, money mentioned, action steps, and categorized resources in seconds.
      </p>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-6">
        <div className="relative flex items-center glass-panel rounded-2xl p-2 border border-slate-700/80 shadow-2xl focus-within:border-brand-500/80 transition">
          {/* Platform Icon Indicator */}
          <div className="pl-3 pr-2 text-slate-400">
            {detectedPlatform === 'youtube' ? (
              <Youtube className="w-6 h-6 text-red-500 animate-bounce" />
            ) : detectedPlatform === 'instagram' ? (
              <Instagram className="w-6 h-6 text-pink-500 animate-bounce" />
            ) : detectedPlatform === 'tiktok' ? (
              <div className="w-6 h-6 font-black text-neon-cyan flex items-center justify-center">TT</div>
            ) : (
              <Search className="w-5 h-5 text-slate-400" />
            )}
          </div>

          <input
            type="url"
            value={url}
            onChange={handleInputChange}
            placeholder="Paste Instagram Reel, TikTok, or YouTube Shorts link..."
            required
            className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 text-sm sm:text-base px-2 py-3 focus:outline-none"
          />

          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="gradient-btn px-6 py-3 rounded-xl text-white font-semibold text-sm flex items-center gap-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Video</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Demo Presets Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto text-xs text-slate-400">
        <span className="font-semibold text-slate-400 flex items-center gap-1">
          <PlayCircle className="w-3.5 h-3.5 text-brand-400" /> Or test demo link:
        </span>
        {PRESET_ANALYSES.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition font-medium"
          >
            <span>{preset.video.title.substring(0, 32)}...</span>
            <ArrowRight className="w-3 h-3 text-brand-400" />
          </button>
        ))}
      </div>
    </div>
  );
};
