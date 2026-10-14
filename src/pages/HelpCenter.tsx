import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Clock,
  ThumbsUp,
  Tag,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { HelpArticle, PageId } from '../types';
import { HELP_ARTICLES } from '../data/sampleData';

interface HelpCenterProps {
  onNavigate: (page: PageId) => void;
  onSelectArticle: (articleId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({
  onNavigate,
  onSelectArticle,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Knowledge Base' },
    { id: 'whatsapp', label: 'WhatsApp Setup' },
    { id: 'templates', label: 'Message Templates' },
    { id: 'chatbots', label: 'Chatbots & AI' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'delivery', label: 'Quality & Delivery' },
  ];

  const filteredArticles = HELP_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q)) ||
      art.sections.some((s) => s.content.some((c) => c.toLowerCase().includes(q)));

    return matchesCategory && matchesQuery;
  });

  const faqs = [
    {
      q: 'Will deleting my account on the WhatsApp mobile app delete my phone contacts?',
      a: 'No. Your phone contacts are stored securely on your physical device address book or iCloud/Google account. Deleting the consumer WhatsApp account only releases the phone number lock from Meta servers so Cheerio Cloud API can bind to it.',
    },
    {
      q: 'Why did Meta reject my promotional WhatsApp message template?',
      a: 'Meta strictly enforces that promotional discount messages cannot be submitted under the "Utility" category. You must categorize promotional offers as "Marketing" and provide realistic example parameters for any variable placeholders like {{1}}.',
    },
    {
      q: 'How many messages can I send per day when I first start?',
      a: 'New WhatsApp Cloud API phone numbers start on Tier 1 (1,000 unique customer conversations per 24 hours). Meta automatically upgrades your limit to 10,000 conversations once you reach 50% capacity with a Green Quality score.',
    },
    {
      q: 'What is the 24-hour customer service window?',
      a: 'Whenever a customer messages your business first, a 24-hour window opens where you can reply with freeform messages without needing pre-approved templates.',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-charcoal transition-colors duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Support Home</span>
        </button>

        <button
          onClick={() => onNavigate('whatsapp-assistant')}
          className="text-xs text-accent hover:text-accent-hover font-medium flex items-center gap-1 cursor-pointer transition-colors duration-150"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch WhatsApp Assistant</span>
        </button>
      </div>

      {/* Hero Search Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-line shadow-sm space-y-5">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-subtle text-accent text-xs font-medium border border-accent-border">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cheerio Knowledge Base</span>
          </div>
          <h1 className="text-xl font-display font-semibold text-charcoal tracking-tight">
            How can we help your business succeed today?
          </h1>
          <p className="text-sm text-muted">
            Search our curated step-by-step guides, Meta Cloud API policies, and troubleshooting tutorials.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4.5 h-4.5 text-subtle absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles by topic, keyword, or error code…"
            className="w-full pl-11 pr-4 py-2.5 bg-canvas text-sm text-charcoal placeholder-subtle rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all duration-150"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-subtle hover:text-muted font-medium cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-accent text-white'
                    : 'bg-white border border-line text-muted hover:border-accent-border hover:text-accent'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Article Results Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-charcoal">
            Articles ({filteredArticles.length})
          </h2>
          {searchQuery && (
            <p className="text-xs text-muted">
              Filtered by "<span className="text-accent font-medium">{searchQuery}</span>"
            </p>
          )}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-line space-y-2">
            <HelpCircle className="w-8 h-8 text-subtle mx-auto" />
            <h3 className="text-sm font-semibold text-charcoal">No matching articles found</h3>
            <p className="text-xs text-muted">
              Try searching with simpler terms or launch our WhatsApp Setup Assistant.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                setSelectedCategory('all');
              }}
              className="mt-2 text-xs font-medium text-accent hover:text-accent-hover cursor-pointer transition-colors duration-150"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article.id)}
                className="group bg-white rounded-2xl p-5 border border-line hover:border-accent-border hover:shadow-sm transition-all duration-150 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent-subtle text-accent border border-accent-border">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-subtle">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-charcoal group-hover:text-accent transition-colors duration-150 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-line flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-subtle">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{article.helpfulCount} helpful votes</span>
                  </div>

                  <span className="font-medium text-accent group-hover:translate-x-0.5 transition-transform duration-150 flex items-center gap-1">
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-line shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-display font-semibold text-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-muted mt-1">
            Quick non-technical answers to common Cheerio setup questions.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;

            return (
              <div
                key={idx}
                className={`border rounded-xl overflow-hidden transition-colors duration-150 ${
                  isExpanded ? 'border-accent-border' : 'border-line'
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 bg-white hover:bg-canvas transition-colors duration-150 cursor-pointer"
                >
                  <span className="text-sm font-medium text-charcoal">{faq.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-subtle shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 bg-canvas border-t border-line text-sm text-muted leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
