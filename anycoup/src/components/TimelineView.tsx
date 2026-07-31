import React from 'react';
import { Clock, Play, Tag } from 'lucide-react';
import { TimelineItem } from '../types/video';

interface TimelineViewProps {
  timeline: TimelineItem[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ timeline }) => {
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-neon-purple/20 text-neon-purple rounded-2xl border border-neon-purple/30">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Video Event Timeline</h3>
          <p className="text-xs text-slate-400">Sequential breakdown of key moments, demonstrations & transitions</p>
        </div>
      </div>

      <div className="relative pl-6 border-l-2 border-brand-500/30 space-y-6">
        {timeline.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-brand-500 group-hover:bg-brand-500 group-hover:scale-125 transition"></div>

            <div className="glass-panel rounded-2xl p-4 border border-slate-800 group-hover:border-brand-500/40 transition">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono font-bold text-xs border border-brand-500/30">
                    <Play className="w-3 h-3" /> {item.timestamp}
                  </span>
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                </div>
                {item.category && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-semibold text-slate-400">
                    <Tag className="w-3 h-3 text-neon-cyan" /> {item.category}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
