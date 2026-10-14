import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { PageId, WhatsAppSymptom } from '../types';
import { WHATSAPP_SYMPTOMS } from '../data/sampleData';
import { TroubleshootingStepper } from '../components/TroubleshootingStepper';

interface WhatsAppAssistantProps {
  onNavigate: (page: PageId) => void;
  selectedSymptom: WhatsAppSymptom;
  onSelectSymptom: (symptom: WhatsAppSymptom) => void;
  onStartDiagnosis: () => void;
}

export const WhatsAppAssistant: React.FC<WhatsAppAssistantProps> = ({
  onNavigate,
  selectedSymptom,
  onSelectSymptom,
  onStartDiagnosis,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-charcoal transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>

        <button
          onClick={() => onNavigate('help-center')}
          className="text-xs text-muted hover:text-[#6D45D9] font-medium flex items-center gap-1 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 stroke-[1.75]" />
          <span>View Coexistence Documentation</span>
        </button>
      </div>

      {/* 4-Step Progress Indicator */}
      <TroubleshootingStepper currentStep={1} />

      {/* Main Selection Surface */}
      <div className="bg-surface rounded-xl p-6 sm:p-7 border border-line shadow-xs space-y-6">
        <div className="space-y-1.5 border-b border-line pb-5">
          <h1 className="text-xl sm:text-2xl font-semibold text-charcoal tracking-tight">
            What trouble are you experiencing connecting WhatsApp?
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Meta Cloud API requires strict number exclusivity. Select the symptom closest to what occurred on your screen to run an automated simulated check.
          </p>
        </div>

        {/* Quiet Luxury Security Guarantee */}
        <div className="p-3.5 rounded-lg bg-canvas border border-line flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-muted shrink-0 mt-0.5 stroke-[1.75]" />
          <div className="text-xs space-y-0.5 text-muted">
            <p className="font-medium text-charcoal">
              Safe &amp; Non-Destructive Troubleshooting
            </p>
            <p className="text-[12px] leading-relaxed">
              We will never ask for your passwords, API keys, or WhatsApp two-step verification codes. Official coexistence and migration pathways protect your existing chat history.
            </p>
          </div>
        </div>

        {/* Symptom Selectors */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted block">
            Select Detected Situation
          </label>

          <div className="space-y-2">
            {WHATSAPP_SYMPTOMS.map((symptom) => {
              const isSelected = selectedSymptom.id === symptom.id;

              return (
                <div
                  key={symptom.id}
                  onClick={() => onSelectSymptom(symptom)}
                  className={`p-4 rounded-lg border transition-all duration-150 cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-[#F5F3FF]/40 border-[#6D45D9] shadow-xs'
                      : 'bg-surface border-line hover:border-stone-400 hover:bg-canvas/50'
                  }`}
                >
                  {/* Minimalist Radio Indicator */}
                  <div className="pt-0.5 shrink-0">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-[#6D45D9] bg-[#6D45D9]'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3
                        className={`text-xs sm:text-sm font-medium ${
                          isSelected ? 'text-charcoal font-semibold' : 'text-charcoal'
                        }`}
                      >
                        {symptom.title}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] bg-canvas text-muted px-1.5 py-0.5 rounded border border-line">
                          {symptom.errorCode}
                        </span>
                        <span
                          className={`text-[9px] font-mono font-medium uppercase px-1.5 py-0.2 rounded border ${
                            symptom.severity === 'high'
                              ? 'bg-rose-50 text-danger border-rose-200'
                              : symptom.severity === 'medium'
                              ? 'bg-amber-50 text-warning border-amber-200'
                              : 'bg-stone-100 text-muted border-stone-200'
                          }`}
                        >
                          {symptom.severity}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted leading-relaxed">
                      {symptom.description}
                    </p>

                    {isSelected && (
                      <div className="pt-1.5 flex items-center gap-1.5 text-xs text-[#6D45D9] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ready to run safe diagnostic on this configuration</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-subtle">
            Simulated check run time: ~3 seconds
          </span>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={() => onNavigate('home')}
              className="px-3.5 py-2 rounded-lg border border-line text-xs font-medium text-muted hover:text-charcoal hover:bg-canvas transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={onStartDiagnosis}
              className="flex-1 sm:flex-initial px-5 py-2 rounded-lg bg-[#6D45D9] hover:bg-[#5B35C8] text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Run Automated Diagnosis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
