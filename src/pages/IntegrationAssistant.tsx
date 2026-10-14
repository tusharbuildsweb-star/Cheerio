import React, { useState } from 'react';
import {
  ArrowLeft,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PageId } from '../types';

interface IntegrationAssistantProps {
  onNavigate: (page: PageId) => void;
  onEscalate: (summary: string, errCode: string) => void;
}

export const IntegrationAssistant: React.FC<IntegrationAssistantProps> = ({
  onNavigate,
  onEscalate,
}) => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'shopify',
      name: 'Shopify Store (UrbanBoutique)',
      type: 'Ecommerce',
      status: 'healthy',
      lastSync: '2 minutes ago',
      events: '1,420 orders synced',
      healthy: true,
    },
    {
      id: 'webhook',
      name: 'Custom Order Webhook (AWS Lambda)',
      type: 'Developer API',
      status: 'paused',
      lastSync: '3 hours ago',
      events: 'Paused after 3 consecutive 504 timeouts',
      healthy: false,
    },
    {
      id: 'sheets',
      name: 'Google Sheets VIP Broadcast Sync',
      type: 'CRM / Spreadsheet',
      status: 'healthy',
      lastSync: '10 minutes ago',
      events: '4,890 rows updated',
      healthy: true,
    },
  ]);

  const [testingId, setTestingId] = useState<string | null>(null);

  const handleTestSync = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: 'healthy',
                healthy: true,
                events: 'Connection verified • 0 errors detected',
                lastSync: 'Just now',
              }
            : item
        )
      );
      setTestingId(null);
    }, 1200);
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

        <span className="text-xs font-mono font-medium text-warning bg-warning-subtle px-2 py-0.5 rounded-md border border-warning-border">
          Sync Diagnostics
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-line shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-warning-subtle text-warning text-xs font-medium border border-warning-border mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Integrations Health</span>
          </div>
          <h1 className="text-xl font-display font-semibold text-charcoal">
            Troubleshoot Connected Integrations &amp; Webhooks
          </h1>
          <p className="text-sm text-muted mt-1">
            Ensure your Shopify abandoned cart notifications, CRM customer records, and custom API webhooks are firing properly.
          </p>
        </div>

        {/* Integration List */}
        <div className="space-y-3">
          {integrations.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                item.healthy
                  ? 'bg-white border-line hover:border-accent-border'
                  : 'bg-warning-subtle border-warning-border'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-charcoal">{item.name}</h3>
                  <span className="text-[10px] font-medium bg-canvas text-muted px-2 py-0.5 rounded-md border border-line">
                    {item.type}
                  </span>
                  {item.healthy ? (
                    <span className="text-[10px] font-medium text-success bg-success-subtle px-2 py-0.5 rounded-md border border-success-border flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-warning bg-warning-subtle px-2 py-0.5 rounded-md border border-warning-border flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Attention Needed
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted">{item.events}</p>
                <p className="text-[11px] text-subtle">Last Telemetry Check: {item.lastSync}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleTestSync(item.id)}
                  disabled={testingId === item.id}
                  className="px-3.5 py-1.5 bg-white border border-line hover:border-accent-border hover:bg-accent-subtle text-charcoal text-xs font-medium rounded-xl transition-all duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${testingId === item.id ? 'animate-spin text-accent' : ''}`}
                  />
                  <span>{testingId === item.id ? 'Sending Ping...' : 'Test Webhook Ping'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Diagnostic Tip */}
        <div className="p-4 rounded-xl bg-accent-subtle border border-accent-border text-xs text-accent space-y-1">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Shopify Webhook Configuration Tip:</span>
          </div>
          <p className="text-[11px]">
            Cheerio automatically listens to the <code className="font-mono bg-white/60 px-1 py-0.5 rounded">orders/create</code> and{' '}
            <code className="font-mono bg-white/60 px-1 py-0.5 rounded">checkouts/create</code> topics. If orders do not trigger WhatsApp alerts, ensure customer phone numbers are required at Shopify Checkout.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
          <button
            onClick={() => onEscalate('Custom webhook payload failing validation', 'INT-404')}
            className="text-muted hover:text-accent font-medium cursor-pointer transition-colors duration-150"
          >
            Escalate to Integrations Engineer
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
