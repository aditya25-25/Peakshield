import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquareWarning, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Compass, 
  Radio, 
  Info,
  Clock,
  Layers
} from 'lucide-react';
import { AIChatMessage } from '../../types';
import { api } from '../../services/api';
import { RiskBadge } from '../common/RiskBadge';

export const AskTheMountainAI: React.FC = () => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'PeakShield Mountain Safety Intelligence initialized. I have live telemetry for the Garhwal, Ladakh, and Himachal mountain sectors. Ask about localized slope stability, active road blocks, shelter locations, or emergency survival protocols.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['PeakShield Risk Fusion Engine v3.4', 'IMD Doppler Radar Stream'],
      dataFreshness: 'Real-time telemetry (Synced)'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'What is the risk near me?',
    'Is my route to Kedarnath safe?',
    'Nearest safe shelter and radio frequency?',
    'What should I do during a landslide?',
    'Active alerts in Garhwal sector?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const response = await api.queryAI(textToSend, 'citizen');
      setMessages(prev => [...prev, response]);
    } catch (err) {
      console.error('AI query error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'Unable to connect to live AI telemetry gateway. Please refer to your offline safety protocols or emergency VHF frequency 156.800 MHz.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24 md:pb-12 h-[calc(100vh-8.5rem)] md:h-[calc(100vh-7rem)] flex flex-col">
      
      {/* Top Intelligence Banner */}
      <div className="p-4 rounded-2xl bg-alpine-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-wide">
                Ask the Mountain
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-semibold">
                AI Safety Copilot
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Context-aware mountain intelligence & survivability advice
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span>Multi-Source Fusion Active</span>
        </div>
      </div>

      {/* Suggested Quick Action Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        <span className="text-[10px] font-mono uppercase text-slate-400 shrink-0">Quick Queries:</span>
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs whitespace-nowrap transition disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 bg-alpine-900/70 border border-slate-800 rounded-2xl p-4 sm:p-6 overflow-y-auto space-y-4 shadow-inner">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-2xl ${isUser ? 'ml-auto' : 'mr-auto'}`}
            >
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-shield-blue text-white rounded-br-none shadow-md font-medium'
                    : 'bg-slate-800/90 text-slate-100 rounded-bl-none border border-slate-700/80 shadow-lg'
                }`}
              >
                {/* Assistant Risk Badge Header if applicable */}
                {!isUser && msg.riskContext && (
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-700/60">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Diagnostic Evaluation
                    </span>
                    <RiskBadge level={msg.riskContext.level} size="sm" />
                  </div>
                )}

                <div>{msg.text}</div>

                {/* Safety Action Recommendation Callout */}
                {!isUser && msg.safetyActionRecommendation && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-700/40 text-xs">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Recommended Safety Action</span>
                    </div>
                    <p className="text-slate-200 text-xs leading-relaxed">
                      {msg.safetyActionRecommendation}
                    </p>
                  </div>
                )}

                {/* Factors Tag list */}
                {!isUser && msg.riskContext?.factors && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 pt-1">
                    {msg.riskContext.factors.map((factor, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                )}

                {/* Source & Freshness Metadata */}
                {!isUser && (msg.sources || msg.dataFreshness) && (
                  <div className="mt-3 pt-2 border-t border-slate-700/60 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 gap-2">
                    {msg.sources && (
                      <span className="truncate">Source: {msg.sources.join(', ')}</span>
                    )}
                    {msg.dataFreshness && (
                      <span className="text-emerald-400">{msg.dataFreshness}</span>
                    )}
                  </div>
                )}
              </div>

              <span className="text-[10px] font-mono text-slate-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {loading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 w-fit">
            <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
            <span>Analyzing Himalayan slope, radar & trail telemetry...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-alpine-900 border border-slate-800 rounded-2xl p-2 shrink-0 shadow-lg"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about route safety, landslides, flood risks, shelters..."
          className="flex-1 px-3 py-2 bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-shield-blue hover:bg-sky-600 text-white transition disabled:opacity-40 disabled:hover:bg-shield-blue shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
