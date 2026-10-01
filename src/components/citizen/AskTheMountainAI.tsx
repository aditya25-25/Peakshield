import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Radio, 
  Bot, 
  User 
} from 'lucide-react';
import { AIChatMessage } from '../../types';
import { api } from '../../services/api';
import { RiskBadge } from '../common/RiskBadge';

export const AskTheMountainAI: React.FC = () => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'PeakShield Mountain Safety Intelligence initialized. I have live telemetry for the Garhwal, Ladakh, and Himachal alpine corridors. Ask about localized slope stability, active road blocks, shelter locations, or emergency survival protocols.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['PeakShield Real-Time Risk Fusion v3.4', 'IMD Doppler Radar Stream', 'GSI Landslide Hazard Feed'],
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

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const response = await api.queryAI(textToSend, 'citizen');
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      console.error('AI query error:', err);
      setMessages((prev) => [
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
    <div className="max-w-4xl mx-auto space-y-4 pb-24 md:pb-12 h-[calc(100vh-8.5rem)] md:h-[calc(100vh-7rem)] flex flex-col">
      
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-alpine-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">
                Ask Mountain Safety AI
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                PeakShield Safety Core
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Grounded on IMD radar, GSI slope stability models & live responder feeds
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Telemetry Active</span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-alpine-950 border border-slate-800 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 space-y-2 text-xs shadow-md ${
                msg.sender === 'user'
                  ? 'bg-sky-600 text-white rounded-br-none'
                  : 'bg-alpine-900 border border-slate-700/80 text-slate-200 rounded-bl-none'
              }`}
            >
              {msg.riskContext && (
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <RiskBadge level={msg.riskContext.level} size="sm" />
                  <span className="text-[10px] font-mono text-slate-400">
                    {msg.dataFreshness || 'Live Telemetry'}
                  </span>
                </div>
              )}

              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

              {msg.safetyActionRecommendation && (
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-slate-200 mt-2 space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Recommended Immediate Action:</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {msg.safetyActionRecommendation}
                  </p>
                </div>
              )}

              {msg.riskContext?.factors && msg.riskContext.factors.length > 0 && (
                <div className="pt-2 border-t border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Telemetry Factors:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {msg.riskContext.factors.map((factor, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 text-[10px] opacity-70">
                <span>{msg.timestamp}</span>
                {msg.sources && msg.sources.length > 0 && (
                  <span className="font-mono truncate max-w-[200px]">
                    Source: {msg.sources[0]}
                  </span>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-alpine-900 border border-slate-700 text-slate-400 text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>Analyzing mountain sensor telemetry...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-medium transition active:scale-95 shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-2 rounded-2xl bg-alpine-900 border border-slate-800 flex items-center gap-2 shrink-0 shadow-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Ask about road conditions, flood surge, or safety steps..."
          disabled={loading}
          className="flex-1 px-3 py-2 bg-transparent text-white text-xs placeholder:text-slate-500 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-sky-600/20 active:scale-95"
          aria-label="Send query"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
