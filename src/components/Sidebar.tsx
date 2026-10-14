import React from 'react';
import {
  LifeBuoy,
  MessageSquare,
  BookOpen,
  Ticket,
  HeadphonesIcon,
  Layers,
  FileCode2,
  Bot,
  CheckCheck,
  ChevronRight,
  X,
  ChevronDown,
} from 'lucide-react';
import { PageId } from '../types';

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  ticketCount: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  ticketCount,
  mobileOpen,
  onCloseMobile,
}) => {
  const mainNav = [
    {
      id: 'home' as PageId,
      label: 'Support Home',
      icon: LifeBuoy,
    },
    {
      id: 'whatsapp-assistant' as PageId,
      label: 'WhatsApp Assistant',
      icon: MessageSquare,
      badge: 'Core Flow',
      badgeStyle: 'bg-[#F5F3FF] text-[#6D45D9] border-[#DDD6FE]',
    },
    {
      id: 'help-center' as PageId,
      label: 'Help Center',
      icon: BookOpen,
    },
    {
      id: 'my-tickets' as PageId,
      label: 'My Tickets',
      icon: Ticket,
      badge: ticketCount > 0 ? `${ticketCount}` : undefined,
      badgeStyle: 'bg-stone-100 text-charcoal border-stone-200',
    },
    {
      id: 'human-support' as PageId,
      label: 'Human Support',
      icon: HeadphonesIcon,
    },
  ];

  const diagnosticTools = [
    {
      id: 'template-assistant' as PageId,
      label: 'Message Templates',
      icon: FileCode2,
    },
    {
      id: 'chatbot-assistant' as PageId,
      label: 'Chatbot & Triggers',
      icon: Bot,
    },
    {
      id: 'integration-assistant' as PageId,
      label: 'Integrations & Sync',
      icon: Layers,
    },
    {
      id: 'delivery-assistant' as PageId,
      label: 'Delivery & Quality',
      icon: CheckCheck,
    },
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    onCloseMobile();
  };

  const isWhatsAppActive =
    activePage === 'whatsapp-assistant' ||
    activePage === 'whatsapp-diagnosis' ||
    activePage === 'whatsapp-success' ||
    activePage === 'whatsapp-failure';

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-stone-900/20 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-surface border-r border-line z-50 flex flex-col transition-transform duration-200 ease-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 px-5 border-b border-line flex items-center justify-between">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            {/* Minimalist, classy monogram mark */}
            <div className="w-6 h-6 rounded-md bg-charcoal text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-xs">
              <span className="text-[13px] font-semibold tracking-tighter">c</span>
              <span className="w-1 h-1 rounded-full bg-[#6D45D9] -ml-0.5 mt-1" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-sm text-charcoal tracking-tight">cheerio</span>
              <span className="text-[11px] font-mono text-muted tracking-tight">assistant</span>
            </div>
          </button>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-muted hover:text-charcoal hover:bg-canvas lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace Selector — Subtle & Compact */}
        <div className="p-3">
          <div className="bg-canvas border border-line rounded-lg p-2.5 flex items-center justify-between hover:border-stone-300 transition-colors">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded bg-stone-200 text-charcoal text-[11px] font-semibold flex items-center justify-center shrink-0">
                UB
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-charcoal truncate">UrbanBoutique</p>
                <p className="text-[10px] text-muted truncate">Growth • WABA-8829</p>
              </div>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" title="System Operational" />
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-2.5 py-1 space-y-5">
          {/* Main Navigation */}
          <div>
            <p className="px-2.5 text-[10px] font-mono font-medium text-subtle uppercase tracking-wider mb-1.5">
              Portal
            </p>
            <nav className="space-y-0.5">
              {mainNav.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.id === 'whatsapp-assistant' ? isWhatsAppActive : activePage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all group cursor-pointer relative ${
                      isActive
                        ? 'bg-[#F5F3FF] text-[#6D45D9] font-semibold'
                        : 'text-muted hover:text-charcoal hover:bg-stone-100/70'
                    }`}
                  >
                    {/* Active accent bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-[#6D45D9]" />
                    )}

                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 stroke-[1.75] ${
                          isActive ? 'text-[#6D45D9]' : 'text-subtle group-hover:text-charcoal'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-medium font-mono px-1.5 py-0.2 rounded border ${item.badgeStyle}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Diagnostic Assistants */}
          <div>
            <p className="px-2.5 text-[10px] font-mono font-medium text-subtle uppercase tracking-wider mb-1.5">
              Diagnostic Tools
            </p>
            <nav className="space-y-0.5">
              {diagnosticTools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activePage === tool.id;

                return (
                  <button
                    key={tool.id}
                    onClick={() => handleNavClick(tool.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all group cursor-pointer relative ${
                      isActive
                        ? 'bg-[#F5F3FF] text-[#6D45D9] font-semibold'
                        : 'text-muted hover:text-charcoal hover:bg-stone-100/70'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-[#6D45D9]" />
                    )}

                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 stroke-[1.75] ${
                          isActive ? 'text-[#6D45D9]' : 'text-subtle group-hover:text-charcoal'
                        }`}
                      />
                      <span className="truncate">{tool.label}</span>
                    </div>

                    <ChevronRight
                      className={`w-3 h-3 text-stone-300 transition-transform ${
                        isActive ? 'text-[#6D45D9] translate-x-0.5' : 'group-hover:text-subtle'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer — User & Operational Status */}
        <div className="p-3 border-t border-line bg-surface">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-stone-100 border border-line text-[11px] font-medium text-charcoal flex items-center justify-center shrink-0">
                RV
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-charcoal truncate">Rahul Verma</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-[10px] text-muted">All Systems Normal</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('human-support')}
              className="p-1.5 text-muted hover:text-charcoal rounded hover:bg-canvas transition-colors cursor-pointer"
              title="Need Human Help?"
              aria-label="Need Human Help?"
            >
              <HeadphonesIcon className="w-3.5 h-3.5 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
