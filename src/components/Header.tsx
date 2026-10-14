import React from 'react';
import {
  Menu,
  Search,
  ChevronRight,
  HeadphonesIcon,
  Ticket,
} from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onToggleMobile: () => void;
  ticketCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onToggleMobile,
  ticketCount,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  const getBreadcrumbs = () => {
    switch (activePage) {
      case 'home':
        return [{ label: 'Cheerio', page: 'home' as PageId }, { label: 'Resolution Portal' }];
      case 'whatsapp-assistant':
        return [
          { label: 'Portal', page: 'home' as PageId },
          { label: 'WhatsApp Setup' },
        ];
      case 'whatsapp-diagnosis':
        return [
          { label: 'Portal', page: 'home' as PageId },
          { label: 'WhatsApp Setup', page: 'whatsapp-assistant' as PageId },
          { label: 'Diagnostic Review' },
        ];
      case 'whatsapp-success':
        return [
          { label: 'Portal', page: 'home' as PageId },
          { label: 'WhatsApp Setup', page: 'whatsapp-assistant' as PageId },
          { label: 'Verification' },
        ];
      case 'whatsapp-failure':
        return [
          { label: 'Portal', page: 'home' as PageId },
          { label: 'WhatsApp Setup', page: 'whatsapp-assistant' as PageId },
          { label: 'Assisted Escalation' },
        ];
      case 'human-support':
        return [
          { label: 'Portal', page: 'home' as PageId },
          { label: 'Priority Support' },
        ];
      case 'help-center':
        return [
          { label: 'Portal', page: 'home' as PageId },
          { label: 'Help Center' },
        ];
      case 'my-tickets':
        return [
          { label: 'Portal', page: 'home' as PageId },
          { label: 'Ticket History' },
        ];
      case 'template-assistant':
        return [
          { label: 'Portal', page: 'home' as PageId },
          { label: 'Template Validator' },
        ];
      case 'chatbot-assistant':
        return [
          { label: 'Portal', page: 'home' as PageId },
          { label: 'Chatbot Sandbox' },
        ];
      case 'integration-assistant':
        return [
          { label: 'Portal', page: 'home' as PageId },
          { label: 'Integrations Sync' },
        ];
      case 'delivery-assistant':
        return [
          { label: 'Portal', page: 'home' as PageId },
          { label: 'Delivery Quality' },
        ];
      default:
        return [{ label: 'Resolution Portal' }];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-line px-4 sm:px-6 h-14 flex items-center">
      <div className="w-full flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Clean Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleMobile}
            className="p-1.5 -ml-1 rounded-md text-muted hover:text-charcoal hover:bg-canvas lg:hidden cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            <Menu className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* Quiet Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-muted overflow-hidden whitespace-nowrap">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-subtle shrink-0" />}
                  {crumb.page ? (
                    <button
                      onClick={() => onNavigate(crumb.page!)}
                      className="hover:text-charcoal transition-colors font-normal truncate cursor-pointer"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className={`truncate ${isLast ? 'text-charcoal font-medium' : ''}`}>
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Right: Command Search & Discreet Actions */}
        <div className="flex items-center gap-2.5">
          {/* Linear / Stripe style search bar */}
          <div className="relative hidden md:block w-64 lg:w-72">
            <Search className="w-3.5 h-3.5 text-subtle absolute left-2.5 top-1/2 -translate-y-1/2 stroke-[1.75]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search guides, errors (WABA-409)..."
              className="w-full pl-8 pr-12 py-1.5 text-xs bg-canvas border border-line rounded-md focus:outline-none focus:border-stone-400 focus:bg-white text-charcoal placeholder-subtle transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-subtle hover:text-charcoal text-[11px] p-0.5"
              >
                ✕
              </button>
            ) : (
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-subtle px-1 py-0.2 bg-stone-100 border border-line rounded">
                /
              </kbd>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('my-tickets')}
              className="relative p-1.5 rounded-md text-muted hover:text-charcoal hover:bg-canvas transition-colors cursor-pointer"
              title="Ticket History"
              aria-label="Ticket History"
            >
              <Ticket className="w-4 h-4 stroke-[1.75]" />
              {ticketCount > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 w-1.5 h-1.5 bg-[#6D45D9] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('human-support')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-surface border border-line text-xs font-medium text-charcoal hover:bg-canvas hover:border-stone-300 transition-all cursor-pointer shadow-xs"
            >
              <HeadphonesIcon className="w-3.5 h-3.5 text-muted stroke-[1.75]" />
              <span className="hidden sm:inline">Contact Support</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
