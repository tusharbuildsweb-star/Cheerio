import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { PageId } from '../types';

interface DeliveryAssistantProps {
  onNavigate: (page: PageId) => void;
  onEscalate: (summary: string, errCode: string) => void;
}

export const DeliveryAssistant: React.FC<DeliveryAssistantProps> = ({
  onNavigate,
  onEscalate,
}) => {
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);

  const handleRunAudit = () => {
    setIsRunningAudit(true);
    setTimeout(() => {
      setIsRunningAudit(false);
      setAuditComplete(true);
    }, 1400);
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

        <span className="text-xs font-mono font-medium text-danger bg-danger-subtle px-2 py-0.5 rounded-md border border-danger-border">
          Delivery Health Monitor
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-line shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-danger-subtle text-danger text-xs font-medium border border-danger-border mb-2">
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Delivery &amp; Tier Health</span>
          </div>
          <h1 className="text-xl font-display font-semibold text-charcoal">
            Check Message Delivery &amp; WhatsApp Quality Rating
          </h1>
          <p className="text-sm text-muted mt-1">
            Meta tracks customer block rates and spam reports. Monitor your tier capacity and prevent sending restrictions.
          </p>
        </div>

        {/* Quality Rating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-success-subtle border border-success-border">
            <p className="text-[11px] font-medium text-success uppercase">Meta Quality Rating</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
              <p className="text-lg font-semibold text-charcoal">High (Green)</p>
            </div>
            <p className="text-[11px] text-success mt-1">0 spam reports in the last 7 days</p>
          </div>

          <div className="p-4 rounded-2xl bg-canvas border border-line">
            <p className="text-[11px] font-medium text-muted uppercase">Current Messaging Tier</p>
            <p className="text-lg font-semibold text-charcoal mt-1">Tier 1 Limit</p>
            <p className="text-[11px] text-muted mt-1">1,000 unique customers / 24 hours</p>
          </div>

          <div className="p-4 rounded-2xl bg-canvas border border-line">
            <p className="text-[11px] font-medium text-muted uppercase">Delivery Success Rate</p>
            <p className="text-lg font-semibold text-charcoal mt-1">99.4%</p>
            <p className="text-[11px] text-muted mt-1">1,412 delivered / 1,420 sent</p>
          </div>
        </div>

        {/* Interactive Delivery Audit */}
        <div className="p-5 rounded-2xl bg-canvas border border-line space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-charcoal">Simulate Real-Time Delivery Audit</p>
              <p className="text-[11px] text-muted">
                Pings Meta delivery relay endpoints to check for undelivered batches.
              </p>
            </div>

            <button
              onClick={handleRunAudit}
              disabled={isRunningAudit}
              className="px-4 py-2 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white text-xs font-medium rounded-xl transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRunningAudit ? 'animate-spin' : ''}`} />
              <span>{isRunningAudit ? 'Running Audit...' : 'Run Delivery Audit'}</span>
            </button>
          </div>

          {auditComplete && (
            <div className="p-3 bg-success-subtle rounded-xl border border-success-border text-xs text-success flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                Audit passed: All WhatsApp Cloud API nodes reporting 100% throughput with 0 queued retries.
              </span>
            </div>
          )}
        </div>

        {/* Deliverability Checklist */}
        <div className="p-4 rounded-xl bg-accent-subtle border border-accent-border text-xs text-accent space-y-2">
          <p className="font-medium">Tips to Maintain Green Quality Rating:</p>
          <ul className="list-disc pl-5 space-y-1 text-[11px]">
            <li>Only message contacts who gave clear opt-in consent during checkout.</li>
            <li>Always provide an easy "Reply STOP to unsubscribe" button on marketing broadcasts.</li>
            <li>Avoid sending multiple broadcasts to the same contact in a single day.</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
          <button
            onClick={() => onEscalate('High message drop rate / Meta rating yellow', 'DEL-503')}
            className="text-muted hover:text-accent font-medium cursor-pointer transition-colors duration-150"
          >
            Escalate to Deliverability Specialist
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
