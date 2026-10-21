# The Lift — vision site (short version)

Private, single scrolling page in French: Sabrina's vision for The Lift, for Yoann.
The full brief and the decisions are in `the-lift-project-handoff.md`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The logo's "i" rides up its cable while the page loads, then press "8" on the lift panel.

## Deploy (Vercel)

1. Import the repo in Vercel.
2. Framework preset: Next.js. No environment variables needed.
3. Deploy.

No password: the link itself is private. Search engines are kept out with a `noindex` meta, an `X-Robots-Tag` header on every response and a `robots.txt` that disallows all.

The logo in `components/Logo.tsx` is redrawn from The Lift's own artwork.

## Images

All photos are from Pexels (free licence, no attribution required), graded with one warm colour grade so they feel like one place. Each one carries the caption "Visuel d'illustration". Sources in `CREDITS.md`.
