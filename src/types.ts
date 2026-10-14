export type PageId =
  | 'home'
  | 'whatsapp-assistant'
  | 'whatsapp-diagnosis'
  | 'whatsapp-success'
  | 'whatsapp-failure'
  | 'human-support'
  | 'help-center'
  | 'my-tickets'
  | 'template-assistant'
  | 'chatbot-assistant'
  | 'integration-assistant'
  | 'delivery-assistant';

export interface WhatsAppSymptom {
  id: string;
  title: string;
  tagline: string;
  errorCode: string;
  severity: 'high' | 'medium' | 'low';
  category: string;
  description: string;
  rootCause: string;
  recommendedFix: string[];
  preventativeTip: string;
}

export interface DiagnosticLog {
  id: string;
  timestamp: string;
  message: string;
  status: 'passed' | 'failed' | 'warning' | 'pending';
  component: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'waiting_on_meta' | 'resolved';
  createdAt: string;
  updatedAt: string;
  description: string;
  fullName: string;
  businessName: string;
  email: string;
  errorCode?: string;
  troubleshootingSummary?: string;
  assignedAgent?: {
    name: string;
    role: string;
    avatar: string;
  };
  messages: {
    id: string;
    sender: 'user' | 'agent' | 'system';
    senderName: string;
    timestamp: string;
    content: string;
  }[];
}

export interface HelpArticle {
  id: string;
  title: string;
  slug: string;
  category: 'whatsapp' | 'templates' | 'chatbots' | 'integrations' | 'delivery' | 'billing';
  summary: string;
  readTime: string;
  updatedAt: string;
  tags: string[];
  helpfulCount: number;
  sections: {
    heading: string;
    content: string[];
    callout?: {
      type: 'tip' | 'warning' | 'info';
      text: string;
    };
  }[];
}

export interface InteractiveProblemCard {
  id: PageId;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  badgeColor: string;
  estimatedTime: string;
  automatedRate: string;
}
