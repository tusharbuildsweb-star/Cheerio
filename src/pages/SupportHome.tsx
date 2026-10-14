import React, { useState } from 'react';
import {
  Search,
  MessageSquare,
  FileCode2,
  Bot,
  Layers,
  CheckCheck,
  ArrowRight,
  ArrowUpRight,
  HeadphonesIcon,
  ShieldCheck,
  Clock,
  ChevronRight,
  BookOpen,
  LifeBuoy,
  Zap,
} from 'lucide-react';
import { PageId, SupportTicket } from '../types';
import { PROBLEM_CARDS, HELP_ARTICLES } from '../data/sampleData';

interface SupportHomeProps {
  onNavigate: (page: PageId) => void;
  onSelectArticle: (articleId: string) => void;
  recentTickets: SupportTicket[];
}

export const SupportHome: React.FC<SupportHomeProps> = ({
  onNavigate,
  onSelectArticle,
  recentTickets,
}) => {
  const [localSearch, setLocalSearch] = useState('');

  const filteredCards = PROBLEM_CARDS.filter(
    (card) =>
      card.title.toLowerCase().includes(localSearch.toLowerCase()) ||
      card.description.toLowerCase().includes(localSearch.toLowerCase())
  );

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquareShare':
        return <MessageSquare className="w-4 h-4 text-charcoal stroke-[1.75]" />;
      case 'FileCode2':
        return <FileCode2 className="w-4 h-4 text-charcoal stroke-[1.75]" />;
      case 'Bot':
        return <Bot className="w-4 h-4 text-charcoal stroke-[1.75]" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-charcoal stroke-[1.75]" />;
      case 'CheckCheck':
        return <CheckCheck className="w-4 h-4 text-charcoal stroke-[1.75]" />;
      default:
        return <LifeBuoy className="w-4 h-4 text-charcoal stroke-[1.75]" />;
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12">
      {/* Editorial Page Header & Command Search */}
      <div className="pt-2 text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight">
          How can we help you today?
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Resolve phone connection conflicts, template rejections, and integration sync issues with self-guided diagnostic tools.
        </p>

        {/* Command Search Component */}
        <div className="pt-3 max-w-xl mx-auto">
          <div className="relative group">
            <Search className="w-4 h-4 text-subtle absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.75]" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search by issue or error code (e.g. WABA-409, templates, shopify)..."
              className="w-full pl-10 pr-16 py-2.5 bg-surface text-xs sm:text-sm text-charcoal placeholder-subtle rounded-lg border border-line shadow-xs focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400/20 transition-all"
            />
            {localSearch ? (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-subtle hover:text-charcoal font-medium"
              >
                Clear
              </button>
            ) : (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-subtle px-1.5 py-0.5 bg-canvas border border-line rounded">
                ⌘K
              </span>
            )}
          </div>

          {/* Discreet Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5 text-xs text-muted">
            <span className="text-[11px] text-subtle">Suggested:</span>
            {['WABA-409', 'Template Rejection', 'Shopify Sync', 'Chatbot Loop'].map((chip) => (
              <button
                key={chip}
                onClick={() => setLocalSearch(chip === 'WABA-409' ? 'WABA-409' : chip)}
                className="px-2 py-0.5 rounded text-[11px] bg-surface border border-line text-muted hover:text-charcoal hover:border-stone-300 transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary 5 Category Cards */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-muted">
            Diagnostic Assistants
          </h2>
          <span className="text-xs text-subtle">
            {filteredCards.length} {filteredCards.length === 1 ? 'category' : 'categories'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredCards.map((card) => {
            const isWhatsApp = card.id === 'whatsapp-assistant';

            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`group bg-surface rounded-xl p-4 border transition-all duration-150 cursor-pointer flex flex-col justify-between hover:border-stone-400 hover:shadow-xs relative ${
                  isWhatsApp ? 'border-line ring-1 ring-[#6D45D9]/10' : 'border-line'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {/* Quiet Luxury Icon Container */}
                    <div className="w-8 h-8 rounded-md bg-canvas border border-line flex items-center justify-center transition-colors group-hover:border-stone-300">
                      {getCardIcon(card.iconName)}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isWhatsApp && (
                        <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#F5F3FF] text-[#6D45D9] border border-[#DDD6FE]">
                          Core Setup
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-muted bg-canvas px-1.5 py-0.5 rounded border border-line">
                        {card.badge}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-charcoal group-hover:text-[#6D45D9] transition-colors flex items-center justify-between">
                      <span>{card.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-subtle group-hover:text-[#6D45D9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </h3>
                    <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 mt-3 border-t border-line/80 flex items-center justify-between text-[11px] text-subtle">
                  <span>~{card.estimatedTime} resolution</span>
                  <span className="font-mono text-muted">{card.automatedRate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compact, Elegant Human Support Banner */}
      <div className="bg-surface border border-line rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-md bg-canvas border border-line flex items-center justify-center shrink-0 mt-0.5">
            <HeadphonesIcon className="w-4 h-4 text-charcoal stroke-[1.75]" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-charcoal">
              Cannot find the right diagnostic?
            </h3>
            <p className="text-xs text-muted mt-0.5 leading-relaxed">
              If your issue involves Meta business verification documents, payment disputes, or custom webhook architecture, our Tier 2 engineers can step in directly.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('human-support')}
          className="px-3.5 py-2 rounded-md bg-charcoal hover:bg-stone-800 text-white text-xs font-medium transition-colors shrink-0 cursor-pointer shadow-xs"
        >
          Contact Support Team
        </button>
      </div>

      {/* Restrained Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-line py-5">
        <div className="space-y-0.5 px-2">
          <span className="text-[11px] font-mono text-subtle uppercase tracking-wider">
            Resolution Rate
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-charcoal tracking-tight">87.4%</span>
            <span className="text-[11px] text-success font-medium">Self-service</span>
          </div>
          <p className="text-[11px] text-muted">Fixed without queuing human tickets</p>
        </div>

        <div className="space-y-0.5 px-2 border-t sm:border-t-0 sm:border-l border-line pt-3 sm:pt-0">
          <span className="text-[11px] font-mono text-subtle uppercase tracking-wider">
            Median Resolution
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-charcoal tracking-tight">2.1 min</span>
            <span className="text-[11px] text-muted">vs 4h queue</span>
          </div>
          <p className="text-[11px] text-muted">Instant telemetry diagnostics</p>
        </div>

        <div className="space-y-0.5 px-2 border-t sm:border-t-0 sm:border-l border-line pt-3 sm:pt-0">
          <span className="text-[11px] font-mono text-subtle uppercase tracking-wider">
            Security Guarantee
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-charcoal tracking-tight">Zero Secrets</span>
            <span className="text-[11px] text-success font-medium">Safe</span>
          </div>
          <p className="text-[11px] text-muted">No OTPs, tokens, or passwords requested</p>
        </div>
      </div>

      {/* Two-Column Bottom Grid: Documentation & Recent Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1">
        {/* Knowledge Articles */}
        <div className="bg-surface rounded-xl p-4 border border-line space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-line">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-muted stroke-[1.75]" />
              <h3 className="text-xs font-semibold text-charcoal">Recommended Guides</h3>
            </div>
            <button
              onClick={() => onNavigate('help-center')}
              className="text-xs text-muted hover:text-charcoal transition-colors flex items-center gap-0.5 cursor-pointer"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5 text-subtle" />
            </button>
          </div>

          <div className="space-y-1.5">
            {HELP_ARTICLES.slice(0, 3).map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art.id)}
                className="p-2.5 rounded-lg hover:bg-canvas transition-colors cursor-pointer group flex items-start justify-between gap-2 border border-transparent hover:border-line"
              >
                <div className="min-w-0 space-y-0.5">
                  <h4 className="text-xs font-medium text-charcoal group-hover:text-[#6D45D9] transition-colors truncate">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-muted truncate">{art.summary}</p>
                </div>
                <span className="text-[10px] font-mono text-subtle shrink-0 pt-0.5">
                  {art.readTime}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Session Tickets */}
        <div className="bg-surface rounded-xl p-4 border border-line space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-line">
            <div className="flex items-center gap-2">
              <LifeBuoy className="w-3.5 h-3.5 text-muted stroke-[1.75]" />
              <h3 className="text-xs font-semibold text-charcoal">Recent Ticket Activity</h3>
            </div>
            <button
              onClick={() => onNavigate('my-tickets')}
              className="text-xs text-muted hover:text-charcoal transition-colors flex items-center gap-0.5 cursor-pointer"
            >
              <span>History ({recentTickets.length})</span>
              <ChevronRight className="w-3.5 h-3.5 text-subtle" />
            </button>
          </div>

          <div className="space-y-1.5">
            {recentTickets.length === 0 ? (
              <p className="text-xs text-subtle py-6 text-center">
                No tickets opened during this session.
              </p>
            ) : (
              recentTickets.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  onClick={() => onNavigate('my-tickets')}
                  className="p-2.5 rounded-lg hover:bg-canvas transition-colors cursor-pointer group flex items-center justify-between gap-3 border border-transparent hover:border-line"
                >
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted">{t.id}</span>
                      <span
                        className={`text-[9px] font-mono font-medium uppercase px-1.5 py-0.2 rounded ${
                          t.status === 'resolved'
                            ? 'bg-emerald-50 text-success'
                            : t.status === 'in_progress'
                            ? 'bg-amber-50 text-warning'
                            : 'bg-stone-100 text-charcoal'
                        }`}
                      >
                        {t.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-charcoal truncate group-hover:text-[#6D45D9] transition-colors">
                      {t.subject}
                    </p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-charcoal shrink-0 transition-colors" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
