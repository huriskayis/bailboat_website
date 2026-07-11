# VELA Atölye — El Yapımı Yelkenliler

A minimal, elite maritime storefront built with Next.js (App Router) + Stripe.
Home page, collection listing, product detail, Stripe checkout, and a contact form.
All copy is in Turkish. Eight placeholder boats named after the Turkish winds.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Stripe Checkout (dynamic `price_data`, no products to pre-create)
- Fonts: Cormorant Garamond (display) + Jost (sans), via `next/font`
- Palette: deep-water navy · sailcloth bone · weathered brass

## Run locally
```bash
npm install
cp .env.local.example .env.local   # then paste your Stripe test key
npm run dev
```
Open http://localhost:3000

## Stripe setup
1. Create a Stripe account and grab your **test** secret key from
   https://dashboard.stripe.com/apikeys (starts with `sk_test_`).
2. Put it in `.env.local` as `STRIPE_SECRET_KEY`.
3. On a product page, "Satın Al" opens Stripe Checkout. Test card: `4242 4242 4242 4242`,
   any future date, any CVC.

Prices in `lib/products.ts` are placeholders (in EUR cents). Edit them there.
The checkout builds the line item on the fly, so you don't need to create products
in the Stripe dashboard.

## Where things live
- `lib/products.ts` — the 8 boats (names, specs, prices, lorem descriptions)
- `app/page.tsx` — home (hero + atelier strip + collection grid)
- `app/koleksiyon/page.tsx` — full listing
- `app/koleksiyon/[slug]/page.tsx` — product detail + Buy button
- `app/iletisim/page.tsx` — contact form
- `app/api/checkout/route.ts` — Stripe Checkout session
- `app/api/contact/route.ts` — contact handler (currently logs to server console)
- `app/globals.css` — the entire design system

## Contact form
`app/api/contact/route.ts` currently just logs submissions. To actually receive them,
drop in an email sender (e.g. Resend) or write to a database (e.g. Supabase) where the
`TODO` comment is.

## Deploy
Push to a Git repo and import into Vercel. Add `STRIPE_SECRET_KEY` and
`NEXT_PUBLIC_SITE_URL` (your deployed URL) as environment variables.
