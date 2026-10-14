import React, { useState, useEffect } from 'react';
import { PageId, WhatsAppSymptom, SupportTicket, HelpArticle } from './types';
import { WHATSAPP_SYMPTOMS, INITIAL_TICKETS, HELP_ARTICLES } from './data/sampleData';

// Components
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PrototypeNotice } from './components/PrototypeNotice';
import { ArticleModal } from './components/ArticleModal';
import { TicketDetailModal } from './components/TicketDetailModal';

// Pages
import { SupportHome } from './pages/SupportHome';
import { WhatsAppAssistant } from './pages/WhatsAppAssistant';
import { DiagnosisScreen } from './pages/DiagnosisScreen';
import { SuccessScreen } from './pages/SuccessScreen';
import { PersistentFailureScreen } from './pages/PersistentFailureScreen';
import { HumanSupportForm } from './pages/HumanSupportForm';
import { HelpCenter } from './pages/HelpCenter';
import { MySupportTickets } from './pages/MySupportTickets';
import { TemplateAssistant } from './pages/TemplateAssistant';
import { ChatbotAssistant } from './pages/ChatbotAssistant';
import { IntegrationAssistant } from './pages/IntegrationAssistant';
import { DeliveryAssistant } from './pages/DeliveryAssistant';

export function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedSymptom, setSelectedSymptom] = useState<WhatsAppSymptom>(WHATSAPP_SYMPTOMS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Tickets session state with LocalStorage persistence
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem('cheerio_prototype_tickets');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return INITIAL_TICKETS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('cheerio_prototype_tickets', JSON.stringify(tickets));
    } catch (e) {
      // Ignore storage errors in demo
    }
  }, [tickets]);

  // Modals state
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // Prefill state for Human Support Form
  const [prefillSupport, setPrefillSupport] = useState<{
    summary: string;
    errorCode: string;
    category: string;
    problemTitle: string;
  }>({
    summary: '',
    errorCode: '',
    category: 'WhatsApp Connection',
    problemTitle: '',
  });

  const activeArticle = HELP_ARTICLES.find((a) => a.id === selectedArticleId) || null;

  // Navigation handlers
  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartDiagnosis = () => {
    setActivePage('whatsapp-diagnosis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulateSuccess = () => {
    setActivePage('whatsapp-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulateFailure = () => {
    setActivePage('whatsapp-failure');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setSelectedSymptom(WHATSAPP_SYMPTOMS[0]);
    setActivePage('whatsapp-assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEscalateToHuman = (
    summary: string,
    errorCode: string,
    category = 'WhatsApp Connection',
    problemTitle = ''
  ) => {
    setPrefillSupport({ summary, errorCode, category, problemTitle });
    setActivePage('human-support');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitTicket = (newTicket: SupportTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  const handleAddReply = (ticketId: string, replyContent: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const updatedMessages = [
            ...t.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'user' as const,
              senderName: 'Rahul Verma',
              timestamp: new Date().toISOString(),
              content: replyContent,
            },
          ];
          const updatedTicket: SupportTicket = {
            ...t,
            updatedAt: new Date().toISOString(),
            messages: updatedMessages,
          };
          setSelectedTicket(updatedTicket);
          return updatedTicket;
        }
        return t;
      })
    );
  };

  const handleResetPrototype = () => {
    try {
      localStorage.removeItem('cheerio_prototype_tickets');
    } catch (e) {}
    setTickets(INITIAL_TICKETS);
    setSelectedSymptom(WHATSAPP_SYMPTOMS[0]);
    setPrefillSupport({ summary: '', errorCode: '', category: 'WhatsApp Connection', problemTitle: '' });
    setActivePage('home');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setActivePage('help-center');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      {/* Top Prototype Controls & Notice */}
      <PrototypeNotice
        onNavigate={handleNavigate}
        onReset={handleResetPrototype}
        activePage={activePage}
      />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          ticketCount={tickets.filter((t) => t.status !== 'resolved').length}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
          {/* Header */}
          <Header
            activePage={activePage}
            onNavigate={handleNavigate}
            onToggleMobile={() => setMobileOpen(!mobileOpen)}
            ticketCount={tickets.length}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
          />

          {/* Dynamic Page Views */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {activePage === 'home' && (
              <SupportHome
                onNavigate={handleNavigate}
                onSelectArticle={(artId) => setSelectedArticleId(artId)}
                recentTickets={tickets}
              />
            )}

            {activePage === 'whatsapp-assistant' && (
              <WhatsAppAssistant
                onNavigate={handleNavigate}
                selectedSymptom={selectedSymptom}
                onSelectSymptom={setSelectedSymptom}
                onStartDiagnosis={handleStartDiagnosis}
              />
            )}

            {activePage === 'whatsapp-diagnosis' && (
              <DiagnosisScreen
                symptom={selectedSymptom}
                onNavigate={handleNavigate}
                onSimulateSuccess={handleSimulateSuccess}
                onSimulateFailure={handleSimulateFailure}
                onRestart={handleRestart}
                onContactHumanSupport={(summary, errCode, problemTitle) =>
                  handleEscalateToHuman(summary, errCode, 'WhatsApp Connection', problemTitle)
                }
              />
            )}

            {activePage === 'whatsapp-success' && (
              <SuccessScreen
                onNavigate={handleNavigate}
                onRestart={handleRestart}
              />
            )}

            {activePage === 'whatsapp-failure' && (
              <PersistentFailureScreen
                symptom={selectedSymptom}
                onNavigate={handleNavigate}
                onEscalateToHuman={(summary, errCode, problemTitle) =>
                  handleEscalateToHuman(summary, errCode, 'WhatsApp Connection', problemTitle)
                }
                onRetryDiagnosis={handleStartDiagnosis}
              />
            )}

            {activePage === 'human-support' && (
              <HumanSupportForm
                onNavigate={handleNavigate}
                onSubmitTicket={handleSubmitTicket}
                prefillSummary={prefillSupport.summary}
                prefillErrorCode={prefillSupport.errorCode}
                prefillCategory={prefillSupport.category}
                prefillProblemTitle={prefillSupport.problemTitle}
              />
            )}

            {activePage === 'help-center' && (
              <HelpCenter
                onNavigate={handleNavigate}
                onSelectArticle={(artId) => setSelectedArticleId(artId)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}

            {activePage === 'my-tickets' && (
              <MySupportTickets
                tickets={tickets}
                onNavigate={handleNavigate}
                onSelectTicket={(ticket) => setSelectedTicket(ticket)}
              />
            )}

            {activePage === 'template-assistant' && (
              <TemplateAssistant
                onNavigate={handleNavigate}
                onEscalate={(summary, errCode) =>
                  handleEscalateToHuman(summary, errCode, 'Message Templates')
                }
              />
            )}

            {activePage === 'chatbot-assistant' && (
              <ChatbotAssistant
                onNavigate={handleNavigate}
                onEscalate={(summary, errCode) =>
                  handleEscalateToHuman(summary, errCode, 'Chatbot & Automation')
                }
              />
            )}

            {activePage === 'integration-assistant' && (
              <IntegrationAssistant
                onNavigate={handleNavigate}
                onEscalate={(summary, errCode) =>
                  handleEscalateToHuman(summary, errCode, 'Integrations')
                }
              />
            )}

            {activePage === 'delivery-assistant' && (
              <DeliveryAssistant
                onNavigate={handleNavigate}
                onEscalate={(summary, errCode) =>
                  handleEscalateToHuman(summary, errCode, 'Message Delivery')
                }
              />
            )}
          </main>

          {/* Footer */}
          <footer className="py-6 px-6 border-t border-slate-200/80 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Cheerio Setup Assistant</span>
              <span>•</span>
              <span>Product Intern Assignment Prototype</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Frontend Demo • No Live APIs Charged</span>
              <span>•</span>
              <button
                onClick={handleResetPrototype}
                className="text-purple-600 hover:text-purple-700 hover:underline cursor-pointer font-medium"
              >
                Reset Demo Data
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <ArticleModal
          article={activeArticle}
          onClose={() => setSelectedArticleId(null)}
          onNavigate={handleNavigate}
        />
      )}

      {/* Ticket Detail / Thread Modal */}
      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onAddReply={handleAddReply}
        />
      )}
    </div>
  );
}

export default App;
