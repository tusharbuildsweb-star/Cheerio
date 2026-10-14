import React, { useState } from 'react';
import {
  Ticket,
  Search,
  Filter,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  HeadphonesIcon,
  Plus,
  ArrowLeft,
  MessageSquare,
  ShieldAlert,
} from 'lucide-react';
import { PageId, SupportTicket } from '../types';

interface MySupportTicketsProps {
  tickets: SupportTicket[];
  onNavigate: (page: PageId) => void;
  onSelectTicket: (ticket: SupportTicket) => void;
}

export const MySupportTickets: React.FC<MySupportTicketsProps> = ({
  tickets,
  onNavigate,
  onSelectTicket,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTickets = tickets.filter((t) => {
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'active'
        ? t.status === 'open' || t.status === 'in_progress' || t.status === 'waiting_on_meta'
        : t.status === filterStatus;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesStatus;

    return (
      matchesStatus &&
      (t.id.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.errorCode && t.errorCode.toLowerCase().includes(q)))
    );
  });

  const getStatusBadge = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-accent-subtle text-accent border border-accent-border">
            Open (In Queue)
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-warning-subtle text-warning border border-warning-border">
            In Progress
          </span>
        );
      case 'waiting_on_meta':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-accent-subtle text-accent border border-accent-border">
            Waiting on Meta
          </span>
        );
      case 'resolved':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-success-subtle text-success border border-success-border">
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-danger-subtle text-danger border border-danger-border uppercase">
            High Priority
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-warning-subtle text-warning border border-warning-border uppercase">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-canvas text-muted border border-line uppercase">
            Low
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-charcoal transition-colors duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Support Home</span>
        </button>

        <button
          onClick={() => onNavigate('human-support')}
          className="px-3.5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-medium shadow-xs flex items-center gap-1.5 transition-colors duration-150 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Support Request</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-line shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-accent-subtle text-accent text-xs font-medium border border-accent-border mb-2">
              <Ticket className="w-3.5 h-3.5" />
              <span>Session Ticket History</span>
            </div>
            <h1 className="text-xl font-display font-semibold text-charcoal">My Support Tickets</h1>
            <p className="text-sm text-muted mt-0.5">
              Track requests submitted during this demo session and view simulated agent communications.
            </p>
          </div>

          <div className="p-3 bg-accent-subtle rounded-xl border border-accent-border text-right">
            <span className="text-[11px] font-medium text-accent uppercase">Total Tickets</span>
            <p className="text-xl font-semibold text-accent">{tickets.length}</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-subtle absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ticket ID (e.g. CHE-78219), subject, or error code..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-canvas border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent text-charcoal transition-all duration-150"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All' },
              { id: 'active', label: 'Active' },
              { id: 'resolved', label: 'Resolved' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer ${
                  filterStatus === f.id
                    ? 'bg-accent text-white'
                    : 'bg-canvas text-muted border border-line hover:border-accent-border'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-3">
          {filteredTickets.length === 0 ? (
            <div className="p-10 text-center border border-dashed border-line rounded-2xl space-y-2">
              <Ticket className="w-8 h-8 text-subtle mx-auto" />
              <p className="text-sm font-medium text-charcoal">No support tickets match this filter</p>
              <p className="text-xs text-muted">
                Tickets you submit via the Human Support form will automatically appear here.
              </p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className="group p-5 rounded-2xl border border-line hover:border-accent-border hover:shadow-sm transition-all duration-150 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-medium text-accent bg-accent-subtle px-2 py-0.5 rounded-md border border-accent-border">
                      {ticket.id}
                    </span>
                    {getStatusBadge(ticket.status)}
                    {getPriorityBadge(ticket.priority)}
                    {ticket.errorCode && (
                      <span className="font-mono text-[11px] font-medium text-danger bg-danger-subtle px-2 py-0.5 rounded-md border border-danger-border">
                        {ticket.errorCode}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-charcoal group-hover:text-accent transition-colors duration-150">
                    {ticket.subject}
                  </h3>

                  <p className="text-xs text-muted line-clamp-1 leading-relaxed">
                    {ticket.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-subtle pt-1">
                    <span>Category: {ticket.category}</span>
                    <span>•</span>
                    <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {ticket.messages.length} message{ticket.messages.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Right: Assigned Agent & Open Thread */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  {ticket.assignedAgent ? (
                    <div className="flex items-center gap-2 text-right hidden sm:flex">
                      <div className="text-right">
                        <p className="text-xs font-medium text-charcoal">
                          {ticket.assignedAgent.name}
                        </p>
                        <p className="text-[10px] text-subtle">{ticket.assignedAgent.role}</p>
                      </div>
                      <img
                        src={ticket.assignedAgent.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border border-accent-border"
                      />
                    </div>
                  ) : (
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-medium text-muted">Cheerio Priority Pool</p>
                      <p className="text-[10px] text-subtle">&lt;25m ETA</p>
                    </div>
                  )}

                  <div className="p-2 rounded-xl bg-canvas group-hover:bg-accent group-hover:text-white transition-colors duration-150 text-muted">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
