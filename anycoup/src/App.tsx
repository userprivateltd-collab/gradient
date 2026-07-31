import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroInput } from './components/HeroInput';
import { AnalysisProgress } from './components/AnalysisProgress';
import { VideoHeaderCard } from './components/VideoHeaderCard';
import { ResourceFinder } from './components/ResourceFinder';
import { EntitiesGrid } from './components/EntitiesGrid';
import { TranscriptView } from './components/TranscriptView';
import { InsightsView } from './components/InsightsView';
import { TimelineView } from './components/TimelineView';
import { ChatWithVideo } from './components/ChatWithVideo';
import { CompareVideos } from './components/CompareVideos';
import { LibraryView } from './components/LibraryView';
import { ApiKeyModal } from './components/ApiKeyModal';
import { ExtensionPreviewModal } from './components/ExtensionPreviewModal';
import { analyzeVideoUrl, getStoredApiKey, getSavedHistory, PRESET_ANALYSES } from './services/analyzerService';
import { VideoAnalysis } from './types/video';
import { Sparkles, FileText, Globe, Clock, MessageSquare, Heart } from 'lucide-react';

export function App() {
  const [activeNavTab, setActiveNavTab] = useState<'analyzer' | 'compare' | 'library'>('analyzer');
  const [activeResultsSubTab, setActiveResultsSubTab] = useState<'resources' | 'entities' | 'transcript' | 'timeline' | 'chat'>('resources');

  const [currentAnalysis, setCurrentAnalysis] = useState<VideoAnalysis | null>(PRESET_ANALYSES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analyzingUrl, setAnalyzingUrl] = useState<string>('');

  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState<boolean>(false);

  const [history, setHistory] = useState<VideoAnalysis[]>([]);

  useEffect(() => {
    setHasApiKey(Boolean(getStoredApiKey()));
    setHistory(getSavedHistory());
  }, []);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setAnalyzingUrl(url);
    setActiveNavTab('analyzer');

    try {
      const result = await analyzeVideoUrl(url);
      setCurrentAnalysis(result);
      setHistory(getSavedHistory());
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: VideoAnalysis) => {
    setCurrentAnalysis(preset);
    setActiveNavTab('analyzer');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeNavTab}
        onSelectTab={setActiveNavTab}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenExtensionModal={() => setIsExtensionModalOpen(true)}
        hasApiKey={hasApiKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeNavTab === 'analyzer' && (
          <>
            {/* Hero Input Section */}
            <HeroInput
              onAnalyze={handleAnalyze}
              onSelectPreset={handleSelectPreset}
              isLoading={isLoading}
            />

            {/* Analysis Progress Loading State */}
            {isLoading && <AnalysisProgress url={analyzingUrl} />}

            {/* Results Display */}
            {!isLoading && currentAnalysis && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Video Details Header */}
                <VideoHeaderCard analysis={currentAnalysis} />

                {/* Sub-Tab Navigation Bar */}
                <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-8 border-b border-slate-800/80 no-scrollbar">
                  <button
                    onClick={() => setActiveResultsSubTab('resources')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      activeResultsSubTab === 'resources'
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-neon-cyan" />
                    <span>Resource Finder & Insights</span>
                  </button>

                  <button
                    onClick={() => setActiveResultsSubTab('entities')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      activeResultsSubTab === 'entities'
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Globe className="w-4 h-4 text-neon-purple" />
                    <span>Categorized Entities</span>
                  </button>

                  <button
                    onClick={() => setActiveResultsSubTab('transcript')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      activeResultsSubTab === 'transcript'
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-brand-400" />
                    <span>Full Transcript</span>
                  </button>

                  <button
                    onClick={() => setActiveResultsSubTab('timeline')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      activeResultsSubTab === 'timeline'
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>Event Timeline</span>
                  </button>

                  <button
                    onClick={() => setActiveResultsSubTab('chat')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      activeResultsSubTab === 'chat'
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-neon-amber" />
                    <span>Chat with Video</span>
                  </button>
                </div>

                {/* Sub-Tab Contents */}
                {activeResultsSubTab === 'resources' && (
                  <>
                    <ResourceFinder resources={currentAnalysis.resources} />
                    <InsightsView
                      summary={currentAnalysis.aiSummary}
                      learningPoints={currentAnalysis.learningPoints}
                      actionSteps={currentAnalysis.actionSteps}
                      questionsAnswered={currentAnalysis.questionsAnswered}
                      insights={currentAnalysis.insights}
                    />
                  </>
                )}

                {activeResultsSubTab === 'entities' && (
                  <EntitiesGrid entities={currentAnalysis.entities} />
                )}

                {activeResultsSubTab === 'transcript' && (
                  <TranscriptView transcript={currentAnalysis.transcript} />
                )}

                {activeResultsSubTab === 'timeline' && (
                  <TimelineView timeline={currentAnalysis.timeline} />
                )}

                {activeResultsSubTab === 'chat' && (
                  <ChatWithVideo analysis={currentAnalysis} />
                )}
              </div>
            )}
          </>
        )}

        {/* Tab 2: Compare Videos */}
        {activeNavTab === 'compare' && <CompareVideos />}

        {/* Tab 3: History Library */}
        {activeNavTab === 'library' && (
          <LibraryView
            history={history}
            onSelectAnalysis={(item) => {
              setCurrentAnalysis(item);
              setActiveNavTab('analyzer');
            }}
            onClearHistory={() => {
              localStorage.removeItem('omni_video_ai_history');
              setHistory([]);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full glass-panel border-t border-slate-800/80 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">OmniVideo AI</span>
            <span>— AI Multimodal Short-Form Video Intelligence</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with React, TypeScript & Tailwind</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={(key) => setHasApiKey(Boolean(key))}
      />

      <ExtensionPreviewModal
        isOpen={isExtensionModalOpen}
        onClose={() => setIsExtensionModalOpen(false)}
      />
    </div>
  );
}

export default App;
