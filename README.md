# Broward International Containers — marketing site

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Lead-generation site
for container sales and custom conversions — no e-commerce, no catalog.

## Local dev setup

```bash
npm install
cp .env.example .env.local   # then fill in the values you need, see below
npm run dev
```

Open http://localhost:3000.

## Project structure

- `app/page.tsx` — assembles the homepage from the components below
- `app/api/lead/route.ts` — API route both forms submit to; emails via
  Resend or POSTs to Formspree depending on which env vars are set
- `components/Header.tsx` — sticky nav with phone number
- `components/Hero.tsx` — headline, dual CTA, stats, "inspected & certified" stamp
- `components/ServicePaths.tsx` — the Buy a Container / Custom Conversions fork
- `components/SizeSelector.tsx` — container sizes, why-buy-from-us, quote form
- `components/Conversions.tsx` — video placeholders, process steps, pricing, inquiry form
- `components/StickyContactBar.tsx` — mobile-only sticky call/text bar
- `components/Footer.tsx` — contact + service area

Design tokens (colors, fonts) live in `tailwind.config.ts`.

## Environment variables

Both lead forms POST to `/api/lead`, which needs one of these configured to
actually deliver leads (see `.env.example`):

| Variable | Used for |
|---|---|
| `RESEND_API_KEY` | Send lead notifications as email via [Resend](https://resend.com) |
| `LEAD_FROM_EMAIL` | Verified sending address on your Resend domain |
| `LEAD_TO_EMAIL` | Inbox that receives lead notifications |
| `FORMSPREE_ENDPOINT` | Alternative to Resend — POST leads to a [Formspree](https://formspree.io) form |

If neither `RESEND_API_KEY` nor `FORMSPREE_ENDPOINT` is set, submissions are
only logged to the server console — useful for local dev, not for production.
No secrets are hardcoded anywhere in the codebase.

## Placeholder content to swap out before launch

- Phone (`(305) 613-9378`) and email (`browardintlcontainers@gmail.com`) are
  set to real values in Header, StickyContactBar, and Footer
- Conversion project videos in `components/Conversions.tsx` — currently a
  placeholder card with a play icon; swap for an embedded YouTube/Vimeo
  player once footage is edited
- Trust stats (years in business, containers sold, conversions built) and
  pricing ranges are placeholders — confirm real numbers before launch

## Deploying to Railway

1. Push this repo to GitHub.
2. In Railway, create a new project from that GitHub repo.
3. Railway auto-detects Next.js; if asked, set the build command to
   `npm run build` and the start command to `npm start`.
4. Add the environment variables from `.env.example` (whichever provider
   you're using) under the Railway service's Variables tab.
5. Deploy. Point your custom domain at the Railway service once it's live —
   SSL is handled automatically.

## Possible next steps

- Dedicated pages for container sizes or individual conversion projects as
  content grows (e.g. `/containers`, `/conversions/[project]`) — intentionally
  out of scope for this lead-gen-only homepage.
- Swap the console-log fallback in `app/api/lead/route.ts` for a stored
  leads table if you want a durable record beyond email/Formspree.
