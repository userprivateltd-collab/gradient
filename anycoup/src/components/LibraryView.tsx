import React, { useState } from 'react';
import { Search, History, Trash2, ArrowRight, Youtube, Instagram, ExternalLink } from 'lucide-react';
import { VideoAnalysis, VideoPlatform } from '../types/video';

interface LibraryViewProps {
  history: VideoAnalysis[];
  onSelectAnalysis: (analysis: VideoAnalysis) => void;
  onClearHistory: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  history,
  onSelectAnalysis,
  onClearHistory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.video.creator.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || item.video.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-500/20 text-brand-300 rounded-2xl border border-brand-500/30">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Searchable Video Library</h2>
            <p className="text-xs text-slate-400">Past video analyses stored locally in your browser</p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 text-xs font-semibold border border-slate-800 transition self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved videos by title or creator..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'youtube', 'instagram', 'tiktok'].map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                selectedPlatform === platform
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredHistory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => {
            const v = item.video;
            return (
              <div
                key={item.id}
                className="glass-panel glass-panel-hover rounded-3xl p-5 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 rounded-2xl overflow-hidden mb-4 border border-slate-700/60">
                    <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                      {v.platform === 'youtube' && <Youtube className="w-3 h-3 text-red-500" />}
                      {v.platform === 'instagram' && <Instagram className="w-3 h-3 text-pink-500" />}
                      {v.platform === 'tiktok' && <span className="text-neon-cyan font-black">TT</span>}
                      <span className="capitalize">{v.platform}</span>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                      {v.duration}
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-sm line-clamp-2 mb-1">{v.title}</h3>
                  <p className="text-xs text-slate-400 mb-3">{v.creator.name} • {v.viewCount} views</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.resources.slice(0, 3).map((r) => (
                      <span key={r.id} className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 text-[10px] font-semibold">
                        {r.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    Original URL <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => onSelectAnalysis(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md"
                  >
                    <span>View Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center text-slate-400">
          <History className="w-10 h-10 mx-auto mb-3 text-slate-600" />
          <p className="text-sm font-semibold mb-1">No video analyses found</p>
          <p className="text-xs text-slate-500">Paste a video link above or test preset demos to save them here.</p>
        </div>
      )}
    </div>
  );
};
