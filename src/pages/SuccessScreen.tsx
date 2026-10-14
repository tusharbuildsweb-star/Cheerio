import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Smartphone,
  ShieldCheck,
  CheckCheck,
  RotateCcw,
  BookOpen,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { PageId } from '../types';
import { TroubleshootingStepper } from '../components/TroubleshootingStepper';

interface SuccessScreenProps {
  onNavigate: (page: PageId) => void;
  onRestart: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onNavigate, onRestart }) => {
  const [testMessage, setTestMessage] = useState(
    'Hello! Your WhatsApp Cloud API integration with Cheerio is verified and ready for customer conversations.'
  );
  const [messageStatus, setMessageStatus] = useState<'idle' | 'sending' | 'sent' | 'read'>('idle');
  const [simulatedTimestamp, setSimulatedTimestamp] = useState<string>('Just now');

  const handleSendTestMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testMessage.trim()) return;

    setMessageStatus('sending');
    setTimeout(() => {
      setMessageStatus('sent');
      setSimulatedTimestamp('12:00 PM');
      setTimeout(() => {
        setMessageStatus('read');
      }, 800);
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* 4-Step Progress Indicator (Completed) */}
      <TroubleshootingStepper currentStep={4} />

      {/* Main Success Surface */}
      <div className="bg-surface rounded-xl p-6 sm:p-7 border border-line shadow-xs space-y-6">
        {/* Restrained Success Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5 border-b border-line">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-success flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 stroke-[2]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded bg-emerald-50 text-success border border-emerald-200">
                Simulated Success
              </span>
              <span className="text-[11px] font-mono text-subtle">WABA-8829</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-charcoal tracking-tight">
              WhatsApp Connection Verified
            </h1>
            <p className="text-xs sm:text-sm text-muted">
              Simulated demonstration: business phone number +1 (555) 019-2834 has established a healthy Cloud API session.
            </p>
          </div>
        </div>

        {/* Unobtrusive Demo Status Disclaimer */}
        <div className="p-3 rounded-lg bg-canvas border border-line text-xs text-muted flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-subtle shrink-0 stroke-[1.75]" />
          <span className="text-[11px] leading-relaxed">
            <strong className="text-charcoal font-medium">Demo Sandbox:</strong> This prototype simulates a successful WhatsApp onboarding handshake. No live Meta billing or external API calls occurred.
          </span>
        </div>

        {/* Neat Aligned Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-canvas border border-line space-y-0.5">
            <p className="text-[10px] font-mono uppercase text-subtle font-medium">Phone Identifier</p>
            <p className="text-xs font-mono font-medium text-charcoal">+1 (555) 019-2834</p>
            <span className="text-[10px] text-success font-medium">Simulated Ready</span>
          </div>

          <div className="p-3 rounded-lg bg-canvas border border-line space-y-0.5">
            <p className="text-[10px] font-mono uppercase text-subtle font-medium">Connection State</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <p className="text-xs font-medium text-charcoal">Connected</p>
            </div>
            <span className="text-[10px] text-muted">Latency: 38ms</span>
          </div>

          <div className="p-3 rounded-lg bg-canvas border border-line space-y-0.5">
            <p className="text-[10px] font-mono uppercase text-subtle font-medium">Quality Rating</p>
            <p className="text-xs font-medium text-success">High (Green)</p>
            <span className="text-[10px] text-muted">Zero spam flags</span>
          </div>

          <div className="p-3 rounded-lg bg-canvas border border-line space-y-0.5">
            <p className="text-[10px] font-mono uppercase text-subtle font-medium">Messaging Tier</p>
            <p className="text-xs font-medium text-charcoal">Tier 1 Limit</p>
            <span className="text-[10px] text-muted">1,000 customers / 24h</span>
          </div>
        </div>

        {/* Refined Live Message Simulator */}
        <div className="p-4 rounded-xl border border-line bg-canvas/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-muted stroke-[1.75]" />
              <h3 className="text-xs font-medium text-charcoal uppercase tracking-wider font-mono">
                Simulated Test Message Handshake
              </h3>
            </div>
            <span className="text-[10px] font-mono text-muted bg-surface px-1.5 py-0.5 rounded border border-line">
              Interactive Tool
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Input Form */}
            <form onSubmit={handleSendTestMessage} className="space-y-2">
              <label className="text-xs text-muted block">
                Type test text to preview delivery:
              </label>
              <textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                rows={3}
                className="w-full p-2.5 text-xs bg-surface border border-line rounded-lg focus:outline-none focus:border-stone-400 text-charcoal leading-relaxed"
              />
              <button
                type="submit"
                disabled={messageStatus === 'sending'}
                className="w-full py-2 px-3 rounded-lg bg-charcoal hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>
                  {messageStatus === 'sending' ? 'Transmitting via Cloud Relay...' : 'Send Test WhatsApp Message'}
                </span>
              </button>
            </form>

            {/* Quiet Minimal Phone Preview */}
            <div className="bg-surface rounded-xl p-3.5 border border-line shadow-xs max-w-sm mx-auto w-full space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-line text-[11px] text-muted font-mono">
                <span className="font-medium text-charcoal">Cheerio Cloud Relay</span>
                <span className="text-[10px] text-success">Online</span>
              </div>

              {messageStatus === 'idle' ? (
                <div className="py-6 text-center text-subtle text-xs">
                  Click "Send Test WhatsApp Message" to simulate live delivery.
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-canvas text-charcoal text-xs space-y-1 border border-line animate-in fade-in duration-150">
                  <p className="text-[11px] leading-relaxed">{testMessage}</p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-subtle font-mono">
                    <span>{simulatedTimestamp}</span>
                    {messageStatus === 'read' ? (
                      <CheckCheck className="w-3 h-3 text-[#6D45D9]" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3 text-muted" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Prominent Next Action & Quiet Secondary Actions */}
        <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onRestart}
            className="px-3.5 py-2 rounded-lg border border-line text-xs font-medium text-muted hover:text-charcoal hover:bg-canvas transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Test Another Setup Scenario</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('help-center')}
              className="px-3.5 py-2 rounded-lg border border-line text-xs font-medium text-muted hover:text-charcoal hover:bg-canvas transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>Browse Knowledge Base</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-2 rounded-lg bg-[#6D45D9] hover:bg-[#5B35C8] text-white text-xs font-medium shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Return to Support Home</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
