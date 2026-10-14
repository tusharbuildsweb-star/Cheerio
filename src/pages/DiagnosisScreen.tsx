import React, { useState } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  RefreshCw,
  HeadphonesIcon,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Layers,
  FileText,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { PageId, WhatsAppSymptom } from '../types';
import { TroubleshootingStepper } from '../components/TroubleshootingStepper';

interface DiagnosisScreenProps {
  symptom: WhatsAppSymptom;
  onNavigate: (page: PageId) => void;
  onSimulateSuccess: () => void;
  onSimulateFailure: () => void;
  onRestart: () => void;
  onContactHumanSupport: (summary: string, errorCode: string, problemTitle: string) => void;
}

export const DiagnosisScreen: React.FC<DiagnosisScreenProps> = ({
  symptom,
  onNavigate,
  onSimulateSuccess,
  onSimulateFailure,
  onRestart,
  onContactHumanSupport,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanningTarget, setScanningTarget] = useState<'success' | 'failure'>('success');
  const [showInstructions, setShowInstructions] = useState(true);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [phoneConfirmed, setPhoneConfirmed] = useState(true);
  const [existingSetupType, setExistingSetupType] = useState<string>('mobile_app');

  // Trigger simulated scanning animation
  const runSimulatedScan = (targetResult: 'success' | 'failure') => {
    setIsScanning(true);
    setScanningTarget(targetResult);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 600);
    setTimeout(() => setScanStep(3), 1200);
    setTimeout(() => {
      setIsScanning(false);
      if (targetResult === 'success') {
        onSimulateSuccess();
      } else {
        onSimulateFailure();
      }
    }, 1800);
  };

  const handleEscalateClick = () => {
    const attemptedStepsSummary = [
      '1. Confirmed intended business phone number (+1 555-019-2834)',
      `2. Identified existing WhatsApp registration instance (${existingSetupType})`,
      '3. Reviewed Meta Business Platform coexistence & official migration pathways',
      `4. Evaluated simulated conflict response (${symptom.errorCode})`,
    ].join('\n');

    onContactHumanSupport(attemptedStepsSummary, symptom.errorCode, symptom.title);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('whatsapp-assistant')}
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-charcoal transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Symptom Selection</span>
        </button>

        <button
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-charcoal transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 stroke-[1.75]" />
          <span>Restart Flow</span>
        </button>
      </div>

      {/* 4-Step Progress Indicator */}
      <TroubleshootingStepper currentStep={3} />

      {/* Main Diagnostic Surface */}
      <div className="bg-surface rounded-xl p-6 sm:p-7 border border-line shadow-xs space-y-6">
        {/* Header finding */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-line">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase bg-amber-50 text-warning border border-amber-200">
                <AlertTriangle className="w-3 h-3 stroke-[2]" />
                Simulated Conflict
              </span>
              <span className="font-mono text-[11px] bg-canvas text-muted px-1.5 py-0.5 rounded border border-line">
                Code: {symptom.errorCode}
              </span>
              <span className="text-[11px] text-subtle font-mono">
                Simulated Evaluation
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-charcoal tracking-tight">
              {symptom.title}
            </h1>
          </div>

          <div className="text-left sm:text-right shrink-0 px-3 py-2 bg-canvas rounded-lg border border-line">
            <p className="text-[10px] font-mono uppercase text-subtle font-medium">
              Target Phone Number
            </p>
            <p className="text-xs font-mono font-semibold text-charcoal mt-0.5">+1 (555) 019-2834</p>
          </div>
        </div>

        {/* Safety Note: Do Not Delete Account */}
        <div className="p-3.5 rounded-lg bg-canvas border border-line text-xs space-y-1">
          <div className="flex items-center gap-2 text-charcoal font-medium">
            <ShieldCheck className="w-4 h-4 text-muted stroke-[1.75]" />
            <span>Safer Resolution Protocol (No Account Deletion)</span>
          </div>
          <p className="text-muted leading-relaxed text-[12px]">
            Meta detected this phone number is registered with another active WhatsApp setup.
            <strong className="text-charcoal font-medium"> Do not delete your WhatsApp account or chat history.</strong> Meta supports official coexistence and number porting to preserve your business conversations.
          </p>
        </div>

        {/* 4 Safer Step-by-Step Sections */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-muted">
                Step-by-Step Instructions
              </h2>
            </div>

            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-xs text-muted hover:text-charcoal font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>{showInstructions ? 'Hide Details' : 'View Instructions'}</span>
            </button>
          </div>

          {showInstructions && (
            <div className="space-y-2.5">
              {/* Step 1: Confirm Target Phone */}
              <div className="p-3.5 rounded-lg border border-line bg-surface space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-canvas border border-line text-[11px] font-mono text-charcoal flex items-center justify-center font-medium">
                      1
                    </span>
                    <h3 className="text-xs font-medium text-charcoal">
                      Confirm Intended Business Phone Number
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-subtle">Check</span>
                </div>
                <p className="text-xs text-muted leading-relaxed pl-7">
                  Verify that +1 (555) 019-2834 is the dedicated company line you intended to register.
                </p>
                <div className="pl-7 pt-0.5">
                  <label className="inline-flex items-center gap-2 text-xs text-charcoal cursor-pointer">
                    <input
                      type="checkbox"
                      checked={phoneConfirmed}
                      onChange={(e) => setPhoneConfirmed(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-line text-[#6D45D9] focus:ring-[#6D45D9]"
                    />
                    <span className="text-[12px] text-muted">
                      Confirmed: +1 (555) 019-2834 is our intended business SIM
                    </span>
                  </label>
                </div>
              </div>

              {/* Step 2: Existing Setup Identification */}
              <div className="p-3.5 rounded-lg border border-line bg-surface space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-canvas border border-line text-[11px] font-mono text-charcoal flex items-center justify-center font-medium">
                      2
                    </span>
                    <h3 className="text-xs font-medium text-charcoal">
                      Identify Where This Number is Currently Active
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-subtle">Exclusivity</span>
                </div>
                <p className="text-xs text-muted leading-relaxed pl-7">
                  Meta prohibits duplicate active sessions. Select which situation describes your current setup:
                </p>
                <div className="pl-7 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setExistingSetupType('mobile_app')}
                    className={`p-2.5 rounded-md border text-left transition-all text-xs cursor-pointer ${
                      existingSetupType === 'mobile_app'
                        ? 'bg-[#F5F3FF] border-[#DDD6FE] text-[#6D45D9] font-medium'
                        : 'bg-canvas border-line text-muted hover:border-stone-300'
                    }`}
                  >
                    <p className="font-medium">WhatsApp Mobile App</p>
                    <p className="text-[11px] text-subtle mt-0.5">Consumer or WA Business</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExistingSetupType('previous_bsp')}
                    className={`p-2.5 rounded-md border text-left transition-all text-xs cursor-pointer ${
                      existingSetupType === 'previous_bsp'
                        ? 'bg-[#F5F3FF] border-[#DDD6FE] text-[#6D45D9] font-medium'
                        : 'bg-canvas border-line text-muted hover:border-stone-300'
                    }`}
                  >
                    <p className="font-medium">Previous API / BSP</p>
                    <p className="text-[11px] text-subtle mt-0.5">Prior provider account</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExistingSetupType('unsure')}
                    className={`p-2.5 rounded-md border text-left transition-all text-xs cursor-pointer ${
                      existingSetupType === 'unsure'
                        ? 'bg-[#F5F3FF] border-[#DDD6FE] text-[#6D45D9] font-medium'
                        : 'bg-canvas border-line text-muted hover:border-stone-300'
                    }`}
                  >
                    <p className="font-medium">Unsure / Locked</p>
                    <p className="text-[11px] text-subtle mt-0.5">Need assisted recovery</p>
                  </button>
                </div>
              </div>

              {/* Step 3: Review Migration & Coexistence */}
              <div className="p-3.5 rounded-lg border border-line bg-surface space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-canvas border border-line text-[11px] font-mono text-charcoal flex items-center justify-center font-medium">
                      3
                    </span>
                    <h3 className="text-xs font-medium text-charcoal">
                      Review Migration &amp; Coexistence Options
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-subtle">Meta Options</span>
                </div>
                <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-0.5">
                  <div className="p-3 rounded-md bg-canvas border border-line space-y-1">
                    <p className="font-medium text-charcoal flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-muted stroke-[1.75]" />
                      <span>Supported Coexistence</span>
                    </p>
                    <p className="text-[11px] text-muted leading-relaxed">
                      Eligible business numbers can operate on both the WhatsApp Business mobile app and Cloud API simultaneously.
                    </p>
                  </div>

                  <div className="p-3 rounded-md bg-canvas border border-line space-y-1">
                    <p className="font-medium text-charcoal flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-muted stroke-[1.75]" />
                      <span>Official WABA Migration</span>
                    </p>
                    <p className="text-[11px] text-muted leading-relaxed">
                      Port your number to Cheerio using two-factor authentication without wiping existing contacts or history.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4: Assisted Escalation */}
              <div className="p-3.5 rounded-lg border border-line bg-surface space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-canvas border border-line text-[11px] font-mono text-charcoal flex items-center justify-center font-medium">
                      4
                    </span>
                    <h3 className="text-xs font-medium text-charcoal">
                      Assisted Escalation Option
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-subtle">Human Support</span>
                </div>
                <p className="text-xs text-muted leading-relaxed pl-7">
                  If you cannot access the previous registration account or need guided porting, our support engineers can resolve the lock with Meta directly.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Simulated API Handshake Details */}
        <div className="border border-line rounded-lg overflow-hidden">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full px-3.5 py-2.5 bg-canvas flex items-center justify-between text-xs font-medium text-muted hover:text-charcoal cursor-pointer"
          >
            <span>Simulated Cloud API Handshake Output</span>
            {showTechnicalDetails ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
          {showTechnicalDetails && (
            <div className="p-3.5 bg-stone-900 text-stone-300 font-mono text-[11px] space-y-1 overflow-x-auto">
              <p className="text-stone-500">// Simulated Cloud API Telemetry</p>
              <p className="text-emerald-400">[SIMULATED PING] GET /v21.0/waba_88294719482/phone_numbers HTTP/2</p>
              <p className="text-stone-400">Host: graph.facebook.com (Simulated Demo Endpoint)</p>
              <p className="text-rose-400">
                Response 409 Conflict: &#123;&quot;error&quot;:&#123;&quot;message&quot;:&quot;Phone number already registered on another WhatsApp instance&quot;,&quot;code&quot;:409&#125;&#125;
              </p>
            </div>
          )}
        </div>

        {/* Scanning Animation State */}
        {isScanning && (
          <div className="p-3.5 bg-canvas rounded-lg border border-line space-y-2 text-xs">
            <div className="flex items-center gap-2 text-charcoal font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#6D45D9]" />
              <span>Simulating connection check for +1 (555) 019-2834...</span>
            </div>
            <div className="space-y-1 text-muted pl-5 text-[11px] font-mono">
              <p className={scanStep >= 1 ? 'text-charcoal font-medium' : 'text-subtle'}>
                • Verifying target business phone number...
              </p>
              <p className={scanStep >= 2 ? 'text-charcoal font-medium' : 'text-subtle'}>
                • Evaluating simulated registration conflict status...
              </p>
              <p className={scanStep >= 3 ? 'text-charcoal font-medium' : 'text-subtle'}>
                • Handshake simulation: {scanningTarget === 'success' ? 'Resolved' : 'Conflict'}
              </p>
            </div>
          </div>
        )}

        {/* 4 Functional Buttons — Styled with Quiet Luxury Elegance */}
        <div className="pt-2 border-t border-line space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-medium">
              Actions &amp; Simulation Controls
            </span>
            <span className="text-[11px] text-subtle">
              Choose your test scenario
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {/* Button 1: View troubleshooting instructions */}
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="px-3 py-2 rounded-md bg-surface border border-line text-charcoal hover:bg-canvas hover:border-stone-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-muted stroke-[1.75]" />
              <span>{showInstructions ? 'Hide Instructions' : 'View Instructions'}</span>
            </button>

            {/* Button 2: Retry simulated connection */}
            <button
              onClick={() => runSimulatedScan('success')}
              disabled={isScanning}
              className="px-3 py-2 rounded-md bg-[#6D45D9] hover:bg-[#5B35C8] disabled:opacity-50 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning && scanningTarget === 'success' ? 'animate-spin' : ''}`} />
              <span>Retry Connection</span>
            </button>

            {/* Button 3: Simulate persistent failure */}
            <button
              onClick={() => runSimulatedScan('failure')}
              disabled={isScanning}
              className="px-3 py-2 rounded-md bg-surface border border-line text-danger hover:bg-rose-50/50 hover:border-rose-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>Simulate Failure</span>
            </button>

            {/* Button 4: Contact human support */}
            <button
              onClick={handleEscalateClick}
              className="px-3 py-2 rounded-md bg-surface border border-line text-charcoal hover:bg-canvas hover:border-stone-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <HeadphonesIcon className="w-3.5 h-3.5 text-muted stroke-[1.75]" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="pt-2 border-t border-line flex items-center justify-between text-xs text-muted">
          <span>Need to check a different issue?</span>
          <button
            onClick={() => onNavigate('home')}
            className="text-charcoal hover:text-[#6D45D9] font-medium transition-colors cursor-pointer"
          >
            Return to Support Home
          </button>
        </div>
      </div>
    </div>
  );
};
