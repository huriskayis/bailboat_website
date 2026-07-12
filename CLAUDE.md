# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install                          # install dependencies
cp .env.local.example .env.local     # then add STRIPE_SECRET_KEY
npm run dev                          # start dev server at localhost:3000
npm run build                        # production build
npm run lint                         # ESLint
```

No test suite is configured.

## Architecture

Next.js 15 App Router storefront for **VELA Atölye** — a Turkish yem botu (bait boat) atelier. All copy is in Turkish.

**Data layer** — `lib/products.ts` is the single source of truth for all 8 boats (names, specs, prices in EUR cents). No database or CMS; edit this file to change product data.

**Routing**
- `/` — hero + atelier thesis strip + collection grid (`app/page.tsx`)
- `/koleksiyon` — full listing (`app/koleksiyon/page.tsx`)
- `/koleksiyon/[slug]` — product detail + Stripe buy button (statically generated from `products`)
- `/atolye` — atelier page
- `/iletisim` — contact form
- `POST /api/checkout` — creates a Stripe Checkout session (dynamic `price_data`, no pre-created Stripe products needed)
- `POST /api/contact` — currently logs to server console; wire up Resend or similar at the `TODO` comment

**Stripe flow** — `BuyButton` (client component) calls `/api/checkout`, which returns a Stripe session URL, then redirects. Success/cancel lands back on the product page with `?durum=basarili` or `?durum=iptal`.

**Styling** — `app/globals.css` contains the entire design system (CSS variables, utility classes, component styles). No Tailwind.

**Fonts** — Cormorant Garamond (display, `--font-display`) + Jost (sans, `--font-sans`) via `next/font/google`.

## Environment variables

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_…` for dev) |
| `NEXT_PUBLIC_SITE_URL` | Deployed URL (used for Stripe success/cancel redirects) |

## Deploy

Push to Git and import into Vercel. Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_SITE_URL` as environment variables in the Vercel dashboard.
