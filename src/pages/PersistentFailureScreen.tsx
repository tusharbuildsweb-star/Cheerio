import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  HeadphonesIcon,
  RotateCcw,
  BookOpen,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { PageId, WhatsAppSymptom } from '../types';
import { TroubleshootingStepper } from '../components/TroubleshootingStepper';

interface PersistentFailureScreenProps {
  symptom: WhatsAppSymptom;
  onNavigate: (page: PageId) => void;
  onEscalateToHuman: (troubleshootingSummary: string, errorCode: string, problemTitle: string) => void;
  onRetryDiagnosis: () => void;
}

export const PersistentFailureScreen: React.FC<PersistentFailureScreenProps> = ({
  symptom,
  onNavigate,
  onEscalateToHuman,
  onRetryDiagnosis,
}) => {
  const simulatedDiagnosticSummary = [
    `Issue Code: ${symptom.errorCode}`,
    `Selected Problem: ${symptom.title}`,
    'Troubleshooting steps attempted:',
    '1. Confirmed intended business phone number (+1 555-019-2834).',
    '2. Identified existing WhatsApp registration on mobile or previous API setup.',
    '3. Explored official Meta WhatsApp Business Platform coexistence and migration options.',
    `4. Ran simulated connection verification: Meta Cloud API returned persistent registration conflict (${symptom.errorCode}).`,
    'Status: Automatic self-service resolution limit reached. Escalating to human support.',
  ].join('\n');

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* 4-Step Progress Indicator (Escalation) */}
      <TroubleshootingStepper currentStep={4} isFailure={true} />

      {/* Main Failure Surface — Calm Warning Design */}
      <div className="bg-surface rounded-xl p-6 sm:p-7 border border-line shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5 border-b border-line">
          <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-warning flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 stroke-[2]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded bg-amber-50 text-warning border border-amber-200">
                Self-Service Threshold Reached
              </span>
              <span className="text-[11px] font-mono text-subtle">{symptom.errorCode}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-charcoal tracking-tight">
              Automatic Handshake Could Not Complete
            </h1>
            <p className="text-xs sm:text-sm text-muted">
              Don’t worry — your phone number and existing WhatsApp chats are safe. Meta requires manual account authorization or official migration support to resolve the registration lock without data loss.
            </p>
          </div>
        </div>

        {/* Prototype Demo Banner */}
        <div className="p-3 rounded-lg bg-canvas border border-line text-xs text-muted flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-subtle shrink-0 stroke-[1.75]" />
          <span className="text-[11px] leading-relaxed">
            <strong className="text-charcoal font-medium">Demo Notice:</strong> All connection checks and error outputs shown are part of a simulated prototype. No actual Meta account or phone records were changed.
          </span>
        </div>

        {/* Why Automatic Fix Stopped */}
        <div className="p-4 rounded-lg bg-canvas border border-line space-y-2">
          <p className="text-xs font-mono uppercase text-muted font-medium tracking-wider">
            Why Automatic Remediation Paused
          </p>
          <ul className="text-xs text-muted space-y-1.5 list-disc pl-4 leading-relaxed">
            <li>
              Simulated Meta Cloud API check detected that phone number{' '}
              <strong className="text-charcoal font-mono">+1 (555) 019-2834</strong> is registered with another active WhatsApp setup.
            </li>
            <li>
              Simulated automated retries returned error code{' '}
              <strong className="text-danger font-mono">{symptom.errorCode}</strong>, indicating a registration conflict on Meta's servers.
            </li>
            <li>
              To protect your existing customer contacts and prevent accidental account deletion, automated retries were paused. Your diagnostic telemetry packet is bundled for human support.
            </li>
          </ul>
        </div>

        {/* Diagnostic Telemetry Packet Preview */}
        <div className="rounded-lg border border-line overflow-hidden">
          <div className="px-3.5 py-2 bg-canvas border-b border-line flex items-center justify-between text-xs text-muted font-medium">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-muted stroke-[1.75]" />
              <span>Simulated Diagnostic Telemetry (Pre-filled into Support Ticket)</span>
            </div>
            <span className="text-[10px] font-mono text-muted">{symptom.errorCode}</span>
          </div>

          <div className="p-3.5 bg-stone-900 text-stone-300 font-mono text-[11px] space-y-1 overflow-x-auto">
            <p className="text-stone-500">// Cheerio Self-Service Telemetry Snapshot (Simulated)</p>
            <p className="text-emerald-400">STATUS: AUTO_DIAGNOSIS_PERSISTENT_FAILURE</p>
            <p className="text-stone-400">Target WABA ID: waba_88294719482 (Simulated)</p>
            <p className="text-stone-400">Phone Identifier: +15550192834</p>
            <p className="text-rose-400">
              Error Payload: &#123;&quot;code&quot;: {symptom.errorCode}, &quot;subcode&quot;: 1383041, &quot;type&quot;: &quot;OAuthException&quot;&#125;
            </p>
            <p className="text-amber-400">Action: Escalating session context to Cheerio Human Support Desk.</p>
          </div>
        </div>

        {/* Human Escalation Banner */}
        <div className="p-4 rounded-xl bg-canvas border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="text-xs font-semibold text-charcoal flex items-center gap-2">
              <HeadphonesIcon className="w-3.5 h-3.5 text-muted stroke-[1.75]" />
              <span>Cheerio Human Support Team Ready</span>
            </h3>
            <p className="text-xs text-muted">
              Your issue code ({symptom.errorCode}), problem description, and attempted troubleshooting steps are already pre-filled.
            </p>
          </div>

          <button
            onClick={() => onEscalateToHuman(simulatedDiagnosticSummary, symptom.errorCode, symptom.title)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#6D45D9] hover:bg-[#5B35C8] text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0"
          >
            <HeadphonesIcon className="w-3.5 h-3.5" />
            <span>Escalate to Human Support</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-line flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onRetryDiagnosis}
              className="px-3 py-1.5 rounded-md border border-line text-muted hover:text-charcoal hover:bg-canvas transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>Retry Self-Diagnosis</span>
            </button>

            <button
              onClick={() => onNavigate('help-center')}
              className="px-3 py-1.5 rounded-md border border-line text-muted hover:text-charcoal hover:bg-canvas transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>Browse Knowledge Base</span>
            </button>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="text-muted hover:text-charcoal transition-colors cursor-pointer"
          >
            Return to Support Home
          </button>
        </div>
      </div>
    </div>
  );
};
