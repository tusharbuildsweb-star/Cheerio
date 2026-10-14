# Cheerio Setup Assistant — Product Intern Assignment Prototype

A complete, clickable frontend website prototype built for non-technical business owners using **Cheerio** (a conversational customer engagement & WhatsApp Business API platform).

> **Prototype Purpose:** Help non-technical business owners diagnose and resolve common Cheerio and WhatsApp Cloud API setup problems in under 3 minutes without contacting human support for every routine issue, while providing a seamless escalation path when manual Meta verification is required.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🎨 Design System & SaaS Aesthetic
- **Colors:** Clean white backgrounds (`#ffffff`), subtle gray surfaces (`#f8fafc`, `#f1f5f9`), dark readable slate typography (`#0f172a`), and Cheerio signature purple accents (`#9333ea`, `#7e22ce`, `#faf5ff`).
- **Layout:** Collapsible left sidebar navigation on desktop + responsive slide-out drawer on mobile screens.
- **Components:** High-contrast rounded cards (`rounded-2xl`), subtle drop shadows, interactive badge indicators, and animated diagnostic spinners.
- **Non-Technical Copywriting:** Plain English explanations that avoid jargon. Error codes (e.g., `WABA-409`) are translated into clear, actionable physical steps (e.g., "Delete consumer WhatsApp account on your mobile device to release the number lock").
- **Security Guarantee:** Never requests passwords, credit card CVVs, API tokens, or 6-digit WhatsApp OTP codes.

---

## 📱 Pages & Features Overview

### 1. Support Home
- **Hero Banner:** Welcomes the business owner (`UrbanBoutique Store`) with a real-time smart search bar and quick suggestion tags (`WABA-409`, `Template Rejection`, `Shopify Webhook`, `Bot Loop`).
- **5 Clickable Diagnostic Cards:**
  1. **Connect WhatsApp** (Opens the full guided 4-step troubleshooting flow).
  2. **Fix Message Template** (Interactive template syntax linter & auto-fix tool).
  3. **Troubleshoot Chatbot** (Interactive sandbox to test keyword triggers and fallback loops).
  4. **Connect Integration** (Shopify, Google Sheets, and webhook sync diagnostic).
  5. **Check Message Delivery** (Live quality score tracker and delivery rate audit).
- **Self-Service Impact KPI Cards:** Shows resolution rate (87.4%), automated resolution speed (2.1 mins), and zero security token leaks.
- **Quick Links:** Previews popular Help Center articles and recently logged support tickets.

### 2. WhatsApp Setup Assistant (Guided Flow - Step 1)
- **Progress Stepper:** Clear 4-step progress indicator (`Select Issue` → `Run Diagnosis` → `Resolution Steps` → `Verification`).
- **Beginner-Friendly Guidance:** Explains Meta Cloud API rules in plain terms.
- **Selectable Troubleshooting Scenarios:**
  - Phone number already registered with another WhatsApp setup (`WABA-409`).
  - Two-Factor Authentication (2FA) PIN error during registration (`WABA-102`).
  - Payment method missing or unverified in Meta Business Account (`WABA-301`).
  - Cloud API Access Token Expired or Webhook Signature Failure (`WABA-500`).
  - General Incomplete Setup / Number Not Connected (`WABA-001`).

### 3. Diagnosis Screen (Guided Flow - Step 2 & 3)
- **Safer Resolution Protocol (No Account Deletion as Default):**
  1. **Confirm Business Phone Number:** Verifies `+1 (555) 019-2834` is the intended business line and not a personal SIM.
  2. **Identify Existing Setup:** Explains whether the number is currently on a WhatsApp mobile app (consumer/business) or another API/BSP provider.
  3. **Review Meta Coexistence & Migration:** Informs the user about official Meta coexistence or 2FA WABA porting pathways without losing customer chat history.
  4. **Human Support Escalation:** Clear option to escalate if unsure or needing guided migration assistance.
- **4 Working Functional Buttons:**
  - **View troubleshooting instructions:** Toggles detailed instructions, coexistence rules, and step breakdown.
  - **Retry simulated connection:** Runs a simulated 3-step connection scan and transitions to the Connected Success Screen.
  - **Simulate persistent failure:** Runs simulated scan resulting in failure and transitions to the Persistent Failure Screen.
  - **Contact human support:** Immediately opens the Human Support Form with the issue code (`WABA-409`), selected problem title, and attempted steps pre-filled.
- **Simulated Environment Clarity:** All checks, latency metrics, and statuses are clearly labeled as simulated demonstrations. Does not claim real Meta account verification.

### 4. Success Screen (Guided Flow - Step 4: Success Path)
- **Simulated Connected Status:** Clearly labeled as `Simulated Status: Connected & Ready (Demo Environment)`.
- **Status Metrics:** Business Phone (`+1 (555) 019-2834`), Simulated Link: Ready, Simulated Latency: 38ms, Messaging Tier: Tier 1, Quality Score: High (Green).
- **Interactive Live WhatsApp Message Simulator:** Business owner can send a custom test message to preview simulated incoming WhatsApp delivery with animated ticks.

### 5. Persistent Failure Screen (Guided Flow - Step 4: Failure Path)
- **Empathetic Explanation:** Explains that automatic changes were stopped to protect chat history and avoid account locking.
- **Simulated Telemetry Log:** Bundles issue code (`WABA-409`), selected problem, and attempted steps into a support packet.
- **Primary Escalation CTA:** **"Escalate to Human Support"** opens the support form with all context transferred.

### 6. Human Support Form
- **Context Handoff:** Pre-populates issue code (`WABA-409`), selected problem, and the 4 attempted troubleshooting steps.
- **Form Validation:** Validates full name, business name, valid email regex, and minimum description length.
- **Demo Confirmation Modal:** Displays a simulated Ticket ID (e.g., `CHE-89421`) and explicitly states:
  > *"Demo Notice: This is a frontend prototype. No real support ticket or external request was created."*
- Adds the ticket to the session ticket history under **"My Support Tickets"**.
  - Work Email (validated with email regex)
  - Issue Category (dropdown with all 6 categories)
  - Priority Level (Low, Medium, High - Business Blocked)
  - Detailed Description (min 15 characters validation)
  - Attempted Troubleshooting Summary (auto-filled, editable)
  - Interactive Screenshot / Log Attachment simulator
- **Submission Feedback:** Generates simulated Ticket ID (e.g., `CHE-92841`), saves the ticket to session history, and displays a prominent **Prototype Notice Banner** clarifying that no real external ticket was created.

### 7. Help Center
- **Searchable Articles:** Real-time instant search across titles, content, and tags.
- **Category Filter Pills:** WhatsApp Setup, Message Templates, Chatbots & AI, Integrations, Quality & Delivery.
- **Article Reader Modal:** In-depth readable articles with step-by-step instructions, callout boxes (Tips, Warnings, Notes), and an interactive **"Was this article helpful?"** voting widget.
- **FAQ Accordion:** Answers to common non-technical business owner questions.

### 8. My Support Tickets
- **Session Ticket Management:** Shows both pre-seeded demo tickets and any newly submitted tickets from the Human Support form (persisted in local state).
- **Status Filter Pills:** All, Active (Open / In Progress), and Resolved.
- **Clickable Ticket Thread Modal:** Displays the full simulated message conversation between Rahul, the Cheerio Diagnostic Bot, and assigned support engineers (Sarah Jenkins, Aditya Rao).
- **Interactive Reply Input:** Reviewer can type and submit replies directly into the demo ticket thread!

---

## 🛠️ Specialized Diagnostic Assistants
In addition to the flagship WhatsApp flow, the other 4 cards from Support Home have dedicated tools:
1. **Fix Message Template:** Interactive template linter that flags category misclassifications, floating `{{1}}` variables, and shortened URLs, with a 1-click **"Auto-Fix Formatting with Cheerio AI"** button.
2. **Troubleshoot Chatbot:** Interactive bot sandbox where users can test keywords (`catalog`, `order`, or unknown words) to test fallback loops and test the **Smart Agent Handoff Protection** toggle.
3. **Connect Integration:** Sync health checker for Shopify, AWS Webhooks, and Google Sheets, with a working **"Test Webhook Ping"** button.
4. **Check Message Delivery:** Quality rating monitor with an interactive **"Run Delivery Audit"** button.

---

## 💻 Tech Stack
- **React 19** + **TypeScript**
- **Vite** (Instant hot module replacement & optimized bundle)
- **Tailwind CSS v3** (Utility-first styling with custom Cheerio purple palette)
- **Lucide React** (Clean, modern SVG SaaS iconography)

---

## 📁 File Structure
```
d:/sujit project/
├── index.html                   # Entry HTML with Cheerio branding & Google Fonts
├── package.json                 # Dependencies & scripts
├── tailwind.config.js           # Cheerio color theme & Tailwind config
├── tsconfig.app.json            # TypeScript configuration
├── src/
│   ├── main.tsx                 # React DOM root render
│   ├── App.tsx                  # Core state manager, router, modal coordinator
│   ├── types.ts                 # TypeScript interfaces (Ticket, Article, Symptom, etc.)
│   ├── index.css                # Tailwind directives & custom scrollbars
│   ├── data/
│   │   └── sampleData.ts        # Seed data (5 problem cards, 5 symptoms, 6 articles, demo tickets)
│   ├── components/
│   │   ├── Sidebar.tsx          # Responsive left navigation with account pill
│   │   ├── Header.tsx           # Breadcrumbs, global search, mobile menu
│   │   ├── PrototypeNotice.tsx  # Top bar with quick test scenario shortcuts & reset button
│   │   ├── ArticleModal.tsx     # Full modal reader for Help Center articles
│   │   └── TicketDetailModal.tsx# Interactive conversation thread for support tickets
│   └── pages/
│       ├── SupportHome.tsx      # Support Home with 5 problem cards & search
│       ├── WhatsAppAssistant.tsx# 4-step progress stepper & symptom selection
│       ├── DiagnosisScreen.tsx  # Incomplete setup breakdown, retry, and simulation toggles
│       ├── SuccessScreen.tsx    # Connected status & live WhatsApp message preview
│       ├── PersistentFailureScreen.tsx # Failure breakdown, logs, and human escalation
│       ├── HumanSupportForm.tsx # Validated form with simulated ticket ID generator
│       ├── HelpCenter.tsx       # Searchable knowledge base & FAQ accordion
│       ├── MySupportTickets.tsx # Session tickets list with status filters
│       ├── TemplateAssistant.tsx# Interactive message template debugger
│       ├── ChatbotAssistant.tsx # Interactive chatbot trigger & fallback tester
│       ├── IntegrationAssistant.tsx # Shopify & webhook connection checker
│       └── DeliveryAssistant.tsx# Message delivery & Quality Score auditor
```
