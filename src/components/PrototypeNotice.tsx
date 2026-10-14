import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, ArrowRight, ChevronRight, X, SlidersHorizontal } from 'lucide-react';
import { PageId } from '../types';

interface PrototypeNoticeProps {
  onNavigate: (page: PageId) => void;
  onReset: () => void;
  activePage: PageId;
}

export const PrototypeNotice: React.FC<PrototypeNoticeProps> = ({
  onNavigate,
  onReset,
  activePage,
}) => {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <div className="bg-surface border-b border-line px-4 py-1.5 text-xs flex items-center justify-between text-muted z-30 relative">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-charcoal font-medium">
            Demo Sandbox
          </span>
          <span className="text-[11px] text-muted hidden sm:inline">• Simulated environment for Product Intern review</span>
        </div>
        <button
          onClick={() => setMinimized(false)}
          className="text-[11px] text-charcoal hover:text-accent font-medium transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>Show Test Controls</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Prototype controls banner" className="bg-surface border-b border-line text-xs py-2 px-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] relative z-30 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider uppercase bg-[#F5F3FF] text-[#6D45D9] border border-[#DDD6FE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6D45D9]" />
            Prototype
          </span>
          <p className="text-[12px] text-muted">
            <span className="font-medium text-charcoal">Cheerio Setup Assistant</span> — Frontend interactive preview. No real Meta APIs or external billing charged.
          </p>
        </div>

        {/* Quiet Luxury Quick Test Paths */}
        <div className="flex flex-wrap items-center gap-1.5 self-stretch md:self-auto justify-end">
          <span className="text-[11px] font-medium text-subtle hidden lg:inline mr-1">
            Jump to scenario:
          </span>

          <button
            onClick={() => onNavigate('whatsapp-assistant')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
              activePage === 'whatsapp-assistant' || activePage === 'whatsapp-diagnosis'
                ? 'bg-charcoal text-white'
                : 'bg-canvas border border-line text-charcoal hover:border-subtle'
            }`}
            title="Start the guided WhatsApp troubleshooting flow"
          >
            <span>WhatsApp Flow</span>
            <ArrowRight className="w-3 h-3 opacity-60" />
          </button>

          <button
            onClick={() => onNavigate('whatsapp-success')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
              activePage === 'whatsapp-success'
                ? 'bg-charcoal text-white'
                : 'bg-canvas border border-line text-charcoal hover:border-subtle'
            }`}
            title="Jump directly to the simulated Connected success screen"
          >
            <CheckCircle2 className="w-3 h-3 text-success" />
            <span>Success</span>
          </button>

          <button
            onClick={() => onNavigate('whatsapp-failure')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
              activePage === 'whatsapp-failure'
                ? 'bg-charcoal text-white'
                : 'bg-canvas border border-line text-charcoal hover:border-subtle'
            }`}
            title="Jump to the persistent failure screen with human escalation"
          >
            <AlertTriangle className="w-3 h-3 text-warning" />
            <span>Failure</span>
          </button>

          <button
            onClick={() => onNavigate('my-tickets')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              activePage === 'my-tickets'
                ? 'bg-charcoal text-white'
                : 'bg-canvas border border-line text-charcoal hover:border-subtle'
            }`}
            title="View tickets created during this demo session"
          >
            Tickets
          </button>

          <button
            onClick={onReset}
            className="px-2 py-1 rounded-md text-[11px] font-medium text-muted hover:text-charcoal border border-transparent hover:border-line transition-all flex items-center gap-1 cursor-pointer ml-1"
            title="Reset prototype state to initial values"
          >
            <RefreshCw className="w-3 h-3 opacity-70" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setMinimized(true)}
            className="p-1 text-subtle hover:text-charcoal rounded transition-colors cursor-pointer"
            title="Minimize banner"
            aria-label="Minimize prototype banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
