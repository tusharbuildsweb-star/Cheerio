import React, { useState } from 'react';
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  RefreshCw,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { PageId } from '../types';

interface ChatbotAssistantProps {
  onNavigate: (page: PageId) => void;
  onEscalate: (summary: string, errCode: string) => void;
}

export const ChatbotAssistant: React.FC<ChatbotAssistantProps> = ({
  onNavigate,
  onEscalate,
}) => {
  const [keywordInput, setKeywordInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'Hello! I am your store assistant. Type "catalog", "order", or "help".' },
  ]);
  const [fallbackCount, setFallbackCount] = useState(0);
  const [handoffEnabled, setHandoffEnabled] = useState(true);

  const handleTestKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywordInput.trim()) return;

    const userText = keywordInput.trim();
    const newMessages = [...messages, { sender: 'user' as const, text: userText }];

    const lower = userText.toLowerCase();
    if (lower.includes('catalog') || lower.includes('product') || lower.includes('buy')) {
      newMessages.push({
        sender: 'bot' as const,
        text: '🛍️ Here is our bestselling collection: urbanboutique.com/catalog',
      });
      setFallbackCount(0);
    } else if (lower.includes('order') || lower.includes('track')) {
      newMessages.push({
        sender: 'bot' as const,
        text: '📦 Please provide your 6-digit Order ID to track shipment.',
      });
      setFallbackCount(0);
    } else {
      const nextFallback = fallbackCount + 1;
      setFallbackCount(nextFallback);

      if (handoffEnabled && nextFallback >= 2) {
        newMessages.push({
          sender: 'bot' as const,
          text: '🙋‍♀️ It looks like I cannot answer this. Connecting you to a live support agent right now...',
        });
      } else {
        newMessages.push({
          sender: 'bot' as const,
          text: "⚠️ Sorry, I didn't understand. Could you please rephrase or choose from catalog / order?",
        });
      }
    }

    setMessages(newMessages);
    setKeywordInput('');
  };

  const handleResetChat = () => {
    setMessages([
      { sender: 'bot', text: 'Hello! I am your store assistant. Type "catalog", "order", or "help".' },
    ]);
    setFallbackCount(0);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-charcoal transition-colors duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Support Home</span>
        </button>

        <span className="text-xs font-mono font-medium text-success bg-success-subtle px-2 py-0.5 rounded-md border border-success-border">
          Bot Diagnostic Suite
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-line shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-success-subtle text-success text-xs font-medium border border-success-border mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>Interactive Chatbot Diagnostics</span>
          </div>
          <h1 className="text-xl font-display font-semibold text-charcoal">
            Troubleshoot Bot Triggers &amp; Fallback Loops
          </h1>
          <p className="text-sm text-muted mt-1">
            Test how your automated WhatsApp bot responds to customer queries and avoid infinite looping when customers ask unpredicted questions.
          </p>
        </div>

        {/* Configuration Toggles */}
        <div className="p-4 rounded-2xl bg-canvas border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-medium text-charcoal">Smart Agent Handoff Protection</p>
            <p className="text-muted text-[11px]">
              Automatically transfer to a human agent queue if a user triggers the fallback 2 times.
            </p>
          </div>
          <button
            onClick={() => setHandoffEnabled(!handoffEnabled)}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors duration-150 cursor-pointer ${
              handoffEnabled
                ? 'bg-success text-white'
                : 'bg-canvas border border-line text-muted'
            }`}
          >
            {handoffEnabled ? '✓ Protection Active' : '✕ Disabled (Risk of Loop)'}
          </button>
        </div>

        {/* Interactive Chatbot Simulator */}
        <div className="rounded-2xl border border-line overflow-hidden bg-canvas">
          <div className="p-3 bg-white border-b border-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-charcoal">Live Bot Sandbox</span>
            </div>
            <button
              onClick={handleResetChat}
              className="text-[11px] text-accent hover:text-accent-hover font-medium flex items-center gap-1 cursor-pointer transition-colors duration-150"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Sandbox</span>
            </button>
          </div>

          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-canvas">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 max-w-sm ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 ${
                    m.sender === 'user'
                      ? 'bg-accent text-white'
                      : 'bg-success text-white'
                  }`}
                >
                  {m.sender === 'user' ? 'U' : 'B'}
                </div>
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-accent text-white'
                      : 'bg-white border border-line text-charcoal shadow-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Test Input Form */}
          <form onSubmit={handleTestKeyword} className="p-3 bg-white border-t border-line flex gap-2">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="Type test keyword: e.g. 'catalog', 'track order', or random 'xyz' to test fallback..."
              className="flex-1 px-3 py-2 text-xs bg-canvas border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent text-charcoal transition-all duration-150"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-medium rounded-xl cursor-pointer transition-colors duration-150"
            >
              Send
            </button>
          </form>
        </div>

        {/* Diagnostic Results */}
        <div className="p-4 rounded-xl bg-accent-subtle border border-accent-border text-xs text-accent space-y-1">
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Diagnostic Checklist:</span>
          </div>
          <p className="text-[11px]">
            • Keywords matched using flexible "Contains" logic.<br />
            • Fallback limit set to maximum 2 attempts to prevent customer frustration.<br />
            • Business hours automation configured: 9:00 AM – 8:00 PM EST.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
          <button
            onClick={() => onEscalate('Chatbot stuck in infinite loop logic', 'BOT-202')}
            className="text-muted hover:text-accent font-medium cursor-pointer transition-colors duration-150"
          >
            Escalate to Bot Engineer
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium cursor-pointer transition-colors duration-150"
          >
            Return to Support Home
          </button>
        </div>
      </div>
    </div>
  );
};
