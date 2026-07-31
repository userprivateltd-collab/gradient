import React, { useState } from 'react';
import { Layers, ArrowRightLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { VideoAnalysis } from '../types/video';
import { PRESET_ANALYSES } from '../services/analyzerService';

export const CompareVideos: React.FC = () => {
  const [video1, setVideo1] = useState<VideoAnalysis>(PRESET_ANALYSES[0]);
  const [video2, setVideo2] = useState<VideoAnalysis>(PRESET_ANALYSES[1]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-3">
          <ArrowRightLeft className="w-3.5 h-3.5 text-neon-cyan" />
          <span>Side-by-Side Analysis Mode</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Compare Two Videos Side by Side</h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Compare extracted tools, strategy metrics, learning points, and action steps between two viral videos.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <label className="block text-xs font-semibold text-slate-300 mb-2">Video 1 Selection</label>
          <select
            value={video1.id}
            onChange={(e) => {
              const found = PRESET_ANALYSES.find((p) => p.id === e.target.value);
              if (found) setVideo1(found);
            }}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
          >
            {PRESET_ANALYSES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.video.title} ({p.video.platform})
              </option>
            ))}
          </select>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <label className="block text-xs font-semibold text-slate-300 mb-2">Video 2 Selection</label>
          <select
            value={video2.id}
            onChange={(e) => {
              const found = PRESET_ANALYSES.find((p) => p.id === e.target.value);
              if (found) setVideo2(found);
            }}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
          >
            {PRESET_ANALYSES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.video.title} ({p.video.platform})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dual Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[video1, video2].map((analysis, index) => {
          const v = analysis.video;
          return (
            <div key={index} className="glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <img
                  src={v.thumbnailUrl}
                  alt={v.title}
                  className="w-20 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-500/20 text-brand-300">
                    Video #{index + 1} • {v.platform}
                  </span>
                  <h3 className="font-bold text-white text-sm line-clamp-2 mt-1">{v.title}</h3>
                  <p className="text-xs text-slate-400">{v.creator.name} ({v.duration})</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Quality Score</div>
                  <div className="text-xl font-black text-emerald-400">{analysis.insights.contentQualityScore}/100</div>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Extracted Resources</div>
                  <div className="text-xl font-black text-neon-cyan">{analysis.resources.length} items</div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-1.5">AI Summary</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-900">
                  {analysis.aiSummary}
                </p>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">Key Tools Mentioned</h4>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.resources.map((r) => (
                    <span key={r.id} className="px-2.5 py-1 rounded-lg bg-brand-500/10 text-brand-300 text-xs font-semibold border border-brand-500/20">
                      {r.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Steps */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">Action Plan</h4>
                <div className="space-y-1.5">
                  {analysis.actionSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{step.step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
