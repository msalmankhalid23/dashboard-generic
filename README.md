# Dashbaord-Generic

An enterprise-grade, universal project operations dashboard designed for tracking complex portfolios across any industry — software, engineering, consulting, construction, and operations. Built with React 19, Vite, Tailwind CSS, Recharts, and backed by a live **Supabase PostgreSQL** database.

---

## Overview

- **Universal Portfolio Tracking** — Real-time tracking of budgets, actual spend, completion rates, and delivery milestones.
- **Predictive Risk Engine** — Rule-based multi-signal intelligence that identifies cost overruns and milestone slips early.
- **Relational PostgreSQL Backend** — Powered by Supabase with Row Level Security (RLS) and cascading relational models.
- **Dynamic Data Ingestion** — Drag-and-drop CSV parser with instant database persistence and automated schema validation.
- **Modern Bento UI** — Clean light and dark modes with responsive charts, manager avatars, and status telemetry.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (.env)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# 3. Start local development server
npm run dev
```

---

## Project Structure

```
src/
├── components/          # Modular UI components (bento cards, charts, data tables, alert panels)
│   ├── alerts/          # Operational alerts & predictive early-warning risk cards
│   ├── cards/           # Summary KPI metric cards with delta indicators
│   ├── charts/          # Monotone area curves, status donuts, and variance bar charts
│   ├── layout/          # Collapsible sidebar, navigation top bar, and responsive shell
│   └── table/           # Sortable portfolio table, filter controls, and status badges
├── data/
│   └── portfolioData.ts # Default portfolio seed data (8 multi-industry project initiatives)
├── hooks/
│   ├── useProjects.ts   # Central state management, async Supabase sync, and filter pipelines
│   └── useTheme.ts      # Light/Dark mode state management with localStorage persistence
├── lib/
│   ├── analytics.ts     # Risk index computation, automated alert logic, and portfolio insights
│   ├── formatters.ts    # Currency, percentage, and date display helpers
│   └── supabase.ts      # Typed Supabase PostgreSQL client instance
├── pages/               # Primary views (Overview, Analytics, Projects, Predictive Risks, Upload, Settings)
├── services/
│   └── projectService.ts # Relational database CRUD operations, cascade queries, and seed scripts
└── types/
    └── project.ts       # Shared TypeScript schemas, database types, and filter definitions
```

---

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL with RLS)
- **Visualizations:** Recharts (Area, Donut, and Bar charts)
- **Icons:** Lucide React
