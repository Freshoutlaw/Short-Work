# ShortWork 2.0 — Full‑Stack Content Agency Platform

A conversion‑first SaaS system with 3D marketing site, AI audit, client portal, and admin dashboard.

## Tech Stack
- **Frontend:** React + Vite + TailwindCSS + Framer Motion (light)
- **Backend:** Supabase (Auth, DB, Storage, Edge Functions)
- **AI:** Groq API (audit reports + chatbot)
- **Hosting:** Vercel (frontend) + Supabase (backend)

## Features
- 3D parallax hero with floating stats
- 5‑step AI content audit quiz (Groq)
- ROI calculator (financial loss estimator)
- Social proof rotator (real before/after metrics)
- Video portfolio (TikTok/Instagram embeds)
- Industry‑specific landing pages (SEO)
- Floating AI chatbot (answers FAQs, hides pricing)
- WhatsApp & Calendly integration
- Dark / system / light theme (localStorage)
- Secure authentication + 6‑digit OTP
- Client portal (onboarding, calendar, analytics)
- Admin dashboard (leads, quiz analytics, video manager, blog CMS)

## Setup

1. Clone the repo.
2. Copy `.env.example` to `.env` and fill in your keys.
3. Run Supabase migrations (`supabase/migrations/`).
4. Deploy Edge Functions:
   ```bash
   supabase functions deploy generate-audit
   supabase functions deploy groq-chat
   supabase functions deploy send-otp
   supabase functions deploy verify-otp