import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Globe, Smartphone, Wrench, Package, Code2, Sparkles } from 'lucide-react';
import { ResourceItem } from '../types/video';

interface ResourceFinderProps {
  resources: ResourceItem[];
}

export const ResourceFinder: React.FC<ResourceFinderProps> = ({ resources }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const categories = [
    { id: 'all', label: 'All Resources', count: resources.length },
    { id: 'tool', label: 'Tools 🛠️', count: resources.filter((r) => r.category === 'tool').length },
    { id: 'app', label: 'Apps 📱', count: resources.filter((r) => r.category === 'app').length },
    { id: 'website', label: 'Websites 🌐', count: resources.filter((r) => r.category === 'website').length },
    { id: 'product', label: 'Products 📦', count: resources.filter((r) => r.category === 'product').length },
    { id: 'language', label: 'Languages 💻', count: resources.filter((r) => r.category === 'language').length },
  ].filter((cat) => cat.id === 'all' || cat.count > 0);

  const filteredResources =
    activeCategory === 'all' ? resources : resources.filter((r) => r.category === activeCategory);

  const handleCopyLink = (res: ResourceItem) => {
    const textToCopy = res.url ? `${res.name}: ${res.url}` : res.name;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(res.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const text = resources.map((r) => `- ${r.name} (${r.category.toUpperCase()}): ${r.url || r.description}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'website':
        return <Globe className="w-4 h-4 text-neon-cyan" />;
      case 'app':
        return <Smartphone className="w-4 h-4 text-neon-purple" />;
      case 'tool':
        return <Wrench className="w-4 h-4 text-brand-400" />;
      case 'product':
        return <Package className="w-4 h-4 text-neon-amber" />;
      case 'language':
        return <Code2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-brand-400" />;
    }
  };

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl mb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-brand-600/30 to-neon-purple/30 text-brand-300 rounded-2xl border border-brand-500/30 shadow-lg">
            <Sparkles className="w-6 h-6 text-neon-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">AI Resource Finder</h3>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-neon-purple/20 text-neon-purple rounded-md border border-neon-purple/30">
                Unique Feature
              </span>
            </div>
            <p className="text-xs text-slate-400">Extracted websites, tools, apps, and products mentioned in video</p>
          </div>
        </div>

        <button
          onClick={handleCopyAll}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition shrink-0"
        >
          {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-brand-400" />}
          <span>{copiedAll ? 'Copied All Resources!' : 'Copy All Links'}</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              activeCategory === cat.id
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>{cat.label}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px]">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                    {getCategoryIcon(res.category)}
                  </div>
                  <h4 className="font-bold text-white text-base truncate">{res.name}</h4>
                </div>
                {res.pricing && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0">
                    {res.pricing}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">{res.description}</p>
            </div>

            <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs">
              <button
                onClick={() => handleCopyLink(res)}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition"
              >
                {copiedId === res.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedId === res.id ? 'Copied' : 'Copy'}</span>
              </button>

              {res.url ? (
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-semibold text-brand-400 hover:text-brand-300 transition"
                >
                  <span>Visit Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-slate-500 italic text-[11px]">No direct URL</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
