import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Send,
  HeadphonesIcon,
  CheckCircle2,
  Info,
  ShieldCheck,
  Paperclip,
  Clock,
  Ticket,
  X,
  FileText,
} from 'lucide-react';
import { PageId, SupportTicket } from '../types';

interface HumanSupportFormProps {
  onNavigate: (page: PageId) => void;
  onSubmitTicket: (ticket: SupportTicket) => void;
  prefillSummary?: string;
  prefillErrorCode?: string;
  prefillCategory?: string;
  prefillProblemTitle?: string;
}

export const HumanSupportForm: React.FC<HumanSupportFormProps> = ({
  onNavigate,
  onSubmitTicket,
  prefillSummary = '',
  prefillErrorCode = '',
  prefillCategory = 'WhatsApp Connection',
  prefillProblemTitle = '',
}) => {
  // Form field states
  const [fullName, setFullName] = useState('Rahul Verma');
  const [businessName, setBusinessName] = useState('UrbanBoutique Store');
  const [email, setEmail] = useState('rahul@urbanboutique.com');
  const [category, setCategory] = useState(prefillCategory);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('high');
  const [problemTitle, setProblemTitle] = useState(prefillProblemTitle);
  const [description, setDescription] = useState(
    prefillErrorCode
      ? `Our WhatsApp Cloud API connection handshake returned error ${prefillErrorCode} (${prefillProblemTitle || 'registration conflict'}). We confirmed the intended business phone number (+1 555-019-2834) and checked for prior WhatsApp registrations. We request human support assistance to review official coexistence or safe number migration without losing customer chat history.`
      : ''
  );
  const [troubleshootingSummary, setTroubleshootingSummary] = useState(prefillSummary);
  const [errorCode, setErrorCode] = useState(prefillErrorCode);
  const [attachedFiles, setAttachedFiles] = useState<string[]>(
    prefillErrorCode ? ['cheerio_telemetry_snapshot_waba409.json'] : []
  );

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicket | null>(null);

  // Sync prefill values if passed
  useEffect(() => {
    if (prefillSummary) setTroubleshootingSummary(prefillSummary);
    if (prefillErrorCode) setErrorCode(prefillErrorCode);
    if (prefillCategory) setCategory(prefillCategory);
    if (prefillProblemTitle) {
      setProblemTitle(prefillProblemTitle);
      setDescription(
        `Our WhatsApp Cloud API connection handshake returned error ${prefillErrorCode || 'WABA-409'} (${prefillProblemTitle}). We confirmed the intended business phone number (+1 555-019-2834) and checked for prior WhatsApp registrations. We request human support assistance to review official coexistence or safe number migration without losing customer chat history.`
      );
    }
  }, [prefillSummary, prefillErrorCode, prefillCategory, prefillProblemTitle]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!businessName.trim()) {
      newErrors.businessName = 'Business name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Business email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid work email address.';
    }

    if (!description.trim()) {
      newErrors.description = 'Please provide a description of the issue.';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Please describe the issue in at least 15 characters.';
    }

    if (!category) {
      newErrors.category = 'Please select an issue category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Generate simulated Ticket ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newTicketId = `CHE-${randomNum}`;

    const newTicket: SupportTicket = {
      id: newTicketId,
      subject: `${category}: ${description.slice(0, 50)}${description.length > 50 ? '...' : ''}`,
      category,
      priority,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fullName,
      businessName,
      email,
      errorCode: errorCode || undefined,
      troubleshootingSummary: troubleshootingSummary || undefined,
      description,
      assignedAgent: {
        name: 'Priority Queue (Cheerio Operations)',
        role: 'Tier 2 WhatsApp API Support',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      },
      messages: [
        {
          id: `msg-${Date.now()}-1`,
          sender: 'user',
          senderName: fullName,
          timestamp: new Date().toISOString(),
          content: description,
        },
        {
          id: `msg-${Date.now()}-2`,
          sender: 'system',
          senderName: 'Cheerio Automated Relay',
          timestamp: new Date().toISOString(),
          content: troubleshootingSummary
            ? `Attached Telemetry:\n${troubleshootingSummary}`
            : 'Ticket logged with priority routing. Attached automated system diagnostics.',
        },
      ],
    };

    onSubmitTicket(newTicket);
    setSubmittedTicket(newTicket);
  };

  const handleSimulateAttachment = () => {
    const sampleAttachments = ['waba_handshake_screenshot.png', 'meta_business_manager_id.pdf', 'error_log_export.csv'];
    const randomAttachment = sampleAttachments[Math.floor(Math.random() * sampleAttachments.length)];
    if (!attachedFiles.includes(randomAttachment)) {
      setAttachedFiles([...attachedFiles, randomAttachment]);
    }
  };

  const removeAttachment = (fileName: string) => {
    setAttachedFiles(attachedFiles.filter((f) => f !== fileName));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-charcoal transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>

        <button
          onClick={() => onNavigate('my-tickets')}
          className="text-xs text-muted hover:text-charcoal font-medium flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Ticket className="w-3.5 h-3.5 stroke-[1.75]" />
          <span>View Session Tickets</span>
        </button>
      </div>

      {/* Main Support Form Container */}
      <div className="bg-surface rounded-xl p-6 sm:p-7 border border-line shadow-xs space-y-6">
        <div className="space-y-1.5 border-b border-line pb-5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded bg-[#F5F3FF] text-[#6D45D9] border border-[#DDD6FE]">
              Assisted Escalation
            </span>
            <span className="text-[11px] font-mono text-subtle">Tier 2 Support</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-charcoal tracking-tight">
            Submit a Priority Support Request
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            When automatic self-service reaches platform limits, our integration specialists assist with Meta account authorization, phone number coexistence, and webhook debugging.
          </p>
        </div>

        {/* Telemetry Transfer Callout */}
        {prefillErrorCode && (
          <div className="p-3.5 rounded-lg bg-canvas border border-line text-xs text-muted space-y-0.5">
            <p className="font-medium text-charcoal">
              Diagnostic Context Pre-filled ({prefillErrorCode})
            </p>
            <p className="text-[12px] leading-relaxed">
              Your error code, target phone number, and attempted diagnostic steps have been transferred automatically.
            </p>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-charcoal block">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Verma"
                className={`w-full p-2.5 text-xs bg-surface border rounded-md focus:outline-none focus:border-stone-400 text-charcoal ${
                  errors.fullName ? 'border-danger bg-rose-50/20' : 'border-line'
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-danger">{errors.fullName}</p>
              )}
            </div>

            {/* Business Name */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-charcoal block">
                Business / Brand Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. UrbanBoutique Store"
                className={`w-full p-2.5 text-xs bg-surface border rounded-md focus:outline-none focus:border-stone-400 text-charcoal ${
                  errors.businessName ? 'border-danger bg-rose-50/20' : 'border-line'
                }`}
              />
              {errors.businessName && (
                <p className="text-[11px] text-danger">{errors.businessName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Business Email */}
            <div className="space-y-1 sm:col-span-1">
              <label className="text-xs font-medium text-charcoal block">
                Work Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full p-2.5 text-xs bg-surface border rounded-md focus:outline-none focus:border-stone-400 text-charcoal ${
                  errors.email ? 'border-danger bg-rose-50/20' : 'border-line'
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-danger">{errors.email}</p>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="space-y-1 sm:col-span-1">
              <label className="text-xs font-medium text-charcoal block">
                Category <span className="text-danger">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 text-xs bg-surface border border-line rounded-md focus:outline-none focus:border-stone-400 text-charcoal cursor-pointer"
              >
                <option value="WhatsApp Connection">WhatsApp Connection &amp; Cloud API</option>
                <option value="Message Templates">Message Templates</option>
                <option value="Chatbot & Automation">Chatbot &amp; Triggers</option>
                <option value="Integrations">Integrations &amp; Webhooks</option>
                <option value="Message Delivery">Message Delivery &amp; Quality</option>
                <option value="Account & Billing">Account &amp; Billing</option>
              </select>
            </div>

            {/* Priority Selector */}
            <div className="space-y-1 sm:col-span-1">
              <label className="text-xs font-medium text-charcoal block">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full p-2.5 text-xs bg-surface border border-line rounded-md focus:outline-none focus:border-stone-400 text-charcoal cursor-pointer"
              >
                <option value="high">High — Blocking Setup</option>
                <option value="medium">Medium — Impaired</option>
                <option value="low">Low — General Question</option>
              </select>
            </div>
          </div>

          {/* Problem & Error Code & Resource */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="space-y-1 sm:col-span-1">
              <label className="text-xs font-medium text-charcoal block">
                Selected Problem
              </label>
              <input
                type="text"
                value={problemTitle || 'Registration Conflict'}
                onChange={(e) => setProblemTitle(e.target.value)}
                placeholder="Selected issue title"
                className="w-full p-2.5 text-xs bg-surface border border-line rounded-md focus:outline-none focus:border-stone-400 text-charcoal"
              />
            </div>

            <div className="space-y-1 sm:col-span-1">
              <label className="text-xs font-medium text-charcoal block">
                Issue / Error Code
              </label>
              <input
                type="text"
                value={errorCode || 'WABA-409'}
                onChange={(e) => setErrorCode(e.target.value)}
                placeholder="e.g. WABA-409"
                className="w-full p-2.5 text-xs font-mono bg-surface border border-line rounded-md focus:outline-none focus:border-stone-400 text-charcoal"
              />
            </div>

            <div className="space-y-1 sm:col-span-1">
              <label className="text-xs font-medium text-charcoal block">
                Target Business Phone
              </label>
              <input
                type="text"
                defaultValue="+1 (555) 019-2834"
                className="w-full p-2.5 text-xs font-mono bg-surface border border-line rounded-md focus:outline-none text-charcoal"
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-charcoal block">
                Problem Description <span className="text-danger">*</span>
              </label>
              <span className="text-[11px] text-subtle font-mono">
                {description.length} chars (min 15)
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Explain what occurred, what you expected, and any error message displayed..."
              className={`w-full p-3 text-xs bg-surface border rounded-md focus:outline-none focus:border-stone-400 text-charcoal leading-relaxed ${
                errors.description ? 'border-danger bg-rose-50/20' : 'border-line'
              }`}
            />
            {errors.description && (
              <p className="text-[11px] text-danger">{errors.description}</p>
            )}
          </div>

          {/* Attempted Troubleshooting Summary */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-charcoal flex items-center justify-between">
              <span>Attempted Troubleshooting Summary</span>
              <span className="text-[11px] text-subtle font-mono">Pre-filled</span>
            </label>
            <textarea
              value={troubleshootingSummary}
              onChange={(e) => setTroubleshootingSummary(e.target.value)}
              rows={3}
              placeholder="Summary of automatic troubleshooting steps tried..."
              className="w-full p-2.5 text-xs font-mono bg-canvas border border-line rounded-md focus:outline-none focus:border-stone-400 text-charcoal leading-relaxed"
            />
          </div>

          {/* Simulated File Attachments */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-charcoal block">
                Attachments &amp; Logs
              </label>
              <button
                type="button"
                onClick={handleSimulateAttachment}
                className="text-xs text-muted hover:text-charcoal font-medium flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>+ Attach Sample File</span>
              </button>
            </div>

            {attachedFiles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {attachedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-canvas border border-line text-xs text-charcoal"
                  >
                    <FileText className="w-3.5 h-3.5 text-subtle" />
                    <span className="text-[11px] font-mono">{file}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(file)}
                      className="text-subtle hover:text-danger ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                onClick={handleSimulateAttachment}
                className="border border-dashed border-line hover:border-stone-400 rounded-md p-3 text-center cursor-pointer transition-colors"
              >
                <p className="text-xs text-muted">
                  Click to attach a simulated screenshot or export log.
                </p>
              </div>
            )}
          </div>

          {/* Submit Row */}
          <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <Clock className="w-3.5 h-3.5 text-subtle stroke-[1.75]" />
              <span>Typical human response time: ~20 minutes</span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="px-3.5 py-2 rounded-md border border-line text-xs font-medium text-muted hover:text-charcoal hover:bg-canvas transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-initial px-5 py-2 rounded-md bg-[#6D45D9] hover:bg-[#5B35C8] text-white text-xs font-medium shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Support Ticket</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Reassuring & Professional Demo Confirmation Modal */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-surface rounded-xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-line space-y-5 animate-in fade-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-success flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5 stroke-[2]" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-medium text-charcoal bg-canvas px-2 py-0.5 rounded border border-line">
                  {submittedTicket.id}
                </span>
                <h2 className="text-lg font-semibold text-charcoal mt-2 tracking-tight">
                  Support Request Logged
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  Your ticket has been placed into the priority Tier 2 support queue.
                </p>
              </div>
            </div>

            {/* Prototype Notice Box */}
            <div className="p-3.5 rounded-lg bg-canvas border border-line text-xs text-muted space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-charcoal">
                <Info className="w-3.5 h-3.5 text-muted stroke-[1.75]" />
                <span>Prototype Demonstration Notice</span>
              </div>
              <p className="text-[12px] leading-relaxed">
                This is a <strong>frontend prototype</strong> built for the Product Intern assignment. No real external support ticket was created. The simulated ticket has been added to your local session history under <strong>"My Tickets"</strong>.
              </p>
            </div>

            {/* Summary */}
            <div className="p-3.5 rounded-lg bg-surface border border-line text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted">Contact:</span>
                <span className="font-medium text-charcoal">{submittedTicket.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Category:</span>
                <span className="font-medium text-charcoal">{submittedTicket.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Priority:</span>
                <span className="font-medium uppercase text-danger font-mono text-[10px]">
                  {submittedTicket.priority}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setSubmittedTicket(null);
                  onNavigate('my-tickets');
                }}
                className="w-full py-2 px-3 rounded-md bg-[#6D45D9] hover:bg-[#5B35C8] text-white text-xs font-medium shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>View Ticket in "My Tickets"</span>
              </button>

              <button
                onClick={() => {
                  setSubmittedTicket(null);
                  onNavigate('home');
                }}
                className="w-full py-2 px-3 rounded-md bg-surface hover:bg-canvas border border-line text-charcoal text-xs font-medium transition-colors cursor-pointer"
              >
                Return to Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
