import React, { useState } from 'react';
import { Youtube, Instagram, Share2, FileText, Download, Check, ExternalLink, Eye, ThumbsUp } from 'lucide-react';
import { VideoMetadata, VideoAnalysis } from '../types/video';
import { exportToPDF, exportToMarkdown, exportToJSON } from '../services/exportService';

interface VideoHeaderCardProps {
  analysis: VideoAnalysis;
}

export const VideoHeaderCard: React.FC<VideoHeaderCardProps> = ({ analysis }) => {
  const { video } = analysis;
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(video.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Thumbnail preview with Platform Badge */}
        <div className="relative w-full md:w-64 h-44 rounded-2xl overflow-hidden shrink-0 group border border-slate-700/60 shadow-lg">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

          {/* Platform Tag */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-xs font-bold text-white shadow-md">
            {video.platform === 'youtube' && <Youtube className="w-3.5 h-3.5 text-red-500" />}
            {video.platform === 'instagram' && <Instagram className="w-3.5 h-3.5 text-pink-500" />}
            {video.platform === 'tiktok' && <span className="text-neon-cyan font-black text-xs">TT</span>}
            <span className="capitalize">{video.platform}</span>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono font-bold text-white">
            {video.duration}
          </div>
        </div>

        {/* Video Info Details */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {video.creator.avatarUrl ? (
                <img
                  src={video.creator.avatarUrl}
                  alt={video.creator.name}
                  className="w-7 h-7 rounded-full object-cover border border-brand-500/40"
                />
              ) : null}
              <span className="text-xs font-semibold text-slate-300">{video.creator.name}</span>
              <span className="text-xs text-brand-400 font-mono">{video.creator.handle}</span>
            </div>
            <span className="text-xs text-slate-400">{video.publishedAt}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">{video.title}</h2>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-brand-400" /> {video.viewCount} views
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5 text-rose-400" /> {video.likeCount} likes
            </span>
            <a
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-brand-400 hover:underline"
            >
              Watch original <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Action Export Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80">
            <button
              onClick={() => exportToPDF(analysis)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-red-400" /> Export PDF
            </button>

            <button
              onClick={() => exportToMarkdown(analysis)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              <FileText className="w-3.5 h-3.5 text-brand-400" /> Export Markdown
            </button>

            <button
              onClick={() => exportToJSON(analysis)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" /> JSON
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 text-xs font-medium border border-brand-500/30 transition ml-auto"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Link!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
