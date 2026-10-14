import React, { useState } from 'react';
import {
  ArrowLeft,
  FileCode2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  Send,
  Zap,
} from 'lucide-react';
import { PageId } from '../types';

interface TemplateAssistantProps {
  onNavigate: (page: PageId) => void;
  onEscalate: (summary: string, errCode: string) => void;
}

export const TemplateAssistant: React.FC<TemplateAssistantProps> = ({
  onNavigate,
  onEscalate,
}) => {
  const [templateName, setTemplateName] = useState('diwali_festive_sale_v1');
  const [category, setCategory] = useState<'MARKETING' | 'UTILITY' | 'AUTHENTICATION'>('UTILITY');
  const [bodyText, setBodyText] = useState(
    'Hi {{1}}!! Grab 30% discount on all silk sarees today with code {{2}} at bit.ly/festive-deal'
  );
  const [isAnalyzed, setIsAnalyzed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Issues found in sample
  const issues = [
    {
      id: 1,
      rule: 'Prohibited Category Misclassification',
      detail: 'Template contains promotional discount words ("discount", "sale", "code") but is categorized as UTILITY. Meta strictly requires MARKETING category.',
      severity: 'error',
    },
    {
      id: 2,
      rule: 'Floating Variable Formatting',
      detail: 'Variable {{1}} is immediately followed by double exclamation marks "!!". Meta requires punctuation and spacing around variables.',
      severity: 'warning',
    },
    {
      id: 3,
      rule: 'Prohibited Shortened URL',
      detail: 'Shortened URLs (like bit.ly) are flagged as phishing risks. Meta requires full domain URLs like https://urbanboutique.com/sale.',
      severity: 'error',
    },
  ];

  const handleAutoFix = () => {
    setCategory('MARKETING');
    setBodyText(
      'Hi {{1}}, celebrate Diwali with 30% off your next purchase using code {{2}} at checkout: https://urbanboutique.com/festive-sale'
    );
    setIsAnalyzed(true);
    setIsSubmitted(false);
  };

  const handleSimulateSubmit = () => {
    setIsSubmitted(true);
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

        <span className="text-xs font-mono font-medium text-accent bg-accent-subtle px-2 py-0.5 rounded-md border border-accent-border">
          Template Linter v2.4
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-line shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-accent-subtle text-accent text-xs font-medium border border-accent-border mb-2">
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Interactive Template Repair</span>
          </div>
          <h1 className="text-xl font-display font-semibold text-charcoal">
            Fix Meta Message Template Rejection
          </h1>
          <p className="text-sm text-muted mt-1">
            Meta rejects 42% of message templates on first submission due to formatting and categorization rules. Our validator inspects your template before you re-submit.
          </p>
        </div>

        {/* Interactive Editor Form */}
        <div className="p-5 rounded-2xl bg-canvas border border-line space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-charcoal uppercase tracking-wider">
                Template Name
              </label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="w-full p-2.5 text-xs font-mono bg-white border border-line rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all duration-150"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-charcoal uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 text-xs bg-white border border-line rounded-xl text-charcoal font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all duration-150"
              >
                <option value="UTILITY">UTILITY (Order updates, receipts)</option>
                <option value="MARKETING">MARKETING (Offers, discounts, announcements)</option>
                <option value="AUTHENTICATION">AUTHENTICATION (OTP login codes)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-charcoal uppercase tracking-wider">
                Template Body Content
              </label>
              <button
                onClick={handleAutoFix}
                className="text-xs font-medium text-accent hover:text-accent-hover flex items-center gap-1 cursor-pointer transition-colors duration-150"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Fix Formatting with Cheerio AI</span>
              </button>
            </div>
            <textarea
              value={bodyText}
              onChange={(e) => {
                setBodyText(e.target.value);
                setIsSubmitted(false);
              }}
              rows={3}
              className="w-full p-3 text-xs bg-white border border-line rounded-xl text-charcoal leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all duration-150"
            />
          </div>
        </div>

        {/* Validation Issues Feedback */}
        {category === 'UTILITY' && (
          <div className="space-y-3 p-4 rounded-2xl bg-danger-subtle border border-danger-border">
            <div className="flex items-center gap-2 text-danger font-medium text-xs uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>3 Policy Violations Detected by Simulated Meta Validator</span>
            </div>

            <div className="space-y-2">
              {issues.map((iss) => (
                <div key={iss.id} className="p-3 bg-white rounded-xl border border-danger-border/50 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-danger">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                    <span>{iss.rule}</span>
                  </div>
                  <p className="text-muted text-[11px] pl-3 leading-relaxed">{iss.detail}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleAutoFix}
              className="w-full py-2.5 px-4 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-medium shadow-xs transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply Recommended 1-Click Fix</span>
            </button>
          </div>
        )}

        {category === 'MARKETING' && (
          <div className="p-4 rounded-2xl bg-success-subtle border border-success-border text-xs space-y-2">
            <div className="flex items-center gap-2 font-medium text-success">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Meta Compliant — Ready for Approval</span>
            </div>
            <p className="text-[11px] text-success">
              Category set to MARKETING, dynamic variables spaced properly, and full domain URL configured.
            </p>

            {!isSubmitted ? (
              <button
                onClick={handleSimulateSubmit}
                className="py-2 px-4 bg-success hover:opacity-90 text-white rounded-xl text-xs font-medium shadow-xs transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulate Submitting to Meta Review</span>
              </button>
            ) : (
              <div className="p-3 bg-white rounded-xl border border-success-border flex items-center gap-2 text-xs font-medium text-success">
                <CheckCircle2 className="w-4 h-4" />
                <span>Submitted! Meta auto-approved template in 12 seconds.</span>
              </div>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={() => onEscalate('Template rejected repeatedly by Meta review', 'TMPL-400')}
            className="text-muted hover:text-accent font-medium cursor-pointer transition-colors duration-150"
          >
            Escalate to Human Template Specialist
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium cursor-pointer transition-colors duration-150"
          >
            Done &amp; Return Home
          </button>
        </div>
      </div>
    </div>
  );
};
