import React, { useState } from 'react';
import { Lightbulb, CheckSquare, HelpCircle, Target, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { ActionStep, QuestionAnswer, AIInsights } from '../types/video';

interface InsightsViewProps {
  summary: string;
  learningPoints: string[];
  actionSteps: ActionStep[];
  questionsAnswered: QuestionAnswer[];
  insights: AIInsights;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  summary,
  learningPoints,
  actionSteps: initialActionSteps,
  questionsAnswered,
  insights,
}) => {
  const [actionSteps, setActionSteps] = useState<ActionStep[]>(initialActionSteps);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleActionStep = (id: string) => {
    setActionSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, completed: !step.completed } : step))
    );
  };

  return (
    <div className="space-y-8 mb-10">
      {/* Executive Summary Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-2 h-6 bg-neon-purple rounded-full"></span>
          <span>AI Executive Summary</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{summary}</p>
      </div>

      {/* AI Strategy & Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <Award className="w-4 h-4 text-neon-amber" /> Sentiment & Tone
          </div>
          <div className="text-lg font-bold text-white">{insights.sentiment}</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <Target className="w-4 h-4 text-neon-cyan" /> Target Audience
          </div>
          <div className="text-sm font-semibold text-slate-200 truncate">{insights.targetAudience}</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <Award className="w-4 h-4 text-emerald-400" /> Content Quality Score
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-emerald-400">{insights.contentQualityScore}</span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <Lightbulb className="w-4 h-4 text-brand-400" /> Hook Strategy
          </div>
          <div className="text-xs text-slate-300 line-clamp-2">{insights.hookAnalysis}</div>
        </div>
      </div>

      {/* Learning Points & Action Steps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Points */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">Key Learning Points</h4>
          </div>
          <ul className="space-y-3">
            {learningPoints.map((lp, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-200 leading-relaxed">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 font-bold text-[11px] shrink-0">
                  {idx + 1}
                </span>
                <span>{lp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Steps Checklist */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Action Steps Checklist</h4>
              <p className="text-[11px] text-slate-400">Click checkboxes to track your progress</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {actionSteps.map((step) => (
              <div
                key={step.id}
                onClick={() => toggleActionStep(step.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  step.completed
                    ? 'bg-emerald-950/20 border-emerald-800/50 text-slate-400 line-through'
                    : 'bg-slate-900/60 border-slate-800 text-slate-100 hover:bg-slate-800/80'
                }`}
              >
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => {}}
                  className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 bg-slate-900 pointer-events-none"
                />
                <span className="text-xs font-medium">{step.step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Answered FAQ Accordion */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">Questions Answered in Video</h4>
            <p className="text-xs text-slate-400">Core viewer questions addressed directly in video content</p>
          </div>
        </div>

        <div className="space-y-3">
          {questionsAnswered.map((qa, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-100 hover:text-brand-400 transition"
                >
                  <span>Q: {qa.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 bg-slate-950/40">
                    {qa.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
