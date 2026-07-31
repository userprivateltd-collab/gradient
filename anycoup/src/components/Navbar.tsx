import React from 'react';
import { Video, Key, History, Layers, Chrome, Smartphone, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'analyzer' | 'compare' | 'library';
  onSelectTab: (tab: 'analyzer' | 'compare' | 'library') => void;
  onOpenApiKeyModal: () => void;
  onOpenExtensionModal: () => void;
  hasApiKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenApiKeyModal,
  onOpenExtensionModal,
  hasApiKey,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('analyzer')}>
          <div className="relative p-2.5 bg-gradient-to-tr from-brand-600 to-neon-purple rounded-xl shadow-lg shadow-brand-500/20">
            <Video className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-white">OmniVideo</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 rounded border border-brand-500/30">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Reels • TikTok • Shorts Intelligence</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onSelectTab('analyzer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'analyzer'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyzer</span>
          </button>

          <button
            onClick={() => onSelectTab('compare')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'compare'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          <button
            onClick={() => onSelectTab('library')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'library'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Library</span>
          </button>
        </nav>

        {/* Actions (API Key & Promos) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExtensionModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition"
            title="Browser Extension & Mobile Share"
          >
            <Chrome className="w-3.5 h-3.5 text-neon-cyan" />
            <Smartphone className="w-3.5 h-3.5 text-neon-purple" />
            <span>Extensions</span>
          </button>

          <button
            onClick={onOpenApiKeyModal}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition"
          >
            <Key className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden sm:inline">API Key</span>
            <span
              className={`w-2 h-2 rounded-full ${
                hasApiKey ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'
              }`}
            ></span>
          </button>
        </div>
      </div>
    </header>
  );
};
