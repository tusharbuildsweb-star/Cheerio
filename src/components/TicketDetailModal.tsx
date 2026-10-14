import React, { useState } from 'react';
import {
  X,
  Send,
  User,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bot,
  ExternalLink,
  Info,
} from 'lucide-react';
import { SupportTicket } from '../types';

interface TicketDetailModalProps {
  ticket: SupportTicket | null;
  onClose: () => void;
  onAddReply: (ticketId: string, replyText: string) => void;
}

export const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  ticket,
  onClose,
  onAddReply,
}) => {
  const [replyText, setReplyText] = useState('');

  if (!ticket) return null;

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onAddReply(ticket.id, replyText);
    setReplyText('');
  };

  const getStatusBadge = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-accent-subtle text-accent border border-accent-border">Open</span>;
      case 'in_progress':
        return <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-warning-subtle text-warning border border-warning-border">In Progress</span>;
      case 'waiting_on_meta':
        return <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-accent-subtle text-accent border border-accent-border">Waiting on Meta</span>;
      case 'resolved':
        return <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-success-subtle text-success border border-success-border">Resolved</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-danger-subtle text-danger border border-danger-border uppercase">High Priority</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-warning-subtle text-warning border border-warning-border uppercase">Medium</span>;
      case 'low':
        return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-canvas text-muted border border-line uppercase">Low</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] shadow-modal border border-line flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ticket Header */}
        <div className="px-6 py-4 border-b border-line bg-canvas flex items-start justify-between">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-medium text-accent bg-accent-subtle px-2 py-0.5 rounded-md border border-accent-border">
                {ticket.id}
              </span>
              {getStatusBadge(ticket.status)}
              {getPriorityBadge(ticket.priority)}
              <span className="text-xs text-subtle">
                Created: {new Date(ticket.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-lg font-display font-semibold text-charcoal">{ticket.subject}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-subtle hover:text-charcoal hover:bg-white rounded-xl transition-colors duration-150 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Assigned Agent & Diagnostic Context Info Bar */}
        <div className="px-6 py-3 bg-accent-subtle border-b border-accent-border flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            {ticket.assignedAgent ? (
              <>
                <img
                  src={ticket.assignedAgent.avatar}
                  alt={ticket.assignedAgent.name}
                  className="w-7 h-7 rounded-full object-cover border border-accent-border"
                />
                <div>
                  <span className="font-medium text-charcoal">{ticket.assignedAgent.name}</span>
                  <span className="text-muted ml-1.5">({ticket.assignedAgent.role})</span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1.5 text-muted">
                <Clock className="w-3.5 h-3.5 text-warning" />
                <span>Assigned to Cheerio Priority Queue (ETA &lt;25 mins)</span>
              </div>
            )}
          </div>

          {ticket.errorCode && (
            <div className="flex items-center gap-1.5 bg-danger-subtle text-danger px-2.5 py-1 rounded-md border border-danger-border font-mono text-[11px] font-medium">
              <ShieldAlert className="w-3 h-3" />
              <span>Error: {ticket.errorCode}</span>
            </div>
          )}
        </div>

        {/* Diagnostic Summary if available */}
        {ticket.troubleshootingSummary && (
          <div className="px-6 py-2.5 bg-canvas border-b border-line text-xs text-muted">
            <span className="font-medium text-charcoal">Diagnostic Telemetry: </span>
            {ticket.troubleshootingSummary}
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-canvas/50">
          {ticket.messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSystem = msg.sender === 'system';

            if (isSystem) {
              return (
                <div
                  key={msg.id}
                  className="my-3 mx-auto max-w-lg p-3 rounded-xl bg-accent-subtle border border-accent-border text-xs text-accent flex items-start gap-2.5"
                >
                  <Bot className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">{msg.senderName}: </span>
                    <span>{msg.content}</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-medium ${
                    isUser
                      ? 'bg-accent text-white'
                      : 'bg-charcoal text-white'
                  }`}
                >
                  {isUser ? 'RV' : 'CH'}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs space-y-1 shadow-xs ${
                    isUser
                      ? 'bg-accent text-white rounded-tr-sm'
                      : 'bg-white border border-line text-charcoal rounded-tl-sm'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between gap-4 text-[11px] ${
                      isUser ? 'text-white/70' : 'text-subtle'
                    }`}
                  >
                    <span className="font-medium">{msg.senderName}</span>
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prototype notice pill */}
        <div className="px-6 py-2 bg-canvas border-t border-line flex items-center justify-between text-[11px] text-muted">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-accent" />
            <span>Interactive prototype: replies are saved locally to this demo session.</span>
          </div>
          <span>Status: {ticket.status.replace('_', ' ').toUpperCase()}</span>
        </div>

        {/* Reply Box */}
        <form onSubmit={handleSubmitReply} className="p-4 bg-white border-t border-line flex gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type a simulated reply to the support team..."
            className="flex-1 px-4 py-2 text-xs bg-canvas border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent text-charcoal transition-all duration-150"
          />
          <button
            type="submit"
            disabled={!replyText.trim()}
            className="px-4 py-2 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white text-xs font-medium rounded-xl transition-colors duration-150 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Reply</span>
          </button>
        </form>
      </div>
    </div>
  );
};
