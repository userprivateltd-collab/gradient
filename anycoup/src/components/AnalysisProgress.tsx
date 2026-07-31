import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Cpu, FileText, Link2, Sparkles } from 'lucide-react';

interface AnalysisProgressProps {
  url: string;
}

const STEPS = [
  { id: 1, title: 'Fetching Video Metadata & Thumbnail', icon: FileText },
  { id: 2, title: 'Extracting Speech-to-Text Transcript', icon: Cpu },
  { id: 3, title: 'Scanning for Websites, Apps & Tools Mentioned', icon: Link2 },
  { id: 4, title: 'Synthesizing AI Action Steps & Insights', icon: Sparkles },
];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ url }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(2), 500);
    const timer2 = setTimeout(() => setCurrentStep(3), 1200);
    const timer3 = setTimeout(() => setCurrentStep(4), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto my-12 p-8 glass-panel rounded-3xl border border-slate-800 shadow-2xl text-center">
      <div className="relative inline-flex items-center justify-center mb-6">
        <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="relative p-4 bg-brand-600/30 border border-brand-500/40 rounded-2xl text-brand-300">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">Analyzing Video Content...</h3>
      <p className="text-xs text-slate-400 truncate max-w-md mx-auto mb-8">{url}</p>

      {/* Steps List */}
      <div className="space-y-4 text-left">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isDone = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                  : isCurrent
                  ? 'bg-brand-950/40 border-brand-500/50 text-white shadow-lg'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-brand-400 animate-spin shrink-0" />
              ) : (
                <Icon className="w-5 h-5 shrink-0 opacity-40" />
              )}
              <span className="text-xs font-semibold">{step.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
