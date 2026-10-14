import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown, BookOpen, Clock, Tag, Sparkles, AlertCircle, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { HelpArticle, PageId } from '../types';

interface ArticleModalProps {
  article: HelpArticle | null;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onNavigate }) => {
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] shadow-modal border border-line flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-line flex items-start justify-between bg-canvas">
          <div className="space-y-1.5 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent-subtle text-accent border border-accent-border">
                {article.category}
              </span>
              <span className="text-xs text-subtle flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span className="text-xs text-subtle">• Updated {article.updatedAt}</span>
            </div>
            <h2 className="text-lg font-display font-semibold text-charcoal leading-snug">{article.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-subtle hover:text-charcoal hover:bg-canvas rounded-xl transition-colors duration-150 cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6 overflow-y-auto space-y-6 text-sm text-muted leading-relaxed">
          {/* Summary Callout */}
          <div className="p-4 rounded-xl bg-accent-subtle border border-accent-border text-accent text-sm font-medium">
            💡 {article.summary}
          </div>

          {/* Sections */}
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-base font-semibold text-charcoal border-b border-line pb-1.5">
                {section.heading}
              </h3>
              <div className="space-y-2">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.callout && (
                <div
                  className={`p-3.5 rounded-xl border flex items-start gap-3 mt-3 ${
                    section.callout.type === 'warning'
                      ? 'bg-warning-subtle border-warning-border text-warning'
                      : section.callout.type === 'tip'
                      ? 'bg-success-subtle border-success-border text-success'
                      : 'bg-accent-subtle border-accent-border text-accent'
                  }`}
                >
                  {section.callout.type === 'warning' && (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  {section.callout.type === 'tip' && (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  {section.callout.type === 'info' && (
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <p className="text-xs leading-relaxed font-medium">{section.callout.text}</p>
                </div>
              )}
            </div>
          ))}

          {/* Tags */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-subtle mr-1" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-lg bg-canvas text-muted font-medium border border-line"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Feedback Section */}
          <div className="p-4 rounded-xl bg-canvas border border-line flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-xs font-medium text-charcoal">Was this article helpful?</p>
              <p className="text-[11px] text-subtle">
                {article.helpfulCount + (voted === 'yes' ? 1 : 0)} people found this article useful
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoted('yes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                  voted === 'yes'
                    ? 'bg-success text-white'
                    : 'bg-white border border-line text-charcoal hover:border-success-border'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Yes, solved my problem</span>
              </button>
              <button
                onClick={() => setVoted('no')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                  voted === 'no'
                    ? 'bg-warning text-white'
                    : 'bg-white border border-line text-charcoal hover:border-warning-border'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>No</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-canvas border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">Still facing difficulties with your Cheerio setup?</p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onNavigate('whatsapp-assistant');
              }}
              className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-medium shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors duration-150"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Setup Assistant</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-line text-charcoal hover:bg-canvas text-xs font-medium cursor-pointer transition-colors duration-150"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
