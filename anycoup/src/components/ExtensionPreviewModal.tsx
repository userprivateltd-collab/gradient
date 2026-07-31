import React, { useState } from 'react';
import { Chrome, Smartphone, X, Sparkles, Download, Check, Share2, Globe } from 'lucide-react';

interface ExtensionPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExtensionPreviewModal: React.FC<ExtensionPreviewModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'extension' | 'android'>('extension');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-tr from-brand-600/30 to-neon-purple/30 text-brand-300 rounded-2xl border border-brand-500/30">
            <Sparkles className="w-6 h-6 text-neon-cyan" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Browser Extension & Mobile Share Integration</h3>
            <p className="text-xs text-slate-400">Analyze videos instantly directly from Chrome, Instagram, or TikTok</p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('extension')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'extension'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Chrome className="w-4 h-4 text-neon-cyan" />
            <span>Chrome Browser Extension</span>
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'android'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 text-neon-purple" />
            <span>Android Native Share Sheet</span>
          </button>
        </div>

        {/* Tab Content 1: Chrome Extension Mock */}
        {activeTab === 'extension' ? (
          <div className="space-y-4">
            <div className="relative rounded-2xl p-4 bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Chrome className="w-4 h-4 text-neon-cyan" />
                  <span>OmniVideo Extension Overlay</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
                  v1.0 Ready
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p>⚡ Adds an instant <strong>"Analyze Video with AI"</strong> floating badge over YouTube Shorts & TikTok reels.</p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span>Extract transcript & 5 tools in sidebar</span>
                  <button className="px-3 py-1 bg-brand-600 text-white rounded text-[11px] font-bold">
                    One-Click Popup
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => alert('Browser Extension package manifest ready for Chrome Web Store upload!')}
                className="gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Extension Zip (.zip)
              </button>
            </div>
          </div>
        ) : (
          /* Tab Content 2: Android Share Sheet Mock */
          <div className="space-y-4">
            <div className="relative rounded-2xl p-4 bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Share2 className="w-4 h-4 text-neon-purple" />
                  <span>Android System Share Target API</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-500/20 text-brand-300">
                  PWA Web Share API
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p>📱 Tap <strong>"Share"</strong> inside Instagram Reel or TikTok app, select <strong>OmniVideo AI</strong>, and receive instant push summary notification!</p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-600 text-white">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Share Target Receiver</div>
                    <div className="text-[11px] text-slate-400">manifest.json registered endpoint</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => alert('PWA Web Share Target registered for Android!')}
                className="gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2"
              >
                <Globe className="w-4 h-4" /> Install as Android PWA App
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
