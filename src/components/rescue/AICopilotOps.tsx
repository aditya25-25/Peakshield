import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Radio, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  FileText,
  Info
} from 'lucide-react';
import { AIChatMessage } from '../../types';
import { api } from '../../services/api';
import { RiskBadge } from '../common/RiskBadge';

export const AICopilotOps: React.FC = () => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'eoc-welcome',
      sender: 'assistant',
      text: 'PeakShield Emergency Operations Copilot online. I am integrated with live IMD Doppler feeds, GSI landslide telemetry, InSAR displacement rates, and field dispatch units. Ask for operational triage analysis, heavy machinery routing, or resource allocation recommendations.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['PeakShield Risk Fusion Engine v3.4', 'SEOC Telemetry Mesh', 'BRO Field Reports'],
      dataFreshness: 'Live EOC Stream (Sync: 1s ago)',
      isDecisionSupportOnly: true
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const commanderPrompts = [
    'Show high-risk areas where rainfall increased in last 6 hours',
    'Which active incidents require immediate heavy machinery?',
    'Why is the Sonprayag sector flagged as critical emergency?',
    'Show incidents near blocked roads and alternate bypass status',
    'Helicopter air-evacuation weather feasibility window?'
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

    const userMsg: AIChatMessage = {
      id: `cmd-q-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const response = await api.queryAI(textToSend, 'commander');
      setMessages(prev => [...prev, response]);
    } catch (err) {
      console.error('Copilot query error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'Error accessing tactical AI telemetry server. Fallback to offline SEOC operational SOPs.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDecisionSupportOnly: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-12 h-[calc(100vh-8.5rem)] flex flex-col">
      
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-alpine-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-wide">
                AI Emergency Operations Copilot
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold uppercase">
                Decision Support Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Operational synthesis, resource recommendation & terrain reasoning
            </p>
          </div>
        </div>

        <div className="text-[11px] font-mono text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-lg flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          <span>Decision Support — not autonomous decision-making</span>
        </div>
      </div>

      {/* Suggested Command Queries */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        <span className="text-[10px] font-mono uppercase text-slate-400 shrink-0">Tactical Prompts:</span>
        {commanderPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            disabled={loading}
            className="px-3 py-1 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs whitespace-nowrap transition disabled:opacity-50"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Message Feed */}
      <div className="flex-1 bg-alpine-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 overflow-y-auto space-y-4 shadow-inner">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-3xl ${isUser ? 'ml-auto' : 'mr-auto'}`}
            >
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-red-600 text-white rounded-br-none shadow-md font-medium'
                    : 'bg-slate-800/90 text-slate-100 rounded-bl-none border border-slate-700 shadow-lg'
                }`}
              >
                {!isUser && msg.riskContext && (
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-700">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      TACTICAL REASONING ENGINE
                    </span>
                    <RiskBadge level={msg.riskContext.level} size="sm" />
                  </div>
                )}

                <div>{msg.text}</div>

                {!isUser && msg.safetyActionRecommendation && (
                  <div className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-700/50 text-xs">
                    <div className="font-bold text-red-300 flex items-center gap-1.5 mb-1 font-mono uppercase">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <span>EOC Recommended Directive:</span>
                    </div>
                    <p className="text-slate-200 text-xs leading-relaxed">
                      {msg.safetyActionRecommendation}
                    </p>
                  </div>
                )}

                {!isUser && msg.riskContext?.factors && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 pt-1">
                    {msg.riskContext.factors.map((factor, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-sky-300 border border-slate-700"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                )}

                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-slate-700/60 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 gap-2">
                    {msg.sources && (
                      <span className="truncate">Sensors: {msg.sources.join(', ')}</span>
                    )}
                    <span className="text-emerald-400">Decision Support System</span>
                  </div>
                )}
              </div>

              <span className="text-[10px] font-mono text-slate-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 w-fit">
            <Sparkles className="w-4 h-4 text-red-400 animate-spin" />
            <span>Synthesizing multi-source radar, InSAR & road blockage intelligence...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
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
          placeholder="Ask commander questions regarding heavy equipment, rainfall spikes, or evacuation routes..."
          className="flex-1 px-3 py-2 bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white transition disabled:opacity-40 shadow-glow-red"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
