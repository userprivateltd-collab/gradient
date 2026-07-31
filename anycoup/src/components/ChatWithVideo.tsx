import React, { useState } from 'react';
import { MessageSquare, Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { VideoAnalysis, ChatMessage } from '../types/video';

interface ChatWithVideoProps {
  analysis: VideoAnalysis;
}

export const ChatWithVideo: React.FC<ChatWithVideoProps> = ({ analysis }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello! I have analyzed "${analysis.video.title}". Ask me any question about the tools, transcript, code, or action steps in this video!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    'List all tools & websites mentioned',
    'What are the step-by-step instructions?',
    'Summarize this video in 3 bullet points',
    'What pricing or money amounts were cited?',
  ];

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = generateAiAnswer(textToSend, analysis);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-tr from-brand-600/30 to-neon-cyan/30 text-brand-300 rounded-2xl border border-brand-500/30">
          <MessageSquare className="w-6 h-6 text-neon-cyan" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white">Chat with Video AI</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-brand-500/20 text-brand-300 rounded border border-brand-500/30">
              Interactive
            </span>
          </div>
          <p className="text-xs text-slate-400">Ask questions specifically grounded on transcript and extracted data</p>
        </div>
      </div>

      {/* Suggestion Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition font-medium"
          >
            <Sparkles className="w-3 h-3 text-brand-400" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Messages Window */}
      <div className="h-80 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-900 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`p-2 rounded-xl text-white shrink-0 ${
                msg.sender === 'user' ? 'bg-brand-600' : 'bg-slate-800 border border-slate-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-neon-cyan" />}
            </div>

            <div
              className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-brand-600/90 text-white rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
              <span className="block text-[10px] text-slate-400 mt-1 text-right">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-400" />
            <span>AI is analyzing video context...</span>
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about this video..."
          className="flex-1 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="gradient-btn px-5 py-3 rounded-xl text-white font-semibold text-xs flex items-center gap-2 disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" /> Send
        </button>
      </form>
    </div>
  );
};

function generateAiAnswer(query: string, analysis: VideoAnalysis): string {
  const lower = query.toLowerCase();
  const v = analysis.video;
  const r = analysis.resources;
  const e = analysis.entities;

  if (lower.includes('tool') || lower.includes('website') || lower.includes('app')) {
    return `Based on "${v.title}", here are the top resources mentioned:\n\n${r
      .map((res) => `• **${res.name}** (${res.category}): ${res.description} ${res.url ? `- ${res.url}` : ''}`)
      .join('\n')}`;
  }

  if (lower.includes('step') || lower.includes('instruction') || lower.includes('how to')) {
    return `Here are the action steps recommended in this video:\n\n${analysis.actionSteps
      .map((step, idx) => `${idx + 1}. ${step.step}`)
      .join('\n')}`;
  }

  if (lower.includes('price') || lower.includes('money') || lower.includes('cost')) {
    return `Financial figures and money amounts mentioned in video audio:\n\n${
      e.moneyMentioned.length > 0 ? e.moneyMentioned.map((m) => `• ${m}`).join('\n') : 'No specific prices mentioned.'
    }`;
  }

  return `In "${v.title}", creator ${v.creator.name} explains: ${analysis.aiSummary}\n\nKey learning point: ${analysis.learningPoints[0] || 'Follow structured workflow steps.'}`;
}
