# Concrete Academy

**Production-ready multilingual DeFi education platform for the Concrete protocol.**

> Learn → Quiz → Master. Turn every DeFi learner into a Concrete Master.

---

## What This Is

Concrete Academy is a full-stack Next.js application that:

- **Teaches** Concrete DeFi through structured learning modules sourced from official documentation
- **Tests** knowledge via a two-level ranked quiz system (15 + 12 questions, all 6 languages)
- **Answers questions** via an AI chatbot ("The Concrete Analyst") powered by Ollama running locally
- **Ranks** participants on a global leaderboard with 4 tiers: NEWBIE → NAVIGATOR → GURU → MASTER

**Supported languages:** English · 中文 · Tiếng Việt · Bahasa Indonesia · Türkçe · Nigerian Pidgin

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + CSS Variables |
| Animation | Framer Motion |
| i18n | next-intl v4 |
| AI | Ollama (local LLM — Mistral/Phi3) |
| Database | PostgreSQL via `pg` |
| Icons | Lucide React |
| Fonts | Syne + IBM Plex Mono |
| Deploy | PM2 + Nginx + Certbot |

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.local.example .env.local
# Edit .env.local with your DATABASE_URL and Ollama config

# 3. Set up database (requires PostgreSQL running)
psql -U postgres -c "CREATE USER concrete_edu WITH PASSWORD 'password';"
psql -U postgres -c "CREATE DATABASE concrete_edu OWNER concrete_edu;"
psql -U concrete_edu -d concrete_edu -f scripts/setup-db.sql

# 4. Install Ollama and pull model
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull mistral   # ~4GB

# 5. Run dev server
npm run dev
# → http://localhost:3000
```

> **Note:** Chatbot requires Ollama running. Quiz and leaderboard require PostgreSQL.
> The site works without either — leaderboard degrades gracefully, chatbot shows offline message.

---

## VPS Deployment (Ubuntu 22.04)

### 1. Server Setup

```bash
bash scripts/setup-server.sh
```

This installs: Node.js 20, PostgreSQL, Nginx, Certbot, PM2.

### 2. Install Ollama + Model

```bash
bash scripts/install-ollama.sh
# Downloads mistral model (~4GB). For limited RAM, use phi3 (~2GB):
# Set OLLAMA_MODEL=phi3 in .env.local
```

**Minimum VPS requirements:** 8GB RAM (Mistral) or 4GB (Phi3), 20GB storage, 2+ cores, Ubuntu 22.04

### 3. PostgreSQL Setup

```bash
sudo -u postgres psql -c "CREATE USER concrete_edu WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "CREATE DATABASE concrete_edu OWNER concrete_edu;"
psql -U concrete_edu -d concrete_edu -f scripts/setup-db.sql
```

### 4. Configure Environment

```bash
cp .env.local.example .env.local
nano .env.local   # Set DATABASE_URL, OLLAMA_URL, OLLAMA_MODEL
```

### 5. Deploy

```bash
bash scripts/deploy.sh
```

### 6. Nginx + SSL

```bash
# Edit nginx/concrete-edu.conf — replace 'yourdomain.com'
sudo cp nginx/concrete-edu.conf /etc/nginx/sites-available/concrete-edu
sudo ln -s /etc/nginx/sites-available/concrete-edu /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com   # Free SSL
```

---

## File Structure

```
concrete-edu/
├── app/[locale]/          # All locale-aware pages (home, learn, quiz, leaderboard)
├── app/api/               # API routes (chat, quiz/submit, leaderboard, waitlist)
├── components/            # All React components
├── data/                  # Quiz JSON (15+12 questions × 6 locales) + modules
├── lib/                   # Ollama wrapper, PostgreSQL pool, i18n config
├── messages/              # Translations: en, zh, vi, id, tr, pcm
├── public/mascot/         # Place Moai mascot PNG here
├── scripts/               # Server + deploy shell scripts
├── nginx/                 # Nginx reverse proxy config
└── .env.local.example     # Environment variable template
```

---

## Mascot System

Place the Moai mascot at `public/mascot/moai-master.png`. CSS filters create rank variants:

| Rank | Score | Effect |
|------|-------|--------|
| NEWBIE | 0–25% | Desaturated, darkened |
| NAVIGATOR | 26–50% | Muted colors |
| GURU | 51–80% | Full color, golden glow |
| MASTER | 81–100% | Animated teal pulse |

---

## AI Chatbot — The Concrete Analyst

- **Model**: Mistral (default) or Phi3 — both run locally, zero API cost
- **Temperature**: 0.1 — maximally factual responses
- **Grounded**: Exclusively in official Concrete documentation
- **Rate limited**: 20 requests/min/IP (server + Nginx layers)
- **Never speculates**: Unknown questions redirect to https://docs.concrete.xyz

---

## Official Concrete Sources

All content sourced from:
- https://www.concrete.xyz · https://app.concrete.xyz · https://docs.concrete.xyz
- https://mirror.xyz/concretexyz.eth · https://points.concrete.xyz/home
- https://www.halborn.com/audits/blueprint-finance · https://x.com/ConcreteXYZ

---

*Concrete Academy — Educational platform. Not financial advice.*
